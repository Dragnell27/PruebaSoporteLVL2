import { Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { ResultInfoComponent } from './result-info/result-info.component';

export const routes: Routes = [
  {path: '', component: LocationComponent},
  {path: 'resultado', component: ResultInfoComponent},
];
