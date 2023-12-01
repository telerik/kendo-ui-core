---
title: Prevent Default Behavior of Enter key in Editor
page_title: Prevent Default Behavior of Enter key in Editor - Kendo UI for jQuery Editor
description: "Learn how to prevent the default behavior of Enter key in the Kendo UI Editor for jQuery."
slug: prevent-enter-in-editor
tags: editor, prevent, enter
component: editor
type: how-to
ticketid: 1386798
res_type: kb
---

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
</table>

## Description

How can I prevent the default behavior of the Enter key in the Editor widget?

## Solution

* You can handle the [`execute`](/api/javascript/ui/editor/events/execute) event of the Editor component and prevent the default behavior of the executing command, corresponding to the event of the Enter button - "insertParagraph".

The following example demonstrates how to achieve the desired scenario: 
```dojo
<textarea id="editor"></textarea>
<script>
    $("#editor").kendoEditor({
        execute: function(e){         
            if(e.name === "insertParagraph"){
                e.preventDefault();
            }
        }
    });
</script>
```

## See Also
* [jQuery Editor Events (Demo)](/editor/events)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)