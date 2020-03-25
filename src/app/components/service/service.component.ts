import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/interfaces/service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input() service: Service;

  placeholderServiceImageUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vinnitsa.info%2Fnews%2Fmuzhskye-parykmakherskye-v-vynnytse-vybyraem-barbershop.html&psig=AOvVaw1Bx8_F52L1uI99eo4Ox0IW&ust=1585224128428000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCPhZ3KtegCFQAAAAAdAAAAABAD';

  constructor() { }

  ngOnInit() {
  }

}
