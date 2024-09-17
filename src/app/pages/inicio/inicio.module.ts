import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { MatDatepickerActions, MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [
     CommonModule
    ,FormsModule
    ,IonicModule
    ,InicioPageRoutingModule
    ,MatDatepickerModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
