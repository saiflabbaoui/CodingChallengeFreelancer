import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Url = 'http://localhost:8080/api/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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

  delete(id): Observable<any> {
    return this.http.delete(`${Url}/${id}`);
  }

  update(data, id): Observable<any> {
    return this.http.put(`${Url}/${id}`, data);
  }

}
