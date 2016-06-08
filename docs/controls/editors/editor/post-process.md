---
title: Post-Process Content
page_title: Post-Process Content | Kendo UI Editor
description: "Learn how to post-process the content of the Kendo UI Editor widget so it fits your needs."
slug: post_process_content_editor_widget
position: 3
---

# Post-Process Content

If the Editor is within a `<form>` element, the convenient moment to post-process its content is right before the `<form>` is posted to the server in the `submit` event.

###### Example - remove all paragraphs before posting the content to the server

    <form>
      <textarea id="comments"></textarea>

      <button type="submit">Submit</button>
    </form>

    <script>
    var comments = $("#comments");

    comments.kendoEditor({ encoded: false });

    $("form").on("submit", function() {
      var value = comments.data("kendoEditor").value();

      // strip all paragraphs
      value = value
        .replace(/<p[^>]*>/g, "")
        .replace(/<\/p>/g, "<br />");

      comments.val(value);
    });
    </script>

<!--*-->
## See Also

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Image Browser]({% slug image_browser_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Pasting]({% slug pasting_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
