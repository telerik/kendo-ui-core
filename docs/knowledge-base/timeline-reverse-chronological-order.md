---
title: Display the Timeline Events in Reverse Chronological Order
description: "An example demonstrating how to display the Timeline events in reverse chronological order."
type: how-to
page_title: Timeline Display of Events in Reverse Chronological Order - Kendo UI Timeline for jQuery
slug: timeline-reverse-chronological-order
tags: timeline, events, chronological, order, sort, reverse, descending
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Timeline for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.2.616</td>
 </tr>
</table>

## Description

How can I display the Timeline events in reverse chronological order?

## Solution

Utilize the [`sort`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/sort) configuration of the DataSource and sort the date field in descending order.

```
    sort: { field: "date", dir: "desc" }
```

```dojo
    <div id="timeline"></div>
    <script>
      	const baseUrl = "https://demos.telerik.com/kendo-ui";

        $(document).ready(function () {
            $("#timeline").kendoTimeline({
                dataSource: {
                  transport: {
                    read: {
                        url: baseUrl + "/content/web/timeline/events-vertical-part1.json",
                        dataType: "json"
                    }
                  },
                  schema: {
                    model: {
                      fields: {
                        date: {
                          type: "date"
                        }
                      }
                    }
                  },
                  sort: { field: "date", dir: "desc" }
                },
                alternatingMode: true,
                collapsibleEvents: true,
                orientation: "vertical"
            });
        });
    </script>
```
