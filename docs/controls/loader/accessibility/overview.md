---
title: Overview
page_title: jQuery Loader Documentation - Loader Accessibility
description: "Get started with the jQuery Loader by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_loader_widget
position: 1
---

# Loader Accessibility

The Loader is accessible by screen readers and provides WAI-ARIA, Section 508 and WCAG 2.2.

For more information, refer to:
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

If the component is initially visible, you can add `aria-busy="true"` to the container so that its aria-label text would be read:

```dojo
<div id="test" aria-busy="true">
    <div id="loader"></div>
</div>
 
<script>
    $("#loader").kendoLoader();
</script>
```

If the text should be read while dynamically showing/hiding the loader, you can add `aria-live="polite"`:

```dojo
<div id="test" aria-live="polite">
    <div id="loader"></div>
</div>
 
<script>
    $("#loader").kendoLoader();
</script>
```

## Section 508

The Loader is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The Loader supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

##

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
