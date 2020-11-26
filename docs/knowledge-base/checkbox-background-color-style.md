---
title: Change CheckBox Color
description: An example on how to add a new color style to the Kendo UI CheckBox by using CSS.
type: how-to
page_title: Implement New Color Schemes with CSS Styling | Kendo UI CheckBox for jQuery
slug: checkbox-background-color-style
tags: checkbox, background, color, style
ticketid: 1140909
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>CheckBox for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2020.3.1021</td>
 </tr>
</table>

## Description

How can I change the colors of a CheckBox?   

## Solution

Set a different [`color`](https://www.w3schools.com/cssref/pr_text_color.asp) and [`background`](https://www.w3schools.com/css/css_background.asp) color by using CSS.  

```
/*empty checkbox*/
.k-checkbox {
    background: green;
}

/*checked checkbox*/
.k-checkbox:checked {
    background: red;
    color: white;
}
```

The following example demonstrates how to render a list of CheckBoxes with a new color scheme.

```dojo
    <style>
      /*Empty checkbox*/
      .k-checkbox {
        background: green;
      }

      /*Checked checkbox*/
      .k-checkbox:checked {
        background: red;
        color: white;
      }


      /*Additional Styling For Example*/
      .fieldlist {
        margin: 0 0 -1em;
        padding: 0;
      }

      .fieldlist li {
        list-style: none;
        padding-bottom: 1em;
      }
    </style>

    <div id="example">
      <h4>Choose Extra Equipment</h4>
      <ul class="fieldlist">
        <li>
          <input type="checkbox" id="eq1" class="k-checkbox" checked="checked">
          <label class="k-checkbox-label" for="eq1">Rear side airbags</label>
        </li>
        <li>
          <input type="checkbox" id="eq2" class="k-checkbox" checked="checked" disabled="disabled">
          <label class="k-checkbox-label" for="eq2">Leather trim</label>
        </li>
        <li>
          <input type="checkbox" id="eq3" class="k-checkbox">
          <label class="k-checkbox-label" for="eq3">Luggage compartment cover</label>
        </li>
        <li>
          <input type="checkbox" id="eq4" class="k-checkbox">
          <label class="k-checkbox-label" for="eq4">Heated front and rear seats</label>
        </li>
        <li>
          <input type="checkbox" id="eq5" class="k-checkbox">
          <label class="k-checkbox-label" for="eq5">Dual-zone air conditioning</label>
        </li>
        <li>
          <input type="checkbox" id="eq6" class="k-checkbox">
          <label class="k-checkbox-label" for="eq6">Rain sensor</label>
        </li>
        <li>
          <input type="checkbox" id="eeeeq4" class="k-checkbox" disabled="disabled">
          <label class="k-checkbox-label" for="eeeeq4">Towbar preparation</label>
        </li>
      </ul>
    </div>  
```

## See Also

* [Demo on Styling CheckBoxes](https://demos.telerik.com/kendo-ui/styling/checkboxes)
