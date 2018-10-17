import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';

import { Work, WorkItem } from './../model/work';
import { WorkService } from '../work/work.service';

const OVERLAY_CLASS = 'nls-overlay';

@Component({
  selector: 'nls-details',
  exportAs: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  protected listSubscription: Subscription;
  protected urlSubscription: Subscription;
  protected url: UrlSegment[];
  protected work: Work[];
  protected item: WorkItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService
  ) {
    this.listSubscription = this.workService.listSingleItems().subscribe(res => this.work = res);

    this.urlSubscription = route.url.subscribe((u) => this.url = u);
  }

  ngOnInit() {
    document.body.classList.add(OVERLAY_CLASS);

    if (!this.findItem()) {
      return this.close();
    }
  }

  ngOnDestroy() {
    document.body.classList.remove(OVERLAY_CLASS);
    this.listSubscription.unsubscribe();
  }

  protected findItem() {
    this.item = this.work.find((item: WorkItem) => {
      return item.fullPath === this.url.join('/');
    });

    return this.item;
  }

  public close() {
    this.router.navigate([
      {
        outlets: {
          details: null
        }
      }
    ]);
    return false;
  }

}
