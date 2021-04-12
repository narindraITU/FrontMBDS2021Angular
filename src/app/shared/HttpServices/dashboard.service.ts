import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Configurations} from "../../Configurations/configurations";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  suffix = 'dashboard';
  private counts: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor(private httpClient: HttpClient) {}

  loadCounts(): Observable<any>{
    return this.httpClient.get<any>(Configurations.baseURI + this.suffix + '/counts');
  }
  getCounts(): Observable<any | null>{
    return new Observable(fn => this.counts.subscribe(fn));
  }
  statsAssignments(): Observable<any>{
    return this.httpClient.get<any>(Configurations.baseURI + this.suffix + '/stats_assignments');
  }
  reloadCounts(){
    this.loadCounts().subscribe((data) => {
      this.counts.next(data);
    }, error => {
      console.log(error);
    });
  }
}
