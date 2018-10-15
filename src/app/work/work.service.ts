import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Work } from './../model/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  work: Work[];

  constructor() {
    this.work = [
      {
        title: 'Sculptures',
        fullPath: '_content/work/sculpture',
        items: [
          {
            title: 'Gähnschreier',
            fullPath: '_content/work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin'
            ],
            pictures: [
              {
                fullPath:  '_content/work/sculpture/WV-2016-010/WV-2016-010-1.JPG'
              }
            ]
          }
        ]
      },
      {
        title: 'Drawings',
        fullPath: '_content/work/drawing/',
        items: [
          {
            title: 'Nacker Mann',
            fullPath: '_content/work/drawing/Z-WV-2018-001',
            information: [
              '100 x 200 cm',
              '2018',
              'Paris'
            ],
            pictures: []
          }
        ]
      }
    ];
  }

  public listAll(): Observable<Work[]> {
    return new Observable(observer => {
      observer.next(this.work);
    });
  }
}
