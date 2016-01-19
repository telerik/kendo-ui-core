---
title: Overview
page_title: Overview | Kendo UI Class
description: "Learn how to use the Kendo UI class category and get the basics of doing JavaScript inheritance with Kendo UI."
previous_url: /kendo-ui/framework/inheritance, /tutorials/inheritance-with-kendoui
slug: inheritance_kendoui_gettingstarted
position: 5
---

# Class Overview

Kendo UI is an extremely powerful tool in any JavaScript development arsenal. Developers coming from Object-Oriented backgrounds may get frustrated with the quirkiness of JavaScript’s Object Model as it is somewhat counter-intuitive. However, you can take some of the structure and [don't repeat yourself (DRY) principles](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) from Object-Oriented languages, and use them in JavaScript development.

## Getting Started

### Create New Objects

You can create a new object with Kendo UI by calling `kendo.Class.extend` to define it, as shown below.

###### Example

    var person = kendo.Class.extend({});

This creates a new Person object. Now add some properties to that person object, as well as any functions that you want to create. Object literal notation is used here, so variables are declared with a semi-colon (`:`) separating them from their value instead of an equal sign (`=`). Also, the example uses the `this` keyword to reference local variables inside the object. Failure to specify the context results in the variable not being found.

###### Example

    var Person = kendo.Class.extend({
        firstName: 'Not Set',
        lastName: 'Not Set',
        isAPrettyCoolPerson: false,
        sayHello: function() {
            alert("Hello! I'm " + this.firstName + " " + this.lastName);
        }
    });

    var person = new Person();
    person.sayHello();

**Figure 1. Create a new object**

![Capture](/images/inheritance/8c23-capture.png)

### Add Constructors

You can also add a constructor for this object by including an `init` method. You can create a new person by building up a new `Person` object, such as a new [John Bristowe](http://twitter.com/johnbristowe)). Then, set his `isAPrettyCoolPerson` to true.

###### Example


    var Person = kendo.Class.extend({
        firstName: 'Not Set',
        lastName: 'Not Set',
        isAPrettyCoolPerson: false,
        init: function(firstName, lastName) {
            if (firstName) this.firstName = firstName;
            if (lastName) this.lastName = lastName;
        },
        sayHello: function() {
            alert("Hello! I'm " + this.firstName + " " + this.lastName);
        }
    });

    var person = new Person("John", "Bristowe");
    person.isAPrettyCoolPerson = true;
    person.sayHello();

**Figure 2. Set the name of the new person**

![nh5](/images/inheritance/8c23-nh5.png)

### Instantiate New Parent Object

Now you can instantiate a new person object of type parent that inherits the properties of `Person` by extending the base person object. Then toggle on the fact that this person is cool.

###### Example

    var Parent = Person.extend({
        firstName: 'Mark',
        lastName: 'Holland'
    });

    var myDad = new Parent();
    myDad.isAPrettyCoolPerson = true;
    myDad.sayHello();
    alert(myDad.isAPrettyCoolPerson);

**Figure 3. Instantiate a parent**

![nh1](/images/inheritance/8c23-nh1_1.png)

**Figure 4. Toggle on a quality**

![nh2](/images/inheritance/8c23-nh2.png)

### Inherit Parent Properties

A child would inherit some, but not all, properties from their parents. If you inherit your father's last name, you can override the first name since you have your own. Also, if your dad is a cool person, you might inherit from him that too.

###### Example

    var Child = Parent.extend({});
    var me = new Child();
    me.firstName = "Burke";
    me.sayHello();
    alert(me.isPrettyCoolPerson);

**Figure 5. Inherit some parent properties**

![nh3](/images/inheritance/8c23-nh3.png)

**Figure 6. Try to inherit more parent properties**

![nh4](/images/inheritance/8c23-nh4.png)

### Understand Parent Objects

It seems the child does not inherit being cool from their parent. Actually, it inherits the trait, which the parent inherited from the `person` object. Because `isACoolPerson` was set after the dad was created, it is specific to his object instance of `Parent`. And, by default, parents are not cool people.

## Sample Case

Use the example below to experiment with the inheritance concept in Kendo UI.

###### Example

```html
<div id="content"></div>

<script>
function log(msg) {
    $("#content").append("<p>" + msg + "</p>");
}

// create a new person class
var Person = kendo.Class.extend({
    firstName: 'Not Set',
    lastName: 'Not Set',
    isPrettyCoolPerson: false,
    init: function(firstName, lastName) {
        if (firstName) this.firstName = firstName;
        if (lastName) this.lastName = lastName;
    },
    sayHello: function() {
        log("Hello! I'm " + this.firstName + " " + this.lastName)
    }
});

// create a new John Bristowe of type person
var person = new Person("John", "Bristowe");
// say hello John
person.sayHello();

// create a parent object of type person    
var Parent = Person.extend({
    firstName: 'Mark',
    lastName: 'Holland'
});

// create the parent   
var myDad = new Parent();
myDad.isPrettyCoolPerson = true;

// say hello, parent
myDad.sayHello();
// expose the parent's coolness factor
    log("Cool? " + myDad.isPrettyCoolPerson);

// create a new child object that inherits from the parent    
var Child = Parent.extend({});

// create me
var me = new Child();
me.firstName = "Burke";

// Hello!
me.sayHello();
// expose my coolness
log("Cool? " + me.isPrettyCoolPerson);
</script>

```

## See Also

Other articles on Kendo UI generic implementation:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Widget Wrapper and Element References]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Data Attributes Configuration]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
