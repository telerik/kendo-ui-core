---
title: Wai-Aria Support
page_title: PromptBox Accessibility
description: "Get started with the Telerik UI for {{ site.framework }} PromptBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_promptbox_accessibility_aspnetcore
position: 0
components: ["promptbox"]
---

# PromptBox Accessibility

The PromptBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to [Accessibility in Telerik UI for {{ site.framework }}]({% slug overview_accessibility %}).

Out of the box, the Telerik UI for {{ site.framework }} PromptBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The PromptBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation]({% slug htmlhelpers_promptbox_keyboard_navigation_aspnetcore %}) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

All relevant internal elements of the PromptBox component have the aria attributes and roles with their respective values, required for WCAG 2.2 compliance.

## Section 508

The PromptBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The PromptBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The PromptBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |
