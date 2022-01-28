---
title: Large Excel Files Fail to Post to Proxy
description: An example on how to increase the limit for file uploads so larger Excel files can be posted to a server proxy.
type: how-to
page_title: Post a large Excel file to Proxy | Kendo UI Grid for jQuery
slug: grid-excel-export-cannot-post-to-proxy
tags: excel, export, grid, proxy, issue, cannot, post, limitation, server, webconfig, iis
ticketid: 1349739
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I use a `proxyURL` and `forceProxy` properties to send all the generated workbooks to the server to improve performance. This works for smaller data sets without issue. However, on large data sets the `POST` is triggered to go back to the server, but it never reaches the server. Something dies there and the Save() method on the Controller is never called.

## Solution

This particular problem is related with limitations not related with the Grid, but rather to the IIS and the application. Nevertheless, you could try increasing the   `maxAllowedContentLength` and the `maxRequestLength`:

```html
    <system.webServer>
        <security>
            <requestFiltering><requestLimits maxAllowedContentLength="524288000"/>
        </security>
    </system.webServer>

    <system.web>
      <httpRuntime maxRequestLength="524288" executionTimeout="120" />
    </system.web>
```