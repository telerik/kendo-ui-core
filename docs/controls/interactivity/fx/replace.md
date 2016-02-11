---
title: Replace Effects
page_title: Replace Effects | Kendo UI FX
description: "Learn how to create complex animated transitions between two elements with a common container by using the Kendo UI Replace Effect."
slug: replaceffect_fxeffects_widget
position: 2
---

# Replace Effects

The [Kendo UI Replace effect](http://demos.telerik.com/kendo-ui/fx/replace), which was first introduced in the Kendo UI 2014 Q1 release, provides the means to create complex animated transitions between two elements with a common container.

> **Important**
>
> Unlike the other available effects, the Kendo UI Replace effect relies on CSS classes to define the transition states of the two elements. The effect works only in [browsers which support transitions](http://caniuse.com/css-transitions).

The example below demonstrates how to apply the Kendo UI Replace effect.

###### Example

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

        /**
         * Custom swap effect
         */

        /* the initial position of the next element */
        .k-fx-swap.k-fx-start .k-fx-next {
            -webkit-transform: translatex(100%);
            -moz-transform: translatex(100%);
            -ms-transform: translatex(100%);
            transform: translatex(100%);
        }

        /* the initial position of the current element */
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

This is how the Kendo UI Replace effect works:

* The effect assigns several CSS classes to a common container based on the effect configuration. For instance, if the effect is configured as `kendo.fx("#step1").relace("#step2", "swap").direction("up")`, the assigned classes are `k-fx` (always assigned), `k-fx-swap` (the transition class), and `k-fx-up`. If the effect is to be played in reverse, assign an additional `k-fx-reverse` class.
* The effect element receives the `k-fx-next` CSS class.
* The element which is going to be hidden receives the `k-fx-current` CSS class.
* The container gets the `k-fx-start` CSS class, which is then replaced by `k-fx-end`.
* In `kendo.common.css` and `kendo.mobile.all.css` the `.k-fx .k-fx-current` and `.k-fx .k-fx-next` CSS selectors have their transition CSS property set to `all 350ms ease-out`.

As a result, both elements transition their state from the one defined in the `.k-fx-swap.k.fx-start` to the one defined in `.k-fx-swap.k-fx-end`.

## Configuration

### Customize Duration of Transition

The transition duration is configured through the CSS selectors demonstrated in the example below, which are present in `kendo.common.css`.

###### Example

    .k-fx-end .k-fx-next,
    .k-fx-end .k-fx-current {
        -webkit-transition:all 350ms ease-out;
        -moz-transition:all 350ms ease-out;
        -ms-transition:all 350ms ease-out;
        -o-transition:all 350ms ease-out;
        transition:all 350ms ease-out;
    }

You are able to override the default duration for the entire document using a [higher specificity selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), or by including the same selector after Kendo UI stylesheet references.

The example below demonstrates how to apply a faster Replace effect transition.

###### Example

    <html>
        <head>
            <link href="http://kendo.cdn.telerik.com/{version}/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
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

> **Importnat**
>
> You may use this technique to customize the Kendo UI Mobile view transitions.

### Animate Nested Elements

In addition to the two elements themselves, the contents of the elements may perform additional transitions, too. This approach is used to implement the complex iOS transition in Kendo UI Mobile. Note that the cross-browser definitions are omitted from the source.

The example below demonstrates the multi-element transition definition&mdash;the Kendo UI Mobile iOS transition.

###### Example  

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

    /* reverse transition */
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

* [Common FX JavaScript API Reference](/api/javascript/effects/common)
* [FX Overview]({% slug overview_kendoui_fxeffects_widget %})
