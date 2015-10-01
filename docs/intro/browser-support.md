---
title: Web Browser and Operating System Support
page_title: Web Browser and Operating System Support
previous_url: /technical-requirements.html, /getting-started/technical-requirements, /browsers-support
description: "Supported browsers, platform support and prerequisites for best performance when working with Kendo UI."
position: 6
---

# Web Browser and Operating System Support

### Web Browser Support

Kendo UI components are designed to support all major browsers and to operate without the worries of cross-browser compatibility, standards compliance or touch-device support. However, depending on the specifics of your project and the components you prefer to use, the browser support provided by Kendo UI widgets may vary between the versions.

#### Web Browser Support General

Most [Kendo UI widgets](/intro/list-of-widgets) have no limitations as of the browser versions they support:

| Browser           | Supported Versions            |
| :---------------- | :---------------------------- |
| Internet Explorer | 7 or later                    |
| Chrome            | 21 or later                   |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

#### Web Browser Support for Hybrid UI

The [hybrid UI](/intro/list-of-widgets) widgets and framework are intended for Cordova based deployments, and support the following mobile device browsers and their corresponding web view components:

| Browser           | Supported Versions            |
| :---------------- | :---------------------------- |
| Internet Explorer | 10 or later                   |
| Chrome            | 21 or later                   |
| Firefox           | Not supported                 |
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|

#### Web Browser Support for Data Visualization Widgets

Kendo UI widgets rendering [data visualization](/intro/list-of-widgets) may require more recent browser versions as well. If you want to use them in your project, consider the information below.

##### Fully Supported Browsers

| Browser           | Supported Versions            |
| :---------------- | :---------------------------- |
| Internet Explorer | 9 or later                    |
| Chrome            | 21 or later                   |
| Firefox           | [Current and ESR releases](https://en.wikipedia.org/wiki/History_of_Firefox#Release_history) ([What is ESR?](https://www.mozilla.org/en-US/firefox/organizations/faq/))|
| Opera             | 15 or later                   |
| OS X Safari       | [6.2.6 or later](https://en.wikipedia.org/wiki/Safari_version_history#Mac)|
| iOS Safari        | iOS 8 or later                |
| Chrome for Mobile | 21 or later                   |

##### Browsers with Limited Support

| Browser           | Supported Versions            | Limitations                               |
| :---------------- | :---------------------------- | :-----------                              |
| Internet Explorer | 6, 7, and 8                   | **Spreadsheet Widget** is not available |
|                   |                               | PDF and image export is not supported |
|                   |                               | Text rotation is not supported by the 64-bit versions |
|                   |                               | Gradients in pie and donut charts are not supported |
| Internet Explorer | 10                            | Dashed lines in canvas are not supported, which affects the image export as well |
|                   |                               | Android 2.x, therefore, uses non-interactive canvas output |
|Android            | 2.3                           | The Canvas rendering mode is only supported

#### Important Notes

* Since Internet Explorer 11 was released in October 2013, look up the Q3 2013 SP2 (2013.3.1324) or a more recent Kendo UI version if you need support for it

* Browsers in beta stage are not supported
* [Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported
> Always specify a [DOCTYPE](http://reference.sitepoint.com/html/doctypes). Recommended doctypes include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE fires the Quirks mode and should not be used. `XHTML 1.0 Transitional` works well in most cases, but may cause issues with the vertical positioning of icons. The correct syntax for [all doctypes](http://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the [W3C website](http://www.w3.org/).

* Internet Explorer compatibility modes are not supported. These modes can exhibit different behavior and rendering bugs as compared to the browser versions they emulate.
* It is highly advisable to use [Internet Explorer Edge mode](http://blogs.msdn.com/b/ie/archive/2010/06/16/ie-s-compatibility-features-for-site-developers.aspx) via a META tag or an HTTP header:

```
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

* Kendo UI uses a progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS3 styles such as rounded corners and linear gradients.

* Internet Explorer behaves differently when embedded inside a desktop (WinForms) application. It reports to support pointer events, but actually doesn't. As a result, some events, on which Kendo UI relies, are not fired. In order to avoid this problem, the following JavaScript code must be executed before the Kendo UI scripts are registered:

```
<script>
    window.MSPointerEvent = null;
    window.PointerEvent = null;
</script>
```

### Operating System Support

| Platform          | Version               |
| :---------------- | :-------------------- |
| Windows           | XP or later           |
| Windows Server    | Server 2003 or later  |
| OS X              | 10.5 or later         |
| Android           | 2.3 or later          |
| iOS               | 6.0 or later          |
| BlackBerry        | 10.0 or later         |
| Windows Phone     | 8.0 or later          |
| Chrome for Mobile | Any version           |

#### Important Notes

* Hybrid mouse and touch-screen devices are supported; for example, Internet Explorer 10, Chrome and Firefox on Windows 8
* JavaScript should be enabled on all browsers so that they can be allowed to run scripts

### Best Performance

To ensure the best performance of your project, make sure that you:

 * Always use an up-to-date browser version
 * Check **Disable Script Debugging** from your browser configuration options
 * Activate Caching in Internet Explorer

