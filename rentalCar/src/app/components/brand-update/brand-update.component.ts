import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  currentBrand: Brand;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ["", Validators.required],
      brandId:[""]
    });
  }
  update() {
    if (this.brandUpdateForm.valid) {
      let newBrandModel = Object.assign({}, this.brandUpdateForm.value);
      newBrandModel.brandId = this.currentBrand.brandId;
      console.log(newBrandModel);
      this.brandService.update(newBrandModel).subscribe(
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
  getBrandById(brandId: number) {
    this.brandService.getBrandsByBrandId(brandId).subscribe((response) => {
      this.currentBrand = response.data;
    });
  }
}
