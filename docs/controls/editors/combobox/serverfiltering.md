---
title: Server Filtering
page_title: Server Filtering | Kendo UI ComboBox
description: "Learn how to configure server filetring in Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect widgets."
slug: server_filtering_kendoui_combobox_widget
position: 4
---

# Server Filtering

[Kendo UI AutoComplete](http://demos.telerik.com/kendo-ui/autocomplete/index), [ComboBox](http://demos.telerik.com/kendo-ui/combobox/index), [DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) and [MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widgets support server filtering, which is useful for displaying only a data subset. Basically, the widget displays just the data returned from the server. Server filtering can be used to display a reduced portion of the whole dataset, which is convenient to apply when end users cannot or do not want to see the whole dataset in the popup element.

## Configuration

Server filtering is based on the filtering capability of the `DataSource` component. That being said, you need to be familiar with the filtering configuration of the component. For more information, see [DataSource `serverFiltering`](/api/javascript/data/datasource#configuration-serverFiltering) option.

Once you configure the DataSource so as to perform server filtering, the only widget option that needs to be defined additionally is the [`filter`](/api/javascript/ui/combobox#configuration-filter) one.

For a detailed reference how to configure the server filtering functionality, see the [ComboBox server filtering demo](http://demos.telerik.com/kendo-ui/combobox/serverfiltering).

## Advantages

As mentioned, the server filtering feature can be used to display only a subset of a dataset. This is quite useful when the dataset is large and contains thousands or more records. In such situations define a minimum filter length by using the [`minLength`](/api/javascript/ui/combobox#configuration-minLength) option. For instance, if you set this option to `3`, the widget will not start filtering the dataset until at least 3 characters are entered.

Another benefit that server filtering brings about is the option to bind the widget to only one data item: the selected one. In this way you avoid the need to retrieve the whole dataset when you want to display the selected value or text. This approach can boost the loading time of the widget. To apply this approach, send the selected value to the server and return only the matching data item. Use the datasource's [`data`](/kendo-ui/api/javascript/data/datasource#configuration-transport.read.data) callback:

```javascript
    data: function() {
        //the selectedValue is used on the server to filter the source and return only the matching data item
        return {
            selectedValue: $("#[widget id]").data("kendoComboBox").value()
        }
    }
```

## Known Limitations

- The server filtering feature (as its name says) only filters the source. If you would like to page (and filter) the data set, then you will need to use
the [Virtualization]({% slug virtualization_kendoui_combobox_widget %}) feature of the widget.

## See Also

Other articles on Kendo UI ComboBox:

* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
