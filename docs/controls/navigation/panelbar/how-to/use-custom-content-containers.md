---
title: Use Custom Content Containers in the PanelBar
page_title: Use Custom Content Containers in the PanelBar | Kendo UI PanelBar
description: "Learn how to use custom content containers in the Kendo UI PanelBar widget."
slug: howto_use_custom_content_containers_in_the_panelbar_widget
---

# Use Custom Content Containers in the PanelBar

The example below demonstrates how to use custom content containers in the Kendo UI PanelBar widget.

###### Example

```html
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
      <li class="k-state-active">
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
      <li class="k-state-active">
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

Other articles on the Kendo UI PanelBar:

* [PanelBar JavaScript API Reference](/api/javascript/ui/panelbar)
* [Initialize the Grid inside a Hidden Container]({% slug appearance_kendoui_grid_widget %}#hidden-containers)
* [JavaScript API Reference: Configure PanelBar Animations](/api/javascript/ui/panelbar#configuration-animation)

For more runnable examples on the Kendo UI PanelBar widget, browse its [**How To** documentation folder]({% slug initialize_thegrid_panelbar_widget %}).
