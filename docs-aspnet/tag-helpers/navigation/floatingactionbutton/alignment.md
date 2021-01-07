---
title: Alignment
page_title: Alignment
description: "Learn about the alignment options of the Telerik UI FloatingActionButton TagHelper for {{ site.framework }} and learn how to configure the positioning of the widget."
slug: taghelpers_alignment_floatingactionbutton_aspnetcore
position: 2
---

# Alignment

The Telerik UI FloatingActionButton TagHelper for {{ site.framework }} exposes the `Align`, `AlignOffset` and `PositionMode` configuration options. These three options work together and allow you to position the FloatingActionButton component precisely as per the application requirements.


## Align

The `align` configuration option specifies the position of the FloatingActionButton relative to its container. When using this option, it is important to ensure that the FloatingActionButton container has a [CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). 

```tagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomEnd">
    </kendo-floatingactionbutton>
```

## AlignOffset

The `align-offset` configuration option specifies the horizontal and vertical offset of the FloatingActionButton relative to the `align` configuration defined.

```tagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomEnd"
                                align-offset-horizontal="100"
                                align-offset-vertical="100">
    </kendo-floatingactionbutton>
```

## PositonMode

The `position-mode` configuration option specifies the CSS position of the FloatingActionButton in the document. You can position the FloatingActionButton relative to the closest ancestor or position it relative to the viewport.

```tagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomEnd"
                                align-offset-horizontal="100"
                                align-offset-vertical="100"
                                position-mode="FloatingActionButtonPositionMode.Fixed"> //positions the button relative to the viewport
    </kendo-floatingactionbutton>
```

## See Also

* [Alignment of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/alignment)
* [Using the API of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Server-Side API](/api/floatingactionbutton)
