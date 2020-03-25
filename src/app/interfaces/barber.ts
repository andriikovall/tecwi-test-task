import { Service } from './service';

export interface Barber {
  fullname: string,
  photoUrl: string,
  services: string[] | Service[],
  appointmentsFreeTime: Date[],
  bio?: string;
}
