import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MetaService } from './../meta/meta.service';
import { IWorkItem, IWork } from '../model/work';
import { WorkService } from './work.service';

@Component({
  selector: 'nls-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnDestroy {

  protected work: IWork[];
  protected listSubscription: Subscription;

  constructor(
    private metaService: MetaService,
    private workService: WorkService
  ) {
    this.listSubscription = this.workService.all().subscribe(res => {
      this.updateMeta();
      this.updateWork(res);
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

  protected updateWork(updatedWorkList: IWork[]): void {
    this.work = updatedWorkList;
  }

  ngOnDestroy() {
    this.work = [];
    this.listSubscription.unsubscribe();
  }
}
