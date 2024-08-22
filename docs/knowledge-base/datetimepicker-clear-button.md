---
title: Add Clear Button
description: Learn how to add a Clear button to the Kendo UI DateTimePicker.
type: how-to
page_title: Clear Dates with Button - Kendo UI DateTimePicker for jQuery
slug: datetimepicker-clear-button
tags: datetimepicker, clear, button
ticketid: 1168278
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.516</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Date and Time Pickers for jQuery</td>
	</tr>
</table>

## Description

How can I add a **Clear** button to the DateTimePicker?

## Solution

1. Add `span` with a clear icon to the component wrapper element.
1. Handle the [`click`](https://api.jquery.com/click/) event of the `span`.
1. Use the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/methods/value) method to set `value` to `null`.

```dojo
    <style>
      .k-datetimepicker {
        width: 50%;
      }
      
      #icon {
        top: 0.4rem;
      }
    </style>

    <input id="dtp" />
    <script>
      $(document).ready(function() {
        var dtp = $("#dtp").kendoDateTimePicker({
          dateInput: true
        }).data("kendoDateTimePicker");


        var clearButton = `<span id="icon"></span>`;
        dtp.wrapper.append(clearButton);
        
        kendo.ui.icon($("#icon"), { icon: 'x' });

        $("#icon").on("click", function(e) {
          var dtp = $(e.target).closest(".k-datetimepicker").find("input[data-role='datetimepicker']").data("kendoDateTimePicker");
          var di = $(e.target).closest(".k-datetimepicker").find("input[data-role='datetimepicker']").data("kendoDateInput");

          dtp.value(null);
          dtp.trigger("change");

          di.value(null);
          di.trigger("change");
        });
      });
    </script>
```
