---
title: Disabling User Input in a Wizard Step
description: "Learn how to disable all editors integrated in a single step of the {{ site.product }} Wizard component."
type: how-to
page_title: Prevent User Input in a {{ site.product }} Wizard Step
slug: wizard-readonly-inputs
tags: wizard, readonly, disable, step, prevent, input, review, overlay
res_type: kb
component: wizard
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Wizard</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>

## Description

I'm building a Wizard in which the final step makes all previous steps and their controls visible so that users can review their inputs and selections. At this point, none of the controls must be editable, selectable, or clickable.

## Solution

Currently, the Wizard and the Form do not deliver methods that disable all of their internal editors.

Therefore, the most straightforward way is to overlay the Wizard's Form:

1. Subscribe to the [`Activate` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard/events/activate) of the component.

    ```Razor
        .Events(ev => ev.Activate("onActivate"))
    ```

2. In the JavaScript handler check, use a conditional statement to check whether the last step of the Wizard is activated.
3. If activated, select its `form` element with jQuery.
4. Use the [`getBoundingRect` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the Web API to get the position of the form on the page.
5. Use the form's position to append a `div` that has the same position and size as the form but with a `transparency`, greater that the `z-index`, and `position:absolute`.

    ```JS
        function onActivate(e){
            if(e.sender.currentStep.options.index==e.sender.currentStep.options.totalSteps-1){
                var form = e.sender.currentStep.form.element;
                var rect = form[0].getBoundingClientRect();
                var width = $(form).width();
                var height = $(form).height();
                $(body).append(`<div id="overlay" style=' z-index:1000; position:absolute; top:${rect.top}px; left:${rect.left}px; width:${width}px; height:${height}px; background-color:rgba(127,127,127,0.3)'></div>`)
            }
        }   
    ```

To explore the complete example, see the project on how to [display an overlay over the last step of the Wizard](https://netcorerepl.telerik.com/GnYmuwPr40mcbfL331).

## More {{ site.framework }} Wizard Resources

* [{{ site.framework }} Wizard Documentation]({%slug htmlhelpers_wizard_aspnetcore_overview%})

* [{{ site.framework }} Wizard Demos](https://demos.telerik.com/{{ site.platform }}/wizard/index)

{% if site.core %}
* [{{ site.framework }} Wizard Product Page](https://www.telerik.com/aspnet-core-ui/wizard)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Wizard Product Page](https://www.telerik.com/aspnet-mvc/wizard)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Wizard's for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard)
* [Server-Side API Reference of the Wizard for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/wizard)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
