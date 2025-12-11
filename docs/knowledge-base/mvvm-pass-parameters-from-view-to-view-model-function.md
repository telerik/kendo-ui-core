---
title: Pass Arguments from View to ViewModel Functions
description: Learn how to pass string parameters from the view to the viewModel function which controls an element visibility in Kendo UI.
type: how-to
page_title: Pass String Parameters from View to ViewModel Functions in MVVM - Kendo UI MVVM for jQuery
slug: mvvm-pass-parameters-from-view-to-view-model-function
tags: kendo, kendoui, mvvm, pass-parameters, visible, invisible
ticketid: 1138171
res_type: kb
components: ["mvvm"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MVVM Architecture</td>
 </tr>
</table>

## Description

I am building a screen where, depending on the selected option from a DropDownList, specific controls will be visible.

How can I use a single function that is defined in the `viewModel` to control the visibility of these elements? How can I pass a different argument to that function according to the actual HTML element it is used for? 

## Solution

Passing arguments as a function parameter is not valid.  If a value from the View-Model requires processing before displaying it in the View, a method should be created and used instead.

>Bindings are not JavaScript code. Although bindings look like JavaScript code, they are not. The `<div data-bind="text: person.name.toLowerCase()"></div>` chunk of code is not a valid Kendo UI MVVM binding declaration. If a value from the View-Model requires processing before displaying it in the View, a method must be created and used instead. Note: Although the approach was working with older Kendo UI for jQuery versions, with the CSP compliance improvements introduced with the 2023 R1 release, the approach could not be used.

In the following example a TextBox will be visible if `Seelction 1` or `Selection 2` option is selected from the DropDownList.

````dojo
    <div>
      <label for="selection">Selection: </label>
      <input id="selection"
             data-role="dropdownlist"
             data-text-field="txt"
             data-value-field="id"
             data-bind="source: selectionDataSource,
                        value: selectedOption"/>
    </div>
    <div data-bind="visible: visibleTextBox1">
      <label for="amount">Textbox 1: </label>
      <input id="amount"
             data-role="numerictextbox"
             data-bind="value: defaultTextBox1Value"/>
    </div>
    <div data-bind="visible: visibleTextBox2">
      <label for="initialAmount">Textbox 2: </label>
      <input id="initialAmount"
             data-role="numerictextbox"
             data-bind="value: defaultTextBox2Value"/>
    </div>

    <script>
      var viewModel = kendo.observable({
        selectionDataSource: new kendo.data.DataSource({
          data: [
            { txt: "Selection 1", id: 1 },
            { txt: "Selection 2", id: 2 },
            { txt: "Selection 3", id: 3 },
            { txt: "Selection 4", id: 4 },
          ]
        }),
        defaultTextBox1Value: function() { return 1; },
        defaultTextBox2Value: function() { return 2; },
        selectedOption: 1,
        visibleTextBox1: function () {
          return this.get('selectedOption') === 1;
        },
        visibleTextBox2: function () {
          return this.get('selectedOption') === 2;
        }
      });
      kendo.bind($("body"), viewModel);
    </script>
````

## See Also

* [MVVM in Kendo UI](https://docs.telerik.com/kendo-ui/framework/mvvm/overview)
