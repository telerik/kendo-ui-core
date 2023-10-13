---
title: Section 508 Support
page_title: Section 508 Support - Kendo UI Accessibility Support
description: "Learn more about the Section 508 Accesibility support provided by Kendo UI components."
slug: section508_accessibility_support
position: 3
---

# Section 508 Support

[Section 508](https://www.section508.gov/) is a set of standards ensuring that all users, regardless of their disability status, are able to access technology.

These standards apply to electronic and information technology and contain technical criteria specific to various types of technologies and performance-based requirements which focus on functional capabilities of covered products.

## Voluntary Product Accessibility Template

A [Voluntary Product Accessibility Template (VPAT®)](https://www.section508.gov/sell/vpat/) is a document that explains how information and communication technology (ICT) products such as software, hardware, electronic content, and support documentation meet (conform to) the Revised 508 Standards for IT accessibility.

> You can review and download the latest version of the Kendo UI VPAT document <a href="assets/KendoUI-VPAT2.4RevINT.doc" download>here</a>.

**Table 1. Section 1194.22 Web Information and Application Standards**

| Criteria | Support status| Remarks
|:---      |:---                |:---
|[(a)](https://www.webaccessibility.com/best_practices.php?standard_id=1000704) A text equivalent for every non-text element shall be provided&mdash;for example, through `"alt"`, `"longdesc"`, or in the element content.|Supported|All images (`img` HTML elements) used by Kendo UI have their `alt` attribute set. If developers use images in Kendo UI templates, they have to set the `"alt"` or `"longdesc"` attribute in the template definition.
|[(b)](https://www.webaccessibility.com/best_practices.php?standard_id=1000727) Equivalent alternatives for any multimedia presentation shall be synchronized with the presentation.|Supported|Kendo UI ships the [MediaPlayer component]({% slug overview_kendoui_mediaplayer_widget %}).
|[(c)](https://www.webaccessibility.com/best_practices.php?standard_id=1000730) Web pages shall be designed so that all information conveyed with color is also available without color&mdash;for example, from context or markup.|Supported|Kendo UI components make sure that apart from color information is conveyed by other means too.
|[(d)](https://www.webaccessibility.com/best_practices.php?standard_id=1000736) Documents shall be organized so they are readable without requiring an associated style sheet.|Supported with exceptions|Kendo UI components work without an applied stylesheet. Some components with rich UI, such as the Scheduler and Gantt, do not look as good as designed. **Point (d.2) is not supported at all, because inline HTML styles, set by JavaScript, are still needed to ensure the correct rendering.**
|[(e)](https://www.webaccessibility.com/best_practices.php?standard_id=1000739) Redundant text links shall be provided for each active region of a server-side image map.|Supported|Kendo UI does not use image maps.
|[(f)](https://www.webaccessibility.com/best_practices.php?standard_id=1000741) Client-side image maps shall be provided instead of server-side image maps except where the regions cannot be defined with an available geometric shape.|Supported|Kendo UI does not use image maps.
|[(g)](https://www.webaccessibility.com/best_practices.php?standard_id=1000743) Row and column headers shall be identified for data tables.|Supported with exceptions|The Kendo UI components use attributes to identify the column headers. The Pivot and Scheduler are exceptions that will be addressed by a future update.
|[(h)](https://www.webaccessibility.com/best_practices.php?standard_id=1000750) Markup shall be used to associate data cells and header cells for data tables that have two or more logical levels of row or column headers.|Supported|
|[(i)](https://www.webaccessibility.com/best_practices.php?standard_id=1000753) Frames shall be titled with text that facilitates frame identification and navigation.|Supported|
|[(j)](https://www.webaccessibility.com/best_practices.php?standard_id=1000756) Pages shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.|Supported|Kendo UI does not cause screen flicker with a frequency greater than 2 Hz and lower than 55 Hz.
|[(k)](https://www.webaccessibility.com/best_practices.php?standard_id=1000759) A text-only page with equivalent information or functionality shall be provided to make a website comply with the provisions of this part when compliance cannot be accomplished in any other way. The content of the text-only page shall be updated whenever the primary page changes.|Not applicable| Developers are responsible for providing text-only content for pages that use Kendo UI.
|[(l)](https://www.webaccessibility.com/best_practices.php?standard_id=1000763) When pages utilize scripting languages to display content or to create interface elements, the information provided by the script shall be identified with functional text that can be read by assistive technology.|Supported|Kendo UI is a JavaScript framework and cannot operate when JavaScript is disabled. Kendo UI provides keyboard navigation support and screen reader support through WAI-ARIA attributes.
|[(m)](https://www.webaccessibility.com/best_practices.php?standard_id=1000782) When a web page requires that an applet, plugin, or other application be present on the client system to interpret page content, the page has to provide a link to a plugin or applet that complies with §1194.21(a) through (l).|Supported|Kendo UI does not use any external plugins or applets.
|[(n)](https://www.webaccessibility.com/best_practices.php?standard_id=1000785) When electronic forms are designed to be completed online, the form shall allow people using assistive technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues.|Supported with exceptions|Most forms in Kendo UI are accessible to assistive technologies with some exceptions that will be addressed by a future update.
|[(o)](https://www.webaccessibility.com/best_practices.php?standard_id=1000794) A method shall be provided that permits users to skip repetitive navigation links.|Supported|Kendo UI does not provide a "skip navigation link" but instead offers keyboard shortcuts to most of the features in the user interface.
|[(p)](https://www.webaccessibility.com/best_practices.php?standard_id=1000797) When a timed response is required, the user shall be alerted and given sufficient time to indicate that more time is required.|Supported|Kendo UI does not require a timed response as part of its core functionality.
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

Some Kendo UI components feature complex rendering which affects their accessibility standards support provisioned by Section 508.

### Messages Support

Components, such as the Grid and the Calendar, require additional configuration to enable them to successfully pass the Section 508 validation. Because they render their content in tables, each table header element has to contain text. To achieve this behavior, use the [`messages.expandCollapseColumnHeader`](/api/javascript/ui/grid/configuration/messages.expandcollapsecolumnheader) and [`messages.weekColumnHeader`](/api/javascript/ui/calendar/configuration/messages.weekcolumnheader) configuration options.

The following example demonstrates how to specify a text for the expand (collapse) column.

```dojo
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

```dojo
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
* [Section 508 and WCAG 2.2 Compliance of Kendo UI Components]({% slug section508_wcag21_accessibility_support %})
* [WAI-ARIA Support in Kendo UI]({% slug wai_aria_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
