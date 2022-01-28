---
title: Keep Pane Size in Percentage Points
page_title: Keep Pane Size in Percentage Points | Kendo UI Splitter
description: "Learn how to keep the Kendo UI Splitter pane sizes in percentages upon user resize."
slug: howto_keeppanesizepercentages_splitter
---

# Keep Pane Size in Percentage Points

The following example demonstrates how to keep the Kendo UI Splitter pane sizes in percentages upon user resizes.

```dojo
    <div id="splitter" style="height: 400px">
      <div>
        Left pane
      </div>
      <div>
        Content
      </div>
    </div>

    <script>
      $(document).ready(function() {
        function onResize(e) {
          // Prevent the endless recursion from resizes.
          if (!this.appliesSizes) {
            this.appliesSizes = true;

            // Calculate the pane width.
            var element = this.element;
            var pane = element.find(".k-pane:first");
            var ratio = Math.ceil(pane.width() * 100 / element.width());

            // Set the pane width in percentage points.
            this.size(pane, ratio + "%");

            this.appliesSizes = false;
          }
        }

        $("#splitter").kendoSplitter({
          panes: [
            { collapsible: true, size: "20%" },
            { collapsible: false }
          ],
          resize: onResize
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/index)
* [Using the API of the Splitter (Demo)](https://demos.telerik.com/kendo-ui/splitter/api)
* [JavaScript API Reference of the Splitter](/api/javascript/ui/splitter)
