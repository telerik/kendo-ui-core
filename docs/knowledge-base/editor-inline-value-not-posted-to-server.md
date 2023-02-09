---
title: Inline Editor Value Is Not Posted to the Server
page_title: Inline Editor Value Is Not Posted to the Server
description: "Learn how to handle the Kendo UI for jQuery Editor when its inline value is not posted to the server."
slug: editor_inline_value_not_posted_server
tags: telerik, progress, kendoui, jquery, editor, inline, value, is, not, posted, on, the, server 
type: troubleshooting
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The inline jQuery Editor value is not posted to the server.

## Cause 

Because the inline Editor is initialized from a non-`form` element, it is not posted to the server by design.

## Solution

To submit the value of the Editor along with the `form`, use the approach demonstrated in the following example.

    <form>
      <div id="comment" contentEditable></div>

      <button class="k-button">Submit</button>
    </form>

    <script>
      $("form").on("submit", function() {
        var form = $(this);

        // For each Editor in the form...
        form.find("[data-role=editor]").each(function() {
          var editor = $(this).data("kendoEditor");

          // ... append a hidden input that holds the Editor value.
          $("<input type='hidden' />")
            .attr("name", editor.element.attr("id"))
            .val(editor.value())
            .appendTo(form);
        });
      });
    </script>

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
