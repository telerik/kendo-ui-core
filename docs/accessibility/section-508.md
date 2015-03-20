---
title: Section 508 Support
page_title: Section 508 Support
description: Kendo UI Section 508 support
position: 2
---

# Kendo UI Section 508 Support

The following table shows the level of support that Kendo UI provides for the
[Section 508 Web standard](http://www.section508.gov/section-508-standards-guide#Web).

## Section 1194.22 Web-based Internet Information and Applications

|Criteria|Supporting features|Remarks
|------------|----|----
|[(a)](https://www.webaccessibility.com/best_practices.php?standard_id=1000704) A text equivalent for every non-text element shall be provided (e.g., via "alt", "longdesc", or in element content).|Supports|All images (`img` HTML elements) used by Kendo UI have their `alt` attribute set. If the developer uses images in Kendo UI templates he or she must set the "alt" or "longdesc" attribute in the template definition.)
|[(b)](https://www.webaccessibility.com/best_practices.php?standard_id=1000727) Equivalent alternatives for any multimedia presentation shall be synchronized with the presentation.|Not applicable|Kendo UI does not use multimedia (sound or video) presentation.
|[(c)](https://www.webaccessibility.com/best_practices.php?standard_id=1000730) Web pages shall be designed so that all information conveyed with color is also available without color, for example from context or markup.|Supports with exceptions|Kendo UI widgets make sure that information is conveyed by other means besides color. The only exception is the Gantt.
|[(d)](https://www.webaccessibility.com/best_practices.php?standard_id=1000736) Documents shall be organized so they are readable without requiring an associated style sheet.|Supports with exceptions|Kendo UI widgets will work without an applied stylesheet. Some widgets with rich UI (Scheduler, Gantt) will not look as good.
|[(e)](https://www.webaccessibility.com/best_practices.php?standard_id=1000739) Redundant text links shall be provided for each active region of a server-side image map.|Supports|Kendo UI does not use image maps.
|[(f)](https://www.webaccessibility.com/best_practices.php?standard_id=1000741) Client-side image maps shall be provided instead of server-side image maps except where the regions cannot be defined with an available geometric shape.|Supports|Kendo UI does not use image maps.
|[(g)](https://www.webaccessibility.com/best_practices.php?standard_id=1000743) Row and column headers shall be identified for data tables.|Supports with exceptions|The Kendo UI widgets use attributes to identify the column headers.  The Pivot and Scheduler are exceptions that will be addressed by a future update.
|[(h)](https://www.webaccessibility.com/best_practices.php?standard_id=1000750) Markup shall be used to associate data cells and header cells for data tables that have two or more logical levels of row or column headers.|Does not support|Kendo UI doesn't identify headers for complex data tables. Will be addressed by a future update.
|[(i)](https://www.webaccessibility.com/best_practices.php?standard_id=1000753) Frames shall be titled with text that facilitates frame identification and navigation.|Does not support|The Kendo UI Editor doesn't set the title of the content editable iframe. Will be addressed by a future update.
|[(j)](https://www.webaccessibility.com/best_practices.php?standard_id=1000756) Pages shall be designed to avoid causing the screen to flicker with a frequency greater than 2 Hz and lower than 55 Hz.|Supports|Kendo UI does not cause screen flicker with a frequency greater than 2 Hz and lower than 55 Hz.
|[(k)](https://www.webaccessibility.com/best_practices.php?standard_id=1000759) A text-only page, with equivalent information or functionality, shall be provided to make a web site comply with the provisions of this part, when compliance cannot be accomplished in any other way. The content of the text-only page shall be updated whenever the primary page changes.|Not applicable| The developer is responsible for providing text-only content for pages that use Kendo UI.
|[(l)](https://www.webaccessibility.com/best_practices.php?standard_id=1000763) When pages utilize scripting languages to display content, or to create interface elements, the information provided by the script shall be identified with functional text that can be read by assistive technology.|Supports|Kendo UI is a JavaScript framework and can't operate when JavaScript is disabled.  Kendo UI provides keyboard navigation support and screen reader support (via ARIA attributes).
|[(m)](https://www.webaccessibility.com/best_practices.php?standard_id=1000782) When a web page requires that an applet, plug-in or other application be present on the client system to interpret page content, the page must provide a link to a plug-in or applet that complies with §1194.21(a) through (l).|Supports|Kendo UI doesn't use any external plug-ins or applets.
|[(n)](https://www.webaccessibility.com/best_practices.php?standard_id=1000785) When electronic forms are designed to be completed on-line, the form shall allow people using assistive technology to access the information, field elements, and functionality required for completion and submission of the form, including all directions and cues.|Supports with exceptions|Most forms in Kendo UI are accessible to assistive technologies with some exceptions that will be addressed by a future update.
|[(o)](https://www.webaccessibility.com/best_practices.php?standard_id=1000794) A method shall be provided that permits users to skip repetitive navigation links.|Supports|Kendo UI does not provide a 'skip navigation link', but instead offers keyboard shortcuts to most of the features in the user interface.
|[(p)](https://www.webaccessibility.com/best_practices.php?standard_id=1000797) When a timed response is required, the user shall be alerted and given sufficient time to indicate more time is required.|Supports|Kendo UI does not require a timed response as part of its core functionality.
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
