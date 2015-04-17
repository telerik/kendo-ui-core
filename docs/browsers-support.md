---
title: Supported Browsers
page_title: Supported Browsers
previous_url: /technical-requirements.html, /getting-started/technical-requirements
description: browser, platform support and prerequisites for best performance when working with Kendo UI.
position: 2
---

# Supported Desktop Browsers

### Core and Web widgets
| Browser           | Supported versions
| ---               | ---
| Internet Explorer | 7 and later
| Chrome            | 21 and later
| Firefox           | 24 and later, [ESR](https://www.mozilla.org/en-US/firefox/organizations/faq/)
| Opera             | 15 and later
| OS X Safari       | 5 and later

### Mobile widgets
| Browser           | Supported versions
| ---               | ---
| Internet Explorer | 10 and later
| Firefox           | Not supported
| _Others_          | Same as Core and Web widgets

### DataViz widgets

[Supported desktop and mobile browsers for Kendo UI DataViz](/dataviz/supported-browsers)

### Important Notes

* IE11 was released in October 2013. For IE11 support use Q3 2013 SP2 (2013.3.1324) or a newer Kendo UI version.
* Browsers in beta stage are not supported;
* **[Quirks mode](http://www.quirksmode.org/css/quirksmode.html) is not supported.** Always specify a [DOCTYPE](http://reference.sitepoint.com/html/doctypes).
Recommended DOCTYPES include `HTML5`, `XHTML 1.1`, `XHTML 1.0 Strict` and `HTML4 Strict`. The `HTML4 Transitional` DOCTYPE triggers quirks mode and should not be used.
`XHTML 1.0 Transitional` works well in most cases, but may cause issues with vertical positioning of icons.
The correct syntax for [all DOCTYPES](http://www.w3.org/QA/2002/04/valid-dtd-list.html) is provided on the W3C website.
* **Internet Explorer compatibility modes are not supported**. These modes can exhibit different behavior and rendering bugs, compared to the browser versions they emulate.
It is highly recommended to use IE's [Edge mode](http://blogs.msdn.com/b/ie/archive/2010/06/16/ie-s-compatibility-features-for-site-developers.aspx) via META tag or HTTP header.

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

* Kendo UI uses progressive enhancement for its CSS styling. As a result, old and obsolete browsers may ignore CSS3 styles, such as rounded corners and linear gradients.

## Internet Explorer as an Embedded Browser in a Desktop Application

Internet Explorer behaves differently when being embedded inside a desktop (WinForms) application. It reports to support pointer events, but actually doesn't.
As a result, some events, on which Kendo UI relies, are not fired. In order to avoid this problem, the following Javascript code must be executed
**before the Kendo UI scripts are registered**:

    window.MSPointerEvent = null;
    window.PointerEvent = null;

# Supported Operating Systems

| Platform          | Version
| ---               | ---
| Windows           | XP and later
| Windows Server    | Server 2003 and later
| OS X              | 10.5 and later
| Android           | 2.3 and later
| iOS               | 6.0 and later
| BlackBerry        | 10.0 and later
| Windows Phone     | 8.0 and later
| Chrome for Mobile | Any

## Important notes

* In Android 2.3 dataviz widgets support only Canvas rendering mode;
* Hybrid mouse and touch devices are supported (for instance IE10, Chrome and Firefox on Windows 8).

# Other prerequisites:

* JavaScript must be enabled on all browsers

For best performance:

* 'Disable script debugging' in the browser's config options must be checked;
* Caching on Internet Explorer must be activated.
