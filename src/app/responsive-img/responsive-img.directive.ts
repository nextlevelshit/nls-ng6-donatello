import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[nlsResponsiveImg]'
})
export class ResponsiveImgDirective implements OnChanges {

  element: HTMLImageElement;
  @Input('nlsResponsiveImg') nlsResponsiveImg: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.element = el.nativeElement;
  }

  ngOnChanges() {
    this.renderer.setAttribute(this.element, 'srcset', this.srcset);
  }

  protected get srcset(): string {
    return this.nlsResponsiveImg.map(breakpoint => {
      return `${breakpoint.src} ${breakpoint.size}w`;
    }).join(',');
  }
}
