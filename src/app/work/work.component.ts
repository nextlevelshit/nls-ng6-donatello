import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MetaService } from './../meta/meta.service';
import { IWorkItem } from './../app.ontology';
import { WorkService } from './work.service';

@Component({
  selector: 'nls-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnDestroy {

  protected work: any;
  protected workSubscription: Subscription;

  constructor(
    private metaService: MetaService,
    private workService: WorkService
  ) {
    this.workSubscription = this.workService.subscribeWork().subscribe(res => {
      // console.log('WorkComponent.constructor()', res);

      this.updateMeta();
      this.work = res;
    });
  }

  protected updateMeta(): void {
    this.metaService.update({
      title: 'Work Titel',
      description: 'Work Beschreibung',
      keywords: [
        'sarah esser',
        'sarah esser bildhauer',
        'sarah esser bildhauerin',
        'skulpturen',
        'skulpturen berlin',
        'sculptures berlin',
        'bildhauerin berlin',
        'art berlin sculpture'
      ],
      headlines: [
        {
          slug: 'work',
          plain: 'Work',
          children: [
            {
              slug: 'sculpture',
              plain: 'Skulpturen'
            },
            {
              slug: 'drawing',
              plain: 'Zeichnung'
            }
          ]
        }
      ]
    });
  }

  ngOnDestroy() {
    this.work = [];
    this.workSubscription.unsubscribe();
  }
}
