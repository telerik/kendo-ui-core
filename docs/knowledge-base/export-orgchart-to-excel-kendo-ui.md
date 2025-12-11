---
title: Exporting to Excel for Kendo UI OrgChart
description: Learn how to export data from the Kendo UI OrgChart to an Excel format using a custom implementation.
type: how-to
page_title: How to Export Kendo UI OrgChart to Excel
slug: export-orgchart-to-excel-kendo-ui
tags: kendo-ui, orgchart, excel-export, custom-solution, data-transformation
res_type: kb
components: ["chart"]
ticketid: 1687278
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® for jQuery OrgChart</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I want to export the hierarchical data from the Kendo UI OrgChart to an Excel file. The OrgChart component does not provide built-in support for exporting to Excel format. However, a custom implementation can be created to transform the hierarchical structure into a tabular format suitable for Excel export.

This knowledge base article also answers the following questions:
- How to export Kendo UI OrgChart data to Excel.
- Is it possible to save OrgChart data as an Excel file?
- How to use Excel Export utilities with OrgChart data?

## Solution

The Kendo UI OrgChart does not include built-in functionality for exporting data to Excel. However, you can implement a custom solution by transforming the hierarchical OrgChart data into a flat structure and using Kendo UI's Excel Export utilities.

### Steps to Implement

1. **Access Org Chart Data and Flatten It**  
   Use a custom function to transform the hierarchical data of the OrgChart into a flat structure.

```javascript
function flattenOrgChartData(data, result = [], level = 0, parent = null) {
    data.forEach((item) => {
        result.push({
            Name: item.name,
            Title: item.title,
            Level: level,
            Manager: parent,
        });

        if (item.items && item.items.length > 0) {
            flattenOrgChartData(item.items, result, level + 1, item.name);
        }
    });

    return result;
}
```

2. **Export Data to Excel**  
   Use the `saveAs` method and Kendo's Workbook utility to create and export the Excel file.

```javascript
function exportOrgChartToExcel(flatData) {
    const workbook = new kendo.ooxml.Workbook({
        sheets: [
            {
                columns: [
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                ],
                title: "Org Chart",
                rows: [
                    {
                        cells: [
                            { value: "Name", bold: true },
                            { value: "Title", bold: true },
                            { value: "Level", bold: true },
                            { value: "Manager", bold: true },
                        ],
                    },
                    ...flatData.map((item) => ({
                        cells: [
                            { value: item.Name },
                            { value: item.Title },
                            { value: item.Level },
                            { value: item.Manager },
                        ],
                    })),
                ],
            },
        ],
    });

    workbook.toDataURLAsync().then(function (dataURL) {
        kendo.saveAs({
            dataURI: dataURL,
            fileName: "OrgChart.xlsx",
        });
    });
}
```

3. **Combine the Steps**  
   Load the OrgChart data, flatten it, and export it to Excel.

```javascript
const chart = $("#orgchart").data("kendoOrgChart");
const tree = chart.dataSource.view();
const flat = flattenOrgChartData(tree);
exportOrgChartToExcel(flat);
```

### Example
Refer to the below Dojo for a working example.

```dojo
 <div id="orgchart"></div>
      <button id="exportBtn">Export to Excel</button>

      <script>
        var data = [
          {
            id: 1,
            name: "Gevin Bell",
            title: "CEO",
            expanded: true
          },
          {
            id: 2,
            name: "Clevey Thrustfield",
            title: "COO",
            expanded: true,
            parentId: 1
          },
          {
            id: 3,
            name: "Carol Baker",
            title: "CFO",
            expanded: false,
            parentId: 1
          },
          {
            id: 4,
            name: "Kendra Howell",
            title: "CMO",
            expanded: false,
            parentId: 1
          },
          {
            id: 5,
            name: "Sean Rusell",
            title: "Financial Manager",
            expanded: true,
            parentId: 3
          },
          {
            id: 6,
            name: "Steven North",
            title: "Senior Manager",
            expanded: false,
            parentId: 3
          },
          {
            id: 7,
            name: "Michelle Hudson",
            title: "Operations Manager",
            expanded: true,
            parentId: 2
          },
          {
            id: 8,
            name: "Andrew Berry",
            title: "Team Lead",
            parentId: 5
          },
          {
            id: 9,
            name: "Jake Miller",
            title: "Junior Accountant",
            parentId: 5,
          },
          {
            id: 10,
            name: "Austin Piper",
            title: "Accountant",
            parentId: 5
          },
          {
            id: 11,
            name: "Dilyana Newman",
            title: "Accountant",
            parentId: 5
          },
          {
            id: 12,
            name: "Eva Andrews",
            title: "Team Lead",
            parentId: 6
          },
          {
            id: 13,
            name: "Kaya Nilsen",
            title: "Financial Specialist",
            parentId: 6
          },
          {
            id: 14,
            name: "Elena Austin",
            title: "Team Lead",
            parentId: 4
          },
          {
            id: 15,
            name: "Lora Samuels",
            title: "Lawyer",
            parentId: 4
          },
          {
            id: 16,
            name: "Lillian Carr",
            title: "Operator",
            parentId: 7
          },
          {
            id: 17,
            name: "David Henderson",
            title: "Team Lead",
            parentId: 7
          },
        ];

        $("#orgchart").kendoOrgChart({
          dataSource: data,
        });

        // Flatten data for Excel
        function flattenOrgChartData(
          data,
          result = [],
          level = 0,
          parent = null,
        ) {
          data.forEach((item) => {
            result.push({
              Name: item.name,
              Title: item.title,
              Level: level,
              Manager: parent,
            });

            if (item.items && item.items.length > 0) {
              flattenOrgChartData(item.items, result, level + 1, item.name);
            }
          });

          return result;
        }

        // Excel Export function
        function exportOrgChartToExcel(flatData) {
          const workbook = new kendo.ooxml.Workbook({
            sheets: [
              {
                columns: [
                  { autoWidth: true },
                  { autoWidth: true },
                  { autoWidth: true },
                  { autoWidth: true },
                ],
                title: "Org Chart",
                rows: [
                  {
                    cells: [
                      { value: "Name", bold: true },
                      { value: "Title", bold: true },
                      { value: "Level", bold: true },
                      { value: "Manager", bold: true },
                    ],
                  },
                  ...flatData.map((item) => ({
                    cells: [
                      { value: item.Name },
                      { value: item.Title },
                      { value: item.Level },
                      { value: item.Manager },
                    ],
                  })),
                ],
              },
            ],
          });

          workbook.toDataURLAsync().then(function (dataURL) {
            kendo.saveAs({
              dataURI: dataURL,
              fileName: "Test.xlsx",
            });
          });
        }

        // Button click event
        $("#exportBtn").click(function () {
          const chart = $("#orgchart").data("kendoOrgChart");
          const tree = chart.dataSource.view();
          const flat = flattenOrgChartData(tree);
          exportOrgChartToExcel(flat);
        });
      </script>
```

## See Also

- [Kendo UI OrgChart Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/orgchart/overview)
- [Kendo UI Excel Export Documentation](https://docs.telerik.com/kendo-ui/framework/excel/introduction)
- [Kendo UI saveAs Method](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/saveas)
