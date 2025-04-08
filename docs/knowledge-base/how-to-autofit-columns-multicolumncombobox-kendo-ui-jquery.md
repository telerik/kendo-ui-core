---
title: AutoWidth for Kendo UI for jQuery MultiColumnComboBox with Multiple Columns
description: Learn how to ensure a set column width dynamically in the Kendo UI for jQuery MultiColumnComboBox when not all columns fit on the screen.
type: how-to
page_title: How to Autofit Columns in MultiColumnComboBox 
slug: how-to-autofit-columns-multicolumncombobox-kendo-ui-jquery
tags: kendo-ui-for-jquery, multicolumncombobox, scrollbar, columns, configuration
res_type: kb
ticketid: 1683335
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery MultiColumnComboBox</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

When binding multiple columns to the MultiColumnComboBox, the columns may not fit properly on the screen, and a scrollbar does not appear. This knowledge base article also answers the following questions:
- How can I adjust the column widths dynamically based on the screen size in the MultiColumnComboBox?
- Is there a way to automatically adjust the dropdown width of the MultiColumnComboBox to ensure all columns are visible?
- How to handle column and dropdown widths in the MultiColumnComboBox for responsive designs?

## Solution

To handle scenarios where all columns in the MultiColumnComboBox do not fit properly on the screen, resulting in the need for a scrollbar, follow these steps:

1. Use the [`open`](/api/javascript/ui/multicolumncombobox/events/open) event of the Kendo UI for jQuery MultiColumnComboBox to dynamically adjust the column widths based on the screen size. 
2. Within the event handler, calculate the new width for the columns.
3. Use the [`setOptions`](/api/javascript/ui/widget/methods/setoptions) method to apply the new width to the columns.

Here is an example of how to dynamically set the column widths:

```javascript
open: function (e) {              
    var newWidth = window.innerWidth / 7 - 5;
    e.sender.setOptions({
        columns: [
            {
                field: "CompanyName",
                title: "Company Name3",
                width: newWidth,
            },
            {
                field: "CompanyName",
                title: "Company Name4",
                width: newWidth,
            },
        ],
    });
},
```

Below is a runnable example: 

```dojo
 <select id="multicolumncombobox"></select>

    <script>
      $(document).ready(function () {
        var multiComboBox = $("#multicolumncombobox")
          .kendoMultiColumnComboBox({
            dataTextField: "ContactName",
            dataValueField: "CustomerID",
            height: 400,
            width: 500,
            dropDownWidth: 400,
            left: 0,
            columns: [
              {
                field: "ContactName",
                title: "Contact Name",
                template:
                  "<span class='customer-photo'" +
                  "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></span>" +
                  "<span class='customer-name'>#: ContactName #</span>",
                width: 200,
              },
              { field: "ContactTitle", title: "Contact Title", width: 200 },
              { field: "CompanyName", title: "Company Name", width: 200 },
              { field: "CompanyName", title: "Company Name1", width: 200 },
              { field: "CompanyName", title: "Company Name2", width: 200 },
              { field: "CompanyName", title: "Company Name3", width: 200 },
              { field: "CompanyName", title: "Company Name4", width: 200 },
            ],
            footerTemplate:
              "Total #: instance.dataSource.total() # items found",
            filter: "contains",
            filterFields: [
              "ContactName",
              "ContactTitle",
              "CompanyName",
              "CompanyName",
              "CompanyName",
              "CompanyName",
              "CompanyName",
            ],
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers",
              },
            },
            open: function (e) {
              var newWidth = window.innerWidth / 7 - 5;
              e.sender.setOptions({
                columns: [
                  {
                    field: "ContactName",
                    title: "Contact Name",
                    template:
                      "<span class='customer-photo'" +
                      "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></span>" +
                      "<span class='customer-name'>#: ContactName #</span>",
                    width: newWidth,
                  },
                  {
                    field: "ContactTitle",
                    title: "Contact Title",
                    width: newWidth,
                  },
                  {
                    field: "CompanyName",
                    title: "Company Name",
                    width: newWidth,
                  },
                  {
                    field: "CompanyName",
                    title: "Company Name1",
                    width: newWidth,
                  },
                  {
                    field: "CompanyName",
                    title: "Company Name2",
                    width: newWidth,
                  },
                  {
                    field: "CompanyName",
                    title: "Company Name3",
                    width: newWidth,
                  },
                  {
                    field: "CompanyName",
                    title: "Company Name4",
                    width: newWidth,
                  },
                ],
              });
            },
          })
          .data("kendoMultiColumnComboBox");
      });
    </script>
```

For more detailed information on configuring the columns and dropdown width of the MultiColumnComboBox, refer to the official documentation:
- [Configuring columns in MultiColumnComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/columns.width)
- [Setting dropdown width](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/configuration/dropdownwidth)

## See Also

- [Kendo UI for jQuery MultiColumnComboBox Overview]https://docs.telerik.com/kendo-ui/controls/multicolumncombobox/overview)
- [MultiColumnComboBox Open Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox/events/open)
- [MultiColumnComboBox setOptions Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions)
