---
title: Data Binding
page_title: jQuery ListBox Documentation | Data Binding
description: "Get started with the jQuery ListBox by Kendo UI and bind the widget to local data arrays or remote data services."
slug: databinding_kendoui_listbox_widget
position: 2
---

# Data Binding

The ListBox provides options for binding it to local data arrays and remote data services.

## Binding to Local Data

When you use complex data objects, use the `dataTextField` and `dataValueField` properties to notify the widget of your preferred binding behavior.

```dojo
    <select id="listbox"></select>

    <!-- Initialize the ListBox -->
    <script>
        $(document).ready(function(){
            $("#listbox").kendoListBox({
                dataSource: [
                    { name: "Jane Doe" },
                    { name: "John Doe" }
                ],
                template: "<div>#:name#</div>",
                toolbar: {
                    tools: [ "moveUp", "moveDown", "remove" ]
                }
            });
        });
    </script>
```

## Binding to Remote Data

The following example demonstrates how to bind the ListBox to a remote data service.

```dojo

     <select id="listbox"></select>

    <!-- Initialize the ListBox -->
    <script>
        $(document).ready(function(){
            $("#listbox").kendoListBox({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    }
                },
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                toolbar: {
                    tools: [ "moveUp", "moveDown", "remove" ]
                }
            });
        });
    </script>
```

## See Also

* [Basic Usage of the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/index)
* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)
