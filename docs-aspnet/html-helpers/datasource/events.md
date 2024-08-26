---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DataSource component for {{ site.framework }}."
slug: datasource_events
position: 5
---

# Events

You can subscribe to the [available DataSource events](/api/kendo.mvc.ui.fluent/datasourceeventbuilder) and further customize the behavior of the DataSource.

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
   @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
            .Events(ev => ev.RequestStart("onRequestStart"))
            .Read(read => read.Action("Products_Read", "DataSource"))
            ... // Additional configuration
        )
    )

    <script>
        function onRequestStart(e){
            // Handle the RequestStart event that triggers the DataSource makes a request to the remote service.
        }
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" on-request-start="onRequestStart">
        <transport>
            <read url="@Url.Action("Products_Read", "DataSource")" />
        </transport>
        <!-- Additional configuration -->
    </kendo-datasource>

    <script>
        function onRequestStart(e){
            // Handle the RequestStart event that triggers when the DataSource makes a request to the remote service.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
   @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
            .Read(read => read.Action("Products_Read", "DataSource"))
            .Events(e => e.RequestStart(@<text>
                function() {
                    // Handle the RequestStart event inline.
                }
                </text>)
            )
            ... // Additional configuration
        )
    )
```

{% if site.core %}
```TagHelper
    <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" on-request-start="function() {
            // Handle the RequestStart event inline.
        }">
        <transport>
            <read url="@Url.Action("Products_Read", "DataSource")" />
        </transport>
        <!-- Additional configuration -->
    </kendo-datasource>
```
{% endif %}

## See Also

* [DataSource Server-Side API for {{ site.framework}}](/api/datasource)
{% if site.core %}
* [DataSource Server-Side TagHelper API for ASP.NET Core](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/datasource)
{% endif %}
* [DataSource Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)