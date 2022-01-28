---
title: Parse Two-Digit Dates Greater Than 2029
description: An example on how to parse dates after year 2029 which are entered with two digits in the Kendo UI DatePicker.  
type: how-to
page_title: Parse Two-Digit Dates Greater Than 2029 | Kendo UI DatePicker for jQuery
slug: datepicker-parse-dates-greater-than-2029
tags: datepicker, date, parse, 1930, 2029, greater, correct, parseformat, after, century
ticketid: 1141658
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DatePicker</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

I am using custom `parseFormat` with a two-digit year in the DatePicker. When the value for the year is greater than 29, the year is parsed as 19xx.

How can I implement the parsing of two-digit dates that are greater than 2029?

## Solution

This behavior is controlled by the `twoDigitYearMax` property whose default value is 2029. As a result, 2029 is the maximum year that can be parsed. To parse years that are greater than 2029, change the property.

```dojo
<div class="demo-section k-content">

    <h4>Show e-mails from:</h4>
    <input id="datepicker" title="datepicker" style="width: 100%" />

</div>
<script>
    $(document).ready(function () {
        kendo.culture().calendar.twoDigitYearMax = 2099;
        // create DatePicker from input HTML element
        $("#datepicker").kendoDatePicker({
            parseFormats: ["dd/MM/yy"]
        });

    });
</script>
```
