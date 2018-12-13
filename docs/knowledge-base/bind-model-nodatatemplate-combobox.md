---
title: Bind the viewModel in the noData Template of the ComboBox
description: An example on how to bind the viewModel in the noData template of the Kendo UI ComboBox.
type: how-to
page_title: Bind the viewModel in the noData Template | Kendo UI ComboBox
slug: bind-model-nodatatemplate-combobox
tags: combobox, kendoui, kendo, mvvm, nodatatemplate, event, trigger, bind, viewmodel
ticketid: 1133381
res_type: kb
component: combobox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ComboBox</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 8.1</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>IE11</td>
 </tr>
</table>


## Description

How to trigger the `click` event of a button which is nested in the `noDataTemplate` of the ComboBox?

## Solution

The `noDataTemplate` is initially hidden which means that the binding of the model is not applied to it. This logic causes the inability to trigger events of widgets that are nested in the template. As a result, once the template is rendered, you have to manually bind of the `viewModel` in the `dataBound` event of the Combobox.

1. Check the number of rendered items. Zero items suggest that the `noDataTemplate` is rendered.

1. Manually invoke the binding of the `viewModel` by using the client API of the ComboBox.

```dojo

<div id="example">
    <script type="text/x-kendo-tmpl" id="template">
        <div>
            #=fruit#
            <button class="k-button" data-bind="click: addNew">Add new fruit</button>
        </div>
    </script>

    <script type="text/x-kendo-tmpl" id="noDataTemplate">
        <div>
            No fruit found. Do you want to add a new one - '#: instance.text() #' ?
        </div>
        <br />
        <button id="btnNoData" class="k-button" data-bind="click: addNew">Add new fruit</button>
</div>
</script>

Fruits: <select id="combobox" data-role="combobox" data-filter="startswith" data-bind="source:fruits,
                            events: {                              
                              dataBound: onDataBound
                              }" data-text-field="fruit" data-value-field="id" data-no-data-template="noDataTemplate" data-template="template">
            </select>
<br/><br/>

<script>
    $(document).ready(function(e) {
        var viewModel = kendo.observable({
            fruits: [{
                    fruit: "Apple",
                    id: 1
                },
                {
                    fruit: "Orange",
                    id: 2
                },
                {
                    fruit: "Cherry",
                    id: 3
                }
            ],
            addNew: function() {
                if (confirm("Are you sure?")) {}
            },

            onDataBound: function(e) {
                if(e.sender.items().length == 0)
                {
                    kendo.bind($("#btnNoData"), viewModel);
                }
            }

        });

        kendo.bind($("#example"), viewModel);

    })
</script>

```
