---
title: 2025 Releases
page_title: 2025 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2025."
slug: breakingchanges_2025
position: 1
---

# 2025 Releases

This article lists the breaking or important changes in the 2025 releases of {{ site.product }}.

{% if site.core %}
## {{ site.product }} Q2 2025

### PopOver

The [`IconClass()`](/api/kendo.mvc.ui.fluent/popoveractionbuilder#iconclasssystemstring) option of the PopOver HtmlHelper and the [`icon-class`](/api/kendo.mvc.taghelpers/popoveractiontaghelper#attributes) attribute of the PopOver TagHelper now expect a `string` instead of a JavaScript handler or a template delegate (`System.Func<Object,Object>`).

```HtmlHelper
    <span id="target">Hover</span>

    @(Html.Kendo().Popover()
        .For("#target")
        .Body("Content description")
        .Actions(a =>
        {
            // "IconClass" adds a CSS class to the icon element inside the action button.
            a.Add().Text("refresh").Icon("arrow-rotate-cw").IconClass("refresh-icon");
        })
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <span id="target">Hover</span>

    <kendo-popover for="#target" body="Content description">
        <actions>
            <!-- "icon-class" adds a CSS class to the icon element inside the action button.-->
            <action text="refresh" icon="arrow-rotate-cw" icon-class="refresh-icon"></action>
        </actions>
    </kendo-popover>
```
{% endif %}

## {{ site.product }} Q1 2025

### License Activation

Starting with 2025 Q1, all users of {{ site.product }} will need to apply a valid license key file to both new and existing projects. For details, see our [Licensing Documentation]({% slug installation_license_key_aspnetcore %}).
