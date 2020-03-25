import { Component, OnInit, Input } from '@angular/core';
import { Barber } from 'src/app/interfaces/barber';

@Component({
  selector: 'app-barber',
  templateUrl: './barber.component.html',
  styleUrls: ['./barber.component.scss']
})
export class BarberComponent implements OnInit {

  @Input() barber: Barber;

  constructor() { }

  ngOnInit() {
  }

}
