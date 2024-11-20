---
title: MobileWidget
res_type: api
---

# kendo.mobile.ui.Widget

Base class of all Kendo UI Mobile widgets. Inherits from [kendo.ui.Widget](/api/javascript/ui/widget).

## Methods

### view

Returns the [kendo.mobile.ui.View](/api/mobile/view) which contains the widget. If the widget is contained in a splitview, modalview, or drawer, the respective widget instance is returned.


```
    <div data-role="view" id="foo" data-init="getButtonView">
        <a id="button" data-role="button">I am a mobile button</a>
    </div>

    <script>
        new kendo.mobile.Application();
        function getButtonView() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log($("#button").data("kendoMobileButton").view()); // the foo mobile view instance
        }
    </script>
```
