---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ListView component for {{ site.framework }}."
components: ["listview"]
slug: listview_events
position: 4
---

# Events

The Telerik UI ListView for {{ site.framework }} [exposes a number of JavaScript events](/api/kendo.mvc.ui.fluent/listvieweventbuilder) that allow you to control the behavior of the UI component.

For a complete example of how to handle all ListView events triggered by user interaction, refer to the [demo on using the events of the ListView ](https://demos.telerik.com/{{ site.platform }}/listview/events).


## Subscribing to Events

The following example demonstrates how to subscribe to the [`DataBound`](https://docs.telerik.com/kendo-ui/api/ui/listview/events/databound) event.

```HtmlHelper
    @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("listView")
    .TagName("ul")
    .ClientTemplateId("template")
    .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "ListView"))
            .PageSize(21)
        )
        .Pageable(pageable => pageable
           .Refresh(true)
           .ButtonCount(5)
           .PageSizes(new[] { 5, 15, 21 })
        )
        .Events(e=>e.DataBound("onDataBound"))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-listview name="listView"
                    tag-name="div"
                    template-id="template"
                    on-data-bound="onDataBound">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="21">
            <transport>
                <read url="@Url.Action("Products_Read", "ListView")" />
            </transport>
        </datasource>
        <pageable enabled="true" />
    </kendo-listview>
```
{% endif %}
```JavaScript
    <script>
        function onDataBound(e){
            var listview = $("#listView").data("kendoListView");
            listview.setOptions({selectable: "single"});  // Turn on the selectable mode of the ListView.
            listview.select(listview.content.children().first()); // Select the first item.
        }
    </script>
```

## Get the Data Item in the DataBound Handler

You can register the `DataBound` handler in the ListView HtmlHelper with `.Events(e => e.DataBound("onListViewDataBound"))`. The event does not pass a specific data item ID. Use `e.sender` to access the ListView, then call `dataItem()` for each rendered item to read its fields.

```JavaScript
function onListViewDataBound(e) {
    var listView = e.sender;

    listView.items().each(function () {
        var dataItem = listView.dataItem(this);
        console.log(dataItem.ProductID);
    });
}
```

Replace `ProductID` with the ID field in your data item. You can also read other fields from `dataItem` and pass them to your tooltip initialization logic.

## Next Steps

* [Using the ListView Events (Demo)](https://demos.telerik.com/aspnet-core/listview/events)

## See Also

* [Server-Side API of the ListView](/api/listview)
* [Client-Side API of the ListView](https://docs.telerik.com/kendo-ui/api/ui/listview)