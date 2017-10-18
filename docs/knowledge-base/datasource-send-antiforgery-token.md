---
title: Send AntiForgery token
description: 
type: troubleshooting
page_title:
slug:
position: 0
tags: security, authentication, dataSource
teampulseid:
ticketid: 1116629
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>DataSource for Progress® Kendo UI®</td>
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

I am using the transport.read.data method to send my anti-forgery token, but it is no available on the server. 

## Solution

The anti-forgery token should be send along with request form data. The read should make a POST request in order the anti-forgery token to be accessible on the server. 

```
function readData() {

        var data = {
            __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
        };

        return data;

    }

```

## Suggested Workarounds

## Steps to Reproduce

## Error Message

## Cause\Possible Cause(s)

## Notes
