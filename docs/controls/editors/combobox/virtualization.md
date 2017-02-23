---
title: Virtualization
page_title: Virtualization | Kendo UI ComboBox
description: "Learn how to configure virtualization in Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect widgets."
slug: virtualization_kendoui_combobox_widget
position: 3
---

# Virtualization

The [Kendo UI AutoComplete](http://demos.telerik.com/kendo-ui/autocomplete/index), the [ComboBox](http://demos.telerik.com/kendo-ui/combobox/index), the [DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) and the [MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widgets support UI and data virtualization, which is useful for displaying large data sets.

The UI virtualization technique uses a fixed amount of list items in the pop-up list of the widget regardless of the data set size. When the list is scrolled, the widget reuses the existing items to display the relevant data instead of creating new ones.

## Data and UI Virtualization

To be able to retrieve and display only a subset of the whole data set, the virtualization feature combines data and User Interface (UI) virtualization.

### Data

In the context of the widget, data virtualization is accomplished by using the `DataSource` paging functionality and remote data retrieval. In this way, the widget retrieves only a specified data page instead of requesting the whole data set at once. You must configure the `DataSource` paging correctly to ensure the proper functioning of the widgets. For more information, see the [server paging](/api/javascript/data/datasource#configuration-serverPaging) configuration.

### UI

The widget uses a specific strategy of reusing a list of DOM elements for displaying the corresponding data chunk. The number of these elements is determined based on the [`height`](/api/javascript/ui/combobox#configuration-height) and [`itemHeight`](#itemheight) options. Once the number is calculated, the widget creates those elements and starts reusing them to display the current data source page.

### Data and UI Combined

To ensure the correct work of the widget, the DataSource `pageSize` value is calculated automatically based on the (([`height`](/api/javascript/ui/combobox#configuration-height) / [`itemHeight`](#itemheight)) * 4) formula. The calculation is done by the widget itself and the defined `pageSize` value is overridden if it does not match the calculated one.

> **Important**  
>
> To avoid multiple initial requests, define a correct `pageSize` value.

## Configuration

### Enable Virtualization

To enable the virtualization in a ComboBox, follow the example below. It demonstrates the minimum widget and DataSource configuration requirements for the virtualization to work as expected.

###### Example

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
                            dataType: "jsonp",
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

        //This is a helper method that serializes values into a understandable format for the server.
        //This method is not obligatory to use. Instead, you need to send the value in a format that is understandable for the server.
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

### Set Item Height

All items in the virtualized list must have the same height. If you do not specify a height value, the framework automatically sets the `itemHeight` in the way they are set in the current theme and font size.

> **Important**  
>
> If you do not specify an `itemHeight` option, the widget performs an extra DataSource request. This, however, rarely causes any critical issues.

### Set Container Height

The virtualized list container must have a `height` option set in pixels. If you do not specify one, the list uses the default `height`, which is `200px`.

### Set Page Size

The virtualized widget calculates the `pageSize` value automatically based on the (([`height`](/api/javascript/ui/combobox#configuration-height) / [`itemHeight`](#itemheight)) * 4) formula and overrides the custom `pageSize` value. This is done to ensure the proper work of the virtualized list.

Consider the following scenario about a widget:
- The `height` is `520px`
- The `itemHeight` is `26`
In this case, the `pageSize` will be set to `80`, because ((520 / 26) * 4) is equal to `80`.

> **Important**  
>
> To prevent the DataSource from making multiple requests for the same data, set the correct `pageSize` value using the aforementioned formula.

## Value Mapping

> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.

Unlike simple Data and UI virtualization, the `valueMapper` was introduced because the ComboBox needs to maintain the selected item and to display the selected data item based on the value alone. To display the selected text, the widget needs to retrieve the selected data item which is part of a particular data page that is unknown to you. The required information is gathered with the `valueMapper` callback. It passes the selected value and requests the corresponding row `index` or `dataItem` of that value depending on the `mapValueTo` configuration option.

### Mapping index Values

The widget calls the `valueMapper` function when it receives a value which is not fetched from the remote server yet. The widget then passes the selected values in the `valueMapper` function. If the `mapValueTo` is not explicitly set to `dataItem`, the `valueMapper` implementation is expected to return the respective data item index. From this index the widget calculates the page number and in this way pre-fetches only that particular page by sending an additional Ajax request. If the value does not exist, the `valueMapper` is expected to return `null`, `[]`, or `-1` and the widget deselects the currently selected items.

###### Example

```javascript
    valueMapper: function(options) {
        $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
            type: "GET",
            data: options.value, //send value to the server
            success: function (data) {
                options.success(data); //return the index number of the corresponding data item
            }
        })
    }
```

### Mapping dataItem Values

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values&mdash;`"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

If you implement the `mapValueTo: "dataItem"` configuration, the `valueMapper` is expected to return the `dataItems` that corresponds to the selected values. The widget will use the returned `dataItems` to render the selected values but will not scroll the list to the selected values. When the user opens the list, the widget will display the options from the first data page instead, no matter whether the selected value is a part of the first page or not. This is the main limitation of the `mapValueTo: dataItem` configuration.

###### Example

```javascript
    mapValueTo: "dataItem",
    valueMapper: function(options) {
        $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
            type: "GET",
            data: options.value, //send value to the server
            success: function (dataItems) {
                options.success(dataItems); //return the dataItems that correspond to provided values
            }
        })
    }
```

### Sample Cases

#### Map Values to index

The `mapValueTo: "index"` configuration is set by default. The `valueMapper` is called when you want to select a data item that is not present in the data source.

The exemplary case below demonstrates the process.

The widget is configured as follows:
- The `pageSize` is set to `50`.
- The selected value is `foo`.

On initial load, the widget checks whether the selected value is present in the loaded data. If it is not, it performs the following actions:

1. It calls the `valueMapper`, requesting a row index that corresponds to the selected value `foo`.
2. The `valueMapper` calls the `service 1`, passing the selected value `foo` to it.
3. The `service 1` finds the row index that corresponds to the `foo` value. In this case it is `1250`.
4. The `valueMapper` function returns this row index to the widget.
5. The widget calculates the page number. In this case it is `25`.
6. The widget requests it from the `service 2` using the `dataSource`.
7. The `service 2` returns the corresponding 25th page.
8. The `dataSource` changes the page to `25` and displays the items showing the selected item too.

![Virtualization process](/controls/editors/combobox/mapValueTo-index.png)

**Function result**

The `valueMapper` is expected to return a row index or a list of indices when a multiple selection is available. That being said, the service is expected to return either an index (number) or a list of indices. If the value does not exist, the `valueMapper` returns `null`, `[]`, or `-1`, and the widget deselects the currently selected items.

For an example, look into the result of [the test service](https://demos.telerik.com/kendo-ui/combobox/virtualization) used in the online demos.

###### Example

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

The Ajax method calls URLs like so:

    http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper?values[0]=10661

The result is:

    callback([413]) //the result is JSONP

**Function implementation**

As mentioned in the previous section, the service maps the selected value to a particular row index. The implementation of this functionality is completely under your control. However, the most simplified implementation includes the iteration of all items counting the index of the rows. A more optimized solution still is to use a dedicated SQL method that handles this action internally. You can do this by using the [`ROW_NUMBER()`](https://msdn.microsoft.com/en-us/library/ms186734.aspx) function.

#### Map Values to dataItem

The `mapValueTo: "dataItem"` configuration is available as of the Kendo UI R3 2016. The `valueMapper` is called when you want to select a data item that is not present in the data source.

The exemplary case below demonstrates the process.

The widget is configured as follows:
- The `pageSize` is set to `50`.
- The selected value is `foo`.

On initial load, the widget checks whether the selected value is present in the loaded data. If it is not, it performs the following actions:

1. It calls the `valueMapper`, requesting a dataItem that corresponds to the selected value `foo`.
2. The `valueMapper` calls the `service 1`, passing the selected value `foo` to it.
3. The `service 1` finds the dataItem that corresponds to the `foo` value. In this case it is `{text: "bar", value: "foo"}`.
4. The `valueMapper` function returns this dataItem to the widget.
5. The widget renders the selected item template.
6. The widget requests the first page from `service 2` using the `dataSource`.
7. The `service 2` returns the first data page.
8. The widget list displays the items from the first page no matter if the selected items are part of it or not.

![Virtualization process](/controls/editors/combobox/mapValueTo-dataItem.png)

**Function result**

The `valueMapper` is expected to return a data item or a list of data items when a multiple selection is available. That being said, the service is expected to return either an data item (object) or a list of data items. If the values does not exist, the `valueMapper` returns `null` or `[]`, and the widget deselects the currently selected values.

## Known Limitations

- The virtualization feature can work with objects, while virtualization of primitive values is not supported.
- The rendered items should have equal heights. Every single item in the virtualized list displays a height that is set through the [`itemHeight`](#itemheight) option.
- The virtualization feature performs a complex data pre-fetching and assumes that the DataSource state will not change without the knowledge of the widget. Any manual data operations, such as `read`, `page`, `filter`, `add`, `remove`, etc., might lead to unexpected behavior for the widget and are not supported.

## See Also

Other articles on the Kendo UI ComboBox:

* [Virtual Setup](/api/javascript/ui/combobox#configuration-virtual)
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [JavaScript API Reference](/api/javascript/ui/combobox)

Articles on the Kendo UI DataSource:

* [DataSource Overview](/framework/datasource/overview)
* [JavaScript DataSource API Reference](/api/javascript/data/datasource)
