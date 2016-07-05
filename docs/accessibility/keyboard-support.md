---
title: Keyboard Shortcuts
page_title: Keyboard Shortcuts | Kendo UI Accessibility Support
description: "Learn more about the keyboard Accessibility standards supported by Kendo UI controls."
slug: keyboard_shortcuts_accessibility_support
position: 4
---

# Keyboard Shortcuts

Keyboard access is a very significant aspect of the interaction between disabled users and the Web. The more the functionalities of your project that users can handle through the keyboard, the wider the variety of assistive technologies that can be used by disabled users.

## Overview

The `accesskey` property can be placed on HTML elements to indicate to the browser that the property in question can be activated with the keyboard. For example, assume you have the following input field on a page:

	<input type='text' id='name' accesskey='n' />

By using the `accesskey` attribute, you instruct the browser to enable a user set focus on that field by using an access key combination ([which is unique for OS and browsers](http://en.wikipedia.org/wiki/Access_key)) plus the `n` key. For example, if a user browses your website with Chrome on a Mac, they would type 'control' + 'option' + 'n' to set focus on the 'name' field.

Kendo UI recognizes `accesskey` attributes, and automatically preserves those when creating widgets. This is especially helpful in the cases when Kendo UI creates multiple DOM elements to construct some more complex widgets such as the NumericTextBox or DatePicker.

## Built-In Support

Keyboard support in Kendo UI is about more than just mapping access keys for you. It is also about ensuring that your users can access the full capabilities of the widgets by just using the keyboard. What is more, you get this kind of support right out of the box.

In addition to the `accesskey` attribute support, most Kendo UI widgets also offer a series of keyboard controls that can be used to interact with them. The specific keyboard shortcuts supported by each widget are provided in its keyboard demo and are listed below:

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

## In-Widget Keyboard Navigation

Generally, there are two ways to implement in-widget keyboard navigation:

- Rely on `TAB` to focus multiple HTML elements inside a widget.
- Rely on `TAB` to focus only one element in the widget, and then use various other keys for in-widget navigation and actions&mdash;for example, `Arrow` keys, `Enter`, `Page Up`, `Page Down`, etc.

Kendo UI opts for the second approach. It uses an `aria-activedescendant` attribute to determine the currently active element inside the widget and is the recommended technique for complex UI components. It allows for a better control over the keyboard navigation, easier implementation of nested textboxes change handlers, and spares the need to define accessibility attributes for all possible elements that may need them. On the other hand, you need to define WAI-ARIA attributes. From an end-user's perspective, the markup of the widget is encapsulated as if a shadow DOM is used. The drawback of this approach is that the end-user is expected to be educated on how to use the widget. However, Kendo UI considers the pros to outweigh the cons.

## See Also

Other articles on Kendo UI Accessibility support:

* [Overview of Web Accessibility Standards]({% slug overview_accessibility_support_kendoui %})
* [Charts]({% slug charts_accessibility_support %})
* [High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Right-to-Left Languages]({% slug right_toleft_languages_accessibility_support %})
* [Section 508]({% slug section508_accessibility_support %})
* [WAI-ARIA]({% slug wai_aria_accessibility_support %})
