---
title: Add Footer with Buttons to the Window
description: An example on how to add a footer with buttons to a resizable Kendo UI Window.
type: how-to
page_title: Add Footer with Buttons | Kendo UI Window
slug: window-add-footer-with-buttons
tags: window, footer, buttons, resizable, scrollable
ticketid: 1142513
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Window</td>
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

How can I add a footer with buttons to a resizable and scrollable Kendo UI Window?

## Solution

Position the footer with the custom buttons at the bottom of the Window by using the following CSS rules.  

```dojo
<div id="window">
  <div class="armchair"> Artek Alvar Aalto - Armchair 402
    <p>Alvar Aalto is one of the greatest names in modern architecture and design. Glassblowers at the iittala factory still meticulously handcraft the legendary vases that are variations on one theme, fluid organic shapes that let the end user decide the use. Interpretations of the shape in new colors and materials add to the growing Alvar Aalto Collection that remains true to his original design.</p>

    <p>Born Hugo Alvar Henrik Aalto (February 3, 1898 - May 11, 1976) in Kuortane, Finland, was noted for his humanistic approach to modernism. He studied architecture at the Helsinki University of Technology from 1916 to 1921. In 1924 he married architect Aino Marsio.</p>

    <p>Alvar Aalto was one of the first and most influential architects of the Scandinavian modern movement, and a member of the Congres Internationaux d'Architecture Moderne. Major architectural works include the Finlandia Hall in Helsinki, Finland, and the campus of Helsinki University of Technology.</p>
  </div>
  <div class="window-footer">
    <button type="button" class="k-button">Close</button>
    <button type="button" class="k-primary k-button">Save changes</button>
  </div>
</div>

<script>
  $(document).ready(function() {
    $("#window").kendoWindow({
      width: "300px",
      title: "About Alvar Aalto",
      actions: [
        "Pin",
        "Minimize",
        "Maximize",
        "Close"
      ],
      height: 500
    });        
  });
</script>

<style scoped>
  .armchair{
    overflow: auto;
    height: calc(100% - 90px);
    padding: 10px
  }
  .window-footer{
    position: absolute;
    bottom: 0;
    display: block;
    width: 95%;
    margin-top: 150px;
    padding: 19px 0 20px;
    text-align: right;
    border-top: 1px solid #e5e5e5;
  }
</style>
```

## See Also

* [Kendo UI Window Overview](https://docs.telerik.com/kendo-ui/controls/layout/window/overview)
