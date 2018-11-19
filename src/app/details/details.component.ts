import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';

import { IDirectory, IWorkItem } from './../app.ontology';
import { WorkService } from '../work/work.service';

const OVERLAY_CLASS = 'nls-overlay';

@Component({
  selector: 'nls-details',
  exportAs: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  protected itemSubscription: Subscription;
  protected urlSubscription: Subscription;
  protected url: UrlSegment[];
  protected work: IDirectory[];
  protected item: IWorkItem;
  public currentPicture: any | null;
  public currentIndex: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService
  ) {
    this.urlSubscription = route.url.subscribe(url => this.subsribeItem(url));
    this.currentIndex = 0;
  }

  ngOnInit() {
    document.body.classList.add(OVERLAY_CLASS);

    // if (!this.findItem()) {
    //   return this.close();
    // } else {
      // this.defineCurrentPicture(1);
    // }
  }

  ngOnDestroy() {
    document.body.classList.remove(OVERLAY_CLASS);
    this.itemSubscription.unsubscribe();
  }

  protected subsribeItem(url: UrlSegment[]) {
    const path = url.join('/');

    this.itemSubscription = this.workService.subscribeItem(path)
      .subscribe(res => {
        this.item = res;
        this.defineCurrentPicture(1);
      });
  }

  // protected findItem() {
  //   this.item = this.work.find((item: IWorkItem) => {
  //     return item.fullPath === this.url.join('/');
  //   });

  //   return this.item;
  // }

  protected defineCurrentPicture(index: number) {
    // console.log('DetailsComponent.defineCurrentPicture()', this.item);
    const picturesLength = this.item.children.length;

    if (index > picturesLength) {
      index = 1;
    }
    if  (index < 1) {
      index = picturesLength;
    }

    this.currentIndex = index;
    this.currentPicture = this.item.children[index - 1];
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
