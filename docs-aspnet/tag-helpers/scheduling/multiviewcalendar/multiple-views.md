---
title: Multiple Views
page_title: Multiple Views
description: "Control the visible date ranges in the Telerik UI MultiViewCalendar TagHelper and manage the number of its horizontally rendered views."
slug: multiple_views_multiviewcalendar_taghelper_aspnetcore
position: 3
---

# Multiple Views

The Telerik UI MultiViewCalendar allows you to define the number of views and months that are displayed at a time.

In some scenarios it might be necessary to display more than two months. This is especially helpful when performing range selection between months.

```tagHelper

    <kendo-numerictextbox  name="numberOfViews" restrict-decimals="true" decimals="0" min="2" max="10" format="n0"/>

    <kendo-button name="numberOfViewsBtn" on-click="click">
        Apply Changes
    </kendo-button>

    <kendo-multiviewcalendar name="multiviewcalendar">
    </kendo-multiviewcalendar>

    <script>
        function click() {
            var numberOfViews = $("#numberOfViews").data().kendoNumericTextBox.value();
            if (numberOfViews > 0) {
                $("#multiViewCalendar").data().kendoMultiViewCalendar.setOptions({ numberOfVies: numberOfViews });
            }
        }
    </script>

```
```Razor

        @(Html.Kendo().NumericTextBox()
            .Name("numberOfViews")
            .RestrictDecimals(true)
            .Decimals(0)
            .Min(2)
            .Max(10)
            .Value(2)
            .Format("{0:n0}")
        )
        @(Html.Kendo().Button()
            .Name("numberOfViewsBtn")
            .Content("Apply Changes")
            .Events(ev => ev.Click("click"))
        )
        @(Html.Kendo().MultiViewCalendar()
                .Name("multiViewCalendar")
        )

        <script>
            function click() {
                var numberOfViews = $("#numberOfViews").data().kendoNumericTextBox.value();
                if (numberOfViews > 0) {
                    $("#multiViewCalendar").data().kendoMultiViewCalendar.setOptions({ numberOfVies: numberOfViews });
                }
            }
        </script>
```

## See Also

* [Server-Side API](/api/multiviewcalendar)
