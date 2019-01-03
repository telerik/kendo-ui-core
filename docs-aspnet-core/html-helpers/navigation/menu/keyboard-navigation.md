---
title:  Keyboard Navigation
page_title: Keyboard Navigation | Kendo UI Menu HtmlHelper for ASP.NET Core
description: "Learn how to use the keyboard navigation functionality of the Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_keyboardnavigation_aspnetcore
position: 2
---

# Keyboard Navigation

The Menu provides a keyboard navigation functionality. When on focus, the first root item is activated.

Kendo UI Menu supports the following keyboard shortcuts and user actions:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                           |:---                                                                               |
| `Home`                        | Focuses the first item                                                            |
| `End`                         | Focuses the last item                                                             |
| Left `Arrow` key              | <ul><li>Moves the active item on the root level of horizontal Menus to the left</li> <li>Closes an item group</li></ul> |
| Right `Arrow` key             | <ul><li>Moves the active item on the root level of horizontal Menus to the right</li> <li>opens an item group of a vertical Menu</li> <li>Moves the active state to the next root item of a horizontal Menu, if the previous active item has been inside an item group</li></ul>        |
| Up `Arrow` key                | Moves the active item of vertical Menu item groups upwards                        |
| Down `Arrow` key              | <ul><li>Moves the active item of vertical Menu item groups downwards</li> <li>Opens an item group of a horizontal Menu</li></ul> |
| `Enter`                       | Selects or navigates the focused item                                             |
| `Space`                       | Selects or navigates the focused item                                             |
| `Esc`                         | Closes an item group                                                              |
| (`Shift`+) `Tab`              | Blurs the Menu and moves the focus to the next (previous) focusable page element  |

## See Also

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)