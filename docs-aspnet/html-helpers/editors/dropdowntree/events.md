---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI DropDownTree component for {{ site.framework }}."
slug: dropdowntree_events
position: 5
---

# Events

You can subscribe to [all DropDownTree events](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/dropdowntreebuilder#eventssystemaction) and then use them to further customize the behavior of the control.

For an example on basic DropDownTree events, refer to the [demo on using the events of the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/events).

```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "Home")
            )
        )
        .Events(events => events
            .DataBound("onDataBound")
            .Change("onChange")
            .Select("onSelect")
            .Close("onClose")
            .Open("onOpen")
            .Filtering("onFiltering")
        )
    )

```
{% if site.core %}
```TagHelper
        <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree" on-data-bound="onDataBound" on-open="onOpen" on-close="onClose" on-change="onChange" on-filtering="onFiltering" on-select="onSelect" style="width: 100%">
            <hierarchical-datasource>
                <schema>
                    <hierarchical-model id="id"></hierarchical-model>
                </schema>
                <transport>
                    <read url="@Url.Action("Employees", "Home")" />
                </transport>
            </hierarchical-datasource>
        </kendo-dropdowntree>
```
{% endif %}
```JavaScript
    <script type="text/javascript">
        function onDataBound(e) {
            console.log('DropDownTree instance:', e.sender);
        }

        function onChange(e) {
            console.log('Selected node changed to:', e.sender.select());
        }

        function onSelect(e) {
            console.log('Selected node:', e.node);
        }

        function onClose(e) {
            console.log('DropDownTree instance:', e.sender);
        }

        function onOpen(e) {
            console.log('DropDownTree instance:', e.sender);
        }

        function onFiltering(e) {
            console.log('Folter:', e.filter);
        }
    </script>
```

## Next Steps

* [API for Configuring the DropDownTree Events](/api/kendo.mvc.ui.fluent/dropdowntreeeventbuilder)
* [Using the DropDownTree Events (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/events)

## See Also

* [Using the API of the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/api)
