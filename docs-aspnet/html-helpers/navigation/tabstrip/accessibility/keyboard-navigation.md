---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product }} TabStrip and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["tabstrip"]
slug: keynav_aspnetcore_tabstrip
position: 2
---

# Keyboard Navigation

The keyboard navigation of the TabStrip is always available.

When focus reaches the tab list, use the `Arrow Left` and `Arrow Right` keys to move between horizontal tabs. Use the `Arrow Up` and `Arrow Down` keys for vertical tabs. The focused tab is activated automatically. You can also activate the focused tab with `Enter` or `Space`.

To navigate a Grid inside the active tab, enable the Grid's keyboard navigation with the `Navigatable(true)` HtmlHelper option. {% if site.core %}For the Grid TagHelper, set `navigatable="true"`.{% endif %} For details, see the [Grid keyboard navigation](../../../data-management/grid/accessibility/keyboard-navigation.md) and [Grid hidden-container](../../../data-management/grid/appearance/hidden-containers.md) documentation. Resizing a Grid after its tab becomes visible can correct layout issues, but it does not enable keyboard navigation or control screen-reader announcements.

For a complete example, refer to the [demo on keyboard navigation of the TabStrip](https://demos.telerik.com/{{ site.platform }}/tabstrip/keyboard-navigation).

## See Also

* [Keyboard Navigation in the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/keyboard-navigation)
* [Accessibility in the TabStrip HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_tabstrip_accessibility %})
