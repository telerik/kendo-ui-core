---
title: Expand the TabStrip height to 100%
page_title: Expand the TabStrip height to 100%
description: Expand the TabStrip height to 100%
---

# Expand the TabStrip height to 100%

The following runnable sample demonstrates how to make the TabStrip widget 100% high and resize together with the browser window.

When implementing the same behavior in a more complex client-side environment (HTML markup), take into account the following:

*Web standards require each element with a percentage height to have a parent element with explicit height. The rule applies recursively,
until an element with a pixel height is reached, or until the `html` element is reached (which would require a height style too).
Elements with a 100% height cannot have borders, paddings, margins or visible siblings.*

#### Example:

```html
    <style>

    html,
    body,
    #tabstrip-parent,
    #tabstrip {
      height: 100%;
      margin: 0;
      padding: 0;
      border-width: 0;
    }

    </style>
    
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
      
      tabStripElement.parent().attr("id", "tabstrip-parent");
      
      var tabStrip = tabStripElement.data("kendoTabStrip");

      var expandContentDivs = function(divs) {
        divs.height(tabStripElement.innerHeight() - tabStripElement.children(".k-tabstrip-items").outerHeight() - 16);
          // 16px are substracted to compensate for content div vertical paddings and borders
          // This amount can be calculated instead of hard-coded, if needed.
      }

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