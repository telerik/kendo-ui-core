---
title: Overview
page_title: Accessibility
description: "Get started with the Telerik UI Loader HtmlHelper for {{ site.framework }} and learn about its accessibility support for WAI-ARIA, Section 508 and WCAG 2.2."
slug: htmlhelpers_loader_aspnetcore_accessibility
position: 1
---

# Loader Accessibility

The Loader is accessible by screen readers and provides WAI-ARIA, Section 508 and WCAG 2.2.

For more information, refer to:
* [Accessibility in {{ site.product }}]({% slug compliance_accessibility %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in {{ site.product }}]({% slug overview_accessibility %}#wai-aria).

If the component is initially visible, you can add `aria-busy="true"` to the container so that its aria-label text would be read:

```Razor
<div id="test" aria-busy="true">
    @(Html.Kendo().Loader()
        .Name("loader")
    )
</div>
```

If the text should be read while dynamically showing/hiding the loader, you can add `aria-live="polite"`:

```dojo
<div id="test" aria-live="polite">
    @(Html.Kendo().Loader()
        .Name("loader")
    )
</div>
```

## Section 508

The Loader is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in {{ site.product }}]({% slug overview_accessibility %}#section-508).

## WCAG 2.2

The Loader supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in {{ site.product_short }} ]({% slug overview_accessibility %}#wcag-21).

##

## See Also

* [Accessibility in {{ site.product }}]({% slug compliance_accessibility %})