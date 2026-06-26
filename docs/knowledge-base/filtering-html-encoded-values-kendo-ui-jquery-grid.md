---
title: Filtering HTML-Encoded Values in Kendo UI for jQuery Grid
description: Learn how to handle filtering issues in Kendo UI for jQuery Grid when displaying and filtering HTML-encoded values.
type: how-to
page_title: Resolving Filtering Issues with HTML-Encoded Values in Kendo UI for jQuery Grid
meta_title: Filtering HTML-Encoded Strings in Kendo UI for jQuery Grid
slug: filtering-html-encoded-values-kendo-ui-jquery-grid
tags: grid, kendo-ui, datasource, filtering, html-encoding, parse, schema
res_type: kb
ticketid: 1704079
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

When using Kendo UI for jQuery Grid, filtering fails for HTML-encoded values. The grid displays decoded values but compares filters against encoded data. This behavior causes filtering to mismatch unless the user types the encoded value, which is not visible to them. The challenge is to ensure filtering works on the decoded text while keeping the grid XSS-safe.

This knowledge base article also answers the following questions:
- How to filter decoded values in Kendo UI for jQuery Grid?
- How to dynamically decode HTML-encoded values for filtering in Kendo UI Grid?
- How to ensure XSS safety when filtering HTML-encoded values in Kendo UI Grid?

## Solution

### Option 1: Decode Values Dynamically in `schema.parse`

Use the [`schema.parse`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/configuration/schema#schemaparse) method to decode HTML-encoded values dynamically and apply decoding to all string-type fields.

```javascript
function decodeHTMLEntities(text) {
    if (!text || typeof text !== "string") return text;

    // Create textarea for safe decoding
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    const decoded = textarea.value;

    // Strip remaining HTML tags for XSS safety
    return decoded.replace(/<[^>]*>/g, "");
}

const gridOptions = {
    dataSource: {
        data: rawData, // Replace with your data source
        schema: {
            parse: function (response) {
                response.forEach(function (item) {
                    const fields = gridOptions.dataSource.schema.model.fields;
                    for (const fieldName in fields) {
                        if (fields[fieldName].type === "string" && item[fieldName]) {
                            item[fieldName] = decodeHTMLEntities(item[fieldName]);
                        }
                    }
                });
                return response;
            },
            model: {
                fields: {
                    S3QV6I1: { type: "string" },
                    S3QV6I2: { type: "date" },
                    S3QV6I3: { type: "string" }
                }
            }
        }
    },
    filterable: { mode: "row" },
    columns: [
        { field: "S3QV6I1", title: "ID" },
        { field: "S3QV6I2", title: "Date" },
        { field: "S3QV6I3", title: "Code" }
    ]
};
```
Runnable example:

```dojo
<div id="grid"></div>
    <script>
      let gridOptions = {
        dataSource: {
          data: [
            {
              S3QV6I1: "0&gt;9",
              test:  "0&gt;9",
              S3QV6I2: "2020-04-29T15:44:00",
              S3QV6I2_display: "29/04/2020",
              S3QV6I3: "2; 3",
            },
            {
              S3QV6I1: "11?",
               test:  "11?",
              S3QV6I2: "2007-10-16T00:00:00",
              S3QV6I2_display: "16/10/2007",
              S3QV6I3: "2; 3",
            },
            {
              S3QV6I1: "BAD:CHAR'S&%?*",
               test:  "0&gt;9",
              S3QV6I2: "1900-01-01T00:03:00",
              S3QV6I2_display: "01/01/1900",
              S3QV6I3: "2; 4",
            },
  
          ],
          pageSize: 20,
          schema: {
            model: {
              fields: {
                S3QV6I1: { type: "string" },
                test: { type: "string" },
                S3QV6I1_wrapstyle: { type: "string" },
                S3QV6I2: { type: "date" },
                S3QV6I2_display: { type: "string" },
                S3QV6I2_style: { type: "string" },
                S3QV6I2_wrapstyle: { type: "string" },
                S3QV6I3: { type: "string" },
                S3QV6I3_style: { type: "string" },
                S3QV6I3_wrapstyle: { type: "string" },
              },
            },
             parse: function (response) {
                const parser = new DOMParser();
                response.forEach(function (item) {
                  // Get schema fields to identify string types
                  const fields = gridOptions.dataSource.schema.model.fields;

                  // Loop through all fields in the schema
                  for (var fieldName in fields) {
                    if (fields[fieldName].type === "string" && item[fieldName]) {
                      // Decode HTML entities for string fields
                      const doc = parser.parseFromString(item[fieldName], "text/html");
                      const decoded = doc.documentElement.textContent;
                      item[fieldName] = decoded;
                    }
                  }
                });
                return response;
              },
          },
        },
        columns: [
          "test",
          {
            field: "S3QV6I1",
            title: "ID",
            exportFormat: "",
          },
          {
            field: "S3QV6I2",
            title: "Date Identifier ddmmyyyy",
            exportFormat: "dd/MM/yyyy"
          },
          {
            field: "S3QV6I3",
            title: "Coded MultipleResponse2 Cde & Meaning",
            exportFormat: "",
          },
        ],
        filterable: {
          mode: "row",
        },
        resizable: true,
        scrollable: true,
        selectable: "one",
        sortable: {
          allowUnsort: true,
          mode: "multiple",
          showIndexes: true,
        },
      };
      $("#grid").kendoGrid(gridOptions);
    </script>
```

### Option 2: Customize Filter Row with DropDownList

If you want filtering without changing the data source, customize the filter row using [`filterable.cell.template`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/columns.filterable.cell). Use a [DropDownList](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdownlist/overview#kendo-ui-for-jquery-dropdownlist-overview) for filtering.

```javascript
columns: [
    {
        field: "S3QV6I1",
        title: "ID",
        encoded: false,
        filterable: {
            cell: {
                template: function (args) {
                    args.element.kendoDropDownList({
                        dataSource: args.dataSource,
                        autoBind: true,
                        dataTextField: "S3QV6I1",
                        dataValueField: "S3QV6I1",
                        filter: "contains",
                        valuePrimitive: true
                    });
                },
                showOperators: false
            }
        }
    }
];
```

Runnable example:

```dojo
    <div id="grid"></div>
    <script>
      let gridOptions = {
        dataSource: {
          data: [
            {
              S3QV6I1: "0&gt;9",
              test: "0&gt;9",
              S3QV6I2: "2020-04-29T15:44:00",
              S3QV6I2_display: "29/04/2020",
              S3QV6I3: "2; 3",
            },
            {
              S3QV6I1: "11?",
              test: "11?",
              S3QV6I2: "2007-10-16T00:00:00",
              S3QV6I2_display: "16/10/2007",
              S3QV6I3: "2; 3",
            },
            {
              S3QV6I1: "BAD:CHAR'S&%?*",
              test: "0&gt;9",
              S3QV6I2: "1900-01-01T00:03:00",
              S3QV6I2_display: "01/01/1900",
              S3QV6I3: "2; 4",
            },
          ],
          pageSize: 20,
          schema: {
            model: {
              fields: {
                S3QV6I1: { type: "string" },
                test: { type: "string" },
                S3QV6I1_wrapstyle: { type: "string" },
                S3QV6I2: { type: "date" },
                S3QV6I2_display: { type: "string" },
                S3QV6I2_style: { type: "string" },
                S3QV6I2_wrapstyle: { type: "string" },
                S3QV6I3: { type: "string" },
                S3QV6I3_style: { type: "string" },
                S3QV6I3_wrapstyle: { type: "string" },
              }
            }            
          }
        },
        columns: [
          {
            field: "S3QV6I1",
            title: "ID 1",
            exportFormat: "",
            encoded: false,
            filterable: {
              cell: {
                template: function (args) {
                  args.element.kendoDropDownList({
                    dataSource: args.dataSource,
                    autoBind: true,
                    dataTextField: "S3QV6I1",
                    dataValueField: "S3QV6I1",
                    filter: 'contains',
                    template: '#= S3QV6I1 #',
                    valueTemplate: '#= S3QV6I1 #',
                     valuePrimitive: true,
                  });                 
                },
                showOperators: false,
              },
            },
          },
          {
            field: "S3QV6I1",
            title: "ID",
            exportFormat: "",
          },
          {
            field: "S3QV6I2",
            title: "Date Identifier ddmmyyyy",
            exportFormat: "dd/MM/yyyy",
            groupHeaderTemplate:
              "Date Identifier ddmmyyyy: #= grid.extractHeaderFromData(data, 'S3QV6I2_display') #",
          },
          {
            field: "S3QV6I3",
            title: "Coded MultipleResponse2 Cde & Meaning",
            exportFormat: "",
          },
        ],
        filterable: {
          mode: "row",
        },
        groupable: null,
        resizable: true,
        scrollable: true,
        selectable: "one",
        sortable: {
          allowUnsort: true,
          mode: "multiple",
          showIndexes: true,
        },
      };
      $("#grid").kendoGrid(gridOptions);

      function cityFilter(element) {
        element.kendoDropDownList({
          dataSource: gridOptions.dataSource,
          optionLabel: "--Select Value--",
          valueTemplate: "#= S3QV6I3 #",
        });
      }
    </script>
```

### Notes

- Both solutions maintain XSS safety by decoding values safely and stripping malicious HTML tags.
- The first approach modifies the data source directly, while the second approach customizes the filter UI.

## See Also

- [Kendo UI for jQuery Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [DataSource Schema Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/configuration/schema)
- [DropDownList Configuration for Filtering](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdownlist/configuration/filter) 
- [Columns Filterable Cell Template](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/columns.filterable.cell)
