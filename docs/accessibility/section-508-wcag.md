---
title: Section 508 and WCAG 2.1 Compliance
page_title: Section 508 and WCAG 2.1 Compliance | Kendo UI Accessibility Support
description: "Learn more about the Section 508 and WCAG 2.1 Accesibility support provided by Kendo UI controls."
slug: section508_wcag21_accessibility_support
position: 3
---

# Section 508 and WCAG 2.1 Compliance

The Kendo UI widgets follow the [W3C Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

They set the standards for applications for providing accessible content. Depending on the number of guidelines that is followed when building an application, W3C defines three levels of accessibility conformance&mdash;A, AA, and AAA levels.

The Kendo UI components also conform to the technical standards set out in [Section 508 (Latest Amendment)](https://www.access-board.gov/the-board/laws/rehabilitation-act-of-1973#508) of the [Rehabilitation Act of 1973](https://legcounsel.house.gov/Comps/Rehabilitation%20Act%20Of%201973.pdf). They represent the law that requires all Federal Agencies to make their electronic and information technology accessible to people with disabilities. For detailed information on the accessibility features according to the Section 508 Web content standards Kendo UI delivers, refer to the article about [Section 508]({% slug section508_accessibility_support %}).

Applications built with components that adhere to these guidelines will not only be accessible to people with disabilities, but also to users of all kinds of devices and interfaces such as desktop browsers, voice browsers, mobile phones, automobile-based personal computers, and so on.

The following table lists the Section 508 and WCAG 2.1 compliance levels of support for the Kendo UI widgets. 

> The described level of compliance in the table below is achievable with the **HighContrast Less Theme.**

**Table 1: 508 and WCAG 2.1 compliance with Kendo UI widgets**

|Component |508|WCAG 2.1|
|:---          |:---|:---  
|ActionSheet   |Yes |AA |
|AppBar	       |Yes |AA |
|AutoComplete  |Yes |AA  |
|Avatar        |Yes |AA  |
|BarCode	   |Yes |AA |
|BottomNavigation |Yes |AA |
|Breadcrumb	   |Yes |AA  |
|Button 	   |Yes |AA  |
|ButtonGroup   |Yes |AA  |
|Calendar	   |Yes |AA |
|Captcha       |Yes |AA |
|Charts        |Yes |AA |
|Chat          |Yes |AA |
|CheckBox      |Yes |AA |
|CheckBoxGroup |Yes |AA |
|ContextMenu   |Yes |AA |
|ComboBox      |Yes |AA  |
|ColorGradient |Yes |AA  |
|ColorPalette  |Yes |AA  |
|ColorPicker   |Yes |AA  |
|DateInput	   |Yes |AA |
|DatePicker	   |Yes |AA |
|DateTimePicker|Yes |AA |
|Diagram	   |Yes |AA |
|Dialog	       |Yes |AA  |
|Drawer	       |Yes |AA |
|DropDownButton|Yes |AA |
|DropDownList  |Yes |AA  |
|DropDownTree* |Yes |AA  |
|Editor        |Yes |AA  |
|ExpansionPanel|Yes |AA |
|FileManager   |Yes |AA |
|Filter   |Yes |AA |
|FlatColorPicker |Yes |AA |
|FloatingActionButton |Yes |AA |
|Form          |Yes |AA |
|Gantt         |Yes |AA  |
|Grid          |Yes |AA |
|ImageEditor   |Yes |AA  |
|Loader        |Yes |AА |
|LinearGauge   |Yes |AA |
|ListBox       |Yes |AA |
|ListView	   |Yes |AA |
|Map	       |Yes |AA |
|MaskedTextbox |Yes |AA |
|Menu          |Yes |AA |
|MultiColumnComboBox |Yes |AA |
|MultiSelect   |Yes |AA |
|Notification  |Yes |AA  |
|NumericTextbox|Yes |AA |
|OrgChart	   |Yes |AA |
|Pager         |Yes |AA |
|PanelBar	   |Yes |AA |
|PopOver	   |Yes |AA |
|QRCode	   	   |Yes |AA |
|RadialGauge   |Yes |AA |
|RadioButton   |Yes |AA  |
|RadioGroup    |Yes |AA |
|Responsive Panel |Yes |AA |
|ScrollView	   |Yes |AA |
|Scheduler	   |Yes |AA |
|Slider	       |Yes |AA |
|Sortable	   |Yes |AA |
|SplitButton   |Yes |AA |
|Splitter      |Yes |AA |
|Spreadsheet   |Yes |AA  |
|Stepper	   |Yes |AA |
|Switch        |Yes |AA  |
|TabStrip	   |Yes |AA |
|TaskBoard	   |Yes |AA |
|TextArea	   |Yes |AA |
|TextBox	   |Yes |AA |
|TileLayout	   |Yes |AA  |
|TimeLine	   |Yes |AA  |
|TimePicker	   |Yes |AA |
|ToolBar	   |Yes |AA  |
|Tooltip	   |Yes |AA  |
|TreeList	   |Yes |AA |
|TreeView	   |Yes |AA  |
|Upload 	   |Yes |AA  |
|Window 	   |Yes |AA |
|Wizard		   |Yes |AA |

> The DropDownTree widget will be identified as not compliant to the WAI-ARIA spec when tested with static HTML analyzer if there is no selection in the widget and the `placeholder` configuration is not used. That is because the DropDownTree wrapper element, which has `role="listbox"` will not contain any `option` elements. That should be considered a known limitation in the widget. Detailed information on the scenario could be found in [this GitHub issue](https://github.com/telerik/kendo-ui-core/issues/6558#issuecomment-938449528).

## Special Considerations

Several Kendo UI widgets feature complex rendering which affects their accessibility standards support provisioned by Section 508.

### Messages Support

Widgets, such as the Grid and Calendar, require additional configuration to enable them to successfully pass the Section 508 validation. Due to the fact that they render their content in tables, each table header element has to contain text. To achieve this behavior, use the [`messages.expandCollapseColumnHeader`](/api/javascript/ui/grid/configuration/messages.expandcollapsecolumnheader) and [`messages.weekColumnHeader`](/api/javascript/ui/calendar/configuration/messages.weekcolumnheader) configuration options.

The following example demonstrates how to specify a text for the expand (collapse) column.

```
	<div id="grid"></div>
	<script>
	$("#grid").kendoGrid({
	  columns: [
	    { field: "name" },
	    { field: "age" }
	  ],
	  dataSource: {
	    data: [
	      { name: "Jane Doe", age: 30, city: "London" },
	      { name: "John Doe", age: 33, city: "Berlin" }
	    ]
	  },
	  detailInit: function (e) {
	    e.detailCell.text("City: " + e.data.city);
	  },
	  height: 200,
	  messages: {
	    expandCollapseColumnHeader: "E/C"
	  }
	});
	</script>
```

The following example demonstrates how to specify a text for the week column header.

```
    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        "weekNumber": true,
        "messages": {
            "weekColumnHeader": "W"
        }
     })
    </script>
```

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
