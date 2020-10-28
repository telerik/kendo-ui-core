---
title: Binding to a Shared DataSource
page_title: jQuery Timeline Documentation | Shared DataSource Binding
description: "Learn how to bind the the Kendo UI jQuery Timeline widget to a shared data source."
slug: shared_datasource_kendoui_timeline_widget
position: 6
---

# Binding to a Shared DataSource

The Kendo UI Timeline could be bound to a shared data source. Whenever a change external to the Kendo UI Timeline is present, the widget's data source and UI will be automatically updated.

For a runnable example, refer to the [demo on binding to a shared data source](https://demos.telerik.com/kendo-ui/timeline/shared-datasource).

The following example demonstrates how to bind two Kendo UI widgets to the same data source. Changes done from one of the widgets is automatically reflected in the data source and UI of the other widget.

```
<div id="timeline"></div>
    <script>
        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
                pageSize: 10,
                transport: {
                    read: {
                        url: "../content/web/timeline/events-vertical-part1.json",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "title",
                        fields: {
                            date: {
                                type: "date"
                            }
                        }
                    }
                }
            });

            dataSource.read();

            $("#titles").kendoDropDownList({
                autoBind: false,
                optionLabel: "Select an item...",
                dataSource: dataSource,
                dataTextField: "title",
                dataValueField: "title",
                value: "Barcelona & Tenerife"
            });

            $("#timeline").kendoTimeline({
                autoBind: false,
                dataSource: dataSource,
                alternatingMode: true,
                collapsibleEvents: true,
                orientation: "vertical"
            });

            $("#remove").click(function() {
                var ddl = $("#titles").getKendoDropDownList();
                var selectedItem = ddl.value();
                var dataItems = $.grep(dataSource.data(), function(item){
                  return item.title == selectedItem;
                });

                dataSource.remove(dataItems[0]);
                ddl.value("");
            });
        });
    </script>
```

## See Also

* [Bindig to a Shared DataSource (Demo)](https://demos.telerik.com/kendo-ui/timeline/shared-datasource).
* [JavaScript API Reference of the Timeline](/api/javascript/ui/timeline)
