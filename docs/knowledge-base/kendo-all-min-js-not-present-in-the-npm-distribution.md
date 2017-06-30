---
title: Install Kendo UI Pro with npm and webpack
description: kendo.all.min.js is missing when using NPM packages
type: troubleshooting
page_title: Kendo.all.min.js Not Present in the NPM Distribution.
slug: kendo-all-min-js-not-present-in-the-npm-distribution
position: 0
tags: npm, webpack
teampulseid:
ticketid: 1110344
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Professional</td>
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
  <td>58</td>
 </tr>
</table>

 
## Description

I want to use Kendo UI Pro with npm package (and not manually as at present)

Installation NPM OK:
npm login --registry=https://registry.npm.telerik.com/ --scope=@progress
npm install --save @progress/kendo-ui
All folders and files in @progress folder (include in node_modules folder).
I have a problem, the kendo.all.js file is here but not the kendo.all.min.js.
Why the kendo.all.min.js isn't in the folder ?
It isn't possible to have the minified version, how to integrate kendo.all.js file with webpack 2 ?

## Solution

Having the only kendo.all.js in the NPM package is expected because that Kendo UI file is specially made to work with module loaders like webpack, and a min version is not available due to the specific when using module loaders. For example, kendo.all.js(module loaders) from the distribution is only 3KB compared to over 1 MB for the regular version:

http://docs.telerik.com/kendo-ui/third-party/webpack

As for the integration with Webpack, we have a working example in one of ours GitHub repositories. The example is using Webpack 1, but a similar approach can be used in Webpack 2:

https://github.com/telerik/kendo-ui-npm-example

## Suggested Workarounds

## Steps to Reproduce

## Error Message

## Cause\Possible Cause(s)

## Notes
