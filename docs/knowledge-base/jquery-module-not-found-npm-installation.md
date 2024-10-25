---
title: The jQuery Module Is Not Found When Installing with NPM
page_title: The jQuery Module Is Not Found When Installing with NPM
description: "Learn how to handle the issue when the jQuery module is not found when installing Kendo UI for jQuery with NPM."
previous_url: /intro/installation/npm#troubleshooting
slug: troubleshoot_npm_installing
tags: troubleshooting, jquery, module, not, found, npm, installing
type: troubleshooting
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery NPM Installation</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

During the NPM installation process, I get an error that the jQuery module is not found.

## Error Message

`Error: Cannot find module 'jquery' from '/Users/bernhard/Documents/JavaScriptDevelopment/kendo-ui-npm-example/javascript-browserify'`

## Cause

Most probably, you use an earlier NPM version.

## Solution

Update to an NPM ^3.0.0 version.
