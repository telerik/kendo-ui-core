---
title: Web Browser and Operating System Support
page_title: Web Browser and Operating System Support | Kendo UI Getting Started
previous_url: /technical-requirements.html, /getting-started/technical-requirements, /browsers-support, /intro/browser-support
description: "Check out the browsers and operating systems supported by Kendo UI widgets and frameworks."
slug: wbe_browserand_operating_system_support
position: 1
---

# Web Browser and Operating System Support

## Web Browser Support

[Kendo UI components](http://demos.telerik.com/kendo-ui/) are designed to support all major browsers and to operate without the worries of a cross-browser compatibility, standards compliance or touch-device support. However, depending on the specifics of your project and the components you prefer to use, the browser support provided by Kendo UI widgets might vary between the versions.

### Web Browser Support General

Most [Kendo UI widgets]({% slug bundle_supportfor_kendoui_components %}) have no specific limitations as of the browser versions they support.

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS
| :---------------- | :---------------------------- | :---------------
| Edge              | 20 or later ([officially supported versions by Microsoft only](https://en.wikipedia.org/wiki/Microsoft_Edge#Release_history)) |
| Internet Explorer | 8 or later                    | Kendo UI [Spreadsheet](http://demos.telerik.com/kendo-ui/spreadsheet/index) and [Responsive panel](http://demos.telerik.com/kendo-ui/responsive-panel/index) require IE9 or later
| Chrome            | Current and previous          |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

### Hybrid UI

The [hybrid UI widgets and frameworks]({% slug bundle_supportfor_kendoui_components %}) are intended for Cordova based deployments, and support the following mobile device browsers and their corresponding web view components:

| BROWSER           | SUPPORTED VERSIONS            |
| :---------------- | :---------------------------- |
| Internet Explorer | 10 or later                   |
| Chrome            | Current and previous          |
| Firefox           | Not supported                 |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

### Charts, Gauges, Barcodes, Diagrams and Maps

[Kendo UI widgets rendering data visualization]({% slug bundle_supportfor_kendoui_components %}) may require more recent browser versions as well. If you want to use them in your project, consider the information below.

#### Fully Supported Browsers

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

#### Browsers with Limited Support

| BROWSER           | SUPPORTED VERSIONS            | LIMITATIONS                               |
| :---------------- | :---------------------------- | :-----------                              |
| Internet Explorer | 8                             | PDF and image export is not supported     |
|                   |                               | Text rotation is not supported by the 64-bit versions |
|                   |                               | Gradients in pie and donut charts are not supported |
| Internet Explorer | 10                            | Dashed lines in canvas are not supported, which affects the image export as well |
|                   |                               | Android 2.x, therefore, uses non-interactive canvas output |
| Android           | 2.3                           | The Canvas rendering mode is only supported

### Important Notes

* As of the Kendo UI 2015 Q3 release, Internet Explorer 7 is no longer supported.
* Since Internet Explorer 11 was released in October 2013, look up the Kendo UI 2013 Q3 SP2 (2013.3.1324) release or a more recent Kendo UI version if you need support for it.
* Browsers in beta stage are not supported.
* Exporting a zoomed in or zoomed out page to PDF is not supported.
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.

> **Important**  
>
> Always specify a [DOCTYPE](http://www.sitepoint.com/web-foundations/doctypes/). Recommended doctypes include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and should not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all doctypes](http://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](http://www.w3.org/).

* Internet Explorer compatibility modes are not supported. These modes can exhibit different behavior and rendering bugs as compared to the browser versions they emulate.
* Windows Universal apps and Cordova for Windows environments are not supported, due to the [sandbox restrictions of the environment](https://msdn.microsoft.com/en-us/library/windows/apps/hh849625.aspx#Automatic_script_filtering). The recommended UI suite for this environment is [UI for Windows Universal](http://www.telerik.com/windows-universal-ui).
* Unexpected behaviors that occur only in a hybrid application, but not in a standalone supported browser, are by default considered to be triggered by the hybrid environment and unrelated to Kendo UI.
* It is highly advisable to use [Internet Explorer Edge mode](http://blogs.msdn.com/b/ie/archive/2010/06/16/ie-s-compatibility-features-for-site-developers.aspx) via a META tag or an HTTP header:

```
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

* Kendo UI uses a progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS 3 styles such as rounded corners and linear gradients.
* Internet Explorer behaves differently when embedded inside a desktop (WinForms) application. It reports to support pointer events, but actually doesn't. As a result, some events, on which Kendo UI relies, are not fired. In order to avoid this problem, the following JavaScript code must be executed before the Kendo UI scripts are registered:

```
<script>
    window.MSPointerEvent = null;
    window.PointerEvent = null;
</script>
```

## Operating System Support

| PLATFORM          | VERSION               |
| :---------------- | :-------------------- |
| Windows           | XP or later           |
| Windows Server    | Server 2003 or later  |
| OS X              | 10.5 or later         |
| Android           | 2.3 or later          |
| iOS               | 6.0 or later          |
| Windows Phone     | 8.0 or later          |
| Chrome for Mobile | Any version           |

### Important Notes

* Hybrid mouse and touch-screen devices are supported; for example, Internet Explorer 10, Chrome and Firefox on Windows 8
* JavaScript should be enabled on all browsers so that they can be allowed to run scripts

## Best Performance

To ensure the best performance of your project, make sure that you:

* Always use an up-to-date browser version.
* Check **Disable Script Debugging** from your browser configuration options.
* Activate Caching in Internet Explorer.

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
