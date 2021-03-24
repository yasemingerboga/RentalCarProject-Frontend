import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  currentCar: Car;
  cars: Car[] = [];
  brands: Brand[];
  colors: Color[];
  dataLoaded = false;
  selectedColor: number;
  selectedBrand: number;
  filterTextCar = '';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrand();
      this.getColor();
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else if (params['brandId'] && params['ColorId']) {
        this.search(params['brandId'], params['ColorId']);
      } else {
        this.getCars();
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColorId(colorId: number) {
    this.carService.getColorsById(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentCar(car: Car) {
    this.currentCar = car;
  }
  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) {
      return 'active';
    } else return '';
  }
  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  search(selectedBrand: number, selectedColor: number) {
    if (selectedBrand != null && selectedColor != null) {
      this.carService
        .getCarDetailsWithParameters(selectedColor, selectedBrand)
        .subscribe((response) => {
          this.cars = response.data;
        });
    } else if (selectedBrand == null && selectedColor != null) {
      this.getCarsByColorId(selectedColor);
    } else if (selectedBrand != null && selectedColor == null) {
      this.getCarsByBrandId(selectedBrand);
    } else {
      this.getCars();
    }
  }
}
