---
title: Add maxLength Validation in the Editor
page_title: Add maxLength Validation in the Editor
description: "Learn how to add a maxLength validation to the Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/add-maxlength-validation, /controls/editors/editor/how-to/editing/add-maxlength-validation
slug: howto_add_max_length_validation_editor
tags: telerik, kendo, jquery, editor, add, maxLength, maximum, length, validation
component: editor
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I define custom Kendo UI validators to check the length of the content in a Kendo UI for jQuery Editor?

## Solution

The following example demonstrates how to define custom Kendo UI validators to check the length of the text content or the length of the HTML content in a Kendo UI Editor.

```dojo
  <form id="employeeForm" novalidate="novalidate">
    <p>Both editors contain 100 characters.</p>

    <p>This editor has a max <em>text</em> length of 100 characters, so adding more formatting does not invalidate it</p>

    <span data-for='editor-maxtext' class='k-invalid-msg'></span>

    <textarea name="editor-maxtext" data-role="editor"
              data-maxtextlength="100"
              data-maxtextlength-msg="Text must be shorter than 100 chars">LoremLorem&lt;strong&gt;Lorem&lt;/strong&gt;LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem</textarea>

    <p>This editor has a max <em>html</em> length of 100 characters, so adding more formatting invalidates it</p>
    <span data-for='editor-maxhtml' class='k-invalid-msg'></span>

    <textarea name="editor-maxhtml" data-role="editor"
              data-maxhtmllength="100"
              data-maxhtmllength-msg="HTML must be shorter than 100 chars">LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem</textarea>

    <button class="k-button k-primary">Submit</button>
  </form>

  <script>
    var container = $("#employeeForm");

    kendo.init(container);

    container.kendoValidator({
      rules: {
        maxTextLength: function (textarea) {
          if (textarea.is("[data-maxtextlength-msg]") && textarea.val() != "") {
            var maxlength = textarea.attr("data-maxtextlength");
            var value = textarea.data("kendoEditor").value();
            return value.replace(/<[^>]+>/g, "").length <= maxlength;
          }

          return true;
        },
        maxHtmlLength: function(textarea) {
          if (textarea.is("[data-maxhtmllength-msg]") && textarea.val() != "") {
            var maxlength = textarea.attr("data-maxhtmllength");
            var value = textarea.data("kendoEditor").value();
            return value.length <= maxlength;
          }

          return true;
        }
      }
    });

    function save(e) {
      e.preventDefault();

      var validator = $("#employeeForm").data("kendoValidator");
      if (validator.validate()) {
        alert("Data saved");
      }
    }

    $("body").on("click", ".k-button", save);

  </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
