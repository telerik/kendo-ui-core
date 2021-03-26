---
title: jQuery Support
page_title: jQuery Support
description: "Get started with Telerik UI for ASP.NET Core and learn about the jQuery version support which is delivered by the library."
previous_url: /getting-started/prerequisites/jquery-support
slug: jquerysupport_core
position: 4
---

# jQuery Support

Telerik UI for ASP.NET Core is a set of server-side wrappers that wrap Kendo UI for jQuery widgets.

The Kendo UI library is based on [jQuery](http://jquery.com/) and all Kendo UI bundles include the corresponding minified jQuery library in their `js` directories.

> In order for the Kendo UI scripts to work as expected, include a reference to the jQuery library in the document before the scripts.

## Supported Versions

The current official version of Telerik UI for ASP.NET Core requires jQuery version 1.12.4. Usually, each newly released jQuery version introduces breaking changes and is not compatible with the existing Telerik UI for ASP.NET Core versions. In such cases, use the previous jQuery version until the next official Telerik UI for ASP.NET Core version that resolves the issue is released. Normally, the jQuery version that is shipped with the Telerik UI for ASP.NET Core service packs is not changed but is updated in major releases.

The following table provides a list of the jQuery versions that are compatible with the major Telerik UI for ASP.NET Core releases and their corresponding service packs.

| Major Releases												                                         | jQuery Version    | Comments  |
| :---															                                             | :---			         | :---	     |
| [UI for ASP.NET Core 2021.1.119 (R1 2021)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r1-2021)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.5.1|
| [UI for ASP.NET Core 2020.3.915 (R3 2020)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2020)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.5.1|
| [UI for ASP.NET Core 2020.2.513 (R2 2020)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2020)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.5.1|
| [UI for ASP.NET Core 2020.1.114 (R1 2020)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r1-2020)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.4.1|
| [UI for ASP.NET Core 2019.3.917 (R3 2019)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2019)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.4.1|
| [UI for ASP.NET Core 2019.2.514 (R2 2019)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2019)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.4.1|
| [UI for ASP.NET Core 2019.1.115 (R1 2019)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/progress-telerik-ui-for-asp-net-core-2019-1-115-changelog--uiaspcore-2019-1-115-058b0897-ab2d-46ba-b26d-4a4cbb33210c)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.3.1|
| [UI for ASP.NET Core 2018.3.911 (R3 2018)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2018)	|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.3.1|
| [UI for ASP.NET Core 2018.2.516 (R2 2018)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2018-uiaspcore-2018-2-516)	|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.3.1|
| [UI for ASP.NET Core 2018.1.117 (R1 2018)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r1-2018)	|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET Core 2017.3.913 (R3 2017)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2017)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET Core 2017.2.504 (R2 2017)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2017)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET Core 2017.1.118 (R1 2017)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r1-2017)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET Core 2016.3.1118 (R3 2016 SP2)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2016-sp2)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET Core 2016.3.914 (R3 2016)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2016)	|1.12.3| Also compatible with 1.10.x and 2.2.x|

## Working with Earlier Versions

Occasionally, a legacy web application might require an earlier jQuery version with which Kendo UI is not compatible. In such cases, use a recent jQuery version together with the [jQuery Migrate plugin](https://github.com/jquery/jquery-migrate/). It restores the jQuery features that have been depreciated and provides for the required backward compatibility.

## See Also

* [Web Browser Support by Telerik UI for ASP.NET Core]({% slug webbrowsersupport_core %})
* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
