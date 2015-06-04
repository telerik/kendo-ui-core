---
title: Server Filtering
page_title: Kendo UI ComboBox Server Filtering
description: This document provides information how to configure server filtering in Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect
position: 5
---

# Server Filtering

Kendo UI AutoComplete, ComboBox, DropDownList and MultiSelect widget support *server filtering*, which is useful to display
only a data subset. Basically, the widget will display only the data returned from the server.

The server filtering can be used to display a reduced portion of the whole dataset. This is useful when the end user cannot or does not
want to see the whole dataset in the popup element.

## How to configure server filtering

This functionality is based on the filtering capability of the DataSource component. That being said, you will need to be
familiar with the filtering configuration of the component:
- [DataSource serverFiltering option](/kendo-ui/api/javascript/data/datasource#configuration-serverFiltering)

Once the DataSource is configured to perform server filtering, the only option that needs to be defined of the widget is the
[filter](/kendo-ui/api/javascript/ui/combobox#configuration-filter) option.

This online demo shows how to configure the server filtering:
- [ComboBox Server Filtering demo](http://demos.telerik.com/kendo-ui/combobox/serverfiltering)

## Benefits of server filtering

As mentioned, the server filtering feature can be used to display only a subset of a dataset. This is quite useful when the
dataset is large and contains thousands or more records. In such situation the developer can define a minimum filter length
using [minLength](/kendo-ui/api/javascript/ui/combobox#configuration-minLength) option. For instance, this option can be set to `3`,
which means that the widget will not start filtering the dataset until at least 3 characters are entered.

The other plus of this functionality is the ability to bind the widget to only one data item - the selected one. Thus you avoid the need to retrieve the whole
dataset in order to display the selected value/text. This approach can boost the loading time of the widget.
To take an advantage of this approach, you need to send the selected value to the server and return only the matching data item. For that task, you can use
the datasource's [data](/kendo-ui/api/javascript/data/datasource#configuration-transport.read.data) callback:

```javascript
    data: function() {
        //the selectedValue is used on the server to filter the source and return only the matching data item
        return {
            selectedValue: $("#[widget id]").data("kendoComboBox").value()
        }
    }
```

## Known limitations

- The server filtering feature (as its name says) only filters the source. If you would like to page (and filter) the data set, then you will need to use
the [Virtualization](/kendo-ui/web/combobox/virtualization) feature of the widget.
