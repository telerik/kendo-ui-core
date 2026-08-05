---
title: Switching Modes Responsively in Kendo UI for jQuery Drawer
description: Learn how to handle responsive mode switching for the Kendo UI for jQuery Drawer when using it as a sidebar navigation.
type: how-to
page_title: Responsive Mode Change in Kendo UI for jQuery Drawer
meta_title: Responsive Mode Change in Kendo UI for jQuery Drawer
slug: responsive-mode-kendo-jquery-drawer
tags: kendo-ui-for-jquery,drawer,responsive,mode,resize
res_type: kb
ticketid: 1717199
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Drawer</td>
</tr>
<tr>
<td>Version</td>
<td>2026.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to implement a sidebar navigation using the Kendo UI for jQuery [Drawer](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer) that supports responsive behavior. Above 700px, the Drawer should use the "push" mode with "mini" or "extended" states. Below 700px, the Drawer should switch to the "overlay" mode. Switching the mode dynamically during runtime causes layout issues if I destroy and recreate the Drawer.

This knowledge base article also answers the following questions:
- How to handle responsive mode changes in the Kendo UI for jQuery Drawer?
- Why does the Kendo UI Drawer layout break when reinitialized?
- How to switch Drawer modes based on screen size?

## Solution

To achieve responsive mode switching in the Kendo UI for jQuery Drawer, follow these steps:

1. Use a debounced resize event listener to detect screen size changes and toggle the Drawer mode.
2. Destroy the Drawer instance and clean up any leftover DOM elements added by the Drawer during initialization.
3. Restore the Drawer container to its original state before reinitializing the Drawer with the new mode.

Here is an example implementation:

```javascript
$(document).ready(function () {
    var drawerContainer = $("#drawerContainer");
    var originalHTML = drawerContainer.html(); // Save the original HTML

    function initializeDrawer(mode) {
        // Destroy any existing Drawer instance
        if ($("#drawer").data("kendoDrawer")) {
            $("#drawer").data("kendoDrawer").destroy();
            $(".k-drawer-container, .k-overlay").remove(); // Clean up leftover elements
            $("body").css("padding-left", ""); // Reset body padding added by the Drawer
            drawerContainer.html(originalHTML); // Restore original content
        }

        // Initialize the new Drawer instance
        $("#drawer").kendoDrawer({
            mode: mode,
            mini: true,
            items: [
                { text: "Item 1" },
                { text: "Item 2" },
                { text: "Item 3" }
            ]
        });
    }

    function handleResize() {
        var windowWidth = $(window).width();

        if (windowWidth > 700) {
            initializeDrawer("push"); // Use "push" mode above 700px
        } else {
            initializeDrawer("overlay"); // Use "overlay" mode below 700px
        }
    }

    // Debounced resize event listener
    var resizeTimeout;
    $(window).on("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 300);
    });

    // Initialize Drawer on page load
    handleResize();
});
```

Below is a runnable example:

```dojo
<style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
        margin: 0;
      }
      #app {
        min-height: 100vh;
      }
      .content-area {
        padding: 20px;
      }
      #hamburger {
        display: none;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 10000;
        font-size: 18px;
        cursor: pointer;
      }
      .overlay-mode #hamburger {
        display: block;
      }
    </style>
    <button id="hamburger">&#9776;</button>

    <div id="drawer-host">
      <div id="app">
        <div class="content-area">
          <h2>Main Content</h2>
          <p>Content area content.</p>
        </div>
      </div>
    </div>

    <script>
      $(function () {
        const BREAKPOINT = 700;
        let currentMode = null;
        let resizeTimer;

        const drawerTemplate = `<ul>
        <li data-role='drawer-item'>${kendo.ui.icon("home")}<span class='item-text'>Home</span></li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item'>${kendo.ui.icon("inbox")}<span class='item-text'>Inbox</span></li>
        <li data-role='drawer-item'>${kendo.ui.icon("calendar")}<span class='item-text'>Calendar</span></li>
        <li data-role='drawer-item'>${kendo.ui.icon("gear")}<span class='item-text'>Settings</span></li>
    </ul>`;

        const miniTemplate = `<ul>
        <li data-role='drawer-item'>${kendo.ui.icon("home")}</li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item'>${kendo.ui.icon("inbox")}</li>
        <li data-role='drawer-item'>${kendo.ui.icon("calendar")}</li>
        <li data-role='drawer-item'>${kendo.ui.icon("gear")}</li>
    </ul>`;

        const hostHtml = $("#drawer-host").html();

        function destroyDrawer() {
          const instance = $("#app").data("kendoDrawer");
          if (instance) {
            try {
              instance.destroy();
            } catch (e) {}
          }
          $(".k-drawer-container").remove();
          $(".k-overlay").remove();
          $(document.body).css({ "padding-left": "", "padding-right": "" });
          $("#drawer-host").html(hostHtml);
        }

        function initDrawer(mode) {
          currentMode = mode;
          const isPush = mode === "push";

          const options = {
            mode: mode,
            template: drawerTemplate,
            position: "left",
            swipeToOpen: true,
            autoCollapse: !isPush,
            width: 220,
          };

          if (isPush) {
            options.mini = { width: 50, template: miniTemplate };
          }

          const drawer = $("#app").kendoDrawer(options).data("kendoDrawer");
          if (isPush) {
            drawer.show();
          }
          $("body").toggleClass("overlay-mode", !isPush);
        }

        initDrawer(window.innerWidth > BREAKPOINT ? "push" : "overlay");

        $("#hamburger").on("click", function () {
          const drawer = $("#app").data("kendoDrawer");
          if (drawer) {
            drawer.show();
          }
        });

        $(window).on("resize", function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            const newMode = window.innerWidth > BREAKPOINT ? "push" : "overlay";
            if (newMode !== currentMode) {
              destroyDrawer();
              initDrawer(newMode);
            }
          }, 250);
        });
      });
    </script>
```

### Important Notes
- The `destroy()` method of the Drawer doesn't clean up all elements, so manually remove leftover `.k-drawer-container` and `.k-overlay` elements.
- Reset any body padding applied by the Drawer when switching modes.
- Wrap Drawer content in a stable wrapper and restore it before reinitializing.

## See Also

- [Kendo UI for jQuery Drawer API](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer)
- [Kendo UI for jQuery Drawer Overview](https://docs.telerik.com/kendo-ui/controls/layout/drawer/overview)
- [Kendo UI for jQuery Drawer Demo](https://demos.telerik.com/kendo-ui/drawer/index)
