---
title: Overview
page_title: Overview | Kendo UI Drawer
description: "Learn how to initialize the Kendo UI Drawer widget and configure its behaviors."
slug: overview_kendoui_drawer_widget
position: 1
---

# Drawer Overview

The [Kendo UI Drawer widget](https://demos.telerik.com/kendo-ui/drawer/index) is a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

## Interaction

The drawer widget has two modes of interaction - `overlay`(*default*) and `push` and two positions - `left`(*default*) and `right` which determine the side from which the drawer will appear. It has gesture support and also features `mini` mode which makes the drawer always partly visible and allows the user to reveal its full content either with a gesture or by calling the `show()` method of the widget.

## Display Modes

### Overlay Mode

The `overlay` mode is not associated with any content. The drawer appears on top of the page contents from the side which is configured in the [`position`](/api/javascript/ui/drawer/configuration/position) setting. To show the drawer either swipe or drag with mouse or call the [`show()`](/api/javascript/ui/drawer/methods/show) method of the widget. The drawer closes on click/tap of any of the options or on the overlay.

### Push Mode

The `push` mode is associated with specific page content and the element from which the widget is initialized should wrap that content. When the drawer opens it will push that content to the side. It is designed for wider screens (desktop/tablet). To show the drawer either swipe or drag with mouse or call the [`show()`](/api/javascript/ui/drawer/methods/show) method of the widget. The drawer closes on click/tap of any of the options or on the associated content.

The height of the widget is determined by the higher content of the two - the template of the widget or the wrapped content it is associated with. The [`minHeight`](/api/javascript/ui/drawer/configuration/minheight) setting can be used to prevent the content from changing its height as the user toggles the drawer options.

### Mini Mode

The `mini` option can be activated with both `overlay` and `push` modes by enabling the [`mini`](/api/javascript/ui/drawer/configuration/mini) configuration option. If set to true, it will use the default width of `50px` and the main template. You can set it to an object and change both the partially visible `mini.width` and `mini.template`.

## Templates

To distinguish the items within the template when the user interacts with the drawer, add the `data-role="drawer-item"` attribute to each item template. If you wish to add a separator between the drawer items use the `data-role="drawer-separator"` attribute.

The Kendo UI Drawer widget has two configurable templates - the main [`template`](/api/javascript/ui/drawer/configuration/template) of the widget and the [`mini.template`](/api/javascript/ui/drawer/configuration/mini.template).

Icons can be added with a span with class `k-icon` combined with the desired [web font icons](/styles-and-layout/icons-web#list-of-font-icons) class. To ensure that the icons and text have sufficient padding wrap the item template text in a span with class `k-item-text`.

###### Example

    template: "<ul><li data-role='drawer-item'><span class='k-icon k-i-eye'></span><span class='k-item-text'>See More</span></li></ul>"

## Initialization

You can create a Drawer in any of the following ways:

### jQuery Initialization

You can create a Kendo UI Drawer by using an HTML element and a template.

###### Example

```dojo

    <div id="overlay-drawer"></div>
    <button class="k-button k-primary" onclick="show()">Show</button>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum doloribus illum earum itaque, numquam nesciunt voluptas officiis ullam aperiam enim optio facilis deleniti, ea mollitia esse, minima. Dolorum, consequuntur deserunt!
    </div>
    <script id="drawer-template" type="text/x-kendo-template">
  		<ul>
     		<li data-role='drawer-item'>First Item</li>
     		<li data-role='drawer-separator'></li>
     		<li data-role='drawer-item'>Second Item</li>
 	 	 	  <li data-role='drawer-separator'></li>
     		<li data-role='drawer-item'>Third Item</li>
      </ul>
    </script>

    <script>
      var drawer = $("#overlay-drawer").kendoDrawer({
        template: $("#drawer-template").html(),
      }).data("kendoDrawer");

      function show(e) {
        drawer.show();
      }
    </script>
```

### MVVM Initialization

The following example demonstrates how to initialize a Drawer with MVVM.

###### Example

```dojo

    <div id="example">
      <div data-role="drawer"
           data-width="150"
           data-mode="push"
           data-template="<ul><li data-role='drawer-item'><span>First Item</span></li><li data-role='drawer-separator'></li><li data-role='drawer-item'><span>Second Item</span></li><li data-role='drawer-item' class='k-state-selected'><span>Third Item</span></li></ul>">
        <h1 class="my-content">Swipe or drag me to the right <span class="k-icon k-i-arrow-chevron-right"></span></h1>
      </div>
    </div>
    <script>
      var viewModel = kendo.observable({});
      kendo.bind($("#example"), viewModel);
    </script>
    <style>
      .k-i-arrow-chevron-right {
        font-size:  2em;
      }

      .my-content {
        height: 200px;
        text-align:center;
      }
    </style>
    </div>
```

## See Also

* [Drawer JavaScript API Reference](/api/javascript/ui/drawer)
* [Drawer jQuery Demos](https://demos.telerik.com/kendo-ui/drawer/index)
