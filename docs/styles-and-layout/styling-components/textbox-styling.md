---
title: TextBox Styling
page_title: jQuery TextBox Documentation | TextBox Styling
description: "Learn how to apply different styling options to the Kendo UI TextBox widget."
slug: textbox_styling
---

# TextBox Styling

In this article, you will find out how to style the HTML `input` element in order to achieve the same appearance as the Kendo TextBox component. 

> As of Kendo UI R1 2022, the Kendo TextBox uses brand new rendering.
For additional information regarding the decision behind these changes, visit the [Styling Components]({% slug components_rendering_overview %}) article.


## Old vs New Rendering

The old rendering of the TextBox consisted of a single input element with the class `k-textbox` that held all the styling information related to the widget. 

```html
 <!-- OLD -->
<input class="k-textbox" />
```

The new rendering of the component consists of a wrapping `span` element that has a child `input` element.

The `span` element controls the overall appearance of the widget and has the following class structure:

```html
<!-- NEW -->
<span class="k-input k-textbox k-input-flat k-input-md k-rounded-md" >
</span>
```

The following example demonstrates the complete HTML structure:

```html
<span class="k-input k-textbox">
    <input id="textbox" data-role="textbox" class="k-input-inner" placeholder="Name">
</span>
```

For additional information regarding the available values for each appearance property, visit the [Appearance article]({% slug textbox_appearance %}) of the Kendo UI TextBox.

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Kendo TextBox Appearance]({% slug textbox_appearance %})
