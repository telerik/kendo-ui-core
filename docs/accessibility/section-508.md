---
title: Section 508
page_title: Section 508 | Kendo UI Accessibility Support
description: "Learn more about the Section 508 Accesibility support provided by Kendo UI controls."
slug: section508_accessibility_support
position: 2
---

# Section 508

[Section 508](https://www.section508.gov/) is a set of standards ensuring that all users, regardless of their disability status, are able to access technology.

These standards apply to electronic and information technology and contain technical criteria specific to various types of technologies and performance-based requirements which focus on functional capabilities of covered products.

The following table is based on the [Voluntary Product Accessibility Template (VPAT)](https://www.itic.org/policy/accessibility/) requirements. It provides detailed explanation about the accessibility features Kendo UI delivers according to the [Section 508 Web content standards](https://www.section508.gov/content/learn/standards/quick-reference-guide#1194.22).

**Table 1. Section 1194.22 Web Information and Application Standards**

|CRITERIA |SUPPORTING FEATURES|REMARKS
|:---     |:---               |:---
|[(a)](https://www.webaccessibility.com/best_practices.php?standard_id=1000704) A text equivalent for every non-text element shall be provided&mdash;for example, through `"alt"`, `"longdesc"`, or in the element content.|Supports|All images (`img` HTML elements) used by Kendo UI have their `alt` attribute set. If developers use images in Kendo UI templates, they have to set the `"alt"` or `"longdesc"` attribute in the template definition.
|[(b)](https://www.webaccessibility.com/best_practices.php?standard_id=1000727) Equivalent alternatives for any multimedia presentation shall be synchronized with the presentation.|Supports|Kendo UI ships the [MediaPlayer widget]({% slug overview_kendoui_mediaplayer_widget %}).
|[(c)](https://www.webaccessibility.com/best_practices.php?standard_id=1000730) Web pages shall be designed so that all information conveyed with color is also available without color&mdash;for example, from context or markup.|Supports|Kendo UI widgets make sure that apart from color information is conveyed by other means too.
|[(d)](https://www.webaccessibility.com/best_practices.php?standard_id=1000736) Documents shall be organized so they are readable without requiring an associated style sheet.|Supports with exceptions|Kendo UI widgets work without an applied stylesheet. Some widgets with rich UI, such as the Scheduler and Gantt, do not look as good as designed. **Point (d.2) is not supported at all, because inline HTML styles, set by JavaScript, are still needed to ensure the correct rendering.**
|[(e)](https://www.webaccessibility.com/best_practices.php?standard_id=1000739) Redundant text links shall be provided for each active region of a server-side image map.|Supports|Kendo UI does not use image maps.
|[(f)](https://www.webaccessibility.com/best_practices.php?standard_id=1000741) Client-side image maps shall be provided instead of server-side image maps except where the regions cannot be defined with an available geometric shape.|Supports|Kendo UI does not use image maps.
|[(g)](https://www.webaccessibility.com/best_practices.php?standard_id=1000743) Row and column headers shall be identified for data tables.|Supports with exceptions|The Kendo UI widgets use attributes to identify the column headers. The Pivot and Scheduler are exceptions that will be addressed by a future update.
|[(h)](https://www.webaccessibility.com/best_practices.php?standard_id=1000750) Markup shall be used to associate data cells and header cells for data tables that have two or more logical levels of row or column headers.|Supports|
|[(i)](https://www.webaccessibility.com/best_practices.php?standard_id=1000753) Frames shall be titled with text that facilitates frame identification and navigation.|Supports|
|[(j)](https://www.webaccessibility.com/best_practices.php?standard_id=1000756) Pages shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.|Supports|Kendo UI does not cause screen flicker with a frequency greater than 2 Hz and lower than 55 Hz.
|[(k)](https://www.webaccessibility.com/best_practices.php?standard_id=1000759) A text-only page with equivalent information or functionality shall be provided to make a web site comply with the provisions of this part when compliance cannot be accomplished in any other way. The content of the text-only page shall be updated whenever the primary page changes.|Not applicable| Developers are responsible for providing text-only content for pages that use Kendo UI.
|[(l)](https://www.webaccessibility.com/best_practices.php?standard_id=1000763) When pages utilize scripting languages to display content or to create interface elements, the information provided by the script shall be identified with functional text that can be read by assistive technology.|Supports|Kendo UI is a JavaScript framework and cannot operate when JavaScript is disabled. Kendo UI provides keyboard navigation support and screen reader support through WAI-ARIA attributes.
|[(m)](https://www.webaccessibility.com/best_practices.php?standard_id=1000782) When a web page requires that an applet, plug-in, or other application be present on the client system to interpret page content, the page has to provide a link to a plug-in or applet that complies with §1194.21(a) through (l).|Supports|Kendo UI does not use any external plug-ins or applets.
|[(n)](https://www.webaccessibility.com/best_practices.php?standard_id=1000785) When electronic forms are designed to be completed online, the form shall allow people using assistive technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues.|Supports with exceptions|Most forms in Kendo UI are accessible to assistive technologies with some exceptions that will be addressed by a future update.
|[(o)](https://www.webaccessibility.com/best_practices.php?standard_id=1000794) A method shall be provided that permits users to skip repetitive navigation links.|Supports|Kendo UI does not provide a "skip navigation link" but instead offers keyboard shortcuts to most of the features in the user interface.
|[(p)](https://www.webaccessibility.com/best_practices.php?standard_id=1000797) When a timed response is required, the user shall be alerted and given sufficient time to indicate that more time is required.|Supports|Kendo UI does not require a timed response as part of its core functionality.
<style>
table td {
    vertical-align: top;
}
table td:nth-child(1) {
    width: 430px;
}
table td:nth-child(2) {
    white-space:nowrap;
}
</style>

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
