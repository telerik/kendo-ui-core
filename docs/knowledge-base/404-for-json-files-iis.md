---
title: 404 Status Code Is Thrown for JSON Files on IIS
page_title: 404 Status Code Is Thrown for JSON Files on IIS
description: "Learn how to handle the 404 error for JSON files on IIS in Kendo UI for jQuery."
slug: 404_json_files_iis
tags: telerik, kendoui, jquery, troubleshooting, error, 404, status, code, thrown, json, files, iis 
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

A 404 status code is thrown for JSON files on IIS.

## Cause
 
By default, IIS does not serve files with unknown extensions. The mime types can be specified either through the IIS management console (inetmgr) or in the site `Web.config`.

## Solution

The example below demonstrates how to configure the IIS `Web.config`. Note that, if already defined, the mime is first removed to avoid clashes.


```xml
    <?xml version="1.0"?>
    <configuration>
        ...
        <system.webServer>
            ...
            <staticContent>
                <remove fileExtension=".json" />
                <mimeMap fileExtension=".json" mimeType="application/json" />
            </staticContent>
        </system.webServer>
    </configuration>
```

