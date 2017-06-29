---
title: Cannot install Kendo UI Professional from Bower
description: Kendo UI professional fails to authenticate and install
type: troubleshooting
page_title: Problem with Bower installation 
slug:bower-credentials-authentication-failed-kendo-ui-professional
position: 0
tags:bower,git,credentials,kendo,professional
teampulseid:
ticketid: 1116013
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Professional</td>
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

Bower always fails authentication. I am using Git credential manager, after it prompts for my user name and password, Authentication Failed.  

## Solution

```
/*
username: jdoe@missingpersons.com
encoded: jdoe%40missingpersons.com 

password: $password!
encoded: %24password%21
*/ 
```

Resulting bower.json:

```
"dependencies": {
  "kendo-ui":"https://jdoe%40missingpersons.com:%24password%21@bower.telerik.com/bower-kendo-ui.git#~2017.1.118"
 } 
 ```

## Error Message

Authentication failed 
