---
title: Virtualization
page_title: Kendo UI ComboBox Virtualization
description: This document provides information how to configure virtualization in Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect
position: 4
---

# Virtualization

Kendo UI AutoComplete, ComboBox, DropDownList and MultiSelect support UI and data virtualization which is useful when displaying large data sets.
The UI virtualization technique uses fixed amount of list items in the widget's popup list regardless of the data set size.
When the list is scrolled, the widget will reuse the existing items to display the relevant data, instead of creating new ones.

The widget virtualization feature uses the DataSource paging and remote data retrieval, which means that the DataSource should have its paging configured correctly.
The example below demonstrates the minimal widget and DataSource configuration requirements for the virtualization to work as expected.

##Kendo UI ComboBox with remote transport and virtualization enabled

```html
    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoComboBox({
                template: '#= OrderID # | #= ShipName #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
                height: 520,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>
```

## How to configure

### itemHeight

All items in the virtualized list **must** have the same height. If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.

> If you don't specify an `itemHeight` configuration option, the widget will perform an **extra DataSource request**. In most cases, this is not a critical issue.

### Container height

The virtualized list container **must** have a `height` option set (in pixels). If the developer does not specify one, the list will use the default `height` (`200px`).

### pageSize

The DataSource `pageSize` configuration should be set to the virtual list `height/itemHeight * 4`.
For example, if the `height` is `520` and `itemHeight` is `26`, `pageSize` should be set to `80`.

> Setting the correct page size is important for the functionality of the widget and will prevent the DataSource from **making multiple requests** for the same data.

> The widget controls the page size for all DataSource requests and will change the DataSource `pageSize` if it does not match the formula above.

### valueMapper

The `valueMapper` function is **mandatory** for the functionality of the virtualized widget. The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

```javascript
    valueMapper: function(options) {
        $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
            type: "GET",
            data: convertValues(options.value), //send value to the server
            success: function (data) {
                options.success(data); //return the index number of the correspoding data item
            }
        })
    }
```
