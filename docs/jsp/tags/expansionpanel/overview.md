---
title: Overview
page_title: Overview | ExpansionPanel JSP Tag
description: "Get started with the ExpansionPanel JSP tag in Kendo UI."
slug: overview_expansionpanel_uiforjsp
position: 1
---

# ExpansionPanel JSP Tag Overview

The ExpansionPanel JSP tag is a server-side wrapper for the [Kendo UI ExpansionPanel](/api/javascript/ui/expansionpanel) widget.
The ExpansionPanel JSP tag layout control that provides the user with an easy way to expand and collapse a content area within the application.

## Getting Started

### Configuration

Here are the required steps to use the Kendo UI ExpansionPanel.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.



        @RequestMapping(value = "index", method = RequestMethod.GET)
        public String index() {

            return "web/expansionpanel/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.



        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the `expansionPanel` tag.



        <kendo:expansionPanel name="brazil" title="Brazil"
            subtilte="South America">
            <kendo:expansionPanel-content>
                The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
            </kendo:expansionPanel-content>
        </kendo:expansionPanel>

## Event Handling

You can subscribe to all [events exposed by Kendo UI ExpansionPanel](/api/javascript/ui/expansionpanel#events) by the handler name.



        <kendo:expansionPanel name="brazil" title="Brazil"
            subtilte="South America" expand="onExpand" collapse="onCollapse"
            complete="onComplete">
            <kendo:expansionPanel-content>
                The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast. In Portuguese, brazilwood is called pau-brasil, with the word brasil commonly given the etymology 'red like an ember', formed from brasa ('ember') and the suffix -il (from -iculum or -ilium). As brazilwood produces a deep red dye, it was highly valued by the European textile industry and was the earliest commercially exploited product from Brazil.
            </kendo:expansionPanel-content>
        </kendo:expansionPanel>

    <script>
        function onExpand() {
            kendoConsole.log("Expand");
        };
        function onCollapse() {
            kendoConsole.log("Collapse");
        };
        function onComplete() {
            kendoConsole.log("Complete");
        };
    </script>

## Reference Existing Instances

You can reference an existing ExpansionPanel instance via [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you can use the [ExpansionPanel API](/api/javascript/ui/expansionpanel#methods) to control its behavior.



      //Put this after your Kendo ExpansionPanel tag declaration
      <script>
      $(function() {
          // Notice that the Name() of the ExpansionPanel is used to get its client-side instance
          var expansionpanel = $("#brazil").data("kendoExpansionPanel");
      });
      </script>

## See Also

* [Overview of the Kendo UI ExpansionPanel Widget]({% slug overview_kendoui_expansionpanel_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
