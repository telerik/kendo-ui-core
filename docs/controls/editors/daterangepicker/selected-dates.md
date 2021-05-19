---
title: Selected Dates
page_title: jQuery DateRangePicker Documentation | Selected Dates
description: "Get started with the jQuery DateRangePicker by Kendo UI and learn how to set the selected and the min and max values."
slug: selecteddates_kendoui_daterangepicker
position: 3
---

# Selected Dates

The DateRangePicker allows you to define the minimum and maximum dates it displays and also render a pre-selected date range.

The following example demonstrates how to render a DateRangePicker with an initially selected range and defined min and max dates. The DateRangePicker sets the range only if the entered date is valid and within min and max values.

    <div id="daterangepicker"></div>

    <script>
        $(document).ready(function(){
		    var currentDate = new Date();
			var start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2);
            var end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 20);
			var max = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 60);

            $("#daterangepicker").kendoDateRangePicker({
                range: [start, end],
                min: new Date(),
                max: max
            })
        });
    </script>

## See Also

* [Basic Usage of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/index)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
