---
title:  Keyboard Navigation
page_title: Keyboard Navigation | Kendo UI Menu HtmlHelper for ASP.NET Core
description: "Learn how to use the keyboard navigation functionality of the Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_keyboardnavigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Menu is always available.

When the Menu is focused, the first root item is activated.

The Menu supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                               |
| `Home`              | Focuses the first item.                                                            |
| `End`               | Focuses the last item.                                                             |
| `Left Arrow`        | <ul><li>Moves the active item on the root level of a horizontal Menu to the left.</li> <li>Closes an item group.</li></ul> |
| `Right Arrow`       | <ul><li>Moves the active item on the root level of a horizontal Menu to the right.</li> <li>Opens an item group of a vertical Menu.</li> <li>If the previous active item has been inside an item group, moves the active state to the next root item of a horizontal Menu.</li></ul>        |
| `Up Arrow`          | Moves upwards the active item of a vertical Menu item group.                        |
| `Down Arrow`        | <ul><li>Moves downwards the active item of a vertical Menu item group.</li> <li>Opens an item group of a horizontal Menu.</li></ul> |
| `Enter`             | Selects or navigates the focused item.                                             |
| `Space`             | Selects or navigates the focused item.                                             |
| `Esc`               | Closes an item group.                                                              |
| (`Shift`+) `Tab`    | Blurs the Menu and moves the focus to the next or previous focusable element on the page.  |

## See Also

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)
