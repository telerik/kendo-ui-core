---
title: Use MultiSelect as Custom Editor in Grid
page_title: Use MultiSelect as CSV Editor | Kendo UI Grid for jQuery
description: "An example on how to use the Kendo UI MultiSelect as an editor for comma-separated string fields in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/use-multiselect-as-custom-editor
slug: howto_usemultiselectascustomeditor_grid
tags: use, multiselect, custom, editor, grid, csv, string, fields
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I use the Kendo UI MultiSelect as an editor for comma-separated string fields in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use the MultiSelect as a custom editor in the Grid.

```dojo
    <div id="main">
      <div id="grid" data-bind="source: dataSource"></div>
    </div>
    <script>
        kendo.data.binders.widget.multiValue = kendo.data.Binder.extend({
          init: function(widget, bindings, options) {
              //call the base constructor
              kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

              this.widget = widget;
              this._change = $.proxy(this.change, this);
              this.widget.first("change", this._change);
              this._initChange = false;
          },

          refresh: function() {
            if (!this._initChange) {
              var widget = this.widget;
              var field = widget.options.dataValueField || widget.options.dataTextField;
              var value = this.bindings.multiValue.get() || null;
              var values = [];
              var selectedValue;

              if (field) {
                if (value instanceof kendo.data.ObservableArray) {
                  for (var idx = 0; idx < value.length; idx++) {
                    selectedValue = value[idx];
                    values[idx] = selectedValue.get ? selectedValue.get(field) : selectedValue;
                  }
                  value = values;
                }
              } else {
                values = value;
              }

              widget.value(values);
            }
          },

          change: function() {
            var widget = this.widget;
            var value = widget.options.valuePrimitive ? widget.value() : widget.dataItems();

            this._initChange = true;
            this.bindings.multiValue.set(value);
            this._initChange = false;
          }
      });
    </script>
    <script>
      (function () {
      var multiSelectEditor = function (container, options) {
          $('<select data-bind="multiValue:' + options.field + '"/>')
              .appendTo(container)
              .kendoMultiSelect({
              suggest: true,
              dataSource: options.values,
              valuePrimitive: true
          });
      };

      var singleSelectEditor = function (container, options) {
          $('<input data-bind="value:' + options.field + '"/>')
              .appendTo(container)
              .kendoDropDownList({
              suggest: true,
              dataSource: ['Canada', 'Mexico', 'United States']
          });
      };

      var numericEditor = function (container, options) {
          $('<input data-bind="value:' + options.field + '"/>')
              .appendTo(container)
              .kendoNumericTextBox({
              decimals: 2,
              min: 0,
              format: 'c2'
          });
      };

      var multiSelectArrayToString = function (item) {
          return item.countries.join(', ');
      };

      var vm = kendo.observable({
          countries: ['Canada', 'Mexico', 'United States'],
          dataSource: new kendo.data.DataSource({
              data: [{
                  id: 1,
                  product: 'X002',
                  countries: ['Mexico', 'Canada'],
                  country: 'Mexico',
                  price: 0.98
              }, {
                  id: 2,
                  product: 'X036',
                  countries: ['United States'],
                  country: 'Mexico',
                  price: 2.96
              }, {
                  id: 3,
                  product: 'X098',
                  countries: [],
                  country: '',
                  price: 45.90
              } ],
              schema: {
                  model: {
                      id: 'id',
                      fields: {
                          'id': {
                              type: 'number'
                          },
                              'product': {
                              type: 'string'
                          },
                            'country': {
                              type: 'string'
                          },
                              'countries': {},
                              'price': {
                              type: 'number'
                          }
                      }
                  }
              }
          }),
      });

      $('#grid').kendoGrid({
          columns: [{
              field: 'product'
          }, {
              field: 'countries',
              editor: multiSelectEditor, // function that generates the multiSelect control
              values: vm.countries, // custom property with array of values
              template: multiSelectArrayToString // template: how to display text in grid
          }, {
              field: 'country',
              editor: singleSelectEditor // function that generates the multiSelect control
          }, {
              field: 'price',
              editor: numericEditor,
              format: '{0:c}'
          }],
          editable: 'incell',
          save: function(e){
              console.log("save it", e);
          }
      });

      kendo.bind('#main', vm);

    })()
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
