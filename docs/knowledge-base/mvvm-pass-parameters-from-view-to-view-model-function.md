---
title: How to Pass an Argument from View to a ViewModel Function?
description: How to pass string parameters from view to viewModel function that controls an element visibility
type: how-to
page_title: In MVVM Pass String Parameters from View to ViewModel Function
slug: mvvm-pass-parameters-from-view-to-view-model-function
position: 0
tags: kendo, kendoui, mvvm, pass-parameters, visible, invisible
ticketid: 1138171
res_type: kb

component: mvvm
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>MVVM for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

I am building a screen where specific controls are going to be visible depending on the option selected in a DropDownList. I would like to be able to use a single function defined in the viewModel to control these elements visibility. Therefore, I want to pass a different argument to that function, according to the actual HTML element it is used for. Is this achievable?   

## Solution
  
You could pass a single string argument as function parameter in this case. If for example, you need to pass an array, you could pass it as a string with certain delimiter:

````html
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

* [Kendo MVVM Documentation](https://docs.telerik.com/kendo-ui/framework/mvvm/overview)
