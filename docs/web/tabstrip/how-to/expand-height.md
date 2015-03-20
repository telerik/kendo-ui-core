---
title: Expand the tab heigh to 100%
page_title: Expand the tab heigh to 100%
description: Expand the tab heigh to 100%
---

# Expand the tab heigh to 100%

The following runnable sample demonstrates how to expand the tab heigh to 100% of the parent container.

#### Example:

```html
    <div id="tabstrip">
      <ul>
        <li class="k-state-active">Item 1</li>
        <li>Item 2</li>
      </ul>
      <div>
        Content 1
        <p><button type="button" class="k-button" id="appendButton">Append Item</button></p>
      </div>
      <div>
        Content 2
      </div>
    </div>
    <script>
      var resizeAll = function() {
        expandContentDivs(tabStripElement.children(".k-content")); 
      }

      var tabStripElement = $("#tabstrip").kendoTabStrip({
        animation: {
          open: {
            effects: "fade"
          }
        }
      });
      var tabStrip = tabStripElement.data("kendoTabStrip");

      var expandContentDivs = function(divs) {
        divs.height(tabStripElement.innerHeight() - tabStripElement.children(".k-tabstrip-items").outerHeight() - 16);
      }
      // 16px are substracted to compensate for content div vertical paddings and borders

      tabStripElement.parent().attr("id", "tabstrip-parent");

      resizeAll();

      $(window).resize(function(){
        resizeAll();
      });

      $("#appendButton").click(function(){
        tabStrip.append({
          text: "Item N",
          content: "Appended Item Content"
        });
        expandContentDivs(tabStripElement.children(".k-content").last());
      });
    </script>
```