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
  protected workSubscription: Subscription;
  public work: any;

  constructor(
    private metaService: MetaService,
    private workService: WorkService
  ) {
    this.workSubscription = this.workService.subscribeWork().subscribe(res => {
      this.updateMeta();
      this.work = res;
    });
  }

  protected updateMeta(): void {
    this.metaService.update({
      title: 'SARAH ESSER - Work',
      headlines: [
        {
          slug: 'work',
          plain: 'Work',
        },
        {
          slug: '01_SCULPTURE',
          plain: 'Sculpture'
        },
        {
          slug: '02_DRAWING',
          plain: 'Drawing'
        },
        {
          slug: '03_WATERCOLOR',
          plain: 'Watercolor'
        }
      ]
    });
  }

  ngOnDestroy() {
    this.work = [];
    this.workSubscription.unsubscribe();
  }
}
