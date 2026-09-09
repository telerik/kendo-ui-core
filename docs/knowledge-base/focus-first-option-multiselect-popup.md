---
title: Focusing the First Option After MultiSelect Popup Opens
description: Learn how to focus the first option in the Kendo UI for jQuery MultiSelect when the popup opens.
type: how-to
page_title: How to Focus on the First Option in MultiSelect Popup
meta_title: Focusing the First Option After MultiSelect Popup Opens
slug: focus-first-option-multiselect-popup
tags: kendo-ui-for-jquery, multiselect, open-event, focus, first-option
res_type: kb
ticketid: 1716189
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> 
Kendo UI for jQuery MultiSelect 
</td>
</tr>
<tr>
<td> Version </td>
<td> 2026.2.520</td>
</tr>
</tbody>
</table>

## Description

I want the first option in the Kendo UI for jQuery [MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview) to automatically gain focus when the popup opens. Currently, the last selected item is focused.

This knowledge base article also answers the following questions:

- How to set focus to the first item in the MultiSelect popup?
- Why is the first option not focused when the MultiSelect popup opens?
- How to make navigation start from the first item in MultiSelect?

## Solution

To focus the first option in the MultiSelect popup when it opens, handle the [`open`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/multiselect/events/open) event. Use a small timeout to ensure the popup is fully rendered, and programmatically set the first item as the current one.

1. Attach an `open` event handler to the MultiSelect.
2. In the handler, ensure all list items are cleared of focus and hover states.
3. Set the first item as the current one.

Below is a runnable example:

```dojo
<div class="k-d-flex k-justify-content-center" style="padding-top: 54px">
      <div class="k-w-300">
        <label for="products">Products</label>
        <select id="products"></select>
      </div>
    </div>
    <script>
      $(document).ready(function () {
        $("#products").kendoMultiSelect({
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          placeholder: "Type to search...",
          minLength: 3,
          filter: "contains",
          autoClose: false,
          clearButton: true,
          highlightFirst : true,
          dataSource: {
            type: "odata-v4",
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products",
              },
            },
          },
          open: function (e) {
            var ms = this;
            setTimeout(function () {
              var list = ms.list;
              if (!list || !list.length) {
                return;
              }
              // Remove focus/hover from all items
              list.find("li").removeClass("k-focus k-hover");
              var firstItem = list.find("li.k-list-item:first");
              if (firstItem.length) {
                ms.current(firstItem);
              }
            }, 0);
          },
        });
      });
    </script>
```


## See Also

- [Kendo UI for jQuery MultiSelect Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview)
- [Kendo UI for jQuery MultiSelect API Reference](https://docs.telerik.com/kendo-ui/api/ui/multiselect)
- [Kendo UI for jQuery MultiSelect Overview (Demo)](https://demos.telerik.com/kendo-ui/multiselect/index)
