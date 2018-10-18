import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment as env } from './../../environments/environment';
import { Meta } from './../model/meta';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  protected meta: Meta;

  constructor() { }

  public retrieve(): Observable<Meta> {
    return new Observable(observer => {
      observer.next(this.meta);
      observer.complete();
    });
  }

  public update(updatedMeta: Meta): void {
    this.meta = {
      ...env.meta,
      ...updatedMeta
    };
  }
}
