---
title: Keyboard Shortcuts
page_title: Keyboard Shortcuts | Kendo UI Accessibility Support
description: "Learn more about the keyboard Accessibility standards supported by Kendo UI controls."
slug: keyboard_shortcuts_accessibility_support
position: 5
---

# Keyboard Shortcuts

Keyboard access is a fundamental aspect of the interaction between disabled users and the Web.

The more the functionalities of your project that users can handle through the keyboard, the wider the variety of assistive technologies that can be used by disabled users.

## Overview

To indicate to the browser that a specific property can be activated with the keyboard, place the `accesskey` attribute in HTML elements. For example, you have the `<input type='text' id='name' accesskey='n' />` input field on a page. By implementing `accesskey`, you instruct the browser to enable a user to set the focus on that field through an access key combination and the `n` key. Access key combinations are [unique for OS and browsers](http://en.wikipedia.org/wiki/Access_key). For example, if a user browses your website with Chrome on a Mac, they will have to type `control` and `option` and `n` to set focus on the `name` field.

Kendo UI recognizes `accesskey` attributes and automatically preserves them when creating widgets. This approach is especially helpful when Kendo UI creates multiple DOM elements to construct more complex widgets such as the NumericTextBox or DatePicker.

## Built-In Support

Keyboard support in Kendo UI maps access-key combinations and ensures that users can access the full capabilities of the widgets through the keyboard.

In addition to the `accesskey` attribute support, most Kendo UI widgets also offer a series of keyboard controls for interacting with them. The specific keyboard shortcuts supported by each widget are provided in the following keyboard examples.

- [AutoComplete](http://demos.telerik.com/kendo-ui/web/autocomplete/navigation.html)
- [Button](https://demos.telerik.com/kendo-ui/button/keyboard-navigation)
- [ButtonGroup](https://demos.telerik.com/kendo-ui/buttongroup/keyboard-navigation)
- [Calendar](http://demos.telerik.com/kendo-ui/web/calendar/navigation.html)
- [ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/keyboard-navigation)
- [ComboBox](http://demos.telerik.com/kendo-ui/web/combobox/navigation.html)
- [DateInput](https://demos.telerik.com/kendo-ui/dateinput/keyboard-navigation)
- [DatePicker](http://demos.telerik.com/kendo-ui/web/datepicker/navigation.html)
- [DateTimePicker](http://demos.telerik.com/kendo-ui/web/datetimepicker/navigation.html)
- [Dialog](https://demos.telerik.com/kendo-ui/dialog/keyboard-navigation)
- [DropDownList](http://demos.telerik.com/kendo-ui/web/dropdownlist/navigation.html)
- [DropDownTree](http://demos.telerik.com/kendo-ui/dropdowntree/keyboard-navigation)
- [Editor](http://demos.telerik.com/kendo-ui/web/editor/navigation.html)
- [Gantt](http://demos.telerik.com/kendo-ui/gantt/keyboard-navigation)
- [Grid](http://demos.telerik.com/kendo-ui/web/grid/navigation.html)
- [ListBox](http://demos.telerik.com/kendo-ui/listview/keyboard-navigation)
- [ListView](http://demos.telerik.com/kendo-ui/web/listview/navigation.html)
- [MediaPlayer](http://demos.telerik.com/kendo-ui/web/mediaplayer/navigation.html)
- [Menu](http://demos.telerik.com/kendo-ui/web/menu/navigation.html)
- [MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/keyboard-navigation)
- [NumericTextBox](http://demos.telerik.com/kendo-ui/web/numerictextbox/navigation.html)
- [PanelBar](http://demos.telerik.com/kendo-ui/web/panelbar/navigation.html)
- [Scheduler](https://demos.telerik.com/kendo-ui/scheduler/selection)
- [Slider](http://demos.telerik.com/kendo-ui/web/slider/navigation.html)
- [Splitter](http://demos.telerik.com/kendo-ui/web/splitter/navigation.html)
- [TabStrip](http://demos.telerik.com/kendo-ui/web/tabstrip/navigation.html)
- [TimePicker](http://demos.telerik.com/kendo-ui/web/timepicker/navigation.html)
- [ToolBar](https://demos.telerik.com/kendo-ui/toolbar/keyboard-navigation)
- [TreeList](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation)
- [TreeView](http://demos.telerik.com/kendo-ui/web/treeview/navigation.html)
- [Window](http://demos.telerik.com/kendo-ui/web/window/navigation.html)

## In-Widget Keyboard Navigation

To implement the in-widget keyboard navigation, use either of the following approaches:

- Rely on `Tab` to focus multiple HTML elements inside a widget.
- Rely on `Tab` to focus only one element in the widget and, then, use other keys for in-widget navigation and actions&mdash;for example, `Arrow` keys, `Enter`, `Page Up`, `Page Down`, and so on.

Kendo UI supports the second suggested approach and uses an `aria-activedescendant` attribute to determine the currently active element inside the widget. This is the recommended technique for complex UI components because it provides for a better control over the keyboard navigation and an easier implementation of nested-textbox `change` handlers, and also avoid the definition of accessibility attributes for elements that may need them. On the other hand, the approach requires you to define WAI-ARIA attributes. From an end-user's perspective, the markup of the widget is encapsulated as if a shadow DOM is used. The drawback of this approach is that the end-user is expected to be educated on how to use the widget. However, Kendo UI considers the pros to outweigh the cons.

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.0 Compliance of Kendo UI Widgets]({% slug section508_wcag20_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
