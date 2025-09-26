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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[0].name); // outputs "John Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.people instanceof kendo.data.ObservableArray); // outputs "true"
    </script>

> The `kendo.data.ObservableArray` wraps its items as [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) instances unless the items are of the primitive type.

#### Example - an array of complex and primitive type

    <script>
    var complex = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(complex[0] instanceof kendo.data.ObservableObject); // outputs "true"
    var primitive = new kendo.data.ObservableArray([
        "John Doe", "Jane Doe"
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(typeof (primitive[0]) ); // outputs "string"
    </script>

## Fields

### length

An unsigned, 32-bit integer that specifies the number of items in an `ObservableArray`.


<div class="meta-api-description">
Retrieve or check the number of elements contained in a dynamic, observable list or collection, enabling queries for the current count, size, or total items tracked within an array-like structure that supports real-time updates; commonly used to access the quantity of elements for conditional logic, loops, validations, or display purposes by reading a numeric value representing how many entries exist, useful in scenarios requiring monitoring collection length, item counts, or capacity without manual iteration or external counting methods.
</div>

#### Example - iterate over an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    for (var i = 0; i < array.length; i++) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(array[i]); // outputs the current item
    }
    </script>

## Methods

### bind

Attaches an event handler for the specified event.


<div class="meta-api-description">
Configure and attach event listeners or handlers on dynamic data collections to detect changes, updates, modifications, or custom event triggers in real time. Enable subscribing, connecting, or listening to specific events with callback functions that receive event details or arguments, supporting multiple handlers per event. Set up event monitoring after data initialization to track insertions, deletions, edits, or any data mutation and respond programmatically through event binding or listener registration methods.
</div>

#### Example - subscribe to an event

    <script>
    var array = new kendo.data.ObservableArray([1, 2]);
    array.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("changed");
    });
    array.push(3); // triggers the "change" event and the handler outputs "changed"
    </script>

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

The function which will be invoked when the event is fired.

### empty

Empties the array.


<div class="meta-api-description">
Clear all elements from a dynamic or observable list, reset the array length to zero, remove every item from the collection, and ensure that any data bindings or UI components detect the change immediately. Enable resetting or clearing the contents of a reactive or observable array to start fresh before adding new data, repopulating the list, or resetting the data source state. Use this function to trigger updates and change notifications for components relying on the array’s current items, effectively emptying the collection and removing all stored values. This method supports controlling or managing array content changes programmatically, clearing out all entries at once, and preparing observable collections for new data.
</div>

#### Example - working with empty method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);

      arr.empty()
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
    </script>

### every

Executes a callback function for every single item in the array and returns `true` or `false` depending if all the items in the array pass the condition. An equivalent of [`Array.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).


<div class="meta-api-description">
Check if all elements in a reactive or observable list fulfill a specific condition by running a test function on each entry, returning true only when every item passes the test, or false immediately if any item does not meet the criteria; this process quickly evaluates items in sequence, supports validation, filtering, and condition checks on data collections, and mimics standard array methods used to ensure uniform compliance across arrays, lists, or observable data structures by applying a predicate function that receives each element, its position, and the entire collection for versatile, efficient verification scenarios.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Boolean`&mdash;Returns `true` if all items pass the test function condition. Otherwise, returns `false`.

#### Example - working with every method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);

      var result = arr.every((item) => {return item > 20})
      var result2 = arr.every((item) => {return item < 40})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
      console.log(result2)
    </script>

### filter

Executes a callback function for every single item in the array and returns only those items that pass the filter condition. An equivalent of [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).


<div class="meta-api-description">
Filter a dynamic list or data collection by applying a custom condition or predicate function to each element, creating a new array of items that meet specific criteria. Enable searching, filtering, or narrowing down data sets within observable or reactive arrays based on custom logic, callbacks, or test functions. Use for selectively retrieving elements from a live data source, producing filtered views, or updating UI components by controlling which items match given conditions, similar to standard array filtering but applied to observable collections with real-time updates.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Array`&mdash;A new array with items that pass the filter condition.

#### Example - working with filter method

    <script>
      var arr = new kendo.data.ObservableArray([100, 10, 20, 30]);
    
      var result = arr.filter((item) => {return item > 20})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### find

Find the first elements in an array that passes the callback testing function. An equivalent of [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).


<div class="meta-api-description">
Search, retrieve, or identify the initial item within a data collection or array-like structure that meets specific conditions, criteria, or a test function by applying a predicate callback to evaluate each element sequentially; supports queries to find the first matching record, entry, or object based on custom logic or filters, returning the matched element or undefined if none matches, mimicking standard array searching methods, enabling developers to locate targeted data efficiently within collections or data sources using customizable matching functions.
</div>

#### Parameters 

##### callback `Function`

The testing function.

#### Returns

`Object`&mdash;The first item that passes the search condition.

#### Example - working with find method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);
    
      var result = arr.find((item) => {return item > 20})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### forEach

The method executes the callback function for every single item in the array. An equivalent of [`Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).


<div class="meta-api-description">
Execute a function on each element in a collection by iterating through all items sequentially, applying a callback that receives the current item, its index, and the entire array to enable looping, element inspection, updating values, or triggering side effects without producing a returned array. Use this method to perform actions like updating, processing, or handling elements individually in observable or data-bound arrays, configure per-item operations during data iteration, and control flow without transformation, similar to the standard forEach behavior in arrays.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Example - working with forEach method

    <script>
      var array = new kendo.data.ObservableArray([
        { id: 10, name: 'Apple', count: 5},
        { id: 20, name: 'Orange', count: 10},
        { id: 30, name: 'Milk', count: 12},
        { id: 40, name: 'Juice', count: 7},
        { id: 50, name: 'Melon', count: 20}
      ]);     
      array.forEach((item) => { item.count = item.count*3})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(array)
    </script>

### indexOf

Returns the index in the Array at which the item can be found. An equivalent of [`Array.prototype.indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).


<div class="meta-api-description">
Find the zero-based position or index of a specific item within an observable list or array to identify where it appears, enabling you to locate, update, remove, or manipulate elements based on their position. This search function mimics standard array index lookup, returning the numeric index if the item exists or -1 if not, useful for tracking items in reactive collections, data sources, or dynamic lists when you need to reference elements by their order or presence in the structure.
</div>

#### Parameters

##### item `String|Number|Object`

The searched item.

#### Returns

`Number`&mdash;The index of the specified data item. Returns `-1` if the data item is not found.

#### Example - working with indexOf method

    <script>
      var array = new kendo.data.ObservableArray(["Apple", "Orange", "Berries", "Melon", "Grape", "Pear"])
      var result = array.indexOf("Grape");
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(result); // outputs "4"
    </script>

### join

Joins all items of an `ObservableArray` into a string. An equivalent of [`Array.prototype.join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).


<div class="meta-api-description">
Combine or concatenate elements of a dynamic, change-tracking collection into one unified string by configuring or calling a join operation that merges all array items, optionally specifying custom separators or delimiters, enabling serialization, string formatting, or display of observable list contents as a single concatenated output, similar to standard array join functionality but tailored for reactive or observable data structures used in data binding scenarios.
</div>

#### Parameters

##### separator `String`

Specifies the string to separate each item of the array. If omitted, the array items are separated with a comma (`,`).

#### Example

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.join("-")); // outputs "1-2-3"
    </script>

### map

The method executes the callback function for every single item in the array and returns a new array as a result. An equivalent of [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).


<div class="meta-api-description">
Convert or transform elements from an observable collection into a new standard JavaScript array by applying a function to each item, enabling mapping over the data stream or reactive list without modifying the original. This method processes every element with a callback receiving the current item, its index, and the entire array, producing a fresh array of results similar to standard array mapping. Useful for extracting, projecting, or reshaping data from observable arrays, supporting functional transformations, iteration with indexes, and returning mapped values while preserving immutability of the source collection.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Array`&mdash;A new array with the results from the executed callback.

#### Example - working with map method

     <script>
      var arr = new kendo.data.ObservableArray([
        { id: 10, name: 'Apple', count: 5},
        { id: 20, name: 'Orange', count: 10},
        { id: 30, name: 'Milk', count: 12},
        { id: 40, name: 'Juice', count: 7},
        { id: 50, name: 'Melon', count: 20}
      ]);     
      var newArr = arr.map(item => { return item.count*3})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(newArr)
    </script>

### parent

Gets the parent of the array if such a parent exists.


<div class="meta-api-description">
Accessing the parent or container of a nested array within a hierarchical data structure enables navigating and managing collections, determining the array’s owner or parent node, retrieving the enclosing collection for traversal or inspection, controlling relationships between nested arrays and their containers, exploring parent-child links in observable collections, setting or querying the origin of a sub-array within complex data sources, and handling bindings or updates that depend on knowing an array’s containing group or parent collection.
</div>

#### Returns

`kendo.data.ObservableObject`&mdash;The parent of the array. Returns `undefined` if the array is not nested and does not have a parent.

#### Example - get the parent

    <script>
    var array = new kendo.data.ObservableArray([1, 2]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.parent()); // outputs "undefined"
    var observable = kendo.observable({ numbers: [1, 2] });
    var numbers = observable.get("numbers");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(numbers.parent() === observable); // outputs "true"
    </script>

### pop

Removes the last item from an array and returns that item. An equivalent of [`Array.prototype.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop).

> The `pop` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"remove"`. The `items` field of the event argument is the array that contains the removed item.


<div class="meta-api-description">
Remove and retrieve the last element from an observable or reactive array-like collection by popping the final item, similar to the native Array pop method, enabling efficient removal of the tail element while automatically updating bound data sources or UI components. This method triggers change notifications or events indicating removal actions, allowing you to handle updates, synchronize state, or respond to modifications in real-time. Whether you want to delete the last entry, get the last value, or manage dynamic collections reactively, using this approach supports event-driven updates and item tracking when modifying observable lists or arrays.
</div>

#### Returns

`Object`&mdash;The item which was removed.

#### Example - remove the last item from an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    var result = array.pop();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.length); // outputs "0"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(result.get("name")); // outputs "John Doe"
    </script>

### push

Appends the given items to the array and returns the new length of the array. An equivalent of [`Array.prototype.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push). The new items are wrapped as an `ObservableObject` if they are complex objects.

> The `push` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"add"`. The `items` field of the event argument is the array that contains the appended items.


<div class="meta-api-description">
Add one or multiple elements to the end of an observable array, similar to standard array push functions, while automatically wrapping complex objects to make them reactive or observable; receive the new total count of items and trigger change notifications or events indicating added items, allowing for dynamic updates, monitoring, or binding scenarios where detecting item additions, handling observable collections, adjusting data sources, and reacting to changes in array length or content is needed in reactive programming or UI frameworks.
</div>

#### Returns

`Number`&mdash;The new length of the array.

#### Parameters

##### item1, ..., itemN

The item or items that will be appended to the array.

#### Example - append an item to an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    var length = array.push({ name: "Jane Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(length); // outputs "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[1] instanceof kendo.data.ObservableObject); // outputs "true"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[1].get("name")); // outputs "Jane Doe"
    </script>

#### Example - append more than one item to an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([ 1 ]);
    var length = array.push(2, 3);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(length); // outputs "3"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[1]); // outputs "2"
    </script>

### reduce

Executes a callback function for every single item in the array and returns the accumulated result. Iterates the items left to right.


<div class="meta-api-description">
Aggregate an observable collection into a single result by applying a function that combines each element from left to right, processing every item without skipping, with options to set an initial accumulator value. Enable custom aggregation, accumulation, folding, or summarizing of array-like data structures by executing a callback that receives the running total, current element, index, and full array during iteration. Use patterns like reducing, folding, accumulating, summarizing, or calculating totals, sums, averages, or transformations over observable lists with control over initial values and order of processing.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Number`&mdash;The accumulated result.

#### Example - working with reduce method

     <script>
      var arr = new kendo.data.ObservableArray([100, 10, 20, 30]); 
      
      var result = arr.reduce((totalCount, item) => totalCount - item)
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### reduceRight

Executes a callback function for every single item in the array and returns the accumulated result. Iterates the items right to left.


<div class="meta-api-description">
Perform a right-to-left accumulation or reduction over an array-like data source by executing a function that combines each item starting from the last element moving to the first, enabling folding or aggregating values in reverse order with the ability to specify an initial accumulator value; this supports scenarios like reverse iteration, backward data processing, right-to-left folding, or computing summaries by traversing elements from the end to the beginning with a callback receiving the accumulator, current item, index, and full collection.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Number`&mdash;The accumulated result.

#### Example - working with reduceRight method

     <script>
      var arr = new kendo.data.ObservableArray([100, 10, 20, 30]); 
      
      var result = arr.reduceRight((totalCount, item) => totalCount - item)
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### remove

Removes the specified item from an array.


<div class="meta-api-description">
Delete or eliminate a particular element from a dynamic list or collection that is tracked and updated in real-time, enabling removal by directly specifying the item instance to efficiently modify and synchronize the underlying data array or data source. This method supports operations such as purging entries, extracting objects from observable lists, filtering out unwanted elements, updating reactive collections, and managing state changes by referencing and removing targeted items within a monitored array structure. It is ideal for developers seeking to control, clear, or adjust precise items in a live-bound dataset or observable data stream by invoking removal through item identity rather than index or value comparison.
</div>

#### Parameters 

##### item `String|Number|Object`

The item that will be removed.

#### Example - working with remove method

    <script>
      var array = new kendo.data.ObservableArray(["Apple", "Orange", "Berries", "Melon", "Grape", "Pear"])
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(array.length);
      array.remove("Grape");
      console.log(array); 
      console.log(array.length);
    </script>

### slice

Returns a single-level deep copy of a portion of an array. An equivalent of [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). The result of the `slice` method is not an instance of `ObvservableArray`&mdash;it is a regular JavaScript `Array` object.

> The `slice` method does not modify the original `ObservableArray`.


<div class="meta-api-description">
Extract a shallow copy of a segment or portion of a data collection by creating a new array that duplicates selected elements without altering the original array, enabling safe slicing, copying subarrays, or retrieving subsets of data sources similarly to standard JavaScript array slicing methods. This functionality supports use cases like cloning parts of an observable list, obtaining fixed snapshots, performing non-destructive partial reads, and converting observable structures into plain arrays for manipulation or iteration while preserving immutability and ensuring the original observable data remains unchanged.
</div>

#### Parameters

##### begin `Number`

A zero-based index at which the extraction will start.

##### end `Number`

A zero-based index at which the extraction will end. If `end` is omitted, `slice` extracts to the end of the sequence.

#### Example - slice items from an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    var firstAndSecond = array.slice(0, 2);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(firstAndSecond); // outputs [1, 2]
    </script>

### some

Executes a callback function for every single item in the array and returns `true` or `false` depending if any of the items in the array passes the condition. An equivalent of [`Array.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).


<div class="meta-api-description">
Check if any element in a dynamic or reactive array satisfies a specific condition by running a predicate function that tests each item until one returns true, enabling quick existence checks, conditional filtering, or validation scenarios that short-circuit as soon as a matching element is found, similar to JavaScript’s native array methods for evaluating whether at least one entry meets given criteria.
</div>

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Boolean`&mdash;Returns `true` if any of the items passes the test function condition. Otherwise, returns `false`.

#### Example - working with some method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);

      var result = arr.every((item) => {return item > 20})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### splice

Changes an `ObservableArray` by adding new items while removing old items. An equivalent of [`Array.prototype.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).

> The `splice` method raises the [`change`](/api/javascript/data/observablearray/events/change) event once or twice depending on the change. The `action` field of the event argument is set to `"add"` (if items are added) or `"remove` (if items are removed). The `items` field of the event argument is the array that contains the appended items or removed items. In the previous example, the `change` event will be triggered two times&mdash;the first one, because `baseball` is removed and, the second one, because `tennis` and `hockey` are added.


<div class="meta-api-description">
Insert, delete, or replace elements at a specified index within a collection while managing dynamic updates to the data set, mimicking array splice behavior with real-time change notifications. Control collection modifications by adding or removing multiple entries simultaneously, trigger events that signal additions and removals with detailed information about affected items, and perform fine-grained updates for responsive data sources. Enable efficient patching, editing, or reshaping of observable lists, supporting operations like batch insertions, deletions, or replacements with event-driven reactions that track and expose the exact changes applied to the array. Use cases include modifying elements in reactive data structures, updating UI-bound lists, or handling mutable collections with monitored change feeds.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(removed); // outputs ["basketball"]
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sports); // outputs ["football", "tennis", "hockey", "volleyball"]
    </script>

### shift

Removes the first item from an `ObvservableArray` and returns that item. An equivalent of [`Array.prototype.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).

> The `shift` method raises the `change` event. The `action` field of the event argument is set to `"remove"`. The `items` field of the event argument is an array that contains the removed item.


<div class="meta-api-description">
Remove and retrieve the first element from a dynamic list or observable collection, enabling extraction and manipulation of the initial item while triggering update or change notifications, similar to standard array shift operations; use to shift elements forward, control list contents by removing the head item, react to removals with event-driven programming, and handle mutable sequences where detecting and responding to removals of the first entry is needed.
</div>

#### Returns

`Object`&mdash;The item which was removed.

#### Example - remove the first item

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    var removed = array.shift();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(removed); // outputs "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.length); // outputs "2"
    </script>

### toJSON

Returns a JavaScript `Array` object which represents the contents of the `ObservableArray`.


<div class="meta-api-description">
Convert an observable collection into a plain JavaScript array for serialization, native array manipulation, or data transmission by extracting the raw array contents detached from observability and change tracking. Enable exporting observable data to standard arrays compatible with JSON serialization, native array methods like map or filter, or server communication, ensuring the output is a simple, unwrapped Array object that can be processed, stored, or transferred without observable overhead. This process supports transforming reactive or observable collections into standard, non-reactive arrays suitable for JSON.stringify, API requests, or any operation requiring a conventional array structure.
</div>

#### Example - return the raw array representation

    <script>
    var people = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
    var json = people.toJSON();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(JSON.stringify(json)); // outputs [{"name":"John Doe"},{"name":"Jane Doe"}]
    </script>

### unshift

Adds one or more items to the beginning of an `ObservableArray` and returns the new length. An equivalent of [`Array.prototype.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift).

> The `unshift` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"add"`. The `items` field of the event argument is an array that contains the new items.


<div class="meta-api-description">
Add one or multiple elements to the front of a dynamic array or observable list, inserting new items at the start index zero and shifting existing entries forward, while returning the updated length; this operation triggers change notifications or events indicating an add action with details about inserted elements, enabling reactive updates, synchronization, or data binding scenarios where prepending data is required, mimicking standard array unshift behavior for easy integration and event-driven patterns.
</div>

#### Returns

`Number`&mdash;The new length of the array.

#### Parameters

##### item1, ..., itemN

The items that will be added to the beginning of the `ObservableArray`.

#### Example - add items to the beginning of an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([2, 3]);
    var result = array.unshift(0, 1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(result); // outputs "4"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array); // outputs [0, 1, 2, 3]
    </script>

## Events

### change

Fires when the items of the `ObservableArray` change.


<div class="meta-api-description">
Detect updates to collections or arrays when items are added, removed, replaced, reordered, or mutated by listening for change notifications or events on data sources, enabling synchronization of UI elements, state management, real-time updates, or triggering callbacks on collection modifications. Respond to any additions, deletions, reorderings, or changes within observable lists or data arrays to keep interfaces in sync, maintain data integrity, persist changes, or perform side effects whenever the underlying data structure changes dynamically. Monitor mutable collections for change events to react to mutations, detect updates, handle item replacements, and manage state consistently across applications.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.action, e.index, e.items);
    });
    array.push(4, 5); // outputs "add", 3, [4, 5]
    array.pop(); // outputs "remove", 4, [5]
    var people = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    people.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.action, e.field, e.items[0].get("name"));
    });
    people[0].set("name", "Jane Doe"); // outputs "itemchange", "name", "Jane Doe"
    </script>
