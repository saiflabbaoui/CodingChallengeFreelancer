import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Freelancer } from '../../Models/freelancer.model';
import { FreelancerService } from '../../services/freelancer.services';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.css']
})
export class FreelancerComponent implements OnInit {

  freelancers : Freelancer[] = [];
  filtredFreelancers: Freelancer[] = [];
  FreelancerForm : FormGroup;
  addForm : FormGroup;
  constructor(private freelancerService: FreelancerService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getAllFreelancers();
    this.initForm();
    this.initAddForm();
    this.search();
  }

  initForm(){
    this.FreelancerForm = new FormGroup({
      searchInput: new FormControl()
    })
  }

  initAddForm(){
    this.addForm = new FormGroup({
      name: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
      phoneNumber: new FormControl("",Validators.required),
      adress: new FormControl(""),
      website: new FormControl("",Validators.required),
    })
  }

  getAllFreelancers(){
    this.freelancerService.getAll().subscribe(result => {
      result ? this.freelancers = result : this.freelancers = [];
      this.filtredFreelancers = this.freelancers;
      console.log('freelancers',this.filtredFreelancers)
    })
  }
  
  search() {
    this.FreelancerForm.controls.searchInput.valueChanges.subscribe(change => {
      const input = change.toLowerCase();
      input 
      ? this.filtredFreelancers = this.freelancers.filter(x => x.name.toLowerCase().includes(input)) 
      : this.filtredFreelancers = this.freelancers;
    })
  }

  openAddDialog(content){
    this.addForm.reset();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  addFreelancer(){
    let freelancer = new Freelancer();
    freelancer.name = this.addForm.controls.name.value;
    freelancer.email = this.addForm.controls.email.value;
    freelancer.phoneNumber = this.addForm.controls.phoneNumber.value;
    freelancer.address = this.addForm.controls.adress.value;
    freelancer.website = this.addForm.controls.website.value;
    console.log('freelancer',freelancer)
      this.freelancerService.create(freelancer).subscribe(item => {
        this.getAllFreelancers();
        this.modalService.dismissAll();
      });
  }

  navigateToDetails(id){
    this.router.navigate(['/freelancerDetails',id])
  }
}
