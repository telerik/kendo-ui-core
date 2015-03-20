---
title: Bind values to template
page_title: Bind values to template
description: Bind values to template
---

# Bind values to template

The example below demonstrates how to bind the widget value to a template using MVVM

#### Example:

```html
    <div id="example">
      <div class="demo-section k-header">
        <div class="box-col" data-bind="visible: isPrimitive">
          <h4>MultiSelect</h4>
          <select data-role="multiselect"
                  data-placeholder="Type a product e.g. 'Chai'"
                  data-value-primitive="false"
                  data-text-field="ProductName"
                  data-value-field="ProductID"
                  data-bind="value: selectedProduct,
                             source: products,
                             visible: isVisible,
                             enabled: isEnabled,
                             events: {
                             change: onChange,
                             open: onOpen,
                             close: onClose
                             }"
                  style="width: 300px"
                  ></select>
        </div>

        <table>
          <tbody data-template="row-template" data-bind="source: selectedProduct"></tbody>
        </table>
        <script id="row-template" type="text/x-kendo-template">
            <tr>
                <td data-bind="text: ProductName"></td>
                <td data-bind="text: ProductID"></td>
          </tr>
        </script>
      </div>
    </div>

    <script>
      var viewModel = kendo.observable({
        selectedProduct: null,
        isPrimitive: true,
        isVisible: true,
        isEnabled: true,
        primitiveChanged: function() {
          this.set("selectedProduct", null);
        },
        displaySelectedProduct: function() {
          var selectedProduct = this.get("selectedProduct");
          return kendo.stringify(selectedProduct, null, 4);
        },
        onOpen: function() {
          kendoConsole.log("event :: open");
        },
        onChange: function() {
          var selectedProduct = this.get("selectedProduct");
          viewModel.set("selectedProduct",selectedProduct)
          kendoConsole.log("event :: change (" + this.displaySelectedProduct() + ")");
        },
        onClose: function() {
          kendoConsole.log("event :: close");
        },
        products: new kendo.data.DataSource({
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/service/products",
              dataType: "jsonp"
            }
          }
        })
      });
      kendo.bind($("#example"), viewModel);
    </script>
    </div>
```
