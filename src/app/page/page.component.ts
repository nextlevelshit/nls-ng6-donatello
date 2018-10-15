import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'nls-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  protected params: any;
  protected content: any;

  constructor(
    private route: ActivatedRoute
  ) {
    route.url.subscribe((u) => {
      this.content = this.markdown(route.snapshot.params.slug);
    });
  }

  protected markdown(slug: String) {
    return `
      # Yeah, ${slug} works

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
