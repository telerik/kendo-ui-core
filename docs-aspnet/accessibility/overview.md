---
title: Overview
page_title: Accessibility Overview
description: "General accessibility standards and keyboard navigation requirements for web applications and their support by {{ site.product }}."
slug: overview_accessibility
position: 0
---

# {{ site.product }} Accessibility Overview

Websites and applications are accessible when they provide full control over their features by enabling users with disabilities to access their content by using assistive technologies or keyboard navigation.

For the full list of components which support accessibility and keyboard navigation, refer to the article on [accessibility support by {{ site.product }}]({% slug compliance_accessibility %}).

Refer to our [accessibility demos](https://demos.telerik.com/{{ site.platform }}/accessibility), where accessibility level and compliance of the {{ site.product }} components can be tested.

## Standards and Requirements

Accessible websites and applications normally provide support for:

* [Section 508](#section-508)
* [W3C Web Content Accessibility Guidelines (WCAG) 2.2](#wcag-22)
* [WAI-ARIA](#wai-aria)
* [Keyboard navigation requirements](#keyboard-navigation)

### Section 508

Section 508 of the Rehabilitation Act is a set of accessibility standards set by the U.S. General Services Administration (GSA). They apply to electronic and information technology and contain technical criteria specific to various types of technologies and performance-based requirements which focus on the functional capabilities of the listed products.

### WCAG 2.2

The W3C Web Content Accessibility Guidelines set the standards for applications regarding the provision of accessible content. Depending on the number of guidelines that are followed when building an application, W3C defines three levels of accessibility conformance&mdash;A, AA, and AAA levels.

### WAI-ARIA

WAI-ARIA is a World Wide Web Consortium accessibility specification. It specifies steps for developing web components that make them more accessible to assistive technologies such as screen readers. The WAI-ARIA framework is designed to be a framework for web developers to apply while creating web applications that use Ajax, scripting, and other rich application techniques.

### Keyboard Navigation

By default, users can only navigate to links, buttons, and form controls with a keyboard. The navigation order in which interactive items receive keyboard focus has to be logical and intuitive. Generally, it needs to follow the visual horizontal and vertical flow of the page. For example, left to right and top to bottom, header first followed by the main and then page navigation.

### Voluntary Product Accessibility Template

A [Voluntary Product Accessibility Template (VPAT®)](https://www.section508.gov/sell/vpat/) is a document that explains how information and communication technology (ICT) products such as software, hardware, electronic content, and support documentation meet (conform to) the Revised 508 Standards for IT accessibility.

> You can review and download the latest version of the Telerik UI VPAT document <a href="assets/KendoUI-VPAT2.4RevINT.doc" download>here</a>.

## Suggested Links

* [Accessibility Support by {{ site.product }}]({% slug compliance_accessibility %})
* [GSA Government-Wide Section 508 Accessibility Program](https://www.access-board.gov/law/ra.html#section-508-federal-electronic-and-information-technology)
* [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
