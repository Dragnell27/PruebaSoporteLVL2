import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { ResultInfoComponent } from './result-info/result-info.component';

declare var $:any;


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LocationComponent,ResultInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'Travel APP'
}
