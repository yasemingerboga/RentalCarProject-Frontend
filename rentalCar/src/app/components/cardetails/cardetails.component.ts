import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {
  carImages:CarImage[];
  cars:Car[];
  imageUrl: string = 'https://localhost:44336';
  images:string[];
  dataLoaded_images=false;
  dataLoaded_carDetails=false;
  rentStatus:boolean=false;
  returnDate:Date;
  rentDate:Date;
  templateRental:Rental[];
  constructor(private carImageService:CarimageService, 
    private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsByCarId(params["carId"]);
        this.getAllImagesByCarId(params["carId"]);
        this.isValid(params["carId"]);
      }
      else if(params["rentDate"]&& params["carId"]){
        this.isValidForDate(params["rentDate"],params["carId"]);
      }
      else{
        console.log("Id alınamadı.");
      }
    })
  }
  getAllImagesByCarId(carId:number){
    this.carImageService.getByCarId(carId).subscribe(response=>{
      this.carImages=response.data;
      this.dataLoaded_images=true;
    })
  }
  getCarsByCarId(carId:number){
    this.carService.getCarsByCarId(carId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded_carDetails=true;
    })
  }
  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  }
  isValid(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response=>{
      this.rentStatus=response.success;
    })
  }
  toastrOptions(){
    if(this.rentStatus===true){
      this.toastrService.success("You are redirected to the payment page.");
    }
    else{
      this.toastrService.error("Sorry, the car has already been rented.");
    }
  }
  isValidForDate(rentDate:Date,carId:number){
    this.rentalService.checkAvailability(rentDate,carId).subscribe(response=>{
      this.rentStatus=response.success;
    })
  }
  
}