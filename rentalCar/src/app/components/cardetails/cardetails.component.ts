import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

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
  constructor(private carImageService:CarimageService, 
    private carService:CarService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsByCarId(params["carId"]);
        this.getAllImagesByCarId(params["carId"]);
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
}