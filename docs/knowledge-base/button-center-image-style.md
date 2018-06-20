---
title: Center Image Within Kendo UI Button
description: An example showing how to center an image on a Kendo UI Button
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

I want to create a Kendo UI Button that is square in format and has the image centered in the middle of the button. 

The Kendo Button standard CSS displays a change in color around the picture when it is pressed, which is how I want it. The margins around the image should also be set to the smallest amount of space but still show all the default Kendo CSS.

## Solution

The image in a Kendo UI Button can be centered with minimal space using CSS.  

**For All Image Buttons:**
```css
  .k-button .k-image{
    margin: auto;
  }
  .k-button {
    padding: 0;
  }
```

**For a Specific Image Button:**
```css
  #imageButtonID .k-image{
    margin: auto;
  }
  #imageButtonID {
    padding: 0;
  }
```
The following demonstrates a Kendo UI Button showing the image with the implemented CSS:

```html
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

* [Kendo UI Button Demo - Images](https://demos.telerik.com/kendo-ui/button/images)
* [Kendo UI Button - Image Icons - Documentation](https://docs.telerik.com/kendo-ui/controls/navigation/button/overview#image-icons)
