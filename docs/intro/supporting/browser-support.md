---
title: Web Browser Support
page_title: Web Browser Support | Support and Distribution | Kendo UI for jQuery
previous_url: /technical-requirements.html, /getting-started/technical-requirements, /browsers-support, /intro/browser-support
description: "Get started with Kendo UI for jQuery and learn which are the browsers supported by the framework components."
slug: wbe_browserand_operating_system_support
position: 1
---

# Web Browser Support

The [Kendo UI widgets and framework components](https://demos.telerik.com/kendo-ui/) are designed to support all major web browsers and deliver a cross-browser compatibility, standards compliance, or touch-device support.

However, depending on the specifics of your project, the components you use, and the versions of the widgets, their browser support may vary.

## Regular Support

Most [Kendo UI widgets]({% slug welcometo_kendoui %}#list-of-widgets) have no specific limitations as of the browser versions they support.

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS
| :---------------- | :---------------------------- | :---------------
| Edge              | 20 or later ([officially supported versions by Microsoft only](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history)) |
| Internet Explorer* | 9 or later                    |
| Chrome            | Current and previous          |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

*\* some features may not be available due to browser limitations* 

## Support for Kendo UI Hybrid

The [hybrid UI widgets and framework components]({% slug welcometo_kendoui %}#list-of-widgets) are intended for Cordova-based deployments and support the mobile device browsers and corresponding web view components listed in the following table.

| BROWSER           | SUPPORTED VERSIONS               |
| :---------------- | :------------------------------- |
| Internet Explorer | 10 or later on Windows Phone 8.x |
| Chrome            | Current and previous             |
| Firefox           | Not supported                    |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

## Support for Data Visualizing Widgets

The [Kendo UI widgets which render data visualization]({% slug welcometo_kendoui %}#list-of-widgets), such as the Charts, Gauges, Barcodes, Diagrams, and Maps, may require more recent browser versions according to the following table.

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

The Kendo UI PDF generator is tested and supported in the following desktop browsers:
* Internet Explorer 9 and later.
* Latest Chrome, Firefox, Safari, and Blink-based Opera versions.

> Internet Explorer 9 and Safari do not support the PDF-related option for saving files. To achieve this, you need to [implement a server proxy]({% slug exporting_pdf_kendoui_grid_widget %}#server-proxy).

Officially, PDF export is not supported on mobile because of browser limitations and CORS-related security restrictions in hybrid applications. For example, it is not possible to load locally stored font files in hybrid applications. Even though exporting in PDF might work on some mobile devices in specific scenarios, PDF export is not supported in mobile browsers and hybrid mobile applications.

## Best Performance

To boost the performance of your project:
* Always use an up-to-date browser version.
* Check **Disable Script Debugging** from your browser configuration options.
* Activate **Caching** in Internet Explorer.

## Notes on Web Browser Support

* As of the Kendo UI 2017 R1 release, Internet Explorer 8 is no longer supported.
* As of the Kendo UI 2015 Q3 release, Internet Explorer 7 is no longer supported.
* Since Internet Explorer 11 was released in October 2013, look up the Kendo UI 2013 Q3 SP2 (2013.3.1324) release or a more recent Kendo UI version if you need support for it.
* Browsers in beta stage are not supported.
* Zoomed-in pages are not supported.
* Zoomed-out pages are not supported. Different browsers handle sub-pixel calculations differently and zooming out the page may lead to unexpected behavior&mdash;for example, missing borders.
* Exporting a zoomed-in or zoomed-out page to PDF is not supported.
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.

    > Always specify a [DOCTYPE](http://www.sitepoint.com/web-foundations/doctypes/). Recommended DOCTYPEs include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and should not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all DOCTYPEs](https://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](https://www.w3.org/).

* Internet Explorer compatibility modes are not supported. These modes can exhibit different behavior and rendering bugs as compared to the browser versions they emulate.
* Windows Universal apps and [Cordova for Windows 10](https://cordova.apache.org/docs/en/5.1.1/guide/platforms/win8/win10-support.html) environments are not supported, due to the [sandbox restrictions of the environment](https://msdn.microsoft.com/en-us/library/windows/apps/hh849625.aspx#Automatic_script_filtering). The recommended UI suite for this environment is [UI for Windows Universal](https://www.telerik.com/windows-universal-ui).
* Unexpected behaviors that occur only in a hybrid application, but not in a standalone supported browser, are by default considered to be triggered by the hybrid environment and unrelated to Kendo UI.
* It is highly advisable to use [Internet Explorer Edge mode](https://docs.microsoft.com/en-us/archive/blogs/ie/ies-compatibility-features-for-site-developers) over a META tag or an HTTP header:

    ```
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    ```

* Kendo UI uses a progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS 3 styles such as rounded corners and linear gradients.
* Internet Explorer behaves differently when embedded inside a desktop (WinForms) application. It reports to support pointer events, but actually does not. As a result, some events, on which Kendo UI relies, are not fired. To handle this issue, execute the following JavaScript code before the Kendo UI scripts are registered.

    ```
    <script>
        window.MSPointerEvent = null;
        window.PointerEvent = null;
    </script>
    ```

## See Also

* [jQuery Version Support by Kendo UI]({% slug jquerysupport_kendoui %})
* [PDF and Excel Export Support by Kendo UI]({% slug export_support_kendoui %})
* [Operation System Support by Kendo UI]({% slug ossupport_kendo %})
* [Earlier Versions Support Policy by Kendo UI]({% slug old_versions_support_policy %})
