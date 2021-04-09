import { Injectable } from '@angular/core';
import {AssignmentModel} from '../../assigments/assignment.model';
import {forkJoin, Observable, of} from 'rxjs';
import {LoggingService} from '../Others/logging.service';
import {HttpClient} from '@angular/common/http';
import {data} from '../data';
import {Configurations} from '../../Configurations/configurations';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private assignments: AssignmentModel[] = [];
  suffix: string = 'assignments';
  constructor(private readonly loggingService: LoggingService,
              private readonly httpClient: HttpClient) {}

  getAssignments(): Observable<AssignmentModel[]> {
    return this.httpClient.get<AssignmentModel[]>(Configurations.baseURI);
  }
  getAssignment(id: string): Observable<AssignmentModel>{
    return this.httpClient.get<AssignmentModel | null>(Configurations.baseURI + this.suffix + '/' + id);
  }
  addAssignment(assignment: AssignmentModel): Observable<any>{
    return this.httpClient.post<AssignmentModel>(Configurations.baseURI, assignment);
  }
  updateAssignment(assignment: AssignmentModel): Observable<any>{
    this.loggingService.log(assignment, 'updated');
    return this.httpClient.put<AssignmentModel>(Configurations.baseURI + this.suffix, assignment);
  }
  deleteAssignment(assignment: AssignmentModel): Observable<any>{
    return this.httpClient.delete(Configurations.baseURI + this.suffix + '/' + assignment._id);
  }
  getAssignmentsPaginated(
    nextPage: Number = 1,
    isRendu: boolean,
  ): Observable<Object> {
    const urlPagination = Configurations.baseURI + this.suffix + `?page=${nextPage}&rendu=${isRendu}`;
    return this.httpClient.get<Object>(urlPagination);
  }
  peuplerBDJoin(): Observable<any> {
    const calls = [];
    data.forEach((a) => {
      const new_assignment = new AssignmentModel();
      new_assignment.nom = a.nom;
      new_assignment.dateDeRendu = new Date(a.dateDeRendu);
      new_assignment.rendu = false;
      calls.push(this.addAssignment(new_assignment));
    });
    return forkJoin(calls);
  }
}
