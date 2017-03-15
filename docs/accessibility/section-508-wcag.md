---
title: Section 508 and WCAG 2.0 Compliance
page_title: Section 508 and WCAG 2.0 Compliance | Kendo UI Accessibility Support
description: "Learn more about the Section 508 and WCAG 2.0 Accesibility support provided by Kendo UI controls."
slug: section508_wcag20_accessibility_support
position: 3
---

# Components Built According to W3C Web Content Accessibility Guidelines and Section 508

The Kendo UI widgets follow the [W3C Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG/) which set the standards for applications providing accessible content. According to how many of the guidelines are followed in building the app, W3C defines three levels of accessibility conformance: “A”, “AA” and “AAA”.

The Kendo UI components also conform to the technical standards set out in Section 508 of the Rehabilitation Act, the law that requires that all Federal Agencies make their electronic and information technology accessible to people with disabilities. Detailed information about the accessibility features Kendo UI delivers according to the Section 508 Web content standards can be found in [Section 508 article](/accessibility/section-508).

Applications built with components adhering to these guidelines will not only be accessible to people with disabilities, but also to users of all kinds of devices and interfaces: desktop browser, voice browser, mobile phone, automobile-based personal computer, etc.

**Table 1. 508 and WCAG 2.0 Compliance Report for Kendo UI widgets**

|Component name|508|WCAG 2.0|Demo
|:---          |:---|:---  |:--- 
|Grid          |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/grid/index)
|TreeList	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/treelist/index)
|PivotGrid	   |No |     |[Browse](http://demos.telerik.com/kendo-ui/pivotgrid/index)
|ListView	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/listview/index)
|MediaPlayer   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/mediaplayer/index)
|ScrollView	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/scrollview/index)
|Calendar	   |No  |    |[Browse](http://demos.telerik.com/kendo-ui/calendar/index)
|DatePicker	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/datepicker/index)
|DateTimePicker|Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/datetimepicker/index)
|TimePicker	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/timepicker/index)
|ListBox	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/listbox/index)
|Sortable	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/sortable/index)
|Diagram	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/diagram/index)
|MaskedTextbox |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/maskedtextbox/index)
|NumericTextbox|No  |    |[Browse](http://demos.telerik.com/kendo-ui/numerictextbox/index)
|BarCode	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/barcode/index)
|QRCode	   	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/qrcode/index)
|LinearGauge   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/linear-gauge/index)
|RadialGauge   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/radial-gauge/index)
|Area Chart	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/area-charts/index)
|Bar Chart	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/bar-charts/index)
|Box Plot Chart|Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/box-plot-charts/index)
|Bubble Chart  |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/bubble-charts/index)
|Bullet Chart  |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/bullet-charts/index)
|Donut Chart   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/donut-charts/index)
|Funnel Chart  |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/funnel-charts/index)
|Line Chart	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/line-charts/index)
|Pie Chart	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/pie-charts/index)
|Polar Chart   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/polar-charts/index)
|Radar Chart   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/radar-charts/index)
|Range Bar Chart|Yes |AAA|[Browse](http://demos.telerik.com/kendo-ui/range-bar-charts/index)
|Scatter Chart |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/scatter-charts/index)
|Sparklines	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/sparklines/index)
|Stock Chart   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/financial/index)
|TreeMap	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/treemap/index)
|Waterfall Chart|Yes |AAA|[Browse](http://demos.telerik.com/kendo-ui/waterfall-charts/index)
|Map	   |No |   |[Browse](http://demos.telerik.com/kendo-ui/map/index)

## Special Considerations

Several Kendo UI widgets feature complex rendering which affects their support for the accessibility standards provisioned by Section 508.

### Label Element Support

Widgets, such as the ComboBox, DropDownList, MultiSelect, and NumericTextBox, hide their initial `input` or `select` element which breaks the [`label.for`](https://developer.mozilla.org/en/docs/Web/HTML/Element/label#attr-for) functionality. In general, the browser cannot focus hidden elements. This results in the inability of the `label` element to focus the corresponding widget.

**Solution**

Place the widget inside the `label` element which in turn focuses the first visible element. Avoid using the `for` attribute because when it is applied to the `label` element, the respective widget does not focus.

###### Example

```
  <label>
    Amount:
    <input id="numerictextbox" title="Add a Descriptive Tilte"/>
  </label>

  <script>
    $(function() {
        $("#amount").kendoNumericTextBox();
    });
  </script>
```

## See Also

Other articles on the accessibility support provided by Kendo UI:

* [Overview of Web Accessibility Standards]({% slug overview_accessibility_support_kendoui %})
* [Charts]({% slug charts_accessibility_support %})
* [High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Keyboard Shortcuts]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Languages]({% slug right_toleft_languages_accessibility_support %})
* [WAI-ARIA]({% slug wai_aria_accessibility_support %})
