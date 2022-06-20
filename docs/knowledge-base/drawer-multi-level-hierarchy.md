---
title: Create a Multi-Level Hierarchy in the Drawer
page_title: Create a Multi-Level Hierarchy in the Drawer
description: "An example showcasing how to create a multi-level hierarchy using the Kendo UI Drawer for jQuery."
type: how-to
slug: drawer-multi-level-hierarchy
ticketid: 1560679
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Drawer for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

I examined the [Drawer Hierarchy](https://demos.telerik.com/kendo-ui/drawer/hierarchy) demo which shows two levels of hierarchy. However, I want to have multiple nested levels of submenus. How can I extend the logic from the demo to add more submenus to the Drawer? Additionally, how can I retrieve all of the parent elements of the selected submenu?

## Solution

To achieve the desired scenario: 

1. Create a function that will be used to add menus and submenus to the Drawer configuration.
1. Attach a handler to the [`itemClick`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/events/itemclick) event of the Drawer.
1. The logic of the `itemClick` event will either expand or collapse the children of the menu that was clicked.
    - The `collapseAll` function collapses every descendant of the clicked menu.
    - The `getParentsRecursively` function retrieves all of the parents of the clicked submenu.
1. Attach a handler to the [`hide`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/events/hide) event of the Drawer.
1. The logic of the `hide` event will collapse all of the submenus.

The following example demonstrates the full implementation of the approach.

```dojo
    <button id='show'>Show Drawer</button>
    <button id='hide'>Hide Drawer</button>

    <!-- BEGINNING OF DRAWER CONTENT -->

    <div id="drawer">
      <div id="drawer-content">
        <div id="About" class="hidden">
          <h4 class="header">Kendo UI</h4>
          <h6>
            Kendo UI is a comprehensive HTML5 user interface framework for building interactive and high-performance websites and applications.
            It comes with a library of 70+ UI widgets, an abundance of data-visualization gadgets, client-side data source, and a built-in MVVM (Model-View-ViewModel) library.
          </h6>
          <h6>
            Kendo UI for jQuery provides AngularJS and Bootstrap integration and is also distributed as part of several product units that you can choose from depending on your project requirements.
            The suite includes widgets for enterprise-grade line-of-business applications and is suitable for creating professional websites that require expert and timely technical support.
          </h6>
        </div>

        <div id="All" class="hidden">
          <h4 class="header">
            <div class="kendoka">
            </div>
            Check all available components of Kendo UI for jQuery at the following
            <a href="https://demos.telerik.com/kendo-ui/">Demos</a>
            article.
          </h4>
        </div>

        <div id="Angular" class="header hidden">
          <h6>
            Kendo UI allows to quickly build stunning and high-performance responsive web applications.
          </h6>
        </div>

        <div id="GettingStarted" class="hidden">
          <h4 class="header">A Complete UI Toolkit for Web Development</h4>
          <h6>
            <strong>Progress&reg; Kendo UI&reg;</strong> delivers everything you need to build a modern web application under tight deadlines,
            with out-of-the-box features and functions that can speed your development time by 50 percent:
          </h6>
          <ul>
            <li>Flexible - Use your preferred framework, including jQuery, AngularJS/Angular, React, and Vue.js.</li>
            <li>
              Versatile - Leverage more than 200 customizable UI components spread across the various libraries to create
              eye-catching, data-rich desktop, tablet, and mobile web apps.
            </li>
            <li>
              Powerful - Accelerate development time with responsive layout, powerful data-binding, cross-browser compatibility and
              ready-to-use themes.
            </li>
            <li>
              Supported -Get started fast with easy integration backed by comprehensive documentation, flexible support options,
              hands-on training courses and a large developer community.
            </li>
          </ul>
        </div>

        <div id="Kendo" class="hidden">
          <h4 class="header">Build Better JavaScript Apps Faster</h4>
          <h6>
            The ultimate collection of JavaScript UI components with libraries for jQuery, Angular, React, and Vue. Quickly build
            eye-catching, high-performance, responsive web applications, regardless of your JavaScript framework choice.
          </h6>
          <ul>
            <li>Decreases time-to-market</li>
            <li>Provides advanced UI features</li>
            <li>Supports popular frameworks</li>
            <li>Reduces design risk</li>
          </ul>
          <a href="https://www.telerik.com/kendo-ui">Click here for more information</a>
        </div>

        <div id="ThemeSupport" class="hidden">
          <h4 class="header">Kendo UI provides themes that you can use to style your application.</h4>
          <h6>Currently, the Kendo ships the following themes:</h6>
          <ul>
            <li>Kendo UI Default theme</li>
            <li>Kendo UI Bootstrap theme</li>
            <li>Kendo UI Material theme</li>
          </ul>
          <h6>
            The Kendo UI <strong>Theme Builder</strong> is a web application which enables you to create new or customize existing
            themes.
          </h6>
          <h6>
            The Theme Builder renders the same look and feel as all other components in the suite and delivers full control over their
            visual elements.
          </h6>
          <a href="https://themebuilder.telerik.com">Play with the Theme Builder</a>
        </div>

        <div id="Overview">
          <h4 class="header">Spend your time developing core functionality, not UI components</h4>
          <h6>
            Build your next application, or augment an existing one, with easy-to-use Kendo UI components designed with performance and
            rich user experience in mind.
          </h6>
          <h6>
            Easily add advanced UI components into your existing designs or take advantage of our comprehensive library in new design
            starts. Kendo UI lets you save time by integrating components to handle all the key functionality you need in a UI, letting
            you focus your development efforts on your proprietary features.
          </h6>
        </div>

        <div id="Popular" class="hidden">
          <h4 class="header">Most Popular Widgets</h4>
          <ul>
            <li>Grid</li>
            <li>Charts</li>
            <li>Dropdowns</li>
            <li>Inputs</li>
            <li>Themes</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- END OF DRAWER CONTENT -->

    <script>
       // Show the drawer when the "Show Drawer" button is clicked.
       $("#show").on("click", function(e) {
        var drawerInstance = $("#drawer").data().kendoDrawer;
        drawerInstance.show();
      });
      
      // Hide the drawer when the "Hide Drawer" button is clicked.
      $("#hide").on("click", function(e) {
        var drawerInstance = $("#drawer").data().kendoDrawer;
        drawerInstance.hide();
        drawerInstance.trigger("hide");
      });

      // The addItem logic is used to create menus/submenus. Check the drawer configuration for the syntax.

      /* 
        id = the data-id of the element which will be used to target the clicked element and perform operations.
        title = what will be displayed in the menu
        parent - the id of the parent element(if the element has one)
        isParent - specifies whether the element is a parent of other elements or not.
        icon - specifies an icon for the element.
        level - specifies the level on which the element is located. Example - Getting Started, Overview, Most Popular - level 0, Getting Started->Supported Themes - level 1, Getthing Started->Supported Themes->About Kendo UI - level 2, etc.

        The level logic is used for indentation of the sub-menu items.
        */
      function addItem(id, title, parent, isParent, icon, level) {
        // Create the <li> element 
        let liStart = `<li data-role='drawer-item' ${parent ? 'class=hidden' : ''} data-parent='${parent}' data-is-parent='${isParent}'>`;
        let liEnd = "</li>";
        let element = "";

        // Check the level of nesting and add that many indentations for the submenu.
        for(let i=0; i<level; i++) {
          element += "<span class='k-icon k-i-none'></span>";
        }

        // Add the element with its title and id.
        element += `<span class='k-icon ${icon}'></span><span class='k-item-text' data-id='${id}'>${title}</span>`;

        // Check if the element is a parent and add an icon for the expand arrow.
        if(isParent) {
          element += "<span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></span>";
        }

        // If the element is a parent, add a line separator too.
        let separator = isParent ? `<li data-role='drawer-separator' ${level > 0 ? "class='hidden'" : ""}></li>` : "";

        // Create the final result.
        let result = liStart + element + liEnd + separator;

        return result;
      }

      $(document).ready(function () {
        $("#drawer").kendoDrawer({
          template: `<ul>
      						${addItem("GettingStarted", "Getting Started", null, true, "k-i-information", 0)}
                  ${addItem("ThemeSupport", "Supported Themes", "GettingStarted", true, "k-i-palette", 1)}
                  ${addItem("Kendo", "About Kendo UI", "ThemeSupport", true, "k-i-question", 2)}
                  ${addItem("FourthLevel", "Fourth Level Menu", "Kendo", false, "k-i-question", 3)}
                  ${addItem("AnotherFourthLevel", "Another Fourth Menu", "Kendo", false, "k-i-question", 3)}
                  ${addItem("Third ", "Third Menu", "Kendo", false, "k-i-question", 3)}
                  ${addItem("Fourth", "Some Additional Menu", "Kendo", false, "k-i-question", 3)}
                  ${addItem("Overview", "Overview", null, true, "k-i-zoom", 0)}
                  ${addItem("About", "About Kendo UI", "Overview", false, "k-i-question", 1)}
                  ${addItem("All", "All Kendo UI Components", "Overview", false, "k-i-js", 1)}
                  ${addItem("Popular", "Most Popular Components", null, false, "k-i-style-builder", 0)}
      </ul>`,
          mode: "push",
          itemClick: onItemClick,
          autoCollapse: false,
          position: 'left',
          mini: {
            width: 45
          },
          minHeight: 330,
          swipeToOpen: true,
          hide: onHide
        });

        function onItemClick(e) {
          if (!e.item.hasClass("k-drawer-separator")) {
            var drawerContainer = e.sender.drawerContainer;
            var expandIcon = e.item.find("span.k-i-arrow-chevron-right");
            var collapseIcon = e.item.find("span.k-i-arrow-chevron-down");
            let id = e.item.find(".k-item-text").data("id");
            let children = drawerContainer.find("[data-parent='"+id+"']");
            // Hide the content of the current menu/submenu.
            drawerContainer.find("#drawer-content > div").addClass("hidden");
            // Show the content of the clicked menu/submenu
            drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").attr("data-id")).removeClass("hidden");

            // If the menu is collapsed, expand its direct children on click.
            if(expandIcon.length) {
              children.each(function(i, x) {
                $(x).removeClass("hidden");
                if($(x).prev().is(".k-drawer-separator")) {
                  $(x).prev().removeClass("hidden");
                }
              });
              expandIcon.removeClass("k-i-arrow-chevron-right").addClass("k-i-arrow-chevron-down");
            }

            // If the menu is expanded, collapse all of its children on click.
            if(collapseIcon.length) {
              collapseAll(children, collapseIcon, drawerContainer);
              collapseIcon.addClass("k-i-arrow-chevron-right").removeClass("k-i-arrow-chevron-down");
            }

            // Retrieve all parents of the clicked element.
            if(!e.item.data("is-parent")) {
              let parents = getParentsRecursively(e.item);
              parents.forEach((parent) => {
                console.log(parent[0]);
              });
            }
          }
        }

        // This logic is executed when the Drawer is collapsed/hidden.
        function onHide() {
          let element = this.drawerElement,
              container = this.drawerContainer;
          let topLevelMenus = element.find("[data-parent='null']");
          topLevelMenus.each(function(i, menu) {
            menu = $(menu);
            let id = menu.find(".k-item-text").data("id"),
                children = container.find("[data-parent='"+id+"']");

            // Collapse all of the submenus when the drawer is hidden.
            collapseAll(children, null, container);
            menu.find("span.k-i-arrow-chevron-down").addClass("k-i-arrow-chevron-right").removeClass("k-i-arrow-chevron-down");
          });
        }

        var drawerInstance = $("#drawer").data().kendoDrawer;
        drawerInstance.show();

        // Collapses all children when a parent item is clicked or when the Drawer is hidden.
        function collapseAll(children, collapseIcon, drawerContainer) {
          children.each(function(i, x) {
            let isParent = $(x).data("is-parent");

            let id = $(x).find(".k-item-text").data("id");
            collapseIcon = $(x).find("span.k-i-arrow-chevron-down");
            children = drawerContainer.find("[data-parent='"+id+"']");

            if(isParent) {
              collapseAll(children, collapseIcon, drawerContainer);
            }

            $(x).addClass("hidden");

            if($(x).prev().is(".k-drawer-separator") && $(x).prev().prev().data("parent")) {
              $(x).prev().addClass("hidden");
            }

            collapseIcon.addClass("k-i-arrow-chevron-right").removeClass("k-i-arrow-chevron-down");
          });
        }

        // Retrieves the parent elements of the clicked item.
        function getParentsRecursively(item, result = []) {
          let parentId = '[data-id="'+item.data("parent")+'"]';
          let parentItem = drawerInstance.drawerElement.find(parentId).closest("li");
          if(parentItem.length) {
            result.push(parentItem);
            getParentsRecursively(parentItem, result);
          }

          return result;
        }
      });
    </script>
    <style>
      #drawer-content li {
        font-size: 1.2em;
        padding-left: .89em;
        background: 0 0;
        border-radius: 0;
        border-width: 0 0 1px;
        border-color: rgba(33, 37, 41, 0.125);
        line-height: 1.5em;
        padding: 0em 0.4em 0.7em .84em
      }

      #drawer-content li:last-child {
        border: 0;
      }

      .hidden {
        display: none;
      }

      #demo-runner #example div.demo-section {
        max-width: 800px;
      }

      .k-toolbar .k-icon {
        font-size: 18px;
      }

      #drawer-content ul {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      h6 {
        font-size: 1rem;
        margin-bottom: .5rem;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.2;
        color: inherit;
      }

      .k-drawer-content {
        padding: 15px;
      }

      .kendoka {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        background-size: cover;
        background-image: url('https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg');
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
        margin-left: 8px;
        font-weight: bold;
        font-size: 20px;
      }
    </style>
```