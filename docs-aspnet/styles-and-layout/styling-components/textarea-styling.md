---
title: Textarea Styling
page_title: Textarea Styling
description: "Learn about styling HTML elements by applying classes, through which you can achieve the appearance of the TextArea for {{ site.framework }}."
slug: textarea_styling
---

# Textarea Styling

In this article, you will find information on how to apply predefined classes the HTML `textarea` element, to achieve the appearance of the TextArea for {{ site.framework }}.

> As of the R1 2022 release, the TextArea component uses a new rendering.

For more details on the decision behind the new rendering, visit the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

## Old vs New Rendering

In the old rendering, the `k-textarea` and the `k-textbox` classes were used to style an element to look like a TextArea component.

```html
<span class="k-textarea">
    <textarea class='k-textbox'></textarea>
</span>
```

In the current rendering, we use multiple classes. Each class is responsible for a single textarea appearance property:

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

For more information about the available styling options and their values, visit the [Appearance article]({% slug textarea_appearance %}) of the TextArea component.

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

## See Also

* [Components Rendering Overview]({% slug components_rendering_overview %})
* [TextArea Appearance]({% slug textarea_appearance %})
