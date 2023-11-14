---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Splitter component for {{ site.framework }}."
slug: events_splitter_aspnetcore
position: 7
---



# Events

The Telerik UI Splitter for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/splittereventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic Splitter events, refer to the [demo on using the events of the Splitter](https://demos.telerik.com/{{ site.platform }}/splitter/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
 @using Kendo.Mvc.UI

<script>
    function onCollapse(e) {
        console.log("Collapsed :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> collapsed");
    }
</script>

<h4>Splitter with Collapsible Panes</h4>
<div>
@(Html.Kendo().Splitter()
      .Name("splitter")
      .Events(e => e.Collapse("onCollapse"))
      .HtmlAttributes(new { style = "height: 200px;" })
      .Panes(panes =>
      {
          panes.Add()
              .HtmlAttributes(new { id = "left_pane" })
              .Collapsible(true)
              .Size("100px")
              .Content(@<p>
                            Left pane
                        </p>);
    
          panes.Add()
              .HtmlAttributes(new { id = "middle_pane" })
              .Collapsible(true)
              .Content(@<p>
                            Middle pane
                        </p>);
    
          panes.Add()
              .HtmlAttributes(new { id = "right_pane" })
              .Size("20%")
              .Collapsible(true)
              .Content(@<p>
                           Right pane
                        </p>);
      }))
</div>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<script>
    function onCollapse(e) {
        console.log("Collapsed :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> collapsed");
    }
</script>

<h4>Splitter with Collapsible Panes</h4>
<div>
<kendo-splitter name="splitter" style="height: 200px;" on-collapse="onCollapse">
       <pane size="100px" id="left_pane" collapsible="true">
           <p>Left pane</p>
       </pane>
       <pane id="middle_pane" collapsible="true">
            <p>Middle pane</p>
       </pane>
       <pane size="20%" id="right_pane" collapsible="true">
            <p>Right pane</p>
       </pane>
</kendo-splitter>
</div>
```
{% endif %}
```JavaScript
    <script>
        function onCollapse() {
            // Handle the collapse event.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
@(Html.Kendo().Splitter()
      .Name("splitter")
      .Events(e => e.Collapse("function() {
          //Handle the collapse event inline.
       }")
 )
```
{% if site.core %}
```TagHelper
<kendo-splitter name="splitter" style="height: 200px;" on-collapse="function() {
          //Handle the collapse event inline.
       }">
</kendo-splitter>
```
{% endif %}

## Next Steps

* [Using the Splitter Events (Demo)](https://demos.telerik.com/{{ site.platform }}/splitter/events)

## See Also

* [Using the API of the Splitter HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitter/api)
* [Splitter Server-Side API](/api/splitter)
* [Splitter Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitter)
