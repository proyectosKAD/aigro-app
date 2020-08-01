import { Component } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {PhttpService} from './servicios/consultadatos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private phttp: PhttpService) {}

}