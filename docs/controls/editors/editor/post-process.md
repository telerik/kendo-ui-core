---
title: Post-Processing Content
page_title: jQuery Editor Documentation | Post-Processing Content
description: "Get started with the jQuery Editor by Kendo UI and learn how to post-process its content so it fits your needs."
slug: post_process_content_editor_widget
position: 10
---

# Post-Processing Content

If the Editor is within a `<form>` element, the convenient moment to post-process its content is right before the `<form>` is posted to the server in the `submit` event.

The following example demonstrates how to remove all paragraphs before posting the content to the server.

    <form>
      <textarea id="comments"></textarea>

      <button type="submit">Submit</button>
    </form>

    <script>
    var comments = $("#comments");

    comments.kendoEditor({ encoded: false });

    $("form").on("submit", function() {
      var value = comments.data("kendoEditor").value();

      // Strip all paragraphs.
      value = value
        .replace(/<p[^>]*>/g, "")
        .replace(/<\/p>/g, "<br />");

      comments.val(value);
    });
    </script>

<!--*-->
## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
