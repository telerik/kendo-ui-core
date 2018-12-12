---
title: Add Clear Button
description: An example on how to add a Clear button to the Kendo UI DateTimePicker.
type: how-to
page_title: Clear Dates with Button | Kendo UI DateTimePicker
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
		<td>Date/Time Pickers for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I add a **Clear** button to the DateTimePicker?

## Solution

1. Add `span` with a clear icon to the `k-select` element.
1. Handle the [`click`](https://api.jquery.com/click/) event of the `span`.
1. Use the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/methods/value) method to set `value` to `null`.

```dojo
<style>
    .k-datetimepicker {
        width: 50%;
    }

    .k-datetimepicker .k-select {
        width: 5em;
    }

    .k-datetimepicker .k-picker-wrap {
        padding-right: 5em;
    }

    .k-link-clear {
        margin-left: .428em;
    }
</style>

<input id="dtp" />

<script>
    $(document).ready(function() {
        var dtp = $("#dtp").kendoDateTimePicker({
            dateInput: true
        }).data("kendoDateTimePicker");
        var clearButton = '<span class="k-link k-link-clear" aria-label="Clear the DateTimePicker"><span unselectable="on" class="k-icon k-i-close" aria-controls="dtp_timeview"></span></span>';

        dtp.wrapper.find(".k-select").append(clearButton);

        $(".k-link.k-link-clear").on("click", function(e) {
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
