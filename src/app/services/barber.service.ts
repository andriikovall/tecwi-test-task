import { Injectable } from '@angular/core';
import { Barber } from '../interfaces/barber';
import { Observable, of, from } from 'rxjs';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})

/**
 * Simply hardcoded service for data.
 * Can be reimplemented with http requests withou changing the interface due to rxjs
 */
export class BarberService {

  constructor() { }

  services: Service[] = [
    { 'id': 'a', 'name': 'Basic haircut', 'price': 100 },
    { 'id': 'b', 'name': 'Super haircut', 'price': 200 },
    { 'id': 'c', 'name': 'Basic haircut + shaving', 'price': 250 },
    { 'id': 'd', 'name': 'Super haircut + shaving', 'price': 400 },
    { 'id': 'e', 'name': 'Sincere talk about life', 'price': 1 },
  ]

  getAllBarbers(): Observable<Barber[]> {
    const mSecInDay = 86400000;
    const mSecInMinute = 60000;
    const days: Date[] = [
      new Date('10:00'), new Date('10:30'), new Date('11:00'), new Date('11:30'),
      new Date(Date.now() + mSecInDay), new Date(Date.now() + mSecInDay + mSecInMinute * 30),
      new Date(Date.now() + 2 * mSecInDay), new Date(Date.now() + 2 * mSecInDay + mSecInMinute * 30)
    ]
    return of([
      { fullname: 'Andriano Chelentano', services: ['213', '21312'], photoUrl: 'src/app/assets/barber1.jpg', appointmentsFreeTime: days },
      { fullname: 'Bob Marley', services: ['213', '21sdfds12'], photoUrl: 'src/app/assets/barber2.jpg', appointmentsFreeTime: days }
    ])
  }

  getServiceById(id: string): Observable<Service> {
    const service = this.services.find(s => s.id !== id);
    return of(service);
  }
}