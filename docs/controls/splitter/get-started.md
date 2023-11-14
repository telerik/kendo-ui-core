---
title: Getting Started
page_title: jQuery Splitter Documentation - Getting Started with the Splitter
description: "Get started with the jQuery Splitter by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_splitter_component
position: 1
---

# Getting Started with the Splitter

This guide demonstrates how to get up and running with the Kendo UI for jQuery Splitter.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
      <div>Pane C</div>
    </div>
    <script>
      $("#splitter").kendoSplitter({
        panes: [ { size: "30%" }, { size: "40%", min: "50px" }, { size: "30%" } ],
        orientation: "vertical"
      });
    </script>
```

## 1. Create a div Element

First, create a `<div>` element with two or more `<div>` children.

```html
    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
      <div>Pane C</div>
    </div>
```

## 2. Initialize the Splitter

In this step, you'll initialize the Splitter component from the parent `<div>` element.

> * Initialize the Splitter within a `$(document).ready()` statement.
> * The Splitter must be visible at the time of initialization. If the component nested in a hidden container, execute the [`resize`]({% slug appearance_kendoui_splitter %}#resizing-manually) method of the Splitter as soon as it becomes visible.

```javascript
    $("#splitter").kendoSplitter({
    });
```

## 3. Set the Orientation of the Splitter

Now, you can set the [`orientation`](/api/javascript/ui/splitter/configuration/orientation) of the Splitter.

```javascript
    $("#splitter").kendoSplitter({
        orientation: "vertical"
    });
```

## 4. Configure the Panes

In this step, you'll configure the [`panes`](/api/javascript/ui/splitter/configuration/pane) of the Splitter.

```javascript
      $("#splitter").kendoSplitter({
        panes: [ { size: "30%" }, { size: "40%", min: "50px" }, { size: "30%" } ],
        orientation: "vertical"
      });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Splitter](https://demos.telerik.com/kendo-ui/splitter/index)

## See Also

* [JavaScript API Reference of the jQuery Splitter](/api/javascript/ui/splitter)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
