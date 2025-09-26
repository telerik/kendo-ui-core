---
title: FX Replace
related: fx-replace
res_type: api
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
            -webkit-transform: translateX(100%);
            -moz-transform: translateX(100%);
            -ms-transform: translateX(100%);
            transform: translateX(100%);
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


<div class="meta-api-description">
Control the element or outgoing component that should be hidden, removed, or transitioned out once a replace animation or transition finishes, specifying the target for concealment or DOM removal as part of the setup phase, enabling precise management of which visible content disappears or updates when the replace effect completes, letting you configure, set, or define the exiting element to be hidden or discarded after the transition ends.
</div>

#### Example

    <div id="container">
        <div id="currentElement">Current Content</div>
        <div id="nextElement" style="display: none">Next Content</div>
    </div>
    <script>
    // The current element is the one that will be replaced
    var currentEl = $("#currentElement");
    kendo.fx(currentEl).replace("#nextElement", "fade").run();
    </script>

### transitionClass `string`

The transition class name. Passing `swap` will result in `k-fx-swap` class set to the **common container element**.


<div class="meta-api-description">
Set or customize the CSS class applied during element replacement animations to control visual transitions, enabling use of default swap animation classes like k-fx-swap or custom class names for tailored animation effects; configure or specify transition classes to manage how the container element animates during content swaps, replacement, or visual changes with smooth or custom CSS-driven transitions.
</div>

#### Example

    <style>
        .k-fx-custom.k-fx-start .k-fx-next {
            opacity: 0;
            transform: translateY(20px);
        }
        .k-fx-custom.k-fx-end .k-fx-current {
            opacity: 0;
            transform: translateY(-20px);
        }
    </style>
    <div id="container">
        <div id="element1">Element 1</div>
        <div id="element2" style="display: none">Element 2</div>
    </div>
    <script>
    // Use custom transition class name
    kendo.fx("#element1").replace("#element2", "custom").run();
    </script>

