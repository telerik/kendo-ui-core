---
title: FX Flip
---

# Flip

Flips the element around the axis specified by the axis parameter.  Supported directions are `horizontal` and `vertical`. The effect needs certain markup and styling in order to function properly.
The element **should be positioned absolutely/relatively**, and contain two child elements (*face* and *back*) with the same size as their parent, positioned absolutely on top of each other.

## Flip Effect Example

    <style>
        #container {
            position: relative;
            width: 200px;
            height: 200px;
        }

        #foo {
            position: absolute;
            width: 200px;
            height: 200px;
            background: blue;
        }

        #bar {
            position: absolute;
            width: 200px;
            height: 200px;
            background: red;
        }

    </style>

    <div id="container">
        <div id="bar"> Page 2</div>
        <div id="foo"> Page 1</div>
    </div>

    <script>
        kendo.fx($("#container")).flip("horizontal", $("#foo"), $("#bar")).play();
        // an alternative syntax would be
        // kendo.fx($("#container")).flipHorizontal($("#foo"), $("#bar")).play();
    </script>

## Constructor Parameters

### axis `String`

The axis of the flip. Accepted values are `"horizontal"` or `"vertical"`

### face `jQuery`

The initially visible element in the container.

### back `jQuery`

The finally visible element in the container.
