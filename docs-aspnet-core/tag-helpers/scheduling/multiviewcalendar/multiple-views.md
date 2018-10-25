---
title: Multiple Views
page_title: Multiple Views | Telerik UI for ASP.NET Core Tag Helpers
description: "Control the visible date ranges in the Kendo UI MultiViewCalendar and manage the number of its horizontally rendered views."
slug: multiple_views_multiviewcalendar_taghelper_aspnetcore
position: 3
---


# Multiple Views

The Kendo UI MultiViewCalendar allows to define the number of views/months to be displayed at a time. In some scenarios it might be necessary to display more than two months. This is helpful especially in case of range selection among a couple of months.

###### Example

```tab-tagHelper

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
```tab-Razor

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

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
