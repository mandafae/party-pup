import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Dog } from './dog';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DogsService {

  private dogsUrl = 'api/dogs';

  postDog (dog: any): Observable<Dog> {
    return this.http.post<Dog>(this.dogsUrl, dog, httpOptions)
  }

  getDogs (): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl)
  }

  getDog (dog_id: number): Observable<Dog> {
    const url = `${this.dogsUrl}/${dog_id}`
    return this.http.get<Dog>(url)
  }

  editDog (dog: any): Observable<any> {
    const url = `${this.dogsUrl}/${dog.id}`
    return this.http.patch<any>(url, dog, httpOptions)
  }

  deleteDog(dog_id) {
    // console.log("SERVICE FUNCTION FIRED!")
    // console.log("ID IN SERVICE:", dog_id)
    const url = `${this.dogsUrl}/${dog_id}`
    return this.http.delete(url).subscribe(res => console.log(res));
  }

  // Error handling
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}

  constructor( private http: HttpClient ) { }

}
