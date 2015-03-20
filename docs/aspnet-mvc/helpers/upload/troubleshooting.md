---
title: Troubleshooting
page_title: Troubleshooting guide for Kendo UI Upload HtmlHelper server-side wrapper
description: Find suggested solutions and explanations for most common issues which may occur while using Kendo UI Upload HtmlHelper extension.
---

## Problem: No files are uploaded

### Suggested actions

* Make sure that the action parameter is of type IEnumerable<HttpPostedFileBase> or HttpPostedFileBase.

> Using HttpPostedFile will not work.

## Problem: Cannot upload large files

The default maximum upload size is limited to 4MB by ASP.NET. Additionally, IIS 7+ limits the request size to 30MB.

You can override these settings in the web.config file.

### Suggested actions

1. Increase the allowed request size and execution timeout in the httpRuntime section.

        <system.web>
            <!-- The request length is in kilobytes, execution timeout is in seconds  -->
            <httpRuntime maxRequestLength="10240" executionTimeout="120" />
        </system.web>

2. Increase the allowed request size for IIS 7 in the requestFiltering section.

        <system.webServer>
                <security>
                    <requestFiltering>
                        <!-- The content length is in bytes  -->
                        <requestLimits maxAllowedContentLength="10485760"/>
                    </requestFiltering>
                </security>
        </system.webServer>

## Problem: Requests to ASP.NET MVC actions are blocked during upload

### Suggested actions

* Change the controller [Session State Behavior](http://msdn.microsoft.com/en-us/library/system.web.sessionstate.sessionstatebehavior.aspx) to ReadOnly or Disabled.
See [Concurrent Requests In ASP.NET MVC](http://weblogs.asp.net/imranbaloch/archive/2010/07/10/concurrent-requests-in-asp-net-mvc.aspx)

* Enable request batching to reduce the number of concurrent requests:

        .Async(async => async
            .Save("Save", "Home")
            .Batch(true)
        )

### See Also

[Upload Troubleshooting (all platforms)](/web/upload/troubleshooting)
