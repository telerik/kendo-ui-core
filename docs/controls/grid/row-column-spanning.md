---
title: Row and Column Spanning
page_title: jQuery Grid Documentation - Row and Column Spanning
description: "Get started with the jQuery Grid by Kendo UI and learn all about the Row and Column Spanning feature."
slug: row_column_spanning__kendoui_grid
position: 15
---

# Row and Column Spanning


## Row Spanning

The Row spanning functionality of the Grid enables you to span a cell between multiple rows.
You can use the [`attributes`](/api/javascript/ui/grid/configuration/columns.attributes) function and calculate the span of each cell.

```dojo
    <div id="grid"></div>
    <script type="module">
        $("#grid").kendoGrid({
            columns: [
                "id",
                "name",
                {
                    field: "country", width: 800,
                    attributes: (dataItem) => {
                        const dataView = dataItem.parent();
                        let currentIndex = dataView.indexOf(dataItem);
                        const prevDataItem = currentIndex === 0 ? null : dataView.at(currentIndex - 1);
                        let nextDataItem = dataView.at(++currentIndex);
                        let rowSpan = 1;

                        if (prevDataItem && dataItem['country'] === prevDataItem['country']) {
                            return {
                                hidden: 'hidden'
                            }
                        }

                        while (nextDataItem) {
                            if (dataItem['country'] === nextDataItem['country']) {
                                rowSpan++;
                            } else {
                                break;
                            }

                            nextDataItem = dataView.at(++currentIndex);
                        }

                        return { rowSpan };
                    },
                    template: ({ country }) => {
                        return `<strong>${kendo.htmlEncode(country)}</strong>`
                    }
                }
            ],
            dataSource: [
                { id: 1, name: "Albert", country: "Belgium" },
                { id: 2, name: "Noah", country: "Belgium" },
                { id: 3, name: "Emma", country: "Belgium" },
                { id: 4, name: "Oscar", country: "Denmark" },
                { id: 5, name: "William", country: "Denmark" },
                { id: 6, name: "Aksel", country: "Germany" },
                { id: 7, name: "Luca", country: "Italy" },
                { id: 8, name: "Michele", country: "Italy" },
                { id: 9, name: "Giuseppe", country: "Italy" },
                { id: 10, name: "Juan Carlos", country: "Spain" },
            ]
        });
    </script>
```

## Column Spanning

The Column spanning functionality enables you to span multiple columns in the Grid. This feature is equal to 'cell merging' in Excel or 'column spanning' in HTML tables.
The Column spanning is available through the [`attributes`](/api/javascript/ui/grid/configuration/columns.attributes) function and its `hidden` property.

```
<div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", width: 100 },
          { field: "name", width: 150 },
          { field: "pass", 
           width: 100,
           attributes: ({ pass }) => {
            if (!pass) {
              return {
                colSpan: 2,
                "class": "!k-text-center"
              };
            }
          },
          template: "#= !pass ? 'Not passing' : 'Passing' #"
          },
          {
            field: "country", 
            width: 300,
            attributes: ({ pass }) => {
              if (!pass) {
                return { hidden: "hidden" };
              }
            }
          }
        ],
        dataSource: [
          { id: 1, name: "Albert", country: "Belgium", pass: false },
          { id: 2, name: "Noah", country: "Belgium", pass: true },
          { id: 3, name: "Emma", country: "Belgium", pass: false },
          { id: 4, name: "Oscar", country: "Denmark", pass: false },
          { id: 5, name: "William", country: "Denmark", pass: true },
          { id: 6, name: "Aksel", country: "Germany", pass: true },
          { id: 7, name: "Luca", country: "Italy", pass: true },
          { id: 8, name: "Michele", country: "Italy", pass: true },
          { id: 9, name: "Giuseppe", country: "Italy", pass: false },
          { id: 10, name: "Juan Carlos", country: "Spain", pass: true },
        ]
      });
    </script>
```


## See Also

* [Row Spanning in the Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/row-spanning)
* [Column Spanning in the Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/column-spanning)
* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)

