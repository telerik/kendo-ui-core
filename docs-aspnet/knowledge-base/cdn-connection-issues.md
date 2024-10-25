---
title: Handling General Disruptions and Connection Issues
description: Learn how to handle when you are unable to connect to the Kendo and Telerik CDN when working with the {{ site.product }} UI components.
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

I am unable to connect to the Kendo and Telerik UI CDN (`kendo.cdn.telerik.com`) when working with the {{ site.product }} UI components. How can I solve this issue?

## Solution

The Kendo and Telerik CDN service is hosted on the Amazon CloudFront. Although the [Amazon CloudFront service](https://aws.amazon.com/cloudfront/) provides a reliable level of uptime support, you can encounter disruption or connection issues.

To verify that the CDN service is running, check the [status of the Amazon CloudFront](http://status.aws.amazon.com/).

If the Amazon CloudFront status is reported as healthy and operates normally but you still experience connection issues, contact your system administrator. Remote investigation of connection problems is outside the scope of the Kendo and Telerik UI Support Team. Some of the possible causes for the connection issues are:

* Firewalls, antivirus, or other security software incorrectly filters out the CDN scripts or modifies (breaks) them on the fly.
* General Internet, network connectivity, or DNS problems.

## More {{ site.framework }} Resources

* [{{ site.product }} Documentation]({%slug overview_aspnetmvc6_aspnetmvc%})

* [{{ site.product }} Demos](https://demos.telerik.com/{{ site.platform }})

{% if site.core %}
* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-mvc)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
