import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs';

import { Meta } from './model/meta';
import { MetaService } from './meta/meta.service';

@Component({
  selector: 'nls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked, OnDestroy, OnInit {
  public meta: Meta;

  constructor (
    private metaService: MetaService
  ) {
  }

  ngOnInit() {
    console.log('initing app component');
  }

  ngAfterContentChecked() {
    console.log('aftering content app component');

    this.metaService.retrieve().subscribe((res) => {
      this.meta = res;
    });
  }

  ngOnDestroy() {
    console.log('destroying app component');
    // this.metaService.retrieve().unsubscribe();
  }
}
