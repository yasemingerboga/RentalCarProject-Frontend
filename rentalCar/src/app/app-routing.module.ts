import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CardetailsComponent},
  {path:"rent/car/:carId",component:PaymentComponent},
  {path:"cars/cardetails/:rentDate&:carId",component:CardetailsComponent},
  {path:"payment/:cardNumber",component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"brand/update/:brandId",component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"color/update/:colorId",component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"car/update/:carId",component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"profile/:userId",component:UserInformationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
