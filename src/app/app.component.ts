import { Component } from '@angular/core';

@Component({
  selector: 'nls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public page;

  constructor () {
    this.page = {
      headlines: [
        {
          slug: 'das-waere-eine-ueberschrift',
          plain: 'Das wäre eine Überschrift',
          children: [
            {
              slug: 'das-waere-eine-unterueberschrift',
              plain: 'Das wäre eine Unterüberschrift',
            },
            {
              slug: 'das-waere-eine-unterueberschrift',
              plain: 'Das wäre eine Unterüberschrift',
            },
            {
              slug: 'das-waere-eine-unterueberschrift',
              plain: 'Das wäre eine Unterüberschrift',
            }
          ]
        }
      ]
    };
  }
}
