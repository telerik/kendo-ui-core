---
title: Keyboard Navigation
page_title: Keyboard Shortcuts - Kendo UI Accessibility Support
description: "Learn more about the keyboard Accessibility standards supported by Kendo UI components."
slug: keyboard_shortcuts_accessibility_support
position: 5
---

# Keyboard Shortcuts

Keyboard access is a fundamental aspect of the interaction between disabled users and the Web.

The more the functionalities of your project that users can handle through the keyboard, the wider the variety of assistive technologies that can be used by disabled users.

## Overview

To indicate to the browser that a specific property can be activated with the keyboard, place the `accesskey` attribute in HTML elements. For example, you have the `<input type='text' id='name' accesskey='n' />` input field on a page. By implementing `accesskey`, you instruct the browser to enable a user to set the focus on that field through an access key combination and the `n` key. Access key combinations are [unique for OS and browsers](https://en.wikipedia.org/wiki/Access_key). For example, if a user browses your website with Chrome on a Mac, they will have to type `control` and `option` and `n` to set focus on the `name` field.

Kendo UI recognizes `accesskey` attributes and automatically preserves them when creating components. This approach is helpful when Kendo UI creates multiple DOM elements to construct more complex components such as the NumericTextBox or DatePicker.

## Built-In Support

Keyboard support in Kendo UI maps access-key combinations and ensures that users can access the full capabilities of the widgets through the keyboard.

Besides the `accesskey` attribute support, most Kendo UI components also offer a series of keyboard controls for interacting with them. The specific keyboard shortcuts supported by each component are provided in the following keyboard examples.

- [AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/keyboard-navigation)
- [BottomNavigation](https://demos.telerik.com/kendo-ui/bottomnavigaiton/keyboard-navigation)
- [Breadcrumb](https://demos.telerik.com/kendo-ui/breadcrumb/keyboard-navigation)
- [Button](https://demos.telerik.com/kendo-ui/button/keyboard-navigation)
- [ButtonGroup](https://demos.telerik.com/kendo-ui/buttongroup/keyboard-navigation)
- [Calendar](https://demos.telerik.com/kendo-ui/calendar/keyboard-navigation)
- [Captcha](https://demos.telerik.com/kendo-ui/captcha/keyboard-navigation)
- [ColorGradient](https://demos.telerik.com/kendo-ui/colorgradient/keyboard-navigation)
- [ColorPalette](https://demos.telerik.com/kendo-ui/colorpalette/keyboard-navigation)
- [ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/keyboard-navigation)
- [ComboBox](https://demos.telerik.com/kendo-ui/combobox/keyboard-navigation)
- [CheckBoxGroup](https://demos.telerik.com/kendo-ui/checkboxgroup/keyboard-navigation)
- [DateInput](https://demos.telerik.com/kendo-ui/dateinput/keyboard-navigation)
- [DatePicker](https://demos.telerik.com/kendo-ui/datepicker/keyboard-navigation)
- [DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/keyboard-navigation)
- [DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/keyboard-navigation)
- [Dialog](https://demos.telerik.com/kendo-ui/dialog/keyboard-navigation)
- [Drawer](https://demos.telerik.com/kendo-ui/drawer/keyboard-navigation)
- [DropDownButton](https://demos.telerik.com/kendo-ui/dropdownbutton/keyboard-navigation)
- [DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation)
- [DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/keyboard-navigation)
- [Editor](https://demos.telerik.com/kendo-ui/editor/keyboard-navigation)
- [ImageEditor](https://demos.telerik.com/kendo-ui/imageeditor/keyboard-navigation)
- [FileManager](https://demos.telerik.com/kendo-ui/filemanager/keyboard-navigation)
- [FlatColorPicker](https://demos.telerik.com/kendo-ui/flatcolorpicker/keyboard-navigation)
- [FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/keyboard-navigation)
- [Gantt](https://demos.telerik.com/kendo-ui/gantt/keyboard-navigation)
- [Grid](https://demos.telerik.com/kendo-ui/grid/keyboard-navigation)
- [ListBox](https://demos.telerik.com/kendo-ui/listbox/keyboard-navigation)
- [ListView](https://demos.telerik.com/kendo-ui/listview/keyboard-navigation)
- [MediaPlayer](https://demos.telerik.com/kendo-ui/mediaplayer/keyboard-navigation)
- [Menu](https://demos.telerik.com/kendo-ui/menu/keyboard-navigation)
- [MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/keyboard-navigation)
- [MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/keyboard-navigation)
- [MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/keyboard-navigation)
- [NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/keyboard-navigation)
- [Pager](https://demos.telerik.com/kendo-ui/pager/keyboard-navigation)
- [PanelBar](https://demos.telerik.com/kendo-ui/panelbar/keyboard-navigation)
- [PDFViewer](https://demos.telerik.com/kendo-ui/pdfviewer/keyboard-navigation)
- [PivotGridV2](https://demos.telerik.com/kendo-ui/pivotgridv2/keyboard-navigation)
- [Rating](https://demos.telerik.com/kendo-ui/rating/keyboard-navigation)
- [RadioGroup](https://demos.telerik.com/kendo-ui/radiogroup/keyboard-navigation)
- [Scheduler](https://demos.telerik.com/kendo-ui/scheduler/keyboard-navigation)
- [Slider](https://demos.telerik.com/kendo-ui/slider/keyboard-navigation)
- [SplitButton](https://demos.telerik.com/kendo-ui/splitbutton/keyboard-navigation)
- [Splitter](https://demos.telerik.com/kendo-ui/splitter/keyboard-navigation)
- [Spreadsheet](https://demos.telerik.com/kendo-ui/spreadsheet/keyboard-navigation)
- [Stepper](https://demos.telerik.com/kendo-ui/stepper/keyboard-navigation)
- [Switch](https://demos.telerik.com/kendo-ui/switch/keyboard-navigation)
- [TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/keyboard-navigation)
- [TaskBoard](https://demos.telerik.com/kendo-ui/taskboard/keyboard-navigation)
- [TimeLine](https://demos.telerik.com/kendo-ui/timeline/keyboard-navigation)
- [TimePicker](https://demos.telerik.com/kendo-ui/timepicker/keyboard-navigation)
- [ToolBar](https://demos.telerik.com/kendo-ui/toolbar/keyboard-navigation)
- [TreeList](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation)
- [TreeView](https://demos.telerik.com/kendo-ui/treeview/keyboard-navigation)
- [Window](https://demos.telerik.com/kendo-ui/window/keyboard-navigation)
- [Wizard](https://demos.telerik.com/kendo-ui/wizard/keyboard-navigation)

## In-Component Keyboard Navigation

To implement the in-component keyboard navigation, use either of the following approaches:

- Rely on `Tab` to focus multiple HTML elements inside a components.
- Rely on `Tab` to focus only one element in the components and, then, use other keys for in-components navigation and actions&mdash;for example, `Arrow` keys, `Enter`, `Page Up`, `Page Down`, and so on.

Kendo UI supports the second approach and uses an `aria-activedescendant` attribute to determine the currently active element inside the components. This is the recommended technique for complex UI components because it provides for a better control over the keyboard navigation and an easier implementation of nested-textbox `change` handlers, and also avoid the definition of accessibility attributes for elements that may need them. On the other hand, the approach requires you to define WAI-ARIA attributes. From an end-user's perspective, the markup of the components is encapsulated as if a shadow DOM is used. The drawback of this approach is that the end-user is expected to be educated on how to use the component. However, Kendo UI considers the pros to outweigh the cons.

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.2 Compliance of Kendo UI Components]({% slug section508_wcag21_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
