import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CircolariProvider {

  constructor(public http: Http) {
    console.log('Hello CircolariProvider Provider');
  }

  circolariResponse;

  getCircolari(number){
      this.circolariResponse = this.http.get('https://itiscircolari.herokuapp.com/?page='+number).map(res => res.json()).subscribe(data => {
        return this.circolariResponse;
        });
  }

}
