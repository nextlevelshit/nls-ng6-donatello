import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MetaService } from './../meta/meta.service';

@Component({
  selector: 'nls-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  protected params: any;
  protected content: any;
  protected slug: String;

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {
    route.url.subscribe((u) => {
      this.slug = route.snapshot.params.slug;
      this.content = this.markdown();
      this.metaService.update({
        title: `${this.slug} title`,
        description: `${this.slug} description`,
        headlines: [
          {
            slug: 'yeah',
            plain: `Yeah, ${this.slug} works`
          },
          {
            slug: 'yeah',
            plain: `Yeah, ${this.slug} works`,
            children: [
              {
                slug: 'children',
                plain: 'children work',
                children: [
                  {
                    slug: 'children',
                    plain: 'children work',
                  }
                ]
              }
            ]
          },
          {
            slug: 'yeah',
            plain: `Yeah, ${this.slug} works`
          },          {
            slug: 'yeah',
            plain: `Yeah, ${this.slug} works`
          }
        ]
      });
    });
  }

  protected markdown() {
    return `
      # Yeah, ${this.slug} works

      This is my first example of using *markdown*:

      - Listing
      - is
      - quiet simple

      1. Ordered
      2. lists
         1. Are
         2. also
         3. possible

      > Quoting works as well

      But whats about [links to work](/work)
    `;
  }
}
