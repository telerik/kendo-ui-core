---
title: Keyboard Support
position: 3
---

# Keyboard Support

## An Overview of Access Keys

For the unfamiliar, the `accesskey` property that can be placed on HTML elements to tell the browser that the property in question can be activated with the keyboard. For example, let's assume I have the following input field on a page:

	<input type='text' id='name' accesskey='n' />

By using the `accesskey` attribute, I'm telling the browser to enable to user to set focus on that field by using an access key combination ([which is
unique to OS and browser](http://en.wikipedia.org/wiki/Access_key)) plus the `n` key. For example, if a user of my site is browsing with Chrome on a
Mac, they would type 'control' + 'option' + 'n' to set focus on the 'name' field.

Kendo UI recognizes `accesskey` attributes, and automatically preserves those when creating widgets. This is especially helpful in those cases when
Kendo creates multiple DOM elements in order to construct some of our more complex widgets (like the NumericTextBox or DatePicker widgets).

## Built-in Keyboard Support in Kendo UI

Of course, Keyboard support in Kendo UI is about more than just mapping access keys for you. It's also about ensuring that your users can access the full capabilities of Kendo UI widgets using just the keyboard. And that's something you get out of the box.

In addition to `accesskey` attribute support, most Kendo UI widgets also support a series of keyboard controls that can be used to interact with our
widgets. The specific keyboard shortcuts provided with each widget is provided in the keyboard demo for that widget, all of which are linked below:

- [AutoComplete](http://demos.telerik.com/kendo-ui/web/autocomplete/navigation.html)
- [Calendar](http://demos.telerik.com/kendo-ui/web/calendar/navigation.html)
- [ComboBox](http://demos.telerik.com/kendo-ui/web/combobox/navigation.html)
- [DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker/navigation.html)
- [DateTimePicker](http://demos.telerik.com/kendo-ui/web/datetimepicker/navigation.html)
- [DropDownList](http://demos.telerik.com/kendo-ui/web/dropdownlist/navigation.html)
- [Editor](http://demos.telerik.com/kendo-ui/web/editor/navigation.html)
- [Gantt](http://demos.telerik.com/kendo-ui/gantt/keyboard-navigation)
- [Grid](http://demos.telerik.com/kendo-ui/web/grid/navigation.html)
- [ListView](http://demos.telerik.com/kendo-ui/web/listview/navigation.html)
- [Menu](http://demos.telerik.com/kendo-ui/web/menu/navigation.html)
- [NumericTextBox](http://demos.telerik.com/kendo-ui/web/numerictextbox/navigation.html)
- [PanelBar](http://demos.telerik.com/kendo-ui/web/panelbar/navigation.html)
- [Slider](http://demos.telerik.com/kendo-ui/web/slider/navigation.html)
- [Splitter](http://demos.telerik.com/kendo-ui/web/splitter/navigation.html)
- [TabStrip](http://demos.telerik.com/kendo-ui/web/tabstrip/navigation.html)
- [TimePicker](http://demos.telerik.com/kendo-ui/web/timepicker/navigation.html)
- [TreeView](http://demos.telerik.com/kendo-ui/web/treeview/navigation.html)
- [Window](http://demos.telerik.com/kendo-ui/web/window/navigation.html)
