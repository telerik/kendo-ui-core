---
title: FX Transfer
---

# Transfer

> Currently this effect is supported only in Google Chrome, Firefox and IE10+.

Scales and repositions the element on top of the provided target. The element and the target should have the same proportions but should not be the same size.

> **Note**: The first time the effect performs, the element is detached from its current position and re-attached in the body element.

## Transferring an element to a target

    <div id="foo" style="width: 200px; height: 200px; position: absolute; border: 1px solid black; background: grey;">
        I will be animated to a given target
    </div>

    <div id="bar" style="width: 50px; height: 50px; position: absolute; left: 300px; top: 20px; border: 1px solid black;">
        Target
    </div>

    <script>
        kendo.fx($("#foo")).transfer($("#bar")).play();
    </script>

## Constructor Parameters

### target `jQuery`

The target element to transfer to.

