---
title: Server Filtering
page_title: jQuery DropDownList Documentation | Server Filtering
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to filter its data on the server."
slug: server_filtering_kendoui_ddl_widget
position: 4
---

# Server Filtering

The Kendo UI DropDownList provides options for filtering its data on the server and for displaying only a subset of data.

That reduced portion of the whole dataset is the data which is returned from the server. Server filtering is convenient when the user is not willing to see the whole dataset in the popup element.

> When you apply server filtering, only the source of the DropDownList is filtered. To page and filter the dataset, use the [virtualization]({% slug virtualization_kendoui_ddl_widget %}) feature.

## Getting Started

Server filtering is based on the filtering capability and configuration of the DataSource component.

To configure the server filtering feature in the DropDownList:

1. Configure the [`serverFiltering`](/api/javascript/data/datasource/configuration/serverfiltering) option of the DataSource component.
1. Define the [`filter`](/api/javascript/ui/dropdownlist/configuration/filter) property of the DropDownList.

For a runnable example, refer to the [demo on server filtering in the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/serverfiltering).

## Advantages

Displaying a subset of the whole data is useful to apply for large datasets which contain thousands of records. In such cases, define a minimum filter length by using the [`minLength`](/api/javascript/ui/dropdownlist/configuration/minlength) option. For example, if you set `minLength` to `3`, the DropDownList will not start filtering the dataset until the user enters at least three characters.

Server filtering also enables you to bind the DropDownList to just one data item&mdash;the selected one. In this way, you avoid the need to retrieve the whole dataset when you want to display the selected value or text which boosts the loading time of the widget. To apply this approach, send the selected value to the server and return only the matching data item. Use the [`data`](/api/javascript/data/datasource/configuration/transport.read.data) callback of the DataSource.

```javascript
data: function() {
  // The selectedValue is used on the server to filter the source and to return only the matching data item.
  return {
    selectedValue: $("#[widget id]").data("kendoDropDownList").value()
  }
}
```

## See Also

* [Server Filtering by the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/serverfiltering)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
