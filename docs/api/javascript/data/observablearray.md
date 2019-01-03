---
title: ObservableArray
page_title: API Reference for ObservableArray wrap in Kendo MVVM and Kendo DataSource
description: How to create a new ObservableArray, explanations how to use kendo.observable methods, fields and events.
res_type: api
---

# kendo.data.ObservableArray

The `ObservableArray` wraps an existing `Array` object with change-tracking capabilities. It is used by [Kendo UI MVVM](/framework/mvvm/overview) design pattern and the [`kendo.data.DataSource`](/framework/datasource/overview). Inherits from [`kendo.Observable`](/api/javascript/observable).

## Configuration

To create a new `ObservableArray`, use its constructor or the `kendo.observable` method.

#### Example - use the ObservableArray constructor

    <script>
    var array = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
    console.log(array[0].name); // outputs "John Doe"
    console.log(array.length); // outputs "2"
    </script>

#### Example - use the kendo.observable method

    <script>
    var observable = kendo.observable({
        people: [
            { name: "John Doe" },
            { name: "Jane Doe" }
        ]
    });
    console.log(observable.people instanceof kendo.data.ObservableArray); // outputs "true"
    </script>

> The `kendo.data.ObservableArray` wraps its items as [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) instances unless the items are of the primitive type.

#### Example - an array of complex and primitive type

    <script>
    var complex = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
    console.log(complex[0] instanceof kendo.data.ObservableObject); // outputs "true"
    var primitive = new kendo.data.ObservableArray([
        "John Doe", "Jane Doe"
    ]);
    console.log(typeof (primitive[0]) ); // outputs "string"
    </script>

## Fields

### length

An unsigned, 32-bit integer that specifies the number of items in an `ObservableArray`.

#### Example - iterate over an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]); // outputs the current item
    }
    </script>

## Methods

### bind

Attaches an event handler for the specified event.

#### Example - subscribe to an event

    <script>
    var array = new kendo.data.ObservableArray([1, 2]);
    array.bind("change", function(e) {
        console.log("changed");
    });
    array.push(3); // triggers the "change" event and the handler outputs "changed"
    </script>

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

The function which will be invoked when the event is fired.

### join

Joins all items of an `ObservableArray` into a string. An equivalent of [`Array.prototype.join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).

#### Parameters

##### separator `String`

Specifies the string to separate each item of the array. If omitted, the array items are separated with a comma (`,`).

#### Example

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    console.log(array.join("-")); // outputs "1-2-3"
    </script>

### parent

Gets the parent of the array if such a parent exists.

#### Returns

`kendo.data.ObservableObject`&mdash;The parent of the array. Returns `undefined` if the array is not nested and does not have a parent.

#### Example - get the parent

    <script>
    var array = new kendo.data.ObservableArray([1, 2]);
    console.log(array.parent()); // outputs "undefined"
    var observable = kendo.observable({ numbers: [1, 2] });
    var numbers = observable.get("numbers");
    console.log(numbers.parent() === observable); // outputs "true"
    </script>

### pop

Removes the last item from an array and returns that item. An equivalent of [`Array.prototype.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop).

> The `pop` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"remove"`. The `items` field of the event argument is the array that contains the removed item.

#### Returns

`Object`&mdash;The item which was removed.

#### Example - remove the last item from an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    var result = array.pop();
    console.log(array.length); // outputs "0"
    console.log(result.get("name")); // outputs "John Doe"
    </script>

### push

Appends the given items to the array and returns the new length of the array. An equivalent of [`Array.prototype.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push). The new items are wrapped as an `ObservableObject` if they are complex objects.

> The `push` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"add"`. The `items` field of the event argument is the array that contains the appended items.

#### Returns

`Number`&mdash;The new length of the array.

#### Parameters

##### item1, ..., itemN

The item or items that will be appended to the array.

#### Example - append an item to an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    var length = array.push({ name: "Jane Doe" });
    console.log(length); // outputs "2"
    console.log(array[1] instanceof kendo.data.ObservableObject); // outputs "true"
    console.log(array[1].get("name")); // outputs "Jane Doe"
    </script>

#### Example - append more than one item to an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([ 1 ]);
    var length = array.push(2, 3);
    console.log(length); // outputs "3"
    console.log(array[1]); // outputs "2"
    </script>

### slice

Returns a single-level deep copy of a portion of an array. An equivalent of [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). The result of the `slice` method is not an instance of `ObvservableArray`&mdash;it is a regular JavaScript `Array` object.

> The `slice` method does not modify the original `ObservableArray`.

#### Parameters

##### begin `Number`

A zero-based index at which the extraction will start.

##### end `Number`

A zero-based index at which the extraction will end. If `end` is omitted, `slice` extracts to the end of the sequence.

#### Example - slice items from an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    var firstAndSecond = array.slice(0, 2);
    console.log(firstAndSecond); // outputs [1, 2]
    </script>

### splice

Changes an `ObservableArray` by adding new items while removing old items. An equivalent of [`Array.prototype.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).

> The `splice` method raises the [`change`](/api/javascript/data/observablearray/events/change) event once or twice depending on the change. The `action` field of the event argument is set to `"add"` (if items are added) or `"remove` (if items are removed). The `items` field of the event argument is the array that contains the appended items or removed items. In the previous example, the `change` event will be triggered two times&mdash;the first one, because `baseball` is removed and, the second one, because `tennis` and `hockey` are added.

#### Returns

`Array`&mdash;Contains the removed items. The result of the `splice` method is not an instance of `ObvservableArray`.

#### Parameters

##### index `Number`

An index at which the changing of the array will start.

##### howMany `Number`

An integer which indicates the number of the items for removal. If set to `0`, no items will be removed. In this case, you have to specify at least one new item.

##### item1, ..., itemN *(optional)*

The items that will be added to the array. If you do not specify any items, `splice` removes the items from the array.

#### Example - splice array items

    <script>
    var sports = new kendo.data.ObservableArray(["football", "basketball", "volleyball"]);
    var removed = sports.splice(1, 1, "tennis", "hockey");
    console.log(removed); // outputs ["basketball"]
    console.log(sports); // outputs ["football", "tennis", "hockey", "volleyball"]
    </script>

### shift

Removes the first item from an `ObvservableArray` and returns that item. An equivalent of [`Array.prototype.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).

> The `shift` method raises the `change` event. The `action` field of the event argument is set to `"remove"`. The `items` field of the event argument is an array that contains the removed item.

#### Returns

`Object`&mdash;The item which was removed.

#### Example - remove the first item

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    var removed = array.shift();
    console.log(removed); // outputs "1"
    console.log(array.length); // outputs "2"
    </script>

### toJSON

Returns a JavaScript `Array` object which represents the contents of the `ObservableArray`.

#### Example - return the raw array representation

    <script>
    var people = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
    var json = people.toJSON();
    console.log(JSON.stringify(json)); // outputs [{"name":"John Doe"},{"name":"Jane Doe"}]
    </script>

### unshift

Adds one or more items to the beginning of an `ObservableArray` and returns the new length. An equivalent of [`Array.prototype.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift).

> The `unshift` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"add"`. The `items` field of the event argument is an array that contains the new items.

#### Returns

`Number`&mdash;The new length of the array.

#### Parameters

##### item1, ..., itemN

The items that will be added to the beginning of the `ObservableArray`.

#### Example - add items to the beginning of an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([2, 3]);
    var result = array.unshift(0, 1);
    console.log(result); // outputs "4"
    console.log(array); // outputs [0, 1, 2, 3]
    </script>

## Events

### change

Fires when the items of the `ObservableArray` change.

#### Event Data

##### e.action `String`

Specifies the type of change.

The possible values are:

* `"add"`- Items are added to the `ObservableArray`.
* `"itemchange"` - A field of an item changed.
* `"remove"` - Items are removed from the `ObservableArray`.

##### e.index `Number`

The index at which items are removed or added. Set to `undefined` if `e.action` is `"itemchange"`.

##### e.items `Array`

The items which were changed.

##### e.field `String`

The field name of an item that changed. Available only when `e.action` is `"itemchange"`.

#### Example - subscribe to the change event

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    array.bind("change", function(e) {
        console.log(e.action, e.index, e.items);
    });
    array.push(4, 5); // outputs "add", 3, [4, 5]
    array.pop(); // outputs "remove", 4, [5]
    var people = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    people.bind("change", function(e) {
        console.log(e.action, e.field, e.items[0].get("name"));
    });
    people[0].set("name", "Jane Doe"); // outputs "itemchange", "name", "Jane Doe"
    </script>
