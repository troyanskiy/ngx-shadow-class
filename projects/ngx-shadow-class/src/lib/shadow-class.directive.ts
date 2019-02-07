import { Directive, ElementRef, Input, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[shadow-class]'
})
export class ShadowClassDirective implements OnInit {

  @Input('shadow-class')
  shadowClass = '';

  constructor(private elementRef: ElementRef<HTMLElement>, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.elementRef.nativeElement.shadowRoot) {
        this.injectCSS();
      }
    });
  }


  private injectCSS() {

    const elementTag = this.elementRef.nativeElement.tagName.toLowerCase();
    const classList = this.shadowClass.split(' ').filter(c => !!c);

    const styleElement: HTMLStyleElement = document.createElement('style');

    const cssTextToInsert: string[] = [];

    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets.item(i) as CSSStyleSheet;

      for (let j = 0; j < styleSheet.cssRules.length; j++) {
        const cssRule = styleSheet.cssRules.item(j);
        const cssText = cssRule.cssText.toLowerCase();

        classList.forEach((className: string) => {
          const searchFor = `${elementTag}.${className}`;

          let index = cssText.indexOf(searchFor);

          if (index > -1) {

            index += searchFor.length;

            if (['.', ' '].indexOf(cssText[index]) === -1) {
              return;
            }

            index++;

            const cssBody = cssText.substr(index);
            const cssLine = `:host(.${className}) ${cssBody}`;

            if (cssTextToInsert.indexOf(cssLine) === -1) {
              cssTextToInsert.push(cssLine);
            }
          }

        });

      }

    }

    if (cssTextToInsert.length) {
      styleElement.innerText = cssTextToInsert.join('');
      this.elementRef.nativeElement.shadowRoot.append(styleElement);
    }

  }

}
