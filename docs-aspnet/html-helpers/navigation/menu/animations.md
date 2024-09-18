---
title: Animations
page_title: Animations
description: "Learn about the Telerik UI for {{ site.framework }} Menu animation options."
slug: animations_menu
position: 3
---

# Animations

The Menu provides a set of animation effects that appear when the user hovers with the mouse or clicks a specified item.

By default, the animations are enabled, and the Menu uses a slide animation to expand its sub-items. You can define the desired animation style for the opening and closing of the Menu items, the duration of the animation, and its direction.

For a complete example of the supported animations and their properties, refer to the [demo on using the animation effects of the Menu](https://demos.telerik.com/{{ site.platform }}/menu/animation).

## Animation Effects

The Menu component supports the following animation styling options:

* `Expand`—Expands the Menu content element from zero to its regular size based on the defined direction (horizontal or vertical).
* `Fade`—Fades the Menu items in or out.
* `SlideIn`—Slides the Menu content to its original position in the specified direction (up, down, left, right).

The following example shows how to configure different animation effects when opening and closing the Menu sub-items.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("mainMenu")
    .Animation(animation =>
    {
        animation.Open(open =>
        {
            open.Fade(FadeDirection.In);
        });
        animation.Close(close =>
        {
            close.SlideIn(SlideDirection.Up);
        });
    })
    .Items(items =>
    {
      items.Add().Text("Item 1")
      .Items(children =>
      {
          children.Add().Text("Sub-item 1");
          children.Add().Text("Sub-item 2");
      });
      items.Add().Text("Item 2")
      .Items(children =>
      {
          children.Add().Text("Sub-item 1");
          children.Add().Text("Sub-item 2");
      });
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-menu name="mainMenu">
  <popup-animation>
    <open effects="fade:in" />
    <close effects="slideIn:up" />
  </popup-animation>
  <items>
    <menu-item text="Item 1">
        <sub-items>
            <menu-item text="Sub-item 1"></menu-item>
            <menu-item text="Sub-item 2"></menu-item>
        </sub-items>
    </menu-item>
    <menu-item text="Item 2">
        <sub-items>
            <menu-item text="Sub-item 1"></menu-item>
            <menu-item text="Sub-item 2"></menu-item>
        </sub-items>
    </menu-item>
  </items>
</kendo-menu>
```
{% endif %}

## Animation Duration

Each animation style provides a `Duration` option, which determines how many milliseconds it will take for the animation to reach its final state. By default, the defined effects are animated for 400 milliseconds. 

The next example shows how to set up a duration for the respective animation style.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("mainMenu")
    .Animation(animation =>
    {
        animation.Open(open =>
        {
            open.Expand(ExpandDirection.Horizontal).Duration(200);
        });
        animation.Close(close =>
        {
            close.SlideIn(SlideDirection.Down).Duration(100);
        });
    })
    ...// Additional configuration.
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-menu name="mainMenu">
  <popup-animation>
    <open effects="expand:horizontal" duration="200"/>
    <close effects="slideIn:down" duration="100"/>
  </popup-animation>
  <!-- Additional configuration -->
</kendo-menu>
```
{% endif %}

## Reverse Animation

The animations have a `Reverse` option, which, by default, is used for the close effect. For example, when you define the opening animation and enable the `Reverse` option, the same effect will be applied as a closing animation. However, if you define a closing animation, it will override the animation set by the `Reverse` option. 

The example below shows how to configure the opening animation and use the `Reverse` option to define the closing animation, as well.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("mainMenu")
    .Animation(animation =>
    {
        animation.Open(open =>
        {
            open.Fade(FadeDirection.Out).Reverse(true);
        });
    })
    ...// Additional configuration.
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-menu name="mainMenu">
  <popup-animation>
    <open effects="fade:out" reverse="true"/>
  </popup-animation>
  <!-- Additional configuration -->
</kendo-menu>
```
{% endif %}

## See Also

* [Using Animations in the Menu (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/animation)
* [Server-Side API of the Menu HtmlHelper](/api/menu)
{% if site.core %}
* [Server-Side API of the Menu TagHelper](/api/taghelpers/menu)
{% endif %}
* [Client-Side API of the Menu](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)

