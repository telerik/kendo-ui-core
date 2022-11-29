---
title: Implement Cascading Cell Editors in the Spreadsheet 
description: "An example on how to implement cascading cell editors in the Kendo UI for jQuery Spreadsheet."
type: how-to
page_title: Implement Cascading Cell Editors in the Spreadsheet
slug: spreadsheet-cascading-cell-editors
tags: kendo, jquery, spreadsheet, cascading, cell, editors
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery Spreadsheet</td>
 </tr>
</table>


## Description

How can I implement cascading cell editors in the Kendo UI for jQuery Spreadsheet?

## Solution

To achieve the desired scenario, refer to the following implementation: 

```dojo
    <div id="example">
      <div id="spreadsheet" style="width: 100%;"></div>
      <script>
        $(function() {
          var listOptions = {
            Entree: ['Pizza', 'Calzone'],
            Side: ['Salad', 'Breadsticks'],
          };

          $("#spreadsheet").kendoSpreadsheet({
            change:function(e){

              var sheet = e.sender.activeSheet();
              var rangeValue = e.range.value();
              if(rangeValue === "Side "){
                var rangeToChange = sheet.range("B2");
                rangeToChange.validation({
                  dataType: "list",
                  showButton: true,
                  comparerType: "list",
                  from: JSON.stringify(listOptions.Side).replace('[', '{').replace(']', '}'),
                  allowNulls: true,
                  type: "reject"
                })
                rangeToChange.value(listOptions.Side[0]);
              } else if(rangeValue === " Entree"){
                var rangeToChange = sheet.range("B2");
                rangeToChange.validation({
                  dataType: "list",
                  showButton: true,
                  comparerType: "list",
                  from: JSON.stringify(listOptions.Entree).replace('[', '{').replace(']', '}'),
                  allowNulls: true,
                  type: "reject"
                })
                rangeToChange.value(listOptions.Entree[0]);
              }
            },
            sheets: [
              {
                name: "Food Order",
                rows: [
                  {
                    height: 25,
                    cells: [
                      {
                        value: "Product Type", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Product", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                    ]
                  },
                  {
                    cells: [
                      {
                        value: "Entree", background: "rgb(255,255,255)", color: "rgb(0,62,117)",
                        validation: {
                          dataType: "list",
                          showButton: true,
                          comparerType: "list",
                          from: '{ "Entree", "Side" }',
                          allowNulls: true,
                          type: "reject"
                        }
                      },
                      {
                        value: "Calzone", background: "rgb(255,255,255)", color: "rgb(0,62,117)",
                        validation: {
                          dataType: "list",
                          showButton: true,
                          comparerType: "list",
                          from: JSON.stringify(listOptions.Entree).replace('[', '{').replace(']', '}'),
                          allowNulls: true,
                          type: "reject"
                        }
                      },
                    ]
                  },
                ],
                columns: [
                  {
                    width: 215
                  },
                  {
                    width: 215
                  },
                ]
              }
            ]
          });
        });

      </script>
    </div>
```

## See Also

* [Kendo UI for jQuery Spreadsheet API Reference](/api/javascript/ui/spreadsheet)
* [Common Issues in Kendo UI for jQuery]({% slug troubleshooting_common_issues_kendoui %})