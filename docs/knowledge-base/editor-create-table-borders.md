---
title: Create a Table with Borders in the Editor
description: An example on how to create a table with borders in the Kendo UI Editor.
type: how-to
page_title: Create a Table with Borders | Kendo UI Editor for jQuery
slug: editor-create-table-borders
tags: editor, table, create, borders
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI Editor</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2019.1.220 version</td>
 </tr>
</table>

## Description

How can I create a table with borders in the Editor?

## Solution

The Table Wizard allows you to set a table border size, color, and style. To apply borders to the table that was created with the **Create a table** tool, handle the `execute` event and add the styles to the respective elements.

```dojo
    <div id="example">
        <textarea id="editor">
        </textarea>
        <script>
            $(document).ready(function() {
                $("#editor").kendoEditor({
                    execute: function(e) {
                        var editor = this;
                        if (e.name == "createtable") {
                            setTimeout(function() {
                                var table = $(editor.body).find("table:not(.custom-table)");
                                table.addClass("custom-table");
                                table.attr("style", "border: 1px solid black;");
                                table.find("tr td")
                                    .each(function () {
                                    var currentStyle = $(this).attr("style");
                                    $(this).attr("style", currentStyle + " border: 1px solid black;");
                                });
                            }, 0);   
                        }
                    }
                });
            });
        </script>
    </div>
```

## See Also

* [API Reference of the Editor](/api/javascript/ui/editor)
