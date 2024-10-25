---
title: Getting Started
page_title: jQuery Spreadsheet Documentation - Getting Started with the Spreadsheet
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn how to create and initialize the component in a few easy steps."
slug: getting_started_kendoui_spreadsheet_component
position: 2
---


# Getting Started with the Spreadsheet 

This guide demonstrates how to get up and running with the Kendo UI for jQuery Spreadsheet.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="spreadsheet"></div>

    <script>
      $("#spreadsheet").kendoSpreadsheet({  
        sheets: [{
          name: "Products",               
          rows: [
            {
              cells: [{ 
                value: 'Product', background: 'lightgreen', color: 'darkgreen', fontSize: 14
              },{
                value: "Price",  background: 'lightgreen', color: 'darkgreen', fontSize: 14
              },{
                value: "Profit",  background: 'lightgreen', color: 'darkgreen', fontSize: 14
              }]
            },
            {
              cells: [{ 
                value: 'Bread'
              },{
                value: 12.39, format: "$#,##0.00"
              },{
                formula: 'B2 * 0.07'
              }]
            }

          ],
        },{
          name: "Sheet2"
        }]
      });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page where you want to initialize the component.

```html
    <div id="spreadsheet"></div>
```

## 2. Initialize the Spreadsheet

In this step, initialize the Spreadsheet from the `<div>` element.

```dojo
    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet();
    </script>
```

## 3. Add Sheets and Cells with Data

Next, populate the Spreadsheet with data.

You can add multiple sheets in the [`sheets`](/api/javascript/ui/spreadsheet/configuration/sheets) configuration array. Use the [`sheets.rows`](/api/javascript/ui/spreadsheet/configuration/sheets.rows) and [`sheets.rows.cells`](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells) options to define the data.

```dojo
    <div id="spreadsheet"></div>

    <script>
      $("#spreadsheet").kendoSpreadsheet({  
        sheets: [{
          name: "Products",               
          rows: [
            {
              cells: [{ 
                value: 'Product'
              },{
                value: "Price"
              },{
                value: "Profit"
              }]
            },
            {
              cells: [{ 
                value: 'Bread'
              },{
                value: 12.39
              }]
            }
          ],
        },{
          name: "Sheet2"
        }]
      });
    </script>
```

## 4. Add Formula in the Cells

You can use the [`formula`](/api/javascript/spreadsheet/range/methods/formula) method to add formulas, reference other cells and sheets, and calculate values. You can find the full list of the supported formulas and functions [here]({% slug list_offormulas_andfunctions_spreadsheet_widget %}).

```dojo
  <div id="spreadsheet"></div>

    <script>
      $("#spreadsheet").kendoSpreadsheet({  
        sheets: [{
          name: "Products",               
          rows: [
            {
              cells: [{ 
                value: 'Product'
              },{
                value: "Price"
              },{
                value: "Profit"
              }]
            },
            {
              cells: [{ 
                value: 'Bread'
              },{
                value: 12.39
              },{
                formula: 'B2 * 0.07'
              }]
            }

          ],
        },{
          name: "Sheet2"
        }]
      });
    </script>
```

## 5. Customize the Cells Appearance

The Spreadsheet component provides multiple configuration options that let you customize the cells appearance. You can use the [`format`](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.format) configuration to format the numbers and dates displayed in the cells. You can also customize the [`font-size`](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.fontsize), [`color`](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.color), [`borders`](/api/javascript/ui/spreadsheet/configuration/sheets.rows.cells.bordertop), etc.

```dojo
    <div id="spreadsheet"></div>

    <script>
      $("#spreadsheet").kendoSpreadsheet({  
        sheets: [{
          name: "Products",               
          rows: [
            {
              cells: [{ 
                value: 'Product', background: 'lightgreen', color: 'darkgreen', fontSize: 14
              },{
                value: "Price",  background: 'lightgreen', color: 'darkgreen', fontSize: 14
              },{
                value: "Profit",  background: 'lightgreen', color: 'darkgreen', fontSize: 14
              }]
            },
            {
              cells: [{ 
                value: 'Bread'
              },{
                value: 12.39, format: "$#,##0.00"
              },{
                formula: 'B2 * 0.07'
              }]
            }
          ],
        },{
          name: "Sheet2"
        }]
      });
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Spreadsheet](https://demos.telerik.com/kendo-ui/spreadsheet/index)

## See Also 

* [JavaScript API Reference of the Spreadsheet](/api/javascript/ui/spreadsheet)
* [JavaScript API Reference of the Sheet](/api/javascript/spreadsheet/sheet)
* [JavaScript API Reference of the Range](/api/javascript/spreadsheet/range)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
