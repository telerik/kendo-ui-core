---
title: Post to iframe
page_title: Post to iframe
description: Post to iframe
---

# Post to iframe

The example below demonstrates how to post to the iframe content of the window

#### Example:

```html
    <button id="refresh" class="k-button k-primary">Post content to iframe</button>

    <script>
      $("#refresh").click(function(e) {
        e.preventDefault();

        var id = "target_iframe";

        var dialog = $("<div><iframe class='k-content-frame' name='" + id + "'></div>").kendoWindow({
          width: "615px",
          title: "Posting to iframe example",
          close: function() { this.destroy() },
          iframe: true
        });

        dialog.data("kendoWindow").center().open();

        $("<form />", {
            action: "http://www.example.com/",
            method: "post",
            target: id
        })
            .hide().appendTo("body")
               // add any data 
              .append("<input name='foo' />").find("[name=foo]").val("bar").end()
            .submit().remove();
      });
    </script>
```
