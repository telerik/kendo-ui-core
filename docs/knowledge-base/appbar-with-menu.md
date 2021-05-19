---
title: Add Menu to AppBar
description: An example on how to add menu to Appbar.
type: how-to
page_title: Add Menu to AppBar | Kendo UI AppBar for jQuery
slug: appbar-menu-overflow
tags: appbar, menu, overflow
ticketid: 1498194
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI AppBar</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2020.3.1118 version</td>
 </tr>
</table>

## Description

How can I add a Menu to AppBar and set the overflow?

## Solution

1. Implement [`Kendo UI Menu`](https://demos.telerik.com/kendo-ui/menu/index) into [`Kendo UI AppBar`](https://demos.telerik.com/kendo-ui/appbar/index).
1. Set the overflow style of the AppBar to "visible".

```dojo
 <div id="appbar"></div>
    <script id="menu-template" type="text/x-kendo-tmpl">
        <ul id="menu" data-role="menu">
            <li>
                Products
                <ul>
                    <li>
                        Furniture
                        <ul>
                            <li>Tables & Chairs</li>
                            <li>Sofas</li>
                            <li>Occasional Furniture</li>
                            <li>Children's Furniture</li>
                            <li>Beds</li>
                        </ul>


                    </li>
                    <li>
                        Decor
                        <ul>
                            <li>Bed Linen</li>
                            <li>Throws</li>
                            <li>Curtains & Blinds</li>
                            <li>Rugs</li>
                            <li>Carpets</li>
                        </ul>
                    </li>
                    <li>
                        Storage
                        <ul>
                            <li>Wall Shelving</li>
                            <li>Kids Storage</li>
                            <li>Baskets</li>
                            <li>Multimedia Storage</li>
                            <li>Floor Shelving</li>
                            <li>Toilet Roll Holders</li>
                            <li>Storage Jars</li>
                            <li>Drawers</li>
                            <li>Boxes</li>
                        </ul>

                    </li>
                    <li>
                        Lights
                        <ul>
                            <li>Ceiling</li>
                            <li>Table</li>
                            <li>Floor</li>
                            <li>Shades</li>
                            <li>Wall Lights</li>
                            <li>Spotlights</li>
                            <li>Push Light</li>
                            <li>String Lights</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                Stores
                <ul>
                    <li>
                        <div id="template" style="padding: 10px;">
                            <h2>Around the Globe</h2>
                            <ol>
                                <li>United States</li>
                                <li>Europe</li>
                                <li>Canada</li>
                                <li>Australia</li>
                            </ol>
                            <img src="../content/web/menu/map.png" alt="Stores Around the Globe" />
                            <button class="k-button">See full list</button>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                Blog
            </li>
            <li>
                Company
            </li>
            <li>
                Events
            </li>
            <li disabled="disabled">
                News
            </li>
        </ul>
    </script>
    <script id="search-template" type="text/x-kendo-tmpl">
        <span class="k-textbox k-display-flex">
            <input autocomplete="off" placeholder="Search products" title="Search products" class="k-input">
            <span class="k-input-icon">
                <span class="k-icon k-i-search"></span>
            </span>
        </span>
    </script>
    <script>
        $("#appbar").kendoAppBar({
            themeColor: "dark",
            items: [
                { template: '<a class="k-button" href="\\#"><span class="k-icon k-i-menu"></span></a>', type: "contentItem" },
                { width: 16, type: "spacer" },
                { template: kendo.template($("#menu-template").html()), type: "contentItem" },
                { type: "spacer" }, // <----------------------------------------------------------
                { template: kendo.template($("#search-template").html()), type: "contentItem" },
                { width: 8, type: "spacer" },
                { template: '<a class="k-button k-clear-search" href="\\#">Clear search</a>', type: "contentItem" },
                { width: 8, type: "spacer" },
                { template: '<a class="k-button k-toggle-button" href="\\#"><span class="k-icon k-i-saturation"></span></a>', type: "contentItem" }
            ]
        }).on("input", "input.k-input", function (e) {
            var input = e.currentTarget;
        }).on("click", ".k-button", function (e) {
            e.preventDefault();
        }).on("click", ".k-clear-search", function (e) {
            $("#appbar input.k-input").val("").trigger("input");
        }).on("click", ".k-toggle-button", function (e) {
            e.preventDefault();
        });

        $(kendo.roleSelector('appbar')).find(kendo.roleSelector('menu')).kendoMenu();
    </script>
  
  <style>
    .k-appbar{
          overflow: visible;
    }
  </style>
```
