---
title: Display DateTime Value as ComboBox Group Header
description: How to format properly the date in the group header, when it has been used for grouping the items in a Kendo UI ComboBox
type: how-to
page_title: Configure the Proper Date Format for the Group Label
slug: combobox-display-date-as-group-header
position: 0
tags: kendo, kendoui, combobox, grouping, group-heder, date
ticketid: 1138203
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox</td>
 </tr>
</table>


## Description

I'm using a Kendo ComboBox and adding a grouping for its items. The value (the field) for the grouping is of type DateTime. I need to use the DateTime value in order to get the correct sorting. However, the date that is printed as a string to label each group is not in the correct format. I want the date to be in a standard format, but the date is formatted like /DATE/14987988000000. 

## Solution  
  
In order to display properly the Group headers, you will need to configure a *[groupTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox#configuration-groupTemplate)* and a *[fixedGroupTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox#configuration-fixedGroupTemplate)*:  

````html
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
````

## See Also

* [Kendo UI ComboBox JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [Kendo object JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo)
* [Kendo UI Date formatting documentation](https://docs.telerik.com/kendo-ui/framework/globalization/dateformatting)
