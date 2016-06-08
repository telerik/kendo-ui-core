---
title: Add Max-Length Validation
page_title: Add Max-Length Validation | Kendo UI Editor
description: "Learn how to add max-length validation in the Kendo UI Editor widget."
slug: howto_add_max_length_validation_editor
---

# Add Max-Length Validation

The example below demonstrates how to define custom Kendo UI validators to check the length of the text content, or the length of the HTML content in a Kendo UI Editor.

###### Example

```html
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

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_google_webfonts_editor %}).
