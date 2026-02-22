---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DockManager component for {{ site.framework }}."
components: ["dockmanager"]
slug: events_dockmanager_aspnetcore
position: 3
---


# Events

The Telerik UI DockManager for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/dockmanagereventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic DockManager events, refer to the [demo on using the events of the DockManager](https://demos.telerik.com/{{ site.platform }}/dockmanager/events).


## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.


```HtmlHelper
    @(Html.Kendo().DockManager()
        .Name("dockmanager")
        .Events(events => events.Pin("onPin"))
        .RootPane(root =>
        {
            root.Id("root")
            .Panes(panes  => {
                panes.Add().Type(PaneType.Split).Panes(top => {
                     top.Add().Id("tools")
                        .Type(PaneType.Content)
                        .Title("Tools")
                        .Content("Content");
                });
            });
        })
    )

    <script>
        function onPin(e){
             // Handle the pin event.
        }
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-dockmanager name="dockmanager" on-pin="onPin">
      <root-pane id="root" type="RootPaneType.Split">
          <panes>
              <pane id="nested" type="PaneType.Split">
                  <panes>
                      <pane id="tools" type="PaneType.Content" title="Tools" content="Tools Content"></pane>
                  </panes>
              </pane>
          </panes>
      </root-pane>
    </kendo-dockmanager>

     <script>
        function onPin(e){
             // Handle the pin event.
        }
    </script>
```
{% endif %}


## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.


```HtmlHelper
    @(Html.Kendo().DockManager()
        .Name("dockmanager")
        .Events(events => events.Pin(@<text>
                            function(e){
                                // Handle the Pin event.
                            }
                        </text>)
        )
        .RootPane(root =>
        {
            root.Id("root")
            .Panes(panes  => {
                panes.Add().Type(PaneType.Split).Panes(top => {
                     top.Add().Id("tools")
                        .Type(PaneType.Content)
                        .Title("Tools")
                        .Content("Content");
                });
            });
        })
    )
```

{% if site.core %}
```TagHelper
    <kendo-dockmanager name="dockmanager" 
                       on-pin="function(){
                            // Handle the pin event.
                       }">
      <root-pane id="root" type="RootPaneType.Split">
          <panes>
              <pane id="nested" type="PaneType.Split">
                  <panes>
                      <pane id="tools" type="PaneType.Content" title="Tools" content="Tools Content"></pane>
                  </panes>
              </pane>
          </panes>
      </root-pane>
    </kendo-dockmanager>
```
{% endif %}


## Next Steps

* [Using the DockManager Events (Demo)](https://demos.telerik.com/{{ site.platform }}/dockmanager/events)


* [Using the API of the DockManager HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dockmanager/api)
* [DockManager Server-Side API](/api/dockmanager)
* [DockManager Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dockmanager)
