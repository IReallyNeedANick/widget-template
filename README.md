# Store Widget Template

This is a sample elements template made for creating a widget meant 
to be publishable in Better store.

It uses:
 - latest [angular elements](https://juristr.com/blog/2019/04/intro-to-angular-elements/) technology to make this widget independent
 - custom webpack settings to assure uniqueness of .js function, property names
 - [fs-extra](https://www.npmjs.com/package/fs-extra) and [concat](https://www.npmjs.com/package/concat) to create one .js file to publish

 
 # Instructions
 
First we need to do the npm install of all libraries as they are not part of this package:

`npm install`
 
Then we need to:
- create a widget
- configure the component that it can be used and is built as a web-elements selector
- configure build settings
- use the newly created file as a new content in Store


### Create widget
 
First we need to create a component that we will be used as a widget:
 
 
```bash
ng generate component 'COMPONENT NAME'
``` 
this component can consist of other components and can use any library you want.

The widget can have 3 inputs and 2 output:
```javascript
  @Input()
  inputData: any;
  @Input()
  useDefaultData = false;
  @Input()
  config = any;
  @Output()
  outputData: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  action: EventEmitter<any> = new EventEmitter<any>();
```

`inputData` is the data that you will manipulate through form script
in Form Builder by using function setFieldValue. This can be any object or an array of objects. This value gets persisted in the composition as a generic.

`useDefaultData` is a boolean parameter that will be passed when using the widget during
form building period so the user when using the widget will be able to see some mock data. If the input `useDefaultData` is passed to component as true than 
it is the responsibility of the component that it shows some representative mock data.

`config` non mandatory configuration of a widget

`outputData` widget (if they are not read only) can also output the data. This should be the same object as provided to the widget from `inputData` - so if the widget changes its data it shouldbe emitted thru this EventEmitter

`action` widget can also emit some action that you want to hook on in the Form builder that can potentially change some things.

### Configure the angular component as a web-component

- Go to the app.module.ts and add to the AppModule class:

```javascript

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    customElements.define('CUSTOM_COMPONENT_SELECTOR', createCustomElement(CUSTOM_COMPONENT_CLASS, {injector: this.injector}));
  }
```
CUSTOM_COMPONENT_SELECTOR must be the same as the selector defined in custom component!

 - comment out bootstrap property and add CUSTOM_COMPONENT as an entry component:
```
  // bootstrap: [AppComponent],
  entryComponents: [CUSTOM_COMPONENT]
```
 
### Configure build settings

open extra-webpack.config.js and change property names into something unique:

```javascript
    jsonpFunction: "UNIQUE NAME",
    library: "APPLICATION NAME"
```
Names should only container alphabet characters and nothing else and must be unique (at least 5 chars)

open elements-build.js and change the applicationName variable into a unique store variable name
```javascript
const applicationName = 'TODO WRITE APPLICATION NAME';
```


### Build & use

build the application:

`ng build --prod --output-hashing none`

This will create a few files in /dist folder that we need to concatenate in one file that we can publish in store:

`node elements-build.js`


 # How to create this template
 
 This template differs from regular angular application by:
 
- 2 files
     - elements-build.js
     - extra-webpack.config.js
- custom webpack installed `@angular-builders/custom-webpack` and build defined in angular.json `@angular-builders/custom-webpack:browser` with
custom `customWebpackConfig` that point to `extra-webpack.config.js`
- angular elements `@angular/elements` installed     
- `fs-extra` and `concat` installed to create one file for Store deployment


   
 
