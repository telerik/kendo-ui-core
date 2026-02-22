---
title: Overview
page_title: AIPrompt Documentation | AIPrompt Accessibility
description: "Get started with the {{ site.product }} AIPrompt and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["aiprompt"]
slug: htmlhelpers_aiprompt_accessibility
position: 1
---

# AIPrompt Accessibility





Out of the box, the {{ site.product }} AI Prompt provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The AI Prompt is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### AI Prompt


The AI Prompt component is a composite one and integrates the accessibility of the Toolbar, TextArea, Card, Chip and FloatingActionButton.

### TextArea Component

[TextArea accessibility specification]({% slug htmlhelpers_textarea_accessibility %})

### TextArea Adornments

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-textarea-prefix>.k-button` | `role=button` or `nodeName=button` | The buttons must have appropriate role. |
|  | `aria-label` or `title` | The buttons must be properly labelled. |
| `.k-textarea-suffix>.k-button` | `role=button` or `nodeName=button` | The buttons must have appropriate role. |
|  | `aria-label` or `title` | The buttons must be properly labelled. |
| `.k-textarea-suffix>.k-prompt-send.k-disabled` | `aria-disabled=true` | Announces send action as disabled if necessary. |

### Suggestion Component


The Suggestion list implements roving tabindex navigation. Meaning that only one suggestion has tabindex=0. The display of the suggestion list is controlled by the expand button.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-expander .k-button` | `aria-controls=.k-prompt-expander-content id` | Points to the controlled element based on the given `id`. |
|  | `aria-expanded=true/false` | Indicates the expanded state of the prompt expander content. |
| `.k-prompt-expander .k-suggestion-group` | `role=group` | Indicates that the suggestion container element is a group. |
| `.k-prompt-expander .k-suggestion` | `role=button` | Indicates that the suggestion element is a button. |
|  | `aria-label` or `title` | The suggestion elements must be properly labelled. |
|  | `tabindex=0` | The suggestion element should be focusable. |

### Button Component

[Button accessibility specification]({% slug htmlhelpers_button_accessibility %})

### Adaptive Mode


When the AI Prompt component is in adaptive mode, the popup element follows the specifications of the ActionSheet component.

[ActionSheet accessibility specification]({% slug htmlhelpers_actionsheet_accessibility %})

### Toolbar Component

[ToolBar accessibility specification]({% slug htmlhelpers_toolbar_accessibility %})

### Card List Container

[CardList accessibility specification]({{cardlist_a11y_link}})

### Card Component

[Card accessibility specification]({{card_a11y_link}})

### Chip Component

[Chip accessibility specification]({% slug htmlhelpers_chip_accessibility %})

### ChipList Component

[ChipList accessibility specification]({% slug htmlhelpers_chiplist_accessibility %})

### ContextMenu Component

[ContextMenu accessibility specification]({% slug htmlhelpers_contextmenu_accessibility %})

### FloatingActionButton Component

[FloatingActionButton accessibility specification]({% slug htmlhelpers_floatingactionbutton_accessibility %})

### SpeechToTextButton Component

[SpeechToTextButton accessibility specification]({% slug htmlhelpers_speechtotextbutton_accessibility %})

### More Actions View - PanelBar Component

[PanelBar accessibility specification]({% slug htmlhelpers_panelbar_accessibility %})

## Section 508


The AI Prompt is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The AI Prompt has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The AI Prompt has been tested with the following screen readers and browsers combinations:

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