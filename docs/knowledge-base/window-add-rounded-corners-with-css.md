---
title: Add Rounded Corners with CSS
description: Include rounded corners using CSS for the Kendo UI Window.
type: how-to
page_title: Style with Rounded Corners | Kendo UI Window
slug: window-add-rounded-corners-with-css
position: 
tags: window, add, style, corners, css, rounded
ticketid: 1440987
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Window for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I set the Kendo UI Window's corners so they appear more curved?

## Solution
Using CSS, set the Kendo UI Window to have more defined rounded corners.

```css
      .k-window {
        border-radius: 20px;
        overflow: hidden;
      }
```
### Example
```dojo
    <style>
      .k-window {
        border-radius: 20px;
        overflow: hidden;
      }
    </style>

    <div id="example">
      <div id="window">
        <p>Alvar Aalto is one of the greatest names in modern architecture and design. Glassblowers at the iittala factory still meticulously handcraft the legendary vases that are variations on one theme, fluid organic shapes that let the end user decide the use. Interpretations of the shape in new colors and materials add to the growing Alvar Aalto Collection that remains true to his original design.</p>

        <p>Born Hugo Alvar Henrik Aalto (February 3, 1898 - May 11, 1976) in Kuortane, Finland, was noted for his humanistic approach to modernism. He studied architecture at the Helsinki University of Technology from 1916 to 1921. In 1924 he married architect Aino Marsio.</p>

        <p>Alvar Aalto was one of the first and most influential architects of the Scandinavian modern movement, and a member of the Congres Internationaux d'Architecture Moderne. Major architectural works include the Finlandia Hall in Helsinki, Finland, and the campus of Helsinki University of Technology.</p>

        <p>Source: <a href="https://www.aalto.com/about-alvar-aalto.html" title="About Alvar Aalto">www.aalto.com</a></p>
      </div>

      <span id="undo" style="display:none" class="k-button hide-on-narrow">Click here to open the window.</span>

      <div class="responsive-message"></div>

      <script>
        $(document).ready(function() {
          var myWindow = $("#window"),
              undo = $("#undo");

          undo.click(function() {
            myWindow.data("kendoWindow").open();
            undo.fadeOut();
          });

          function onClose() {
            undo.fadeIn();
          }

          myWindow.kendoWindow({
            width: "600px",
            title: "About Alvar Aalto",
            visible: false,
            actions: [
              "Pin",
              "Minimize",
              "Maximize",
              "Close"
            ],
            close: onClose
          }).data("kendoWindow").center().open();
        });
      </script>
    </div>
```
