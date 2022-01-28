---
title: Grouping
page_title: jQuery MultiColumnComboBox Documentation | Grouping
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and configure its grouping functionality."
slug: grouping_kendoui_multicolumncombobox_widget
position: 5
---

# Grouping

Grouping enables you to display data items that are categorized by a specific model field.

The MultiColumnComboBox supports grouping by utilizing the [`group` configuration of the Kendo UI DataSource](/api/javascript/data/datasource/configuration/group).

## Getting Started

To display grouped items in the MultiColumnComboBox, group the data source component by using its [`group` configuration](/api/javascript/data/datasource/configuration/group). Once you define the `group` option, the widget automatically displays the suggestion items grouped.

> The grouped data will be sorted either in ascending or descending order. This behavior is expected and cannot be modified. To group the data in a specific order, use [server grouping](/api/javascript/data/datasource/configuration/servergrouping).

To enable the grouping functionality in a MultiColumnComboBox, use the remote transport and a grouped data source.

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

## Customizing the Inline Group Title

The MultiColumnComboBox exposes the [`groupTemplate`](/api/javascript/ui/multicolumncombobox/configuration/grouptemplate) and [`fixedGroupedTemplate`](/api/javascript/ui/multicolumncombobox/configuration/fixedgrouptemplate) templates. They enable you to configure the rendering of the group titles.

To customize the inline group title which is displayed next to the suggestion item in the popup element, use the [`groupTemplate`](/api/javascript/ui/multicolumncombobox/configuration/grouptemplate) option. The inline group title is rendered as an absolutely positioned, right-aligned group element and is displayed in every first element of each new group. The parameter that is passed to the template is the group title value.

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoMultiColumnComboBox({
            height: 200,
            groupTemplate: "<strong>#:data#</strong>", // `data` is the title of the group.
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

* [Grouping in the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/grouping)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
