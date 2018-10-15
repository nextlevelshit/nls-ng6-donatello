import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Meta } from './../model/meta';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  protected meta: Meta;

  constructor() {
    this.meta = {
      title: 'Start Titel',
      description: 'Start Beschreibung',
      headlines: [
        {
          slug: 'das-waere-eine-ueberschrift',
          plain: 'Das wäre eine Überschrift',
          children: [
            {
              slug: 'das-waere-eine-unterueberschrift',
              plain: 'Das wäre eine Unterüberschrift',
            },
            {
              slug: 'das-waere-eine-unterueberschrift',
              plain: 'Das wäre eine Unterüberschrift',
            },
            {
              slug: 'das-waere-eine-unterueberschrift',
              plain: 'Das wäre eine Unterüberschrift',
            }
          ]
        }
      ]
    };
  }

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
