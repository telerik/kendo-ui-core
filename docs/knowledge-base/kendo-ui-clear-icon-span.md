---
title: Displaying a Kendo UI Clear Icon in a Span Element
description: Learn how to display a Kendo UI clear icon inside a span element using SVG rendering.
type: how-to
page_title: How to Add Kendo UI Clear Icon to Span Element
meta_title: How to Add Kendo UI Clear Icon to Span Element
slug: kendo-ui-clear-icon-span
tags: kendo-ui,jquery,icon,svg-icons,clear-icon
res_type: kb
ticketid: 1702898
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.3.1002</td>
</tr>
</tbody>
</table>

## Description

I want to display a Kendo UI clear icon inside a span element. This requires rendering the Kendo UI SVG icons programmatically and styling them if necessary.

This knowledge base article also answers the following questions:
- How can I add a Kendo UI clear icon to a span element?
- How do I use Kendo UI SVG icons in jQuery?
- How can I style a clear icon inside a span element?

## Solution

To display the Kendo UI clear icon inside a span element, follow these steps:

1. Add a span element to your markup:

```html
<span id="clearIcon"></span>
```

2. Render the Kendo UI "clear" (x) SVG icon inside the span using JavaScript:

```javascript
// Ensure Kendo UI is set to use SVG icons (if not changed by default is 'svg')
kendo.setDefaults('iconType', 'svg');

// Append the clear icon to the span
$('#clearIcon').append(kendo.ui.icon('x'));
```

3. (Optional) Style the icon using CSS:

```css
span.k-svg-i-x {
    padding-top: 5px;
}
```

The Kendo UI "clear" (x) icon will be displayed inside the span element. You can customize its appearance further or add event handlers as required.

```dojo
  <span id="clearIcon"></span>

  <script>
    // Ensure Kendo UI is set to use SVG icons (if not already set)
	kendo.setDefaults('iconType', 'svg');

	// Append the clear icon to the span
	$('#clearIcon').append(kendo.ui.icon('x'));
  </script>
  <style>
    span.k-svg-i-x {
    padding-top: 5px;
	}
  </style>
```

## See Also

- [Kendo UI SVG Icons Documentation](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/svg-icons#rendering-svg-icons)
- [Kendo UI for jQuery Overview](https://www.telerik.com/kendo-jquery-ui/documentation/introduction)
