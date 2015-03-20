---
title: Inheritance With Kendo UI
page_title: Class-based Inheritance with Kendo UI
previous_url: /tutorials/inheritance-with-kendoui
---

# Class-based Inheritance with Kendo UI

In this help topic, we will examine the basics of doing JavaScript Inheritance With Kendo UI. You will learn the following:

- How to use Kendo UI Classes
- Some simple inheritance strategies for JavaScript

Kendo UI is more than just great looking widgets with amazing features.  It’s an extremely powerful tool in your JavaScript development arsenal.  The
fine team working on Kendo UI knows their JavaScript and has exposed some of what they implemented for you to use as well.

One of the things that tends to happen quickly in JavaScript programming, is that those coming from Object Oriented backgrounds get frustrated with
the quirkiness of JavaScript’s Object Model.  It’s somewhat counter-intuitive when it comes to things like simple inheritance strategies and
oftentimes we give up and just start chaining elements until we’ve built “the monster”.

It’s essential that we take some of the fantastic structure and DRY principles from OO and use them in our JavaScript development.  Especially as
JavaScript plays more and more of a role on the server (Node.js for instance).

> Wikipedia describes JavaScript as a:
[“prototype-based](http://en.wikipedia.org/wiki/Prototype-based) [scripting language](http://en.wikipedia.org/wiki/Scripting_language) that is [dynamic](http://en.wikipedia.org/wiki/Dynamic_language), [weakly
typed](http://en.wikipedia.org/wiki/Weak_typing) and has [first-class functions](http://en.wikipedia.org/wiki/First-class_functions). It is a [multi-paradigm](http://en.wikipedia.org/wiki/Multi-paradigm)
language, supporting [object-oriented](http://en.wikipedia.org/wiki/Object-oriented_programming),[imperative](http://en.wikipedia.org/wiki/Imperative_programming), and
[functional](http://en.wikipedia.org/wiki/Functional_programming) programming styles.”

That’s a lot of ability in one language.  Functional languages are powerful, but when you are able to add in OO principals, it get's really beautiful.

### Inheritance With Kendo UI

You can create a new object with Kendo UI by calling **kendo.Class.extend** to define it.

    var person = kendo.Class.extend({});

That creates a new Person object. We can now add some properties to that person object, as well as any functions that we want to create. Object
literal notation is used here, so variables are declared with a `:` separating them from their value instead of an `=`. Also, we use the `this` keyword to
reference local variables inside the object. Failure to specify the context will result in the variable not being found.


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

![Capture](/images/inheritance/8c23-capture.png)

We can also add a constructor for this object by including an "_init_" method.  We could then create a new person by newing up a new **Person**
object. We’ll create a new [John Bristowe][21].  We’ll also set his “_isAPrettyCoolPerson_” to true.


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

![nh5](/images/inheritance/8c23-nh5.png)

Now we can instantiate a new person object of type parent that inherits the properties of **Person** by extending the base person object.  Here I’ve
created an instance of my Dad who is a parent.  My dad’s also a really cool person so we’ll toggle that on.

    var Parent = Person.extend({
        firstName: 'Mark',
        lastName: 'Holland'
    });

    var myDad = new Parent();
    myDad.isAPrettyCoolPerson = true;
    myDad.sayHello();
    alert(myDad.isAPrettyCoolPerson);

![nh1](/images/inheritance/8c23-nh1_1.png)

![nh2](/images/inheritance/8c23-nh2.png)

Now a child would inherit some, but not all properties from their parents. I inherit my father's last name, but I override the first name since I have
my own. Also, since my dad is a pretty cool person, that's a trait that I should inherit from his as well right?

    var Child = Parent.extend({});
    var me = new Child();
    me.firstName = "Burke";
    me.sayHello();
    alert(me.isPrettyCoolPerson);

![nh3](/images/inheritance/8c23-nh3.png)

![nh4](/images/inheritance/8c23-nh4.png)

### Understanding Parent Objects

Apparently I didn’t inherit that trait.  Actually I did.  I inherited the same trait my father did from the person object.  Because “_isACoolPerson_”
was set after my dad was created, it is specific to his object instance of **Parent**.  And by default, parents are not cool people.

### Next Steps

Use the Fiddle below to experiment with Inheritance In Kendo UI.

<iframe style="width: 100%; height: 750px;" src="http://jsfiddle.net/burkeholland/FgShb/embedded/js,result" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

   [21]: http://twitter.com/johnbristowe
