---
title: View
res_type: api
---

# kendo.View

The View class instantiates and handles the events of a certain screen from the application.

## Configuration

### evalTemplate `Boolean`*(default: false)*

If set to `true`, the view template will be treated as kendo template and evaluated against the provided model instance.


<div class="meta-api-description">
Control rendering behavior by enabling or disabling dynamic template evaluation and execution within the view. Configure template processing to compile and interpret inline expressions, apply data-binding, and render data-driven content based on the provided model or context. Set whether templates are treated as executable scripts or static markup, allowing flexible customization of how views process and display model data through templating syntax, expressions, and runtime evaluation. Adjust template compilation, dynamic data insertion, and execution options to control how bound data and template logic produce the final rendered output.
</div>

#### Example

    <div id="app"></div>
    <script id="foo-template" type="text/x-kendo-template">
        <span>#: foo #</span>
    </script>
    <script>
     var foo = { foo: "foo" }
     var view = new kendo.View('foo-template', { model: foo, evalTemplate: true });
     view.render($("#app"));
    </script>

### useWithBlock `Boolean`*(default: true)*

If set to `false` and evalTemplate is set to `true`, the kendo template will be evaluated without using a `with` block.


<div class="meta-api-description">
Configure template evaluation scoping and variable access when rendering views by enabling or disabling the use of JavaScript with blocks in templates; control how templates access model data and scope variables during rendering cycles, determine whether templates execute inside a with statement or in a plain evaluation context, manage template scope resolution to affect how expressions and data fields are referenced within Kendo UI components or other view rendering engines, optimize template execution context to handle variable visibility, scope isolation, and data binding behavior by toggling the use with block setting.
</div>

#### Example

    <div id="app"></div>
    <script id="foo-template" type="text/x-kendo-template">
        <span>#: data.foo #</span> <!-- "data." is required as there is no with block -->
    </script>
    <script>
     var foo = { foo: "foo" }
     var view = new kendo.View('foo-template', { model: foo, evalTemplate: true });
     view.render($("#app"));
    </script>

### model `ObservableObject`*(default: null)*

The MVVM model to bind the element to.


<div class="meta-api-description">
Connect or link a user interface view to a data model using MVVM architecture, enabling automatic synchronization between the view’s DOM elements and the underlying data source, ensuring that user interface components reflect real-time changes from observable objects or data bindings, support data context assignment for dynamic content rendering, allow setting or updating the model to control the display and behavior of the UI based on live data changes, and facilitate reactive UI updates by binding the view to a structured data representation that can be queried, modified, and observed.
</div>

#### Example

    <div id="app"></div>
    <script>
     var foo = { foo: "foo" }
     var view = new kendo.View('<span data-bind="text:foo"></span>', { model: foo });
     view.render($("#app"));
    </script>

### tagName `String` *(default: "div")*

The tag used for the root element of the view.


<div class="meta-api-description">
Set or customize the HTML element type for a UI component’s root, enabling control over semantic tags like div, section, header, span, or custom elements to influence structure, styling, accessibility, and markup output. Adjust, specify, or override the rendered tag to optimize for SEO, semantic correctness, ARIA roles, and layout needs, allowing developers to switch root elements dynamically for diverse use cases or component behaviors. Tailor element selection to match design requirements or accessibility standards by choosing the most appropriate container tag for content grouping or presentation purposes.
</div>

#### Example

    <div id="app"></div>

    <script>
    var view = new kendo.View("Hi!", { tagName: "span" });
    view.render($("#app"));
    </script>

### wrap `Boolean` *(default: true)*

If set to `false`, the view will not wrap its contents in a root element. In that case, the view element will point to the root element in the template. If false, the view template should have a **single** root element.


<div class="meta-api-description">
Control whether the rendered view automatically wraps its content or directly references the template’s single root element, enabling configuration to disable wrapping so the view element corresponds exactly to the root node without additional containers; useful for managing component root access, avoiding extra wrapper nodes, ensuring single root structure, configuring template rendering behavior, and controlling how the view maps to the underlying DOM element in frameworks that support explicit root element referencing and wrapping toggling.
</div>

#### Example

    <div id="app"></div>

    <script>
    var view = new kendo.View('<div id="foo"></div>', { wrap: false });
    view.render($("#app"));
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(view.element.attr('id')) // foo
    </script>

## Methods

### destroy

Removes the **View** element from the DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.


<div class="meta-api-description">
Remove or delete a UI view and its elements from the webpage while freeing up related memory and resources, cleaning up event listeners, detaching handlers, clearing associated data attributes, and recursively destroying nested components to avoid memory leaks, ensure proper cleanup of child or dependent components, and optimize application performance by fully disposing of view instances from the DOM and the event system.
</div>

#### Example

    <div id="app"></div>

    <script>
    var view = new kendo.View("Hi!", { tagName: "span" });
    view.render($("#app"));
    view.destroy();
    </script>

### render

Renders the view contents. Accepts a jQuery selector (or jQuery object) to which the contents will be appended.
Alternatively, the render method can be called without parameters in order to retrieve the View element for manual insertion/further manipulation.


<div class="meta-api-description">
Render functionality to generate, retrieve, or inject the visual content of a component into the DOM, enabling developers to either append the view’s HTML output to a specified element using selectors or jQuery objects, or to obtain the raw DOM node for custom placement, manual insertion, dynamic updates, or further DOM manipulation. This supports use cases such as programmatically rendering UI fragments, integrating views into existing page structures, controlling output placement, or extracting rendered elements for testing, re-rendering, or event binding. Configuring rendering behavior includes setting targets for automatic insertion, invoking rendering without parameters to access elements directly, and managing DOM content lifecycle through flexible render calls.
</div>

#### Example

    <div id="app"></div>

    <script>
    var index = new kendo.View('<span>Hello World!</span>');
    index.render("#app");
    </script>

#### Example

    <div id="app"></div>

    <script>
    var index = new kendo.View('<span>Hello World!</span>');
    $("#app").append(index.render());
    </script>

#### Parameters

##### container `jQuery`

(optional) the element in which the view element will be appended.

#### Returns

`jQuery` the view element.

## Events

### hide

Fires when the View is replaced in a layout placeholder.


<div class="meta-api-description">
Detect and handle when a user interface window, screen, or component is removed, replaced, or hidden within a layout or placeholder, enabling cleaning up resources such as timers, event listeners, or pending asynchronous operations, managing application state updates, coordinating navigation changes, refreshing data, and executing teardown or cleanup logic when a view is no longer visible or active.
</div>

#### Example

    <div id="app"></div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    var foo = new kendo.View("<span>Foo</span>", { hide: function() { console.log("Foo is hidden now"); }});
    var bar = new kendo.View("<span>Bar</span>");

    var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

    layout.render($("#app"));

    layout.showIn("#content", foo);
    layout.showIn("#content", bar);
    </script>

### init

Fires the first time the view renders.


<div class="meta-api-description">
Trigger execution right after a component or view first renders, enabling one-time initialization tasks such as DOM element setup, attaching event listeners, measuring layout dimensions, performing initial animations, or configuring state that depends on the initial render. This event occurs exclusively on the very first render and does not repeat on updates, re-renders, or navigation changes, making it ideal for setup routines that must run only once when the UI element is created and ready. It supports use cases like initializing dynamic content, starting animations after the DOM nodes are available, or setting up environment-specific configurations detected at render time.
</div>

#### Example

    <div id="app"></div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    var view = new kendo.View("Hi!", { init: function() { console.log("View is initiated"); } });
    view.render($("#app"));
    </script>

### show

Fires after the View is rendered (either by calling `render`, or by being rendered from the **Layout** `showIn` method).


<div class="meta-api-description">
Trigger actions or execute code right after a user interface element finishes rendering and becomes visible in the document structure, enabling initialization of dynamic behaviors, event binding, or animation startup immediately upon completion of the rendering process whether done manually or through layout presentation methods; useful for detecting when the element is fully inserted into the DOM and ready for interaction or manipulation.
</div>

#### Example

    <div id="app"></div>

    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
    var view = new kendo.View("Hi!", { show: function() { console.log("View is rendered") } });
    view.render($("#app"));
    </script>

### transitionStart

Fires when the view transition starts. The `type` event data is set to either `"show"` or `"hide"`. For more details on view Transitions check the [layout showIn](/api/javascript/layout#methods-showIn) method.


<div class="meta-api-description">
Detect when a view starts appearing or disappearing by capturing the beginning of show or hide transitions, enabling developers to trigger animations, initiate data loading, or execute pre-render logic precisely as a view begins to become visible or hidden; listen for transition start events with types indicating whether the view is showing or hiding, supporting use cases like synchronizing UI changes, managing state before view visibility changes, handling transition timing, coordinating effects with layout shifts, and controlling the flow of actions tied to view lifecycle changes.
</div>

#### Example

    <div id="app"></div>

    <script>
    var foo = new kendo.View("<span>Foo</span>");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    var bar = new kendo.View("<span>Bar</span>", { transitionStart: function() { console.log(e) }});

    var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

    layout.render($("#app"));

    layout.showIn("#content", foo);
    layout.showIn("#content", bar);
    </script>

### transitionEnd

Fires after the view transition container has its `k-fx-end` class set. The `type` event data is set to either `"show"` or `"hide"`. For more details on view Transitions check the [layout showIn](/api/javascript/layout#methods-showIn) method.


<div class="meta-api-description">
Detect when a view’s show or hide animation completes by capturing the end of its CSS transition, enabling execution of code after the view fully appears or disappears. Monitor transition completion events that differentiate between showing and hiding states, listen for signals when transition classes finish applying, and trigger actions based on whether the view is entering or exiting. Control and respond to post-animation behavior after view transitions, handle timing of UI updates or cleanup tasks synced with the end of fade-ins, slide-outs, or other animated state changes, and integrate precise event handling for view lifecycle animations involving CSS transition end points.
</div>

#### Example

    <div id="app"></div>

    <script>
    var foo = new kendo.View("<span>Foo</span>");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    var bar = new kendo.View("<span>Bar</span>", { transitionEnd: function() { console.log(e) }});

    var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

    layout.render($("#app"));

    layout.showIn("#content", foo);
    layout.showIn("#content", bar);
    </script>

## Fields

### element `jQuery`

The element of the **View**. Gets instantiated after the `render` method is called.


<div class="meta-api-description">
Retrieve or modify the main DOM element associated with a user interface component to read or update attributes, register event listeners, handle user interactions, measure layout and dimensions, interact with the underlying native element after rendering, or manipulate the root node of a view for dynamic content updates, event binding, and layout calculations once the component is fully initialized and rendered.
</div>

#### Example

    <div id="app"></div>

    <script>
    var view = new kendo.View('<span>Hello World!</span>');
    view.render($("#app"));
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(view.element.text()); // Hello World!
    console.log(view.element.prop('tagName')); // SPAN
    </script>

