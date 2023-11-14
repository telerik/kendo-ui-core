---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DataSource component for {{ site.framework }}."
slug: datasource_events
position: 5
---

# Events

You can subscribe to [all DataSource events](/api/kendo.mvc.ui.fluent/datasourceeventbuilder) and then use them to further customize the behavior of the DataSource.

The example below demonstrates how to use the [`Error`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#errorsystemstring), [`RequestStart`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#requeststartsystemstring) and [`RequestEnd`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#requestendsystemstring) events.

```HtmlHelper
    @using Kendo.Mvc.UI

   @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
        .Read(read => read.Action("Products_Read", "DataSource"))
        .ServerOperation(true)
        .PageSize(12)
        .Events(e=>e.Error("error_handler").RequestStart("onRequestStart").Request("onRequestEnd"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" server-operation="true" page-size="12"
        on-error="error_handler"
        on-request-end="onRequestEnd"
        on-request-start="onRequestStart">
        <transport>
            <read url="@Url.Action("Products_Read", "DataSource")" />
        </transport>
    </kendo-datasource>
```
{% endif %}
```JavaScript
    function error_handler(e){
        if (e.errors) {
            var message = "Errors:\n";
            $.each(e.errors, function (key, value) {
                if ('errors' in value) {
                    $.each(value.errors, function () {
                        message += this + "\n";
                    });
                }
            });
            alert(message);
        }
    }
    function onRequestStart(e){
        if(e.type=="create"){
            //apply logic
        }
    }
    function onRequestEnd(e){
        //access the raw remote service response
        console.log(e.response);
    }
```

## Next Steps

* [API for Configuring the DataSource Events](/api/kendo.mvc.ui.fluent/datasourceeventbuilder)
* [Using the DataSource Events (Demo)](https://demos.telerik.com/{{ site.platform }}/datasource/events)

## See Also

* [Using the API of the DataSource for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datasource/api)
