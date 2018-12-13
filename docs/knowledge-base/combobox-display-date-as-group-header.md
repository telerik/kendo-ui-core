---
title: Display DateTime Value as ComboBox Group Header
description: An example on how to format properly the date in the group header when it was used for grouping the items in a Kendo UI ComboBox.
type: how-to
page_title: Configure the Proper Date Format for the Group Label | kendo UI ComboBox
slug: combobox-display-date-as-group-header
tags: kendo, kendoui, combobox, grouping, group-heder, date
ticketid: 1138203
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
 </tr>
</table>


## Description

I am adding a grouping for the items of the ComboBox. The value (the field) for the grouping is of type `DateTime`. I need to use the `DateTime` value to get the correct sorting, but the date which is printed as a string to label each group is not in the correct format.

How van I render the date in a standard format and not like `/DATE/14987988000000`.

## Solution

To properly display properly the group headers, configure a [`groupTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/configuration/grouptemplate) and a [`fixedGroupTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/configuration/fixedgrouptemplate).

```dojo
<input id="customers" style="width: 400px" />

<script>
  $(document).ready(function() {
    $("#customers").kendoComboBox({
      dataTextField: "ShipName",
      dataValueField: "OrderID",
      groupTemplate: "Group: #= kendo.toString(kendo.parseDate(data), 'd') #",
      fixedGroupTemplate: "Group: #= kendo.toString(kendo.parseDate(data), 'd') #",
      dataSource: {
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        group: {
          field: "OrderDate"
        }
      }
    });
  });
</script>
```

## See Also

* [API Reference of the ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [`object`](https://docs.telerik.com/kendo-ui/api/javascript/kendo)
* [Kendo UI Documentation on Date Formatting](https://docs.telerik.com/kendo-ui/framework/globalization/dateformatting)
