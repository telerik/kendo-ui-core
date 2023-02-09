---
title: Disruption and Connection Issues Occur When Using the CDN Services
page_title: Disruption and Connection Issues Occur When Using the CDN Services
description: "Learn how to handle general disruption and connection issues that occur when installing Kendo UI for jQuery by using the CDN services."
previous_url: /intro/installation/cdn-service#troubleshooting
slug: troubleshoot_cdn_installing
tags: kendoui, jquery, disruption, connection, issues, cdn, installing
type: troubleshooting
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery CDN Installation</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description

Although the [Amazon CloudFront service](https://aws.amazon.com/cloudfront/) provides a reliable level of uptime support, you might encounter disruption or connection issues. After you check the status of the systems at [http://status.aws.amazon.com/](http://status.aws.amazon.com/), the CDN status is reported as healthy and operates normally.

## Cause

You may be experiencing Internet, network connectivity, or DNS problems. It is also possible that firewalls, antivirus, or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on the fly.

## Solution

Contact your system administrator because remote investigation of connection problems is outside the scope of the Kendo UI for jQuery Support Team.
