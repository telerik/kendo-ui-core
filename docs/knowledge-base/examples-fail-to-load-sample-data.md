---
title: Examples Fail to Load Sample Data
page_title: Examples Fail to Load Sample Data
description: "Learn how to handle the problem when the examples fail to load the sample data when working with Kendo UI for jQuery."
previous_url: /troubleshooting
slug: troubleshooting_common_issues_kendoui
tags: telerik, kendoui, jquery, troubleshooting, examples, fail, load, sample, data 
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

The Kendo UI examples fail to load the sample data.

## Cause

The most common cause for this error is loading the demos from the file system. For example, Google Chrome will not permit the access to the JSON files, which are required by the demos to run.

## Solution

Host the offline demos on a web server and load them from there.
