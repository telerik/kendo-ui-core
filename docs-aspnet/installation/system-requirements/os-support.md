---
title: OS, Visual Studio, and Browser Support
page_title: Operating System, Visual Studio and Browser Support
description: "Get started with {{ site.product }} and learn which are the operating systems, Visual Studio versions, and Browsers that are supported by the framework components."
previous_url: /getting-started/prerequisites/os-support, /compatibility/os-support, /getting-started/prerequisites/visual-studio-support, /compatibility/visual-studio-support, /getting-started/prerequisites/browser-support, /compatibility/browser-support, /installation-mvc/system-requirements/browser-support.md
slug: ossupport_core
position: 1
---

# Operating System, Visual Studio, and Browser Support

The {{ site.product }} components are designed to support all major operating systems and the most popular Visual Studio versions. The components also support all major web browsers and deliver cross-browser compatibility, standards compliance, and touch-device support.

{% if site.core %}
{{ site.product_short }} targets the stable releases of the {{ site.framework }} framework. The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The {{ site.product_short }} suite also supports the full desktop CLR.
{% endif %}

## Operating System Support

{{ site.product }} supports the following operating systems:

| PLATFORM          | VERSION               |
| :---------------- | :-------------------- |
| Windows           | The two latest versions at the time of the release. |
| Mac OS            | The two latest versions at the time of the release. |
| Android           | The two latest versions at the time of the release. |
| iOS               | The two latest versions at the time of the release. |

> * Telerik UI supports hybrid mouse and touch-screen devices.
> * To allow any browser to run scripts, enable JavaScript in the browser.

## Visual Studio Support

{% if site.core %}
The table below describes the minimum required version of Visual Studio based on the target `.NET Core SDK` version.

| .NET CORE SDK     | VISUAL STUDIO                 | 
| :---------------- | :---------------------------- |
| 8.0               | Visual Studio 2022 |
| 7.0               | Visual Studio 2022 |
| 6.0               | Visual Studio 2022 | 
| 5.0               | Visual Studio 2022, or Visual Studio 2019 version 16.8 or higher. |
| 3.1               | Visual Studio 2019 version 16.4 or higher. |
| 3.0               | Visual Studio 2019 version 16.3 or higher. |
| 2.2               | Visual Studio 2017 version 15.9 or higher. |
| 2.1               | Visual Studio 2017 version 15.7 or higher. |

>The R1 2024 release will be the last release that supports .NET versions older than 6.0. One year of outstanding support service will be provided for the R1 2024 release. For more details on the reasons for dropping the support of the old .NET versions, see this [blog post](https://www.telerik.com/blogs/embracing-future-product-update-enhanced-performance-and-security).

### Dependencies and Requirements

To create .NET Core applications, you need to install the `.NET Core SDK`. Follow the instructions from the [official .NET Core documentation site](https://docs.microsoft.com/en-us/dotnet/core/install/sdk?pivots=os-windows).

For a full list of the `.NET Core` requirements, see [.NET Core dependencies and requirements](https://docs.microsoft.com/en-us/dotnet/core/install/dependencies?tabs=netcore31&pivots=os-windows).

{% else %}
{{ site.product }} supports Visual Studio 2013 and later. The supported development environments also include:

* [.NET Framework v4.5](https://www.microsoft.com/en-us/download/details.aspx?id=21) and later.
* [ASP.NET MVC 5](https://docs.microsoft.com/en-us/aspnet/mvc/overview/getting-started/introduction/getting-started).
* [IIS](https://www.iis.net/) 5 and later.
* [C#](https://msdn.microsoft.com/en-us/library/aa288436(v=vs.71).aspx) and [VB.NET](http://www.tutorialspoint.com/vb.net/).
* [SharePoint 2013](https://docs.microsoft.com/en-us/sharepoint/) and later.

>As of the R3 2022 release, MVC 3 and MVC 4 are no longer supported by {{ site.product }}.
>The R1 2024 release will be the last release that supports .NET Framework versions older than 4.6.2. One year of outstanding support service will be provided for the R1 2024 release. For more details on the reasons for dropping the support of the old .NET Framework versions, see this [blog post](https://www.telerik.com/blogs/embracing-future-product-update-enhanced-performance-and-security).  

{% endif %}

## Web Browsers Support

The {{ site.product }} helpers and framework components deliver support for all popular browsers. However, depending on the specifics of your project, the components you use, and the versions of the helpers, their browser support may vary. For example, advanced component features usually require more recent browser versions.

>To allow the browsers to run the scripts required by the Telerik components, enable JavaScript on all of them.
> Following [Microsoft's announcement about Internet Explorer (IE) being officially retired and out of support](https://learn.microsoft.com/en-us/lifecycle/announcements/internet-explorer-11-end-of-support), the {{ site.product }} and Kendo UI products will no longer support IE as of their R1 2023 release. The components will not be tested against and no fixes will be implemented for any IE version. If your project requires you to use the UI components in IE, it is recommended that you download a product version that is prior to {{ site.product }} R1 2023.

### Regular Support

Most [{{ site.product }} helpers]({% slug overview_aspnetmvc6_aspnetmvc %}#list-of-helpers) have no specific limitations for the browser versions they support.

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS
| :---------------- | :---------------------------- | :---------------
| Edge              | The two latest versions at the time of the release. |
| Chrome            | The two latest versions at the time of the release. |
| Firefox           | The two latest versions at the time of the release. This includes [Firefox ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/)). |
| Opera             | The two latest versions at the time of the release. |
| Safari (OS X)       | The two latest versions at the time of the release. |

### Support for PDF Export

The Telerik PDF generator is tested and supported in the following desktop browsers:
* Latest Chrome, Edge, Firefox, Safari.

> Internet Explorer 9 and Safari do not support the PDF-related option for saving files. To achieve this, you need to [implement a server proxy](https://docs.telerik.com/kendo-ui/controls/grid/export/pdf-export#using-server-proxy).

Officially, PDF export is not supported on mobile because of browser limitations and CORS-related security restrictions in hybrid applications. For example, it is not possible to load locally stored font files in hybrid applications. Even though exporting in PDF might work on some mobile devices in specific scenarios, PDF export is not supported in mobile browsers and hybrid mobile applications.

### Best Performance

To boost the performance of your project:
* Always use an up-to-date browser version.
* Check **Disable Script Debugging** from your browser configuration options.

### Limitations

* As of the {{ site.product }} R1 2023 release, the support for all versions of Internet Explorer is discontinued.
* Browsers in beta stage are not supported.
* Zoomed-in pages are not supported.
* Zoomed-out pages are not supported. Different browsers handle sub-pixel calculations differently and zooming out the page may lead to unexpected behavior&mdash;for example, missing borders.
* Exporting a zoomed-in or zoomed-out page to PDF is not supported.
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.

    > Always specify a [DOCTYPE](http://www.sitepoint.com/web-foundations/doctypes/). Recommended DOCTYPEs include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and should not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all DOCTYPEs](http://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](http://www.w3.org/).

* In product versions before R1 2023, Internet Explorer compatibility modes are not supported. These modes can exhibit different behavior and rendering bugs as compared to the browser versions they emulate.
* It is highly advisable to use [Internet Explorer Edge mode](https://docs.microsoft.com/en-us/internet-explorer/ie11-deploy-guide/tips-and-tricks-to-manage-ie-compatibility) over a META tag or an HTTP header:

    ```
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    ```

* {{ site.product }} uses a progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS 3 styles such as rounded corners and linear gradients.

## See Also

{% if site.core %}
* [Visual Studio 2015 Support]({% slug vs2015support_core %})
{% endif %}
* [jQuery Version Support by {{ site.product }}]({% slug jquerysupport_core %})
* [OS and Web Browser Support by {{ site.product }}]({% slug ossupport_core %})
* [PDF and Excel Export Support by {{ site.product }}]({% slug exportsupport_core %})
* [Earlier Versions Support Policy by {{ site.product }}]({% slug oldversionssupportpolicy_core %})
