---
title: Section 508 and WCAG 2.0 Compliance
page_title: Section 508 and WCAG 2.0 Compliance | Kendo UI Accessibility Support
description: "Learn more about the Section 508 and WCAG 2.0 Accesibility support provided by Kendo UI controls."
slug: section508_wcag20_accessibility_support
position: 3
---

# Section 508 and WCAG 2.0 Compliance

The Kendo UI widgets follow the [W3C Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG/).

They set the standards for applications for providing accessible content. Depending on the number of guidelines that is followed when building an application, W3C defines three levels of accessibility conformance&mdash;A, AA, and AAA levels.

The Kendo UI components also conform to the technical standards set out in Section 508 of the Rehabilitation Act. They represent the law that requires all Federal Agencies to make their electronic and information technology accessible to people with disabilities. For detailed information on the accessibility features according to the Section 508 Web content standards Kendo UI delivers, refer to the article about [Section 508]({% slug section508_accessibility_support %}).

Applications built with components that adhere to these guidelines will not only be accessible to people with disabilities, but also to users of all kinds of devices and interfaces such as desktop browser, voice browser, mobile phone, automobile-based personal computer, and so on.

**Table 1: 508 and WCAG 2.0 compliance with Kendo UI widgets**

|Component |508|WCAG 2.0|Demo
|:---          |:---|:---  |:---
|Grid          |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/grid/index)
|TreeList	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/treelist/index)
|PivotGrid	   |Yes | AAA |[Browse](http://demos.telerik.com/kendo-ui/pivotgrid/index)
|ListView	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/listview/index)
|MediaPlayer   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/mediaplayer/index)
|ScrollView	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/scrollview/index)
|Calendar	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/calendar/index)
|DateInput	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/dateinput/index)
|DatePicker	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/datepicker/index)
|DateTimePicker|Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/datetimepicker/index)
|TimePicker	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/timepicker/index)
|Sortable	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/sortable/index)
|Diagram	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/diagram/index)
|MaskedTextbox |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/maskedtextbox/index)
|NumericTextbox|Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/numerictextbox/index)
|BarCode	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/barcode/index)
|QRCode	   	   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/qrcode/index)
|LinearGauge   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/linear-gauge/index)
|RadialGauge   |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/radial-gauge/index)
|Charts        |Yes |AAA |[Browse](http://demos.telerik.com/kendo-ui/chart-api/index)
|Map	       |Yes | AAA|[Browse](http://demos.telerik.com/kendo-ui/map/index)

## Special Considerations

Several Kendo UI widgets feature complex rendering which affects their accessibility standards support provisioned by Section 508.

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

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
