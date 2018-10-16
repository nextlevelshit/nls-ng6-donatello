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
        fullPath: 'work/sculpture/',
        items: [
          {
            title: 'Gähnschreier',
            fullPath: 'work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin'
            ],
            pictures: [
              {
                fullPath:  '/app/_content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              }
            ]
          },
          {
            title: 'Gähnschreier II',
            fullPath: 'work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin',
              'Unregelmäßigkeit',
              'macht Freude'
            ],
            pictures: [
              {
                fullPath:  '/app/_content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              }
            ]
          },
          {
            title: 'Gähnschreier III',
            fullPath: 'work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin',
              'mal',
              'ganz',
              'viel',
              'Informationsgedöns'
            ],
            pictures: [
              {
                fullPath:  '/app/_content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              }
            ]
          },
          {
            title: 'Gähnschreier IV',
            fullPath: 'work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin'
            ],
            pictures: [
              {
                fullPath:  '/app/_content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              }
            ]
          },
          {
            title: 'Gähnschreier V',
            fullPath: 'work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin'
            ],
            pictures: [
              {
                fullPath:  '/app/_content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              }
            ]
          }
        ]
      },
      {
        title: 'Drawings',
        fullPath: 'work/drawing/',
        items: [
          {
            title: 'Bloom',
            fullPath: 'work/drawing/Z-WV-2018-001',
            information: [
              '100 x 200 cm',
              '2018',
              'Paris',
              'Kerzen',
              'Ghandi Brille',
              'Gitarre unscharf im Hintergrund, ganz wichtig'
            ],
            pictures: [
              {
                fullPath: '/app/_content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
                alt: 'Details of Drawing'
              }
            ]
          },
          {
            title: 'Bloom I',
            fullPath: 'work/drawing/Z-WV-2018-001',
            information: [
              '100 x 200 cm',
              '2018',
              'Paris',
            ],
            pictures: [
              {
                fullPath: '/app/_content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
                alt: 'Details of Drawing'
              }
            ]
          },
          {
            title: 'Bloom II',
            fullPath: 'work/drawing/Z-WV-2018-001',
            information: [
              '100 x 200 cm'
            ],
            pictures: [
              {
                fullPath: '/app/_content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
                alt: 'Details of Drawing'
              }
            ]
          },
          {
            title: 'Bloom III',
            fullPath: 'work/drawing/Z-WV-2018-001',
            information: [
              '100 x 200 cm',
              '2018',
              'Paris'
            ],
            pictures: [
              {
                fullPath: '/app/_content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
                alt: 'Details of Drawing'
              }
            ]
          },
          {
            title: 'Bloom IV',
            fullPath: 'work/drawing/Z-WV-2018-001',
            information: [
              '100 x 200 cm',
              '2018',
              'Paris',
              'Kerzen',
              'Ghandi Brille',
              'Gitarre unscharf im Hintergrund, ganz wichtig'
            ],
            pictures: [
              {
                fullPath: '/app/_content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
                alt: 'Details of Drawing'
              }
            ]
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
