---
title: Auto-Change Focus of Date Input
description: An example on how to automatically change the focus of the date input in the Kendo UI DatePicker.
type: how-to
page_title: Change Focus Automatically | Kendo UI DatePicker for jQuery
slug: datepicker-auto-change-focus
tags: datepicker, change, focus, dateinput
ticketid: 1168790
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

How can I set the focus to move automatically to the month after the date is entered and the focus moves to the year once the month is entered in a DatePicker with a DateInput?

## Solution

1. Handle the [`keydown`](https://api.jquery.com/keydown/) event of the DatePickers.
1. In the `keydown` event handler, based on a condition, manually trigger the `keydown` event of the right arrow.

```dojo
<input id="datepicker1" />
<br /><br /><br />
<input id="datepicker2" />

<script>
    var datepicker1ChangeFocusFlag = 0;
    var datepicker2ChangeFocusFlag = 0;

    $(document).ready(function() {
        $("#datepicker1, #datepicker2").kendoDatePicker({
            dateInput: true,
            format: "dd-MM-yyyy"
        });


        $("input[data-role='datepicker']").on("focus", function(e) {
            var id = e.target.id;

            switch (id) {
                case "datepicker1":
                    datepicker1ChangeFocusFlag = 0;
                    break;
                case "datepicker2":
                    datepicker2ChangeFocusFlag = 0;
                    break;
                default:
                    break;
            }
        });

        $("input[data-role='datepicker']").on("keydown", function(e) {
            if ($.isNumeric(e.key)) {
                var id = e.target.id;

                switch (id) {
                    case "datepicker1":
                        datepicker1ChangeFocusFlag++;
                        if (datepicker1ChangeFocusFlag === 2) {
                            datepicker1ChangeFocusFlag = 0;
                            changeDatePickerFocus(id);
                        }
                        break;
                    case "datepicker2":
                        datepicker2ChangeFocusFlag++;
                        if (datepicker2ChangeFocusFlag === 2) {
                            datepicker2ChangeFocusFlag = 0;
                            changeDatePickerFocus(id);
                        }
                        break;
                    default:
                        break;
                }
            }
        });

        function changeDatePickerFocus(id) {
            setTimeout(function() {
                var ev = $.Event("keydown");
                ev.keyCode = 39;
                $("#" + id).trigger(ev);
            }, 100)
        };
    });
</script>
```
