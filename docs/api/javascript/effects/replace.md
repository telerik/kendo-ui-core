---
title: FX Replace
related: fx-replace
---

# Replace

Replaces given element with another one, using CSS class defined transition.

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

        /* the initial state of the next element */
        .k-fx-swap.k-fx-start .k-fx-next {
            -webkit-transform: translatex(100%);
            -moz-transform: translatex(100%);
            -ms-transform: translatex(100%);
            transform: translatex(100%);
        }

        /* the final state of the current element */
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

## Constructor Parameters

### current `jQuery`

The current element which will be hidden when the transition ends.

### transitionClass `string`

The transition class name. Passing `swap` will result in `k-fx-swap` class set to the **common container element**.

