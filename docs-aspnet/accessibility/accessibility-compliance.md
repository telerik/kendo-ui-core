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

{% if site.core %}
{% include_relative accessibility-compliance-core.html %}
{% else %}
{% include_relative accessibility-compliance-mvc.html %}
{% endif %}

## Suggested Links  

* [Overview of Accessibility]({% slug overview_accessibility %})
