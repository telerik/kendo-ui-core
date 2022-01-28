---
title: Grid with dynamic aggregates column menu
description: An example on how to create an aggregates menu in a dynamic Kendo UI Grid, calculate user selected values and update the footers
type: how-to
page_title: Dynamically Calculate Aggregates in the Grid | Kendo UI Grid for jQuery
slug: grid-dynamic-aggregates
tags: grid, dynamically, column, header, dynamic, aggregate, menu, footer, update, refresh, calculate
res_type: kb
ticketid: 1471295
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2020.2.513</td>
 </tr>
</table>

## Description

I have created a dynamic grid as shown in [this article]({% slug howto_createdynamiccolumnsdatatypes_grid %}). Now I need to implement a menu in the column headers that will allow the user to select the available aggregates for that column and apply the changes. This should refresh the grid and update the footers.

## Solution

There a different options to choose from when it comes to the UI of the aggregate column menu. This example is created with the FilterMultiCheck menu as a proof of concept. Here are the important steps:

1. Initialize a header menu with dynamic aggregates dependent on the field type by using the [`headerTemplate`](/api/javascript/ui/grid/configuration/columns.headertemplate) in the grid `dataBound` event. If the grid has aggregates previously selected, reflect that in the UI.
1. When the selection in the menu changes, generate a `footerTemplate` and assign it to the respective grid columns. Use the `setOptions()` method to update the grid with the new column configuration or refresh the grid if using static footer templates
1. Apply the aggregates dynamically by using the data source [`aggregate()`](/api/javascript/data/datasource/methods/aggregate) method on selection change in the menu. 

```dojo
    <style>
      .aggregate-selector {
        display: flex;
      }

      .aggregate-selector > .k-grid-filter {
        right: 30px;
      }
    </style>

    <div id="grid" style="width: 1000px;"></div>

    <script>
      var isDateField = [];
      var model;
      var columns;
      $.ajax({
        url: "https://www.mocky.io/v2/5835e736110000020e0c003c",
        dataType: "jsonp",
        success: function (result) {
          generateGrid(result);
        }
      });

      var availableAggregates = {
        number: [{ aggregate: "average" }, { aggregate: "count" }, { aggregate: "max" }, { aggregate: "min" }, { aggregate: "sum" }],
        date: [{ aggregate: "count" }, { aggregate: "max" }, { aggregate: "min" }],
        string: [{ aggregate: "count" }]
      };

      function generateGrid(response) {
        model = generateModel(response);
        columns = generateColumns(response);

        $("#grid").kendoGrid({
          filterable: true,
          dataSource: {
            transport: {
              read: function (options) {
                options.success(response.data);
              }
            },
            pageSize: 5,
            schema: {
              model: model
            }
          },
          columns: columns,
          pageable: true,
          sortable:true,
          editable: true,
          dataBound: function (e) {
            initAggregateMenus(e, model);
          }
        });
      }

      function initAggregateMenus(e, model) {
        var grid = e.sender;
        var aggregateElem = grid.thead.find(".aggregate-selector");
        var fieldAggregates = grid.dataSource.aggregates();

        $.each(aggregateElem, function (i, elem) {
          var field = $(elem).closest("th").data("field")
          var fieldType = model.fields[field].type;
          var aggregateMenu = $(elem).data("kendoFilterMultiCheck");

          if (!aggregateMenu && fieldType !== "boolean") {

            $(elem).kendoFilterMultiCheck({
              dataSource: new kendo.data.DataSource({
                data: availableAggregates[fieldType],
                filter: getSelectedAggregates(fieldAggregates, field)
              }),
              field: "aggregate",
              messages: {
                filter: "Apply",
                clear: "Remove all"
              },
              change: function (e) {
                updateGridFooters(e, grid, model);
              }
            }).find(".k-i-filter")
              .removeClass("k-i-filter")
              .addClass("k-i-sum");
          }
        });

        $.each(aggregateElem, function (i, elem) {
          var existing = $(elem).data("kendoFilterMultiCheck");
          if (existing) {
            existing.refresh();
          }
        });

      }

      function updateGridFooters(e, grid, model) {
        e.preventDefault();
        var th = e.sender.element.closest("th");
        var field = th.data("field");
        var idx = th.index();
        var columns = grid.columns;
        var existingAggregates = grid.dataSource.aggregate() || [];
        var updatedAggregates = existingAggregates.filter(agg => agg.field !== field);
        grid.dataSource.unbind("change", grid._refreshHandler);

        if (e.filter) {
          var type = model.fields[field].type;
          var selectedAgg = e.filter.filters;
          var footerTemplate = "";

          var aggForField = selectedAgg.map(function (x) {
            if (type == "date" && x.value !== "count") {
              footerTemplate += kendo.format("{0} : #=kendo.toString({1:d}, 'g')#</br>", x.value, x.value);
            } else {
              footerTemplate += kendo.format("{0} : #=kendo.toString({1},'n')#</br>", x.value, x.value);
            }

            return {
              field: field,
              aggregate: x.value
            }
          });

          var all = updatedAggregates.concat(aggForField);
          grid.dataSource.aggregate(all);

          columns[idx].footerTemplate = footerTemplate;
          grid.setOptions({
            columns: columns
          });

        } else {
          delete columns[idx].footerTemplate;
          grid.dataSource.aggregate(updatedAggregates);

          setTimeout(function () {
            grid.setOptions({
              columns: columns
            });
          });
        }
      }

      function getSelectedAggregates(fieldAggregates, field) {
        var filter = {};
        if (fieldAggregates && fieldAggregates[field]) {
          var aggForField = Object.keys(fieldAggregates[field]);
          var filters = [];
          $.each(aggForField, function (i, aggregate) {
            filters.push({
              value: aggregate,
              operator: "eq",
              field: "aggregate"
            });

          });
          filter.filters = filters;
          filter.logic = "or";
        }
        return filter;
      }


      function generateColumns(response) {
        var columnNames = response["columns"];
        return columnNames.map(function (name) {
          return {
            field: name,
            format: (isDateField[name] ? "{0:D}" : ""),
            headerTemplate: function () {
              return name + "<span class='aggregate-selector'></span>"
            }
          };
        })
      }

      function generateModel(response) {

        var sampleDataItem = response["data"][0];

        var model = {};
        var fields = {};
        for (var property in sampleDataItem) {
          if (property.indexOf("ID") !== -1) {
            model["id"] = property;
          }
          var propType = typeof sampleDataItem[property];
          if (propType === "number") {
            fields[property] = {
              type: "number",
              validation: {
                required: true
              }
            };
            if (model.id === property) {
              fields[property].editable = false;
              fields[property].validation.required = false;
            }
          } else if (propType === "boolean") {
            fields[property] = {
              type: "boolean"
            };
          } else if (propType === "string") {
            var parsedDate = kendo.parseDate(sampleDataItem[property]);
            if (parsedDate) {
              fields[property] = {
                type: "date",
                validation: {
                  required: true
                }
              };
              isDateField[property] = true;
            } else {
              fields[property] = {
                type: "string",
                validation: {
                  required: true
                }
              };
            }
          } else {
            fields[property] = {
              validation: {
                required: true
              }
            };
          }
        }

        model.fields = fields;

        return model;
      }
    </script>
```

## See Also

* [Dynamic Columns and Column Types Grid]({% slug howto_createdynamiccolumnsdatatypes_grid %})