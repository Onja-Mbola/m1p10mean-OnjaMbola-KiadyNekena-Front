import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../_services/services.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  Services:any = [];
  loading: boolean = true;

  constructor( private serviceService: ServiceService) { 
    this.readService();
  }
  readService(){
    this.serviceService.getServices().subscribe((data) => {
     this.Services = data;
     this.loading = false;
    }),
    (error) => {
      console.error('Error fetching services:', error);
      this.loading = false; // Set loading to false on error as well
    }
  }

  ngOnInit() {}

}
