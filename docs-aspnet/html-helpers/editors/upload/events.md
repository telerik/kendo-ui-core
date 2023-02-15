---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Upload component for {{ site.framework }}."
slug: events_upload_aspnetcore
position: 7
---

# Events

The Telerik UI Upload for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/UploadEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic Upload events, refer to the [demo on using the events of the Upload](https://demos.telerik.com/{{ site.platform }}/upload/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.


```HtmlHelper
    @(Html.Kendo().Upload()
        .Name("upload")
        .Multiple(true)
        .Async(a => a
           .Save("SaveAsync", "Upload")
           .Remove("Remove", "Upload")
        )  
        .Events(events => events
           .Upload("onUpload")
           .Success("onSuccess")
       )
    )

    <script>
        function onUpload(e) {
            // Handle the upload event.
        }
        function onSuccess(e) {
            // Handle the success event.
        }
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-upload name="upload"
                  on-upload="onUpload"
                  on-success="onSuccess">
        <async auto-upload="true" 
               save-url="@Url.Action("SaveAsync", "Upload")" 
               remove-url="@Url.Action("Remove","Upload")" />
    </kendo-upload>

     <script>
        function onUpload(e) {
            // Handle the Upload event.
        }
        function onSuccess(e) {
            // Handle the Success event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().Upload()
        .Name("upload")
        .Multiple(true)
        .Async(a => a
           .Save("SaveAsync", "Upload")
           .Remove("Remove", "Upload")
        )  
        .Events(events => events
           .Upload(@<text>
                function() {
                    // Handle the Upload event inline.
                }
            </text>)
           .Success(@<text>
                function() {
                    // Handle the Success event inline.
                }
            </text>)
       )
    )
```
{% if site.core %}
```TagHelper
    <kendo-upload name="upload"
                  on-upload="function() {
                        // Handle the Upload event inline.
                  }"
                  on-success="function() {
                        // Handle the Success event inline.
                  }">
        <async auto-upload="true" 
               save-url="@Url.Action("SaveAsync", "Upload")" 
               remove-url="@Url.Action("Remove","Upload")" />
    </kendo-upload>
```
{% endif %}

## Next Steps

* [Using the Upload Events (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/events)

## See Also

* [Using the API of the Upload for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/api)
* [Upload Server-Side API for {{site.framework}}](/api/upload)
* [Upload Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)