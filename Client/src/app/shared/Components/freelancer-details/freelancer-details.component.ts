import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../Models/project.model';
import { FreelancerService } from '../../services/freelancer.services';
import { ProjectService } from '../../services/projcet.services';

@Component({
  selector: 'app-freelancer-details',
  templateUrl: './freelancer-details.component.html',
  styleUrls: ['./freelancer-details.component.css']
})
export class FreelancerDetailsComponent implements OnInit {

  freelancerId: any;
  freelancer: any;
  projects: Project[] = []
  selectedP :any
  constructor(private route:ActivatedRoute, private freelancerService : FreelancerService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getIdFromPath();
    this.getAllProjects();
  }

  getIdFromPath(){
    this.route.params.subscribe(param => {
      this.freelancerId = param["id"];
      this.getFreelancerById();
    })
    
  }

  getFreelancerById(){
    this.freelancerService.get(this.freelancerId).subscribe(item => {
      this.freelancer = item;
      console.log('freelancer',this.freelancer)
    })
  }

  getAllProjects(){
    this.projectService.getAll().subscribe(result => {
      result ? this.projects = result : this.projects = [];
      console.log('projects',this.projects)
    })
  }

  addProjectToFreelancer(){
    if (this.selectedP) {
      this.selectedP.forEach(value =>{
        this.freelancerService.addProject(this.freelancerId,value);
      })
     this.getFreelancerById();
    }
  }
}
