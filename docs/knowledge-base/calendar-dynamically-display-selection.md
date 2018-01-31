---
title: Use Kendo Calendar widget in MultiSelect.
description: An example on how to dynamically display the selected dates from the Calendar 
type: how-to
page_title: Dynamically display the selected dates from the Calendar | Kendo UI Calendar
slug: calendar-dynamically-display-selection
tags: kendo, kendoui, calendar, multiselect, dynamical, select
ticketid: 1145054
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Calendar for ASP.NET Core</td>
	</tr>
</table>


## Description
In order to have the Kendo UI Calendar display its selected dates dynamically in another widget/container, you should follow the next steps:

1. Enable the multiple selection of the Calendar through its selectable property (set to "multiple") 
2. Subscribe for the Change event of the Calendar
3. Update a preferable container by appending the selected values of the Calender with span elements

```html
<div class="demo-section k-content" style="text-align: center;">
    <div id="result" style="width:300px; margin:0 auto;"></div>

    <div id="calendar"></div>
</div>
<script>
    $(document).ready(function() {

        $("#calendar").kendoCalendar({
            selectable: "multiple",
            change: onChange
        });
    })

    function onChange(e) {

        var dates = e.sender.selectDates()
        updateResult(dates);
    }

    function updateResult(dates) {
        if (dates.length > 0) {
            var result = "";
            for (var i = 0; i < dates.length; i++) {
                var newdate = kendo.toString(dates[i], "yyyy/MM/dd");
                result += "<span class='selectedName'>" + newdate + "</span>";
            }
        } else {
            result = "No dates selected.";
        }
        $("#result").html(result);
    }
</script>
<style>
    #result {
        padding-bottom: 15px;
    }

    #result:after {
        content: '';
        display: block;
        clear: both;
    }

    .selectedName {
        padding: 5px 10px;
        background: #aaa;
        color: white;
        float: left;
        margin-right: 5px;
        margin-bottom: 5px;
        border-radius: 10px;
    }
</style>
```
