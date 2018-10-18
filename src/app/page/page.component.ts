import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MetaService } from './../meta/meta.service';
import { MarkdownService } from './../markdown/markdown.service';

@Component({
  selector: 'nls-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy {
  protected params: any;
  protected content: any;
  protected slug: string;
  protected urlSubscription: Subscription;
  protected fileSubscription: Subscription;
  protected metadata: any;
  protected headlines: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private http: HttpClient,
    private mdService: MarkdownService
  ) {
    this.urlSubscription = route.url.subscribe((u) => {
      this.slug = route.snapshot.params.slug;
      this.loadPage();
    });
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
    this.fileSubscription.unsubscribe();
  }

  protected loadPage() {
    const url = ['app/_content/', this.slug, '.md'].join('');

    this.fileSubscription = this.http.get(url, {
      responseType: 'text'
    }).subscribe(
      res => {
        this.mdService.parseRaw(res);
        this.updateContent();
        this.updateMeta();
      },
      error => this.router.navigate(['/'])
    );
  }

  protected updateContent() {
    this.content = this.mdService.content;
  }

  protected updateHeadlines(res) {
    this.headlines = this.mdService.headlines;
  }

  protected updateMeta() {
    this.metaService.update(this.mdService.meta);
  }
}
