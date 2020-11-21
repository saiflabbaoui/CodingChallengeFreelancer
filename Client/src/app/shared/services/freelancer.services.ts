import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FreelancerProject } from '../Models/freelancer.model';

const Url = 'http://localhost:8080/api/freelancer';


@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(Url);
  }

  get(id): Observable<any> {
    return this.http.get(`${Url}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(Url, data);
  }

  addProject(freelancerId, projectId): Observable<any> {
    let x = new FreelancerProject();
    x.freelancerId = freelancerId;
    x.projectId = projectId;
    return this.http.put(`${Url}/${freelancerId}`, x );
  }
}
