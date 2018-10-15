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

  constructor(
    private route: ActivatedRoute
  ) {
    route.url.subscribe((u) => {
      this.params = route.snapshot.params;
    });
    // this.params = this.route.params.pipe(
      // map((res) => {
        // return res.data;
        // console.log(res.data);
      // }),
      // catchError(error => of(null))
    // );
  }

}
