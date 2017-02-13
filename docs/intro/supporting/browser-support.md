---
title: Web Browser and Operating System Support
page_title: Web Browser and Operating System Support | Kendo UI Getting Started
previous_url: /technical-requirements.html, /getting-started/technical-requirements, /browsers-support, /intro/browser-support
description: "Check out the browsers and operating systems supported by Kendo UI widgets and frameworks."
slug: wbe_browserand_operating_system_support
position: 1
---

# Web Browser and Operating System Support

The Kendo UI components are designed to support all major browsers and operating systems.

## Web Browser Support

The [Kendo UI widgets](http://demos.telerik.com/kendo-ui/) can seamlessly operate without concerns for cross-browser compatibility, standards compliance, or touch-device support. However, depending on the specifics of your project and the components you prefer to use, the browser support provided by Kendo UI widgets might vary between the versions.

### General

Most [Kendo UI widgets]({% slug bundle_supportfor_kendoui_components %}) have no specific limitations as of the browser versions they support.

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS
| :---------------- | :---------------------------- | :---------------
| Edge              | 20 or later ([officially supported versions by Microsoft only](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history)) |
| Internet Explorer | 9 or later                    |
| Chrome            | Current and previous          |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

### Hybrid UI

The [hybrid UI widgets and frameworks]({% slug bundle_supportfor_kendoui_components %}) are intended for Cordova based deployments, and support the following mobile device browsers and their corresponding web view components:

| BROWSER           | SUPPORTED VERSIONS               |
| :---------------- | :------------------------------- |
| Internet Explorer | 10 or later on Windows Phone 8.x |
| Chrome            | Current and previous             |
| Firefox           | Not supported                    |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

### Data Visualizing Widgets

[Kendo UI widgets rendering data visualization]({% slug bundle_supportfor_kendoui_components %}), such as Charts, Gauges, Barcodes, Diagrams, and Maps, might require more recent browser versions as well. If you want to use them in your project, consider the information below.

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

### PDF Export

The Kendo UI PDF generator is tested and supported in the following _desktop_ browsers:

* Internet Explorer 9 and later.
* Latest Chrome, Firefox, Safari, and Blink-based Opera versions.

> **Important**
>
> Internet Explorer 9 and Safari do not support the option for saving files. To achieve this, you need to [implement a server proxy]({% slug exporting_pdf_kendoui_grid_widget %}#server-proxy).

Officially, PDF export is not supported on mobile because of browser limitations and CORS-related security restrictions in hybrid applications. For example, it is not possible to load locally stored font files in hybrid applications. Though exporting in PDF might work on some mobile devices in specific scenarios, PDF export is _not_ supported in:

* Mobile browsers.
* Hybrid mobile applications.

### Best Performance

To ensure the best performance of your project, make sure that you:

* Always use an up-to-date browser version.
* Check **Disable Script Debugging** from your browser configuration options.
* Activate **Caching** in Internet Explorer.

### Notes on Web Browser Support

* As of the Kendo UI 2017 R1 release, Internet Explorer 8 is no longer supported.
* As of the Kendo UI 2015 Q3 release, Internet Explorer 7 is no longer supported.
* Since Internet Explorer 11 was released in October 2013, look up the Kendo UI 2013 Q3 SP2 (2013.3.1324) release or a more recent Kendo UI version if you need support for it.
* Browsers in beta stage are not supported.
* Exporting a zoomed in or zoomed out page to PDF is not supported.
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.

    > **Important**
    >
    > Always specify a [DOCTYPE](http://www.sitepoint.com/web-foundations/doctypes/). Recommended DOCTYPEs include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and should not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all DOCTYPEs](http://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](http://www.w3.org/).

* Internet Explorer compatibility modes are not supported. These modes can exhibit different behavior and rendering bugs as compared to the browser versions they emulate.
* Windows Universal apps and [Cordova for Windows 10](https://cordova.apache.org/docs/en/5.1.1/guide/platforms/win8/win10-support.html) environments are not supported, due to the [sandbox restrictions of the environment](https://msdn.microsoft.com/en-us/library/windows/apps/hh849625.aspx#Automatic_script_filtering). The recommended UI suite for this environment is [UI for Windows Universal](http://www.telerik.com/windows-universal-ui).
* Unexpected behaviors that occur only in a hybrid application, but not in a standalone supported browser, are by default considered to be triggered by the hybrid environment and unrelated to Kendo UI.
* It is highly advisable to use [Internet Explorer Edge mode](http://blogs.msdn.com/b/ie/archive/2010/06/16/ie-s-compatibility-features-for-site-developers.aspx) via a META tag or an HTTP header:

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

## Operating System Support

The following table lists the operating systems and their versions that are compatible with Kendo UI.

| PLATFORM          | VERSION               |
| :---------------- | :-------------------- |
| Windows           | XP or later           |
| Windows Server    | Server 2003 or later  |
| OS X              | 10.5 or later         |
| Android           | 2.3 or later          |
| iOS               | 6.0 or later          |
| Windows Phone     | 8.0 or later          |
| Chrome for Mobile | Any version           |

### Notes on Operating System Support

* Hybrid mouse and touch-screen devices are supported; for example, Internet Explorer 10, Chrome and Firefox on Windows 8
* JavaScript should be enabled on all browsers so that they can be allowed to run scripts

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
