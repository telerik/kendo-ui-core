---
title: Compliance
page_title: Accessibility Compliance
description: "Compliance with the accessibility standards and requirements in the {{ site.product }} suite."
slug: compliance_accessibility
position: 2
---

# Accessibility Standards Compliance

This article lists the accessibility compliance of the {{ site.product }} components.

## Accessibility Conformance Report

The <a href="https://www.section508.gov/sell/acr/" target="_blank">Accessibility Conformance Report (ACR)</a> is a document that explains how information and communication technology products such as software, hardware, electronic content, and support documentation conform to leading global accessibility standards. {{ site.product }} provides an ACR through the <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank">Voluntary Product Accessibility Template (VPAT®)</a>.

>tip Download the latest version of the <a href="assets/kendo-ui-vpat2.4.doc" download>{{ site.product }} Accessibility Conformance Report</a>.

## Compliance Table

The table below specifies the level of WCAG 2.2 compliance of each {{ site.product }} component.

* The *Accessibility Example* column links to component-specific accessibility demo. For general information on how the keyboard support works, see the [Keyboard Navigation]({%slug overview_accessibility%}#keyboard-navigation) section.
* The *Accessibility Documentation* column links to component-specific details and information about WAI-ARIA attributes.
* For information about **Section 508** of the US Rehabilitation Act, the **European Accessibility Act** in the EU, or any other national accessibility legislation, see section [Legal and Technical Compliance]({%slug overview_accessibility%}#legal-and-technical-compliance).

Also check the [notes below the table](#accessibility-compliance-notes).

| Component              | WCAG 2.2 | Accessibility Example | Accessibility Documentation |
|------------------------|---------|-----------------------|-----------------------------|
| ActionSheet           | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/actionsheet) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/actionsheet/accessibility/overview) |
| AIPrompt              | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/aiprompt) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/conversational-ui/aiprompt/accessibility/overview) |
| AppBar                | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/appbar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/appbar/accessibility/overview) |
| ArcGauge             | N/A     | N/A                   | N/A                         |
| AutoComplete         | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/autocomplete) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/autocomplete/accessibility/overview) |
| Avatar               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/avatar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/avatar/accessibility/overview) |
| Badge                | N/A     | N/A                   | N/A                         |
| Barcode              | N/A     | N/A                   | N/A                         |
| BottomNavigation     | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/bottomnavigation) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/bottomnavigation/accessibility/overview) |
| Breadcrumb           | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/breadcrumb) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/breadcrumb/accessibility/overview) |
| Button               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/button) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/button/accessibility/overview) |
| ButtonGroup          | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/buttongroup) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/buttongroup/accessibility/overview) |
| Calendar             | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/calendar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/scheduling/calendar/accessibility/overview) |
| Captcha              | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/captcha) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/captcha/accessibility/overview) |
| Charts               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chart) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/charts/accessibility/overview) |
| Chart Wizard         | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chartwizard)  | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/chartwizard/accessibility/overview) |
| Chat                 | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chat) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/conversational-ui/chat/accessibility/overview) |
| CheckBox             | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/checkbox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/checkbox/accessibility/overview) |
| CheckBoxGroup        | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/checkboxgroup) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/checkboxgroup/accessibility/overview) |
| Chip                 | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chip) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/chip/accessibility/overview) |
| ChipList             | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chiplist) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/chiplist/accessibility/overview) |
| CircularGauge        | N/A     | N/A  | N/A   |
| CircularProgressBar  | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/circularprogressbar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/interactivity/circularprogressbar/accessibility/overview) |
| ColorGradient        | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/colorgradient) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/colorgradient/accessibility/overview) |
| ColorPalette         | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/colorpalette) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/colorpalette/accessibility/overview) |
| ColorPicker          | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/colorpicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/colorpicker/accessibility/overview) |
| ComboBox             | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/combobox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/combobox/accessibility/overview) |
| ContextMenu          | AA      | N/A  | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/menu/contextmenu/accessibility/overview) |
| DateInput            | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dateinput) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dateinput/accessibility/overview) |
| DatePicker           | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/datepicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/datepicker/accessibility/overview) |
| DateRangePicker      | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/daterangepicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/daterangepicker/accessibility/overview) |
| DateTimePicker       | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/datetimepicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/datetimepicker/accessibility/overview) |
| Diagram              | N/A     | N/A                   | N/A                         |
| Dialog               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dialog) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/dialog/accessibility/overview) |
| Drawer               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/drawer) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/drawer/accessibility/overview) |
| DropDownButton       | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dropdownbutton) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/dropdownbutton/accessibility/overview) |
| DropDownList          | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dropdownlist) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dropdownlist/accessibility/overview) |
| DropDownTree          | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dropdowntree) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/dropdowntree/accessibility/overview) |
| Editor               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/editor) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/editor/accessibility/overview) |
| ExpansionPanel       | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/expansionpanel) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/expansionpanel/accessibility/overview) |
| FileManager          | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/filemanager) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/filemanager/accessibility/overview) |
| Filter               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/filter) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/filter/accessibility/overview) |
| FlatColorPicker      | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/flatcolorpicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/flatcolorpicker/accessibility/overview) |
| FloatingActionButton | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/floatingactionbutton) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/floatingactionbutton/accessibility/overview) |
| Form                | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/form) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/form/accessibility/overview) |
| Gantt               | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/gantt) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/scheduling/gantt/accessibility/overview) |
| Grid                | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/grid) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/accessibility/overview) |
| GridLayout          | N/A      | N/A                   | N/A                         |
| ImageEditor         | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/imageeditor) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/imageeditor/accessibility/overview) |
| LinearGauge         | N/A      | N/A                   | N/A                         |
| ListBox             | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/listbox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/listbox/accessibility/overview) |
| ListView            | AAA     | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/listview) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/listview/accessibility/overview) |
| Map                 | N/A      | N/A                   | N/A                         |
| MaskedTextbox       | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/maskedtextbox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/maskedtextbox/accessibility) |
| MediaPlayer         | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/mediaplayer) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/media/mediaplayer/accessibility/overview) |
| Menu                | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/menu) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/menu/accessibility/overview) |
| MultiColumnComboBox | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/multicombobox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/multicolumncombobox/accessibility/overview) |
| MultiSelect         | AA      | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/multiselect) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/multiselect/accessibility/overview) |
| MultiViewCalendar | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/multiviewcalendar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/scheduling/multiviewcalendar/accessibility/overview) |
| Notification | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/notification) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/notification/accessibility/overview) |
| NumericTextbox | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/numerictextbox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/numerictextbox/accessibility/overview) |
| OrgChart | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/orgchart) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/diagrams-and-maps/orgchart/accessibility/overview) |
| OTP Input | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/otpinput) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/otpinput/accessibility/overview) |
| Pager | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/pager) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/pager/accessibility/overview) |
| PanelBar | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/panelbar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/panelbar/accessibility/overview) |
| PDFViewer | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/pdfviewer) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/pdf/pdfviewer/accessibility/overview) |
| PivotGridV2 | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/pivotgrid) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/pivotgridv2/accessibility/overview) |
| Popover | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/popover) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/popover/accessibility/overview) |
| ProgressBar | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/progressbar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/interactivity/progressbar/accessibility/overview) |
| PropertyGrid | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/propertygrid) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/propertygrid/accessibility/overview) |
| QRCode | N/A | N/A | N/A |
| RadialGauge | N/A | N/A | N/A |
| RadioButton | AA | N/A | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/radiobutton/accessibility/overview) |
| RadioGroup | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/radiogroup) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/radiogroup/accessibility/overview) |
| Rating | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/rating) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/rating/accessibility/overview) |
| Sankey Diagram | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/sankey) | N/A |
| Scheduler | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/scheduler) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/scheduling/scheduler/accessibility/overview) |
| ScrollView | N/A | N/A | N/A |
| Signature | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/signature) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/signature/accessibility/overview) |
| SkeletonContainer | AAA | N/A | N/A |
| Slider | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/slider) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/slider/accessibility/overview) |
| Sortable | AA | N/A | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/interactivity/sortable/accessibility/overview) |
| SplitButton | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/splitbutton) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/splitbutton/accessibility/overview) |
| Splitter | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/splitter) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/splitter/accessibility/overview) |
| Spreadsheet | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/spreadsheet) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/spreadsheet/accessibility/overview) |
| StackLayout | N/A | N/A | N/A |
| Stepper | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/stepper) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/stepper/accessibility/overview) |
| Switch | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/switch) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/switch/accessibility/overview) |
| TabStrip | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/tabstrip) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/tabstrip/accessibility/overview) |
| TaskBoard | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/taskboard) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/taskboard/accessibility/overview) |
| TextArea | AAA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/textarea) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/textarea/accessibility/overview) |
| TextBox | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/textbox) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/textbox/accessibility) |
| TileLayout | AAA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/tilelayout) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/tilelayout/accessibility/overview) |
| TimeDurationPicker | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/timedurationpicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/timedurationpicker/accessibility/overview) |
| TimeLine | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/timeline-vertical) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/timeline/accessibility/overview) |
| TimePicker | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/timepicker) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/timepicker/accessibility/overview) |
| ToggleButton | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/togglebutton) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/togglebutton/accessibility/overview) |
| ToolBar | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/toolbar) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/toolbar/accessibility/overview) |
| Tooltip    | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/tooltip) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/tooltip/accessibility/overview) |
| TreeList   | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/treelist) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/treelist/accessibility/overview) |
| TreeView   | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/treeview) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/treeview/accessibility/overview) |
| Upload     | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/upload) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/upload/accessibility/overview) |
| Window     | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/window) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/window/accessibility/overview) |
| Wizard     | AA | [Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/wizard) | [Documentation](https://docs.telerik.com/{{ site.platform }}/html-helpers/navigation/wizard/accessibility/overview) |

## Accessibility Compliance Notes

The information in the compliance table above is subject to the following considerations:

* All components implement the required WAI-ARIA attributes without the need for any extra configuration. Some components may provide parameters that render additional optional WAI-ARIA attributes, for example, `aria-label` or `aria-describedby`.
* The compliance levels are achievable with the [*Default Ocean Blue A11y* theme swatch]({%slug overview_accessibility%}#color-contrast) or any other [custom theme swatch]({%slug sassbasedthemes_customization_telerikui%}) that provides the minimum required color contrast.
* The accessibility and compliance of some components may depend on the enabled features. In such cases, the compliance table information is based on the default component configuration.
* Component templates introduce custom markup that may not be accessible. Test any modifications to ensure the web content still meets the desired level of accessibility compliance. Be mindful of components that work with user input such as images, text, or HTML content.
* Due to the complexity of some components, there are scenarios that are not covered by the WAI-ARIA specification.

## See Also

* [Accessibility Overview]({%slug overview_accessibility%})
* [Globalization Overview]({%slug overview_globalization_core%})

