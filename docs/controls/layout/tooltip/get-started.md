---
title: Getting Started
page_title: jQuery Tooltip Documentation - Getting Started with the Tooltip
description: "Get started with the jQuery Tooltip by Kendo UI and learn how to initialize the widget."
slug: getting_started_kendoui_tooltip_widget
position: 1
---

# Getting Started with the Tooltip

This guide demonstrates how to get up and running with the Kendo UI for jQuery Tooltip. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
<ul id="container">
      <li><span>First Item</span></li>
      <li><span>Second Item</span></li>
      <li><span>Third Item</span></li>
</ul>

<script>
    $("#container").kendoTooltip({
        filter:"li>span",
      	content:function(e){
        	return $(e.target).text()
        },
      	position:"right"
    });
</script>
```

## 1. Define the Elements for the Target

To define the elements that will serve as the target of the Tooltip, create a `<ul>` element on the page with several `<li>` elements.

```html
<ul id="container">
      <li><span>First Item</span></li>
      <li><span>Second Item</span></li>
      <li><span>Third Item</span></li>
</ul>
```

## 2. Initialize the Tooltip 

In this step, you will initialize the Tooltip from the `<ul>` element. You need to set the filter configuration so that the Tooltip will appear only when you hover over the `<li>` elements. 
 
```html
<ul id="container">
      <li><span>First Item</span></li>
      <li><span>Second Item</span></li>
      <li><span>Third Item</span></li>
</ul>

<script>
    // Target the ul element by using jQuery and then call the kendoTooltip() method.
    $("#container").kendoTooltip({
        filter:"li>span"
    });
</script>
```

## 3. Add the Content

Once the basic initialization is completed, you can determine what the content of the Tooltip will be.

For more information about the alternative approach to load the content, refer to the article on [loading Tooltip content with AJAX]({% slug content_kendoui_tooltip %}). 

```html
<ul id="container">
      <li><span>First Item</span></li>
      <li><span>Second Item</span></li>
      <li><span>Third Item</span></li>
</ul>

<script>
    $("#container").kendoTooltip({
        filter:"li>span",
      	content:function(e){
        	return $(e.target).text()
        }
    });
</script>
```

## 4. Determine the Position

You can now set where the Tooltip will be displayed. For example,  if there is enough space on the page, you can display the widget to the right of the items.

```html
<ul id="container">
      <li><span>First Item</span></li>
      <li><span>Second Item</span></li>
      <li><span>Third Item</span></li>
</ul>

<script>
    $("#container").kendoTooltip({
        filter:"li>span",
      	content:function(e){
        	return $(e.target).text()
        },
      	position:"right"
    });
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Tooltip](https://demos.telerik.com/kendo-ui/tooltip/index)

## See Also 

* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>