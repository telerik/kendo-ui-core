---
title: Class
---


# kendo.Class

The base class of most Kendo objects. Provides simple inheritance support.

## Fields

### fn `Object`

An alias to the [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) of the class. Often used to call methods of the base class.

#### Example - use the prototype to call base methods

    <script>
    // Create a base class
    var Animal = kendo.Class.extend({
        // The `init` method will be called when a new instance is created
        init: function(legs) {
           this.legs = legs;
        }
    });

    // Inherit from that class

    var Bird = Animal.extend({
        init: function() {
            // Use the `fn` field to call the `init` method of the base class (Animal)
            Animal.fn.init.call(this, 2);
        }
    });

    var birdie = new Bird();

    console.log(birdie.legs); // outputs 2
    </script>

## Class methods

### extend

Extends an existing class with new methods.

#### Returns

`Object` a new class which inherits the base methods.

#### Parameters

##### prototype `Object`

A key/value pair of all methods that the new class will have.

#### Example - inheritance

    <script>
    var Animal = kendo.Class.extend({
        move: function() {
            console.log("Animal.move()");
        }
    });

    var Bird = Animal.extend({
       move: function() {
            Animal.fn.move.call(this);

            console.log("Fly");
       }
    });

    var Cat = Animal.extend({
       move: function() {
            Animal.fn.move.call(this);

            console.log("Sneak");
       }
    });

    var tweety = new Bird();

    tweety.move(); // outputs "Animal.move()" then "Fly"

    var sylvester = new Cat();

    sylvester.move(); // outputs "Animal.move()" then "Sneak"

    console.log(tweety instanceof Bird); // outputs "true" because tweety is an instanfe of Bird

    console.log(tweety instanceof Animal); // outputs "true" because Animal is the base class of Bird

    console.log(tweety instanceof Cat); // outputs "false" because tweety is not an instance of Cat
    </script>
