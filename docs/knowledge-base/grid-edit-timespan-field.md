---
title: Edit a TimeSpan Field in InCell Mode
description: How to Edit a TimeSpan Field in Batch Editing Mode
type: how-to
page_title: How to Edit a TimeSpan Field in InCell Editing Mode | Kendo UI Grid for jQuery
slug: grid-edit-timespan-field
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how to edit a TimeSpan field in InCell editing mode of the Kendo UI Grid.

## Solution

```dojo
  
    <script>
      kendo.data.binders.widget.timespan = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
          kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
          this.widget = widget;
          this._change = $.proxy(this.change, this);
          this.widget.bind("change", this._change);
        },
        refresh: function () {
          var value = this.bindings.timespan.get();
          var date = null;
          if (value) {
            date = new Date();
            date.setHours(value.Hours);
            date.setMinutes(value.Minutes);
            date.setSeconds(value.Seconds);
          }
          this.widget.value(date);
        },
        change: function () {
          var date = this.widget.value();
          var value = null;
          if (date) {
            value = {
              Hours: date.getHours(),
              Minutes: date.getMinutes(),
              Seconds: date.getSeconds()
            };
          }
          this.bindings.timespan.set(value);
        },
        destroy: function () {
          this.widget.unbind("change", this._change);
        }
      });
    </script>

    <div id="example">
      <div id="grid"></div>

      <script>
        var products = [{
          ProductID : 1,
          ProductName : "Chai",
          SupplierID : 1,
          CategoryID : 1,
          QuantityPerUnit : "10 boxes x 20 bags",
          UnitPrice : 18.0000,
          UnitsInStock : 39,
          UnitsOnOrder : 0,
          ReorderLevel : 10,
          Discontinued : false,
          Category : {
            CategoryID : 1,
            CategoryName : "Beverages",
            Description : "Soft drinks, coffees, teas, beers, and ales"
          },
          End:
          {
            "Ticks":863990000000,
            "Days":0,
            "Hours":23,
            "Milliseconds":0,
            "Minutes":59,
            "Seconds":59,
            "TotalDays":0.99998842592592585,
            "TotalHours":23.999722222222221,
            "TotalMilliseconds":86399000,
            "TotalMinutes":1439.9833333333334,
            "TotalSeconds":86399
          }
        }, {
          ProductID : 2,
          ProductName : "Chang",
          SupplierID : 1,
          CategoryID : 1,
          QuantityPerUnit : "24 - 12 oz bottles",
          UnitPrice : 19.0000,
          UnitsInStock : 17,
          UnitsOnOrder : 40,
          ReorderLevel : 25,
          Discontinued : false,
          Category : {
            CategoryID : 1,
            CategoryName : "Beverages",
            Description : "Soft drinks, coffees, teas, beers, and ales"
          },
          End:
          {
            "Ticks":863990000000,
            "Days":0,
            "Hours":23,
            "Milliseconds":0,
            "Minutes":59,
            "Seconds":59,
            "TotalDays":0.99998842592592585,
            "TotalHours":23.999722222222221,
            "TotalMilliseconds":86399000,
            "TotalMinutes":1439.9833333333334,
            "TotalSeconds":86399
          }
        }, {
          ProductID : 3,
          ProductName : "Aniseed Syrup",
          SupplierID : 1,
          CategoryID : 2,
          QuantityPerUnit : "12 - 550 ml bottles",
          UnitPrice : 10.0000,
          UnitsInStock : 13,
          UnitsOnOrder : 70,
          ReorderLevel : 25,
          Discontinued : false,
          Category : {
            CategoryID : 2,
            CategoryName : "Condiments",
            Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
          },
          End:
          {
            "Ticks":863990000000,
            "Days":0,
            "Hours":23,
            "Milliseconds":0,
            "Minutes":59,
            "Seconds":59,
            "TotalDays":0.99998842592592585,
            "TotalHours":23.999722222222221,
            "TotalMilliseconds":86399000,
            "TotalMinutes":1439.9833333333334,
            "TotalSeconds":86399
          }
        }]

        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" },
                    End: { editable: true }
                  }
                }
              },
              pageSize: 20
            },
            toolbar: ["create", "save", "cancel"],
            scrollable: true,
            sortable: true,
            editable: true,
            filterable: true,
            pageable: {
              input: true,
              numeric: false
            },
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
              { field: "UnitsInStock", title: "Units In Stock", width: "90px" },
              { field: "Discontinued", width: "90px" },
              { field: "End", template: "#if (data.End) {# #:kendo.toString(End.Hours, '00')#:#:kendo.toString(End.Minutes, '00')#:#:kendo.toString(End.Seconds, '00')# #}#", editor: timePickerEditor }
            ]
          });
        });

        function timePickerEditor(container, options) {
          $('<input data-skip="true" data-bind="timespan:End" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoTimePicker({
            format: "HH:mm:ss"
          });
        }
      </script>
    </div>

``` 
