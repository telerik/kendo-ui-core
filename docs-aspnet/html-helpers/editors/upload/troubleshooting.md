---
title: Troubleshooting
page_title: Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Telerik UI Upload for {{ site.framework }}."
previous_url: /aspnet-mvc/helpers/upload/troubleshooting, /aspnet-mvc/upload/troubleshooting, /helpers/editors/upload/troubleshooting
slug: troubleshoot_uploadhelper_aspnetmvc
position: 40
---

# Troubleshooting

This page provides solutions for common problems you may encounter while working with the Telerik UI Upload HtmlHelper.

{% if site.mvc %}

## No files are uploaded

**Solution** Make sure that the action parameter is of type `IEnumerable<HttpPostedFileBase>` or `HttpPostedFileBase`.

> Using HttpPostedFile does not work.

## The upload of large files is impossible

By default, ASP.NET limits the size of the maximum upload to 4MB. Additionally, IIS 7 and later limits the request size to 30MB.

**Solution** Override these settings in the `web.config` file:

1. Increase the allowed request size and execution timeout in the `httpRuntime` section.

        <system.web>
            <!-- The request length is in kilobytes, execution timeout is in seconds  -->
            <httpRuntime maxRequestLength="10240" executionTimeout="120" />
        </system.web>

1. Increase the allowed request size for IIS 7 in the `requestFiltering` section.

        <system.webServer>
            <security>
                <requestFiltering>
                    <!-- The content length is in bytes  -->
                    <requestLimits maxAllowedContentLength="10485760"/>
                </requestFiltering>
            </security>
        </system.webServer>

## Requests to {{ site.framework }} actions are blocked during upload

**Solution** To work around this issue:

1. Change the controller [Session State Behavior](http://msdn.microsoft.com/en-us/library/system.web.sessionstate.sessionstatebehavior.aspx) to `ReadOnly` or `Disabled`. For more information on this topic, refer to the [article on concurrent requests in {{ site.framework }}](http://weblogs.asp.net/imranbaloch/archive/2010/07/10/concurrent-requests-in-asp-net-mvc.aspx).
1. Enable request batching to reduce the number of concurrent requests.

        .Async(async => async
            .Save("Save", "Home")
            .Batch(true)
        )

{% endif %}

## The upload never ends in Safari on iOS and OSX

The issue is caused by a bug in Safari and occurs only when the **Windows authentication and disabled Anonymous Authentication** setting is enabled. It is reproducible with a standard `<input type="file" name="file" enctype="multipart/form-data" />` HTML element in {{ site.framework }} and Web Forms applications.

> Because the **File Browser** dialogs of the Telerik UI Editor for {{ site.framework }} rely on the Upload control, the issue might occur when uploading images and other files through them on MAC Safari.

**Solution** The solution solely depends on a dedicated decision by Apple about whether and when to fix this browser issue. However, you can work around it by applying the suggestions provided in the [Programmatically enable or disable anonymous authentication in IIS](http://stackoverflow.com/questions/28419304/programmatically-enable-or-disable-anonymous-authentication-in-iis) StackOverflow thread. This means to build a separate web service for file upload with an authentication setting, such as **Anonymous** for Safari scenarios, and the main application authentication setting, such as **Windows Authentication**.

## See Also

* [Basic Usage by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload)
* [Using the API of the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/api)
* [UploadBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/UploadBuilder)
* [Upload Server-Side API](/api/upload)
