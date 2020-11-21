import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project, TypeP } from '../../Models/project.model';
import { ProjectService } from '../../services/projcet.services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects : Project[] = [];
  filtredProject: Project[] = [];
  projectForm : FormGroup;
  addForm : FormGroup;
  editMode = false;
  currentId: any;
  constructor(private projectService: ProjectService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllProjects();
    this.initForm();
    this.initAddForm();
    this.search();
  }

  initForm(){
    this.projectForm = new FormGroup({
      searchInput: new FormControl()
    })
  }

  initAddForm(){
    this.addForm = new FormGroup({
      name: new FormControl("",Validators.required),
      startDate: new FormControl("",Validators.required),
      endDate: new FormControl("",Validators.required),
      duration: new FormControl(""),
      type: new FormControl("",Validators.required),
    })
  }

  getAllProjects(){
    this.projectService.getAll().subscribe(result => {
      result ? this.projects = result : this.projects = [];
      this.filtredProject = this.projects;
      console.log('testid',this.filtredProject)
    })
  }
  
  search() {
    this.projectForm.controls.searchInput.valueChanges.subscribe(change => {
      const input = change.toLowerCase();
      input 
      ? this.filtredProject = this.projects.filter(x => x.name.toLowerCase().includes(input)) 
      : this.filtredProject = this.projects;
    })
  }

  openAddDialog(content){
    this.addForm.reset();
    this.editMode = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  addProject(){
    let project = new Project();
    project.name = this.addForm.controls.name.value;
    project.startDate = this.addForm.controls.startDate.value;
    project.endDate = this.addForm.controls.endDate.value;
    project.duration = this.diffDate(project.endDate,project.startDate).toString();
    project.type = this.getType(this.addForm.controls.type.value);
    if (this.editMode){
      this.projectService.update(project, this.currentId).subscribe(item=>{
        this.getAllProjects();
        this.modalService.dismissAll();
      })
    } else {
      this.projectService.create(project).subscribe(item => {
        this.getAllProjects();
        this.modalService.dismissAll();
      });
    }    
  }

  getType(type){
    switch (type) {
      case 'Web':
        return TypeP.Web;
      case 'Mobile':
          return TypeP.Mobile;
      case 'Both':
        return TypeP.both;
    }
  }

  diffDate(date1, date2){
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    // différence des heures
    let time_diff = d1.getTime() - d2.getTime();
     // différence de jours
    let days_Diff = time_diff / (1000 * 3600 * 24);
    // afficher la différence
    return days_Diff;
  }

  editProject(content, id, project){
    this.editMode =true;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.addForm.controls.name.setValue(project.name);
    this.addForm.controls.startDate.setValue(new Date(project.startDate));
    this.addForm.controls.endDate.setValue(project.endDate);
    this.addForm.controls.duration.setValue(project.duration);
    this.addForm.controls.type.setValue(project.type);
    this.currentId = id; 
  }

  deleteProject(id, project){
    if (new Date().getTime() > new Date(project.startDate).getTime()) {
      alert('You can\'t project already started at :'+ new Date(project.startDate));
    } else {
      this.projectService.delete(id).subscribe(result=>{
        this.getAllProjects();
      });
    }
  }
  
}
