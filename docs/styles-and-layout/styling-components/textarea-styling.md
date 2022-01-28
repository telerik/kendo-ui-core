---
title: Textarea Styling
page_title: jQuery Textarea Documentation | Textarea Styling
description: "Learn how to apply the same styling options as the Kendo TextArea to a regular textarea HTML element."
slug: textarea_styling
---

# Textarea Styling

In this article, you will find out how to style the HTML `textarea` element in order to achieve the same appearance as the Kendo TextArea component. 

> As of Kendo UI R1 2022, the Kendo TextArea uses brand new rendering.

For additional information regarding the decision behind these changes, visit the [Styling Components]({% slug components_rendering_overview %}) article.


## Old vs New Rendering

With the old rendering, the `k-textarea` class held all the styling information related to the textarea wrapper and the `k-textbox` class applied additional styling to the `textarea` element itself.

```html
<span class="k-textarea">
    <textarea class='k-textbox'></textarea>
</span>
```

Currently, styles are split in multiple class names. Each class is scoped to a single textarea appearance property:

- The following classes are applied to the wrapping element of the `textarea`:

  ```html
  <!-- Wrapper -->
  <span class="k-textarea k-input k-input-md k-rounded-md k-input-solid k-resize-none">
  </span>
  ```

- The following classes are applied to the `textarea` element:

  ```html
  <!-- Textarea element -->
  <textarea class="k-input-inner k-overflow-auto">Placeholder text</textarea>
  ```

The following example demonstrates the complete HTML structure:

```html
<span class="k-textarea k-input k-input-md k-rounded-md k-input-solid k-resize-none">
    <textarea class="k-input-inner k-overflow-auto">Placeholder text</textarea>
</span>
```

For additional information regarding the available values for each appearance property, visit the [Appearance article]({% slug textarea_appearance %}) of the Kendo TextArea.

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Kendo TextArea Appearance]({% slug textarea_appearance %})
