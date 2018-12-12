---
title: Open an AutoComplete Custom Editor on a Cell Click in Spreadsheet
description: An example on how to display a custom cell editor which contains a Kendo UI AutoComplete when the user clicks a cell in the Kendo UI Spreadsheet.
type: how-to
page_title: Show Custom Cell Editor with AutoComplete When the User Clicks on a Cell | Kendo UI Spreadsheet
slug: spreadsheet-open-autocomplete-editor-on-cell-click
tags: kendo, kendo-ui, spreadsheet, custom, editor, cell, popup, autocomplete, open-on-click
ticketid: 1143980
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
  <td>Progress Kendo UI AutoComplete</td>
 </tr>
</table>

## Description

How can I:
1. Register a custom editor for a cell within the Spreadsheet so that the editor is activated when the user clicks the respective cell?
1. The cell does not show custom icons?
1. The editor deactivates when the user clicks any element outside the popup of the editor?

## Solution

The following example demonstrates how to implement the desired scenario.

```dojo
<div id="spreadsheet" style="width: 100%;"></div>

<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color' id='editWindow' style='display:none'>
  <input id='autocomplete' style='width: 100%;' data-bind='value: value' />
  <div style='margin-top: 1em; text-align: right; display:none'>
    <button style='width: 6em' class='k-button' data-bind='click: ok'>OK</button>  
    <button style='width: 6em' class='k-button' data-bind='click: cancel'>Cancel</button>
  </div>
</div>

<script>
  kendo.spreadsheet.registerEditor("color", function(){
    var context, dlg, picker, model;

    function create() {
      if (!dlg) {
        model = kendo.observable({
          value: "",
          ok: function() {
            model.value = $(dlg.element).find("input").val();
            context.callback(model.value);
            dlg.close();
          },
          cancel: function() {
            dlg.close();
          }
        });
        var el = $("#editWindow");
        kendo.bind(el, model);
        dlg = el.getKendoWindow();
      }
    }

    function open() {
      create();
      dlg.open();
      dlg.center();
      var value = context.range.value();
      if (value != null) {
        model.set("value", value);
      }
    }

    return {
      edit: function(options) {
        context = options;
        open();
      }
    }
  });
  $(function() {
    $("#autocomplete").kendoAutoComplete({
      dataSource: ["red","blue","yellow", "purple", "orange", "green", "gray", "black", "brown"],
      filter: "startswith",
      highlightFirst: true,
      select: function(e){
        $(this.element).val(e.item.text());
        $(this.element).closest("div[data-role=window]").find("button:first").click();
      }
    });

    $("#spreadsheet").kendoSpreadsheet({
      select: function(e) {
        var selectedRange = e.range;

        if (selectedRange.values().length === 1 &&
            selectedRange.editor() === 'color') {
          var sender = e.sender;

          setTimeout(function() {
            sender._view.openCustomEditor();

            $('.k-overlay').on('click', function() {
              $("div[data-role=window]").find("button:first").click();
            });
          }, 0);
        }
      },
      columns: 5,
      rows: 10,
      sheetsbar: false,
      toolbar: true,
      sheets: [{
        columns: [{
          width: 100
        },{
          width: 100
        }],
        rows: [{
          cells: [
            { value: "Select color:", bold: true },
            { background: "#fef0cd", editor: "color" }
          ]
        }]
      }]
    });
  });
</script>

<style type="text/css">
  .k-spreadsheet-action-bar {
    display:none !important;
  }

  .k-spreadsheet-editor-button {
    visibility: hidden;
  }
</style>
```

## See Also

* [API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the AutoComplete](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
