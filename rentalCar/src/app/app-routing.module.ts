import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CardetailsComponent},
  {path:"rent/car/:carId",component:PaymentComponent},
  {path:"cars/cardetails/:rentDate&:carId",component:CardetailsComponent},
  {path:"payment/:cardNumber",component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
