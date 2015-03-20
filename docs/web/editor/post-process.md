---
title: Post-processing
page_title: Post-processing the editor content | Kendo UI Documentation
description: The documentation guide will show how to post-process the Editor content so that it fits your needs.
position: 3
---

# Post-processing the editor content

## Post-processing the editor value before sending it to the server

If the editor is within a `<form>` element, a good moment to post-process its contents is right before the form is posted to the server, in the `submit` event.

### Example - remove all paragraphs before posting to server
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
