---
title: Prevent script execution in the input of the kendo.prompt predefined dialog using DOMPurify.
description: Learn how to prevent script execution in the input of the kendo.prompt predefined dialog.
type: how-to
page_title:  Prevent script execution in the input of the kendo.prompt predefined dialog using DOMPurify - Kendo UI Dialog for jQuery
slug: dialog-prevent-js-execution
tags: dialog, xss
ticketid: 1510265
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Dialog for jQuery</td>
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
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How to prevent JavaScript execution in the input of the kendo.prompt Dialog?

If you type some JavaScript in the kendo.prompt input field, it will execute. The reason for the observed behavior is because the application is not sanitizing content. While the responsibility for that falls to the developer, below you will find a small example how to prevent JavaScript execution using the [DOMPurify library](https://github.com/cure53/DOMPurify).


```dojo
	<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.0.12/purify.min.js"></script>

    <div id="example">
      <button id="promptBtn" class="k-button">kendo.prompt</button>

      <script>

        //Sanitized data from input
        function sanitizeHtml(html) {
          var temp = $("<div></div>").html(window.DOMPurify.sanitize(html));
          return temp.html() || "\ufeff";
        }

        $("#promptBtn").on("click", function () {
          kendo.prompt("Please, enter a arbitrary value:", "any value").then(function (data) {

            //Get the cleaned data from the function
            var cleanedData = sanitizeHtml(data);

						//Output your results
            kendo.alert(kendo.format("The value that you entered is '{0}'", cleanedData));

          }, function () {

            //Canceled Prompt
            kendo.alert("Cancel entering value.");
          })
        });
      </script>
    </div>
```
