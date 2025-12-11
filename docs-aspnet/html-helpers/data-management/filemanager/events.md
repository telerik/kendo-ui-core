---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI FileManager component for {{ site.framework }}."
components: ["filemanager"]
slug: events_filemanager_aspnetcore
position: 7
---

# Events

The Telerik UI FileManager for {{ site.framework }} exposes multiple [events](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/filemanagereventbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic FileManager events, refer to the [demo on using the events of the FileManager](https://demos.telerik.com/{{ site.platform }}/filemanager/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().FileManager().Name("filemanager")
        .Events(events => events.DataBound("onDataBound"))
    )


    <script>
        function onDataBound(e) {
            // Handle the DataBound event.
        }
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-filemanager name="filemanager" on-data-bound="onDataBound">
    </kendo-filemanager>
    <script>
        function onDataBound(e) {
            // Handle the DataBound event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().FileManager().Name("filemanager")
        .Events(events => events.DataBound(@<text>
            function onDataBound(e){
                // Handle the DataBound event inline.
            }
        </text>))
    )

```
{% if site.core %}
```TagHelper
    <kendo-filemanager name="filemanager" 
                       on-data-bound="function onDataBound(e){
                            // Handle the DataBound event inline. 
                       }">
    </kendo-filemanager>
```
{% endif %}

## Next Steps

* [Using the FileManager Events (Demo)](https://demos.telerik.com/{{ site.platform }}/filemanager/events)

## See Also

* [Using the API of the FileManager for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filemanager/api)
* [FileManager Server-Side API for {{site.framework}}](/api/filemanager)
* [FileManager Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager)