import { Component, OnInit } from '@angular/core';
import { Barber } from './interfaces/barber';
import { Service } from './interfaces/service';
import { MDBModalService } from 'angular-bootstrap-md';
import { BarberModalComponent } from './components/modals/barber-modal/barber-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedBarber: Barber;
  selectedService: Service;

  constructor(private modalService: MDBModalService) {}

  ngOnInit(): void {

  }

  onSelectBarbers() {
    const modalRef = this.modalService.show(BarberModalComponent);
    modalRef.content.response.subscribe(b => this.selectedBarber = b);
  }

}
