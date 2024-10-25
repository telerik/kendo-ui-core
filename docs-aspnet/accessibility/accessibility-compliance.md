---
title: Accessibility Compliance
page_title: Accessibility Support
description: "A list of the {{ site.product }} components in terms of the accessibility and keyboard navigation support they provide."
slug: compliance_accessibility
position: 90
---

# {{ site.product }} Accessibility {% if site.core %}Compliance{% else %}Support{% endif %}

<a href="assets/KendoUI-VPAT2.4RevINT.doc" download>Here</a> you can download the latest version of the VPAT Template, describing the {{ site.product }} accessibility compliance state.

The following table lists the {{ site.product }} components which support accessibility and keyboard navigation options.

{% include_relative accessibility-compliance-table.html %}

> The DropDownTree widget will be identified as not compliant to the WAI-ARIA spec when tested with static HTML analyzer if there is no selection in the widget and the `placeholder` configuration is not used. That is because the DropDownTree wrapper element, which has `role="listbox"` will not contain any `option` elements. That should be considered a known limitation in the widget. Detailed information on the scenario could be found in [this GitHub issue](https://github.com/telerik/kendo-ui-core/issues/6558#issuecomment-938449528).

## Suggested Links  

* [Overview of Accessibility]({% slug overview_accessibility %})
