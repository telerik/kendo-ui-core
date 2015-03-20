---
title: Update MVVM bound model on load 
page_title: Update MVVM bound model on load 
description: Example that shows how to update MVVM bound model on load 
---

# How to update MVVM bound model on load 

Example that shows how to update MVVM bound model on load 

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">

      <div class="box-col">
        <h4>Choose a product e.g. 'Chai'</h4>
        <input data-role="dropdownlist"
               data-auto-bind="false"
               data-bound="updateModel"
               data-text-field="ProductName"
               data-value-field="ProductID"
               data-bind="value: selectedProduct,
                          source: products,
                          events: {
                          change: onChange,
                          open: onOpen,
                          close: onClose
                          }"
               style="width: 300px"
               /><button data-bind="click: onChange">click for selected value</button>
      </div>
      <div class="box-col console-section">
        <h4>Console</h4>
        <div class="console"></div>
      </div>
    </div>

    <script>
      function updateModel(e) {
        var widget = e.sender;

        setTimeout(function() {
          widget.trigger("change");
        });
      };

      var viewModel = kendo.observable({
        selectedProduct: null,
        displaySelectedProduct: function() {
          var selectedProduct = this.get("selectedProduct");
          return kendo.stringify(selectedProduct, null, 4);
        },
        onOpen: function() {
          kendoConsole.log("event :: open");
        },
        onChange: function() {
          kendoConsole.log("event :: change (" + this.displaySelectedProduct() + ")");
        },
        onClose: function() {
          kendoConsole.log("event :: close");
        },
        products: [{ProductName: "test title", ProductID: "1"}]
      });
      kendo.bind($("#example"), viewModel);
    </script>
  </div>
```
