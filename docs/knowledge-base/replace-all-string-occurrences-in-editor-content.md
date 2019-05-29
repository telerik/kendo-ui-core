---
title: Replace All String Occurrences in Editor Content
description: An example on how to replace all string occurrences in the Kendo UI Editor content.
type: how-to
page_title: Replace All String Occurrences | Kendo UI Editor for jQuery
slug: replace-all-string-occurrences-in-editor-content
tags: replace, string, occurrences, content, editor
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
 </tr>
</table>

## Description

How can I replace all specific string occurrences in the Kendo UI Editor content?

## Solution

Use the `deserioalization.custom` option of the Editor to plug a custom callback that will return the modified content.

```dojo
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
