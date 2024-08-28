import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface IData{
  budgetFinal:number;
  city:string;
  code:string;
  exchangeRate:number;
  icon:string;
  name:string;
  symbol:string;
  temp:number;
}

@Component({
  selector: 'app-result-info',
  standalone: true,
  imports: [],
  templateUrl: './result-info.component.html',
  styleUrl: './result-info.component.css'
})
export class ResultInfoComponent implements OnInit{

  data : any = {};
  constructor (private router: Router) {

  }

  //Carga la información del sessionStorage para pintarla en la vista result
  ngOnInit(): void {
    const storedData = sessionStorage.getItem('data');
    this.data = storedData ? JSON.parse(storedData) : {};
  }

  //Se devuelve a la vista principal
  return(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
