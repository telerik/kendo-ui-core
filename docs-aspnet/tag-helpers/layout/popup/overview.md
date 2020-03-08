---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Popup TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/popup, /helpers/tag-helpers/popup
slug: taghelpers_popup_aspnetcore
position: 1
---

# Popup TagHelper Overview

The Telerik UI Popup TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Popup widget.

The Popup positions content next to a specific anchor.

## Initializing the Popup

The Popup is used in the configuration of other tag helpers.

The following example demonstrates how to define the popup animation configuration of the Telerik UI Tooltip tag helper.

        <kendo-tooltip name="agglomerations" filter="span" position="top" width="120">
			<popup-animation>
				<open effects="fade:in" duration="300" />
			</popup-animation>
		</kendo-tooltip>
