import { Component, Input } from '@angular/core';

@Component({
  selector: 'nls-recursive-tree',
  templateUrl: './recursive-tree.component.html',
  styleUrls: ['./recursive-tree.component.scss']
})
export class RecursiveTreeComponent {
  @Input() public baseHref;
  @Input() public tree;
}
