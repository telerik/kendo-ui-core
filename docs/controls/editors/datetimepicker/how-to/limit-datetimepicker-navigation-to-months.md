---
title: Limit Navigation to Months
page_title: Limit Navigation to Months | Kendo UI DateTimePicker
description: "Learn how to limit the Kendo UI DateTimePicker navigation to months only."
slug: howto_limit_navigation_tomonths_datetimepicker
position: 1
---

# Limit Navigation to Months

The following example demonstrates how to limit the calendar navigation of the DateTimePicker to months (MVVM).

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
                .toggleClass("k-state-disabled", disable)
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
