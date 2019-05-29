---
title: Cannot Send AntiForgery Token
description: Cannot send my anti-forgery token as it is not available on the server.
type: troubleshooting
page_title: AntiForgery Token Is Not Available on the Server | Kendo UI DataSource for jQuery
slug: datasource-send-antiforgery-token
tags: security, authentication, dataSource
ticketid: 1116629
res_type: kb
component: data-source
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DataSource</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>56.0.2924.87 (64-bit)</td>
 </tr>
</table>


## Description

I use the `transport.read.data` method to send my anti-forgery token, but it is not available on the server.

How can I send my anti-forgery token when using Kendo UI for jQuery?

## Solution

Send the anti-forgery token along with the request form data. In order for the anti-forgery token to be accessible on the server, `read` should make a `POST` request.

```
function readData() {

        var data = {
            __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
        };

        return data;

    }

```
