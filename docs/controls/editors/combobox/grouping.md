---
title: Grouping
page_title: jQuery ComboBox Documentation | Grouping
description: "Get started with the jQuery ComboBox by Kendo UI and group its data."
slug: grouping_kendoui_combobox_widget
position: 3
---

# Grouping

As of the Kendo UI Q1 2015 (2015.1.318) release, the [Kendo UI AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/index), the [ComboBox](https://demos.telerik.com/kendo-ui/combobox/index), the [DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index), and the [MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index) support binding to a grouped [DataSource]({% slug overview_kendoui_datasourcecomponent %}).

Grouping enables you to display data items that are categorized by a specific model field. The ComboBox supports grouping by utilizing the [`group` configuration of the Kendo UI DataSource](/api/javascript/data/datasource/configuration/group).

The approaches for configuring the grouping functionality of the ComboBox that are demonstrated in this article are identical for configuring the grouping functionality of the AutoComplete, DropDownList, and MultiSelect widgets.

For runnable examples on grouping, refer to the following demos:
* [Grouping in the ComboBox (demo)](https://demos.telerik.com/kendo-ui/combobox/grouping)
* [Grouping in the AutoComplete (demo)](https://demos.telerik.com/kendo-ui/autocomplete/grouping)
* [Grouping in the DropDownList (demo)](https://demos.telerik.com/kendo-ui/dropdownlist/grouping)
* [Grouping in the MultiSelect (demo)](https://demos.telerik.com/kendo-ui/multiselect/grouping)

## Getting Started

To display grouped items in the ComboBox, group the DataSource component by using its [`group` configuration](/api/javascript/data/datasource/configuration/group). As a result, the ComboBox automatically displays its grouped items.

To enable the grouping functionality in the ComboBox, use the remote `transport` and a grouped data source.

> By default, the grouped data of the ComboBox will be sorted either in ascending or descending order. To group the data in a specific order, use the [server grouping configuration](/api/javascript/data/datasource/configuration/servergrouping).

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoComboBox({
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            height: 200,
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

## Customizing the Inline Group Title

To customize the inline group title which is displayed next to the suggestion item in the popup element, use the [`groupTemplate`](/api/javascript/ui/combobox/configuration/grouptemplate) option. The inline group title is rendered as an absolutely positioned, right-aligned group element and is displayed in every first element of each new group. The parameter that is passed to the template is the group title value.

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoComboBox({
            height: 200,
            groupTemplate: "<strong>#:data#</strong>", // data is the title of the group.
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                group: { field: "Country" } // Group the data by 'Country' field.
            }
        });
    });
</script>
```

## Customizing the Fixed Group Header

To customize the group title which is displayed in the fixed group header positioned on top of the list, use the [`fixedGroupTemplate`](/api/javascript/ui/combobox/configuration/fixedgrouptemplate) option. It renders the group title of the current visible group. The value is updated dynamically on the scroll position of the grouped list. The parameter that is passed to the template is the group title value.

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoComboBox({
            height: 200,
            fixedGroupedTemplate: "<strong>#:data#</strong>", // data is the title of the group.
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                group: { field: "Country" } // Group the data by 'Country' field.
            }
        });
    });
</script>
```

## See Also

* [Grouping in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/grouping)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
