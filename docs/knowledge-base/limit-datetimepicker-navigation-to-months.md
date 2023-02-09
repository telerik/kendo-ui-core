---
title: Limit DateTimePicker Navigation to Months
page_title: Restrict DateTimePicker Navigation to Months
description: "Learn how to limit the Kendo UI DateTimePicker navigation to months only."
slug: howto_limit_navigation_tomonths_datetimepicker
previous_url: /controls/editors/datetimepicker/how-to/limit-datetimepicker-navigation-to-months
tags: telerik, kendo, jquery, datetimepicker, limit, restrict, navigation, to, months, only
component: datetimepicker
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DateTimePicker for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I limit the calendar navigation of the Kendo UI for jQuery DateTimePicker to months only?

## Solution

The following example demonstrates how to achieve the desired scenario through MVVM.

```dojo
      <input data-role="datetimepicker" />

    <script>
      $(function() {
        kendo.init($(document.body));

        var elements = $(document.body).find("[data-role=datetimepicker]");

        elements.each(function() {
          $(this).data("kendoDateTimePicker")
          .bind("open", function() {
            var calendar = this.dateView.calendar;

            if (calendar) {
              calendar.unbind("navigate")
              .bind("navigate", function(e) {
                var widget = e.sender;
                var viewName = widget.view().name;
                var disable = viewName == "month" && viewName !== "year";
                widget.wrapper.find(".k-nav-fast")
                .toggleClass("k-disabled", disable)
                .attr("aria-disabled", disable);
              })
              .trigger("navigate");
            }
          });
        })
      });
    </script>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
