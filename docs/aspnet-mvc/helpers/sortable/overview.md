---
title: Overview
---

# Sortable

The Sortable HtmlHelper extension is a server-side wrapper for the [Kendo UI Sortable](/api/web/sortable) widget.

## Getting Started

Unlike most of the HtmlHelpers the Sortable one does not render HTML mark-up. **The Sortable HtmlHelper should be initialized for already existing DOM element.**

### Configure the Kendo Sortable

Here is how to configure the Kendo Sortable:

 1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.
 2.  Create a new action method:

        public ActionResult Index()
        {
            return View();
        }

 3.  Initialize the Sortable:
     - WebForms

            <ul id="sortable-basic">
                <li class="sortable">Papercut <span>3:04</span></li>
                <li class="sortable">One Step Closer <span>2:35</span></li>
                <li class="sortable">With You <span>3:23</span></li>
            </ul>
            <%:Html.Kendo().Sortable()
                .For("#sortable-basic") //The for option of the Sortable is mandatory.
                                        //It is a jQuery selector which specifies 
                                        //the already existing element for which the Sortable will be initialized.
                .HintHandler("hint") //The JavaScript function which 
                                     //constructs the Sortable's hint element
                .PlaceholderHandler("placeholder") //The JavaScript function which
                                                   //constructs the Sortable's placeholder element
            %>
            <script>
                //define the hint handler
                function hint(element) {
                    return element.clone().addClass("hint");
                }
                //define the placeholder handler
                function placeholder(element) {
                    return element.clone().addClass("placeholder").text("drop here");
                }
            </script>
     - Razor

            <ul id="sortable-basic">
                <li class="sortable">Papercut <span>3:04</span></li>
                <li class="sortable">One Step Closer <span>2:35</span></li>
                <li class="sortable">With You <span>3:23</span></li>
            </ul>
            @(Html.Kendo().Sortable()
                .For("#sortable-basic") //The for option of the Sortable is mandatory.
                                        //It is a jQuery selector which specifies 
                                        //the already existing element for which the Sortable will be initialized.
                .HintHandler("hint") //The JavaScript function which 
                                     //constructs the Sortable's hint element
                .PlaceholderHandler("placeholder") //The JavaScript function which
                                                   //constructs the Sortable's placeholder element
            )
            <script>
                //define the hint handler
                function hint(element) {
                    return element.clone().addClass("hint");
                }
                //define the placeholder handler
                function placeholder(element) {
                    return element.clone().addClass("placeholder").text("drop here");
                }
            </script>

## Accessing an Existing Sortable

You can reference an existing Sortable instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/sortable#methods) to control its behavior.

### Accessing an existing Sortable instance

    //Put this after your Kendo Sortable for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the For() of the tooltip is used to get its client-side instance
        var sortable = $("#container").data("kendoSortable");
    });
    </script>


## Handling Kendo UI Sortable events

You can subscribe to all [events](/api/web/sortable#events) exposed by Kendo UI Sortable:

### WebForms - subscribe by handler name

    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    <%:Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start("onStart")
            .Change("onChange")
        )
    %>
    <script>
        function onStart(e) {
            var id = e.sender.element.attr("id");
            kendoConsole.log(id + " start: " + e.item.text());
        }

        function onChange(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            kendoConsole.log(id + " change: " + text + " newIndex: " + newIndex + " oldIndex: " + oldIndex + " action: " + e.action);
        }
    </script>

### Razor - subscribe by handler name

    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start("onStart")
            .Change("onChange")
        )
    )
    <script>
        function onStart(e) {
            var id = e.sender.element.attr("id");
            kendoConsole.log(id + " start: " + e.item.text());
        }

        function onChange(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            kendoConsole.log(id + " change: " + text + " newIndex: " + newIndex + " oldIndex: " + oldIndex + " action: " + e.action);
        }
    </script>

### Razor - subscribe by template delegate

    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start(@<text>
                function() {
                    //Handle the show event inline
                }
            </text>)
            .Change(@<text>
                function() {
                    //Handle the show event inline
                }
            </text>)
        )
    )

## Disabling the hint

The Sortable widget can operate without hint. To disable the hint you should set it to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .HintHandler("noHint")
    )
    
    <script>
        var noHint = $.noop;
    </script>

