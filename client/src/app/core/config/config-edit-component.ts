import { Component, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { ConfigService } from "./config.service";

@Component({
  selector: "config-edit-app",
  template: `<div class="container">
    <div class="modal-header">
      <h4 class="modal-title">{{heading}}</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form action="#" [formGroup]="configForm" (ngSubmit)="onSubmit()" autocomplete="off" novalidate>
    <div class="modal-body">
   
        <span><input type="text" class="form-control" formControlName="Type" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Type">{{configFormError.Type}}</span><br>           
        
        <span><input type="text" class="form-control" formControlName="Category" ></span> &nbsp;&nbsp; <span class="valid-error" *ngIf="configFormError.Category">{{configFormError.Category}}</span> <br>
        <span><input type="text" class="form-control" formControlName="Breed" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Breed">{{configFormError.Breed}}</span><br>
        <span><input type="text"class="form-control"  formControlName="Height" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Height">{{configFormError.Height}}</span><br>        
        <span><input type="text" class="form-control" formControlName="Weight" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Weight">{{configFormError.Weight}}</span><br>
        <span><input type="text" class="form-control" formControlName="Food" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Food">{{configFormError.Food}}</span><br>
        <span><input type="text" class="form-control" formControlName="Speed" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Speed">{{configFormError.Speed}}</span><br>
        <span><input type="text" class="form-control" formControlName="Color" ></span> &nbsp;&nbsp;<span class="valid-error" *ngIf="configFormError.Color">{{configFormError.Color}}</span><br>
        <span><input type="hidden" formControlName="_id" ></span> <br>
    </div>
     
    <div class="modal-footer" > 
        <button
          type="submit"
          class="btn btn-success"> Update
        </button>
    </div>
    </form></div>
  `,
  styles:[` 
     .valid-error {
      color: #a94442;
    }
  `]
})
export class ConfigEditComponent implements OnInit {
  closeResult: String;
  configData: any;

  // Type: String;
  // Category: String;
  // Breed : String ;
  // Height : Number;
  // configId : any;
  // Weight : Number ;
  // Food : Number;
  // Speed : Number;
  // Color : String;
  // _id : any;

  configForm: FormGroup;

  configFormError = {
    Type: '',
    Category: '',
    Breed: '',
    Height: '',
    Weight: '',
    Food: '',
    Speed: '',
    Color: ''
  };
  validationMessages = {
      Type: {
        required: 'Type is required.'
      },
      Category: {
        required: 'Category is required.'
      },
      Breed: {
        required: 'Breed is required.'
      },
      Height: {
        required: 'Height is required.',
        pattern : 'Enter only number.'
      },
      Weight: {
        required: 'Weight is required.',
        pattern : 'Enter only number.'
      },
      Food: {
        required: 'Food is required.'
      },
      Speed: {
        required: 'Speed is required.',
        pattern : 'Enter only number.'
      },
      Color: {
        required: 'Color is required.',
      }
  };
   
  constructor(public activeModal: NgbActiveModal, private modal: NgbModal, private configService: ConfigService) {
    this.createConfigEditForm();

  }

  ngOnInit() {
  
    // console.log(" configData : ", this.configData);

    const { _id, Type, Category, Breed, Height, Weight, Food, Speed, Color } = this.configData;
     
    // this.configForm.controls['Type'].patchValue(Type);
    this.configForm.patchValue({
      Type: Type,
      Category: Category,
      Breed: Breed,
      Height: parseInt(Height.split('cm')[0]),
      Weight: parseInt(Weight.split('kgs')[0]),
      Food: Food,
      Speed: parseInt(Speed.split('kmph')[0]),
      Color: Color,
      _id: _id,
    });
  }

createConfigEditForm(): void {
  const numberOnlyRegx = /^-?(0|[1-9]\d*)?$/;

    this.configForm = new FormGroup({
        Type: new FormControl('', [Validators.required]),
        Category: new FormControl('', [Validators.required]),
        Breed: new FormControl('', [Validators.required]),
        Height: new FormControl('', [Validators.required, Validators.pattern(numberOnlyRegx)]),
        Weight: new FormControl('', [Validators.required, Validators.pattern(numberOnlyRegx)]),
        Food: new FormControl('', [Validators.required]),
        Speed: new FormControl('', [Validators.required, Validators.pattern(numberOnlyRegx)]),
        Color: new FormControl('', [Validators.required]),
        _id: new FormControl('', [Validators.required])
    }, { updateOn: 'submit' });

    this.configForm.valueChanges.subscribe((data) => {
        this.validate(data,this.configForm, this.configFormError, this.validationMessages);
    });
}
onSubmit(): void {
  if (this.configForm.valid) {
      // console.log(this.configForm.value);
      const { _id, Type, Category, Breed, Height, Weight, Food, Speed, Color } = this.configForm.value;
      const finalValues = {
        Type: Type,
        Category: Category,
        Breed: Breed,
        Height: Height + 'cm',
        Weight: Weight + 'kgs',
        Food: Food,
        Speed: Speed + 'kmph',
        Color: Color,
        _id: _id
      }
      // console.log(finalValues);

      this.configService.updateConfigWhereId(finalValues).subscribe(res=> {
        if(res.status === true){
          this.activeModal.close();          
        }
      }, err =>{
        console.log(' err: ', err)
      });
  }else{
      this.validate(this.configForm.value,this.configForm, this.configFormError, this.validationMessages);
      alert('Please check your inputs.')
  }
}

validate(data: any, formGroup: FormGroup, formErrors, validationMessages): void {
  if (!formGroup) return;
  for (const field in formErrors) {
    formErrors[field] = '';
    const input = formGroup.get(field);
    if ((input.invalid && input.dirty) || (input.invalid && input.touched)) {
      for (const errors in input.errors) {
        formErrors[field] = validationMessages[field][errors];
      }
    } else {
      formErrors[field] = false;
    }
  }
}
}
