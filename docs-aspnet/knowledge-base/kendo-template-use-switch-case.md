---
title: Using a Switch Case in Client Template
description: An example on how to render a conditional template using a switch case and the ViewBag.
type: how-to
page_title: Conditional client template
slug: kendo-template-use-switch-case
tags: listview, kendo, template, ClientTemplate, conditional, switch, server, viewbag
ticketid: 1406311
res_type: kb
component: listview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>ListView for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
 <tr>
  <td>ASP.NET Core Version</td>
  <td>2.2</td>
 </tr>
</table>

## Description

I am just starting to utilize the list view for .net core. I have not determined if possible to dynamically set the template based upon a condition, I am trying to base the condition on a ViewBag property. I know the ViewBag value is available in the template because I can show its value in a div. However, I am not sure if it is possible to use in an if or switch condition, and if it is possible, what syntax I should use?

## Solution

You can set the template dynamically with the help of the [Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/overview) by adding conditions in the template or using functions:

```
    <script type="text/x-kendo-tmpl" id="template">
        # switch ("@ViewBag.SurveyType") {
            case "PolyGraph Examiner": #
            <div class="yellow">
                <h3>#= OrderID #</h3>
            </div>
            # break; #
 
            #case "B": #
            <div class="yellow">
                <h3>#= OrderID #</h3>
            </div>
            # break;} #
    </script>

```

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
