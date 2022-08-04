---
title: Getting Started
page_title: jQuery TabStrip Documentation | Getting Started with the TabStrip
description: "Get started with the jQuery TabStrip by Kendo UI and learn how to initialize the widget."
slug: getting_started_kendoui_tabstrip_widget
position: 1
---

# Getting Started with the TabStrip

This guide demonstrates how to get up and running with the Kendo UI for jQuery TabStrip. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
<div id="tabstrip">
    <ul>
        <li>First Tab</li>
        <li>Second Tab</li>
        <li>Third Tab</li>
    </ul>
    <div>
        First Tab content
    </div>
    <div>
        Second Tab content
    </div>
    <div>
        Third Tab content
    </div>
</div>

<script>
    $("#tabstrip").kendoTabStrip();
</script>
```

## 1. Create a div with a Nested ul Element

First, create a `<div>` element on the page that contains a `ul` element. The `li` elements of the `ul` represent the tabs that will be displayed in the TabStrip.

```html
<div id="tabstrip">
    <ul>
        <li>First Tab</li>
        <li>Second Tab</li>
        <li>Third Tab</li>
    </ul>
</div>
```

## 2. Initialize the TabStrip 

In this step, you will initialize the TabStrip from the `<div>` element. You can describe its layout and configuration in the initialization script statement.
 
```html
<div id="tabstrip">
    <ul>
        <li>First Tab</li>
        <li>Second Tab</li>
        <li>Third Tab</li>
    </ul>
</div>

<script>
    // Target the div element by using jQuery and then call the kendoTabStrip() method.
    $("#tabstrip").kendoTabStrip();
</script>
```

## 3. Add the Content

Once the basic initialization is completed, you can determine how to add the content of the TabStrip. The code snippet below demonstrates how to define the content from HTML markup. After the closing the `ul` tag, you need to add as many `div` elements as the number of tabs that are defined through the `li` elements within.

For more information about the alternative approach to load the content, refer to the article on [loading TabStrip content with AJAX]({% slug content_tabstrip %}). 

```html
<div id="tabstrip">
    <ul>
        <li>First Tab</li>
        <li>Second Tab</li>
        <li>Third Tab</li>
    </ul>
    <div>
        First Tab content
    </div>
    <div>
        Second Tab content
    </div>
    <div>
        Third Tab content
    </div>
</div>

<script>
    $("#tabstrip").kendoTabStrip();
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/index)

## See Also 

* [JavaScript API Reference of the TabStrip](/api/javascript/ui/tabstrip)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>