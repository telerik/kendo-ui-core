---
title: FX Common API
---

# Common Effects API

All Kendo effects support the following methods:

### duration

Sets the effect duration.

#### Parameters

##### duration `Number`

The number of milliseconds it will take for the effect to reach its final state. By default, effects are animated for 400 milliseconds.

#### Returns

`Effect` the effect instance for further usage

#### Example

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().duration(2000).play();
    </script>

### direction

Sets the effect direction.

**Note** certain effects (like Transfer, for instance) do not have a direction.

#### Parameters

##### direction `string`

The effect direction. Check the respective effect API reference for the values supported.

#### Returns

`Effect` the effect instance for further usage

#### Example

    <div id="foo">
        I will be faded in
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().direction("in").play();
    </script>

### play

Plays the effect

#### Returns

`Promise` a [jQuery promise instance](http://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](http://api.jquery.com/jQuery.when/).

#### Example

    <div id="foo">
        I will be faded out
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().play().then(function() {
            console.log("Foo faded out");
        });
    </script>

### reverse

Plays the effect in reverse.

#### Returns

`Promise` a [jQuery promise instance](http://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](http://api.jquery.com/jQuery.when/).

#### Example

    <div id="foo">
        I will be faded out
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().reverse().then(function() {
            console.log("Foo faded out");
        });
    </script>

### stop

Stops the effect in its current state

#### Example

    <div id="foo">
        I will be faded out
    </div>

    <script>
        var effect = kendo.fx($("#foo")).fadeOut();
        effect.duration(2000).play();
        setTimeout(function() {
            effect.stop();
        }, 1000);
    </script>

