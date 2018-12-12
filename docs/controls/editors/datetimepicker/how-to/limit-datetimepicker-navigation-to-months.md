---
title: Limit Navigation to Months
page_title: Limit Navigation to Months | Kendo UI DateTimePicker
description: "Learn how to limit the Kendo UI DateTimePicker navigation to months only."
slug: howto_limit_navigation_tomonths_datetimepicker
position: 1
---

# Limit Navigation to Months

The following example demonstrates how to limit the calendar navigation of the DateTimePicker to months (MVVM).

###### Example

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

* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
