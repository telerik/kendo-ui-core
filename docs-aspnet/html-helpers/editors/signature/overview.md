---
title: Overview
page_title: Telerik UI Signature for {{ site.framework }} Documentation - Signature Overview
description: "The Telerik UI Signature component for {{ site.framework }} provides a styled UI element that enables the user to create handwritten signatures."
slug: overview_telerikui_signature_component
position: 0
---

# {{ site.framework }} Signature Overview

The Telerik UI Signature for {{ site.framework }} is a server-side wrapper for the Kendo UI Signature widget.

The Telerik UI Signature for {{ site.framework }} enables the user to create handwritten signatures.

* [Demo page for the Signature HtmlHelper](https://demos.telerik.com/{{ site.platform }}/signature/index)

## Basic Configuration

The following example demonstrates the basic configuration for the Signature.

```HtmlHelper
        @(Html.Kendo().Signature()
                .Name("signature")
                .Maximizable(false)
                .HideLine(true))
```
{% if site.core %}
```TagHelper
        <kendo-signature name="signature"
                         maximizable="false"
                         hide-line="true">
        </kendo-signature>
```
{% endif %}

## Functionality and Features

* [Image Export]({% slug image_export_telerikui_signature_component %})—You can export the Signature to a PNG file.
* [Form Integration]({% slug form_integration_telerikui_signature_component %})—The Signature allows you to integrate it inside a Telerik UI Form component.

## Next Steps

* [Getting Started with the Signature]({% slug aspnetcore_signature_getting_started %})
* [Basic Usage of the Signature Component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/signature)

## See Also

* [Using the API of the Signature HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/signature/api)
* [Demo Page for the Signature](https://demos.telerik.com/{{ site.platform }}/signature)
* [API Reference of the Signature](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/signaturebuilder)
* [Knowledge Base Section](/knowledge-base)
