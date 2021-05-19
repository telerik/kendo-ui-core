---
title: Grouping
page_title: jQuery MultiSelect Documentation | Grouping
description: "Get started with the jQuery MultiSelect by Kendo UI and learn how to configure its grouping functionality."
slug: grouping_kendoui_multiselect_widget
position: 3
---

# Grouping

As of the Kendo UI Q1 2015 (2015.1.318) release, the Kendo UI MultiSelect provides options for binding it to a grouped [Kendo UI DataSource component]({% slug overview_kendoui_datasourcecomponent %}).

The grouping functionality allows you to display data items that are categorized by a specific model field. For more information, refer to the article on the [`group`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group) configuration.

## Getting Started

To enable grouping, use the remote `transport` configuration and a grouped DataSource. To display grouped items in the widget, group the DataSource component by using its [`group`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group) configuration option. Once you define the `group` option, the MultiSelect will automatically display the grouped suggestion items.

> The grouped data will be sorted either in ascending or descending order which is expected behavior and cannot be modified. To group the data in a specific order, use [server grouping](/api/javascript/data/datasource/configuration/servergrouping).

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoMultiSelect({
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

To customize the inline group title which is displayed next to the suggestion item in the popup element, use the [`groupTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/grouptemplate) configuration. The inline group title is rendered as an absolutely positioned, right-aligned group element and is displayed in every first element of each new group. The parameter that is passed to the template is the group title value.

The following example demonstrates how to define a custom group template.

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoMultiSelect({
            height: 200,
            groupTemplate: "<strong>#:data#</strong>", //`data` is the title of the group
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
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

## Customizing the Fixed Group Header

To customize the group title which is displayed in the fixed group header positioned on top of the list, use the [`fixedGroupTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/fixedgrouptemplate) option. It displays the group title of the current visible group. The value is updated dynamically on the scroll position of the grouped list. The parameter that is passed to the template is the group title value.

The following example demonstrates how to define a custom fixed group template.

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoMultiSelect({
            height: 200,
            fixedGroupedTemplate: "<strong>#:data#</strong>", //`data` is the title of the group
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
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

* [Grouping by the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/grouping)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
