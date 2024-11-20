---
title: Loader
page_title: Configuration, methods and events of Kendo UI Mobile Loader
description: Use methods to hide or show the loading animation of the Kendo UI mobile Loader widget.
res_type: api
---

# kendo.mobile.ui.Loader

## Methods

### hide

Hide the loading animation.

```
    <div id="foo" data-role="view" data-show="onShow"></div>

    <script>
    var app = new kendo.mobile.Application();
    function onShow() {
      app.pane.loader.show();
      setTimeout(function() {
        app.pane.loader.hide(); //hide loading animation
      }, 7000);
    }
    </script>
```

### show

Show the loading animation.

```
    <div id="foo" data-role="view" data-show="onShow"></div>

    <script>
    var app = new kendo.mobile.Application();
    function onShow() {
      app.pane.loader.show(); //show loading animation
    }
    </script>
```