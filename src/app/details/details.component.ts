import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


const OVERLAY_CLASS = 'nls-overlay';

@Component({
  selector: 'nls-details',
  exportAs: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    document.body.classList.add(OVERLAY_CLASS);
  }

  ngOnDestroy() {
    document.body.classList.remove(OVERLAY_CLASS);
  }

  public close($event) {
    this.router.navigate([
      {
        outlets: {
          details: null
        }
      }
    ]);
  }

}
