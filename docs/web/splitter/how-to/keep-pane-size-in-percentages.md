---
title: Keep pane size in percentages
page_title: Keep pane size in percentages
description: Keep pane size in percentages
---

# Keep pane size in percentages

The example below demonstrates how to keep the splitter pane sizes in percentages upon user resizes

#### Example:

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
