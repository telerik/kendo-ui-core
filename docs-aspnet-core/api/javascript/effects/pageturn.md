---
title: FX PageTurn
---

# PageTurn

Folds and the face of the effect around the specified axis) in order to reveal the back.  The effect needs certain markup and styling in order to function properly.
The element **should be positioned absolutely/relatively**, and contain two child elements (*face* and *back*) with the same size as their parent, positioned absolutely on top of each other.

    <style>
        /* in order for the effect to work, a temporary clone of the page is created (and its ID is removed) - so we use classes to style the elements */
        #container {
            position: relative;
            width: 200px;
            height: 200px;
        }

        #container .foo {
            position: absolute;
            width: 200px;
            height: 200px;
            background: blue;
        }

        #container .bar {
            position: absolute;
            width: 200px;
            height: 200px;
            background: red;
        }

    </style>

    <div id="container">
        <div class="bar">Page 2</div>
        <div class="foo">Page 1</div>
    </div>

    <script>
        kendo.fx($("#container")).pageturn("horizontal", $(".foo"), $(".bar")).duration(1000).play();
        // or
        // kendo.fx($("#container")).pageturnHorizontal($(".foo"), $(".bar")).play();
    </script>

## Constructor Parameters

### axis `String`

The axis of the page turn. Supported axes are `"horizontal"` and `"vertical"`.

### face `jQuery`

The initially visible element in the container.

### back `jQuery`

The finally visible element in the container.

