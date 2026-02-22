---
title: Responsiveness
page_title: Responsive Telerik UI Pager component for {{ site.framework }}
description: "Get started with the Pager component for {{ site.framework }} and learn about its responsive feature."
components: ["pager"]
slug: responsive_pager_aspnet
position: 3
---

# Responsiveness

The Pager component is responsive by default. 

To disable the responsive behavior, set the [`Responsive()`](/api/kendo.mvc.ui.fluent/pagerbuilder#responsivesystemboolean) option to `false`. As a result, all Pager elements are visible, no matter the screen resolution of the device.

> Starting with version Q2 2025, the Pager's sizing is no longer based on fixed breakpoints. Instead, the optimized responsive behavior renders as many elements as possible within the available space. For more information, refer to the [Breaking Changes section]({% slug breakingchanges_2025%}#pager).

The responsive Pager determines which elements to render based on the available space. The component's elements are displayed in the following order:

* [Numeric Page Number Buttons](/api/kendo.mvc.ui.fluent/pagerbuilder#numericsystemboolean) or a [Numeric Input](/api/kendo.mvc.ui.fluent/pagerbuilder#numericsystemboolean), if the Pager type is set to `Input()`.
* [Page Sizes Dropdown](/api/kendo.mvc.ui.fluent/pagerbuilder#pagesizessystemboolean)
* [Info label](/api/kendo.mvc.ui.fluent/pagerbuilder#infosystemboolean)
* [Refresh button](/api/kendo.mvc.ui.fluent/pagerbuilder#refreshsystemboolean) (if enabled)

As the screen size decreases, the elements are hidden from the bottom to the top of this list, starting with the `Refresh` button, to maintain optimal layout within the available space.

On smaller screens, when using the default [`Numeric()`](/api/kendo.mvc.ui.fluent/pagerbuilder#numericsystemboolean) Pager type, the numeric page buttons are automatically replaced with a single input field that functions the same way as when the [`Input()`](/api/kendo.mvc.ui.fluent/pagerbuilder#numericsystemboolean) option is enabled.

## See Also

* [Use the Pager in Adaptive Mode]({% slug htmlhelpers_pager_adaptive_mode %})
* [Server-Side API of the Pager HtmlHelper](/api/pager)
{% if site.core %}
* [Server-Side API of the Pager TagHelper](/api/taghelpers/pager)
{% endif %}
* [Client-Side API  of the Pager](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager)


