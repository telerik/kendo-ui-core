---
title: Web Components
description: How to use Kendo UI widgets as web components
---
{% raw %}

# Kendo UI custom elements
Kendo UI provides a set of [custom elements](http://w3c.github.io/webcomponents/spec/custom/) allowing the initialization and use of our widgets the Web Components way.

## Widget initialization
Initializing Kendo UI widgets is as simple as adding the desired custom element to the DOM. Attributes and child nodes can be used to provide values for the initialization options. Options of type Object are specified using JSON strings.

>Important: Custom element names follow the "kendo-widgetname" convention or "kendo-mobile-widgetname" for mobile widgets. 

```html
<kendo-datepicker value="09/16/2015"></kendo-datepicker>

<kendo-numerictextbox spinners="false" value="42"></kendo-numerictextbox>

<kendo-dropdownlist value="Orange">
    <option>Black</option>
    <option>Orange</option>
    <option>Grey</option>
</kendo-dropdownlist>

<kendo-rangeslider min="0" max="100" tooltip="{enabled: false}">
    <input/>
    <input/>
</kendo-rangeslider>
```

Creating widgets on the fly is also supported. Widgets are initialized once the custom element is inserted into a document with a browsing context.
```html
<script>
    var date = document.createElement("kendo-datepicker");
    document.body.appendChild(date);
    //DatePicker is now live
    date.value(new Date());
</script>
```

## Event handling
Event handlers can be set either using the element's attributes or by attaching them after the widget's initialization using the  [bind method](api/javascript/ui/widget#methods-bind) .  Attributes should follow the "on-eventname" convention and point to a handler living in the global scope.
#### Subscribe during initialization
```html
<kendo-numerictextbox value="42" on-change="onChange"></kendo-numerictextbox>
<script>
    function onChange(){
        alert(this.value());
    }
</script>
```
#### Subscribe after initialization
```html
<kendo-numerictextbox value="42"></kendo-numerictextbox>
<script>
    var numeric = document.querySelector("kendo-numerictextbox");
    numeric.bind("change", function() {
        alert(this.value());
    });
</script>
```

## Setting a DataSource 
DataSource can be specified as any other option through the element's attributes or using the setDataSource method after the widget has been initialized.
```html
<kendo-dropdownlist dataSource="['Black', 'Orange', 'Grey']"></kendo-dropdownlist>
<script>
    var dataSource = new kendo.data.DataSource({
        data:['Red', 'Green', 'Blue']
    });
    var color = document.querySelector("kendo-dropdownlist");
    color.setDataSource(dataSource);
</script>
```

## Browser support
Web Components work using certain features that older browsers do not support. We recommend using the [webcomponents.js](http://webcomponents.org/polyfills/) polyfills library where wider Web Components support is required.
{% endraw %}
