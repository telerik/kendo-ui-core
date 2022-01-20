---
title: TextBox Styling
page_title: TextBox Styling
description: "Learn about styling HTML elements, to make them look like the TextBox for {{ site.framework }}."
slug: textbox_styling
---

# TextBox Styling

In this article, you will find information on how to apply predefined classes the HTML `input` element, to achieve the appearance of the TextBox for {{ site.framework }}.

> As of the R1 2022 release, the TextBox component uses a new rendering.

For more details on the decision behind the new rendering, visit the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

## Old vs New Rendering

In the old rendering, the `k-textbox` class was used to style an `input` element to look like a TextBox component.

```html
 <!-- OLD -->
<input class="k-textbox" />
```

The new rendering of the component consists of a wrapping `span` element and an `input` element nested in the `span` element.

The `span` element controls the overall appearance of the widget and has the following classes:

```html
<!-- NEW -->
<span class="k-input k-textbox k-input-flat k-input-md k-rounded-md" >
</span>
```

The following example demonstrates the complete HTML structure of the TextBox:

```html
<span class="k-input k-textbox">
    <input id="textbox" data-role="textbox" class="k-input-inner" placeholder="Name">
</span>
```

For more information about the available styling options and their values, visit the [Appearance article]({% slug textbox_appearance %}) of the TextBox component.

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

## See Also

* [Components Rendering Overview]({% slug components_rendering_overview %})
* [TextBox Appearance]({% slug textbox_appearance %})
