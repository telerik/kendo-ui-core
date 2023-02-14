---
title: Right-to-Left Support
page_title: Right-to-Left Support
description: "Learn more about the Accessibility features related to bidirectional languages, supported by {{ site.product }}."
slug: overview_rtlsupport_core
position: 2
---

# Right-to-Left Languages

Right-to-left (RTL) support refers to the ability of a library, website, or application to handle and respond to users who communicate through a right-to-left language such as Arabic, Hebrew, Chinese or Japanese.

The default language input for most users of the web is left-to-right. However, many websites and applications wish to also provide RTL support for their visitors. The RTL functionality falls more into the internationalization space but can be considered as an accessibility feature as well. After all, RTL is about making user experiences more accessible for visitors who use right-to-left languages.

## Configuration

Unless you are building an application that exclusively uses RTL languages, it is intuitive to apply the RTL support feature based on external input, such as language selection or information from the user agent of a visitor. In that case, you can apply the `k-rtl` class at runtime using the jQuery `addClass` method.

For example, if you want to allow the user to trigger RTL support by selecting a language from a drop-down list or by clicking a button:

1. Add a button to your page by using the `<input type="button" id="toggleRTL" value="Activate RTL Support" class="k-button" />` setting.
1. Add a click handler for the button and toggle RTL support by adding or removing the `k-rtl` class to a form, in this case, a collection of form fields to which you assigned an ID of `speakerForm`. With that handler in place, the user can now trigger RTL support on demand.

```
    $('#toggleRTL').on('click', function(event) {
        var form = $('#speakerForm');

        if (form.hasClass('k-rtl')) {
            form.removeClass('k-rtl')
        } else {
            form.addClass('k-rtl');
        }
    })
```

## Supported {{ site.product }} Components

The following table lists the {{ site.product }} Components that support rendering of content in a right-to-left direction for right-to-left languages, such as Arabic, Hebrew, Chinese, or Japanese.

|Component |RTL Support|Demo
|:---          |:---|:---
|AutoComplete  |Yes |[Browse](https://demos.telerik.com/aspnet-core/autocomplete/right-to-left-support)
|BottomNavigation |Yes |[Browse](https://demos.telerik.com/aspnet-core/bottomnavigation/right-to-left-support)
|Breadcrumb	   |Yes|[Browse](https://demos.telerik.com/aspnet-core/breadcrumb/right-to-left-support)
|Button 	     |Yes|[Browse](https://demos.telerik.com/aspnet-core/button/right-to-left-support)
|ButtonGroup   |Yes|[Browse](https://demos.telerik.com/aspnet-core/buttongroup/right-to-left-support)
|Calendar	     |Yes|[Browse](https://demos.telerik.com/aspnet-core/calendar/right-to-left-support)
|Charts        |Yes|[Browse](https://demos.telerik.com/aspnet-core/chart-api/rtl)
|CheckBoxGroup |Yes|[Browse](https://demos.telerik.com/aspnet-core/checkboxgroup/right-to-left-support)
|ComboBox      |Yes|[Browse](https://demos.telerik.com/aspnet-core/combobox/right-to-left-support)
|DateInput	   |Yes|[Browse](https://demos.telerik.com/aspnet-core/dateinput/right-to-left-support)
|DatePicker	   |Yes|[Browse](https://demos.telerik.com/aspnet-core/datepicker/right-to-left-support)
|DateTimePicker|Yes|[Browse](https://demos.telerik.com/aspnet-core/datetimepicker/right-to-left-support)
|Dialog	       |Yes|[Browse](https://demos.telerik.com/aspnet-core/dialog/right-to-left-support)
|DropDownList  |Yes|[Browse](https://demos.telerik.com/aspnet-core/dropdownlist/right-to-left-support)
|DropDownTree  |Yes |[Browse](https://demos.telerik.com/aspnet-core/dropdowntree/right-to-left-support)
|Editor        |Yes|[Browse](https://demos.telerik.com/aspnet-core/editor/right-to-left-support)
|ExpansionPanel|Yes|[Browse](https://demos.telerik.com/aspnet-core/expansionpanel/right-to-left-support)
|FileManager   |Yes|[Browse](https://demos.telerik.com/aspnet-core/filemanager/right-to-left-support)
|FloatingActionButton   |Yes |[Browse](https://demos.telerik.com/aspnet-core/floatingactionbutton/right-to-left-support)
|Gantt         |Yes |[Browse](https://demos.telerik.com/aspnet-core/gantt/right-to-left-support)
|Grid          |Yes |[Browse](https://demos.telerik.com/aspnet-core/grid/right-to-left-support)
|ListBox       |Yes |[Browse](https://demos.telerik.com/aspnet-core/listbox/right-to-left-support)
|ListView	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/listview/right-to-left-support)
|MaskedTextbox |Yes |[Browse](https://demos.telerik.com/aspnet-core/maskedtextbox/right-to-left-support)
|Menu          |Yes |[Browse](https://demos.telerik.com/aspnet-core/menu/right-to-left-support)
|MultiColumnComboBox |Yes|[Browse](https://demos.telerik.com/aspnet-core/multicolumncombobox/right-to-left-support)
|MultiSelect   |Yes |[Browse](https://demos.telerik.com/aspnet-core/multiselect/right-to-left-support)
|Notification  |Yes  |[Browse](https://demos.telerik.com/aspnet-core/notification/right-to-left-support)
|NumericTextbox|Yes |[Browse](https://demos.telerik.com/aspnet-core/numerictextbox/right-to-left-support)
|PanelBar	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/panelbar/right-to-left-support)
|RadioGroup    |Yes |[Browse](https://demos.telerik.com/aspnet-core/radiogroup/right-to-left-support)
|Scheduler	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/scheduler/right-to-left-support)
|Slider	       |Yes |[Browse](https://demos.telerik.com/aspnet-core/slider/right-to-left-support)
|Splitter      |Yes |[Browse](https://demos.telerik.com/aspnet-core/splitter/right-to-left-support)
|Stepper	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/stepper/right-to-left-support)
|Switch        |Yes |[Browse](https://demos.telerik.com/aspnet-core/switch/right-to-left-support)
|TabStrip	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/tabstrip/right-to-left-support)
|TaskBoard	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/taskboard/right-to-left-support)
|TextArea	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/textarea/right-to-left-support)
|TextBox	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/textbox/right-to-left-support)
|TimePicker	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/timepicker/right-to-left-support)
|TreeView	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/treeview/right-to-left-support)
|Upload 	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/upload/right-to-left-support)
|Window 	   |Yes |[Browse](https://demos.telerik.com/aspnet-core/window/right-to-left-support)

### Known Limitations

* Vertical scrollbar position may be on the left or right side depending on the used browser. This cannot be controlled via CSS or script.
* The layout of the Kendo UI ListView widget depends entirely on the defined template. The widget itself does nothing to convert an existing LTR template to RTL layout. If a `k-rtl` CSS class is present and applied to a wrapper element, text direction will be reversed, but floats, margins, paddings, etc., will keep their orientation.
* Kendo UI Splitter does not reverse the order of its panes in RTL mode.
