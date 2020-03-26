import { Component, OnInit } from '@angular/core';
import { Barber } from './interfaces/barber';
import { Service } from './interfaces/service';
import { MDBModalService } from 'angular-bootstrap-md';
import { BarberModalComponent } from './components/modals/barber-modal/barber-modal.component';
import { ServicesModalComponent } from './components/modals/services-modal/services-modal.component';
import * as moment from 'moment';
import { AvailableDay, AvailableTime } from './interfaces/availableDayAndTime';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ResultModalComponent } from './components/modals/result-modal/result-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedBarber: Barber;
  selectedService: Service;
  selectedDateTime: Date;

  availableDays: AvailableDay[];
  availableTime: AvailableTime[];

  form: FormGroup;

  dayTimeMap = new Map<number, Date[]>();

  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {

    const nameValidators = [Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z ]+'), this.nameValidator(5)];

    this.form = new FormGroup({
      name: new FormControl('', nameValidators),
      phone: new FormControl('', this.phoneNumberValidator())
    });
  }

  get phoneControl() {
    return this.form.get('phone');
  }

  get nameControl() {
    return this.form.get('name');
  }

  get canBeSubmited() {
    return this.form.valid
            && this.selectedService
            && this.selectedBarber
            && this.selectedDateTime
            && this.availableTime.some(t => t.selected)
            && this.availableTime.some(d => d.selected);
  }

  private setAvailableDays() {
    this.availableDays = [];
    for (const key of this.dayTimeMap.keys()) {
      const value: Date[] = this.dayTimeMap.get(key).filter(date => date.getDate());
      const availableDay: AvailableDay = {
        availableTime: value,
        caption: moment(value[0]).format('MMM Do'),
        selected: false,
      }
      this.availableDays.push(availableDay);
    }
    this.clearAvailableTime();
  }

  onDaySelected(day: AvailableDay) {
    const prevSelected = day.selected;
    this.availableDays.forEach(d => d.selected = false);
    day.selected = !prevSelected;
    if (!day.selected) {
      this.clearAvailableTime();
    } else {
      this.availableTime = day.availableTime.map(date => {
        return {
          caption: moment(date).format('HH:mm'),
          date: date,
          selected: false
        }
      });
    }
  }

  onTimeSelected(time: AvailableTime) {
    const prevSelected = time.selected;
    this.availableTime.forEach(d => d.selected = false);
    time.selected = !prevSelected;
    this.selectedDateTime = time.date;
  }

  onSelectBarbers() {
    const modalRef = this.modalService.show(BarberModalComponent);
    modalRef.content.response.subscribe(b => this.onBarberSelected(b));
  }

  onSelectService() {
    if (this.selectedBarber) {
      const modalRef = this.modalService.show(ServicesModalComponent, { data: { barber: this.selectedBarber } });
      modalRef.content.response.subscribe(s => this.selectedService = s);
    }
  }

  onBarberSelected(b: Barber) {
    this.selectedBarber = b;
    for (const date of this.selectedBarber.appointmentsFreeTime) {
      this.dayTimeMap.set(date.getDay(), [...(this.dayTimeMap.get(date.getDay()) || []), date]);
    }
    this.selectedService = null;
    this.setAvailableDays();
  }

  clearAvailableTime() {
    this.availableTime = [];
    this.selectedDateTime = null;
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber: string = control.value;
      const phoneNumberLength = phoneNumber.split(' ').join('').length;
      const containsOnlyNumbersAndSpaces = /^[ 0-9]+$/g.test(phoneNumber);
      return phoneNumberLength >= 10 && containsOnlyNumbersAndSpaces ? null : ({ error: { phoneNumberLength, containsOnlyNumbersAndSpaces } });
    };
  }

  nameValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name: string = control.value;
      return name.trim().length >= minLength ? null : ({ nameTrimmedLengthError: { name } });
    };
  }

  onSubmit() {
    const result = {
      name: this.nameControl.value.trim(),
      phoneNumber: this.phoneControl.value.trim(),
      date: this.selectedDateTime,
      barber: this.selectedBarber,
      service: this.selectedService
    };

    this.modalService.show(ResultModalComponent, { data: { result }});
  }


}
