import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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
    });
  }

  public update(updatedMeta: Meta): void {
    this.meta = {
      ...this.meta,
      ...updatedMeta
    };
  }
}
