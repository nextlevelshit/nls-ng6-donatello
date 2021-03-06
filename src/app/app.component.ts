import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Meta as DocumentIMeta, Title as DocumentTitle } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';

import { IMetaData } from './model/meta';
import { MetaService } from './meta/meta.service';

@Component({
  selector: 'nls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked, OnDestroy {
  protected metaSubscription: any;
  protected urlSubscription: Subscription;
  public headlines: any;
  public currentUrl: any;

  constructor (
    private metaService: MetaService,
    private docTitle: DocumentTitle,
    private docIMeta: DocumentIMeta
  ) {
  }

  ngAfterContentChecked() {
    this.retrieveIMeta();
    this.currentUrl = window.location.origin + window.location.pathname;
  }

  ngOnDestroy() {
    this.headlines = [];
    this.metaSubscription.unsubscribe();
    this.urlSubscription.unsubscribe();
  }

  protected retrieveIMeta() {
    this.metaSubscription = this.metaService.retrieve().subscribe((res: IMetaData) => {
      this.updateIMeta(res);
    });
  }

  protected updateIMeta(recievedIMeta: IMetaData) {
    if (!recievedIMeta) {
      return;
    }
    // Mandatory IMeta Parameters
    this.docTitle.setTitle(recievedIMeta.title);
    this.docIMeta.updateTag({
      name: 'description', content: recievedIMeta.description
    });
    // Optional IMeta Parameters
    if (recievedIMeta.headlines) {
      this.headlines = recievedIMeta.headlines;
    } else {
      this.headlines = [];
    }
    if (recievedIMeta.keywords) {
      this.docIMeta.updateTag({
        name: 'keywords', content: recievedIMeta.keywords.join(',')
      });
    }
  }
}
