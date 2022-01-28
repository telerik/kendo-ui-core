---
title: Cannot Install Kendo UI from Bower
page_title: Having Problem with Bower Installation | Kendo UI for jQuery
description: Kendo UI fails to authenticate and install.
type: troubleshooting
slug: bower-credentials-authentication-failed-kendo-ui-professional
tags: bower, git, credentials, kendo, professional
ticketid: 1116013
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery</td>
 </tr>
 <tr>
  <td>NodeJS</td>
  <td>7.10.0</td>
 </tr>
 <tr>
  <td>NPM</td>
  <td>4.2.0</td>
 </tr>
 <tr>
  <td>Bower Version</td>
  <td>1.8.0</td>
 </tr>
</table>

## Description

I use Git Credential Manager. After it prompts for my username and password, Bower authentication fails with the `Authentication failed` error message, and I am not able to install Kendo UI.  

## Solution

Use a `bower.json` file with the credentials as part of the URL. Encode both the password and the credentials.

```
/*
Actual Username: jdoe@missingpersons.com
Encoded Username: jdoe%40missingpersons.com 

Actual Password: $password!
Encoded Password: %24password%21
*/ 
```

As a result, the `bower.json` file reads `https://[EncodedUsername]:[EncodedPassword]@bower.telerik.com/bower-kendo-ui.git#~2017.1.118`.

```
"dependencies": {
  "kendo-ui":"https://jdoe%40missingpersons.com:%24password%21@bower.telerik.com/bower-kendo-ui.git#~2017.1.118"
 } 
 ```
