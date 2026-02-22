---
title: Sticky Tab in the TabStrip
description: An example on how to make a sticky tab that is always visible in a scrollable TabStrip.
type: how-to
page_title: Sticky tab in the TabStrip
slug: tabstrip-sticky-tab
tags: aspnet, mvc, core, dotnet-core, kendo, kendo-ui, tabstrip, tab, sticky, always, visible
res_type: kb
components: ["general"]
component: tabstrip
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
</table>

## Description

How can I make the first tab of the TabStrip sticky? It must remain always visible when I scroll the tabs.

## Solution

Use the HtmlAttributes configuration option, to set a custom class (`always-visible` in the example below) to the first tab. Then use the class as a selector in a CSS rule that customizes the default positioning of the tab. 

```View
<div class="container" style="width: 400px">
	@(Html.Kendo().TabStrip()
		.Name("tabstrip")
		.Scrollable(true)
		.Items(items =>
		{
			items.Add().Text("Sticky tab").HtmlAttributes(new { @class = "always-visible" })
					.Content(@<text>
						<p>Tab 1 content...</p>
					</text>);

			items.Add().Text("Tab 2")
					.Content(@<text>
						<p>Tab 2 content...</p>
					</text>);

			items.Add().Text("Tab 3")
					.Content(@<text>
						<p>Tab 3 content...</p>
					</text>);

			items.Add().Text("Tab 4")
					.Content(@<text>
						<p>Tab 4 content...</p>
					</text>);

			items.Add().Text("Tab 5")
					.Content(@<text>
						<p>Tab 5 content...</p>
					</text>);

		})
	)
</div>

<style>
	.always-visible {
		position: sticky !important;
		left: 0 !important;
		background-color: white;
		z-index: 22000;
	}
</style>
```

## More {{ site.framework }} TabStrip Resources

* [{{ site.framework }} TabStrip Documentation]({%slug htmlhelpers_tabstrip_aspnetcore%})

* [{{ site.framework }} TabStrip Demos](https://demos.telerik.com/{{ site.platform }}/tabstrip)

{% if site.core %}
* [{{ site.framework }} TabStrip Product Page](https://www.telerik.com/aspnet-core-ui/tabstrip)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TabStrip Product Page](https://www.telerik.com/aspnet-mvc/tabstrip)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TabStrip for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
* [Server-Side API Reference of the TabStrip for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/tabstrip)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
