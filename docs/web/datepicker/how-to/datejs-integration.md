---
title: Integrate widget with DateJS library
page_title: Integrate widget with DateJS library
description: Integrate widget with DateJS library
---

# Integrate widget with DateJS library

The example below demonstrates how to integrate the widget with DateJS and use its 'syntactic sugar'

#### Example:

```html
    <div id="email-settings">
        <div class="display-picker">
            <input id="datepicker" placeholder="type 'next friday'" style="width:150px;" />
        </div>
        <div class="archive-picker">
            <input id="monthpicker" value="November 2011" style="width:150px" />
        </div>
        <p>Integration with the <a target="_blank" href="http://www.datejs.com/">DateJS</a> library</p>
    </div>
    <script>
        $(document).ready(function() {
            // create DatePicker from input HTML element
            $("#datepicker").kendoDatePicker();

            $("#monthpicker").kendoDatePicker({
                // defines the start view
                start: "year",

                // defines when the calendar should return date
                depth: "year",

                // display month and year in the input
                format: "MMMM yyyy"
            });

            //Parse input value on blur using DateJS
            $("[data-role=datepicker]").on("blur", function() {
                var element = $(this);
                var widget = element.data("kendoDatePicker");

                if (element.val()) {
                  widget.value(Date.parse(element.val()));
                }
            });
        });
    </script>
```
