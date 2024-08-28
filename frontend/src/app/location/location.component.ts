import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;


//Interface para las ciudades
export interface ICity {
  id: number;
  name: string;
  currency_name: string;
  currency_symbol: string;
  currency_code: string;
}


//Interface para la data que se envía al api
export interface IFormData {
  city: string;
  budget: string;
}

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  title = 'Travel APP';

  //Se crea variable de tipo ICity para almacenar las ciudades
  cities: ICity[] = [];

  //Constructor para navegar en las rutas
  constructor(private router: Router) { }

  //Servicio HTTP para el cargue de ciudades.
  ngOnInit(): void {
    $.ajax({
      url: 'http://localhost:8000/api/show_cities',
      method: 'GET',
      success: (data: any) => {
        this.cities = data.data;
      },
      error: (jqXHR: string, textStatus: string, errorThrown: string | Error) => {
        console.error('Error:', textStatus, errorThrown);
      }
    });
  }

  //Consulta toda la información de necesaria para la vista de resultado
  next() {

    //Toma los inputs de los valores a enviar
    const city = document.getElementById('city') as HTMLInputElement;
    const budget = document.getElementById('budget') as HTMLInputElement;

    if (city && budget) {
      // Valido que los campos tengan valores, si no envía una alerta
      if (city.value.trim() === '' || budget.value.trim() === '') {
        alert('Por favor rellene todos los campos');
        return;
      }
      //Variables para efecto del botón cargando
      const span = document.getElementById('span');
      const btn = document.getElementById('consult');

      //Agrego las clases necesarias para el loader del botón
      span?.classList.add('d-none');
      btn?.classList.add('loader');

      //Creo variable con los datos necesarios para la API
      const formData:IFormData = {
        'city': city.value,
        'budget': budget.value
      };

      $.ajax({
        url: 'http://localhost:8000/api/responseInfo',
        type: 'POST',
        data: formData,
        success: (data: any) => {

          //Toma la información que responda y la petición y la almacena en el sessionStorage
          sessionStorage.setItem('data', JSON.stringify(data.data));

          //Desactiva el loader del botón
          span?.classList.remove('d-none');
          btn?.classList.remove('loader');

          //Navega a la ruta de resultado.
          this.router.navigate(['/resultado']);
        },
        error: (jqXHR: any, textStatus: string, errorThrown: string | Error) => {
          console.error('Error:', textStatus, errorThrown);
        }
      });
    }
  }
}
