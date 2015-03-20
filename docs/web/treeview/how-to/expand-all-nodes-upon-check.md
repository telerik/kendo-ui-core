---
title: Expand all nodes upon check
page_title: Expand all nodes upon check
description: Expand all nodes upon check
---

# Expand all nodes upon check

The example below demonstrates how to expand all child nodes when checking a root node.

#### Example

```html
  <div id="tree"></div>

  <script>
    $("#tree").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },
      check: function(e) {
        this.expandRoot = e.node;

        this.expand($(this.expandRoot).find(".k-item").addBack());
      },
      dataBound: function(e) {
        if (this.expandRoot) {
          this.expand(e.node.find(".k-item"));
        }
      },

      // mocked datasource for the example
      dataSource: {
        transport: {
          read: function(options) {
            if (!window.counter) window.counter = 1;

            // stub server
            setTimeout(function() {
              if (counter < 20) {
                options.success([
                  { text: "item " + (counter++) },
                  { text: "item " + (counter++) },
                  { text: "item " + (counter++), hasChildren: false }
                ]);
              } else {
                options.success([]);
              }
            }, 500);
          }
        },
        schema: {
          model: {
            id: "id",
            hasChildren: "hasChildren"
          }
        }
      }
    });
  </script>
```
