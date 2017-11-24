---
title: Place Input to the Right of Label when Using Checkbox Styling
description: An example on how to move the checkbox input to the right when using Checkbox Styling.
type: how-to
page_title: Place Input to the Right of Label when Using Checkbox Styling
slug: checkbox-styling-right-side
tags: checkbox, styling, right, label, to the right, input
ticketid: 1141307
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

When using Checkbox Styling [as shown in this Demo](http://demos.telerik.com/kendo-ui/styling/checkboxes), it stops working if I move the `input` element to the right of the `label`.

## Solution

The Kendo UI Checkbox Styling requires the rendering to have first the checkbox, then the label tag, so that the latter can be styled, based on the checkbox state:

````css
.k-checkbox:checked + .k-checkbox-label {}
````

However, you can have more than one label per input; leave the second `k-checkbox-label` blank, and place the text in a different label tag before the checkbox:

```html
<div>
  <h4>Choose Extra Equipment</h4>
  <ul class="fieldlist">
    <li>
      <label for="eq1">Rear side airbags</label>
      <input type="checkbox" id="eq1" class="k-checkbox" checked="checked">
      <label class="k-checkbox-label" for="eq1"></label>
    </li>
    <li>
      <label for="eq2">Leather trim</label>
      <input type="checkbox" id="eq2" class="k-checkbox" checked="checked" disabled="disabled">
      <label class="k-checkbox-label" for="eq2"></label>
    </li>
    <li>
      <label for="eq3">Luggage compartment cover</label>
      <input type="checkbox" id="eq3" class="k-checkbox">
      <label class="k-checkbox-label" for="eq3"></label>
    </li>
    <li>
      <label for="eq4">Heated front and rear seats</label>
      <input type="checkbox" id="eq4" class="k-checkbox">
      <label class="k-checkbox-label" for="eq4"></label>
    </li>
    <li>
      <label for="eq5">Dual-zone air conditioning</label>
      <input type="checkbox" id="eq5" class="k-checkbox">
      <label class="k-checkbox-label" for="eq5"></label>
    </li>
    <li>
      <label for="eq6">Rain sensor</label>
      <input type="checkbox" id="eq6" class="k-checkbox">
      <label class="k-checkbox-label" for="eq6"></label>
    </li>
    <li>
      <label for="eq7">Towbar preparation</label>
      <input type="checkbox" id="eq7" class="k-checkbox" disabled="disabled">
      <label class="k-checkbox-label" for="eq7"></label>
    </li>
  </ul>
</div>
<style>
  .fieldlist {
    margin: 0 0 -1em;
    padding: 0;
  }

  .fieldlist li {
    list-style: none;
    padding-bottom: 1em;
  }
</style>
```
