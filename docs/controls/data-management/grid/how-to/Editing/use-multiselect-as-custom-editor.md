---
title: Use MultiSelect as Custom Editor in Grid
page_title: Use MultiSelect as Custom Editor in Grid | Kendo UI Grid
description: "Learn how to use the Kendo UI MultiSelect as a custom editor in the Kendo UI Grid widget."
slug: howto_usemultiselectascustomeditor_grid
---

# Use MultiSelect as Custom Editor in Grid

The following example demonstrates how to use the Kendo UI MultiSelect as a custom editor in the Kendo UI Grid widget.

###### Example

```html
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
            var value = widget.options.valuePritive ? widget.value() : widget.dataItems();

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
            change: function(e){
              console.log(1)
            },
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

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
