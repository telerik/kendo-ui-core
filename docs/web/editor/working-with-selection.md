---
title: Working with selection
page_title: Working with selection and ranges in the Editor UI widget | Kendo UI Documentation
description: This help topic explains how to use the Editor range objects.
position: 4
---

# Overview

The Editor widget works with standard [Range objects](https://developer.mozilla.org/en/docs/Web/API/Range), providing a polyfill for versions of IE that do not support them in full.

## Set the editor selection

In order to set the editor selection, you need to create a Range object that specifies the desired selection, and pass it to the [selectRange method](../../../api/web/editor#methods-selectRange):

    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor().data("kendoEditor");

      editor.value("<strong>foo</strong><em>bar</em>");

      var strong = $("strong", editor.body)[0];
      var em = $("em", editor.body)[0]

      // get a Range object within the editor document
      var range = editor.createRange();

      // set range start after "f"
      range.setStart(strong.firstChild, 1);

      // set range end before "r"
      range.setEnd(em.firstChild, 2);

      // set editor selection to given range
      editor.selectRange(range);
    </script>

It is important to notice that the second parameter of the setStart and setEnd methods work differently with Element and Text nodes. For Text nodes, the range boundary is set between the characters of the node: 0 means before all characters, 1 means between the first and second character. For Element nodes, the range boundary is set between the child nodes: 0 means at the start of the element, and element.childNodes.length means after all children. For more information, see the [in-depth tutorial on Range objects on Quirksmode](http://www.quirksmode.org/dom/range_intro.html).
