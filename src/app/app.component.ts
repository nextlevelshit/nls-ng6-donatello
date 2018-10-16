import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Meta as DocumentMeta, Title as DocumentTitle } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Meta } from './model/meta';
import { MetaService } from './meta/meta.service';

@Component({
  selector: 'nls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked, OnDestroy {
  public headlines: any;

  constructor (
    private metaService: MetaService,
    private docTitle: DocumentTitle,
    private docMeta: DocumentMeta
  ) {
  }

  ngAfterContentChecked() {
    this.retrieveMeta();
  }

  ngOnDestroy() {
    this.headlines = null;
  }

  protected retrieveMeta() {
    this.metaService.retrieve().subscribe((res) => {
      this.updateMeta(res);
    });
  }

  protected updateMeta(recievedMeta: Meta) {
    this.headlines = recievedMeta.headlines;
    this.docTitle.setTitle(recievedMeta.title);
    this.docMeta.updateTag({
      name: 'description', content: recievedMeta.description
    });
    this.docMeta.updateTag({
      name: 'keywords', content: recievedMeta.keywords.join(',')
    });
  }
}
