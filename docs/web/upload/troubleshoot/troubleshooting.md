---
title: Common Issues
page_title: Common Issues | Kendo UI Upload Widget
description: "Learn how to deal with issues you may encounter while using the Kendo UI Upload widget."
slug: troubleshooting_upload_widget
position: 1
---

# Common Issues

## Layout Related

### **Select** Button Is Partially Visible and Has No Text

Kendo UI Upload uses an opacity filter to overlay the default file input's **Select** button. This filter is implemented as an ActiveX control in Internet Explorer 8 versions and older. As such, it is subject to security settings and can be disabled. Below is the sample image of an affected component:

![](/web/upload/upload-activex.png)

**Solution** In Internet Explorer set the following option to **Enable**: **Internet Options** > **Security** > **Internet** (or Local intranet) > **Custom Level** > **Binary and script behaviors**.

![](/web/upload/upload-ie-script-behaviors.png)

## Performance Issues

### Asynchronous Uploads Randomly Fail

When working in Internet Explorer 10/11 with Windows authentication the upload either freezes indefinitely or times out if a 401 challenge is received on the HTTP POST.

**Solution** For Internet Explorer 10, see [KB2980019](http://support.microsoft.com/kb/2980019). As of November 6, 2014 there is no official fix for Internet Explorer 11. For more information on this issue, refer to [Bug ID 819941](https://connect.microsoft.com/IE/feedback/details/819941/file-upload-stop-working-on-ie-with-windows-authentication).

### Incorrect Progress Readings 

When working in Internet Explorer 10/11 with Windows authentication the upload progress indicator can go over 100% or freeze. This does not indicate that the request is now complete. The issue is not related to Kendo UI and is caused by an Internet Explorer bug. It can be observed with any `FormData XMLHttpRequest`. The problem only seems to occur when accessing a web server on localhost.

**Solution** Deploy the application on a remote web server or disable asynchronous uploads.

### Incorrect Behavior

When working in Opera, the following symptoms, indicating incorrect behavior, occur:

* The `success` is fired when the file upload fails.
* The server response cannot be accessed in the `success` event.
* The `success` event fires before the upload is complete.

**Solution** Turn off Opera Dragonfly. This debugging tool interferes with the upload by firing an extra `Load` event for the `iframe`.

## Tips and Tricks

### Access Error Message Consoles

When a server error occurs, the complete server response is logged in the console. The console is accessible in a specific manner for each browser as listed below:

*   Internet Explorer - open the developer tools (`F12`) and choose the **Script** tab. The console is visible on the right.
*   Firefox - install [Firebug](http://getfirebug.com/downloads) and enable the **Console** tab.
*   Chrome - open the JavaScript console (`Ctrl`+`Shift`+`J`).
*   Safari - enable the **Develop** menu from the **Preferences**/**Advanced** dialog. Open the error console from the **Develop** menu.
*   Any browser - use a debugging proxy like [Fiddler](http://www.telerik.com/fiddler) or [Charles](http://www.charlesproxy.com/) to obtain the server response.

## See Also

Other articles on Kendo UI Upload:

* [Overview]({% slug overview_kendoui_upload_widget %})
* [Drag and Drop]({% slug dragandrop_upload_widget %})
* [Send and Receive Metadata]({% slug metadata_upload_widget %})
* [Modes of Operation]({% slug modes_upload_widget %})
* [Browser Support]({% slug browsersupport_upload_widget %})

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Widgets Rendering Data Visualization](/dataviz/troubleshooting)
* [Common Issues in Telerik UI for ASP.NET MVC](/aspnet-mvc/troubleshooting)
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/grid/troubleshooting)
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/upload/troubleshooting)