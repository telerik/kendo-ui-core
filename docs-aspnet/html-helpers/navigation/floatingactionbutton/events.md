---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI FloatingActionButton component for {{ site.framework }}."
slug: events_floatingactionbutton
position: 6
---

# Events

The FloatingActionButton for {{ site.framework }} [exposes the `Click()`, `Expand()`, and `Collapse()` events](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/FloatingActionButtonEventBuilder). For a complete example on  FloatingActionButton events, refer to the [demo on using the events of the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/events).

The following example demonstrates how to subscribe to the FloatingActionButton events.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
            .Name("fab")
            .Align(FloatingActionButtonAlign.BottomCenter)
            .AlignOffset(ao=>ao.Vertical(50))
            .PositionMode(FloatingActionButtonPositionMode.Fixed)
            .Items(items=>{
                items.Add().Icon("download").Label("Download").Click(onItemClick);
                items.Add().Icon("print").Label("Print").Click(onItemClick);
                items.Add().Icon("email").Label("Email").Click(onItemClick);
            })
            .Events(e =>
            {
               e.Click("onClick");
               e.Expand("onExpand");
               e.Collapse("onExpand");
            })
    )
    
   <script>
        function onClick(e){
            // Handle the FloatingActionButton click event.
        };
        
        function onExpand(e){
            // Handle the FloatingActionButton expand event.
        };

        function onCollapse(e){
            // Handle the FloatingActionButton collapse event.
        };

        function onItemClick(e){
            // Handle the FloatingActionButton action item event.
        };
    </script>
```
{% if site.core %}
```TagHelper
   <kendo-floatingactionbutton  name="fab"
                                on-click="onClick"
                                on-expand="onExpand"
                                on-collapse="onCollapse"
                                align="FloatingActionButtonAlign.BottomCenter"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Fixed"
                                icon="share">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Download" icon="download" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Print" icon="print" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Email" icon="email" click="onItemClick"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>

   <script>
        function onClick(e){
            // Handle the FloatingActionButton click event.
        };
        
        function onExpand(e){
            // Handle the FloatingActionButton expand event.
        };

        function onCollapse(e){
            // Handle the FloatingActionButton collapse event.
        };

        function onItemClick(e){
            // Handle the FloatingActionButton action item event.
        };
    </script>
```
{% endif %}

## Next Steps

* [Using the FloatingActionButton Events (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/events)

## See Also

* [Using the API of the FloatingActionButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [FloatingActionButton Server-Side API](/api/floatingactionbutton)
* [FloatingActionButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingactionbutton)
