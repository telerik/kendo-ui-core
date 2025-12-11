---
title: Access and remove elements from Editor's insert link popup
page_title: How to access and remove elements from Editor's insert link popup?
description: An example on access and remove elements from insert link popup in the Telerik UI for {{ site.product }} Editor.
type: how-to
slug: editor-access-link-popup-elements
tags: editor, link, access
res_type: kb
components: ["general"]
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Editor</td>
 </tr>
</table>

## Description

How to access and remove Tooltip label and input from Editor's insert link popup?


## Solution

You have two options to achieve this requirement:

1. Using CSS:

```CSS
<style>
    .k-editor-window #k-editor-link-title-form-label,
    .k-editor-window div[data-container-for="k-editor-link-title"] {
        display: none;
    }
</style>
```

2. Using javascript:
```HTML
@(Html.Kendo().Editor()
          .Name("editor")
          .Events(ev => ev.Execute("onExecute"))
          .Value(@<text>
               Transform this text to a link
        </text>)
    )
<script>
    function onExecute(e) {
        setTimeout(function () {
            $("#k-editor-link-title-form-label").hide();
            $('div[data-container-for="k-editor-link-title"]').hide();
        });
    }
</script>
```


