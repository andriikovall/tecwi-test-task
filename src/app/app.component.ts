import { Component, OnInit } from '@angular/core';
import { Barber } from './interfaces/barber';
import { Service } from './interfaces/service';
import { MDBModalService } from 'angular-bootstrap-md';
import { BarberModalComponent } from './components/modals/barber-modal/barber-modal.component';
import { ServicesModalComponent } from './components/modals/services-modal/services-modal.component';
import * as moment from 'moment';
import { AvailableDay, AvailableTime } from './interfaces/availableDayAndTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedBarber: Barber;
  selectedService: Service;

  availableDays: AvailableDay[];
  availableTime: AvailableTime[];

  dayTimeMap = new Map<number, Date[]>();

  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {

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
  }

  onDaySelected(day: AvailableDay) {
    const prevSelected = day.selected;
    this.availableDays.forEach(d => d.selected = false);
    day.selected = !prevSelected;
    if (!day.selected) {
      this.availableTime = [];
    } else {
      this.availableTime = day.availableTime.map(date => {
        return {
          caption: moment(date).format('hh:mm'),
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
    this.setAvailableDays();
  }


}
