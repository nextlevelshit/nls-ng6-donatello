import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment as env } from './../../environments/environment';
import { IMetaData } from './../model/meta';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  protected meta: IMetaData;

  constructor() { }

  public retrieve(): Observable<IMetaData> {
    return new Observable(observer => {
      observer.next(this.meta);
      observer.complete();
    });
  }

  public update(updatedMeta: IMetaData): void {
    this.meta = {
      ...env.meta,
      ...updatedMeta
    };
  }
}
