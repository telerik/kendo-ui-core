---
title: Overview
page_title: Popup | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Popup tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/popup, /aspnet-core/helpers/tag-helpers/popup
slug: taghelpers_popup_aspnetcore
position: 1
---

# Popup Tag Helper Overview

The Popup tag helper helps you configure the Kendo UI Popup widget in ASP.NET Core applications.

## Basic Usage

The Popup is used in the configuration of other tag helpers.

The following example demonstrates how to define the popup animation configuration of the Kendo UI Tooltip tag helper.

###### Example

        <kendo-tooltip name="agglomerations" filter="span" position="top" width="120">
			<popup-animation>
				<open effects="fade:in" duration="300" />
			</popup-animation>
		</kendo-tooltip>

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
