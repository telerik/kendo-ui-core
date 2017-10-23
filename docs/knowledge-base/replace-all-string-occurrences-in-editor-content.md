---
title: Replace all string occurrences in Editor content
description: An example on how to replace all string occurrences in the Kendo UI Editor content.
type: how-to
page_title: Replace All String Occurrences | Kendo UI Editor
slug: replace-all-string-occurrences-in-editor-content
tags: replace, string, occurrences, content, editor
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
 </tr>
</table>

## Description

How can I replace all specific string occurences in the Kendo UI Editor content?

## Solution

* Use `deserioalization.custom` option of the Editor to plug a custom callback that will return the modified content.

```html
<div id="example">
    <div class="demo-section k-content">
        <textarea id="editor"></textarea>
    </div>
</div>

<script>
    $("#editor").kendoEditor({
      	value: "Random @text@ with several @placeholders@.",
        deserialization: {
          custom: function(html) {
            return html.replace(/@(.*?)@/gi, "strings");
          }
        }
    });
</script>

```
