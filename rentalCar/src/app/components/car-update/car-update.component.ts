import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  colors:Color[];
  brands:Brand[];
  carUpdateForm: FormGroup;
  currentCar: Car[];
  constructor(private colorService:ColorService,
    private brandService:BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
      }
    });
    this.getBrands();
    this.getColors();
    this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      name:["",Validators.required],
      descriptions:["",Validators.required],
      carId:[""]
    });
  }
  update() {
    if (this.carUpdateForm.valid) {
      let newCarModel = Object.assign({}, this.carUpdateForm.value);
      newCarModel.carId = this.currentCar[0].carId;
      console.log(newCarModel);
      this.carService.update(newCarModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success');
        },
        (responseError) => {
          if (responseError.error.message != null) {
            this.toastrService.error(responseError.error.message);
          }
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation error'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form error!');
    }
  }
  getCarsById(carId: number) {
    this.carService.getCarsByCarId(carId).subscribe((response) => {
      this.currentCar = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }
}
