---
title: Add max-length validation
page_title: Add max-length validation
description: Add max-length validation
---

# Add max-length validation

The example below demonstrates how to define custom kendo validators to check the length of the text content, or the length of the HTML content.

#### Example

```html
  <form id="employeeForm" data-role="validator" novalidate="novalidate">
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
