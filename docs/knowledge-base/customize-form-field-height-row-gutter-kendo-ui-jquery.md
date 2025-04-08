---
title: Adjusting Form Field Height and Row Gutter in Kendo UI for jQuery Forms
description: Learn how to customize the field height and row gutter in Kendo UI for jQuery Form.
type: how-to
page_title: How to Customize Form Field Height and Row Gutter in Kendo UI for jQuery
slug: customize-form-field-height-row-gutter-kendo-ui-jquery
tags: kendo-ui-for-jquery, form, css, style, layout
res_type: kb
ticketid: 1673075
---

## Description
In a form with multiple groups, you might want to adjust the spacing between rows or the height of the fields within a group. This knowledge base article also answers the following questions:
- How can I set the gutter between rows in a Kendo UI for jQuery Form?
- How do I change the field height within a group in a Kendo UI for jQuery Form?
- What CSS properties are used to customize the layout of a Kendo UI for jQuery Form?

## Solution
To modify the gutter between rows in a Kendo UI for jQuery Form, use the `row-gap` CSS property. The `row-gap` property specifies the size of the gap (gutter) between rows in a grid layout. 

### Adjusting Row Gutter
Apply the following CSS to adjust the row gutter:

```css
.k-form-layout {
  row-gap: 40px; /* Adjust the 40px value to increase or decrease the gutter size */
}
```

The `row-gap` property allows you to easily control the spacing between rows, enhancing the form's visual appeal and readability.

### Example
Refer to the following Progress Kendo UI Dojo, which demonstrates the customization of row gutter using the `row-gap` CSS property: [Progress Kendo UI Dojo Example](https://dojo.telerik.com/wFiKDWVA).

## See Also
- [Kendo UI for jQuery Form Overview](https://docs.telerik.com/kendo-ui/controls/editors/form/overview)
- [MDN Web Docs on row-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
