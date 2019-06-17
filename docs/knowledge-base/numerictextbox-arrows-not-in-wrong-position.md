---
title: Fix Position of Arrows in Kendo UI NumericTextBox
description: An example demonstrating how to fix position of arrows
type: how-to
page_title: Fix Arrows Not Centered | Kendo UI NumericTextBox
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

The Kendo UI NumericTextBox's arrows appear to be shifted in the wrong location.  How can I adjust them to be centered as expected?  
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

A common reason for the arrows to be misplaced is due to the inclusion of the **k-textbox** class in the input element.  By removing the class, the Kendo UI NumericTextBox's appearance will be fixed.

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
