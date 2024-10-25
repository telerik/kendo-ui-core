---
title: Use Custom Content Containers in the PanelBar
page_title: Use Custom Content Containers in the PanelBar 
description: "Learn how to use custom content containers in the Kendo UI PanelBar component."
slug: howto_use_custom_content_containers_in_the_panelbar_widget
previous_url: /controls/navigation/panelbar/how-to/use-custom-content-containers
tags: telerik, kendo, jquery, panelbar, use, custom, content, containers
component: panelbar
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PanelBar for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use custom content containers in the Kendo UI PanelBar?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <style>
      /* for first panelbar */
      .scrollable,
      /* for second panelbar */
      #panelbar2 .k-group
      {
        max-height: 100px;
        overflow: auto;
      }

      /* for both panelbars */
      .k-panelbar,
      p
      {
        width: 60%;
        margin: 2em auto;
      }

      html
      {
        font: 12px sans-serif;
      }
    </style>
    <p>PanelBar 1 using custom content containers</p>
    <ul id="panelbar1">
      <li class="k-active">
        <span>Item 1</span>
        <div>
          <div class="scrollable">Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br />Content 1<br /></div>
        </div>
      </li>
      <li>
        <span>Item 2</span>
        <div>
          <div class="scrollable">Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br />Content 2<br /></div>
        </div>
      </li>
    </ul>

    <p>PanelBar 2 using standard items</p>

    <ul id="panelbar2">
      <li class="k-active">
        <span>Item 1</span>
        <ul>
          <li>Item 1.1</li>
          <li>Item 1.2</li>
          <li>Item 1.3</li>
          <li>Item 1.4</li>
          <li>Item 1.5</li>
          <li>Item 1.6</li>
          <li>Item 1.7</li>
          <li>Item 1.8</li>
          <li>Item 1.9</li>
        </ul>
      </li>
      <li>
        <span>Item 2</span>
        <ul>
          <li>Item 2.1</li>
          <li>Item 2.2</li>
          <li>Item 2.3</li>
          <li>Item 2.4</li>
          <li>Item 2.5</li>
          <li>Item 2.6</li>
          <li>Item 2.7</li>
          <li>Item 2.8</li>
          <li>Item 2.9</li>
        </ul>
      </li>
    </ul>
    <script>
      $("#panelbar1").kendoPanelBar({
        expandMode: "single"
      });

      $("#panelbar2").kendoPanelBar({
        expandMode: "single"
      });

    </script>
```

## See Also

* [Basic Usage of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/index)
* [Using the API of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/api)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
