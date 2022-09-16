---
title: General Disruption and Connection Issues
description: I am unable to connect to the Kendo and Telerik CDN, how can I solve this issue?
type: troubleshooting
page_title: General Disruption and Connection Issues
slug: cdn_connection_issues
tags: cdn, troubleshooting, connection, issue
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

I am unable to connect to the Kendo and Telerik CDN, `kendo.cdn.telerik.com`, how can I solve this issue?

The Kendo and Telerik CDN service is hosted on the Amazon CloudFront. Although the [Amazon CloudFront service](https://aws.amazon.com/cloudfront/) provides a reliable level of uptime support, you might encounter disruption or connection issues.

## Solution

To verify that the CDN service is running, check the status of the Amazon CloudFront on [http://status.aws.amazon.com/](http://status.aws.amazon.com/).

If the Amazon CloudFront status is reported as healthy and operates normally but you still experience connection issues, contact your system administrator. Remote investigation of connection problems is outside the scope of the Kendo and Telerik UI Support Team. Some of the possible causes for the connection issues are:

* Firewalls, antivirus, or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on the fly.
* General Internet, network connectivity, or DNS problems.
