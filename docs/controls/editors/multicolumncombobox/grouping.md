---
title: Grouping
page_title: Grouping | Kendo UI MultiColumnComboBox
description: "Learn how to configure grouping in the Kendo UI ComboBox, DropDownList, AutoComplete, MultiColumnComboBox and MultiSelect widgets."
slug: grouping_kendoui_multicolumncombobox_widget
position: 2
---

# Grouping

The Grouping functionality allows you to display data items that are categorized by a specific model field.

For more information on the grouping functionality of the data source, refer to the [group configuration article](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group).

## Enabling

To enable the grouping functionality in a MultiColumnComboBox, use the remote transport and a grouped data source.

###### Example

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoMultiColumnComboBox({
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            height: 200,
            columns: [
                { field: "ContactName", title: "Contact Name" },
                { field: "CustomerID", title: "Customer ID" }
            ],
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                group: { field: "Country" } //group the data by 'Country' field
            }
        });
    });
</script>
```

## Configuration

To display grouped items in the MultiColumnComboBox, group the data source component by using its [group configuration](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group). Once you define the `group` option, the widget automatically displays the suggestion items grouped.

> **Important**
>
> The grouped data will be sorted either in ascending or descending order. This behavior is expected and cannot be modified. To group the data in a specific order, use [server grouping](/api/javascript/data/datasource/configuration/servergrouping).

## Customization

The widget exposes the [`groupTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/grouptemplate) and [`fixedGroupedTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/fixedgrouptemplate) templates. They enable you to configure the rendering of the group titles.

### Inline Group Title

To customize the inline group title displayed next to the suggestion item in the popup element, use the [`groupTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/grouptemplate) option. The inline group title is rendered as an absolutely positioned, right-aligned group element and is displayed in every first element of each new group. The parameter that is passed to the template is the group title value.

The following example demonstrates how to define a custom group template.

###### Example

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoMultiColumnComboBox({
            height: 200,
            groupTemplate: "<strong>#:data#</strong>", //`data` is the title of the group
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            columns: [
                { field: "ContactName", title: "Contact Name" },
                { field: "CustomerID", title: "Customer ID" }
            ],
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                group: { field: "Country" } //group the data by 'Country' field
            }
        });
    });
</script>
```

## See Also

* [Overview]({% slug overview_kendoui_multicolumncombobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_multicolumncombobox_widget %})
* [Cascading MultiColumnComboBoxes]({% slug cascading_kendoui_multicolumncombobox_widget %})
* [MultiColumnComboBox JavaScript API Reference](/api/javascript/ui/multicolumncombobox)
