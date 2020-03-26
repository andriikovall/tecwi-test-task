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
    { 'id': 'a', 'name': 'Basic haircut', 'price': 100, 'photoUrl': 'https://zachiska.com/wp-content/uploads/2019/08/68836603_764108664044306_5870815738400695706_n.jpg' },
    { 'id': 'b', 'name': 'Super haircut', 'price': 200, 'photoUrl': 'https://top-barbershop.com/media/2019/02/3e1db0fd946f46880f9583306ada197d.jpg'},
    { 'id': 'c', 'name': 'Basic haircut + shaving', 'price': 250 },
    { 'id': 'd', 'name': 'Super haircut + shaving', 'price': 400 },
    { 'id': 'e', 'name': 'Sincere talk about life', 'price': 1 },
  ]


  private generateRandomFutureDates(count: number): Date[] {
    const dates: Date[] = [];
    const mSecInDay = 86400000;
    const mSecInMinute = 60000;

    for (let i = 0; i < count; i++) {
      const date = new Date(Date.now() + Math.random() * count * mSecInDay + Math.random() * 60 * mSecInMinute * 30);
      dates.push(date);
    }

    return dates.sort((d1, d2) => d1 > d2 ? 1 : -1);
  }

  getAllBarbers(): Observable<Barber[]> {

    const barbers = [
      { fullname: 'Andriano Chelentano', services: ['a', 'b'], photoUrl: 'assets/barber1.jpg', appointmentsFreeTime: this.generateRandomFutureDates(Math.random() * 100) },
      { fullname: 'Bob Marley', services: ['b', 'c'], photoUrl: 'assets/barber2.jpg', appointmentsFreeTime: this.generateRandomFutureDates(Math.random() * 100) },
      { fullname: 'Bob Marley', services: ['c', 'd'], photoUrl: 'assets/barber3.jpg', appointmentsFreeTime: this.generateRandomFutureDates(Math.random() * 100) },
      { fullname: 'Bob Marley', services: ['e', 'a'], photoUrl: 'assets/barber1.jpg', appointmentsFreeTime: this.generateRandomFutureDates(Math.random() * 100) },
      { fullname: 'Bob Marley', services: ['213', '21sdfds12'], photoUrl: 'assets/barber2.jpg', appointmentsFreeTime: this.generateRandomFutureDates(Math.random() * 100) }

    ];
    return from(new Promise<Barber[]>((resolve, reject) => setTimeout(_ => resolve(barbers), 1000)));
  }

  getServiceById(id: string): Observable<Service> {
    const service = this.services.find(s => s.id !== id);
    return of(service);
  }

  getBarberServices(barber: Barber): Observable<Service[]> {
    let ids: string[] = [];
    if (typeof (barber.services[0] || '') === 'string') {
      ids = barber.services as string[];
    } else {
      ids = (barber.services as Service[]).map((s: Service) => s.id);
    }
    const services = this.services.filter(s => ids.includes(s.id));
    // just for loading delay
    return from(new Promise<Service[]>((resolve, reject) => setTimeout(_ => resolve(services), 1000)));

  }
}
