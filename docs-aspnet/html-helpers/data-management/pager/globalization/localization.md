---
title: Localization
page_title: Localization for the Telerik UI Pager HtmlHelper for {{ site.framework }}
description: "Get started with the Telerik UI Pager HtmlHelper for {{ site.framework }} and learn how to localize the text of its messages."
slug: localization_pager_aspnet
---

# Localization

The Pager provides options for defining the text of the tooltips for its page and navigation links, information text and labels.

To localize the messages, set the desired strings in the `PagerMessagesSettingsBuilder` configurator.

The example below shows how to change the tooltip of the refresh button and the information message.

``` 
 @(Html.Kendo().Pager()
    .Name("Pager")
    .Events(events => events
        .Change("onChange")
    )
    .Messages(m=>{
        m.Refresh("Refresh data");
        m.Display("Showing {0}-{1} from {2} data items");
    })
 )

```

## See Also

* [Pager Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pager)
* [Pager Server-Side API](/api/pager)
* [Pager Settings and Types]({% slug settings_pager_aspnet %})
* [Responsive Pager]({% slug responsive_pager_aspnet  %})
* [Pager Templates]({% slug templates_pager_aspnet %})
