import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Converter } from 'showdown';
import * as slugify from 'slugify';

import { MetaService } from './../meta/meta.service';

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
  protected slugify: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private http: HttpClient
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
        this.parseResponse(res);
        this.updateMeta();
      },
      error => this.router.navigate(['/'])
    );
  }

  protected parseResponse(res) {
    const lines = res.split('\n');
    const headlinesRaw = lines.filter(line => {
      return line.startsWith('#');
    });

    this.headlines = headlinesRaw.map((headline, i, map) => {
      const plain = headline.replace(/[#]+/g, '').trim();
      return {
        plain: plain,
        slug: slugify(plain, {lower: true})
      };
    });
    this.content = res;
    this.metadata = {
      title: 'test',
      description: 'test'
    };
  }

  protected updateMeta() {
    this.metaService.update({
      title: this.metadata.title,
      description: this.metadata.description,
      headlines: this.headlines
    });
  }
}
