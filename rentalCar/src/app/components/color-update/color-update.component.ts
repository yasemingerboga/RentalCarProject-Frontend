import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  currentColor: Color;
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getBrandById(params['colorId']);
      }
    });
    this.createColorUpdateForm();
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      name: ["", Validators.required],
      colorId:[""]
    });
  }
  update() {
    if (this.colorUpdateForm.valid) {
      let newBrandModel = Object.assign({}, this.colorUpdateForm.value);
      newBrandModel.colorId = this.currentColor.colorId;
      console.log(newBrandModel);
      this.colorService.update(newBrandModel).subscribe(
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
    this.colorService.getColorsByColorId(brandId).subscribe((response) => {
      this.currentColor = response.data;
    });
  }

}
