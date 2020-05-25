import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { People } from '../shared/interface/people';
import { SortedData } from '../shared/interface/sorted-data';
import { ReturnData } from '../shared/interface/return-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public callMap$ = new Subject<any>();
  public editUser$ = new Subject<{ user: People; updatedUser: People }>();
  public dataOrigin: ReturnData;

  constructor(private http: HttpClient) {}

  getPeoples(url: string): Observable<ReturnData> {
    return this.http.get<People[]>(url).pipe(
      map((res) => {
        this.dataOrigin = this.sortDataAll(res);
        return this.dataOrigin;
      })
    );
  }

  updateUser(user: People): ReturnData {
    let u = this.dataOrigin.origin.find((d) => d._id === user._id);
    u = user;
    this.dataOrigin = this.sortDataAll(this.dataOrigin.origin);
    return this.dataOrigin;
  }

  sortDataAll(data: People[]): ReturnData {
    const eye = this.sortBy(data, 'eyeColor');
    const fruit = this.sortBy(data, 'fruit', 'preferences');
    const pet = this.sortBy(data, 'pet', 'preferences');
    const gender = this.sortBy(data, 'gender');

    return {
      origin: data,
      eyeColor: eye.dataset,
      pet: pet.dataset,
      fruit: fruit.dataset,
      gender: gender.dataset,
      filters: {
        eyeColor: eye.values,
        pet: pet.values,
        fruit: fruit.values,
        gender: gender.values,
      },
    };
  }

  sortBy(
    data: People[],
    nodeName: string,
    nodeParent?: string
  ): { dataset: SortedData[]; values: string[] } {
    const alreadySet = ['all'];
    const dataset = [];

    data.map((d) => {
      const toCheck = nodeParent ? d[nodeParent][nodeName] : d[nodeName];
      const found = alreadySet.includes(toCheck);
      if (!found) {
        dataset.push({
          value: toCheck,
          peoples: [],
        });
        alreadySet.push(toCheck);
      }
      const toAdd = dataset.find((c) => c.value === toCheck);
      toAdd.peoples.push(d);
    });

    return { dataset, values: alreadySet };
  }
}
