---
title: Overview
page_title: MediaPlayer Documentation | MediaPlayer Accessibility
description: "Get started with the {{ site.product }} MediaPlayer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_mediaplayer_accessibility_overview_aspnetcore
position: 1
---

# MediaPlayer Accessibility

Out of the box, the {{ site.product }} MediaPlayer provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The MediaPlayer is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-mediaplayer-seekbar span` | `role=slider` | Announces the `slider` role of the seekbar element. |
|  | `aria-label` | Specifies label for the seekbar slider. |
|  | `aria-valuenow` | Specifies the currently selected value in the seekbar slider. |
|  | `aria-valuemin` | Specifies the minimum available value in the seekbar slider. |
|  | `aria-valuemax` | Specifies the maximum available value in the seekbar slider. |
| `.k-play-button` | `aria-selected=true` | Specifies whether the play is selected or not. |
|  | `aria-label` | Specifies label for the play/pause button. |
| `.k-volume-button` | `aria-selected=true` | Specifies whether the mute is selected or not. |
|  | `aria-label` | Specifies label for the mute button. |
| `.k-mediaplayer-volume span` | `role=slider` | Announces the `slider` role of the volume element. |
|  | `aria-label` | Specifies label for the volume slider. |
|  | `aria-valuenow` | Specifies the currently selected value in the volume slider. |
|  | `aria-valuemin` | Specifies the minimum available value in the volume slider. |
|  | `aria-valuemax` | Specifies the maximum available value in the volume slider. |
| `.k-mediaplayer-quality-wrap` | `role=listbox` | The quality element must be exposed as listbox. |
|  | `aria-label` | Specifies label for the quality button. |
| `.k-fullscreen-button` | `aria-selected=true` | Specifies whether the full screen is selected or not. |
|  | `aria-label` | Specifies label for full screen button. |

## Section 508

The MediaPlayer is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The MediaPlayer has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The MediaPlayer has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the MediaPlayer component, refer to the [MediaPlayer Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/mediaplayer).

## Keyboard Navigation

For details on how the MediaPlayer keyboard navigation works, refer to the [MediaPlayer Keyboard Navigation]({%slug htmlhelpers_mediaplayer_accessibility_keyboard_navigation_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the MediaPlayer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/keyboard-navigation)
* [Keyboard Navigation by the MediaPlayer for {{ site.framework }}]({% slug htmlhelpers_mediaplayer_accessibility_keyboard_navigation_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})