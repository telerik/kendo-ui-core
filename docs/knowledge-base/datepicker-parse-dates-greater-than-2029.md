---
title: Parse two-digit dates greater than 2029
description: An example on how to parse dates after 2029 entered with two digits.  
type: how-to
page_title: Parse two-digit dates greater than 2029 | Kendo UI DatePicker
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

I am using custom parseFormat with two-digit year for DatePicker. When the value for the year is greater than 29 the year is parsed as 19xx.

## Solution

This behavior is controlled by the **twoDigitYearMax** property. The default value for it is 2029 and this is why this is the max parsed year. In order to parse years after this you should change the property. 

The following example demonstrates the approach.

```html
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
