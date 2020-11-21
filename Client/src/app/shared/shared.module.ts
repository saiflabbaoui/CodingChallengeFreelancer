import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreelancerComponent } from './Components/freelancer/freelancer.component';
import { ProjectComponent } from './Components/project/project.component';
import { FreelancerDetailsComponent } from './Components/freelancer-details/freelancer-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FreelancerComponent,
    ProjectComponent,
    FreelancerDetailsComponent
  ]
})

export class SharedModule {}
