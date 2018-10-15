import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs';

import { Meta } from './model/meta';
import { MetaService } from './meta/meta.service';

@Component({
  selector: 'nls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked, OnDestroy {
  public meta: Meta;

  constructor (
    private metaService: MetaService
  ) {
  }

  ngAfterContentChecked() {
    this.metaService.retrieve().subscribe((res) => {
      this.meta = res;
    });
  }

  ngOnDestroy() {
    this.meta = null;
  }
}
