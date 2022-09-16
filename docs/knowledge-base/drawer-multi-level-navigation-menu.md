---
title: Create a Multi-Level Navigation Menu in the Drawer
description: "An example showcasing how to create a multi-level navigational menu using the Kendo UI Drawer for jQuery."
type: how-to
page_title: Create a Multi-Level Navigation Menu in the Drawer
slug: drawer-multi-level-navigation-menu
tags: telerik, kendo, jquery, drawer, create, multilevel, nav, navigation, menu 
ticketid: 
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

You may need to create a multi-level menu in the Drawer similar to the one on the [Kendo UI](https://demos.telerik.com/kendo-ui/drawer/index) demo pages.

## Solution

To achieve the desired scenario: 

1. Add two separate `ul` elements to the [`template`](/api/javascript/ui/drawer/configuration/template) configuration of the Drawer.
1. List all main menu options in the first `ul` element.
1. Leave the second `ul` element empty.
1. Attach a handler to the [`itemClick`](/api/javascript/ui/drawer/events/itemclick) event of the Drawer.
1. Inside the handling function, check which `ul` element is currently visible.
1. If the main menu is currently visible, hide it and display one of the submenus.
1. If a submenu has been activated, list the possible options in the second `ul` element.

```dojo
    <div id="drawer">
        <div id="drawer-content">
            <div id="About" class="hidden">
                <h4 class="header">Kendo UI</h4>
                <h6>
                    Kendo UI is a comprehensive HTML5 user interface framework for building interactive and
                    high-performance websites and applications.
                    It comes with a library of 70+ UI widgets, an abundance of data-visualization gadgets,
                    client-side data source, and a built-in MVVM (Model-View-ViewModel) library.
                </h6>
                <h6>
                    Kendo UI for jQuery provides AngularJS and Bootstrap integration and is also distributed as
                    part of several product units that you can choose from depending on your project
                    requirements.
                    The suite includes widgets for enterprise-grade line-of-business applications and is
                    suitable for creating professional websites that require expert and timely technical
                    support.
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

            <div id="GettingStarted" class="hidden">
                <h4 class="header">A Complete UI Toolkit for Web Development</h4>
                <h6>
                    <strong>Progress&reg; Kendo UI&reg;</strong> delivers everything you need to build a modern
                    web application under tight deadlines,
                    with out-of-the-box features and functions that can speed your development time by 50
                    percent:
                </h6>
                <ul>
                    <li>Flexible - Use your preferred framework, including jQuery, AngularJS/Angular, React, and
                        Vue.js.</li>
                    <li>
                        Versatile - Leverage more than 200 customizable UI components spread across the various
                        libraries to create
                        eye-catching, data-rich desktop, tablet, and mobile web apps.
                    </li>
                    <li>
                        Powerful - Accelerate development time with responsive layout, powerful data-binding,
                        cross-browser compatibility and
                        ready-to-use themes.
                    </li>
                    <li>
                        Supported -Get started fast with easy integration backed by comprehensive documentation,
                        flexible support options,
                        hands-on training courses and a large developer community.
                    </li>
                </ul>
            </div>

            <div id="Kendo" class="hidden">
                <h4 class="header">Build Better JavaScript Apps Faster</h4>
                <h6>
                    The ultimate collection of JavaScript UI components with libraries for jQuery, Angular,
                    React, and Vue. Quickly build
                    eye-catching, high-performance, responsive web applications, regardless of your JavaScript
                    framework choice.
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
                    The Kendo UI <strong>Theme Builder</strong> is a web application which enables you to create
                    new or customize existing
                    themes.
                </h6>
                <h6>
                    The Theme Builder renders the same look and feel as all other components in the suite and
                    delivers full control over their
                    visual elements.
                </h6>
                <a href="https://themebuilder.telerik.com">Play with the Theme Builder</a>
            </div>
            <div id="Grid" class="hidden">
                <h4 class="header">The Grid is a powerful control for displaying data in a tabular format.</h4>
                <h6>The Grid provides options for executing data operations, such as paging, sorting, filtering,
                    grouping, and editing, which determine the way the data is presented and manipulated.</h6>
                <h6>The Grid supports data binding to local and remote sets of data by using the Kendo UI for
                    jQuery DataSource component.</h6>
            </div>

            <div id="Chart" class="hidden">
                <h4 class="header">The Kendo UI Chart uses modern browser technologies to render high-quality
                    data visualizations.</h4>
                <h6>
                    All graphics are rendered on the client by using Scalable Vector Graphics (SVG) with a
                    fallback to Canvas. The Charts support a set of series types such as Bar, Line, Area,
                    Bullet, Pie, Scatter, Bubble, Polar, and other.
                </h6>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("#drawer").kendoDrawer({
                template: "<ul class='main-view'> \
                            <li data-role='drawer-item'><span class='k-icon k-i-information'></span><span class='k-item-text' data-id='GettingStarted'>Getting Started</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></span></li> \
                            <li data-role='drawer-separator'></li> \
                            <li data-role='drawer-item'><span class='k-icon k-i-zoom'></span><span class='k-item-text' data-id='Overview'>Overview</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></li> \
                            <li data-role='drawer-separator'></li> \
                            <li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='k-item-text' data-id='Popular'>Most popular components</span><span class='k-icon k-i-arrow-chevron-right'></li> \
                          </ul> \
              						<ul class='sub-view'></ul>",
                mode: "push",
                itemClick: function (e) {
                    let item = e.item;

                    // Check the type of the item that was clicked.
                    if (!item.hasClass("k-drawer-separator")) {
                        // Check if this item is part of the main menu or not.
                        let parentItem = item.parents(".main-view").length > 0;
                        // Check if the clicked item is "Back to the Main Menu".
                        let backToMainMenu = item.hasClass("back-button");

                        // Get the container.
                        var drawerContainer = e.sender.drawerContainer;

                        // If the item is a main menu element...
                        if (parentItem) {
                            // Get the id of the parent.
                            let parentId = item.find(".k-item-text").data("id");
                            // Set the global lastParent variable as a reference to the last selected parent item.
                            window.lastParent = item;
                            // Get the html for the submenu items.
                            let subMenus = getSubMenus(parentId);
                            // Apply the html to the submenu ul element.
                            $(".sub-view").html(subMenus);

                            // Hide the main menu.
                            $(".main-view").animate({
                                left: "-100%",
                            }, 300);

                            // Dislay the submenu for the correct category.
                            $(".sub-view").animate({
                                left: "0",
                            }, 300);
                            // If the back to main menu button is clicked...
                        } else if (backToMainMenu) {
                            // Display the main menu.
                            $(".main-view").animate({
                                left: "0",
                            }, 300);

                            // Hide the submenus.
                            $(".sub-view").animate({
                                left: "-100%",
                            }, 300);

                            // Add the selected class to the parent element that was closed.
                            window.lastParent.addClass("k-selected");
                            // If any of the submenu items are clicked...
                        } else {
                            // Hide all other div elements.
                            drawerContainer.find("#drawer-content > div").addClass("hidden");
                            // Display the content for the correct item.
                            drawerContainer.find("#drawer-content").find("#" + item.find(".k-item-text").attr("data-id")).removeClass("hidden");
                        }
                    }
                },
                autoCollapse: false,
                position: 'left',
                minHeight: 330,
                swipeToOpen: true
            });

            var drawerInstance = $("#drawer").data().kendoDrawer;
            drawerInstance.show();

            function getSubMenus(id) {
                // Create the Back To Main Menu Button.
                let html = "<li data-role='drawer-item' class='k-drawer-item back-button'><span class='k-icon k-i-arrow-chevron-left'></span><span class='k-item-text'>Main Menu</span></li><li data-role='drawer-separator' class='k-drawer-item k-drawer-separator'></li>";

                // Switch between the Main Menu items.
                switch (id) {
                    // If the Overview item is clicked, display the following submenus.
                    case "Overview":
                        return html + "<li data-role='drawer-item' class='k-drawer-item'><span class='k-item-text' data-id='About'>About Kendo</span></li> \
									<li data-role='drawer-item' class='k-drawer-item'><span class='k-item-text' data-id='All'>All Kendo Components</span></li>";
                    // If the Getting Started item is clicked, display the following submenus.
                    case "GettingStarted":
                        return html + "<li data-role='drawer-item' class='k-drawer-item'><span class='k-item-text' data-id='Kendo'>About Kendo UI</span></li> \
									<li data-role='drawer-item' class='k-drawer-item'><span class='k-item-text' data-id='ThemeSupport'>Supported Themes</span></li>";

                    // If the Most popular components item is clicked, display the following submenus.
                    case "Popular":
                        return html + "<li data-role='drawer-item' class='k-drawer-item'><span class='k-item-text' data-id='Grid'>Kendo UI Grid</span></li> \
									<li data-role='drawer-item' class='k-drawer-item'><span class='k-item-text' data-id='Chart'>Kendo UI Chart</span></li>";
                }
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

        .k-toolbar .k-icon {
            font-size: 18px;
        }

        #drawer-content ul {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .hidden {
            display: none;
        }

        /* By default the main menu is visible. */
        .main-view {
            width: 100%;
            position: absolute;
        }

        /* By default the sub menu is hidden. */
        .sub-view {
            position: absolute;
            width: 100%;
            left: -100%;
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