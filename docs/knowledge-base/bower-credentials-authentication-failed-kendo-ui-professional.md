---
title: Cannot Install Kendo UI Professional from Bower
description: Kendo UI Professional fails to authenticate and install.
type: troubleshooting
page_title: Having Problem with Bower Installation | Kendo UI Professional
slug: bower-credentials-authentication-failed-kendo-ui-professional
tags: bower, git, credentials, kendo, professional
ticketid: 1116013
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Professional</td>
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

I use Git Credential Manager. After it prompts for my username and password, Bower authentication fails and I am not able to install Kendo UI Professional.  

## Error Message

Authentication failed 

## Solution

To solve this issue, use the following approach:

```
/*
username: jdoe@missingpersons.com
encoded: jdoe%40missingpersons.com 

password: $password!
encoded: %24password%21
*/ 
```

As a result, the `bower.json` file reads:

```
"dependencies": {
  "kendo-ui":"https://jdoe%40missingpersons.com:%24password%21@bower.telerik.com/bower-kendo-ui.git#~2017.1.118"
 } 
 ```
