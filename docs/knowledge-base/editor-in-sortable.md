---
title: Missing Content when Drag Dropping Kendo Editor
description: An example on how to refresh Kendo UI Editor after drag drop in Sortable.
type: troubleshooting
page_title: Refresh Editor after Drag Drop in Sortable | Kendo UI Editor for jQuery
slug: editor-in-sortable
tags: editor, sortable, content, refresh
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI Editor</td>
 </tr>
</table>

## Description

Editor within Sortable loses it's content when dragged.

## Solution

Because of the embedded `<iframe>` when changing the position of the Editor widget in the DOM, the widget will need its [refresh()](/api/javascript/ui/editor/methods/refresh) method to be called to properly display its content again. Here you could find a small sample demonstrating that.

```dojo
    <ul id="sortable">
        <li>Editor <textarea id="editor1" rows="10" cols="30">Editor content</textarea></li>
        <li>Textarea <textarea id="editor2" rows="10" cols="30"></textarea></li>
        <li>DropDownList <input id="ddl"/></li>
        <li>iframe <span id="test"></span></li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            ignore: "table, textarea, input",
            change: function(e) {
                var editor = $("#editor1").getKendoEditor();

                if (!!editor) {
                    editor.refresh();
                }
            }
        });

        $("#editor1").kendoEditor()

        $("#ddl").kendoDropDownList({
            dataSource: ["A", "B"]
        })

        var iframe = document.createElement('iframe');
        document.getElementById('test').appendChild(iframe);
        iframe.contentWindow.document.write('<div>foo</div>');
    </script>
```

## See Also

* [API Reference of the Editor](/api/javascript/ui/editor)
