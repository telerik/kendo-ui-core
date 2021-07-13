---
title: Server Filtering
page_title: jQuery ComboBox Documentation | Server Filtering
description: "Get started with the jQuery ComboBox by Kendo UI and configure its server-side filtering."
slug: server_filtering_kendoui_combobox_widget
position: 4
---

# Server Filtering

The [Kendo UI AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/index), the [ComboBox](https://demos.telerik.com/kendo-ui/combobox/index), the [DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index), and the [MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index) support server-side filtering.

Server filtering enables you to display a subset of data - a reduced portion of the whole dataset which is returned from the server. The ComboBox supports server filtering by utilizing the [`serverFiltering`](/api/javascript/data/datasource/configuration/serverfiltering) option of the Kendo UI DataSource component.

The approaches for configuring the server filtering functionality of the ComboBox that are demonstrated in this article are identical for configuring the server filtering functionality of the AutoComplete, DropDownList, and MultiSelect widgets.

For runnable examples on server filtering, refer to the following demos:
* [Server Filtering in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/serverfiltering)
* [Server Filtering in the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/serverfiltering)
* [Server Filtering in the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/serverfiltering)
* [Server Filtering in the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/serverfiltering)

## Getting Started

To configure server filtering for the ComboBox, set the [`serverFiltering`](/api/javascript/data/datasource/configuration/serverfiltering) option of the DataSource and define the [`filter`](/api/javascript/ui/combobox/configuration/filter) property of the widget. For a runnable example, refer to the [demo on server filtering the ComboBox](https://demos.telerik.com/kendo-ui/combobox/serverfiltering).

To display a subset of data, define a minimum filter length by using the [`minLength`](/api/javascript/ui/combobox/configuration/minlength) option of the ComboBox. For example, if you set `minLength` to `3`, the ComboBox will not start filtering the dataset until the user enters at least three characters.

When you use server filtering, you can bind the ComboBox only to the selected data item. In this way, you do not need to retrieve the whole dataset when you want to display the selected value or text. This approach boosts the loading time of the widget.

To bind the ComboBox to the selected data item only:

1. Send the selected value to the server.
1. Return only the matching data item.
1. Use the  [`data`](/api/javascript/data/datasource/configuration/transport.read.data) callback of the DataSource.

```javascript
    data: function() {
        //the selectedValue is used on the server to filter the source and return only the matching data item
        return {
            selectedValue: $("#[widget id]").data("kendoComboBox").value()
        }
    }
```

## Known Limitations

The server filtering functionality filters only the source. To page and filter the dataset, use [virtualization]({% slug virtualization_kendoui_combobox_widget %}).

## See Also

* [Server Filtering in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/serverfiltering)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
