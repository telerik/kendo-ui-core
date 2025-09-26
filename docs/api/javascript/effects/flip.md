---
title: FX Flip
res_type: api
---

# Flip

Flips the element around the axis specified by the axis parameter.  Supported directions are `horizontal` and `vertical`. The effect needs certain markup and styling in order to function properly.
The element **should be positioned absolutely/relatively**, and contain two child elements (*face* and *back*) with the same size as their parent, positioned absolutely on top of each other.

#### Flip Effect Example

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


<div class="meta-api-description">
Control or configure the flip animation direction during component creation by specifying the axis of rotation, enabling horizontal or vertical flipping effects, setting the flip orientation to either left-right or up-down, adjusting the flip direction parameter at initialization, defining whether the flip transition rotates around a horizontal or vertical axis, and customizing the flip behavior for UI elements by selecting the axis along which the flip should occur.
</div>

#### Example

    <style>
        #container {
            position: relative;
            width: 200px;
            height: 200px;
        }
        #front, #back {
            position: absolute;
            width: 200px;
            height: 200px;
        }
        #front {
            background: lightblue;
        }
        #back {
            background: lightcoral;
        }
    </style>

    <div id="container">
        <div id="front">Front Side</div>
        <div id="back">Back Side</div>
    </div>

    <script>
        // Flip horizontally
        kendo.fx($("#container")).flip("horizontal", $("#front"), $("#back")).play();
        
        // Or flip vertically
        // kendo.fx($("#container")).flip("vertical", $("#front"), $("#back")).play();
    </script>

### face `jQuery`

The initially visible element in the container.


<div class="meta-api-description">
Specify or configure the initially visible side, front face, or starting element shown when creating a flip animation instance, controlling which container face or content is displayed first before any flip or transition occurs, setting the default visible panel, side, or component in a flipping interface and determining the initial state or front content that users see immediately upon rendering or initialization.
</div>

#### Example

    <style>
        #container {
            position: relative;
            width: 200px;
            height: 200px;
        }
        .face, .back {
            position: absolute;
            width: 200px;
            height: 200px;
            text-align: center;
            line-height: 200px;
        }
        .face {
            background: #4CAF50;
            color: white;
        }
        .back {
            background: #FF5722;
            color: white;
        }
    </style>

    <div id="container">
        <div class="face" id="frontElement">This is the Face</div>
        <div class="back" id="backElement">This is the Back</div>
    </div>

    <script>
        // The face parameter specifies which element is initially visible
        var faceElement = $("#frontElement");
        var backElement = $("#backElement");
        
        kendo.fx($("#container")).flip("horizontal", faceElement, backElement).play();
    </script>

### back `jQuery`

The finally visible element in the container.


<div class="meta-api-description">
Configure the element or content displayed on the reverse side of a flip animation by setting the final visible component after the flip completes; control the back-facing content, specify which item or view replaces the front during or after the flip effect, and customize the destination element shown post-animation using constructor parameters to manage what appears behind the flipping front face in a dynamic flip container.
</div>

#### Example

    <style>
        #flipContainer {
            position: relative;
            width: 250px;
            height: 150px;
            margin: 20px;
        }
        .card-front, .card-back {
            position: absolute;
            width: 250px;
            height: 150px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: white;
        }
        .card-front {
            background: linear-gradient(45deg, #2196F3, #21CBF3);
        }
        .card-back {
            background: linear-gradient(45deg, #FF9800, #FF5722);
        }
    </style>

    <div id="flipContainer">
        <div class="card-front" id="frontCard">Front Card</div>
        <div class="card-back" id="backCard">Back Card</div>
    </div>
    <button id="flipBtn">Flip Card</button>

    <script>
        $("#flipBtn").click(function() {
            var frontElement = $("#frontCard");
            var backElement = $("#backCard"); // This is the 'back' parameter - element shown after flip
            
            kendo.fx($("#flipContainer")).flip("horizontal", frontElement, backElement).play();
        });
    </script>
