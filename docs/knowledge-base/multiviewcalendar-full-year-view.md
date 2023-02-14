---
title: Display Full Year in MultiViewCalendar
description: "Configure the MultiViewCalendar to show a 3 X 4 full year view"
type: how-to
page_title: Display Full Year in MultiViewCalendar
slug: multiviewcalendar-full-year-view
position:
tags: kendoui, multiviewcalendar, months, full, year, view
ticketid: 1591326
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® MultiViewCalendar for jQuery</td>
		</tr>
	</tbody>
</table>

## Description

How can I set the Kendo UI MultiViewCalendar to display a 3 X 4 column matrix to show all the months?  

## Solution

The Kendo UI MultiViewCalendar can be configured into a 3 X 4 full year view by setting a defined width to its wrapper.

```HTML
     <div id="multiViewCalendar" />
```

```CSS
     #multiViewCalendar {
       width: 1100px;
     }
```

Then, modify the calendar's view to adapt to the width.  

```CSS
    .k-calendar-view {
      flex-flow: row wrap;
      display: flex;
    }
```

```dojo
    <style>
        .k-calendar-view {
            flex-flow: row wrap;
            display: flex;
        }

	div[data-role="multiviewcalendar"] {
            width: 1100px;
        }
    </style>

        <div id="multiViewCalendar" />

        <script>
            $(document).ready(function () {

                $("#multiViewCalendar").kendoMultiViewCalendar({
                    selectable: "range",
                    depth: "month",
                    showViewHeader: true,
                    views: 12,
                    value: new Date(2023, 0, 1),
                });
            });
        </script>
```
