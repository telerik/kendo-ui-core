---
title: Grouping
page_title: Grouping | Kendo UI ComboBox
description: "Learn how to configure grouping in the Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect widgets."
slug: grouping_kendoui_combobox_widget
position: 2
---

# Grouping

As of the Kendo UI Q1 2015 (2015.1.318) release, the [Kendo UI AutoComplete](http://demos.telerik.com/kendo-ui/autocomplete/index), the [ComboBox](http://demos.telerik.com/kendo-ui/combobox/index), the [DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index) and the [MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widgets support binding to a grouped [DataSource]({% slug overview_kendoui_datasourcecomponent %}) and you can apply the demonstrated approaches in this article to any of those widgets.

For more information, refer to:
* [Grouping in the ComboBox (demo)](https://demos.telerik.com/kendo-ui/combobox/grouping)
* [Grouping in the AutoComplete (demo)](https://demos.telerik.com/kendo-ui/autocomplete/grouping)
* [Grouping in the DropDownList (demo)](https://demos.telerik.com/kendo-ui/dropdownlist/grouping)
* [Grouping in the MultiSelect (demo)](https://demos.telerik.com/kendo-ui/multiselect/grouping)

The grouping functionality allows you to display data items categorized by a specific model field. For more information on the data source grouping functionality, refer to the [group configuration article](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group).

## Enabling

To enable the grouping functionality in a ComboBox, use the remote transport and a grouped data source.

###### Example

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

## Configuration

To display grouped items in the widget, group the data source component by using its [group configuration](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/group). Once you define the `group` option, the widget automatically displays the suggestion items grouped.

> **Important**
>
> The grouped data will be sorted either in ascending or descending order. This behavior is expected and cannot be modified. To group the data in a specific order, use [server grouping](/api/javascript/data/datasource/configuration/servergrouping).

## Customization

The widget exposes the [`groupTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/configuration/grouptemplate) and [`fixedGroupedTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/configuration/fixedgrouptemplate) templates. They enable you to configure the rendering of the group titles.

### Inline Group Title

To customize the inline group title displayed next to the suggestion item in the popup element, use the [`groupTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/configuration/grouptemplate) option. The inline group title is rendered as an absolutely positioned, right-aligned group element and is displayed in every first element of each new group. The parameter that is passed to the template is the group title value.

The following example demonstrates how to define a custom group template.

###### Example

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoComboBox({
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

### Fixed Group Header

To customize the group title displayed in the fixed group header positioned on top of the list, use the [`fixedGroupTemplate`](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/configuration/fixedgrouptemplate) option. It shows the group title of the current visible group. The value is updated dynamically on the scroll position of the grouped list. The parameter passed to the template is the group title value.

The following example demonstrates how to define a custom fixed group template.

###### Example

```dojo
<div class="demo-section k-header">
    <h4>Customers</h4>
    <input id="customers" style="width: 400px" />
</div>

<script>
    $(document).ready(function() {
        $("#customers").kendoComboBox({
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

* [Grouping in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/grouping)
* [Grouping in the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/grouping)
* [Grouping in the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/grouping)
* [Grouping in the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/grouping)
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
