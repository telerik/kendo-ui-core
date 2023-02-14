---
title: ECMAScript Modules
page_title: ECMAScript Modules
description: "Get started with {{ site.product }} and learn about the ECMAScript modules provided in the library."
slug: core_ecmascript_overview
position: 6
---

# ECMAScript Modules

As of the 2022.3.1109 version, the Kendo UI code-base is available in the form of ECMAScript modules. As the Telerik UI helpers are wrappers over the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/intro/first-steps), this allows you to use another method to add the client-side resources to your application.

## ECMAScript Modules vs. Bundled Scripts 

The new ECMAScript modules provide the following benefits as compared to the bundled scripts which have been used up to this point:

* [Loading single instead of multiple script files](#loading-single-script-files) 
* [Dynamic script loading](#dynamic-script-loading)
* [Optimized debugging](#optimized-debugging) 
* [Browser compatibility](#browser-compatibility) 

### Loading Single Script Files

ECMAScript enables you to include a single script file to load a particular component. Taking the scripts for the Grid component as an example, previously, if you wanted to include just the Grid on the page instead of all available components, you had to also include every single script dependency related to it and in a specific order. 

The `<head>` element of your page would've looked similar to the following code snippet:

```html
<script src="dist/js/kendo.core.js"></script>
<script src="dist/js/kendo.data.js"></script>
<script src="dist/js/kendo.columnsorter.js"></script>
<script src="dist/js/kendo.userevents.js"></script>
<script src="dist/js/kendo.draganddrop.js"></script>
<!-- And about 80 more individual scripts for every single functionality of the Grid to work properly. -->
```

With the introduction of the ECMAScript modules, you can include just a single script file, as shown in the following example. As a result, ECMAScript will automatically load all of the required dependencies without needing any additional actions on your side, which will greatly increase productivity and decrease the chances of missing any of the script files.

```html
<script src="dist/mjs/kendo.grid.js" type="module"></script>
```


### Dynamic Script Loading

Aside from using the `script` tag, you can also use the [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) call to load a module asynchronously into a potentially non-module environment.

The suggested approach is useful when, for example, you have a Grid inside a Window. The Grid component is not initialized nor needed before the Window is opened. Therefore, you don't need to import the module when the page first loads. Instead, you can load the module when the Window is opened and only then initialize the Grid component.

```javascript
(async () => {
  let shouldGridModuleBeLoaded = true;

  // Load the Grid module only if a condition is met.
  if (shouldGridModuleBeLoaded) {
    await import("/dist/mjs/kendo.grid.js");
  }
})();
```

### Optimized Debugging

Another benefit of using ECMAScript is that it enables you to debug the Kendo UI for jQuery source code much easier. When you navigate to the **Devtools** > **Sources** browser tab, you will be able to see the non-minified version of the source code exactly like it is in the development environment of the product.

Additionally, the [sourcemap](https://firefox-source-docs.mozilla.org/devtools-user/debugger/how_to/use_a_source_map/index.html) files are now downloaded only when the **Devtools** is opened.

The following image showcases the directory structure of the loaded scripts in the **Devtools** browser:

![Devtools Sources Tab](/getting-started-core/images/devtools.png)

### Browser Compatibility

[ECMAScript is supported by the majority of modern browsers](https://caniuse.com/?search=es6%20modules). If a project requires older browser support, you can choose to use either of the other two available module systems&mdash;CommonJS or UMD.

## Getting the ECMAScript Files

You can obtain the ECMAScript modules in any of the following ways:

* [Install {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/installation/adding-client-side-resources/using-local-files)
* [Download the Kendo UI bundle](https://docs.telerik.com/kendo-ui/intro/installation/hosting-kendoui)
* [Use the CDN](https://docs.telerik.com/{{ site.platform }}/installation/adding-client-side-resources/cdn-service)

## Manually Building the Source Code

You can manually build the source code of the components by following these steps:

1. Navigate to your [downloads](https://www.telerik.com/account/my-downloads) page.
1. Open the Kendo UI for jQuery page and scroll down to the **Source Code** section.
1. Once you have downloaded and extracted the source code, navigate to the `src` folder and open a terminal.
1. Run the following command to install **npm**:

  ```javascript
    npm install
  ```

1. Once the previous operation is complete, run one of the following commands to build the scripts:

  - The following command builds the traditional version of the scripts:

    ```javascript
      npm run scripts
    ```

  - The following command builds the `mjs` version of the scripts:

    ```javascript
      npm run scripts:mjs
    ```

  - The following command builds the `esm` and `cjs` versions of the scripts:

    ```javascript
      npm run scripts:modules
    ```

  - Runs all of the previous commands at once:

    ```javascript
      npm run scripts:all
    ```

## See Also

* [Using CDN]({% slug cdnservices_core %})
* [Using Local Files]({% slug using_local_client_side_resources %})
