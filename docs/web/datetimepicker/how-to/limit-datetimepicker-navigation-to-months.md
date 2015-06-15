---
title: Limit DateTimePicker navigation to Months (MVVM)
page_title: Limit DateTimePicker navigation to Months (MVVM)
description: Example that shows how to limit the calendar navigation of the DateTimePicker to Months

---

# How to limit the DateTimePicker navigation (MVVM)

Example that shows how to limit the calendar navigation of the DateTimePicker to Months

#### Example:

```html
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
