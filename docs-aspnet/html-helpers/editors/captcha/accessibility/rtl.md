---
title: Right-to-Left support
page_title: Right-to-Left support
description: "Get started with the {{ site.product }} Captcha and learn how to set it in RTL mode."
slug: htmlhelpers_captcha_rtl
position: 3
---

# Captcha Right-to-Left Support

The Telerik UI Captcha fully supports right-to-left (RTL) language locales. To turn on the RTL support, set `dir=rtl` to the HTML or body element or, at least, to its parent element. You can also use the `direction:rtl` CSS property.

```HtmlHelper
<div dir="rtl">
    @(Html.Kendo().Captcha()
        .Name("Captcha")
        // Other options omitted for brevity.
    )
</div>
```
{% if site.core %}
```TagHelper
<div dir="rtl">
    <kendo-captcha name="Captcha">
        // Other options omitted for brevity.
    </kendo-captcha>
</div>
```
{% endif %}

## See Also

* [Basic Usage of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/index)
{% if site.core %}
* [Basic Usage of the Captcha TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/captcha/tag-helper)
{% endif %}
