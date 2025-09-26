---
title: FX PageTurn
res_type: api
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


<div class="meta-api-description">
Set or configure the animation direction for page-turn effects, flipping pages horizontally or vertically by specifying orientation parameters for transitions, page flip animations, or layout-sensitive effects. Control whether pages turn along the horizontal axis or vertical axis, enabling customization of visual flow, animation direction, and interactive page transitions. Adjust or enable horizontal versus vertical page flip animations to match design needs and user interface requirements involving directional page transitions.
</div>

#### Example

    <div id="container">
        <div class="back-page">Back Page</div>
        <div class="front-page">Front Page</div>
    </div>
    <script>
    // Horizontal page turn
    kendo.fx($("#container")).pageturn("horizontal", $(".front-page"), $(".back-page")).play();
    
    // Vertical page turn
    kendo.fx($("#container")).pageturn("vertical", $(".front-page"), $(".back-page")).play();
    </script>

### face `jQuery`

The initially visible element in the container.


<div class="meta-api-description">
Configure the initial visible element or front face displayed when starting a page-turn animation, enabling control over which child component or page is shown first, set the starting view for flipbook or page flip effects, define the initial content or face rendered inside the container, specify the default front page or element for animation startup, and control the initial state or visible face when initializing page turn interactions or components.
</div>

#### Example

    <div id="container">
        <div class="back-content">This will be revealed</div>
        <div class="face-content">This is initially visible</div>
    </div>
    <script>
    var face = $(".face-content");
    var back = $(".back-content");
    kendo.fx($("#container")).pageturn("horizontal", face, back).play();
    </script>

### back `jQuery`

The finally visible element in the container.


<div class="meta-api-description">
Control or configure which element or component is shown or revealed as the final visible page after a page-turn animation finishes, specifying the ending target inside a container during initialization, setting the back-facing or hidden element that becomes visible once the transition completes, determining which content or view appears after flipping pages or performing a page-turn effect, adjusting the initial visibility state to define what the user sees at the conclusion of the animated page turn, managing the end result element displayed when starting or setting up the page-turn interaction.
</div>

#### Example

    <div id="container">
        <div class="hidden-page">This will be shown after the page turn</div>
        <div class="visible-page">This is currently visible</div>
    </div>
    <script>
    var face = $(".visible-page");
    var back = $(".hidden-page");
    kendo.fx($("#container")).pageturn("vertical", face, back).duration(1500).play();
    </script>

