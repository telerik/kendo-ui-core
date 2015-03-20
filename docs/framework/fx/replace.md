---
title: Replace Effect
---
# Kendo UI Replace Effect

The Kendo UI Replace effect (introduced in the 2014 Q1 release) provides the means to create complex animated transitions between two elements with a common container.

> Unlike the other effects available, the replace effect relies on CSS classes to define the transition states of the two elements. The effect works only in [browsers which support transitions](http://caniuse.com/css-transitions).

## Replace effect
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


## How it works

* The effect assigns several CSS classes to common container based on the effect configuration.
For instance, if the effect is configured as `kendo.fx("#step1").relace("#step2", "swap").direction("up")`, the assigned classes will be `k-fx` (always assigned), `k-fx-swap` (the transition class), and `k-fx-up`.
If the effect is played in reverse, an additional `k-fx-reverse` gets assigned.

* The effect element receives `k-fx-next` CSS class.
* The element which will be hidden receives `k-fx-current` CSS class.
* The container gets `k-fx-start` CSS class, which then replaced by `k-fx-end`.
* In `kendo.common.css` and `kendo.mobile.all.css` The `.k-fx .k-fx-current` and `.k-fx .k-fx-next` CSS selectors have their transition CSS property set to `all 350ms ease-out`.

As a result, both elements transition their state from the one defined in the `.k-fx-swap.k.fx-start` to the one defined in `.k-fx-swap.k-fx-end`.

## Customizing the transition duration

The transition duration is configured through the following CSS selectors, present in kendo.common.css

    .k-fx-end .k-fx-next,
    .k-fx-end .k-fx-current {
        -webkit-transition:all 350ms ease-out;
        -moz-transition:all 350ms ease-out;
        -ms-transition:all 350ms ease-out;
        -o-transition:all 350ms ease-out;
        transition:all 350ms ease-out;
    }

You can override the default duration for the entire document using a [higher specificity selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), or by including the same selector after Kendo UI stylesheet references.

### Faster replace effect transition

    <html>
        <head>
            <link href="http://cdn.kendostatic.com/{version}/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
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

> This technique may be used to customize the Kendo UI Mobile view transitions.

## Animating nested elements

In addition to two elements themselves, the elements' contents may perform additional transitions, too. This approach is used to implement the complex iOS transition in Kendo UI Mobile (the cross-browser definitions are omitted from the source).

### Multi-element transition definition (Kendo UI Mobile iOS transition)
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
