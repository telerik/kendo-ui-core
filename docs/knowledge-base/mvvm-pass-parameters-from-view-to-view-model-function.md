---
title: Pass Arguments from View to ViewModel Functions
description: An example on how to pass string parameters from the view to the viewModel function which controls an element visibility in Kendo UI.
type: how-to
page_title: Pass String Parameters from View to ViewModel Functions in MVVM | Kendo UI MVVM for jQuery
slug: mvvm-pass-parameters-from-view-to-view-model-function
tags: kendo, kendoui, mvvm, pass-parameters, visible, invisible
ticketid: 1138171
res_type: kb
component: mvvm
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MVVM</td>
 </tr>
</table>

## Description

I am building a screen where, depending on the selected option from a DropDownList, specific controls will be visible.

How can I use a single function that is defined in the `viewModel` to control the visibility of these elements? How can I pass a different argument to that function according to the actual HTML element it is used for?   

## Solution

Pass a single string argument as a function parameter. For example, if you need to pass an array, pass it as a string with a certain delimiter.

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
<div data-bind="visible: visibleTextBox('1q3')">
  <label for="amount">Textbox 1: </label>
  <input id="amount"
         data-role="numerictextbox"
         data-bind="value: defaultTextBox1Value"/>
</div>
<div data-bind="visible: visibleTextBox('2q4')">
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
    visibleTextBox: function(values) {
      var valuesArray = values.split('q');
      var currentSelectedOption = this.get('selectedOption');

      if (valuesArray.includes(currentSelectedOption.toString())) {
        return true;
      } else {
        return false;
      }
    }
  });
  kendo.bind($("body"), viewModel);
</script>
````

## See Also

* [MVVM in Kendo UI](https://docs.telerik.com/kendo-ui/framework/mvvm/overview)
