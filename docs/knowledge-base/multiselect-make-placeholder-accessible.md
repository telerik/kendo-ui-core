---
title: Make MultiSelect Placeholder Accessible
description: An example on how to make the Kendo UI MultiSelect placeholder accessible to screen readers.
type: how-to
page_title: Make MultiSelect Placeholder Accessible | Kendo UI MultiSelect
slug: multiselect-make-placeholder-accessible
tags: multiselect, placeholder, accessible, screen, readers
res_type: kb
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI MultiSelect</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2019.1.220 version</td>
 </tr>
</table>

## Description

How to make the MultiSelect placeholder accessible to screen readers?

## Solution

Use the text [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/change) event of the MultiSelect as demonstrated below.

```dojo
  <input type="text" placeholder="test placeholder" />

  <select id="multiselect" multiple="multiple">
    <option>Item1</option>
    <option>Item2</option>
    <option>Item3</option>
    <option>Item4</option>
  </select>

  <script>
    function togglePlaceholderAria(multi) {
      if(!multi.value().length && multi.options.placeholder) {
        multi.input.attr("aria-label", multi.options.placeholder);
      } else {
        multi.input.attr("aria-label", "");
      }
    };

    $(document).ready(function () {
      var multi = $("#multiselect").kendoMultiSelect({
        placeholder: "Select CustomerID...",
        change: function(e) {
          togglePlaceholderAria(e.sender);
        }
      }).getKendoMultiSelect();

      togglePlaceholderAria(multi);
    });
  </script>
```

## See Also

* [MultiSelect API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)