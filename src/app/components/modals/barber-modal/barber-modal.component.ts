import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Barber } from 'src/app/interfaces/barber';
import { BarberService } from 'src/app/services/barber.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-barber-modal',
  templateUrl: './barber-modal.component.html',
  styleUrls: ['./barber-modal.component.scss']
})
export class BarberModalComponent implements OnInit {

  constructor(private barberService: BarberService,
              public modalRef: MDBModalRef) { }

  response: Subject<Barber> = new Subject();
  barbers: Barber[];

  ngOnInit() {
    this.barberService.getAllBarbers().subscribe(barbers => {
      this.barbers = barbers;
    })
  }

  onBarberSelected(b: Barber) {
    this.response.next(b);
    this.modalRef.hide();
  }

}
