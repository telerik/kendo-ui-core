---
title: Web Browser Support
page_title: Web Browser Support - Support and Distribution 
previous_url: /technical-requirements.html, /getting-started/technical-requirements, /browsers-support, /intro/browser-support
description: "Get started with Kendo UI for jQuery and learn which are the browsers supported by the framework components."
slug: wbe_browserand_operating_system_support
position: 1
---

# Web Browser Support

The [Kendo UI components and framework components](https://demos.telerik.com/kendo-ui/) are designed to support all major web browsers and deliver a cross-browser compatibility, standards compliance, and touch-device support.

Most [Kendo UI components]({% slug welcometo_kendoui %}#list-of-components) have no specific limitations as of the browser versions they support.

> Some features may not be available due to browser limitations.

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS
| :---------------- | :---------------------------- | :---------------
| Edge              | The two latest versions at the time of the release. |
| Chrome            | The two latest versions at the time of the release.          |
| Firefox           | The two latest versions at the time of the release. This includes [Firefox ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/)).|
| Opera             | The two latest versions at the time of the release.                  |
| Safari (OS X)     | The two latest versions at the time of the release.|

## Support for PDF Export

The Kendo UI PDF generator is tested and supported in the following desktop browsers:
* Latest Chrome, Firefox, Safari, Edge.

> Safari do not support the PDF-related option for saving files. To enable PDF export, you need to [implement a server proxy]({% slug exporting_pdf_kendoui_grid_widget %}#server-proxy).

Officially, PDF export is not supported on mobile because of browser limitations and CORS-related security restrictions in hybrid applications. For example, it is not possible to load locally stored font files in hybrid applications. Even though exporting in PDF will work on some mobile devices in specific scenarios, PDF export is not supported in mobile browsers and hybrid mobile applications.

## Providing Best Performance

To boost the performance of your project:

* Always use an up-to-date browser version.
* Check **Disable Script Debugging** from your browser configuration options.

## Notes on Web Browser Support

* Browsers in beta stage are not supported.
* Zoomed-in pages are not supported.
* Zoomed-out pages are not supported. Different browsers handle sub-pixel calculations differently and zooming out the page may lead to unexpected behavior&mdash;for example, missing borders.
* Exporting a zoomed-in or zoomed-out page to PDF is not supported.
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.

    > Always specify a [DOCTYPE](http://www.sitepoint.com/web-foundations/doctypes/). Recommended DOCTYPEs include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and must not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all DOCTYPEs](https://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](https://www.w3.org/).

* Windows Universal apps and [Cordova for Windows 10](https://cordova.apache.org/docs/en/5.1.1/guide/platforms/win8/win10-support.html) environments are not supported, due to the [sandbox restrictions of the environment](https://msdn.microsoft.com/en-us/library/windows/apps/hh849625.aspx#Automatic_script_filtering). The recommended UI suite for this environment is [UI for Windows Universal](https://www.telerik.com/windows-universal-ui).
* Unexpected behaviors that occur only in a hybrid application, but not in a standalone supported browser, are by default considered to be triggered by the hybrid environment and unrelated to Kendo UI.
* It is advisable to use [Internet Explorer Edge mode](https://docs.microsoft.com/en-us/archive/blogs/ie/ies-compatibility-features-for-site-developers) over a META tag or an HTTP header:

    ```
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    ```

* Kendo UI uses a progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS 3 styles such as rounded corners and linear gradients.

## See Also

* [jQuery Version Support by Kendo UI]({% slug jquerysupport_kendoui %})
* [PDF and Excel Export Support by Kendo UI]({% slug export_support_kendoui %})
* [Operation System Support by Kendo UI]({% slug ossupport_kendo %})
* [Earlier Versions Support Policy by Kendo UI]({% slug old_versions_support_policy %})
