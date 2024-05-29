---
title: Getting Started
page_title: jQuery Ripple Container Documentation - Getting Started with the RippleContainer
description: "Get started with the jQuery RippleContainer by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_ripple_component
position: 1
---

# Getting Started with the RippleContainer

This guide demonstrates how to get up and running with the Kendo UI for jQuery RippleContainer.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="ripple">
        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Default Button</button>
    </div>

    <script>
      $(document).ready(function(){
         $("#ripple").kendoRippleContainer();
      });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element. 

```html
    <div id="ripple"></div>
```

## 2. Initialize the RippleContainer

In this step, initialize the RippleContainer component from the `<div>` element that you created earlier.

```javascript
    $(document).ready(function(){
         $("#ripple").kendoRippleContainer();
    });
```

## 3. Add Elements in the Container

Next, set the contents of the RippleContainer. The ripple effect will be applied to all the elements inside the component.

```dojo
    <div id="ripple">
        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Default Button</button>
    </div>

    <script>
      $(document).ready(function(){
         $("#ripple").kendoRippleContainer();
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery RippleContainer](https://demos.telerik.com/kendo-ui/ripplecontainer/index)

## See Also

* [JavaScript API Reference of the jQuery RippleContainer](/api/javascript/ui/ripplecontainer)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
