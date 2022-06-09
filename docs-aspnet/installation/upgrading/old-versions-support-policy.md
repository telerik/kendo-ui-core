---
title: Support for Previous Versions
page_title: Support Policy for Previous Kendo UI Versions
description: "Get started with {{ site.product }}  and learn about the support policy on earlier versions, how bug fixes and feature requests are implemented, and how you can get them."
previous_url: /getting-started/prerequisites/old-versions-support-policy, /compatibility/old-versions-support-policy, /installation-mvc/upgrading/old-versions-support-policy
slug: oldversionssupportpolicy_core
position: 50
---

# Earlier Versions Support Policy

This article provides information on the provided support for earlier {{ site.product }} versions.

The support policy includes the way bug fixes, feature enhancements, and browser compatibility are updated and applied across the Progress&reg; Kendo&reg; UI for jQuery, Progress&reg; Telerik&reg; UI for ASP.NET MVC, Progress&reg; Telerik&reg; UI for ASP.NET Core, Progress&reg; Telerik&reg; UI for JSP, and Progress&reg; Telerik&reg; UI for PHP suites.

* [Bug Fixes](#bug-fixes)
* [New Features and Helpers](#new-features-and-helpers)
* [Browser Compatibility](#browser-compatibility)
* [Implementation Support](#implementation-support)

> For best performance results, always use the latest {{ site.product }}  versions which contain all recent features and fixes that are available.

## Bug Fixes

Bugs in the {{ site.product }} helpers or the Kendo UI for jQuery widgets that the helpers wrap are fixed depending on the priority set by the product management and based on the {% if site.core %}[public Feedback portal](https://feedback.telerik.com/aspnet-core-ui) {% else %}[public Feedback Portal](https://feedback.telerik.com/aspnet-mvc){% endif %}, [support system](https://www.telerik.com/account/support-tickets/available-support-list.aspx), surveys, and client interviews.

Bug fixes are then implemented in the product by the Development team and later introduced in the first {% if site.core %}[official product release](https://www.telerik.com/support/whats-new/aspnet-core-ui/release-history) {% else %}[official product release](https://www.telerik.com/support/whats-new/aspnet-mvc-ui/release-history){% endif %}. Internal (nightly) builds may also contain bug fixes before an official release is available and you can use them to keep developing your application. However, avoid promoting them to production.

To get a bug fix, you have to upgrade your project to the same release as the release that contains the fix, or later. For more information, refer to [Downloading New Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %}).

If a workaround for an earlier version is technically feasible, you may be provided with such in the ticketing system. However, Progress Software Corporation cannot guarantee that bug fixes in earlier versions will be available and cannot give warranty for any workarounds that are provided.

## New Features and Helpers

Feature enhancements and new helpers become publicly available in the first major release and after their implementation by the Development team.

New features and helpers are not available for versions which come before the first version in which they were released.

## Browser Compatibility

Every {{ site.product }} version supports only the browsers available at release time.

## Implementation Support

When you use earlier Telerik UI versions, the Telerik technical support can provide suggestions on how to implement certain scenarios and features in your project depending on their technical feasibility. If such implementations rely on the API, fixes, or enhancements that are implemented in later versions, you will need to upgrade to a release which contains the feature you need.

## See Also

* [License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui)
