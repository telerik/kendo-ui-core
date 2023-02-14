---
title: Expand the TabStrip to 100% Height and Auto-Resize
page_title: Expand the TabStrip to 100% Height and Auto-Resize
description: "Learn how to expand the Kendo UI TabStrip widget to 100% height and make it resize together with the browser window."
slug: howto_expandto100percentheightautoresize_tabstrip
previous_url: /controls/navigation/tabstrip/how-to/expand-height
tags: telerik, kendo, jquery, tabstrip, expand, to, 100%, percent, height, and, autoresize
component: tabstrip
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TabStrip for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I applt a 100-percent height to the Kendo UI for jQuery TabStrip and auto-resize the control?

## Solution

When making the TabStrip 100% high, keep in mind that web standards require elements with percentage height to have a parent element with an explicit height. This rule applies recursively until either an element with a pixel height, or the `<html>` element, is reached. 100% high elements cannot have borders, paddings, margins, or visible siblings.

The milestones of the approach are:

* Make the TabStrip `<div>` and its auto-generated parent `<div>` 100% high
* Disable TabStrip animations or use a `fade` animation. The default `expand` animation is not going to work.
* Calculate the height of the TabStrip content containers based on the height of the widget `<div>`.

The example below demonstrates how to make the TabStrip widget 100% high and resize together with the browser window.



```dojo
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
        <li class="k-active">Item 1</li>
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
        var visibleDiv = divs.filter(":visible");
        divs.height(tabStripElement.innerHeight()
                    - tabStripElement.children(".k-tabstrip-items").outerHeight()
                    - parseFloat(visibleDiv.css("padding-top"))
                    - parseFloat(visibleDiv.css("padding-bottom"))
                    - parseFloat(visibleDiv.css("border-top-width"))
                    - parseFloat(visibleDiv.css("border-bottom-width"))
                    - parseFloat(visibleDiv.css("margin-bottom")));
                    // all of the above padding/margin/border calculations can be replaced by a single hard-coded number for improved performance
      }

      resizeAll();

      $(window).resize(function(){
        resizeAll();
      });

      $("#appendButton").kendoButton({
        click:function(){
          tabStrip.append({
            text: "Item N",
            content: "Appended Item Content"
          });
          resizeAll();
        }
      })
    </script>
```

## See Also

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
