import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss']
})

/**
 * JUST FOR RESULTS DEMO
 * NOT INTENDED TO BE IN PROD
 */
export class ResultModalComponent implements OnInit {

  constructor(public modalRef: MDBModalRef) { }

  result: any;

  get resultEntries() {
    return Object.entries(this.result);
  }

  ngOnInit() {
  }

}
