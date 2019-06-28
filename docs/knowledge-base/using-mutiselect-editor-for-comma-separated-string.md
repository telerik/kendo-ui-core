---
title: Use MultiSelect as CSV Editor
page_title: Use MultiSelect as CSV Editor | Kendo UI Grid and MultiSelect for jQuery
description: "Learn how to use the Kendo UI MultiSelect as an editor for comma-separated string fields in the Kendo UI Grid widget."
previous_url: /controls/data-management/grid/how-to/Editing/using-mutiselect-editor-for-comma-separated-string
slug: howto_usethe_multiselect_aseditor_commaseparated_stringfields_grid
tags: use, multiselec, csv, editor, grid
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

How can I use the Kendo UI MultiSelect as an editor for comma-separated string fields in the Kendo UI Grid widget?

## Solution

The following example demonstrates how to implement custom binding and use it for the MultiSelect to edit a string field that contains a list of comma-separated values.

```dojo
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
