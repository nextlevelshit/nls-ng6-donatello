import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Work } from './../model/work';
import { SitemapService } from './../sitemap/sitemap.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService implements OnDestroy {

  protected sitemapSubscription: Subscription;
  public work: Work[];
  public sitemap: any[];

  constructor(
    private sitemapService: SitemapService
  ) {
    this.sitemapSubscription = this.sitemapService.find('work').subscribe(sitemap => {
      console.log(sitemap);
      this.work = this.parseWork(sitemap);
    });
  }

  ngOnDestroy() {
    this.sitemapSubscription.unsubscribe();
  }

  protected parseWork(sitemap: object): Work[] {

    return [
      {
        title: 'Sculptures',
        fullPath: 'work/sculpture/',
        items: [
          {
            title: 'Schlagwerker',
            fullPath: 'work/sculpture/WV-2016-010',
            information: [
              '200 x 300 cm',
              '2015',
              'Berlin'
            ],
            pictures: [
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Schlagwerker 1'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Schlagwerker 2'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Schlagwerker 3'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Schlagwerker 4'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Schlagwerker 5'
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
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
                alt: 'Details of Gähnschreier'
              },
              {
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
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
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
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
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
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
                fullPath:  '/content/work/sculpture/WV-2016-010/WV-2016-010-0.JPG',
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
                fullPath: '/content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
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
                fullPath: '/content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
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
                fullPath: '/content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
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
                fullPath: '/content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
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
                fullPath: '/content/work/drawing/Z-WV-2018-001/Z-WV-2018-001-0.jpeg',
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

  public listSingleItems(): Observable<Work[]> {
    return new Observable(observer => {
      const items = this.work.reduce((categories, category) => categories.concat(category.items), []);
      observer.next(items);
    });
  }
}
