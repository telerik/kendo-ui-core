---
title: FX Tile
res_type: api
---

# Tile

Slides the element to its original position in the specified direction, while sliding out the element specified in the `previous` parameter.
Supported directions are `left`, `right`, `up` and `down`.
For this effect to work as expected, the elements should be positioned on top of each other.

#### Tiling Elements Left

    <style>
        #container {
            position: relative;
            width: 200px;
            height: 200px;
            left: 300px;
            top: 300px;
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
        kendo.fx($("#bar")).tile("left", $("#foo")).play();
        // or
        // kendo.fx($("#bar")).tileLeft($("#foo")).play();
    </script>

## Constructor Parameters

### direction `String`

The direction to which the sliding will occur.

#### Example

    <div id="container">
        <div id="element1">Element 1</div>
        <div id="element2">Element 2</div>
    </div>
    <script>
    // Tile effect sliding left
    kendo.fx($("#element2")).tile("left", $("#element1")).play();
    
    // Tile effect sliding right
    kendo.fx($("#element2")).tile("right", $("#element1")).play();
    
    // Tile effect sliding up
    kendo.fx($("#element2")).tile("up", $("#element1")).play();
    
    // Tile effect sliding down
    kendo.fx($("#element2")).tile("down", $("#element1")).play();
    </script>

### previous `jQuery`

The element to slide out of the view.

#### Example

    <style>
        .container {
            position: relative;
            width: 300px;
            height: 200px;
        }
        
        .slide {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .slide1 { background: lightblue; }
        .slide2 { background: lightgreen; }
    </style>
    
    <div class="container">
        <div id="currentSlide" class="slide slide1">Current Content</div>
        <div id="previousSlide" class="slide slide2">Previous Content</div>
    </div>
    <script>
    // The previous parameter specifies which element will slide out
    kendo.fx($("#currentSlide")).tile("left", $("#previousSlide")).play();
    </script>

## Tiling Elements Up

    <style>
        #container {
            position: relative;
            width: 200px;
            height: 200px;
            left: 300px;
            top: 300px;
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
        kendo.fx($("#bar")).tile("up", $("#foo")).play();
    </script>
