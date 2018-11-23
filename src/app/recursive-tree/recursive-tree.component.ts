import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'nls-recursive-tree',
  templateUrl: './recursive-tree.component.html',
  styleUrls: ['./recursive-tree.component.scss']
})
export class RecursiveTreeComponent implements OnChanges {
  @Input() public baseHref;
  @Input() public tree;
  public anchor: string;

  ngOnChanges() {
    this.tree.map(item => {
      item.href = this.baseHref + '#' + item.slug;
      return item;
    });
  }
}
