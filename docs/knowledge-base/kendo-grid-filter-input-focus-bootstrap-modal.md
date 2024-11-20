---
title: Making Kendo Grid Filter Input Fields Focusable in Bootstrap Modal
description: Learn how to make Kendo Grid filter input fields focusable when using them inside a Bootstrap modal, even with tabindex attribute set for accessibility.
type: how-to
page_title: Ensuring Focusability of Kendo Grid Filter Inputs within Bootstrap Modals
slug: kendo-grid-filter-input-focus-bootstrap-modal
tags: kendo-ui, grid, bootstrap, modal, filter, focus, accessibility, tabindex
res_type: kb
ticketid: 1670448
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.1.130</td>
</tr>
<tr>
<td>Bootstrap Version</td>
<td>v3.3.6</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) inside a Bootstrap modal, the input text fields of the grid's filter are no longer focusable, especially when the `tabindex` attribute is added to the modal for accessibility purposes. This issue prevents users from interacting with the filter inputs as expected. This KB article also answers the following questions:
- How to make filter inputs in a Kendo Grid focusable when inside a Bootstrap modal?
- How to maintain accessibility with `tabindex` in Bootstrap modals containing a Kendo Grid?
- How to prevent focus from escaping a modal after applying a filter in a Kendo Grid?

## Solution

To resolve the focus issue with Kendo Grid filter input fields inside a Bootstrap modal, especially when a `tabindex` is present, detach the Bootstrap event that steals the focus. This allows widgets inside the modal to gain and retain focus as intended.

The following JavaScript code demonstrates how to detach the event responsible for this behavior:

```javascript
$('#myModal').on('shown.bs.modal', function() {
    $(document).off('focusin.modal');
});
```

Apply this code after initializing your Bootstrap modal. It ensures that once the modal is fully shown, the Bootstrap event that prevents focusing on elements inside the modal is detached, allowing inputs and other interactive elements to gain focus properly.

For a practical example, refer to this modified [Dojo](https://dojo.telerik.com/SGbabJFq/2) illustrating the solution in action with a Kendo UI Grid placed inside a Bootstrap modal.

## See Also

- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
