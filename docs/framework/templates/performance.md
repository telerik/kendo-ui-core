---
title: Performance
page_title: Performance | Kendo UI Templates
description: "Learn about the techniques Kendo UI Templates use to achieve high performance and to be up to 60 times faster than jQuery templates."
slug: performance_kendoui_templatescomponent
position: 2
---

# Performance

The [Kendo UI Templates](http://demos.telerik.com/kendo-ui/templates/index) are a prime example of the commitment of Kendo UI to focus its engineering approach on performance over features. With JavaScript applications running on a myriad of low-power devices, such as phones and tablets, it is essential that applications squeeze every last bit of performance out of their code. Code that may look fine on a desktop browser like Chrome can crawl on a tablet if not carefully engineered.

Kendo UI Templates do not offer as many features as other JavaScript templating libraries, but they do so intentionally to deliver better performance. Depending on the browser and computer (templates run on the client machine, so naturally there are variances), Kendo UI Templates are up to 60 times (6000%) faster than jQuery templates.

To compare performance results directly, [refer to the live JSPerf test](http://jsperf.com/dom-vs-innerhtml-based-templating/509).

## Techniques

Kendo UI achieves high performance templates through the use of several techniques, as listed below, in addition to limiting features:

1. John Resig, creator of jQuery, has one of the best core micro-templating philosophies in his aptly titled [JavaScript Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/) article. This is the starting point and baseline for Kendo UI Templates. If Kendo UI can meet or exceed John's speed, it meets the goal for fast templating.
2. While John uses `array` Push and Join functions to build his templates, Kendo UI discovered that simple string concatenation (`+=`) performs even faster in many browsers, especially Chrome.
3. The biggest speed booster is that eliminating the [JavaScript `with` block](https://developer.mozilla.org/index.php?title=En/Core_JavaScript_1.5_Reference/Statements/With) inside the template builder delivers a huge performance improvement. Some templates prefer the scope-helping `with` block, so Kendo UI templates use `with` blocking by default, but it can be easily disabled. When you do not need it, you can realize the full speed gains in your template rendering.

## Comparison

Performance claims are never set in stone as libraries are evolving all the time. You can see where Kendo UI Templates stands in comparison to some of the common options like Handlebars, Mustache, jQuery Templates (now deprecated), Underscore JS, and John's original micro-templating implementation by using the [JavaScript templating engine shootout](http://jsperf.com/dom-vs-innerhtml-based-templating/509) JSPerf test.

> **Important**
>
> JSPerf is a great tool to use for quick, relative performance tests between JavaScript libraries and snippets. Anyone can create or modify a JSPerf test to test and compare the performance of JavaScript code across many different browsers and machines.

## Optimization

### Disabling with Blocking

By default, Kendo UI Templates use `with` blocking. This makes it more convenient to configure templates, but has a big impact on template performance. To enhance template performance, disable `with` blocking in Kendo UI by using the overriding code below:

		var template = kendo.template(templateString,{useWithBlock:false});

Setting `useWithBlock` to `false` makes Kendo UI templates run at maximum speed. Use this option if you are looking for ways to make your apps run faster, especially on mobile devices.

The example below demonstrates Kendo UI Templates with `with` blocking disabled.

###### Example

```html
<div id="results">
</div>

<script>
window.sharedVariables = {
   header: "Header",
   header2: "Header2",
   header3: "Header3",
   header4: "Header4",
   header5: "Header5",
   header6: "Header6",
   list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  };

window.kendouiTemplate = kendo.template("<div><h1 class='header'><#= data.header #></h1><h2 class='header2'><#= data.header2 #></h2><h3 class='header3'><#= data.header3 #></h3><h4 class='header4'><#= data.header4 #></h4><h5 class='header5'><#= data.header5 #></h5><h6 class='header6'><#= data.header6 #></h6><ul class='list'><# for (var i = 0, l = data.list.length; i < l; i++) { #><li class='item'><#= data.list[i] #></li><# } #></ul></div>", {useWithBlock:false});

$("#results").html(window.kendouiTemplate(sharedVariables));
</script>

```

### Disabling with Blocking: Impact

`with` JavaScript keyword is used to extend the scope chain for a statement. Anything inside a `with` block will use the context defined by `with`, thus saving repetitive scope code. It is generally considered to be a feature of JavaScript that should be avoided.

Learn more about `with` and its pros and cons on the [Mozilla Developer Network](https://developer.mozilla.org/index.php?title=En/Core_JavaScript_1.5_Reference/Statements/With).

For Kendo UI Templates, disabling `with` can impact the way you reference the data used in your template.

The example below assumes that the data displayed in it is the data you want to use with a template.

###### Example

		var myDemoData = {
		   header: "Header",
		   header2: "Header2",
		   list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
		};

By default, you might create a Kendo UI template, as demonstrated below.

###### Example

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

Notice the way you are able to directly use the names of the `data` object properties&mdash;`header`, `header2`, `list`&mdash;demonstrated below.

###### Example

```html
<div id="results">
</div>

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

<script>
window.sharedVariables = {
   header: "Header",
   header2: "Header2",
   list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  };

window.kendouiTemplate = kendo.template($("#temp").html(), {useWithBlock:true});

$("#results").html(window.kendouiTemplate(sharedVariables));
</script>

```

Disable the `with` blocking when you initialize your template in JavaScript by using the code below.

		var template = kendo.template($("#temp").html(), {useWithBlock:false});

When you take this step, you can no longer refer to the properties of your data directly. If you leave your template unchanged, the following JavaScript error occurs: `Uncaught ReferenceError: header is not defined`.

To fix this problem, you must manually include the `data` scope in your template. The example below demonstrates what the updated template is going to look like.

###### Example

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
You can see that now you refer to `data.header` instead of `header`, and to `data.list[i]` instead of `list[i]`. That is all it takes to make a template ready for disabling `with` blocking and enhancing performance.

## Compatibility

Even though the implementation of Kendo UI Templates is fast, you may prefer your templating library of choice. Kendo UI is designed to support this behavior. For any Kendo UI out-of-the-box functionality, like templating, Kendo UI provides escape hatches that make it easy to use any JavaScript library you want. Kendo UI allows and embraces BYO for developers that have strong preferences and, therefore, if you love Underscore or Mustache, you can use them with Kendo UI.

## See Also

Other articles on Kendo UI Templates:

* [Templates Overview]({% slug overview_kendoui_templatescomponent %})
* [Load Templates from External Files]({% slug externalteplateloading_templatescomponent %})
* [JavaScript API Reference: template](/api/javascript/kendo#methods-template)
