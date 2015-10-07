---
title: Using multiselect editor for comma separated string
page_title: Using multiselect editor for comma separated string
description: Using multiselect editor for comma separated string
---

# Using multiselect editor for comma separated string field

The following runnable sample demonstrates how to implement custom binding and use it for the multiselect widget in order to edit a string field containing comma separated list of the values.

#### Example: 
```html
    <div id="grid"></div>
    <script>
      kendo.data.binders.widget.commaseparatedvalue = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
          kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
          this.widget = widget;
          this._change = $.proxy(this.change, this);
          this.widget.bind("change", this._change);
        },
        refresh: function () {
          var value = this.bindings.commaseparatedvalue.get();
          var values = value ? value.split(",") : [];

          this.widget.value(values);
        },
        change: function () {
          var value = this.widget.value();
          this.bindings.commaseparatedvalue.set(value.join(","));
        },
        destroy: function () {
          this.widget.unbind("change", this._change);
        }
      });

      var dataSource = new kendo.data.DataSource({
        data: [{ID: 1, Value: "Value1,Value2"}, { ID: 2, Value: "Value2,Value3"}],
        schema: {
          model: {
            id: "ID",
            fields: {
              ID: { editable: false, type: "number" },
              Value: { type: "string" }                                                 
            }
          }
        }
      });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
          "ID",
          { field: "Value", editor: multiselectEditor},
          { command: ["edit"], title: "&nbsp;"}],
        editable: "inline"
      });

      function multiselectEditor(container, options) {
        $("<select data-bind='commaseparatedvalue: " + options.field + "'/>").appendTo(container).kendoMultiSelect({
          dataSource: ["Value1", "Value2", "Value3"]
        });
      }

    </script>
```