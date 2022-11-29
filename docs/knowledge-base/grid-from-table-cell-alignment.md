---
title: Align Content When the Grid Is Initialized from an HTML Table 
description: "An example on how to align the content of a Grid initialized from an HTML table in Kendo UI for jQuery."
type: how-to
page_title: Align the Content of a Grid Initialized from an HTML Table - Kendo UI Hierarchy Grid for jQuery
slug: update-hierarchy-grid-expand-collapse-icons
tags: jquery, grid, align, content, table, kendo grid
ticketid: 1534294
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery Grid</td>
 </tr>
</table>


## Description

How can I align the content of a Kendo UI for jQuery Grid which is initialized from an HTML table?

## Solution

To achieve the desired scenario, use the CSS [`:nth-child selectors`](https://www.w3schools.com/cssref/sel_nth-child.php) configuration.

```dojo
    <style>
      .k-grid th:nth-child(2),
      .k-grid td:nth-child(2),
      .k-grid th:nth-child(4),
      .k-grid td:nth-child(4){
        text-align: right;
      }
    </style>
    <table id="grid">
      <colgroup>
        <col />
        <col />
        <col style="width:110px;" />
        <col style="width:120px" />
        <col style="width:130px" />
      </colgroup>
      <thead>
        <tr>
          <th data-field="make">Car Make</th>
          <th data-field="model">Car Model</th>
          <th data-field="year">Year</th>
          <th data-field="category">Category</th>
          <th data-field="airconditioner">Air Conditioner</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Volvo</td>
          <td>S60</td>
          <td>2010</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Audi</td>
          <td>A4</td>
          <td>2002</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>BMW</td>
          <td>535d</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>BMW</td>
          <td>320d</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>VW</td>
          <td>Passat</td>
          <td>2007</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>VW</td>
          <td>Passat</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Peugeot</td>
          <td>407</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Honda</td>
          <td>Accord</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Alfa Romeo</td>
          <td>159</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Nissan</td>
          <td>Almera</td>
          <td>2001</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Mitsubishi</td>
          <td>Lancer</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Opel</td>
          <td>Vectra</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Toyota</td>
          <td>Avensis</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Toyota</td>
          <td>Avensis</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Toyota</td>
          <td>Avensis</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Audi</td>
          <td>Q7</td>
          <td>2007</td>
          <td>SUV</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Hyundai</td>
          <td>Santa Fe</td>
          <td>2012</td>
          <td>SUV</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Hyundai</td>
          <td>Santa Fe</td>
          <td>2013</td>
          <td>SUV</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Nissan</td>
          <td>Qashqai</td>
          <td>2007</td>
          <td>SUV</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Mercedez</td>
          <td>B Class</td>
          <td>2007</td>
          <td>Hatchback</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Lancia</td>
          <td>Ypsilon</td>
          <td>2006</td>
          <td>Hatchback</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>

    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          height: 550,
          sortable: true
        });
      });
    </script>
```

## See Also

* [Kendo UI for jQuery Grid API Reference](/api/javascript/ui/grid)
* [Kendo UI for jQuery Grid Initialization from a Table Demo](https://demos.telerik.com/kendo-ui/grid/from-table)
* [Common Issues in Kendo UI for jQuery]({% slug troubleshooting_common_issues_kendoui %})
