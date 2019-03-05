import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [MatProgressSpinnerModule, MatInputModule]
})
export class AngularMaterialModule {}
