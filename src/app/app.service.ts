import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
