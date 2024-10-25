---
title: Use Kendo Grid to Import, Export and Edit Excel files
page_title: Import, Export, Edit Excel - Kendo UI Grid for jQuery
description: "Learn how to import, export and edit Excel files in the Kendo UI for jQuery Grid."
type: how-to
slug: import-export-excel-grid
tags: grid, excel, xlsx, spreadsheet, import, export, edit
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>


## Description

How can I import XLSX (Excel) files with simple data into the Kendo UI Grid for jQuery, export the Grid data to Excel, and edit the imported Excel file? And preferably being a CSP-compatible solution.

## Solution

1. First you need to handle the basic concept arround the spreadsheet data you are about to import. Excel can have sheets, merged rows, merged cells, formulas etc. The example here demonstrates how to import plain data, with no formulas and spreadsheet where the first row generates the columns for the Grid and the rest of the rows are the data.
2. Editing the data can be done by enabling the [editable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/editable) configuration option of the Grid. You need to also assign an id for the schema model and consider the same id when importing the data from the Excel file.

> **Note** You can support merged cells, formals etc. by altering the logic for the import.

The example below can be also opened in this dojo: https://dojo.telerik.com/OTotibUp

```html
<div id="grid"></div>

<script nonce="1234" type="module">
    function importExcel() {
        const upload = $('<input name="files" accept=".xlsx" type="file" />');
        const grid = $("#grid").getKendoGrid();

        const onSelect = (e) => {
            var deferred = new $.Deferred();
            var fileToUpload = e.target.files[0];
            var workbook = new kendo.spreadsheet.Workbook({
                sheets: {
                    rows: 200,
                    columns: 50
                }
            });

            kendo.spreadsheet.readExcel(fileToUpload, workbook, deferred);

            upload.off("change", onSelect);
            upload.remove();

            deferred.then(function () {
                const excelSheet = workbook.toJSON().sheets[0];

                const columns = excelSheet.rows.shift().cells.map(cell => ({title: cell.value, field: cell.value.replace(/\s/, '_')}));
                const data = excelSheet.rows.map(row => row.cells.reduce((a, v, i) => ({...a, [columns[i].field]: v.value}), {id: kendo.guid()}));

                grid.setOptions({
                    columns: columns,
                    dataSource: {
                        data: data
                    }
                });
            });

        }


        upload.on("change", onSelect);
        upload.click();
    }

    function loadSampleData() {
        const grid = $("#grid").getKendoGrid();
        const columns = [{"title":"Product Name","field":"Product_Name"},{"title":"Unit Price","field":"Unit_Price"},{"title":"Units On Order","field":"Units_On Order"}];
        const data = [{"id":"ef026a22-c53b-4d0e-8bd4-875bc4242d82","Product_Name":"Chai","Unit_Price":18,"Units_On Order":0},{"id":"e921bf7e-5ff5-407b-9f29-8a2d11b59d82","Product_Name":"Chang","Unit_Price":19,"Units_On Order":40},{"id":"f0216a5f-beca-48bd-939c-f2c522763197","Product_Name":"Aniseed Syrup","Unit_Price":10,"Units_On Order":70},{"id":"da2db97a-3506-4a86-87ba-ce0da4b64ef3","Product_Name":"Chef Anton's Cajun Seasoning","Unit_Price":22,"Units_On Order":0},{"id":"c2045147-af3f-49dc-9330-ef97fc23da96","Product_Name":"Chef Anton's Gumbo Mix","Unit_Price":21.35,"Units_On Order":0},{"id":"c1163665-3192-48ca-9a12-518022d9ebc3","Product_Name":"Grandma's Boysenberry Spread","Unit_Price":25,"Units_On Order":0},{"id":"ff2cbfcf-c784-48c6-b25d-8c29f4fb4890","Product_Name":"Uncle Bob's Organic Dried Pears","Unit_Price":30,"Units_On Order":0},{"id":"b883da82-be19-47be-ae6d-f3778e378012","Product_Name":"Northwoods Cranberry Sauce","Unit_Price":40,"Units_On Order":0},{"id":"e20ec737-b105-41b8-9455-884368cb3ce9","Product_Name":"Mishi Kobe Niku","Unit_Price":97,"Units_On Order":0},{"id":"ed21eaa5-a8af-4cce-b9c5-5aa258420445","Product_Name":"Ikura","Unit_Price":31,"Units_On Order":0},{"id":"e79f4a36-cd67-4772-96eb-531478d989fc","Product_Name":"Queso Cabrales","Unit_Price":21,"Units_On Order":30},{"id":"f49ce89d-97c1-47d8-b7d0-c87c68b9eab2","Product_Name":"Queso Manchego La Pastora","Unit_Price":38,"Units_On Order":0},{"id":"e354a3c1-b14a-47b5-8f04-8d16cafb9def","Product_Name":"Konbu","Unit_Price":6,"Units_On Order":0},{"id":"f10e8ec9-378b-40e0-a6f1-83ed60c449a7","Product_Name":"Tofu","Unit_Price":23.25,"Units_On Order":0},{"id":"a3f72b00-84ec-4243-9612-3b4b6c77ee8b","Product_Name":"Genen Shouyu","Unit_Price":15.5,"Units_On Order":0},{"id":"f0bdcede-2725-48a7-9499-09ee025949d2","Product_Name":"Pavlova","Unit_Price":17.45,"Units_On Order":0},{"id":"fd6fb2cd-8cba-4d9b-adee-f8011dbec4b0","Product_Name":"Alice Mutton","Unit_Price":39,"Units_On Order":0},{"id":"b61965ad-88fd-43bd-a555-98eb53c28e77","Product_Name":"Carnarvon Tigers","Unit_Price":62.5,"Units_On Order":0},{"id":"ca063cfa-0f16-4e87-bd0d-259b510dc4a7","Product_Name":"Teatime Chocolate Biscuits","Unit_Price":9.2,"Units_On Order":0},{"id":"b8160185-75d3-4c00-8fe4-3b6ffa6fdc81","Product_Name":"Sir Rodney's Marmalade","Unit_Price":81,"Units_On Order":0}];

        grid.setOptions({
            columns: columns,
            dataSource: {
                data: data
            }
        });
    }

    function clearData() {
        const grid = $("#grid").getKendoGrid();

        grid.setOptions({
            columns: [],
            dataSource: {
                data: []
            }
        });
    }


    $("#grid").kendoGrid({
        toolbar: [
            "excel",
            { text: "Import Excel", icon: "file-excel", click: importExcel },
            { text: "Load Sample Data", icon: "arrow-rotate-cw", click: loadSampleData },
            { text: "Clear Data", icon: "trash", click: clearData }
        ],
        dataSource: {
            schema:{
                model: {
                    id: "id",
                },
            },
            data: [
                {"id":"ef026a22-c53b-4d0e-8bd4-875bc4242d82","Product_Name":"Chai","Unit_Price":18,"Units_On Order":0}
            ],
        },
        columns: [{"title":"Product Name","field":"Product_Name"},{"title":"Unit Price","field":"Unit_Price"},{"title":"Units On Order","field":"Units_On Order"}],
        editable: true,
    });
</script>
```

## See Also

* [Kendo UI for jQuery Data Grid (Product Page)](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
* [jQuery Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
