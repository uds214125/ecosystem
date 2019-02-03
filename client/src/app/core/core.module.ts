import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';

import { ConfigEditComponent } from './config/config-edit-component';
import { ConfigService } from './config/config.service';
import { ConfigComponent } from './config/config.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [ConfigComponent, ConfigEditComponent ],
  providers: [ ConfigService , NgbModalStack],
  entryComponents: [ ConfigEditComponent]
})
export class CoreModule { }
