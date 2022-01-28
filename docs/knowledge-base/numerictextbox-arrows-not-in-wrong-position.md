---
title: Fix Position of Arrows in the NumericTextBox
description: An example on how to fix the position of arrows in a Kendo UI NumericTextBox for jQuery.
type: how-to
page_title: Fix Arrows That Are Not Centered | Kendo UI NumericTextBox
slug: numerictextbox-arrows-not-in-wrong-position
tags: numerictextbox, arrows, not, in, wrong, position, style, textbox, k-textbox
ticketid: 1405455
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>NumericTextBox for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

The arrows of the Kendo UI NumericTextBox appear to be shifted in the wrong location. How can I adjust them to be centered as expected?  

```dojo
    <input id="numeric" class="k-textbox" />

    <script>
      $(document).ready(function() {

        $("#numeric").kendoNumericTextBox({
          min: 0,
          max: 100,
          value: 1,
          format:"n0",
        });

      });
    </script>
```

## Solution

Usually, arrows are misplaced because of the inclusion of the `k-textbox` class in the `input` element. Remove the class to fix the appearance of the NumericTextBox.

```dojo
    <input id="numeric" />

    <script>
      $(document).ready(function() {

        $("#numeric").kendoNumericTextBox({
          min: 0,
          max: 100,
          value: 1,
          format:"n0",
        });

      });
    </script>
```
