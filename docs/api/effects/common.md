---
title: FX Common API
res_type: api
---

# Common Effects API

All Kendo effects support the following methods:

## Methods

### duration

Sets the effect duration.


<div class="meta-api-description">
How do I adjust the duration of animation effects in Kendo UI using the FXCommonAPI? Adjust or configure the length of animation or transition effects by setting the time they run, controlling effect timing to create smoother or faster responses, specifying duration in milliseconds or time units to fine-tune how long visual or interactive effects last, enabling precise control over animation speed, transition delay, or effect runtime for customized user experience pacing and responsiveness in interfaces or graphical elements.
</div>

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


<div class="meta-api-description">
How can I configure the movement direction of an animation using the FXCommonAPI.direction method? Configure the movement or starting orientation of an animation by setting its directional flow or entry and exit points, such as left, right, up, or down, to control how visual effects proceed or transition; adjust or define the animation's path, flow direction, motion vector, or travel orientation to influence effect behavior, speed, and user interface interactions, noting that some animations may not support directional parameters or ignore these settings depending on the effect type.
</div>

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


<div class="meta-api-description">
How do I programmatically start or resume animations in Kendo UI effects? Initiate, trigger, or start the configured animation or visual effect programmatically on specified elements, enabling control over the animation timeline such as playing, restarting, or resuming effects defined within the component; useful for managing effect playback dynamically alongside methods like stopping, reversing, or controlling animation flow on demand to create interactive or timed visual experiences.
</div>

#### Returns

`Promise` a [jQuery promise instance](https://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](https://api.jquery.com/jQuery.when/).

#### Example

    <div id="foo">
        I will be faded out
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().play().then(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Foo faded out");
        });
    </script>

### reverse

Plays the effect in reverse.


<div class="meta-api-description">
How do I control animation playback to run effects backward with the Kendo UI for jQuery FXCommonAPI.reverse method? Control animation playback to run effects backward, rewind animations to their initial state, reverse motion sequences, undo or roll back transitions by playing effects from end to start, set or trigger reverse animation directions programmatically, enable backward animation flow on visual elements, configure effects to animate in opposite order, manipulate animation timelines to move in reverse, and implement rewind functionality for dynamic UI motion control.
</div>

#### Returns

`Promise` a [jQuery promise instance](https://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](https://api.jquery.com/jQuery.when/).

#### Example

    <div id="foo">
        I will be faded out
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().reverse().then(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Foo faded out");
        });
    </script>

### stop

Stops the effect in its current state


<div class="meta-api-description">
How to immediately stop ongoing animations in Kendo UI effects? Stop, cancel, abort, or interrupt running animations and visual effects immediately without waiting for completion or reverting to initial states by invoking a method that halts ongoing effect processing on visual components, allowing developers to control, disable, or freeze dynamic animations, transitions, or effects instantly while preserving the current appearance of elements without resetting or finishing the animation sequence.
</div>

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

