---
title: Web Browser Support
page_title: Web Browser Support
description: "Get started with Telerik UI for ASP.NET Core and learn which are the browsers supported by the framework components."
previous_url: /getting-started/prerequisites/browser-support
slug: webbrowsersupport_core
position: 3
---

# Web Browser Support

The [Telerik UI for ASP.NET Core helpers and framework components](https://demos.telerik.com/aspnet-core/) are designed to support all major web browsers and deliver a cross-browser compatibility, standards compliance, or touch-device support.

However, depending on the specifics of your project, the components you use, and the versions of the helpers, their browser support may vary.

## Regular Support

Most [Telerik UI for ASP.NET Core helpers]({% slug overview_aspnetmvc6_aspnetmvc %}#list-of-helpers) have no specific limitations as of the browser versions they support.

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS
| :---------------- | :---------------------------- | :---------------
| Edge              | 20 or later ([officially supported versions by Microsoft only](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history)) |
| Internet Explorer* | 9 or later                    |
| Chrome            | Current and previous          |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

*\* some features may not be available due to browser limitations* 

## Support for Data Visualizing Helpers

The [Telerik UI for ASP.NET Core helpers which render data visualization]({% slug overview_aspnetmvc6_aspnetmvc %}#list-of-helpers), such as the Charts, Gauges, Barcodes, Diagrams, and Maps, may require more recent browser versions according to the following table.

**Fully supported browsers**

| BROWSER           | SUPPORTED VERSIONS            |
| :---------------- | :---------------------------- |
| Edge              | 20 or later ([officially supported versions by Microsoft only](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history)) |
| Internet Explorer | 9 or later                    |
| Chrome            | Current and previous          |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|
| iOS Safari        | iOS 8 or later                |
| Chrome for Mobile | 21 or later                   |

**Browsers with limited support**

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS                               |
| :---------------- | :---------------------------- | :-----------                              |
| Internet Explorer | 10                            | Dashed lines in canvas are not supported, which affects the image export as well |
|                   |                               | Android 2.x, therefore, uses non-interactive canvas output |
| Android           | 2.3                           | The Canvas rendering mode is only supported

## Support for PDF Export

The Telerik PDF generator is tested and supported in the following desktop browsers:
* Internet Explorer 9 and later.
* Latest Chrome, Firefox, Safari, and Blink-based Opera versions.

> Internet Explorer 9 and Safari do not support the PDF-related option for saving files. To achieve this, you need to [implement a server proxy](https://docs.telerik.com/kendo-ui/controls/data-management/grid/export/pdf-export#using-server-proxy).

Officially, PDF export is not supported on mobile because of browser limitations and CORS-related security restrictions in hybrid applications. For example, it is not possible to load locally stored font files in hybrid applications. Even though exporting in PDF might work on some mobile devices in specific scenarios, PDF export is not supported in mobile browsers and hybrid mobile applications.

## Best Performance

To boost the performance of your project:
* Always use an up-to-date browser version.
* Check **Disable Script Debugging** from your browser configuration options.
* Activate **Caching** in Internet Explorer.

## Notes on Web Browser Support

* As of the Telerik UI for ASP.NET Core 2017 R1 release, Internet Explorer 8 is no longer supported.
* Browsers in beta stage are not supported.
* Zoomed-in pages are not supported.
* Zoomed-out pages are not supported. Different browsers handle sub-pixel calculations differently and zooming out the page may lead to unexpected behavior&mdash;for example, missing borders.
* Exporting a zoomed-in or zoomed-out page to PDF is not supported.
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.

    > Always specify a [DOCTYPE](http://www.sitepoint.com/web-foundations/doctypes/). Recommended DOCTYPEs include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and should not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all DOCTYPEs](http://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](http://www.w3.org/).

* Internet Explorer compatibility modes are not supported. These modes can exhibit different behavior and rendering bugs as compared to the browser versions they emulate.
* It is highly advisable to use [Internet Explorer Edge mode](https://docs.microsoft.com/en-us/internet-explorer/ie11-deploy-guide/tips-and-tricks-to-manage-ie-compatibility) over a META tag or an HTTP header:

    ```
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    ```

* Telerik UI for ASP.NET Core uses a progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS 3 styles such as rounded corners and linear gradients.

## See Also

* [jQuery Version Support by Telerik UI for ASP.NET Core]({% slug jquerysupport_core %})
* [PDF and Excel Export Support by Telerik UI for ASP.NET Core]({% slug exportsupport_core %})
* [Operation System Support by Telerik UI for ASP.NET Core]({% slug ossupport_core %})
* [Earlier Versions Support Policy by Telerik UI for ASP.NET Core]({% slug oldversionssupportpolicy_core %})
