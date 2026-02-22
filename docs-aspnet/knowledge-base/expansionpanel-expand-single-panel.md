---
title: Expanding Single Panel at a Time When Using Multiple Expansion Panels
description: An example on how to allow the user to expand a single panel at a time when uising multiple Telerik UI for  {{ site.framework }} Expansion Panels.
type: how-to
page_title: Expanding Single Panel at a Time When Using Multiple Expansion Panels
slug: expansionpanel-expand-single-panel
tags: expansion panel, expand, single, panel
res_type: kb
components: ["general"]
component: ExpansionPanel
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Expansion Panel</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2024.2.514 version</td>
 </tr>
</table>

## Description

How can I allow the user to expand a single panel at a time when using multiple Expansion Panel components? Also, the user must be able to close all panels.

## Solution

1. Handle the `click` event of each Expansion Panel on the page, select the clicked panel, and call the [`toggle()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/expansionpanel/methods/toggle) method of the Expansion Panel to toggle the rest of the panels.

    ```HtmlHelper
        @(Html.Kendo().ExpansionPanel()
                .Name("brazil")
                .Title("Brazil")
                .SubTitle("South America")
                .Expanded(true)
                .Content("The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast.")
        )
        @(Html.Kendo().ExpansionPanel()
                .Name("chile")
                .Title("Chile")
                .SubTitle("South America")
                .Content("There are various theories about the origin of the word Chile.")
        )
        @(Html.Kendo().ExpansionPanel()
                .Name("colombia")
                .Title("Colombia")
                .SubTitle("South America")
                .Content("The name 'Colombia' is derived from the last name of the Italian navigator Christopher Columbus.")
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-expansionpanel name="brazil" title="Brazil" sub-title="South America" expanded="true">
            <content>
                The word 'Brazil' likely comes from the Portuguese word for brazilwood, a tree that once grew plentifully along the Brazilian coast.
            </content>
        </kendo-expansionpanel>
        <kendo-expansionpanel name="chile" title="Chile" sub-title="South America">
            <content>
                There are various theories about the origin of the word Chile.
            </content>
        </kendo-expansionpanel>
        <kendo-expansionpanel name="colombia" title="Colombia" sub-title="South America">
            <content>
                The name 'Colombia' is derived from the last name of the Italian navigator Christopher Columbus.
            </content>
        </kendo-expansionpanel>
    ```
    {% endif %}
    ```JS scripts
        <script>
            $(document).ready(function() {
                $(".k-expander .k-expander-header").on("click", function() { // Handle the "click" event of each Expansion Panel.
                    let currentPanel = $(this).parent(); // Select the clicked element.
                    let expandedPanels = $(".k-expander").not(currentPanel); // Select the rest of the Expansion Panel elements on the page.
                    $.each(expandedPanels, function(){ // Loop through them.
                        if($(this).hasClass("k-expanded")) { // Check if there are expanded panels.
                            let expandedPanel = $(this).find("[data-role='expansionpanel']").data("kendoExpansionPanel"); //Get a reference to each expanded Expansion Panel.
                            expandedPanel.toggle(); // Toggle it.
                        }
                    });
                });
            });
        </script>
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Expansion Panel HtmlHelper](https://netcorerepl.telerik.com/cIaVwfPq01IlhFo028)
* [Sample code with the Expansion Panel TagHelper](https://netcorerepl.telerik.com/wykLcfvK02G9OWR839)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on expanding a single panel when using multiple Expansion Panel components](https://netcorerepl.telerik.com/cIaVwfPq01IlhFo028).
{% endif %}

## More {{ site.framework }} Expansion Panel Resources

* [{{ site.framework }} Expansion Panel Documentation]({%slug htmlhelpers_expansionpanel_aspnetcore%})

* [{{ site.framework }} Expansion Panel Demos](https://demos.telerik.com/{{ site.platform }}/expansionpanel)

{% if site.core %}
* [{{ site.framework }} Expansion Panel Product Page](https://www.telerik.com/aspnet-core-ui/expansionpanel)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Expansion Panel Product Page](https://www.telerik.com/aspnet-mvc/expansionpanel)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Expansion Panel for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/expansionpanel)
* [Server-Side API Reference of the Expansion Panel for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/expansionpanel)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Expansion Panel for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/expansionpanel)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
