import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionlistComponent } from './mission-list/mission-list.component';

import { MissiondetailsComponent } from './mission-details/mission-details.component'; 
import { MissionfilterComponent } from './mission-filter/mission-filter.component';



export const routes: Routes = [
  { path: '', redirectTo: '/missions', pathMatch: 'full' },
  { path: 'missions', component: MissionlistComponent },
  { path: 'missions/:flightNumber', component: MissiondetailsComponent }, 
  { path: 'filtermissions', component: MissionfilterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


