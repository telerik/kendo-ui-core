---
title: ui
description: Documentation on helper methods for writing new widgets and show progress with a loading message.
res_type: api
---

# kendo.ui

## Methods

### plugin

Helper method for writing new widgets.
Exposes a jQuery plug-in that will handle the widget creation and attach its client-side object in the appropriate data-* attribute.


<div class="meta-api-description">
Registering and configuring a jQuery plugin for custom UI components to control element initialization, setup options, handle creation logic, bind client-side component instances to elements using data attributes, enable access and manipulation via jQuery’s .data() method, support plugin initialization, customization, component instance retrieval, and interaction after setup, allowing developers to create, initialize, and manage component lifecycle within jQuery-based interfaces.
</div>

#### Example

    <input />
    <script> 
      var CustomTextBox = kendo.ui.Widget.extend({
        options: {
          name: "CustomTextBox"
        },
        value: function (value) {
          if (value !== undefined) {
            this.element.val(value);
          } else {
            return this.element.val();
          }
        }
      });

      kendo.ui.plugin(CustomTextBox);

      // initialize a new CustomTextBox for each input, with the given options object.
      $("input").kendoCustomTextBox({ });
      // get the CustomTextBox object and call the value API method
      $("input").data("kendoCustomTextBox").value("some value");
    </script>

#### Parameters

##### widget `kendo.ui.Widget`

The widget function.

##### register `Object` **(default: `kendo.ui`)**

The object where the reference to the widget is recorded.

##### prefix `String` **(default: `""`)**

The plugin function prefix, e.g. "Mobile" will register "kendoMobileFoo".

### progress

Shows or hides a semi-transparent overlay with a loading image, with styling, which depends on the used theme.

The method displays a semi-transparent background and an animated GIF. It is designed to be used during **asynchronous remote data requests**. Browsers normally do not animate GIFs during rendering processes or other resource-intensive tasks in the browser's main thread. If `kendo.ui.progress()` is used while performing such tasks, then the GIF animation may stop for a while. A possible workaround is to remove the animated GIF or replace it with a non-animated image, as shown below.


<div class="meta-api-description">
Configure or control visual busy indicators that display a translucent overlay with animated or static loading visuals to signal ongoing asynchronous tasks such as remote data fetching, AJAX calls, or network operations. Enable, set, or toggle semi-transparent overlays showing spinner animations or loading icons that inform users of background processing, handling UI blocking states, progress feedback during remote calls, or busy states while awaiting server responses. Manage loading overlays with theme-aware styling, options to show or hide animated GIFs or fallback static images, and address browser behavior affecting animation during intensive main-thread activity or slow rendering scenarios to improve user perception of asynchronous loading and operation progress.
</div>

#### Parameters

##### element `jQuery`

The container, which will be overlaid. There are several requirements for this element:

* it must be visible on the page;
* it must have non-zero dimensions. If the container can be empty, then `min-width` and `min-height` styles may be required.
* it must have a `position` style applied with one of the following values: `relative`, `absolute`, or `fixed`;
* it must be a block element, which allows nesting of `div` elements (for example `div`, `li`, `td`, `dt`, `dd`, `section`, etc);
* if the loading overlay should cover the whole page, then it should be displayed over the `<body>` element, which does not need a `position` style,
but may need a `height` or `min-height` style in order to expand and fill the browser viewport. Also, the loading overlay wrapper (`div.k-loading-mask`)
may need a high-enough `z-index` style in order to cover any other positioned elements with `z-index` on the page.
* if the element already contains a progress indicator, a new one will not be created. This is done to avoid multiple loading indicators being displayed at the same time;

`<script>` elements, which define Kendo UI templates, are not valid arguments for the `kendo.ui.progress()` method. This is because the actual template contents is rendered elsewhere on the page and without copying the script element ID. Moreover, `<script>` elements are not visible.

##### toggle `Boolean`

The flag, which indicates whether to show or hide the loading overlay.

#### Example

    <style>

    html,
    body
    {
        min-height: 100%;
        margin: 0;
        font: 14px sans-serif;
    }

    #container
    {
        position: relative; /* required */
        margin: 1em 4em;
        padding: .5em;
        z-index: 2; /* random value, not required */
    }

    div.k-loading-mask
    {
        z-index: 3; /* must be larger than the z-index:2 of #container */
    }

    </style>

    <p><button id="containerButton" class="k-button">Show a loading indicator over the container</button>
    <button id="pageButton" class="k-button">Show a loading indicator over the whole page</button></p>

    <div id="container" class="k-widget">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia congue leo, ut euismod orci accumsan ut. Pellentesque ligula erat, tempus ut faucibus sit amet, interdum vitae lectus.
        Curabitur placerat, magna a dictum blandit, felis dolor blandit purus, quis malesuada dolor mauris non justo.</div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia congue leo, ut euismod orci accumsan ut. Pellentesque ligula erat, tempus ut faucibus sit amet, interdum vitae lectus.
        Curabitur placerat, magna a dictum blandit, felis dolor blandit purus, quis malesuada dolor mauris non justo.</p>

    <script>

    $(function(){
        function displayLoading(target) {
            var element = $(target);
            kendo.ui.progress(element, true);
            setTimeout(function(){
                kendo.ui.progress(element, false);
            }, 2000);        
        }

        $("#containerButton").click(function(){
            displayLoading("#container");
        });

        $("#pageButton").click(function(){
            displayLoading(document.body);
        });

    });

    </script>

#### Example - customize loading animation text

    <style>

    html,
    body
    {
        min-height: 100%;
        margin: 0;
        font: 14px sans-serif;
    }

    #container
    {
        position: relative; /* required */
        margin: 1em 4em;
        padding: .5em;
        z-index: 2; /* random value, not required */
    }

    div.k-loading-mask
    {
        z-index: 3; /* must be larger than the z-index:2 of #container */
    }

    /* By default the text is hidden, re-position the text */
    span.k-loading-text
    {
        text-indent: 0;
        top: 50%;
        left: 50%;
        background-color: #0F0;
    }

    div.k-loading-image
    {
        display: none;
    }

    </style>

    <p><button id="containerButton" class="k-button">Show a loading indicator over the container</button>
    <button id="pageButton" class="k-button">Show a loading indicator over the whole page</button></p>

    <div id="container" class="k-widget">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia congue leo, ut euismod orci accumsan ut. Pellentesque ligula erat, tempus ut faucibus sit amet, interdum vitae lectus.
        Curabitur placerat, magna a dictum blandit, felis dolor blandit purus, quis malesuada dolor mauris non justo.</div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nam lacinia congue leo, ut euismod orci accumsan ut. Pellentesque ligula erat, tempus ut faucibus sit amet, interdum vitae lectus.
        Curabitur placerat, magna a dictum blandit, felis dolor blandit purus, quis malesuada dolor mauris non justo.</p>

    <script>

    $(function(){
        //customize the default "Loading..." text
        kendo.ui.progress.messages = {
            loading: "Processing..."
        };

        function displayLoading(target) {
            var element = $(target);
            kendo.ui.progress(element, true);
            setTimeout(function(){
                kendo.ui.progress(element, false);
            }, 2000)    ;
        }

        $("#containerButton").click(function(){
            displayLoading("#container");
        });

        $("#pageButton").click(function(){
            displayLoading(document.body);
        });

    });

    </script>

#### Example - remove or change the animated image

```pseudo
    /* remove */
    .k-loading-mask .k-loading-image {
      background-image: none;
    }

    /* change */

    .k-loading-mask .k-loading-image {
      background-image: url('...non-animated.image.here...');
    }
```

### icon

Returns a generated HTML string that represents a n SVG or Font icon depending on the globally set configation (by default 'svg'). 

To set the global iconType use `kendo.setDefaults('iconType', 'font');` method before the widgets initialization. 


<div class="meta-api-description">
Generate or retrieve the HTML string markup for an icon to insert into web pages, templates, or the DOM, supporting both scalable vector graphics (SVG) and font-based icons depending on the configured global icon style. Control, switch, or set icon formats between SVG or font icons programmatically or via defaults to influence how icons render across your UI components. Obtain icon markup as a string for use in custom rendering, dynamic content insertion, or template customization with flexibility in icon type selection and integration in web applications.
</div>

#### Parameters

##### element `jQuery` *(optional)*

If a jQuery element is passed as the first it will render an icon classes and content for the configured icon. 

##### options `Object|String` *(required)*

If a `string` is provided, it will attempt to render a valid SVG icon from the predefined kendo svg collection (`kendo.ui.svgIcons`). Or add class for the font icon by prefixing with `k-i-`. Check the available options in the [`FontIcon`](/styles-and-layout/sass-themes/font-icons) or the [`SvgIcon`](/styles-and-layout/sass-themes/svg-icons) API sections.

#### Example - extending an element

    <span id="icon"></span>

    <script>
        kendo.ui.icon($("#icon"), { icon: 'camera' });
    </script>

#### Example - using without element

    <script>
        var icon =  kendo.ui.icon('camera');
        $('body').append(icon);
    </script>

#### Example - configure specific icon type

    <script>
        var icon =  kendo.ui.icon({ icon: 'camera', type: 'font' });
        $('body').append(icon);
    </script>

#### Example - using advanced 

    <script>
        var icon =  kendo.ui.icon({ icon: 'camera', type: 'font' });
        $('body').append(icon);
    </script>

#### Example - setup a new global default iconType

    <script>
        kendo.setDefaults('iconType', 'font');
        var icon =  kendo.ui.icon({ icon: 'camera' });
        $('body').append(icon);
    </script>

#### Example - setup a custom svg icon

    <script>
        var icon =  kendo.ui.icon({ 
            type: 'svg', // if default is svg you can omit this option
            icon:{
                viewBox: '0 0 512 512',
                content: '<path d="M448 128h-64l-64-64H192l-64 64H64c-17.6 0-32 14.4-32 32v288c0 17.6 14.4 32 32 32h384c17.6 0 32-14.4 32-32V160c0-17.6-14.4-32-32-32zM256 416c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112zm64-112c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64z" />'
            } 
        });
        $('body').append(icon);
    </script>

#### Example - setup a custom icon renderer

    <script>
        var icon =  kendo.ui.icon({ 
            type: (element, options) => `<span class="my-custom-icon"><span class="k-icon k-i-${options.icon}"></span></span>`,
            icon: 'camera'
        });
        $('body').append(icon);
    </script>

#### Example - setup a global custom icon renderer

    <script>
        kendo.setDefaults('iconType', (element, options) => `<span class="my-custom-icon"><span class="k-icon k-i-${options.icon}"></span></span>`);
        
        var icon =  kendo.ui.icon({ 
            icon: 'camera'
        });
        
        $('body').append(icon);
    </script>
