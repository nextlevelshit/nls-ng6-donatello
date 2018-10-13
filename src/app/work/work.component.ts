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

  constructor(
    private route: ActivatedRoute
  ) {
    // this.params = route.params.map(p => p.id);
  }

  ngOnInit() {
    console.log(this.params);
  }

}
