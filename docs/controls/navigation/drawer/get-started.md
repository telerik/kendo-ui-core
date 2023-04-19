---
title: Getting Started
page_title: jQuery Drawer Documentation - Getting Started with the Drawer
description: "Get started with the jQuery Drawer by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_drawer_component
position: 1
---

# Getting Started with the Drawer

This guide demonstrates how to get up and running with the Kendo UI for jQuery Drawer.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="drawer">
      <div id="drawer-content">
        <div class="k-d-flex k-align-items-center k-flex-column">
          <h3>Content area</h3>
          <p>Click on the drawer and pull to the right to expand it.</p>
          <p>Click anywhere on the content to collapse the drawer.</p>
        </div>
        <div class="k-d-flex k-align-items-center k-flex-column k-hidden">
          <h3>Content area 2</h3>
          <p>Additional content.</p>
        </div>
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#drawer").kendoDrawer({
          mode: "push",
          template: `<ul><li class='k-selected' data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li><li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li></ul>`,
          position: 'left',
          mini: true,
          itemClick: function (e) {
            $("#drawer-content > div").addClass("k-hidden");
            $("#drawer-content > div").eq(e.item.index()).removeClass("k-hidden");
          }
        });
      });
    </script>
```

## 1. Create an Empty div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Drawer component. Then, you will fill the `div` element with the content for each item in the Drawer.

```html
    <div id="drawer">
      <div id="drawer-content">
        <div class="k-d-flex k-align-items-center k-flex-column">
          <h3>Content Area</h3>
          <p>Click on the Drawer and pull to the right to expand it.</p>
          <p>Click anywhere on the content to collapse the Drawer.</p>
        </div>
        <div class="k-d-flex k-align-items-center k-flex-column k-hidden">
          <h3>Content Area 2</h3>
          <p>Additional content.</p>
        </div>
      </div>
    </div>
```

## 2. Initialize the Drawer

In this step, you'll initialize the Drawer component from the `<div>` element.

```javascript
    $("#drawer").kendoDrawer({
      mode: "push",
      template: `<ul>
      <li class='k-selected' data-role='drawer-item'><span class='k-icon k-i-star-outline'></span><span class='item-text'>item 1</span></li>
      <li data-role='drawer-item'><span class='k-icon k-i-twitter'></span><span class='item-text'>item 2</span></li>
      </ul>`
     });
```

## 3. Set the Position of the Drawer

Now, you can set the [`position`](/api/javascript/ui/drawer/configuration/position) of the Drawer.

```javascript
    $("#drawer").kendoDrawer({
      position: 'left'
     });
```

## 4. Enable the Mini Mode

In this step, you'll enable the [`mini`](/api/javascript/ui/drawer/configuration/mini) mode which displays a smaller version of the Drawer when the component is collapsed.

```javascript
    $("#drawer").kendoDrawer({
      mini: true
     });
```

## 5. Add Logic for Displaying and Hiding the Content

Now you are ready to use the [`itemClick`](/api/javascript/ui/drawer/events/itemclick) event to hide the current and display new content when an item in the Drawer is clicked.

```javascript
    $("#drawer").kendoDrawer({
        itemClick: function (e) {
            $("#drawer-content > div").addClass("k-hidden");
            $("#drawer-content > div").eq(e.item.index()).removeClass("k-hidden");
        }
     });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Drawer](https://demos.telerik.com/kendo-ui/drawer/index)

## See Also

* [JavaScript API Reference of the jQuery Drawer](/api/javascript/ui/drawer)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
