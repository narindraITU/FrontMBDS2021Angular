import { Injectable } from '@angular/core';
import {AssignmentModel} from '../../assigments/assignment.model';
import {forkJoin, Observable, of} from 'rxjs';
import {LoggingService} from '../Others/logging.service';
import {HttpClient} from '@angular/common/http';
import {data} from '../data';
import {Configurations} from '../../Configurations/configurations';
import {Matiere} from "../../Matieres/matiere.model";
import {Eleves} from "../../Eleves/eleves.model";

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
    return this.httpClient.post<AssignmentModel>(Configurations.baseURI + this.suffix, assignment);
  }
  peupler(data: any): Observable<any>{
    return this.httpClient.post<AssignmentModel>(Configurations.baseURI + this.suffix + '/peupler',data);
  }
  byEleve(page: number,idEleve: string){
    return this.httpClient.get<any>(Configurations.baseURI + this.suffix + '/byEleves', {
      params: {
        id: idEleve,
        page: `${page}`,
      }
    });
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
    matieres: Matiere[] = [],
    eleves: Eleves[] = [],
  ): Observable<Object> {
    const urlPagination = Configurations.baseURI + this.suffix;
    return this.httpClient.get<Object>(urlPagination,{
      params: {
        matieres: matieres.length > 0 ? matieres.map(value => value._id).join('|'): null,
        eleves: eleves.length > 0 ? eleves.map(value => value._id).join('|'): null,
      }
    });
  }
  rendre(id: string,note: number,description: string){
    return this.httpClient.post<any>(Configurations.baseURI + this.suffix + '/rendre', {
      id,
      note,
      description,
    });
  }
  annulerRendre(id: string){
    return this.httpClient.post<any>(Configurations.baseURI + this.suffix + '/annuler/rendre', {
      id,
    });
  }
  peuplerBDJoin(): Observable<any>[] {
    const calls = [];
    data.forEach((a) => {
      const new_assignment = new AssignmentModel();
      new_assignment.nom = a.nom;
      new_assignment.dateDeRendu = new Date(a.dateDeRendu);
      new_assignment.rendu = a.rendu;
      calls.push(this.peupler(new_assignment));
    });
    return calls;
  }
}
