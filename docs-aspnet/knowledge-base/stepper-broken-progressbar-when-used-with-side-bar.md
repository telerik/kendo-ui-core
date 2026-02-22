---
title: Stepper Progress Bar Extends Beyond Last Stepper Item.
description: Stepper control used with vertical menu which is expanding and collapsing upon button click. What happen is when menu bar is expanded, the horizontal progress bar of stepper extends beyond last stepper item.
type: troubleshooting
page_title: Stepper Progress Bar Extends Beyond Last Stepper Item.
slug: stepper-broken-progressbar-when-used-with-side-bar
tags: stepper, progress, bar, progressBar, extend, beyond, expanding, collapsing, vertical, menu
ticketid: 1545635
res_type: kb
components: ["general"]
component: stepper
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Stepper for Progress® Telerik® UI for {{ site.product_short }}</td>
 </tr>
</table>


## Description

A stepper control used with a vertical menu which is expanding and collapsing upon button click. What happens is when the menu bar is expanded, the horizontal progress bar of the stepper extends beyond the last stepper item.

## Reproduce


```Razor _Layout.cshtml
<body style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;">

    <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
    </div>

    <div id="main">
        <button class="openbtn k-button" onclick="openNav()">☰ Open Sidebar</button>

        @RenderBody()
    </div>

</body>
```
```C# style.css

    .sidebar {
       height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 60px;
    }

    .sidebar .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
           font-size: 36px;
        margin-left: 50px;
    }
```
```Razor Index.cshtml
<div class="row myClass">
        @(Html.Kendo().Stepper()
        .Name("LevelSteps")

        .Linear(false)
        .Orientation(StepperOrientationType.Horizontal)
        .Steps(s =>
        {
            s.Add().Label("Level 1").Icon("book").Selected(true);
            s.Add().Label("Level 2").Icon("book");
            s.Add().Label("Level 3").Icon("not-equal");
            s.Add().Label("Level 4").Icon("user");
            s.Add().Label("Level 5").Icon("user");
        })
    )
</div>
```
```JS script.js
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
```

## Solution

 Add a class **(myClass)** to the parent div tag and then on opening and closing of the vertical menu it will trigger the resize() method of the Stepper. The method will set the width of the Stepper to be the same as the width of the parent div tag.

```
   $('.openbtn').on('click', function () {
        AdjustStepperWidth();
    });
    $('.closebtn').on('click', function () {
        AdjustStepperWidth();
    });

    function AdjustStepperWidth() {
        var stepper = $('#LevelSteps').getKendoStepper();
        if (stepper != undefined) {
            var divWidth = $('.myClass').width();
            $('#LevelSteps').width(divWidth-35);
            stepper.resize();
        }
    }
```

## More {{ site.framework }} Stepper Resources

* [{{ site.framework }} Stepper Documentation]({%slug htmlhelpers_stepper_aspnetcore_overview%})

* [{{ site.framework }} Stepper Demos](https://demos.telerik.com/{{ site.platform }}/stepper)

{% if site.core %}
* [{{ site.framework }} Stepper Product Page](https://www.telerik.com/aspnet-core-ui/stepper)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Stepper Product Page](https://www.telerik.com/aspnet-mvc/stepper)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Stepper for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/stepper)
* [Server-Side API Reference of the Stepper for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/stepper)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
