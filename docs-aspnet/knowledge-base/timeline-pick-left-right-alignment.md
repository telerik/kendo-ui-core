---
title: Pick a Timeline Item If the Items Are Aligned Left or Right
page_title: Pick a Timeline Item When the Items Are Aligned Left or Right
description: "An example on how to pick an item if the items are aligned left of right in the {{ site.product }} Timeline."
type: how-to
slug: timeline-pick-left-right-alignment
tags: progress, telerik, aspnet, mvc, core, form, cancel, button
res_type: kb
component: form
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Timeline</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I pick an item if the items are aligned left or right in the Timeline?

## Solution

To achieve the desired scenario:

1. Add a Boolean property to the `Model` of the Timeline that will indicate whether a particular timeline event will be displayed on the left or right.
1. Subscribe to the `DataBound` event of the Timeline.
1. Within the function handler:

  1. Get the current records through the [`dataSource.data()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/data) method.
  1. Iterate through each of the items.
  1. Get the unique identifier for the currently rendered list item. 
  1. Add or remove the `k-reverse` class generated for the position of the current list item and based on the `isLeft` field of the state mentioned previously.
  1. To ensure proper stylization regarding the cards, update the card callout classes.


```Model.cs

    public class TimelineEventModel
    {
        ...
        public bool isLeft { get; set; }
        ...
    }

```
```Timeline.cshtml

    @(Html.Kendo().Timeline<TimelineDemoApp.Models.TimelineEventModel>()
            .Name("Timeline")
            .Events(e=>e.DataBound("onDataBound"))
            //additional configuration...
    )

```
```script.js

    function onDataBound(){
         var items=this.dataSource.data(); 
         for(var i = 0; i < items.length; i++){ 
               var item = items[i]; 
               var uidAttr = kendo.attr('uid');
               var element = this.element.find('li[' + uidAttr + '=' + item.uid + ']');
               var isLeft = item.isLeft;
                  
               element.toggleClass("k-reverse", isLeft);
               element.find('.k-card-callout')
                      	.toggleClass('k-callout-e', isLeft)
                      	.toggleClass('k-callout-w', !isLeft);
         }
    }

```

## More {{ site.framework }} Timeline Resources

* [{{ site.framework }} Timeline Documentation]({%slug overview_htmlhelpers_timeline_aspnetcore%})

* [{{ site.framework }} Timeline Demos](https://demos.telerik.com/{{ site.platform }}/timeline)

{% if site.core %}
* [{{ site.framework }} Timeline Product Page](https://www.telerik.com/aspnet-core-ui/timeline)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Timeline Product Page](https://www.telerik.com/aspnet-mvc/timeline)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Timeline for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)
* [Server-Side API Reference of the Timeline for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/timeline)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
