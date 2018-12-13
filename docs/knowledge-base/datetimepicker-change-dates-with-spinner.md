---
title: Add Spinner for Dates
description: An example on how to change the dates in the Kendo UI DateTimePicker through a spinner.
type: how-to
page_title: Change Dates with Spinner | Kendo UI DateTimePicker
slug: datetimepicker-change-dates-with-spinner
tags: datetimepicker, datepicker, spinner, change
ticketid: 1160455
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

How can I add spinner buttons and use them to change the date in the DateTimePicker?

## Solution

1. Add `span` with `up` and `down` arrows to the `k-select` element.
1. Handle the [`click`](https://api.jquery.com/click/) event of the arrows.
1. Use the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/methods/value) method to change the day.

```dojo
<style>
	.k-datetimepicker{
		width: 60%;
	}

    .myUpArrowClass {
        position: relative;
        left: 10px;
        top: -5px;
    }

    .myDownArrowClass {
        position: relative;
        left: -10px;
        top: 5px;
    }

    .k-datetimepicker .k-picker-wrap {
        padding-right: 7em;
    }

    .k-datetimepicker .k-select {
        width: 7em;
    }

    .k-datetimepicker .k-select .k-link-date {
        margin-left: 5px;
    }
</style>

<input id="datetimepicker" />

<script>
    var dt = $("#datetimepicker").kendoDateTimePicker({
        value: new Date(),
        format: "dd/MM/yyyy hh:mm tt"
    }).data("kendoDateTimePicker");
    var select = dt.wrapper.find(".k-select");
    var arrows = '<span class="arrowsWrapper"><span class="myUpArrowClass k-icon k-i-arrow-60-up"></span><span class="myDownArrowClass k-icon k-i-arrow-60-down"></span></span>';

    $(arrows).appendTo(select);
    $(".myUpArrowClass").on("click", {
        day: 1
    }, changeDay);
    $(".myDownArrowClass").on("click", {
        day: -1
    }, changeDay);

    dt.wrapper.on("keydown", function(e) {
        if (e.keyCode === 107) { //Num +
            e.preventDefault();
            $(".myUpArrowClass").trigger("click");
        } else if (e.keyCode === 109) { //Num -
            e.preventDefault();
            $(".myDownArrowClass").trigger("click");
        }
    });

    function changeDay(data) {
        var dtp = $("#datetimepicker").data("kendoDateTimePicker");
        var val = new Date(dtp.value());

        val.setDate(val.getDate() + data.data.day);
        dtp.value(val);
        dtp.trigger("change");
    };
</script>
```
