---
title: FX Transfer
res_type: api
---

# Transfer

> Currently this effect is supported only in Google Chrome, Firefox and IE10+.

Scales and repositions the element on top of the provided target. The element and the target should have the same proportions but should not be the same size.

> **Note**: The first time the effect performs, the element is detached from its current position and re-attached in the body element.

#### Transferring an element to a target

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


<div class="meta-api-description">
Set or configure the destination element for a visual transfer animation by specifying the target as an HTML element, CSS selector, or jQuery object, enabling control over where the animated effect moves or transitions, supporting use cases like animating movement toward dynamic elements, linking animations between components, directing visual focus during UI changes, or coordinating effects across page elements through element references, selectors, or DOM nodes.
</div>

#### Example

    <div id="source" style="width: 100px; height: 100px; position: absolute; border: 1px solid blue; background: lightblue;">
        Source
    </div>

    <div id="destination" style="width: 50px; height: 50px; position: absolute; left: 200px; top: 50px; border: 1px solid red; background: lightcoral;">
        Target
    </div>

    <script>
        // Transfer the source element to the destination target
        kendo.fx($("#source")).transfer($("#destination")).play();
    </script>

