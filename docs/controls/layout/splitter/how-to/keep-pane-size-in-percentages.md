---
title: Keep Pane Size in Percentages
page_title: Keep Pane Size in Percentages | Kendo UI Splitter
description: "Learn how to keep the Kendo UI Splitter pane sizes in percentages upon user resize."
slug: howto_keeppanesizepercentages_splitter
---

# Keep Pane Size in Percentages

The example below demonstrates how to keep the Kendo UI Splitter pane sizes in percentages upon user resizes.

###### Example

```html
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
          // prevent endless recursion from resizes
          if (!this.appliesSizes) {
            this.appliesSizes = true;

            // calculate pane width
            var element = this.element;
            var pane = element.find(".k-pane:first");
            var ratio = Math.ceil(pane.width() * 100 / element.width());

            // set pane width in percentages
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

Other articles on Kendo UI Splitter:

* [Splitter JavaScript API Reference](/api/javascript/ui/splitter)
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100heightandautoresize_splitter %})
