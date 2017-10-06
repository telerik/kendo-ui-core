---
title: Cannot Find kendo.all.min.js in the Kendo UI NPM Packages
description: The kendo.all.min.js file is missing when using the Kendo UI NPM packages.
type: troubleshooting
page_title: The kendo.all.min.js File Is Missing in the NPM Distribution | Kendo UI for jQuery
slug: kendo-all-min-js-not-present-in-the-npm-distribution
tags: npm, webpack
ticketid: 1110344
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI for jQuery</td>
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

I want to use Kendo UI Professional with an NPM package&mdash;and not manually as I currently do. I did the NPM installation by using the `npm login --registry=https://registry.npm.telerik.com/ --scope=@progress` and `npm install --save @progress/kendo-ui` commands. All folders and files that need to be in the `@progress` folder are present, including the `node_modules` folder. However, while the `kendo.all.js` file is available, the `kendo.all.min.js` file is missing.

1. Why is the `kendo.all.min.js` file missing from the folder?
1. How can I integrate the `kendo.all.js` file with Webpack 2 as I cannot have the minified version?

## Cause

It is expected that the `kendo.all.min.js` file is missing from the NPM package because `kendo.all.min.js` is specifically designed to work with module loaders such as Webpack. A minified version is not available because of the special approach when users work with module loaders. For example, `kendo.all.js` (module loaders) from the distribution is only 3KB as compared to over 1 MB for the regular version.

## Solution

For more details, refer to the article on [third-parties frameworks and utilities](http://docs.telerik.com/kendo-ui/third-party/webpack).

For more information on Webpack integration, refer to [this GitHub demo](https://github.com/telerik/kendo-ui-npm-example). Even though the example uses Webpack version 1, you can use a similar approach in Webpack version 2.
