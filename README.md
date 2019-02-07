[![npm version](https://img.shields.io/npm/v/ngx-shadow-class.svg)](https://www.npmjs.com/package/ngx-shadow-class)

# NgxShadowClass

## Will help you to overwrite css in shadow dom components

The library provides simple directive for Angular which does the css injection

# Installation

1. `npm i --save ngx-shadow-class`
2. Import `ShadowClassModule` into your `app.module` or other shared module
3. Add `shadow-class="my-class"` to inject css into the shadow element

# What does it do?

1. It will receive list of classes which need's to be injected into the shadow DOM
style
1. It will take all style sheets of the document and search for the 
`<components_tag_name>.<style from received list>` and inject the body into the 
styles of the shadow DOM as `host:(.<style from received list>) ....`

# How to create style?

Important to create style by specifying component tag and class name.

Use `/deep/` if the style is in the `host:` ex below

Ex: `ion-toggle.my-class-name ...`

# Example

The example is provided based on the Ionic 4.0.x project

#### home.page.html
```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <ion-toggle class="test-class" shadow-class="test-class test-class-global"></ion-toggle>
</ion-content>
```

#### home.page.scss (for `test-class`)
```scss
:host {
  /deep/ ion-toggle {
    &.test-class {
      .toggle-inner {
        width: 10px;
      }

      button {
        z-index: 9999;
      }

    }
  }
}

```

#### app.component.scss or other global file (for `test-class-global`)
```scss
ion-toggle {
  &.test-class-global {
    .toggle-inner {
      width: 10px;
    }
  }
}
```

#### Will add following styles into the shadow dom component

1. :host(.test-class-global) .toggle-inner { width: 10px; }
1. :host(.test-class) .toggle-inner { width: 10px; }
1. :host(.test-class) button { z-index: 9999; }
