---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI PanelBar component for {{ site.framework }}."
slug: events_panelbar_aspnetcore
position: 6
---

# Events

The Telerik UI PanelBar for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/panelbareventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic PanelBar events, refer to the [demo on using the events of the PanelBar](https://demos.telerik.com/{{ site.platform }}/panelbar/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@using Kendo.Mvc.UI

<h4>PanelBar</h4>
<div>
    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .Items(items =>
        {
            items.Add().Text("Item 1").Selected(true).Expanded(true)
                .Items(subItems =>
                {
                    subItems.Add().Text("Item 1.1");
                    subItems.Add().Text("Item 1.2");
                    subItems.Add().Text("Item 1.3");
                });
            items.Add().Text("Item 2")
                .Items(subItems =>
                {
                    subItems.Add().Text("Item 2.1");
                    subItems.Add().Text("Item 2.2");
                    subItems.Add().Text("Item 2.3");
                });
            items.Add().Text("Item 3");
        })
        .Events(events => events
            .Select("onSelect")
            .Expand("onExpand")
            .Collapse("onCollapse")
            .Activate("onActivate")
        )
    )

    <script>
        function onSelect(e) {
            console.log("Select: " + $(e.item).find("> .k-link").text());
        }

        function onExpand(e) {
            console.log("Expand: " + $(e.item).find("> .k-link").text());
        }

        function onCollapse(e) {
            console.log("Collapse: " + $(e.item).find("> .k-link").text());
        }

        function onActivate(e) {
            console.log("Activate: " + $(e.item).find("> .k-link").text());
        }
    </script>  
</div>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<h4>PanelBar</h4>
<div>
    <kendo-panelbar name="panelbar" 
        on-select="onSelect"
        on-expand="onExpand"
        on-collapse="onCollapse"
        on-activate="onActivate">
        <items>
            <panelbar-item text="Item 1" selected="true" expanded="true">
                <items>
                    <panelbar-item text="Item 1.1"></panelbar-item>
                    <panelbar-item text="Item 1.2"></panelbar-item>
                    <panelbar-item text="Item 1.3"></panelbar-item>
                </items>
            </panelbar-item>
            <panelbar-item text="Item 2">
                <items>
                    <panelbar-item text="Item 2.1"></panelbar-item>
                    <panelbar-item text="Item 2.2"></panelbar-item>
                    <panelbar-item text="Item 2.3"></panelbar-item>
                </items>
            </panelbar-item>
            <panelbar-item text="Item 3">
            </panelbar-item>
        </items>
    </kendo-panelbar>

    <script>
        function onSelect(e) {
            console.log("Select: " + $(e.item).find("> .k-link").text());
        }

        function onExpand(e) {
            console.log("Expand: " + $(e.item).find("> .k-link").text());
        }

        function onCollapse(e) {
            console.log("Collapse: " + $(e.item).find("> .k-link").text());
        }

        function onActivate(e) {
            console.log("Activate: " + $(e.item).find("> .k-link").text());
        }
    </script> 
</div>

```
{% endif %}

## Next Steps

* [Using the PanelBar Events (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/events)

## See Also

* [Using the API of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/api)
* [PanelBar Server-Side API](/api/panelbar)
* [PanelBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
