---
title: Animated Transitions
page_title: jQuery FX Documentation | Animated Transitions
description: "Get started with the jQuery FX by Kendo UI and create complex animated transitions with the replace setting between two elements with a common container."
slug: replaceffect_fxeffects_widget
position: 4
---

# Animated Transitions

You can create complex animated transitions between two elements within a common container by using the [`replace` effect](https://demos.telerik.com/kendo-ui/fx/replace).

> Unlike the other available effects, `replace` relies on CSS classes to define the transition states of the two elements. The effect works only in [browsers which support transitions](https://caniuse.com/css-transitions).

## Getting Started

The `replace` configuration works in the following way:

1. The effect assigns several CSS classes to a common container based on the effect configuration. For example, if the effect is configured as `kendo.fx("#step1").replace("#step2", "swap").direction("up")`, the assigned classes are `k-fx` (always assigned), `k-fx-swap` (the transition class), and `k-fx-up`. If the effect is to be played in reverse, assign an additional `k-fx-reverse` class.
1. The effect element receives the `k-fx-next` CSS class.
1. The element which is going to be hidden receives the `k-fx-current` CSS class.
1. The container gets the `k-fx-start` CSS class, which is then replaced by `k-fx-end`.
1. In `kendo.common.css` and `kendo.mobile.all.css`, the `.k-fx .k-fx-current` and `.k-fx .k-fx-next` CSS selectors have their transition CSS property set to `all 350ms ease-out`. As a result, both elements transition their state from the one defined in the `.k-fx-swap.k.fx-start` to the one defined in `.k-fx-swap.k-fx-end`.

The following example demonstrates how to apply the Kendo UI `replace` effect.

    <style>
        #container {
            position: relative;
            width: 202px;
            height: 202px;
        }

        #step1, #step2  {
            position: absolute;
            width: 200px;
            height: 200px;
            border: 1px solid gray;
            background: #e4e4e4;
        }
        /* A custom swap effect. */
        /* The initial position of the next element. */
        .k-fx-swap.k-fx-start .k-fx-next {
            -webkit-transform: translatex(100%);
            -moz-transform: translatex(100%);
            -ms-transform: translatex(100%);
            transform: translatex(100%);
        }

        /* The initial position of the current element. */
        .k-fx-swap.k-fx-end .k-fx-current {
            opacity: 0;
            -webkit-transform: scale(0.9);
            -moz-transform: scale(0.9);
            transform: scale(0.9);
        }
    </style>

    <div id="container">
        <div id="step1">Questionairre – Step 1</div>
        <div id="step2" style="display: none">Questionairre – Step 2</div>
    </div>

    <script>
        kendo.fx("#step1").replace("#step2", "swap").run();
    </script>

<!--*-->

## Customizing the Transition Duration

The duration of the animated transition is configured through the CSS selectors which are present in `kendo.common.css`.

    .k-fx-end .k-fx-next,
    .k-fx-end .k-fx-current {
        -webkit-transition:all 350ms ease-out;
        -moz-transition:all 350ms ease-out;
        -ms-transition:all 350ms ease-out;
        -o-transition:all 350ms ease-out;
        transition:all 350ms ease-out;
    }

You can override the default duration for the entire document by using a [higher specificity selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) or by including the same selector after Kendo UI stylesheet references.

The following example demonstrates how to apply a faster `replace` effect transition.

> You can use this technique to customize the Kendo UI Mobile view transitions.

    <html>
        <head>
            <link href="https://kendo.cdn.telerik.com/{version}/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
            <style>
                .k-fx-end .k-fx-next,
                .k-fx-end .k-fx-current {
                    -webkit-transition:all 200ms ease-out;
                    -moz-transition:all 200ms ease-out;
                    -ms-transition:all 200ms ease-out;
                    -o-transition:all 200ms ease-out;
                    transition:all 200ms ease-out;
                }
            </style>

        </head>
        <body>
            <!-- Content here -->
        </body>
    </html>

## Animating Nested Elements

In addition to the two elements themselves, the contents of the elements can also perform additional transitions. You can use this approach to implement the complex iOS transition in the Kendo UI hybrid widgets. The cross-browser definitions are omitted from the source.

The following example demonstrates the Kendo UI multi-element iOS transition.

    .k-fx-slide.k-fx-end .k-fx-next .km-content,
    .k-fx-slide.k-fx-end .k-fx-next .km-header,
    .k-fx-slide.k-fx-end .k-fx-next .km-footer,
    .k-fx-slide.k-fx-end .k-fx-current .km-content,
    .k-fx-slide.k-fx-end .k-fx-current .km-header,
    .k-fx-slide.k-fx-end .k-fx-current .km-footer {
      transition: all 350ms ease-out;
    }

    .k-fx-slide.k-fx-start .k-fx-next .km-content {
      transform: translatex(100%);
    }

    .k-fx-slide.k-fx-start .k-fx-next .km-header,
    .k-fx-slide.k-fx-start .k-fx-next .km-footer {
      opacity: 0;
    }

    .k-fx-slide.k-fx-end .k-fx-current .km-content {
      transform: translatex(-100%);
    }

    .k-fx-slide.k-fx-end .k-fx-next .km-header,
    .k-fx-slide.k-fx-end .k-fx-next .km-footer {
      opacity: 1;
    }

    /* A reverse transition. */
    .k-fx-slide.k-fx-reverse.k-fx-start .k-fx-current .km-content {
      transform: translatex(0);
    }

    .k-fx-slide.k-fx-reverse.k-fx-end .k-fx-current .km-content {
      transform: translatex(100%);
    }

    .k-fx-slide.k-fx-reverse.k-fx-start .k-fx-next .km-content {
      transform: translatex(-100%);
    }

    .k-fx-slide.k-fx-reverse.k-fx-end .k-fx-next .km-content {
      transform: translatex(0);
    }

    .k-fx-slide.k-fx-reverse.k-fx-start .k-fx-current .km-header,
    .k-fx-slide.k-fx-reverse.k-fx-start .k-fx-current .km-footer {
      opacity: 1;
    }

    .k-fx-slide.k-fx-reverse.k-fx-end .k-fx-current .km-header,
    .k-fx-slide.k-fx-reverse.k-fx-end .k-fx-current .km-footer {
      opacity: 0;
    }
<!--*-->

## See Also

* [Basic Usage of FX (Demo)](https://demos.telerik.com/kendo-ui/fx/expand)
* [JavaScript API Reference of FX](/api/javascript/effects/common)
