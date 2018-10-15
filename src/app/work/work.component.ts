import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'nls-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  protected params: Observable<string>;
  protected work;

  constructor(
    private route: ActivatedRoute
  ) {
    this.work = [
      {
        title: 'Sculpture',
        items: [
          {
            title: 'Gähnschreier',
            img: '/.png',
            alt: '',
            information: [
              '200x200m',
              '2001',
              'Leinen, Kupfer, Kobal'
            ]
          }
        ]
      }
    ];
    // this.params = route.params.map(p => p.id);
  }

  ngOnInit() {
    // console.log(this.params);
  }

}
