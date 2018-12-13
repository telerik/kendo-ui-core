---
title: Center Image within the Button
description: An example on how to center an image in a Kendo UI Button.
type: how-to
page_title: Center Image with Minimal Space | Kendo UI Button
slug: button-center-image-style
tags: button, center, image, style
ticketid: 1156939
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Button for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I create a square Kendo UI Button which has a centered image in the middle and which meets the following requirements?
* The standard CSS of the Button display a change in the color around the picture when it is pressed.
* The margins around the image are set to the smallest possible space and, yet, show all default Kendo UI CSS.

## Solution

To center the image in a Button with a minimum space, use CSS.  

The following example demonstrates how to render a centered image for all Buttons.

```css
  .k-button .k-image{
    margin: auto;
  }
  .k-button {
    padding: 0;
  }
```

The following example demonstrates how to render a centered image for a specific Button.

```css
  #imageButtonID .k-image{
    margin: auto;
  }
  #imageButtonID {
    padding: 0;
  }
```

The following example demonstrates the full implementation of the suggested approach.

```dojo
    <style type="text/css">
      #imageButton .k-image{
        margin: auto;
      }
      #imageButton {
        padding: 0;
      }

    </style>

    <button type="button" id="imageButton"><img class="k-image" alt="myUser"/><span/></button>

    <script>
      $(document).ready(function() {
        $("#imageButton").kendoButton({
          imageUrl: "https://demos.telerik.com/kendo-ui/content/chat/User.png"
        });
      });
    </script>
```

## See Also

* [Demo on Adding Images in the Kendo UI Button](https://demos.telerik.com/kendo-ui/button/images)
* [Kendo UI Documentation on Image Icons in the Button](https://docs.telerik.com/kendo-ui/controls/navigation/button/overview#image-icons)
