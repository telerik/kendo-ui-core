---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI for {{ site.framework }} PivotGridV2 component."
slug: htmlhelpers_events_pivotgridv2_aspnetcore
position: 6
---

# Events

The Telerik UI PivotGridV2 for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/pivotgridv2eventbuilder) that allow you to control the behavior of the UI component.

The following example demonstrates how you can subscribe to the `ExpandMember` and `CollapseMember` events of the component. 

```HtmlHelper
    @(Html.Kendo().PivotGridV2()
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
    <kendo-pivotgridv2 name="pivotgrid" on-expand-member="onExpandMember" on-collapse-member="onCollapseMember">
    </kendo-pivotgridv2>

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

* [Using the Keyboard Navigation of the PivotGridV2 for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/keyboard-navigation)

## See Also

* [Client-Side API of the PivotGridV2](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgridv2)
* [Server-Side API of the PivotGridV2 HtmlHelper](/api/pivotgridv2)
{% if site.core %}
* [Server-Side API of the PivotGridV2 TagHelper](/api/taghelpers/pivotgridv2)
{% endif %}