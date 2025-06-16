---
title: Making MultiSelect Work as a Custom Grid Editor Component
description: Learn how to use Kendo UI MultiSelect as a custom editor for fields in the Kendo UI Grid.
type: how-to
page_title: Using MultiSelect as a Grid Editor
slug: using-multiselect-as-grid-editor
tags: grid, multiselect, editor, kendo-ui, custom-editor
res_type: kb
ticketid: 1689532
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Progress® Kendo UI® Grid, <br/>
Progress® Kendo UI® MultiSelect
</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

I need to use the [Kendo UI MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview) as a custom editor for a field in the [Kendo UI Grid](/controls/grid/overview). The field should store multiple selected values and display them appropriately. 

This knowledge base article also answers the following questions:
- How can I use MultiSelect for editing array data in Grid cells?
- How do I configure a MultiSelect as a custom editor in Kendo UI Grid?
- How to display multi-selected values in Kendo UI Grid?

## Solution

To configure the Kendo UI MultiSelect as a custom editor for a field in the Kendo UI Grid, follow these steps:

1. Define a custom editor function for the Grid column.
2. Bind the MultiSelect to the appropriate data source and configure the [`value`](/api/javascript/ui/multiselect/configuration/value) property and [`change`](/api/javascript/ui/multiselect/events/change) events to synchronize the selected values.

Here is an example implementation:

```javascript
            {
              field: "countries",
              editor: function (container, options) {
                var values = (options.model.countries || "")
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0);

                $("<select multiple='multiple'/>")
                  .appendTo(container)
                  .kendoMultiSelect({
                    suggest: true,
                    dataSource: options.values,
                    valuePrimitive: true,
                    value: values,
                    change: function (_) {
                      var selected = this.value();
                      options.model.set("countries", selected);
                    },
                  });
              },
              values: vm.countries, // custom property with array of values
              template: function() { , // template: how to display text in grid
                  return item.countries.join(", ");
               }
            }
```

### Key Points:

- **Custom Editor**: The `editor` function defines the MultiSelect and binds it to the field values.
- **Data Source**: Replace `window.employees` with the actual array or data source for the MultiSelect.
- **Value Formatting**: Use `.split(",")` and `.join(", ")` to handle comma-separated values in the field.
- **Template**: Customize the `template` to display the values correctly.

For a full demonstration of this approach please refer to the next example.

```dojo
    <div id="main">
      <div id="grid" data-bind="source: dataSource"></div>
    </div>
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
                editor: function (container, options) {
           		 var values = (options.model.countries || "").map((s) => s.trim()).filter((s) => s.length > 0);

            	$("<select multiple='multiple'/>")
            	  .appendTo(container)
            	  .kendoMultiSelect({
            	    suggest: true,
            	    dataSource: options.values,
            	    valuePrimitive: true,
            	    value: values,
            	    change: function (_) {
            	      var selected = this.value();
            	      options.model.set("countries", selected);
            	    }
            	  });
          	},
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

- [Kendo UI MultiSelect Documentation](/controls/multiselect/overview)
- [Kendo UI Grid Documentation](/controls/grid/overview)
- [Using MultiSelect as a Custom Editor](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/use-multiselect-as-custom-editor)
