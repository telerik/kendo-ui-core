---
title: Performance
page_title: Template Performance in Kendo UI Framework
description: Kendo UI templates use several techniques to achieve high performance and be up to 60 times faster than jQuery Templates.
position: 2
---

# Kendo UI Template Performance
Kendo UI Templates are a prime example of Kendo UI's decisions to engineer for performance over features. With JavaScript apps running on a myriad of low power devices, like phones and tablets, it's essential that apps squeeze every last bit of performance out of their code. Code that may look fine on a desktop browser like Chrome can crawl on a tablet if not careful engineered.

Kendo UI Templates does not offer as many features as other JavaScript templating libraries, but it does so intentionally to deliver better performance.

Depending on the browser and computer (templates run on the client machine, so naturally there are variances), Kendo UI Templates are up to 60 times (6000%) faster than jQuery Templates.

[See the live JSPerf test to compare performance results directly](http://jsperf.com/dom-vs-innerhtml-based-templating/509)

## How Kendo UI Templates Achieve Speed
Kendo UI achieves high performance templates through the use of several techniques (in addition to limiting features):

1. John Resig, creator of jQuery, has one of the best "core" micro-templating philosophies in his aptly titled "[JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/)." This is our starting point and baseline. If we can meet or exceed John's speed, we're meeting our goal for fast templating.
2. While John uses `array` Push and Join functions to build his templates, we discovered that simple string concatenation (+=) performs even faster in many browsers, especially Chrome.
3. Further, and this is the biggest speed booster, we found that eliminating the [JavaScript "`with`" block](https://developer.mozilla.org/index.php?title=En/Core_JavaScript_1.5_Reference/Statements/With) inside of the template builder delivers a huge performance improvement. Of course, some templates prefer the scope-helping "`with`" block, so Kendo UI templates use "`with`" blocking by default, but it can be easily disabled. When you don't need it, you can realize the full speed gains in your template rendering.

## Comparing Performance
Clearly, performance claims are never set in stone. Libraries are always evolving, and it is our sincere hope that all JavaScript libraries that offer templating improve over time. For now, you can see how Kendo UI Templates compare to some of the common options like Handlebars, Mustache, jQuery Templates (now deprecated), Underscore JS, and John's original micro-templating implementation by using the following JSPerf test:

[JSPerf: JavaScript templating engine shootout](http://jsperf.com/dom-vs-innerhtml-based-templating/509)

> JSPerf is a great tool to use for quick, relative performance tests between JavaScript libraries and snippets. Anyone can create or modify a JSPerf test to test and compare the performance of JavaScript code across many different browsers and machines.

## Disabling "with" blocking in Kendo UI Templates
As previously mentioned, Kendo UI Templates use "`with`" blocking by default. This makes it more convenient to configure templates, but has a big impact on template performance. To maximize template performance, you can easily disable "`with`" blocking in Kendo UI with a simple override:

		var template = kendo.template(templateString,{useWithBlock:false});

By setting `useWithBlock` to `false`, Kendo UI templates will run at maximum speed. Use this option if you are looking for ways to make your apps run faster, especially on mobile devices.

You can try a live demo of Kendo UI Templates with "`with`" blocking disabled using [this jsPerf example](http://jsfiddle.net/kfEfw/2/).

### Impact of disabling "with" block on template syntax
JavaScript's `with` keyword is used to extend the scope chain for a statement. Anything inside of a `with` block will use the context defined by `with`, thus saving repetitive scope code. It is generally considered to be a feature of JavaScript that should be avoided.

You can learn more about `with` and its pros and cons on the [Mozilla Developer Network](https://developer.mozilla.org/index.php?title=En/Core_JavaScript_1.5_Reference/Statements/With).

For Kendo UI Templates, disabling `with` can impact the way you reference data used in your template. Let's assume you have the following data you want to use with a template:

		var myDemoData = {
		   header: "Header",
		   header2: "Header2",
		   list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
		};

By default, you might create a Kendo UI template like this:

		<script type="text/x-kendo-template" id="temp">
		    <div>
		        <h1 class='header'>#= header #</h1>
		        <h2 class='header2'>#= header2 #</h2>
		        <ul>
		            # for(var i = 0, l = list.length; i < l; i++){#
		            <li class='item'>#= list[i] #</li>
		            #}#
		        </ul>
		    </div>
		</script>

Notice how we're able to use the names of the properties of my `data` object directly (header, header2, list). You can [try this example using jsFiddle here](http://jsfiddle.net/zMRXy/1/).

Now, let's disable "`with`" blocking when we initalize our template in JavaScript:

		var template = kendo.template($("#temp").html(), {useWithBlock:false});

When we take this step, we can no longer refer to the properties of our data directly. If we leave our template unchanged, the following JavaScript error will occur:

**Uncaught ReferenceError: header is not defined**

To fix this problem, we must manually include the "data" scope in our template. The updated template will look like this:

		<script type="text/x-kendo-template" id="temp">
		    <div>
		        <h1 class='header'>#= data.header #</h1>
		        <h2 class='header2'>#= data.header2 #</h2>
		        <ul>
		            # for(var i = 0, l = data.list.length; i < l; i++){#
		            <li class='item'>#= data.list[i] #</li>
		            #}#
		        </ul>
		    </div>
		</script>
		​
That's it! You can see that now we refer to "data.header" instead of simply "header." And we refer to "data.list[i]" instead of "list[i]." That's all that it takes to make a template ready for disabling "`with`" blocking and unlocking maximum performance.

## Using different templating libraries with Kendo UI
We recognized from the outset that even though our templating implementation is fast, some people will always prefer their templating library of choice. There are many legitmate reasons developers have librarie preferences.

Kendo UI is designed to support this behavior. For anything in Kendo UI that has an out-of-the-box implementation (like Templating), we provide "escape hatches" that make it easy to use any JavaScript library you love. We don't _require BYO*_, but we do _allow and embrace BYO*_ for developers that have strong preferences.

So if you love Underscore or Mustache or whatever, great! You can use that with Kendo UI, too.
