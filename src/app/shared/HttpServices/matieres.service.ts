import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UtilService} from "./util.service";
import {Configurations} from "../../Configurations/configurations";

@Injectable({
  providedIn: 'root',
})
export class MatieresService {

  suffix = 'matieres';
  constructor(private httpClient: HttpClient,
              private utilService: UtilService) {}

  create(data: {image: string,profName: string,matiere: string,icone: string}){
      const formData: FormData = new FormData();
      formData.append('image',this.utilService.dataURItoBlob(data.image));
      formData.append('nom', data.matiere);
      formData.append('nomProf', data.profName);
      formData.append('icone', data.icone);
      return this.httpClient.post<any>(Configurations.baseURI + this.suffix, formData, {reportProgress: true, observe: 'events'});
  }
  load(page: number){
    return this.httpClient.get<any>(Configurations.baseURI + this.suffix + `?page=${page}`);
  }
  delete(id: string){
    return this.httpClient.delete<any>(Configurations.baseURI + this.suffix + `?id=${id}`);
  }
}
