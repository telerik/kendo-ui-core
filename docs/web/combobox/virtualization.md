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

The virtualization feature combines **Data** and **UI** virtualization in order to retrieve and display only a subset of the whole data set.

- [What is Data virtualization](#what-is-data-virtualization)
- [What is UI virtualization](#what-is-ui-virtualization)
- [How Data and UI virtualization is combined](#how-the-data-and-ui-virtualization-is-combined)
- [How to configure](#how-to-configure)
    - [Item height](#itemheight)
    - [Container height](#container-height)
    - [Page size](#pagesize)
    - [Value mapper](#valuemapper)
- [In depth review of the valueMapper option](#in-depth-review-of-the-valuemapper-option)
    - [What should return the valueMapper service](#what-should-return-the-valuemapper-service)
    - [How to implement a valueMapper service](#how-to-implement-a-valuemapper-service)
- [Kendo UI ComboBox with enabled virtualization](#kendo-ui-combobox-with-remote-transport-and-virtualization-enabled)
- [Known limitation](#known-limitation)
- [Further Reading](#further-reading)

## What is Data virtualization

In the context of the widget, the **Data** virtualization is accomplished using the DataSource paging functionality and remote data retrieval.
Thus the widget will retrieve only a concrete data page instead of requesting the whole data set at once. The DataSource paging should be configured **correctly**
in order to ensure the proper widget's work. Please refer to the [server paging](/kendo-ui/api/javascript/data/datasource#configuration-serverPaging) configuration for more details.

## What is UI virtualization

The widget uses a specific strategy of reusing a list of DOM elements in order to display the corresponding data chuck. The number of those elements is determined based on the [height](/kendo-ui/api/javascript/ui/combobox#configuration-height)
and [itemHeight](#itemheight) options. Once the number is calculated, the widget creates those elements and starts re-using them to display the current *data source page*.

## How the Data and UI virtualization is combined

To ensure the correct work of the widget, the DataSource pageSize value is calculated **automatically**, based on the (([height](/kendo-ui/api/javascript/ui/combobox#configuration-height)
/ [itemHeight](#itemheight)) * 4) formula. This is done by the widget itself, and the defined pageSize value will be overriden if it does not match the calculated one.

> To avoid multiple initial requests, define a correct **pageSize** value.

## How to configure the virtualization feature

The following list describes how to configure the virtualization specific options:

### itemHeight

All items in the virtualized list **must** have the same height. If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.

> If you don't specify an `itemHeight` configuration option, the widget will perform an **extra DataSource request**. In most cases, this is not a critical issue.

### Container height

The virtualized list container **must** have a `height` option set (in pixels). If the developer does not specify one, the list will use the default `height` (`200px`).

### pageSize

The virtualized widget will *calculate* the **pageSize** value automatically based on the (([height](/kendo-ui/api/javascript/ui/combobox#configuration-height) / [itemHeight](#itemheight)) * 4) formula
and will *override* the custom defined pageSize value. This is done to ensure the proper work of the virtualized list.

Let's consider the following scenario:
- widget has height of `520px`
- itemHeight is `26`
- The **pageSize** will be set to `80`, because ((520 / 26) * 4) is equal to `80`

> To prevent the DataSource from **making multiple requests** for the same data, set the correct **pageSize** value using the aforementioned formula.

### valueMapper

The `valueMapper` function is **mandatory** for the functionality of the virtualized widget. The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

```javascript
    valueMapper: function(options) {
        $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
            type: "GET",
            data: options.value, //send value to the server
            success: function (data) {
                options.success(data); //return the index number of the correspoding data item
            }
        })
    }
```

## In depth review of the valueMapper option

The valueMapper was introduced, because unlike simple Data + UI virtualization, ComboBox needs to **maintain the selected item** and also to display the selected data item based only on value.
In order to display the selected text widget needs to retrieve the selected data item, which is part of a particular data page that is *unknown* to us. The required information is gathered exactly with the [valueMapper](#valuemapper) callback,
that passes the **selected value** and requests the corresponding *row/dataitem index* of that value. From this index, we can calculate the page number and thus pre-fetch only that page with additional Ajax request.

The **valueMapper** will be called when we need to select a dataitem that is not present in the data source. To make that process clearer, let's imagine the following case:

Widget's configuration is as follows:
- the **pageSize** is set to `50`
- the selected value is `foo`

On initial load, the widget will check whether the selected value is present in the loaded data. If it isn't, then it will perform the following actions:

1. It will call the **valueMapper** requesting a **row index** that corresponds to the selected value `foo`
2. The **valuMapper** will call the `service 1`, passing the selected value `foo` to it
3. The `service 1` will find the row index that corresponds to the `foo` value. In this case it is `1250`
4. The valueMapper function will return that row index to the widget
5. The widget will calculate the page number, `25` in this case.
6. Then it will request it from the `service 2` using the dataSource
7. The `service 2` will return the corresponding 25th page
8. The dataSource will change the page to `25` and will display the items showing the selected item too.

![Virtualization process](/web/combobox/virtualization.png)

### What should return the valueMapper service?

The valueMapper callback expects to receive a row index or list of indices (when multiple selection is available). That being said, the service should return either index (number) or list of indices.
For instance, you can examine the result of [the test service](/kendo-ui/service/Orders/ValueMapper) used in the online demos:

```javascript
$.ajax({
    url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
    type: "GET",
    dataType: "jsonp",
    data: { "values[0]": "10661" }
    success: function (data) {
        //returned data is [413]
        options.success(data);
    }
})
```

Basically the Ajax method calls URL like so:

    http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper?values[0]=10661

and the result is:

    callback([413]) //the result is JSONP

### How to implement a valueMapper service?

As mentioned in the previous section, the service should map the selected value to a concrete row index. How this functionality will be implemented is in the developer's control. The most simplified implementation will include
iteration of all items counting the index of the rows.

The more optimized solution will be to use a dedicated SQL method that handles this action internally. One option is to use [ROW_NUMBER()](https://msdn.microsoft.com/en-us/library/ms186734.aspx) function.

## Kendo UI ComboBox with remote transport and virtualization enabled

The example below demonstrates the minimal widget and DataSource configuration requirements for the virtualization to work as expected.

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

        //This is a helper method that serialize the value/s into understandable for server format.
        //This method is not obligatory to use. Instead you will need to send the value in understandable for the server format
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

## Known limitation

- The virtualization feature can work with **objects**. Virtualization of **primitive values** is not supported.
- The rendered items should have equal height. In other words, every single item in the virtualized list will have height set through [itemHeight](#itemheight) option.

## Further Reading

* [Kendo UI DataSource Overview](/framework/datasource/overview)
* [Kendo UI DataSource API](/api/javascript/data/datasource)
* [Kendo UI ComboBox virtual setup](/api/javascript/ui/combobox#configuration-virtual)
