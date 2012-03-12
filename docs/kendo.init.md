# Declarative widget initialization based on data attributes

In addition to the jQuery plugin initialization, each kendo widget can be
initialized and configured by setting a `role` data attribute
on the target element and calling `kendo.init` on its element or any of its containers.

<div class="code-sample">
    <h4 class="code-title">Initialize a kendo DropDownList using jQuery plugin syntax</h4>
    <pre class="code">
&lt;select id=&quot;foo&quot;&gt;&lt;/select&gt;
&lt;script&gt;
    $(&quot;#foo&quot;).kendoDropDownList();
&lt;/script&gt;
    </pre>
</div>

<div class="code-sample">
    <h4 class="code-title">Initialize a kendo DropDownList using a role attribute</h4>
    <pre class="code">
&lt;div id=&quot;container&quot;&gt;
    &lt;select data-role=&quot;dropdownlist&quot;&gt;&lt;/select&gt;
&lt;/div&gt;

&lt;script&gt;
    kendo.init($(&quot;#contianer&quot;));
&lt;/script&gt;
    </pre>

</div>

The role attribute value is the name of the widget, lower case.

## Configuration

Each widget configuration option can be specified as a data attribute to the respective element.
Camel-cased options are translated to dash separated attributes. Options, which start
with `data` do not require an additional "data" in the attribute name. For instance,
dataTextField option of the autocomplete widget can be specified with
`data-text-field="foo"` attribute.

<div class="code-sample">
    <h4 class="code-title">Configure kendo DropDownList with data attributes</h4>
    <pre class="code">
&lt;select data-role=&quot;dropdownlist&quot; data-delay=&quot;1000&quot;&gt;
&lt;/select&gt;
    </pre>
</div>

## Events / DataSource

A widget event can be bound using data attributes too. The value of the data attribute will be resolved to a
function, available in the global scope.

<div class="code-sample">
    <h4 class="code-title">Bind to dropDownList change event</h4>
    <pre class="code">
&lt;select data-role=&quot;dropdownlist&quot; data-change=&quot;foo&quot;&gt;
&lt;/select&gt;
&lt;script&gt;
    function foo(e) {
        // ...
    }
&lt;/script&gt;
    </pre>
</div>

Event handlers also support member functions, using javascript syntax. An event handler can be specified using
`foo.bar`, resolving to the member method `bar` of the object `foo`.

<div class="code-sample">
    <h4 class="code-title">Bind to dropDownList change event to a member function</h4>
    <pre class="code">
&lt;select data-role=&quot;dropdownlist&quot; data-change=&quot;foo.bar&quot;&gt;
&lt;/select&gt;
&lt;script&gt;
    var foo = {
        bar: function(e) {
            // ...
        }
    }
&lt;/script&gt;
    </pre>
</div>

The <b>declarative DataSource</b> binding works in the same way, expecting a DataSource object or an array.

<div class="code-sample">
    <h4 class="code-title">Specify DropDownList DataSource</h4>
    <pre class="code">
&lt;select data-role=&quot;dropdownlist&quot; data-source=&quot;foo&quot;&gt;
&lt;/select&gt;
&lt;script&gt;
    var foo = ["foo", "bar", "baz"];
&lt;/script&gt;
    </pre>
</div>

## Templates

For widgets that have template configuration options, the data attribute value will be resolved to an id of a script
element, with the contents of the template.

<div class="code-sample">
    <h4 class="code-title">Specify DropDownList Template</h4>
    <pre class="code">
&lt;select data-role=&quot;dropdownlist&quot; data-template=&quot;foo&quot;&gt;&lt;/select&gt;
&lt;script id=&quot;foo&quot; type=&quot;script/x-kendo-template&quot;&gt;
&lt;span&gt;#:data.Name&lt;/span&gt;
&lt;/script&gt;
    </pre>
</div>
