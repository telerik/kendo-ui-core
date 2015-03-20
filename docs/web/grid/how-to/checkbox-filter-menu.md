---
title: Checkbox filter menu filtering
page_title: Checkbox filter menu filtering
description: Checkbox filter menu filtering
---

# Checkbox filter menu filtering

The following runnable sample demonstrates how to create checkbox filter menu functionality in a Kendo UI Grid

#### Example:

```html
     <div id="grid"></div>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: crudServiceBaseUrl + "/Products",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/Products/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: crudServiceBaseUrl + "/Products/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/Products/Create",
                  dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                  }
                }
              },
              batch: true,
              pageSize: 20,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true} },
                    UnitPrice: { type: "number", validation: { required: true, min: 1} },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: { type: "number", validation: { min: 0, required: true} }
                  }
                }
              }
            });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 550,
          toolbar: ["create"],
          columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "200px"}],
          editable: "inline",
          filterable: true,
          filterMenuInit: onFilterMenuInit
        });
      });

      function onFilterMenuInit(e) {
        if (e.field == "ProductName") {
          initCheckboxFilter.call(this, e);
        }
      }

      function initCheckboxFilter(e) {
        var popup = e.container.data("kendoPopup");
        var dataSource = this.dataSource;
        var field = e.field;
        var checkboxesDataSource = new kendo.data.DataSource({
          data: uniqueForField(dataSource.data(), field)
        });


        var helpTextElement = e.container.children(":first").children(":first");
        helpTextElement.nextUntil(":has(.k-button)").remove();
        var element = $("<div class='checkbox-ontainer'></div>").insertAfter(helpTextElement).kendoListView({
          dataSource: checkboxesDataSource,
          template: "<div><input type='checkbox' value='#:" + field + "#'/>#:" + field + "#</div>"
        });
        e.container.find("[type='submit']").click(function (e) {
          e.preventDefault();
          e.stopPropagation();
          var filter = dataSource.filter() || { logic: "and", filters: [] };
          var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {            
            return {
              field: field,
              operator: "eq",
              value: input.value
            };
          });
          if (fieldFilters.length) {
            removeFiltersForField(filter, field);
            filter.filters.push({
              logic: "or",
              filters: fieldFilters
            });
            dataSource.filter(filter);
          }
          popup.close();
        });
      }

      function removeFiltersForField(expression, field) {
        if (expression.filters) {
          expression.filters = $.grep(expression.filters, function (filter) {
            removeFiltersForField(filter, field);
            if (filter.filters) {
              return filter.filters.length;
            } else {
              return filter.field != field;
            }
          });
        }
      }

      function uniqueForField(data, field) {
        var map = {};
        var result = [];
        var item;
        for (var i = 0; i < data.length; i++) {
          item = data[i];
          if (!map[item[field]]) {
            result.push(item.toJSON());
            map[item[field]] = true;
          }
        }
        return result;
      }
    </script>
    <style type="text/css">
      .checkbox-ontainer 
      {
        max-height: 200px;
        overflow:auto;
      }
    </style>
```