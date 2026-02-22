---
title: Making the Wizard Stepper Stick to the Top of the Page
description: Learn how to make the stepper in the Wizard component stick to the top of the page when scrolling.
type: how-to
page_title: Making the Wizard Stepper Stick to the Top of the Page
slug: making-wizard-stepper-stick-top-page
tags: wizard, stepper, stick, top, scrolling
res_type: kb
components: ["general"]
---

## Environment
| Property | Value |
| --- | --- |
| Product | Wizard for {{ site.framework }} |
| Version | 2023.3.1114 |

## Description
I want to make the stepper in the Wizard for {{ site.framework }} component stick to the top of the page when scrolling, as some forms can be quite long.

## Solution
To achieve this, follow these steps:

1. Add an empty `<span>` element with a unique ID above the Wizard component:

```html
<span id="customWrapper"></span>
```

2. In the JavaScript code, detach the stepper element and append it to the empty `<span>` element:

```javascript
$(document).ready(function () {
    var stepper = $('.k-stepper').detach();
    $("#customWrapper").append(stepper);
    $('.k-stepper').data("kendoStepper").setOptions({});
});
```

3. Apply CSS to make the custom `<span>` element sticky and visible at the top:

```css
#customWrapper {
    position: sticky;
    top: 0;
    z-index: 100;
}
```

4. (Optional) If you want to add a background color to the stepper, use the `.k-stepper` CSS class selector:

```css
.k-stepper {
    background-color: green;
}
```

## More {{ site.framework }} TextBox Resources

* [REPL example for the approach above with HtmlHelper](https://netcorerepl.telerik.com/QeYovAFb10D2Gvrm14)
{% if site.core %}
* [REPL example for the approach above with TagHelper](https://netcorerepl.telerik.com/GSkyvKbv51mek2L729)
{% endif %}

* [{{ site.framework }} Wizard Documentation]({%slug htmlhelpers_wizard_aspnetcore_overview%})

* [{{ site.framework }} Wizard Demos](https://demos.telerik.com/{{ site.platform }}/wizard)

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

* [Client-Side API Reference of the Wizard for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard)
* [Server-Side API Reference of the Wizard for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/wizard)
{% if site.core %}
* [Server-Side API TagHelper Reference of the Wizard for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/wizard)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)


