---
title: Overview
page_title: AIPrompt Documentation | AIPrompt Accessibility
description: "Get started with the {{ site.product }} AIPrompt and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_aiprompt
position: 1
---

# AIPrompt Accessibility

Out of the box, the {{ site.product }} AIPrompt provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The AIPrompt is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### AIPrompt

The AIPrompt component is a composite one and integrates the accessibility of the Toolbar, TextArea, Card List container.

### TextArea Component

[TextArea accessibility specification]({% slug accessibility_textarea_overview %})

### Prompt Suggestion Component

The Prompt Suggestion list implements roving tabindex navigation. Meaning that only one suggestion has `tabindex=0`. The display of the suggestion list is controlled by the expand button.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-expander .k-button` | `aria-controls=.k-prompt-expander-content id` | Points to the controlled element based on the given `id`. |
|  | `aria-expanded=true/false` | Indicates the expanded state of the prompt expander content. |
| `.k-prompt-expander .k-prompt-expander-content` | `role=list` | Indicates that the suggestion container element is a list. |
| `.k-prompt-expander .k-prompt-suggestion` | `role=listitem` | Indicates that the suggestion element is a listitem. |
|  | `tabindex=0/-1` | The element must be focusable. |

### Toolbar Component

[ToolBar accessibility specification]({% slug accessibility_toolbar_overview %})

### More Actions View - PanelBar Component

[PanelBar accessibility specification]({% slug accessibility_aspnetcore_panelbar %})

## Section 508

The AIPrompt is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The AIPrompt has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The AIPrompt has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the AIPrompt component, refer to the [ActionSheet Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/aiprompt).

## Keyboard Navigation

For details on how the AIPrompt keyboard navigation works, refer to the [AIPrompt Keyboard Navigation]({%slug keynav_aspnetcore_aiprompt%}) article.

## See Also
* [Keyboard Navigation by the AIPrompt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/keyboard-navigation)
* [Keyboard Navigation by the AIPrompt for {{ site.framework }}]({% slug keynav_aspnetcore_aiprompt %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})