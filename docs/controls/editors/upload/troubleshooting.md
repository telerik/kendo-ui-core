---
title: Troubleshooting
page_title: jQuery Upload Documentation | Troubleshooting | Kendo UI
description: "Get started with the jQuery Upload by Kendo UI and learn how to handle some of the common issues that may occur when you work with the widget."
previous_url: /controls/editors/upload/troubleshooting, /controls/editors/upload/troubleshoot/troubleshooting
slug: troubleshooting_upload_widget
position: 60
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Kendo UI Upload widget.

* [The Select button is partially visible and has no text](#the-select-button-is-partially-visible-and-has-no-text)
* [Asynchronous uploads randomly fail](#asynchronouos-uploads-randomly-fail)
* [The upload progress indicator incorrectly renders the progress of the upload](#the-upload-progress-indicator-incorrectly-renders-the-progress-of-the-upload)
* [The Upload demonstrates general performance issues](#the-upload-demonstrates-general-performance-issues)
* [Cannot access the error message console](cannot-access-the-error-message-console)

## The Select button is partially visible and has no text

The [Kendo UI Upload](http://demos.telerik.com/kendo-ui/upload/index) uses an opacity filter to overlay the default **Select** button of the file input. This filter is implemented as an ActiveX control in Internet Explorer version 8 and earlier. As such, it is subject to security settings and can be disabled. The following image demonstrates an affected component.

![Upload ActiveX](../upload-activex.png)

**Solution** In Internet Explorer, set **Internet Options** > **Security** > **Internet** (or Local intranet) > **Custom Level** > **Binary and script behaviors** to **Enable**.

![Upload Behaviors](../upload-ie-script-behaviors.png)

## Asynchronous uploads randomly fail

When working in Internet Explorer version 10 or 11 with Windows authentication, the upload freezes indefinitely or, if a 401 challenge is received on the HTTP POST, the upload times out.

**Solution** For Internet Explorer 10, see [KB2980019](http://support.microsoft.com/kb/2980019). As of November 6, 2014, no official fix for Internet Explorer version 11 is available. For more information on this issue, refer to [Bug ID 819941](https://connect.microsoft.com/IE/feedback/details/819941/file-upload-stop-working-on-ie-with-windows-authentication).

## The upload progress indicator incorrectly renders the progress of the upload

When working in Internet Explorer version 10 or 11 with Windows authentication, the upload progress indicator can go over 100% or freeze but does not indicate that the request is complete. The issue is not related to Kendo UI and is caused by a bug in Internet Explorer which can be observed with any `FormData XMLHttpRequest`. The problem seems to occur only when accessing a web server on `localhost`.

**Solution** Deploy the application on a remote web server or disable asynchronous uploads.

## The Upload demonstrates general performance issues

When working in Opera, the following symptoms of incorrect behavior occur:

* The `success` is fired when the file upload fails.
* The server response cannot be accessed in the `success` event.
* The `success` event fires before the upload is complete.

**Solution** Turn off the Opera Dragonfly debugging tool because it interferes with the upload by firing an extra `Load` event for the `iframe`.

## Cannot access the error message console

When a server error occurs, the complete server response is logged in the console. The console is accessible in a specific manner for each browser as listed below:

* Internet Explorer&mdash;Open the developer tools (`F12`) and choose the **Script** tab. The console is visible on the right.
* Firefox&mdash;Install [Firebug](https://getfirebug.com) and enable the **Console** tab.
* Chrome&mdash;Open the JavaScript console (`Ctrl`+`Shift`+`J`).
* Safari&mdash;Enable the **Develop** menu from the **Preferences**/**Advanced** dialog. Open the error console from the **Develop** menu.
* Any browser&mdash;Use a debugging proxy like [Fiddler](http://www.telerik.com/fiddler) or [Charles](http://www.charlesproxy.com/) to obtain the server response.

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
