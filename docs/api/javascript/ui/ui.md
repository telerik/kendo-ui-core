---
title: ui
description: Documentation on helper methods for writing new widgets and show progress with a loading message.
---

# kendo.ui

## Methods

### plugin

Helper method for writing new widgets.
Exposes a jQuery plug-in that will handle the widget creation and attach its client-side object in the appropriate data-* attribute.

#### Example

    function TextBox(element, options) {
    }

    kendo.ui.plugin(TextBox);

    // initialize a new TextBox for each input, with the given options object.
    $("input").kendoTextBox({ });
    // get the TextBox object and call the value API method
    $("input").data("kendoTextBox").value();

#### Parameters

##### widget `kendo.ui.Widget`

The widget function.

##### register `Object` **(default: `kendo.ui`)**

The object where the reference to the widget is recorded.

##### prefix `String` **(default: `""`)**

The plugin function prefix, e.g. "Mobile" will register "kendoMobileFoo".

### progress

Shows or hides a semi-transparent overlay with a loading image, with styling, which depends on the used theme.

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
* multiple loading indicators cannot be displayed at the same time if their target elements are nested;

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
