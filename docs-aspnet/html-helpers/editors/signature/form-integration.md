---
title: Form Integration
page_title: Telerik UI Signature for {{ site.framework }} Documentation - Signature Form Integration
description: "Learn how to integrate the Signature inside a Telerik UI Form for {{ site.framework }}."
slug: form_integration_telerikui_signature_component
position: 3
---

# Signature Form Integration

The Telerik UI Signature for {{ site.framework }} allows you to integrate it inside a Telerik UI Form for {{ site.framework }}. Furthermore, you can validate the Signature before the form is submitted.

To integrate the Signature inside a Telerik UI Form for {{ site.framework }} component, add the [`Items.Editor`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/FormItemFactory#add) configuration of the form field to `Signature`.

```HtmlHelper
    @(Html.Kendo().Form<Kendo.Mvc.Examples.Models.Form.FormItemsViewModels>()
        .Name("exampleForm")
        .Items(items =>
        {
            items.AddGroup()
                .Label("Form")
                .Items(i =>
                {
                    i.Add()
                        .Field(f => f.Signature)
                        .Label(l => l.Text("Signature:").Optional(true))
                        .Editor(e => e.Signature());

                });
        })
    )
```
{% if site.core %}
```TagHelper
   <kendo-form name="exampleForm">
        <form-items>
            <form-item type="group">
                <item-label text="Form" />
                <form-items>
                    <form-item field="Signature">
                        <item-label text="Signature:" />
                        <signature-editor></signature-editor>
                    </form-item>
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>
```
{% endif %}

## See Also

* [Form Integration of the Signature (Demo)](https://demos.telerik.com/{{ site.platform }}/signature/form-integration)
* [API Reference of the Signature](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder)