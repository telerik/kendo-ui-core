---
title: Getting Started
page_title: jQuery TreeView Documentation - Getting Started with the TreeView
description: "Get started with the jQuery TreeView by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_treeview_component
position: 1
---

# Getting Started with the TreeView

This guide demonstrates how to get up and running with the Kendo UI for jQuery TreeView.

After the completion of this guide, you will achieve the following end result:

```dojo
    <ul id="treeview">
      <li data-expanded="true">
        My Web Site
        <ul>
          <li data-expanded="true">
            images
            <ul>
              <li>logo.png</li>
              <li>body-back.png</li>
              <li>my-photo.jpg</li>
            </ul>
          </li>
          <li data-expanded="true">
            resources
            <ul>
              <li data-expanded="true">
                pdf
                <ul>
                  <li>brochure.pdf</li>
                  <li>prices.pdf</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>about.html</li>
          <li>contacts.html</li>
          <li>index.html</li>
          <li>portfolio.html</li>
        </ul>
      </li>
    </ul>

    <script>
      $(document).ready(function() {
        $("#treeview").kendoTreeView({
          dragAndDrop: true,
          animation: {
            expand: {
              effects: "fadeIn expandVertical",
              duration: 400
            },
            collapse: {
              effects: "fadeOut collapseVertical",
              duration: 400
            }
          }
        });
      });
    </script>
```

## 1. Create a list Element

First, create an `<ul>` element on the page that will serve as the main container of the TreeView component. Then, you will fill the `ul` element with `<li>` children to create the hierarchical structure.

```html
    <ul id="treeview">
      <li data-expanded="true">
        My Web Site
        <ul>
          <li data-expanded="true">
            images
            <ul>
              <li>logo.png</li>
              <li>body-back.png</li>
              <li>my-photo.jpg</li>
            </ul>
          </li>
          <li data-expanded="true">
            resources
            <ul>
              <li data-expanded="true">
                pdf
                <ul>
                  <li>brochure.pdf</li>
                  <li>prices.pdf</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>about.html</li>
          <li>contacts.html</li>
          <li>index.html</li>
          <li>portfolio.html</li>
        </ul>
      </li>
    </ul>
```

## 2. Initialize the TreeView

In this step, you will initialize the TreeView component from the `ul` element that you created earlier.

```javascript
      $(document).ready(function() {
        $("#treeview").kendoTreeView({
        });
      });
```

## 3. Enable Dragging and Dropping for Items

The TreeView provides you with the [`dragAndDrop`](/api/javascript/ui/treeview/configuration/draganddrop) configuration that enables the end user to restructure the items by dragging and dropping them.

```javascript
      $(document).ready(function() {
        $("#treeview").kendoTreeView({
            dragAndDrop: true
        });
      });
```

## 4. Change the Animations

Now, you can change the default animations for expanding and collapsing the TreeView items. To set the animations, use the [`animation`](/api/javascript/ui/treeview/configuration/animation) configuration.

```javascript
      $(document).ready(function() {
        $("#treeview").kendoTreeView({
          dragAndDrop: true,
          animation: {
            expand: {
              effects: "fadeIn expandVertical",
              duration: 400
            },
            collapse: {
              effects: "fadeOut collapseVertical",
              duration: 400
            }
          }
        });
      });
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery TreeView](https://demos.telerik.com/kendo-ui/treeview/index)

## See Also

* [JavaScript API Reference of the jQuery TreeView](/api/javascript/ui/treeview)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
