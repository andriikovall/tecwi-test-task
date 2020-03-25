import { Component, OnInit } from '@angular/core';
import { Barber } from './interfaces/barber';
import { Service } from './interfaces/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedBarber: Barber;
  selectedService: Service;

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
