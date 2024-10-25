---
title: Change CheckBox Color
description: Learn how to add a new color style to the Kendo UI CheckBox by using CSS.
type: how-to
page_title: Implement New Color Schemes with CSS Styling - Kendo UI CheckBox for jQuery
slug: checkbox-background-color-style
tags: checkbox, background, color, style
ticketid: 1140909
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® CheckBox for jQuery</td>
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
          <input type="checkbox" id="eq1" checked="checked">
        </li>
        <li>
          <input type="checkbox" id="eq2" checked="checked">
        </li>
        <li>
          <input type="checkbox" id="eq3">
        </li>
        <li>
          <input type="checkbox" id="eq4">
        </li>
        <li>
          <input type="checkbox" id="eq5">
        </li>
        <li>
          <input type="checkbox" id="eq6">
        </li>
        <li>
          <input type="checkbox" id="eq7">
        </li>
      </ul>
    </div>  
    <script>
      $('#eq1').kendoCheckBox({
        checked: true,
        label: "Rear side airbags"
      });

      $('#eq2').kendoCheckBox({
        checked: true,
        label: "Leather trim",
        enabled: false
      });

      $('#eq3').kendoCheckBox({
        label: "Luggage compartment cover"
      });

      $('#eq4').kendoCheckBox({
        label: "Heated front and rear seats"
      });

      $('#eq5').kendoCheckBox({
        label: "Dual-zone air conditioning"
      });

      $('#eq6').kendoCheckBox({
        label: "Rain sensor"
      });

      $('#eq7').kendoCheckBox({
        label: "Towbar preparation",
        enabled: false
      });
    </script>
```

## See Also

* [Demo on Styling CheckBoxes](https://demos.telerik.com/kendo-ui/styling/checkboxes)
