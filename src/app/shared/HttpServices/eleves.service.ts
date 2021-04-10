import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Configurations} from "../../Configurations/configurations";

@Injectable({
  providedIn: 'root',
})
export class ElevesService {
  suffix: string = 'eleves';
  constructor(private httpClient: HttpClient) {}
  createEleve(data: {nom: string, prenom: string}): Observable<any>{
    return this.httpClient.post<any>(Configurations.baseURI + this.suffix, data);
  }
  loadData(page: number){
    return this.httpClient.get<any>(Configurations.baseURI + this.suffix + `?page=${page}`);
  }
  delete(id: string){
    return this.httpClient.delete<any>(Configurations.baseURI + this.suffix + `?id=${id}`);
  }
  update(id: string,data: {nom: string,prenom: string}){
    return this.httpClient.put<any>(Configurations.baseURI + this.suffix + `?id=${id}`, data);
  }
  loadAll(){
    return this.httpClient.get<any>(Configurations.baseURI + this.suffix+"/all");
  }
}
