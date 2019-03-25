---
title: Server Filtering
page_title: Server Filtering | Kendo UI ComboBox
description: "Learn how to configure server filtering in Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect widgets."
slug: server_filtering_kendoui_combobox_widget
position: 4
---

# Server Filtering

The [Kendo UI AutoComplete](http://demos.telerik.com/kendo-ui/autocomplete/index), the [ComboBox](http://demos.telerik.com/kendo-ui/combobox/index), the [DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) and the [MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widgets support server filtering and you can apply the demonstrated approaches in this article to any of those widgets.

For more information, refer to:
* [Server Filtering in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/serverfiltering)
* [server Filtering in the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/serverfiltering)
* [Server Filtering in the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/serverfiltering)
* [Server Filtering in the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/serverfiltering)

You can use server filtering for displaying only a subset of data. Basically, the widget displays just the data returned from the server. You can use server filtering to display a subset of data, a reduced portion of the whole dataset. This functionality is convenient for you to apply when the end user cannot or does not want to see the whole dataset in the popup element.

## Configuration

Server-filtering is based on the filtering capability of the DataSource component. You also need to be familiar with the filtering configuration of the component. For more information, refer to the DataSource [`serverFiltering`](/api/javascript/data/datasource/configuration/serverfiltering) option. Once you configure the DataSource to perform server filtering, you only need to additionally define the [`filter`](/api/javascript/ui/combobox/configuration/filter) property of the widget.

For detailed information on how to configure the server filtering functionality, refer to the [ComboBox server filtering demo](http://demos.telerik.com/kendo-ui/combobox/serverfiltering).

## Advantages

You can use the server-filtering feature to display only a subset of data. This is quite useful when the dataset is large and contains thousands or more records. In such situations, define a minimum filter length by using the [`minLength`](/api/javascript/ui/combobox/configuration/minlength) option. For instance, if you set this option to `3`, the widget will not start filtering the dataset until at least 3 characters are entered.

Another benefit you gain from server filtering is the option to bind the widget to only one data item&mdash;the selected one. In this way, you avoid the need to retrieve the whole dataset when you want to display the selected value or text. This approach boosts the loading time of the widget. To apply this approach, send the selected value to the server and return only the matching data item. Use the  [`data`](/api/javascript/data/datasource/configuration/transport.read.data) callback of the DataSource.

###### Example

```javascript
    data: function() {
        //the selectedValue is used on the server to filter the source and return only the matching data item
        return {
            selectedValue: $("#[widget id]").data("kendoComboBox").value()
        }
    }
```

## Known Limitations

The server filtering feature (as its name indicates) filters only the source. To page and filter the data set, use the [Virtualization]({% slug virtualization_kendoui_combobox_widget %}) feature of the ComboBox.

## See Also

* [Server Filtering in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/serverfiltering)
* [server Filtering in the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/serverfiltering)
* [Server Filtering in the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/serverfiltering)
* [Server Filtering in the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/serverfiltering)
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
