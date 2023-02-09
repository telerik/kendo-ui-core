---
title: Disable TabStrip Content Scrolling
page_title: Disable TabStrip Content Scrolling 
description: "Learn how to disable the content scrolling of the Kendo UI for jQuery TabStrip."
slug: howto_disablecontentscrolling_tabstrip
previous_url: /controls/navigation/tabstrip/how-to/disable-content-scrolling
tags: telerik, kendo, jquery, tabstrip, disable, content, scrolling
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

How can I disable the scrolling of the content in a Kendo UI for jQuery TabStrip?

## Solution

The content containers of the TabStrip are scrollable by default, which allows the widget to display scrollbars if it has a fixed height and if it holds large content that cannot fit. 

If required, you can disable the TabStrip content scrolling to help in scenarios where the TabStrip hosts a widget, such as a Menu, that needs to overflow outside the TabStrip.

The milestones of the approach are:

* Apply an `overflow:visible` CSS style to the `div.k-content` elements that hold each TabStrip tab content.
* The `.k-content` class is used by other widgets too. Make sure the CSS selector targets only the appropriate elements.

The example below demonstrates how to disable content scrolling for a specific TabStrip instance only by using its `ID` in the CSS selector.



```dojo
    <div id="tabstrip1">
      <ul>
        <li class="k-active">
          First tab
        </li>
        <li>
          Second tab
        </li>
      </ul>
      <div style="height:100px">
        <p>Container is scrollable, the Menu group will open inside the TabStrip.</p>
            <ul id="menu1">
                <li>
                    First Item
                    <ul>
                        <li>Sub Item 1</li>
                        <li>Sub Item 2</li>
                        <li>Sub Item 3</li>
                        <li>Sub Item 4</li>
                    </ul>
                </li>
            </ul>        
      </div>
      <div>Second content container</div>
    </div>

    <br /><br />

    <div id="tabstrip2">
      <ul>
        <li class="k-active">
          First tab
        </li>
        <li>
          Second tab
        </li>
      </ul>
      <div style="height:100px">
        <p>Container is not scrollable, the Menu group will open outside the TabStrip.</p>
            <ul id="menu2">
                <li>
                    First Item
                    <ul>
                        <li>Sub Item 1</li>
                        <li>Sub Item 2</li>
                        <li>Sub Item 3</li>
                        <li>Sub Item 4</li>
                    </ul>
                </li>
            </ul>
      </div>
      <div>Second content container</div>
    </div>

    <style>

      #tabstrip2 > .k-content {
        overflow: visible;
      }

    </style>

    <script>

      $(function() {
        $("#tabstrip1").kendoTabStrip();
        $("#menu1").kendoMenu();

        $("#tabstrip2").kendoTabStrip();
        $("#menu2").kendoMenu();
      });

    </script>
```

## See Also

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Save Content Scroll Position]({% slug howto_savecontentscrollposition_tabstrip %})


