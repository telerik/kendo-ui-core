---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Enable and use the keyboard navigation when working with the Telerik UI Calendar TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: keynav_calendar_aspnetcore
position: 7
---

# Keyboard Navigation

The keyboard navigation of the Calendar works by listening to the key-down events on the wrapper element of the widget.

The logic assumes that everything the user does is in accordance with the currently focused date cell and not the focused element of the browser.

Depending on selection type (single or multiple), the Calendar behaves differently in terms of selecting and navigating with the keyboard. When the user applies the multiple date selection, the Calendar demonstrates the following keyboard navigation behavior:

* The focusing or selection of a date from another month does not navigate to the corresponding month. The user is able to continue the selection of dates from the current view.
* The pressing of `Space` or `Enter` on a specific date makes a single selection by deselecting all other selected dates.
* The pressing of `Space` or `Enter` on a specific date while the user is holding the `Ctrl` key adds the date to the current selection. If the date is already selected, it is removed from the selection.
* The pressing of `Shift` + `Enter` or `Space` performs a range selection. It selects all dates between the most recently selected date (with `Space` or `Enter` or a mouse click) and the date that holds the focused cell.
* The pressing of `Shift` + `Up Arrow` or `Down Arrow` extends the selection up or down one row in the month view respectively.
* The pressing of `Shift` + `Right Arrow` or `Left Arrow` adds the next or previous date to the current selection respectively.

For a runnable example on performing date selection over the keyboard, refer to [this demo](https://demos.telerik.com/kendo-ui/calendar/keyboard-navigation).

## See Also

* [Server-Side API](/api/calendar)
