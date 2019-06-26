---
title: Overview
page_title: Popup Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Popup tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/popup, /aspnet-core/helpers/tag-helpers/popup
slug: taghelpers_popup_aspnetcore
position: 1
---

# Popup Tag Helper Overview

The Kendo UI Popup widget positions content next to a specific anchor.

The Popup tag helper extension is a server-side wrapper for the [Kendo UI Popup](https://docs.telerik.com/kendo-ui/controls/layout/popup/overview) widget and enables you to configure the Kendo UI Popup widget in ASP.NET Core applications.

## Initializing the Popup

The Popup is used in the configuration of other tag helpers.

The following example demonstrates how to define the popup animation configuration of the Kendo UI Tooltip tag helper.

        <kendo-tooltip name="agglomerations" filter="span" position="top" width="120">
			<popup-animation>
				<open effects="fade:in" duration="300" />
			</popup-animation>
		</kendo-tooltip>

## See Also

* [JavaScript API Reference of the Popup](http://docs.telerik.com/kendo-ui/api/javascript/ui/popup)
