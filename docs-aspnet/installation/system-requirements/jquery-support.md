---
title: jQuery Support
page_title: jQuery Support
description: "Get started with {{ site.product }} and learn which jQuery versions are supported by the component library."
previous_url: /getting-started/prerequisites/jquery-support, /compatibility/jquery-support, /installation-mvc/system-requirements/jquery-support
slug: jquerysupport_core
position: 2
---

# jQuery Support

{{ site.product }} is a set of server-side wrappers that wrap Kendo UI for jQuery widgets.

The Kendo UI library is based on [jQuery](http://jquery.com/) and all Kendo UI bundles before R3 2023 include the corresponding minified jQuery library in their `js` directories.

> As of R3 2023 the Kendo UI bundles do not include the jQuery library in their `js` directories and you can use any available jQuery source you prefer (https://jquery.com/download/).
> In order for the Kendo UI scripts to work as expected, always include a reference to the jQuery library in the document before the scripts.

## Supported Versions

{{ site.product }} is compatible with jQuery 1.10.x, 2.2.x and 3.7.0. Usually, each newly released jQuery version introduces breaking changes and is not compatible with the existing {{ site.product }}. In such cases, use the previous jQuery version until the release of the next official {{ site.product }} version that resolves the issue is released.

Generally, the {{ site.product }} service packs and their related major releases ship with the same jQuery version. The jQuery version changes only with new major releases.

The following table provides a list of the jQuery versions that are compatible with the major {{ site.product }} releases and their corresponding service packs.

{% if site.core %}
| Major Releases												                                         | jQuery Version    | Comments  |
| :---															                                             | :---			         | :---	     |
| [UI for ASP.NET Core 2023.3.1010 (R3 2023)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2023-(version-2023-3-1010))|N/A| Compatible with 1.10.x, 2.2.x and 3.7.0|
| [UI for ASP.NET Core 2023.2.606 (R2 2023)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2023-(version-2023-2-606))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.7.0|
| [UI for ASP.NET Core 2023.1.117 (R1 2023)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r1-2023-(version-2023-1-117))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.1|
| [UI for ASP.NET Core 2022.3.913 (R3 2022)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2022-(version-2022-3-913))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.1|
| [UI for ASP.NET Core 2022.2.510 (R2 2022)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2022-(version-2022-2-510))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET Core 2022.1.119 (R1 2022)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r1-2022(-version-2022-1-119))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET Core 2021.3.914 (R3 2021)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r3-2021)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET Core 2021.2.511 (R2 2021)](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history/ui-for-asp-net-core-r2-2021)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
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

{% else %}
| Major Releases												                                         | jQuery Version    | Comments  |
| :---															                                             | :---			         | :---	     |
| [UI for ASP.NET MVC 2023.3.1010 (R3 2023)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2023-(version-2023-3-1010))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.7.0|
| [UI for ASP.NET MVC 2023.2.606 (R2 2023)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2023-(version-2023-2-606))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.7.0|
| [UI for ASP.NET MVC 2023.1.117 (R1 2023)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r1-2023-(version-2023-1-117))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.1|
| [UI for ASP.NET MVC 2022.3.913 (R3 2022)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2022-(version-2022-3-913))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.1|
| [UI for ASP.NET MVC 2022.2.510 (R2 2022)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2022-(version-2022-2-510))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET MVC 2022.1.119 (R1 2022)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r1-2022-(version-2022-1-119))|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET MVC 2021.3.914 (R3 2021)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2021)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET MVC 2021.2.511 (R2 2021)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2021)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.6.0|
| [UI for ASP.NET MVC 2021.1.119 (R1 2021)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r1-2021)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.5.1|
| [UI for ASP.NET MVC 2020.3.915 (R3 2020)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2020)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.5.1|
| [UI for ASP.NET MVC 2020.2.513 (R2 2020)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2020)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.5.1|
| [UI for ASP.NET MVC 2020.1.114 (R1 2020)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r1-2020)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.4.1|
| [UI for ASP.NET MVC 2019.3.917 (R3 2019)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2019)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.4.1|
| [UI for ASP.NET MVC 2019.2.514 (R2 2019)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2019)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.4.1|
| [UI for ASP.NET MVC 2019.1.115 (R1 2019)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/progress-telerik-ui-for-asp-net-mvc-2019-1-115-changelog--kendouimvc-2019-1-115-7eeb9109-6558-40a3-9b9b-d6310f985cda)|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.3.1|
| [UI for ASP.NET MVC 2018.3.911 (R3 2018)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2018)	|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.3.1|
| [UI for ASP.NET MVC 2018.2.516 (R2 2018)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2018-kendouimvc-2018-2-516-a32e87f1-0759-4d41-b2a1-09f2494adcab)	|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.3.1|
| [UI for ASP.NET MVC 2018.1.117 (R1 2018)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r1-2018)	|1.12.4| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET MVC 2017.3.913 (R3 2017)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2017)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET MVC 2017.2.504 (R2 2017)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r2-2017)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET MVC 2017.1.118 (R1 2017)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r1-2017)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET MVC 2016.3.1118 (R3 2016 SP2)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2016-sp2)	|1.12.3| Also compatible with 1.10.x, 2.2.x and 3.1.1|
| [UI for ASP.NET MVC 2016.3.914 (R3 2016)](https://www.telerik.com/support/whats-new/aspnet-mvc/release-history/ui-for-asp-net-mvc-r3-2016)	|1.12.3| Also compatible with 1.10.x and 2.2.x|
{% endif %}
## Working with Earlier Versions

Occasionally, a legacy web application might require an earlier jQuery version that is incompatible with Kendo UI. To solve this issue, use a recent jQuery version together with the [jQuery Migrate plugin](https://github.com/jquery/jquery-migrate/). It restores the jQuery features that have been depreciated and provides for the required backward compatibility.

## See Also

* [PDF and Excel Export Support by {{ site.product }}]({% slug exportsupport_core %})
* [OS and Browser Support by {{ site.product }}]({% slug ossupport_core %})
* [Earlier Versions Support by {{ site.product }}]({% slug oldversionssupportpolicy_core %})
