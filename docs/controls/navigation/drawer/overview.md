---
title: Overview
page_title: jQuery Drawer Documentation | Drawer Overview
description: "Get started with the jQuery Drawer by Kendo UI, initialize single or multiple buttons, and reference existing Button instances."
slug: overview_kendoui_drawer_widget
position: 1
---

# Drawer Overview

The Drawer is a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

* [Demo page for the Drawer](https://demos.telerik.com/kendo-ui/drawer/index)

## Initializing the Drawer

You can initialize a Drawer by using an HTML element and a template or with MVVM.

### From HTML

You can create a Kendo UI Drawer by using an HTML element and a template.

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

### With MVVM

The following example demonstrates how to initialize a Drawer with MVVM.

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

## Functionality and Features

* [Display modes]({% slug displaymodes_kendoui_drawer %})
* [Interaction modes]({% slug interaction_kendoui_drawer %})
* [Templates]({% slug templates_kendoui_drawer %})

## See Also

* [Basic Usage of the Drawer (Demo)](https://demos.telerik.com/kendo-ui/drawer/index)
* [JavaScript API Reference of the Drawer](/api/javascript/ui/drawer)
