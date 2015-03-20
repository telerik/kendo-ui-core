---
title: Update toolbar content using MVVM binding
page_title: Update toolbar content using MVVM binding
description: Update toolbar content using MVVM binding
---

# Update toolbar content using MVVM binding

The example below demonstrates how to create a [custom MVVM binding](/framework/mvvm/bindings/custom) to update the toolbar content dynamically

#### Example:

```html
<div id="example">
      <button data-bind="click: updateToolbar">Update toolbar</button>
      <div data-role="grid"
           date-scrollable="true"
           data-columns="[
                           { 'field': 'ProductName', 'width': 270 },
                           { 'field': 'UnitPrice' },
                        ]"
           data-bind="source: products, gridToolbar: toolbar"
           style="width: 480px; height: 200px"></div>
</div>
  <script>
    kendo.data.binders.widget.gridToolbar = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this;
            var value = that.bindings["gridToolbar"].get(); //get the value from the View-Model

            value = $.map(value, function(item) {
              return { template: item.template };
            });

            $(that.element).data("kendoGrid").setOptions({
              toolbar: value
            }); //update the widget
        }
    });

    var viewModel = kendo.observable({
        products: new kendo.data.DataSource({
            schema: {
                model: {
                    id: "ProductID"
                }
            },
            batch: true,
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                },
                update: {
                    url: "http://demos.telerik.com/kendo-ui/service/products/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "http://demos.telerik.com/kendo-ui/service/products/create",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            }
        }),
        toolbar: [{"template": "<div id=\"gridToolbar\" class=\"toolbar\"><input type=\"button\" class=\"k-button k-button-icontext\" value=\"My Button\"/></div>" }],
        updateToolbar: function() {
          this.set("toolbar", [{
            template: '<div id="gridToolbar" class="toolbar"><input type="button" class="k-button k-button-icontext" value="test"/></div>'
          }]);
        }
    });
    kendo.bind($("#example"), viewModel);
</script>
```
