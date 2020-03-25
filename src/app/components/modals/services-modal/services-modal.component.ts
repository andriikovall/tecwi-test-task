import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { BarberService } from 'src/app/services/barber.service';
import { Barber } from 'src/app/interfaces/barber';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-services-modal',
  templateUrl: './services-modal.component.html',
  styleUrls: ['./services-modal.component.scss']
})
export class ServicesModalComponent implements OnInit {

  constructor(private barberService: BarberService,
              public modalRef: MDBModalRef) { }

  barber: Barber;

  services: Service[];

  response: Subject<Service> = new Subject();

  ngOnInit() {
    this.barberService.getBarberServices(this.barber).subscribe(services => {
      this.services = services;
    });
  }

  onServiceSelected(service: Service) {
    this.response.next(service);
    this.modalRef.hide();
  }

}
