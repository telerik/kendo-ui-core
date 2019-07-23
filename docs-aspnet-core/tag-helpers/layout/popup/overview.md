---
title: Overview
page_title: Popup Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI Popup tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/popup, /aspnet-core/helpers/tag-helpers/popup
slug: taghelpers_popup_aspnetcore
position: 1
---

# Popup Tag Helper Overview

The Telerik UI Popup tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI Popup widget.

The Popup positions content next to a specific anchor.

## Initializing the Popup

The Popup is used in the configuration of other tag helpers.

The following example demonstrates how to define the popup animation configuration of the Telerik UI Tooltip tag helper.

        <kendo-tooltip name="agglomerations" filter="span" position="top" width="120">
			<popup-animation>
				<open effects="fade:in" duration="300" />
			</popup-animation>
		</kendo-tooltip>

## See Also

* [API Reference of the Popup Helper for ASP.NET Core](/api/popup)
