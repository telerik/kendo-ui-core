---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI for {{ site.framework }} PivotGrid component."
slug: htmlhelpers_events_pivotgrid_aspnetcore
position: 6
---

# Events

The Telerik UI PivotGrid for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/pivotgrideventbuilder) that allow you to control the behavior of the UI component.

The following example demonstrates how you can subscribe to the `ExpandMember` and `CollapseMember` events of the component. 

```HtmlHelper
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .Events(e => 
        {
            e.ExpandMember("onExpandMember");
            e.CollapseMember("onCollapseMember");
        })
        ... // Other configuration.
    )

    <script>
        function onExpandMember(e) {
            console.log(e); // Review the event data.
            // Custom logic when a specified column or row field is expanded.
        }

        function onCollapseMember() {
            console.log(e); // Review the event data.
            // Custom logic before a specified column or row field is collapsed.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-pivotgrid name="pivotgrid" datasource-id="pivotSource" on-expand-member="onExpandMember" on-collapse-member="onCollapseMember">
        <!--Other configuration-->
    </kendo-pivotgrid>

    <script>
        function onExpandMember(e) {
            console.log(e); // Review the event data.
            // Custom logic when a specified column or row field is expanded.
        }

        function onCollapseMember() {
            console.log(e); // Review the event data.
            // Custom logic before a specified column or row field is collapsed.
        }
    </script>
```
{% endif %}

## Next Steps

* [Displaying KPI measurements by using the PivotGrid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/kpi)

## See Also

* [Client-Side API of the PivotGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid)
* [Server-Side API of the PivotGrid HtmlHelper](/api/pivotgrid)
{% if site.core %}
* [Server-Side API of the PivotGrid TagHelper](/api/taghelpers/pivotgrid)
{% endif %}