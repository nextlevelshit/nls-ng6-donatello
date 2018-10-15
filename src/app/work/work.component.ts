import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MetaService } from './../meta/meta.service';
import { WorkItem, Work } from '../model/work';
import { WorkService } from './work.service';

@Component({
  selector: 'nls-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnDestroy {

  protected work: Work[];

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService,
    private workService: WorkService
  ) {
    console.log('constructing work component');

    this.workService.listAll().subscribe(res => {
      this.updateWork(res);
      this.updateMeta();
    });
  }

  protected updateMeta(): void {
    this.metaService.update({
      title: 'Work Titel',
      description: 'Work Beschreibung',
      headlines: [
        {
          slug: 'sculpture',
          plain: 'Skulpturen'
        },
        {
          slug: 'drawing',
          plain: 'Zeichnung'
        }
      ]
    });
  }

  protected updateWork(updatedWorkList: Work[]) {
    this.work = updatedWorkList;
  }

  ngOnDestroy() {
    this.work = [];
  }
}
