---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ExpansionPanel TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/expansionpanel, /helpers/tag-helpers/expansionpanel
slug: taghelpers_expansionpanel_aspnetcore
position: 1
---

# ExpansionPanel TagHelper Overview

The Telerik UI ExpansionPanel TagHelper for ASP.NET Core is a layout component that provides the user with an easy way to expand and collapse a content area within the application.

The Telerik UI ExpansionPanel TagHelper for ASP.NET Core is a server-side wrapper for the [Kendo UI ExpansionPanel](/api/javascript/ui/expansionpanel) widget.

Visit the [ExpansionPanel demo page](https://demos.telerik.com/aspnet-core/expanionpanel/tag-helper) to see it in action.

## Initializing the ExpansionPanel

The following example demonstrates how to define the ExpansionPanel by using the ExpansionPanel TagHelper:

```tagHelper
	<kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).
        </content>
    </kendo-expansionpanel>
```

## Basic Configuration

You must pass the configuration options of the ExpansionPanel TagHelper as attributes of the tag. The content is represented by a nested `<content>` tag.

```tagHelper
	<kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </content>
    </kendo-expansionpanel>
```

## Event Handling

The below example demonstrates how the the `Expand`, `Collapse` and `Complete` events of the ExpansionPanel TagHelper can be intercepted to output messages in the console when these events are raised. They can also be hooked for customizations or to execute custom logic, if necessary.

```tagHelper
	<kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true" on-expand="onExpand" on-collapse="onCollapse" on-complete="onComplete">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
        </content>
    </kendo-expansionpanel>

    <script>
        function onExpand() {
            console.log("Expand");
        };
        function onCollapse() {
             console.log("Collapse");
        };
        function onComplete() {
            console.log("Complete");
        };
    </script>
```

## Referencing Existing Instances

The following example demonstrates how to get an instance of the ExpansionPanel.

```tagHelper
    <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
        <content>
            The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium).
        </content>
    </kendo-expansionpanel>

    <script type="text/javascript">
        $(function () {
            // The Name() of the ExpansionPanel is used to get its client-side instance.
            var expansionPanel = $("#brazil").data("kendoExpansionPanel");
            console.log(expansionPanel);
        });
    </script>
```

## Functionality and Features

* [Default State]({% slug state_taghelpers_expansionpanel_aspnetcore %})
* [Keyboard Navigation]({% slug keynav_taghelpers_expansionpanel_aspnetcore %})

## See Also

* [Basic Usage of the ExpansionPanel TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/expansionpanel/tag-helper)
