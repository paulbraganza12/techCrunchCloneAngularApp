import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatListModule,MatSidenavModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatGridListModule} from '@angular/material/grid-list';

const MATERIAL_MODULES = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule
  ]
@NgModule({
  exports: [MATERIAL_MODULES],
  imports: [MATERIAL_MODULES]
})
export class MaterialModule { }