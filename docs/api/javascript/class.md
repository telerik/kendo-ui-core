---
title: Class
res_type: api
---


# kendo.Class

The base class of most Kendo objects. Provides simple inheritance support.

## Fields

### fn `Object`

An alias to the [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) of the class. Often used to call methods of the base class.


<div class="meta-api-description">
Accessing or invoking inherited methods, calling or overriding shared prototype functions, manipulating or inspecting base class properties, extending or modifying prototype behavior, controlling or customizing inherited functions, referencing or working with superclass methods, enabling or configuring base functionality reuse, exploring or altering class inheritance features, managing prototype chains, and implementing or adapting parent class behaviors are supported through a mechanism that provides direct access to the class prototype for class inheritance management and base method invocation.
</div>

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

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(birdie.legs); // outputs 2
    </script>

## Class Methods

### extend

Extends an existing class with new methods.


<div class="meta-api-description">
Extend classes by creating subclasses that add, override, or customize methods and properties to modify or enhance existing functionality, enabling inheritance, method overriding, prototype augmentation, behavior extension, class derivation, subclass creation, mixin integration, and maintaining base class features while introducing new or altered behaviors in the derived class structure.
</div>

#### Returns

`Object` a new class which inherits the base methods.

#### Parameters

##### prototype `Object`

A key/value pair of all methods that the new class will have.

#### Example - inheritance

    <script>
    var Animal = kendo.Class.extend({
        move: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Animal.move()");
        }
    });

    var Bird = Animal.extend({
       move: function() {
            Animal.fn.move.call(this);

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Fly");
       }
    });

    var Cat = Animal.extend({
       move: function() {
            Animal.fn.move.call(this);

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Sneak");
       }
    });

    var tweety = new Bird();

    tweety.move(); // outputs "Animal.move()" then "Fly"

    var sylvester = new Cat();

    sylvester.move(); // outputs "Animal.move()" then "Sneak"

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(tweety instanceof Bird); // outputs "true" because tweety is an instanfe of Bird

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(tweety instanceof Animal); // outputs "true" because Animal is the base class of Bird

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(tweety instanceof Cat); // outputs "false" because tweety is not an instance of Cat
    </script>
