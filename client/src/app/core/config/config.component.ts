import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigEditComponent } from './config-edit-component';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  template : `
   

  <div class="container">
      <table class="table table-striped">
      <thead><tr>
            <th>Type</th>
            <th>Category</th>
            <th>Breed</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Food</th>
            <th>Speed</th>
            <th>Color</th>
            <th>Actions</th>
          </tr></thead>
      <tbody>  <tr *ngFor="let data of Configs">
            <td>{{data.Type}}</td>
            <td>{{data.Category}}</td>
            <td>{{data.Breed}}</td>
            <td>{{data.Height}}</td>
            <td>{{data.Weight}}</td>
            <td>{{data.Food}}</td>
            <td>{{data.Speed}}</td>
            <td>{{data.Color}}</td>
            <td>  
                <button (click)="onClickEdit(data)"> Edit </button>                  
            </td>
          </tr> </tbody>
      </table>
  </div>
  `
})
export class ConfigComponent implements OnInit {
  // @Output() passComplaint: EventEmitter<any> = new EventEmitter();
  Configs: any = [];
 
  constructor(private configService: ConfigService , private modal: NgbModal) {

    this.configService.getConfigurations().subscribe((data :any) => {
      // if the data will will be stored as nested document as array of object, then it will be fetched with below commented code.
      // data.forEach((element,i) => {
      //   if(element[0].length>0){
      //     element[0].forEach((el,j) => {
      //       this.complaints.push(el);
      //     });
      //   }else {
      //     this.complaints.push(element[0]);
      //   }
      // });
      this.Configs = data;
    }, err => {
      console.log(' Configs err ', err);
    });
  }
  
  ngOnInit() {
  }
  /**
   * 
   * @param data | selected row data
   * @description passing selected row to the modal instance for updating. On successfull update , modal will be closed.
   */
  onClickEdit(data) {
    const cvRef = this.modal.open(ConfigEditComponent);
    cvRef.componentInstance.configData = data; 
   
    cvRef.result.then(result => {
      alert(' Configuaration has been updated successfully. ')
    }).catch(cvRefErr => {
      console.log(' Something went wrong while updation. ');
    });

    // this.passConfig.emit(data);
    // cvRef.componentInstance.passConfig.subscribe((data) => {
    //   console.log(data);
    // });
  }


}
