---
title: TaskBoard
page_title: Configuration, methods and events of Kendo UI TaskBoard
description: Configuration options, methods and events for the Kendo UI TaskBoard widget.
res_type: api
component: taskboard
---

# kendo.ui.TaskBoard

Represents the Kendo UI TaskBoard. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

Controls whether to bind the TaskBoard to the data source on initialization.


<div class="meta-api-description">
How can I prevent Kendo UI TaskBoard from automatically binding data on startup? Control whether the initial loading and binding of data to a task board happens automatically on startup or requires manual triggering, enabling scenarios where you want to defer fetching, prevent immediate rendering, programmatically set or configure the data source before display, or optimize initialization by disabling automatic data retrieval and binding during component creation. This setting helps manage the timing of data population, supports dynamic data setup workflows, and allows toggling between immediate or delayed loading behaviors in task management interfaces.
</div>

#### Example

    <button id="btn">Load</button>
    <div id="taskBoard"></div>

    <script>
        var taskboard = $("#taskBoard").kendoTaskBoard({
            autoBind: false,
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        $("#btn").kendoButton({
            click: function () {
            taskboard.load();
            }
        });
    </script>


### cardMenu `Array | Object`

Defines the list of buttons rendered in the card.


<div class="meta-api-description">
How to customize card buttons in TaskBoard with specific menu items? Customize the buttons displayed on task cards by defining a list or array of menu items to control which actions, icons, and labels appear on each card’s interface, enabling you to set, configure, or modify card controls such as button visibility, interactive options, and menu content dynamically at initialization or runtime for enhanced user interaction and task management.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ],
        cardMenu: [ "editCard" ]
    });
    </script>

### cardMenu.name `String`

The name of the button.


<div class="meta-api-description">
How to customize the label of an action button in a TaskBoard card menu? Control or customize the text label, title, or identifier displayed on action buttons within a task card menu for managing, naming, or localizing menu options shown on cards, including setting button captions, labels, or names for accessibility, internationalization, template bindings, or user interface customization to reflect menu commands, action titles, or task-related functions.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        }
    });

    </script>

### cardMenu.text `String`

The text of the button.


<div class="meta-api-description">
How do I change the text on the card menu button in a TaskBoard? Customize or set the visible label, title, or text displayed on the card menu button within a task management board interface, enabling localization, personalization, or renaming of the button that triggers card-specific options or actions. Control the menu button’s caption, adjust its wording, update button text for clarity or branding, and configure how the menu selector on each card is labeled in task boards, kanban views, or project boards. This setting helps developers and users toggle, rename, or translate the card options menu button label to meet UI design, usability, or language requirements.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        }
    });

    </script>

### cardMenu.icon `String`

The icon of the button.


<div class="meta-api-description">
How do I change the icon on the card menu button in Kendo UI TaskBoard? Customize or configure the symbol, graphic, or icon that appears on the button used to open a task card’s action menu within the TaskBoard interface. Control, set, or change the visual representation, pictogram, or graphical element displayed on the card menu button, enabling selection or adjustment of which icon, image, or button symbol is shown for triggering card options or actions. Adjust the card menu button icon during setup, initialization, or configuration to personalize, style, or define the menu’s visual cue for accessing task details, commands, or card-specific controls.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        }
    });

    </script>

### cardMenu.spriteCssClass `String`

The class name of the icon element.


<div class="meta-api-description">
How to customize icons shown on card menus in TaskBoard? Customize icons shown on card menus by specifying CSS classes or sprite image classes to control visual appearance, including enabling font icons, setting icon styles, changing sprite usage for menu icons, configuring icon class names dynamically, applying different icon themes, adjusting icon visual representation on task cards, and controlling which icon set or font-based icon displays within task board menus for tailored UI customization and branding.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue", spriteCssClass: "custom-icon-class" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        }
    });

    </script>

### cardMenu.command `String`

The command of the button.


<div class="meta-api-description">
How to customize the action triggered by the card menu button in a Kendo UI TaskBoard? Set or customize the action executed when interacting with the card menu button in the TaskBoard interface, allowing developers to assign specific commands, handlers, or functions that run upon click or activation of the menu option. Enable, configure, or bind custom behaviors, triggers, or callbacks linked to the card menu’s button, controlling what operation or script is invoked dynamically or at initialization, suitable for customizing task actions, workflows, or command execution within the board environment.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        }
    });

    </script>

### cardMenu.options `String`

The command options of the button.


<div class="meta-api-description">
How to customize the options in TaskBoard card menu? Control and customize the list of commands or actions available on a card menu button by configuring which options appear, enabling adding, removing, or modifying menu items such as text labels, icons, click events, or predefined functions within task or project boards. This includes setting up custom menus for cards, tailoring interactive commands, managing context menus, and adjusting user interface options related to actionable buttons in task management systems. Users can define behavior and appearance of menu entries to optimize workflows, specify command handlers, and personalize task card interactions.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        }
    });

    </script>

### columns `Object|Array|kendo.data.DataSource`

Sets the [DataSource](/api/javascript/data/datasource) for the Columns of the TaskBoard. Can be bound to a remote service or local data.


<div class="meta-api-description">
How do I configure dynamic columns in Kendo UI TaskBoard? Configure and control the source of task board columns by connecting columns to local arrays, remote data services, or predefined data sources, enabling dynamic or static column data binding, managing live updates, synchronizing column loading from APIs or in-memory collections, and setting up flexible column definitions for task management interfaces using data adapters, arrays, or external endpoints.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ]
    });
    </script>

#### Example - remote binding

    <div id="taskBoard"></div>

    <script>
    var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

    $("#taskBoard").kendoTaskBoard({
      columnSettings: {
        dataTextField: "Text",
        dataStatusField: "Status",
        dataOrderField: "Order"
      },
      columns: {
        transport: {
          read: {
            url: crudServiceBaseUrl + "/taskboard/columns"
          },
          create: {
            url: crudServiceBaseUrl + "/taskboard/columns_create",
            method: "POST"
          },
          update: {
            url: crudServiceBaseUrl + "/taskboard/columns_update",
            method: "POST"
          },
          destroy: {
            url: crudServiceBaseUrl + "/taskboard/columns_destroy",
            method: "POST"
          }
        },
        schema: {
          model: {
            id: "ID",
            fields: {
              "ID": { type: "number" },
              "Text": { type: "string" },
              "Status": { type: "string", defaultValue: "todo" },
              "Order": { type: "number" }
            }
          }
        }
      },
      dataSource: [
        { id: 1, title: "Campaigns", order: 1, description: "Create a new landing page for campaign", status: "todo", color: "orange" },
        { id: 2, title: "Newsletters", order: 2, description: "Send newsletter", status: "inProgress", color: "orange" },
        { id: 3, title: "Ads Analytics", order: 3, description: "Review ads performance", status: "done", color: "orange" }
      ]
    });
    </script>

### columnSettings `Object`

Defines the settings for the columns.


<div class="meta-api-description">
How can I customize the appearance of columns in a Kendo UI TaskBoard? Customize and control the appearance and behavior of columns in task management boards by setting column titles, ordering, visibility, layout styles, and attaching custom metadata. Enable dynamic column configuration including rearranging column sequence, toggling column display on or off, adjusting layout preferences, and defining unique column properties to fit project or workflow needs. Set, modify, and tailor individual column settings during initialization or runtime to enhance board usability and adapt to various task tracking scenarios, supporting flexible task categorization and presentation.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          width: 200
        }
      });
    </script>

### columnSettings.buttons `Array`

Defines the list of buttons rendered in the column.


<div class="meta-api-description">
How do I customize the action buttons in Kendo UI TaskBoard column settings? Control and customize the action buttons displayed in a task board column by setting up which buttons appear, including adding, removing, or modifying button actions, icons, labels, or templates for column-specific controls; configure button visibility, behavior, and appearance to tailor the column’s interactive elements for task management workflows, enabling flexible setup of column toolbar actions, user interface controls, and button customization options.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: ["addCard"]
        }
      });
    </script>

### columnSettings.buttons.name `String`

The name of the button.


<div class="meta-api-description">
How do I set the button names for my task board column buttons in Kendo UI? Set or customize the label, identifier, or display text of action buttons within a task board column, enabling developers to define button names for configuration, template rendering, event handling, or interaction tracking; this string property supports naming buttons for customization, control, referencing in code, dynamic UI updates, button labeling, and integration with workflows or scripts that respond to specific column actions.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        }
      });
    </script>

### columnSettings.buttons.text `String`

The text of the button.


<div class="meta-api-description">
How do I customize the button text in Kendo UI TaskBoard column settings? Set or customize the label, caption, or text displayed on action buttons in task board columns, enabling control over button names, captions, or titles visible on column headers or cards; useful for localization, renaming, customizing interface elements, adapting button text for different languages, or modifying button descriptions in task management boards.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        }
      });
    </script>

### columnSettings.buttons.icon `String`

The icon of the button.


<div class="meta-api-description">
How to customize icons on task board column buttons in Kendo UI for jQuery? Configure or customize the icon displayed on column buttons within a task board interface by specifying icon names, CSS classes, or HTML markup to visually represent button actions, statuses, or functionalities; control and set icon appearance for task board columns to enhance UI clarity, enable intuitive user interactions, adjust visual indicators for column operations, and tailor iconography through various supported formats including icon fonts, custom styles, or embedded HTML elements.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        }
      });
    </script>

### columnSettings.buttons.spriteCssClass `String`

The class name of the icon element.


<div class="meta-api-description">
How to customize the appearance of action buttons in Kendo UI TaskBoard column settings using CSS class names? Customize the icon appearance of action buttons within task board columns by applying specific CSS class names to control or override the default sprite graphics, enabling styling, theming, icon replacement, or visual adjustments of button icons in column settings. Adjust the icon classes to configure different button visuals, apply custom sprites, change icon styles, or set unique image classes for better UI customization and branding within task board column actions. Modify or enable specific CSS classes targeting button icons inside columns to update their look, sprite image, or icon design for tailored user interface elements and interactive controls in task management views.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue", spriteCssClass: "custom-class" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        }
      });
    </script>

### columnSettings.buttons.command `String`

The command of the button.


<div class="meta-api-description">
How do I customize the action button in a task board column with Kendo UI? Set or customize the behavior triggered by clicking the action button in a task board column, including configuring default or user-defined commands, assigning event handlers, controlling column actions, enabling task management operations, and integrating custom button functionality to execute specific workflows or commands within project boards.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        }
      });
    </script>

### columnSettings.buttons.options `String`

The command options of the button.


<div class="meta-api-description">
How to customize button options in TaskBoard column settings? Define and customize command parameters for buttons within a column, including setting action triggers, click event handlers, display text, icons, attributes, and additional command details to control button behavior and appearance in task management interfaces; configure button properties, event bindings, command names, and payload data to tailor interactive elements during initialization or dynamically, enabling precise control over button functionality, style, and responsive behavior in a task board environment.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        }
      });
    </script>

### columnSettings.dataStatusField `String` *(default: "status")*

The field of the data item that provides the status of the column. Mapped with the status of the cards.


<div class="meta-api-description">
How do I configure Kendo UI TaskBoard to display cards based on their current status? Configure the system to link and display cards based on their current state by specifying the exact data field that represents the status or progress of each item; this setup enables mapping status values from underlying data to visual columns or categories reflecting task completion, workflow stages, or custom status indicators, allowing filtering, grouping, and visual organization of items by their active condition, state field, or progress marker within task boards, kanban workflows, or any status-driven column layout for dynamic representation of work item statuses.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { Text: "Doing", Status: "doing", Order: 1 },
          { Text: "Backlog", Status: "backlog", Order: 0},
          { Text: "Done", Status: "done", Order: 2 }
        ],
        columnSettings: {
          dataStatusField: "Status",
          dataTextField: "Text",
          dataOrderField: "Order"
        }
      });
    </script>

### columnSettings.dataTextField `String` *(default: "text")*

The text field of the column.


<div class="meta-api-description">
How to set the header text for each column in a Kendo UI TaskBoard? Configure or set the field name that defines the visible label or header text for each column in a board or task management interface, enabling customization of column titles by specifying which data property from the column dataset should be displayed. Control the source of column header text dynamically by linking to a particular field in column objects, allowing you to customize, adjust, or bind the displayed text in each column header based on underlying data fields during setup or initialization of the task board layout.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { Text: "Doing", Status: "doing", Order: 1 },
          { Text: "Backlog", Status: "backlog", Order: 0},
          { Text: "Done", Status: "done", Order: 2 }
        ],
        columnSettings: {
          dataStatusField: "Status",
          dataTextField: "Text",
          dataOrderField: "Order"
        }
      });
    </script>

### columnSettings.dataOrderField `String`

The field used to order columns (number based). Automatically adds sorting to the columns DataSource instance.

If not set, columns will be rendered in the order they are fetched. And ordering will not be applied to the DataSource and respectively, not synced with the remote data source.


<div class="meta-api-description">
How do I configure column sorting order in Kendo UI TaskBoard? Configure column sorting order by defining the numeric field used to sequence TaskBoard columns, enabling control over the display arrangement based on number values. Enable or disable automatic sorting of columns by setting a specific numeric data field, allowing columns to be ordered, sorted, or synced with remote data sources according to numeric values, or maintain the default order as retrieved without custom sorting. Manage column order preferences, set ordering fields, control numeric-based sequencing, and synchronize column positions with backend or local data sorting configurations.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { Text: "Doing", Status: "doing", Order: 1 },
          { Text: "Backlog", Status: "backlog", Order: 0},
          { Text: "Done", Status: "done", Order: 2 }
        ],
        columnSettings: {
          dataStatusField: "Status",
          dataTextField: "Text",
          dataOrderField: "Order"
        }
      });
    </script>

### columnSettings.width `String|Number`

Configures the width of the columns


<div class="meta-api-description">
How do I set the width of columns in a Kendo UI TaskBoard? Configure and control the width of task board columns by setting or adjusting column sizing to customize layout, manage column alignment, and optimize board density and spacing. Enable precise column width settings during initialization to control how wide each column renders, allowing tailored task board views, flexible design, and improved visual organization. Set fixed or dynamic widths to influence board appearance and usability, accommodating various screen sizes and user preferences for column sizing and layout management.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          width: 200
        }
      });
    </script>

### columnSettings.template `String|Function`

Controls the rendering of the column header. In the template context the `buttons` field provides the HTML for the buttons of the column.


<div class="meta-api-description">
How do I customize the appearance of column headers in a Kendo UI TaskBoard? Control and customize the appearance and content of column headers by defining templates that render titles, icons, header actions, or button areas in flexible layouts. Configure custom header rendering with templates that enable injecting HTML or components for column titles and interactive elements, allowing tailored button arrangements, iconography, and header content design with full control over markup structure and visual presentation. This functionality supports overriding default headers with personalized headers that can incorporate dynamic content, custom buttons, and action zones for enhanced user interaction and distinct column branding in task board interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          template: '<div class="k-taskboard-column-header-actions" style="background-color: lightgray">#=buttons#</div>' +
                    '<span class="k-spacer"></span>' +
                    '<div class="k-taskboard-column-header-text k-text-ellipsis">#:text#(#:status#)</div>'
        }
      });
    </script>

### dataOrderField `String`

The field used to order cards (number based). If not set, cards will be rendered in the order they are fetched. And ordering will not be applied to the DataSource and respectively, not synced with the remote data source.


<div class="meta-api-description">
How do I configure task board to maintain custom task ordering across data updates? Configure card sorting by specifying a numeric field that determines each card’s position to maintain and persist custom task ordering across data updates; control the sequence in which cards appear, enable consistent order storage and synchronization with backend data, set or change the ordering field to manage task priorities or workflow stages, and ensure the visual order matches stored values independent of fetch order.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataCategoryField `String` *(default: "category")*

The category field of the card.


<div class="meta-api-description">
How to configure the data attribute for categorizing cards in a TaskBoard? Set or configure the name of the data attribute that identifies the category or group each card belongs to within a task or project board, enabling grouping, filtering, sorting, or displaying cards by their category labels; control which data field represents the classification, tag, or category for task items to organize and manage cards visually by category, status, or type in dashboards, kanban boards, or card collections.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataDescriptionField `String` *(default: "description")*

The description field of the card.


<div class="meta-api-description">
How do I configure the task card description field in a Kendo UI TaskBoard widget? Specify or configure the field name from your data source that holds the descriptive text displayed on each task card or board item, enabling binding of detailed descriptions, notes, summaries, or explanatory content to task cards for visual display, labeling, or contextual information, supporting customization and dynamic retrieval of descriptive content from data records to appear within task management or project boards.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

Sets the [DataSource](/api/javascript/data/datasource) for the Cards of the TaskBoard. Can be bound to a remote service or local data.


<div class="meta-api-description">
How do I connect a Kendo UI TaskBoard to a remote data source? Connect task board cards to various data sources such as local arrays, remote APIs, or data service instances for dynamic loading, filtering, sorting, and real-time data synchronization. Enable integration with different types of data collections to control and update the displayed cards, supporting scenarios like fetching tasks from a server, binding to client-side datasets, or syncing with external data stores. Configure the card data connection to facilitate data updates, refreshes, and seamless interaction with underlying sources in task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

#### Example - remote binding

    <div id="taskBoard"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

      $("#taskBoard").kendoTaskBoard({
        dataDescriptionField: "Description",
        dataTitleField: "Title",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: {
            transport: {
                read: {
                    url: crudServiceBaseUrl + "/taskboard"
                },
                create: {
                    url: crudServiceBaseUrl + "/taskboard/create",
                    method: "POST"
                },
                update: {
                    url: crudServiceBaseUrl + "/taskboard/update",
                    method: "POST"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/taskboard/destroy",
                    method: "POST"
                }
            },
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        "ID": { type: "number" },
                        "Category": { type: "string" },
                        "Description": { type: "string" },
                        "Title": { type: "string" },
                        "Status": { type: "string" },
                        "Order": { type: "number" }
                    }
                }
            }
        },
        columns: [
          { text: "Pending", status: "todo" },
          { text: "Under Review", status: "inProgress" },
          { text: "Scheduled", status: "done" }
        ]
      });
    </script>

### dataStatusField `String` *(default: "status")*

The field of the data item that provides the status of the card. Mapped with the status of the columns.


<div class="meta-api-description">
How do I configure Kendo UI TaskBoard to show task status in a column? Configure which field or property from your data source defines the status or state of each task or card on the board, enabling mapping and binding of task statuses to specific columns or lanes. Set or specify the key, attribute, or data item field that represents the workflow state, progress, or category to control how cards are grouped, sorted, or displayed by status. Adjusting this status field helps in filtering, organizing, and visualizing tasks based on their current phase, priority, or custom status values in the workflow or task management interface.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataTitleField `String` *(default: "title")*

The title field of the card.


<div class="meta-api-description">
How do I configure the title field for each card in a Kendo UI TaskBoard widget? Configure which data attribute or property displays as the header or title on each card, control the card label by specifying a field name from your dataset to show as the task or item title, set or map the card header text based on a particular property in your data model, customize the card title by selecting a string field that represents the main identifier or name for that card’s content, enable dynamic card titles by linking the title display to a chosen property within your task or data entries.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### editable `Boolean|Object` *(default: true)*

Toggles the editing in the TaskBoard. Both for columns and cards.


<div class="meta-api-description">
How can I allow users to edit task board elements in a Kendo UI TaskBoard component? Enable or disable user interactions for modifying task board elements, including toggling inline editing of column headers and card details, setting permissions for updating titles and content, controlling whether users can update, change, or rename cards and columns directly within the interface, managing edit modes for task lists, and configuring interactive editing capabilities for task management components.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: false,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### editable.buttons `Array`

Defines a list of buttons rendering in the footer pane


<div class="meta-api-description">
How to customize buttons in Kendo UI TaskBoard during editing mode? Customize and control the set of interactive buttons displayed in the footer area of a task management board during editing, including configuring which buttons appear, their order, icons, labels, click behavior, visibility conditions, and actions like saving changes, canceling edits, or triggering custom functions; adjust, enable, set, or modify footer controls for task editing interfaces to tailor the user experience with dynamic, customizable command buttons.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: ["saveChanges"]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### editable.buttons.name `String`

The name of the button.


<div class="meta-api-description">
How do I customize the label of editable action buttons in a Kendo UI task board? Customize and configure the label, caption, or text displayed on editable action buttons within a task board interface, enabling control over button names shown to users, referencing button identifiers in templates or scripts, and setting names used for click event bindings or dynamic UI updates. Adjusting the button label text helps with localization, user interface customization, button identification in code, and behavior control in editable task elements. This includes setting button captions for user actions, defining reference names for template rendering, and naming buttons for event handling or programming logic.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.buttons.text `String`

The text of the button.


<div class="meta-api-description">
How do I customize the button captions in my Kendo UI TaskBoard? Control, customize, or localize the text label displayed on editable buttons within a task board interface by setting or configuring the button caption, using static strings, translation keys, or dynamic labels to enable multilingual support, personalized UI text, or specific button naming conventions during initialization or runtime configuration.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.buttons.icon `String`

The icon of the button.


<div class="meta-api-description">
How to customize the icon for editable buttons in a Kendo UI TaskBoard? Customize or set the icon displayed on editable buttons within task boards by configuring the button’s visual symbol, enabling control over button appearance, styling, and action indicators; adjust, change, or specify icons to represent editable states, action triggers, or interactive controls on task management interfaces, allowing developers to tailor button visuals for clarity, UX improvement, or branding by setting icon identifiers, image references, or icon fonts on editable buttons during component setup or runtime customization.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.buttons.spriteCssClass `String`

The class name of the icon element.


<div class="meta-api-description">
How to customize the icon style for editable buttons in a Kendo UI task board? Customize or set the icon style for editable buttons in task boards by assigning CSS classes to modify button icons, including using sprite images, font icons, custom icon fonts, or utility classes for visual customization; enable control over icon appearance on interactive buttons within task management interfaces by configuring or changing the CSS class applied to icon elements for editable controls, allowing developers to specify or override icon styling through class names for task board button icons.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.buttons.command `String`

The command of the button.


<div class="meta-api-description">
How do I customize the behavior of an editable button in a Kendo UI TaskBoard? Configure or assign the action, handler, or command executed when an editable button is clicked or activated within a task board interface, enabling customization of button behavior through command identifiers, event handlers, or callback functions to trigger built-in or user-defined operations, such as editing, saving, or other interactive commands connected to task management workflows during component setup or runtime.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.buttons.options `String`

The command options of the button.


<div class="meta-api-description">
How do I configure the buttons in Kendo UI TaskBoard's editable mode? Set up and customize interactive button commands within a task board interface, controlling button labels, icons, click actions, enabling or disabling specific commands, adjusting appearance, and configuring behavior and additional parameters for editable buttons in task management views, including command settings, event handlers, and UI options for flexible button functionality.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.buttons.primary `Boolean`

Toggles whether the color of the button to be primary or not.


<div class="meta-api-description">
How to customize the color of editable buttons in a TaskBoard? Configure visual emphasis for editable buttons by toggling their color between the main theme or default styling to highlight primary actions within interactive task boards, enabling developers to set, enable, or control button appearance for editing tasks, focus user attention on critical controls, adjust UI emphasis for editable elements, and customize action button colors to reflect priority or active states in task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges",
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          card.set("title", defaults.title);
          card.set("description", defaults.description);
        }
      });
    </script>

### editable.form `Object`

The Kendo Form configuration for Card editing.


<div class="meta-api-description">
How to customize the form settings for in-place card editing on a Kendo UI TaskBoard? Control and customize in-place card editing behavior and appearance within a task management board by configuring form settings that define editable fields, input editors, layout arrangement, validation rules, templates, and data bindings, enabling tailored user interfaces for modifying task details, card content, or item properties through dynamic forms during initialization or setup.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ],
        resources: [{
          field: "category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        editable: {
          form: {
            buttonsTemplate: "",
            items: [{
              field: "title",
              label: "Title:"
            }, {
              field: "description",
              label: "Description:"
            }, {
              field: "category",
              label: "Category:",
              editor: "DropDownList",
              editorOptions: {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                  { value: "urgent", text: "Urgent", color: "orange" },
                  { value: "highpriority", text: "High Priority", color: "blue" },
                  { value: "lowpriority", text: "Low Priority", color: "green" }
                ]
              }
            }]
          }
        },
      });
    </script>

### editable.headerTemplate `String|Function`

Controls the rendering of the header


<div class="meta-api-description">
How do I customize the header layout in Kendo UI TaskBoard? Configure or customize the header layout and design for a task board by providing a custom HTML template or a rendering function that defines how the header is displayed, including injecting dynamic content, binding data to header elements, enabling custom controls, buttons, or interactive features in the header area, and modifying the header's visual structure and markup to suit specific UI needs or workflows.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ],
        editable: {
          headerTemplate: "<div class='k-taskboard-pane-header-text'>Editing <strong>#:title#</strong></div>"
        }
      });
    </script>

### height `String|Number` *(default: "800px")*

Configures the height of the TaskBoard wrapper.


<div class="meta-api-description">
How do I set the height of a Kendo UI TaskBoard widget in jQuery? Set or configure the vertical dimension, height, or size of the task board container to control its overall layout, visible area, scrolling behavior, and workspace space. Adjust or fix the height parameter to define how tall the task board appears within the application, enabling customization of vertical space for better user interface arrangement, screen fitting, or dynamic resizing. Control the task board’s wrapper height during setup or at runtime to optimize visibility, scrolling limits, and component positioning based on screen size or user preferences.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        height: 750,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### previewPane `Boolean|Object` *(default: true)*

Toggles the previewPane in the TaskBoard.


<div class="meta-api-description">
How do I enable the preview pane in Kendo UI taskboard? Control the visibility and enablement of the preview pane that displays detailed views of cards or items within the task board interface without navigating away, allowing configuration to show, hide, enable, or disable the panel for quick inspection of task details, supporting setup during initialization as well as toggling the card preview area for enhanced workflow and user interface customization.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: false,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### previewPane.buttons `Array`

Defines a list of buttons rendering in the footer pane.


<div class="meta-api-description">
How to customize buttons in task preview panel of Kendo UI TaskBoard? Customize and control the set of action buttons displayed in the footer area of the task preview panel, enabling developers to add, remove, reorder, or configure interactive buttons such as save, edit, delete, or custom commands within the preview interface. Adjust the button layout, define specific actions, and personalize footer controls to streamline task management workflows, set up contextual or user-defined buttons, and tailor preview pane behavior for enhanced usability and quick task interactions. This capability supports fine-tuning the preview area controls to meet various UI requirements, automate task handling, or implement specialized button-driven features within task boards.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.name `String`

The name of the button.


<div class="meta-api-description">
How to customize button names in Kendo UI TaskBoard preview pane? Configure and customize the display label and unique identifier for buttons within a preview pane or task interface, enabling developers to define readable button names for user interfaces, assign identifiers for scripting interactions, automate button selection in testing environments, reference buttons programmatically for event handling or dynamic updates, and manage button labeling for accessibility and UI clarity.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.text `String`

The text of the button.


<div class="meta-api-description">
How can I customize the action button label in Kendo UI taskboard preview pane? Control and customize the action button label displayed in the preview pane of a task board interface by configuring text properties to set, change, or localize the button’s visible caption, enabling dynamic, context-sensitive labels, translations, or custom wording for improved user interaction and clarity within task previews.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.icon `String`

The icon of the button.


<div class="meta-api-description">
How to customize icon for taskboard preview pane buttons in Kendo UI? Customize or configure the visual icon, glyph, or symbol displayed on buttons within a preview pane or task board interface, enabling control over the button’s appearance by setting icon names, icon classes, or CSS identifiers. This setting lets developers specify or change the graphical representation for preview pane buttons, allowing for tailored UI elements, adjusting visual cues, and managing button icons for improved usability, aesthetics, or branding within task preview contexts. Control and set the button icon display through icon identifiers, glyph names, or styling classes to match design requirements, user interface preferences, or interaction feedback in task board preview panels.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.spriteCssClass `String`

The class name of the icon element.


<div class="meta-api-description">
How to customize icon styling for task board preview pane buttons using sprite CSS classes in Kendo UI for jQuery? Configure the CSS class controlling the icon styling of preview pane buttons within a task board interface, enabling the use of sprite image classes, font-based icons, custom CSS classes, or theme-specific styling to customize, override, or target button icons for consistent visual appearance and interaction design. This property supports setting, changing, or applying class names to the preview panel’s icon elements for flexible icon management, theming, sprite usage, and UI customization across different workflows or design requirements.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false, spriteCssClass: "custom-class" }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.command `String`

The command of the button.


<div class="meta-api-description">
How do I customize the button behavior in a TaskBoard preview pane? Configure or specify the command or action triggered when a preview pane button is clicked within a task board interface, including setting custom command names, identifiers, or handlers to control button behavior, enable built-in command routing, execute specific functions on click, or customize button interactions for preview panes in task management or workflow applications.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.options `String`

The command options of the button.


<div class="meta-api-description">
How do I customize the buttons in Kendo UI TaskBoard's preview pane? Customize and control the behavior, appearance, and interaction of preview buttons within a task management preview pane by setting command options that define how buttons display, respond to events, execute actions, and integrate with preview functionality, enabling developers to configure event handlers, command parameters, visual styles, and button actions dynamically during initialization or runtime to tailor user interface elements for task previews, button command customization, preview pane controls, and interactive UI configurations in task boards or similar applications.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.buttons.primary `Boolean`

Toggles whether the color of the button to be primary or not.


<div class="meta-api-description">
How to change primary button color in TaskBoard preview pane? Toggle the main action button’s color emphasis in the preview pane to highlight it with the primary theme or keep the standard default look; control whether the preview button uses the primary color styling by enabling or disabling a boolean flag that sets visual priority, allowing customization of button prominence, focus, or call-to-action appearance in task preview interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit",
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;

          kendo.alert(kendo.format('<p>Title: {0}</p>' +
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>',
                                    card.title, card.description,
                                    card.status, card.category, card.order));
        }
      });
    </script>

### previewPane.template `String|Function`

The template rendering of the preview pane.


<div class="meta-api-description">
How to customize the preview pane template in Kendo UI TaskBoard? Customize how preview content appears for task cards by configuring and controlling the template or rendering method that generates the preview pane’s display, including options to set markup templates, dynamic callbacks, or expressions to define card previews during board setup, enabling flexible, personalized, or context-aware preview content presentation tailored to different user needs or data patterns.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          template: "<p>#:description#</p><p>Category: #:category#</p>"
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### previewPane.headerTemplate `String|Function`

The template rendering of the header for the preview pane.


<div class="meta-api-description">
How do I customize the header of the preview pane in a Kendo UI TaskBoard? Control and customize the content, layout, and appearance of the preview section header in a task management board by setting or configuring a header template that defines how the preview pane’s top area is rendered visually and structurally, enabling users to modify or replace default header elements, such as titles, icons, labels, or custom HTML, for improved display, branding, or contextual information in the task preview interface.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          headerTemplate: "<div class='k-taskboard-pane-header-text'>Viewing <strong>#:title#</strong></div>"
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### reorderable `Boolean` *(default: true)*

Toggles the reordering of cards in the TaskBoard.


<div class="meta-api-description">
How can I enable dragging and dropping of cards in my Kendo UI TaskBoard? Control the ability to reorder or rearrange cards on a task board interface by enabling or disabling drag-and-drop or manual sorting features, allowing users to customize the sequence of items according to priority or workflow; configure whether cards can be moved or reordered dynamically during runtime or at setup, supporting interactive task management, customizable card ordering, flexible prioritization, and user-driven layout adjustments within task boards or kanban-style views.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        reorderable: false,
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources `Array`

The configuration of the TaskBoard resource(s). A TaskBoard resource is optional metadata that can be associated
with a TaskBoard event.


<div class="meta-api-description">
How to add custom metadata to individual tasks in a Kendo UI TaskBoard? Set or configure additional metadata, attachments, or data bindings linked to individual task events or items within a task management board, enabling enhanced event context, custom information tags, resource allocation, or ownership details. This feature supports defining multiple resource entries, associating supplemental data, linking related assets, or embedding properties directly to event elements during setup, which helps in controlling, customizing, or extending task metadata, annotations, or resource references for filtering, display, or processing within task tracking workflows.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataColorField `String` *(default: "color")*

The field of the resource data item which contains the resource color.


<div class="meta-api-description">
How do I specify the field in my data objects that holds color information for TaskBoard resources? Control or specify the data attribute or field in your resource objects that holds color information for visually distinguishing resources or tasks in a board or calendar view; configure, set, or bind the property that defines how to extract and apply color codes, tags, or color identifiers from your dataset to resource elements, enabling customization of color mapping, theming, and visual differentiation based on resource-specific color values stored in your data model or API responses.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How to configure data source for Kendo UI TaskBoard? Configure, set, or bind resource data for task management boards using various formats such as JavaScript objects, arrays, or pre-existing data source instances; enable integration with external data, control loading and synchronization of resource items, link resources dynamically to tasks, support custom data structures or formats, connect with data-binding frameworks, and manage collections of resources efficiently to reflect updates in task boards without reinitializing data sources.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

#### Example - remote data binding

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataSource: {
            transport: {
              read: "url/to/endpoint"
            }
          }
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataTextField `String` *(default: "text")*

The field of the resource data item which represents the resource text.


<div class="meta-api-description">
How do I customize the task names in Kendo UI TaskBoard with a specific field from my data objects? Configure the displayed label or title for each resource by specifying which field from your resource data objects should be shown as the visible text, enabling control over how resource names, captions, or identifiers are presented in the interface by binding to string properties like name, text, label, or title fields within your data structure for tasks, projects, or resource listings.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataValueField `String` *(default: "value")*

The field of the resource data item which represents the resource value. The resource value is used to link a TaskBoard event with a resource.


<div class="meta-api-description">
How to configure TaskBoard to associate events with resources using a specific data field? Configure, set, or specify the field name from resource data that holds the unique identifier or value used to associate, link, map, or bind TaskBoard events with corresponding resources; control how event-to-resource relationships connect by defining the key property such as "id," "value," or any custom field representing the resource value that enables resource mapping, event assignment, or data linkage within TaskBoard scheduling or management features.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.field `String`

The field of the TaskBoard event which contains the resource id.


<div class="meta-api-description">
How do I configure the field that holds the resource identifier in Kendo UI TaskBoard? Configure and set the specific data field or event attribute that holds the resource identifier to accurately link or bind task resources within your project management or scheduling board. Control how resource assignments correspond to particular fields in your data model, assign resources through precise field mapping, specify which data property defines resource IDs, and ensure resource allocation aligns with your event's resource reference field. This enables seamless integration of resource tracking by selecting, customizing, or identifying the exact data point that represents the resource ID for tasks or calendar events.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.multiple `Boolean` *(default: false)*

If set to `true` the TaskBoard event can be assigned multiple instances of the resource. The TaskBoard event field specified via the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option will contain an array of resources.
By default only one resource instance can be assigned to an event.


<div class="meta-api-description">
How can I enable assigning multiple resources to a single event in Kendo UI TaskBoard? Enable assigning several resources or team members to a single event or task on a board, supporting multiple resource allocation, resource arrays, and multi-assignment configurations for events or tasks, allowing control over whether an event links to one or multiple resources, handling scenarios where tasks involve numerous people, assets, or entities, configuring resource concurrency, and specifying resource collections in event fields to manage assignments that require complex resource sharing or grouping.
</div>

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
          <div class="template-container">
              <div class="template-header">
                  <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
              </div>
              <p>#:description#</p>
              <p>Tags: # for (var i = 0; i < resources.tags.length; i++) { #
                <span style="color: #:resources.tags[i].color#">#:resources.tags[i].text#</span>
              # } # </p>
          </div>
      </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "tags",
          multiple: true,
          dataSource: [
            { value: "bug", text: "Bug", color: "gray" },
            { value: "feature", text: "Feature", color: "orange" },
            { value: "client-side", text: "Client-side", color: "blue" },
            { value: "server-side", text: "Server-side", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", tags: [ "bug", "client-side" ] },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", tags: [ "feature", "client-side" ] },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", tags: [ "feature", "server-side" ] },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", tags: [ "chore", "client-side" ] },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", tags: [ "chore", "server-side" ] }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.name `String`

The name of the resource used to distinguish resource. If not set the value of the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option is used.


<div class="meta-api-description">
How to set the identifier for resources in a Kendo UI TaskBoard? Set or customize the identifier for resources within the task management board to link, group, organize, or map tasks and assignments by resource name. Control how resources are labeled, referenced, or matched for filtering, grouping, or binding purposes in scheduling or project components. This configuration helps define unique resource names for assignments, allocations, or workload distribution, enabling clear association between tasks and resource entities when initializing or rendering the task board view. Adjusting this identifier influences resource mapping, grouping behaviors, and data binding related to resource allocation and task assignment.
</div>

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
          <div class="template-container">
              <div class="template-header">
                  <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
              </div>
              <p>#: description#</p>
              <p>#:resources.priority.name#: <span style="color:#:resources.priority.color#">#:resources.priority.text#<span></p>
          </div>
      </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "priority",
          title: "Category",
          name: "Category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", priority: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", priority: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", priority: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", priority: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", priority: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.title `String`

The user friendly title of the resource displayed in the TaskBoard edit form. If not set the value of the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option is used.


<div class="meta-api-description">
How to customize the display title for resources in a TaskBoard? Control and customize the user-friendly display name or label for a resource within a task board or scheduler editing interface, enabling you to define, set, configure, or override the visible title shown to users when managing or editing resources or entities. This includes options to specify readable, descriptive, or meaningful identifiers that appear in forms, resource lists, or editors, influencing how resource entries are titled, named, or labeled during task or project configuration and management workflows, with fallback to underlying field names if no custom title is set.
</div>

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
          <div class="template-container">
              <div class="template-header">
                  <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
              </div>
              <p>#: description#</p>
              <p>#:resources.priority.title#: <span style="color:#:resources.priority.color#">#:resources.priority.text#<span></p>
          </div>
      </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "priority",
          title: "Category",
          name: "Category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", priority: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", priority: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", priority: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", priority: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", priority: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.valuePrimitive `Boolean` *(default: true)*

Set to `false` if the TaskBoard event field specified via the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option contains a resource data item.
By default the TaskBoard expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via `dataValueField`).


<div class="meta-api-description">
How does Kendo UI TaskBoard handle event resource data when it's a simple string or number versus an object? Configure how TaskBoard interprets event resource data by setting whether the resource field is handled as a simple primitive value like a string or number, or as a complex resource object. Enable or disable treating the event resource field as a primitive depending on whether your event's resource field contains direct primitive identifiers or full resource data structures. Customize resource mapping and data binding to align with event properties, supporting scenarios where the event resource field holds either a straightforward ID or an embedded resource object, ensuring proper matching with resource definitions and seamless integration with event data fields using options to control value formats and data representation.
</div>

#### Example

    <div id="taskBoard"></div>
  
    <script id="card-template" type="text/x-kendo-template">
        <div class="template-container">
            <div class="template-header">
                <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
            </div>
            <p>#: description#</p>
            <p>#:resources.priority.title#: <span style="color:#:resources.priority.color#">#:resources.priority.text#<span></p>
        </div>
    </script>
  
    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "priority",
          valuePrimitive: false,
          dataValueField: "type",
          title: "Priority",
          dataSource: [
            { type: "urgent", text: "Urgent", color: "orange" },
            { type: "highpriority", text: "High Priority", color: "blue" },
            { type: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataCategoryField: "category",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", priority: { type: "urgent" } },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", priority: { type: "urgent" }  },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", priority: { type: "highpriority" }  },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", priority: { type: "lowpriority" } },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", priority: { type: "lowpriority" } }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### selectable `Boolean` *(default: true)*

Toggles the selection of the TaskBoard.


<div class="meta-api-description">
How can I allow users to select specific cards in a Kendo UI task board? Control whether cards or items on a task board can be clicked, highlighted, or selected by users, enabling or disabling interactive selection features that allow choosing, marking, or activating individual cards or entries. Configure, enable, or disable user ability to select, focus, highlight, or pick task board items for actions such as editing, moving, or bulk operations, ensuring control over selection behavior in task management interfaces, card-based layouts, or interactive dashboards where user selection is required or restricted.
</div>

#### Example

    <div id="taskBoard"></div>
  
    <script>
      $("#taskBoard").kendoTaskBoard({
        selectable: false,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### template `String|Function`

Controls the rendering of the card.


<div class="meta-api-description">
How to customize the appearance of individual cards in a TaskBoard using templates? Control and customize the appearance of individual cards in a task or project board by configuring the card layout, displayed fields, labels, and formatting with flexible templates. Enable custom rendering using HTML, markup, or rendering functions to set how each card’s data is visually presented, modified, and arranged. Adjust card content structure, field visibility, and styling to tailor task cards in a TaskBoard or Kanban board interface, supporting dynamic, user-defined templates for personalized card design and information display.
</div>

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
        <div class="my-card-template-container">
           <div class="#:styles.header# #:styles.hbox#">
             <a class="#:styles.title# #:styles.link#" href="\\#" data-command="SelectCardCommand">#:title#</a>
             <span class="#:styles.spacer#"></span>
             #=cardMenuButton#
            </div>
            <div class="#:styles.body#"><p>#:description#</p></div>
        </div>
    </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        template: $("#card-template").html(),
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### toolbar `Boolean|Array|Object` *(default: true)*

Configures the Tools of the TaskBoard.


<div class="meta-api-description">
How do I customize the toolbar in a Kendo UI TaskBoard? Customize and control the toolbar or tools area within task boards by configuring buttons, groups, icons, labels, click events, and templates to add, remove, or modify commands and actions related to creating tasks, filtering data, managing workflows, or other board-level functions. Adjust toolbar items to enable specific user interactions, define custom action handlers, organize tool groupings, and tailor the user interface for task management operations, supporting dynamic changes to the task board’s control bar and command behaviors across different scenarios and use cases.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        toolbar: [
          { type: "button", text: "Add Card", name: "addCard", text: "Add New Card", command: "CustomAddCardCommand", icon: "plus", showText: true },
          "spacer",
          "search"
        ],
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["CustomAddCardCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;

          taskboard.addCard({ status: "doing", title: "Add Title", description: "Add Description", category: "green" });
          taskboard.dataSource.sync();
        }
      });
    </script>

Apart from the built-in tools, the TaskBoard fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself. When passing an `object` to the `toolbar` configuration option it could also contain [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration.

### toolbar.items `Array`

Configures the items collection of the toolbar.


<div class="meta-api-description">
How to customize task board toolbar items in Kendo UI for jQuery? Customize, set up, and control the collection of toolbar elements including buttons, separators, and templates within a task management interface, enabling developers to define, arrange, enable, or disable toolbar actions and controls for task board components during initialization or runtime, supporting flexible configuration of interactive toolbar items to match specific UI workflows and user interaction patterns.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        toolbar: {
          items: [
            { type: "button", text: "Add Card", name: "addCard", text: "Add New Card", command: "CustomAddCardCommand", icon: "plus", showText: true },
            "spacer",
            "search"
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["CustomAddCardCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;

          taskboard.addCard({ status: "doing", title: "Add Title", description: "Add Description", category: "green" });
          taskboard.dataSource.sync();
        }
      });
    </script>

### toolbar.items.type `String`
Specifies the type of the button.


<div class="meta-api-description">
How do I customize the behavior of task board toolbar buttons using the type property in Kendo UI for jQuery? Define or configure the kind and behavior of toolbar buttons in task boards by setting button types, including options to specify button roles, appearance styles, and action bindings, enabling control over how toolbar items render and respond within task management interfaces, facilitating setup of command buttons, menu toggles, or custom interactive controls during initialization or dynamic updates.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { type: "button", text: "Custom Button", icon: "plus" },
                {
                    type: "splitButton", text: "Split Button", menuButtons: [
                        { id: "foo", text: "Foo" },
                        { id: "bar", text: "Bar" }
                    ]
                }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.overflow `String`
Specifies the overflow of the button.


<div class="meta-api-description">
How do I handle toolbar items when space is limited in a Kendo UI TaskBoard? Configure toolbar button behavior when available space is constrained by setting strategies like hiding buttons, moving them to an overflow area, or showing them through popups or menus to manage layout adaptation, improve accessibility, and control how toolbar items respond to limited width, dynamic resizing, or responsive designs in task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Always Visible", overflow: "never" },
                { text: "Can Overflow", overflow: "auto" },
                { text: "Always Hidden", overflow: "always" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.click `Function`
Specifies the click handler of the button.


<div class="meta-api-description">
How to handle click event on TaskBoard toolbar item in Kendo UI for jQuery? Manage and customize toolbar button click events within task boards by defining handlers that respond to user interactions, enabling execution of custom functions, updating board state, triggering navigation, controlling component behavior, processing button actions, setting up event listeners, handling clicks programmatically, implementing interactive controls, and integrating dynamic responses to toolbar item selections.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { 
                    text: "Custom Action", 
                    icon: "star",
                    click: function(e) {
                        console.log("Custom button clicked!");
                        alert("Button clicked");
                    }
                }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.command `String`
Specifies the command of the button.


<div class="meta-api-description">
How do I link a toolbar button in TaskBoard to a specific command or handler function? Set, configure, or customize the specific action or operation triggered by a toolbar button in the TaskBoard interface, linking the button to a defined command, handler, or named function that executes when clicked or activated; control which task-related functions or commands the toolbar buttons invoke during initialization or runtime, enabling precise binding of buttons to workflow actions, event handlers, or task management commands within the TaskBoard environment.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { command: "CustomCommand", text: "Custom Command", icon: "gear" },
                { command: "AddCard", text: "Add Card", icon: "plus" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.options `String`
Specifies the command options of the button.


<div class="meta-api-description">
How can I customize the buttons on a TaskBoard's toolbar using the options property? Customize toolbar buttons by setting command properties such as text labels, icons, enable or disable states, visibility controls, click event handlers, and binding commands to specific actions or functions; configure appearance, interactive behavior, and execution logic for toolbar items to control how each button responds, displays, or triggers commands within task management or project boards.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { 
                    command: "CustomCommand", 
                    text: "Custom Command", 
                    options: "option1,option2",
                    icon: "gear"
                }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.name `String`
Specifies the name of the button.


<div class="meta-api-description">
How do I set the name of a task board toolbar button in Kendo UI for jQuery? Configure or set the identifier label for a toolbar button in a task board interface to reference, identify, or locate the button programmatically, enable event handling, bind specific actions or commands, customize toolbar items, control button behavior, modify or target specific toolbar elements, assign unique names to toolbar entries, and facilitate interaction with toolbar controls during initialization or dynamic updates within task management or project organization tools.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { name: "addCard", text: "Add Card", icon: "plus" },
                { name: "customButton", text: "Custom", icon: "gear" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.


<div class="meta-api-description">
How to make toolbar buttons in Kendo UI TaskBoard toggle on and off? Configure toolbar buttons to behave as toggles that switch between active and inactive states, allowing users to enable or disable features by pressing buttons that retain selection state within the TaskBoard interface. Control whether toolbar items respond as toggle buttons that maintain on/off, pressed/released, or selected/unselected states for interactive UI elements. Enable toggle functionality to create stateful buttons that facilitate switching modes, filters, or options directly from the toolbar, supporting user input patterns that require persistent selection feedback. Set buttons to be togglable for managing UI states, controlling visibility, or activating features with click-based state changes, providing clear visual cues through button selection in the toolbar area.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Toggle View", icon: "eye", togglable: true },
                { text: "Regular Button", icon: "gear", togglable: false }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.text `String`
Sets the text of the button.


<div class="meta-api-description">
How do I change the text label of a toolbar button in Kendo UI TaskBoard? Define or change the text label, caption, or visible name of toolbar buttons or items within a taskboard interface, customize button titles, set button captions dynamically or at initialization, control toolbar item display names, update the text shown on taskboard controls, configure button labels for clearer identification, adjust toolbar item wording for user clarity, manage the visible strings on taskboard toolbar elements, modify button text to reflect functionality or status, and customize user interface language or terminology on toolbar items.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Add New Card", icon: "plus" },
                { text: "Export Data", icon: "download" },
                { text: "Settings", icon: "gear" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.


<div class="meta-api-description">
How to customize the toolbar items in Kendo UI TaskBoard? Customize the toolbar by embedding your own elements, setting custom HTML or components directly within the toolbar area, enabling insertion of personalized buttons, links, or controls that don’t rely on predefined types, configuring toolbar layout with user-defined content, overriding default toolbar items with custom templates, adding unique interactive or visual elements into the toolbar region, controlling toolbar appearance by specifying exact markup or components, and integrating bespoke toolbar features for more flexible or dynamic interface customization.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { 
                    template: (data) => `<button class="k-button"><span class="k-icon k-i-star"></span>Custom Template</button>`
                },
                { text: "Regular Button", icon: "gear" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).


<div class="meta-api-description">
How do I customize the text labels on Kendo UI TaskBoard toolbar items? Customize toolbar button labels visibility by enabling, disabling, or configuring text display on toolbar items, whether directly on buttons, within overflow menus, or simultaneously in both places to improve user interface clarity and accessibility; control how toolbar captions appear, set label positions for toolbar elements, toggle text visibility for action buttons, manage display of button titles in condensed menus, and adjust interface text for better user interaction and responsiveness.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Toolbar Only", icon: "plus", showText: "toolbar" },
                { text: "Overflow Only", icon: "gear", showText: "overflow" },
                { text: "Both Places", icon: "star", showText: "both" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.


<div class="meta-api-description">
How do I make a specific toolbar button stand out in Kendo UI TaskBoard? Control which toolbar button stands out as the main or emphasized action by enabling primary styling, making it visually prominent and distinct from other buttons on the TaskBoard toolbar; set or toggle this flag to highlight key commands, configure action priority, accentuate important controls, or emphasize default or most-used functions during initialization or dynamic updates to ensure users can easily identify and access the principal button within the toolbar interface.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Primary Action", icon: "plus", primary: true },
                { text: "Secondary Action", icon: "gear", primary: false }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.


<div class="meta-api-description">
How do I add custom attributes to a taskboard toolbar button in Kendo UI? Configure custom HTML attributes on toolbar buttons for a task management board by setting key-value pairs like id, class, title, data-* attributes, aria-* attributes, or any valid HTML attribute to control styling, accessibility, identification, data binding, or tooltips of toolbar elements. Enable adding custom properties or metadata to toolbar buttons during initialization to customize behavior, appearance, or integration, supporting a wide range of attribute types for improved control over UI elements in task boards or kanban interfaces.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { 
                    text: "Custom Button", 
                    icon: "plus",
                    attributes: {
                        "data-action": "add",
                        "title": "Add new card",
                        "class": "custom-button"
                    }
                }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".


<div class="meta-api-description">
How do I enable toolbar buttons by default in Kendo UI TaskBoard? Control whether toolbar buttons or icons start enabled or disabled when the task board or interface loads, configuring initial active states, toggling availability, setting default interaction readiness, enabling or disabling toolbar controls on startup, managing which toolbar items are clickable or inactive at initialization, adjusting toolbar element availability before user interaction, and setting boolean flags for toolbar item activation status during the task board setup process.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Enabled Button", icon: "plus", enable: true },
                { text: "Disabled Button", icon: "gear", enable: false }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.


<div class="meta-api-description">
How do I hide specific toolbar buttons in a Kendo UI TaskBoard? Control the visibility, display, or presence of toolbar buttons in a task management interface by toggling individual toolbar item visibility settings, enabling you to hide or show specific buttons dynamically, customize user interface toolbars by configuring which action buttons appear or remain concealed, manage toolbar components' display state, and adjust toolbar item availability during setup or runtime by setting visibility flags to true for hidden or false for visible states.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Visible Button", icon: "plus", hidden: false },
                { text: "Hidden Button", icon: "gear", hidden: true }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.


<div class="meta-api-description">
How to customize task board toolbar button icons in Kendo UI for jQuery? Customize toolbar button icons using CSS class names to control the appearance of task board toolbar items, enabling you to assign single or multiple sprite CSS classes for icons, configure custom visual styles on buttons, set icon graphics via CSS classes, style toolbar items with specific sprite classes, or apply combined class names to change button icon visuals in task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Custom Icon", spriteCssClass: "custom-icon-class" },
                { text: "Another Icon", spriteCssClass: "icon-sprite custom-class" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.


<div class="meta-api-description">
How to set custom icons for TaskBoard toolbar buttons using image URLs? Control toolbar button icons by specifying image URLs to customize TaskBoard buttons with pictures, set or update button images using direct links, enable toolbar buttons to display custom graphics or icons, configure visual appearance with external image sources for buttons, apply image-based buttons in the toolbar using URL references, embed icons or pictures in toolbar elements to enhance UI, modify or assign image links to toolbar items for branding or clarity, manage toolbar button visuals through image URLs for flexible styling, set button icons via web addresses to improve toolbar interactivity and recognition, integrate image URLs into toolbar button properties to personalize or theme the TaskBoard interface.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Custom Image", imageUrl: "/images/custom-icon.png" },
                { text: "Another Image", imageUrl: "https://via.placeholder.com/16x16" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).


<div class="meta-api-description">
How do I configure icon display for toolbar items in a Kendo UI TaskBoard? Configure the display location of toolbar item icons within task management interfaces by setting whether icons appear directly on the toolbar, only in the overflow menu, or simultaneously in both areas, enabling customization of visual elements for better user experience and interface clarity. Adjust icon visibility for buttons to show exclusively alongside toolbar options, within expandable overflow menus for compact layouts, or in both to ensure consistent recognition and accessibility. Control and customize how action icons are presented within task boards, managing appearance for responsive design, enhancing usability, and tailoring button icon placement to developer preferences or UI requirements.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Toolbar Only", icon: "plus", showIcon: "toolbar" },
                { text: "Overflow Only", icon: "gear", showIcon: "overflow" },
                { text: "Both Places", icon: "star", showIcon: "both" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.


<div class="meta-api-description">
How do I set an icon for a TaskBoard toolbar button using Kendo UI themes? Configure or set an icon on a TaskBoard toolbar button using a predefined Kendo UI theme sprite by specifying the icon name or CSS class linked to the built-in Kendo theme icons, enabling developers to customize toolbar visuals with standard icon sprites, assign theme-based graphical symbols, or apply consistent style icons for toolbar actions, enhancing the user interface by selecting from the official Kendo UI icon set or sprite classes for toolbar elements.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Add", icon: "plus" },
                { text: "Settings", icon: "gear" },
                { text: "Delete", icon: "trash" },
                { text: "Save", icon: "save" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.items.id `String`
Specifies the ID of the button.


<div class="meta-api-description">
How to uniquely identify toolbar buttons in a TaskBoard widget? Configure or set a unique identifier for toolbar buttons to enable precise targeting, referencing, or manipulation within the task board interface, including assigning IDs for event handling, styling with CSS selectors, automated testing, accessibility labels, or integration scenarios that require specific button identification and control.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            items: [
                { text: "Add Card", icon: "plus", id: "addCardButton" },
                { text: "Settings", icon: "gear", id: "settingsButton" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.


<div class="meta-api-description">
How to handle toolbar items that exceed available space in a Kendo UI task board? Control and customize how toolbar items behave when exceeding available space, including configuring overflow menus, collapsing excess buttons into dropdowns or containers, managing responsive display of toolbar elements, setting overflow handling strategies for task boards or similar interfaces, enabling smooth access to hidden or extra toolbar actions, adjusting how oversized or surplus toolbar controls are presented, and tailoring user interface responsiveness by managing the presentation and accessibility of toolbar items when space is limited.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            overflow: {
                mode: "menu",
                scrollButtons: "auto",
                scrollButtonsPosition: "split"
            },
            items: [
                { text: "Button 1", icon: "plus" },
                { text: "Button 2", icon: "gear" },
                { text: "Button 3", icon: "star" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>


### toolbar.overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


<div class="meta-api-description">
How do I handle toolbar overflow in Kendo UI TaskBoard? Configure the toolbar behavior when there are more items than available space by setting how extra toolbar buttons or controls are managed, including options to move overflow items into a dropdown menu, enable horizontal scrolling to keep all items visible, group toolbar elements into collapsible sections for better organization, or disable any overflow handling which can result in items being hidden or clipped. This setting helps control toolbar layout, responsiveness, and user interface adaptability for toolbars with variable numbers of commands or controls in task management or UI components.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            overflow: {
                mode: "scroll"
            },
            items: [
                { text: "Button 1", icon: "plus" },
                { text: "Button 2", icon: "gear" },
                { text: "Button 3", icon: "star" },
                { text: "Button 4", icon: "save" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>


### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
How do I configure scroll buttons on a Kendo UI TaskBoard toolbar? Configure the display behavior of scroll navigation buttons on a toolbar when the toolbar content exceeds its visible area and requires scrolling, enabling options to always show, always hide, or automatically display these buttons based on necessity; control and customize scroll button visibility settings during toolbar initialization or dynamic updates to enhance user interface navigation for overflowed toolbar elements.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible"
            },
            items: [
                { text: "Button 1", icon: "plus" },
                { text: "Button 2", icon: "gear" },
                { text: "Button 3", icon: "star" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>


### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
How do I customize where scroll buttons appear in the TaskBoard toolbar overflow area? Configure the placement of scroll buttons in the TaskBoard toolbar overflow area by specifying whether scroll controls appear on both ends, only at the beginning, or only at the end of the toolbar, enabling customization of horizontal navigation controls, scroll button positioning, overflow handling, toolbar scrolling behavior, and user interface adjustments to efficiently access hidden toolbar items.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible",
                scrollButtonsPosition: "end"
            },
            items: [
                { text: "Button 1", icon: "plus" },
                { text: "Button 2", icon: "gear" },
                { text: "Button 3", icon: "star" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>


### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


<div class="meta-api-description">
How to set scroll increment for toolbar overflow navigation in Kendo UI TaskBoard? Adjusting the horizontal or vertical scroll increment for toolbar overflow navigation enables control over how many pixels the toolbar shifts when users click scroll buttons, allowing you to set the scroll step size, scrolling distance per click, or navigation speed for better user experience and precise movement. Whether configuring toolbar overflow behavior, enabling smooth or fast scrolling through toolbar items, or setting pixel-based scroll intervals for easier access to hidden toolbar actions, controlling scroll increments helps customize toolbar scrolling responsiveness and navigation efficiency within the interface.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            overflow: {
                mode: "scroll",
                scrollButtons: "visible",
                scrollDistance: 100
            },
            items: [
                { text: "Button 1", icon: "plus" },
                { text: "Button 2", icon: "gear" },
                { text: "Button 3", icon: "star" }
            ]
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>


### width `String|Number` *(default: "100%")*

Configures the width of the TaskBoard wrapper.


<div class="meta-api-description">
How do I set the width of a Kendo UI TaskBoard component? Set or adjust the horizontal size, width, or overall layout span of the taskboard container to control how wide the board appears on screen, including setting fixed pixel widths, percentage-based fluid widths, or responsive sizing that manages spacing between columns, aligns the taskboard within parent containers, and affects how content flows horizontally. Configure or customize the component’s horizontal dimensions, horizontal alignment, container width, or layout width to optimize space usage, ensure consistent column spacing, and fit varying screen sizes or parent layouts to best integrate with surrounding elements.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        width: "700px",
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### toolbar.overflow `Object`
Specifies overflow configuration of the toolbar as [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow).


<div class="meta-api-description">
How to handle toolbar items that exceed available space in a Kendo UI task board? Control and customize how toolbar items behave when exceeding available space, including configuring overflow menus, collapsing excess buttons into dropdowns or containers, managing responsive display of toolbar elements, setting overflow handling strategies for task boards or similar interfaces, enabling smooth access to hidden or extra toolbar actions, adjusting how oversized or surplus toolbar controls are presented, and tailoring user interface responsiveness by managing the presentation and accessibility of toolbar items when space is limited.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        toolbar: {
            overflow: {
                mode: "menu",
                scrollButtons: "auto",
                scrollButtonsPosition: "split",
                scrollDistance: 75
            }
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages `Object`

Provides configuration options for the messages present in the TaskBoard widget.


<div class="meta-api-description">
How to customize task board messages in Kendo UI TaskBoard widget? Customize task board text labels and notification messages by configuring built-in strings, enabling control over task descriptions, alerts, prompts, status updates, error messages, confirmations, and user interface wording to fit application needs, localization, user preferences, or branding requirements. Adjust, set, or override default messages, notification texts, and label content for improved clarity, language customization, multi-language support, or consistent communication across task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        toolbar: [
          "addColumn",
          "myCustomButton", // Custom button
          "spacer",
          "search"
        ],
        messages: {
          myCustomButton: "Custom Button Text", // Text for custom buttons - mapped with their name field
          edit: "Edit",
          createNewCard: "Create new card",
          create: "Create",
          search: "Search",
          previewCard: "Preview card",
          addCard: "Add card",
          editCard: "Edit card",
          deleteCard: "Delete Card",
          addColumn: "Add column",
          editColumn: "Edit column",
          deleteColumn: "Delete column",
          close: "Close",
          cancel: "Cancel",
          "delete": "Delete",
          saveChanges: "Save changes",
          title: "Title:",
          description: "Description:",
          newColumn: "New column",
          deleteColumnConfirm: "Are you sure you want to delete this column?",
          deleteCardConfirm: "Are you sure you want to delete this card?"
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### messages.edit `String` *(default: "Edit")*

Specifies text to be rendered for the "Edit" message.


<div class="meta-api-description">
How do I customize the edit button caption in Kendo UI TaskBoard? Customize or translate the label text for editing actions within task management interfaces, control the display of edit button captions, modify or set the wording for edit prompts, update or override default edit labels for localization, enable changes to the edit message text shown to users, configure the edit button text in multiple languages, adjust the phrase used for editing tasks, specify alternative edit tag text in UI components, tailor edit command labels for different locales, and define the exact string presented as the edit option across task boards or project management tools.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            edit: "Modify Card"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.createNewCard `String` *(default: "Create new card")*

Specifies text to be rendered for the "Create new card" message.


<div class="meta-api-description">
How do I customize the "Create new card" button text in Kendo UI TaskBoard? Configure or customize the label text that appears on the interface for adding or creating a new card or task within the board or task management system. Control, change, or set the wording, caption, or button text that prompts users to generate, insert, or initiate a new card, task item, or entry in the task board UI. Enable adjustment or localization of the "create new card" prompt to match different languages, terminologies, or user preferences for task creation triggers across project management, Kanban, or workflow boards.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            createNewCard: "Add New Task Card"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.create `String` *(default: "Create")*

Specifies text to be rendered for the "Create" message.


<div class="meta-api-description">
How do I customize the label text on task creation buttons in Kendo UI TaskBoard? Change, customize, or localize the label text shown on task creation buttons or interfaces, override default "create" wording, set or update the message for starting new tasks or entries, adapt the display text to different languages or terminologies, configure the prompt users see when initiating task creation, control the wording used in user interactions for generating new items or tasks within a task management board.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            create: "Add Task"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.search `String` *(default: "Search")*

Specifies text to be rendered for the "Search" message.


<div class="meta-api-description">
How to customize the placeholder text for search inputs in a Kendo UI task board? Customize, configure, or set the placeholder text, prompt, label, or displayed wording for search inputs within task boards, enabling localization or internationalization of search-related UI messages such as "search," "find," "lookup," or "query" prompts in task management interfaces. Adjust the searchable input text hints or instructions to match different languages, dialects, or terminology preferences to improve user experience and clarity in search fields across task lists or boards. Control how search prompts or messages appear in task tracking tools, helping developers tailor search input text for various locales, user contexts, or custom UI implementations.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            search: "Find Tasks"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.previewCard `String` *(default: "Preview card")*

Specifies text to be rendered for the "Preview card" message.


<div class="meta-api-description">
How do I customize the preview card message in Kendo UI for jQuery TaskBoard? Customize the text label or caption for preview cards, set or change the display wording for card previews, translate or localize the preview card message, control the phrasing shown on task board card previews, configure the notification or tooltip text when previewing cards, adjust the preview card title or description for different languages or contexts, modify the short preview message displayed on cards, enable personalized or localized preview card labels, tailor the brief card preview content text, and set the user-facing preview card wording to suit customization, localization, or branding needs.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            previewCard: "View Card Details"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.addCard `String` *(default: "Add card")*

Specifies text to be rendered for the "Add card" message.


<div class="meta-api-description">
How do I customize the "Add Card" button label in a Kendo UI TaskBoard? Customize, set, or change the label text for the add card button or prompt in the task board interface, enabling control over how the add card action is displayed, named, or presented. This covers modifying the message, text, caption, or wording shown when users want to add a new card, including localizing, renaming, or adjusting the call-to-action phrase related to card creation on the board.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            addCard: "Create New Task"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.editCard `String` *(default: "Edit card")*

Specifies text to be rendered for the "Edit card" message.


<div class="meta-api-description">
How to customize the edit card message in Kendo UI TaskBoard? Customize or configure the label, text, or caption displayed for editing tasks, cards, or items on a task management board, adjusting the user interface message shown when modifying or updating a card's content, enabling control over the editable card prompt, notification, or tooltip text within task tracking or project management tools.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            editCard: "Modify Task"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.deleteCard `String` *(default: "Delete Card")*

Specifies text to be rendered for the "Delete Card" message.


<div class="meta-api-description">
How can I customize the confirmation prompt for deleting a card in Kendo UI TaskBoard? Control and customize the confirmation prompt, alert message, or warning text displayed when removing or deleting a card from the task board, enabling configuration of the exact wording shown during card deletion actions, setting personalized or localized delete prompts, adjusting the message content users see when they attempt to remove tasks or cards, and tailoring the feedback or notifications related to card removal within the task management interface.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            deleteCard: "Remove Task"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.addColumn `String` *(default: "Add column")*

Specifies text to be rendered for the "Add column" message.


<div class="meta-api-description">
How do I customize the "Add column" button in Kendo UI TaskBoard? Customize the label, text, or caption displayed on the button or control used to add a new column in a task board or kanban board interface, enabling developers to set, change, modify, translate, or localize the "Add column" prompt, button content, UI string, or user interface element that controls column creation, allowing flexible naming for adding columns, sections, lanes, or task groups in project management boards or task organization tools.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            addColumn: "Create New Column"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.editColumn `String` *(default: "Edit column")*

Specifies text to be rendered for the "Edit column" message.


<div class="meta-api-description">
How can I customize the edit column message in Kendo UI TaskBoard? Customize, configure, or set the display text, label, prompt, or message shown when modifying, renaming, or editing a column within a task management board or Kanban interface, supporting localized, translated, or internationalized content for user prompts and UI elements related to column editing actions.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            editColumn: "Modify Column"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.deleteColumn `String` *(default: "Delete column")*

Specifies text to be rendered for the "Delete column" message.


<div class="meta-api-description">
How can I customize the confirmation message when deleting a column in Kendo UI TaskBoard? Configure or customize the text shown when removing or deleting a column from a task board, enabling control over the confirmation message, alert, or prompt displayed during column deletion, and allowing adjustments to the user interface language, wording, labels, or notifications related to column removal actions.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            deleteColumn: "Remove Column"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.close `String` *(default: "Close")*

Specifies text to be rendered for the "Close" message.


<div class="meta-api-description">
How do I change the "Close" button text in a Kendo UI TaskBoard? Customize, configure, or set the text label for the close button in task boards or task management interfaces, controlling how the "Close" action is displayed, including modifying, renaming, or localizing the message shown on buttons or UI elements that finalize, dismiss, or complete a task, enabling developers to tailor user interface prompts, button captions, or action labels related to closing or finishing tasks.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            close: "Exit"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.cancel `String` *(default: "Cancel")*

Specifies text to be rendered for the "Cancel" message.


<div class="meta-api-description">
How do I change the cancel button text in Kendo UI TaskBoard? Customize or localize the text label for the Cancel button within task boards, enabling control over the cancel message shown to users, adjusting or configuring the cancel button text to match different languages, user preferences, UI themes, or specific application wording requirements, including changing or overriding default cancel prompts and messages in task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            cancel: "Discard Changes"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.delete `String` *(default: "Delete")*

Specifies text to be rendered for the "Delete" message.


<div class="meta-api-description">
How to customize the delete message in Kendo UI TaskBoard? Customize or set the text label, prompt, confirmation message, or notification shown when deleting tasks or items within the task management board interface, including configuring the displayed wording for delete actions, removal messages, and task deletion alerts to match user prompts, UI language preferences, or confirmation dialogues.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            "delete": "Remove"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.saveChanges `String` *(default: "Save changes")*

Specifies text to be rendered for the "Save changes" message.


<div class="meta-api-description">
How to customize save changes confirmation text in Kendo UI TaskBoard? Customize or configure the confirmation text shown when saving modifications, enabling localization and adaptation of save prompts, update notifications, or change-saving alerts with clear, user-friendly messages that can be adjusted for different languages and interfaces, allowing developers to set, modify, or control the save changes dialog text in task management boards, workflows, or project tracking environments.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            saveChanges: "Apply Changes"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.title `String` *(default: "Title:")*

Specifies text to be rendered for the "Title:" message.


<div class="meta-api-description">
How can I customize the title label in Kendo UI TaskBoard? Configure or customize the title text label displayed on the task board interface, control the header or caption shown in task board messages, set or localize the descriptive title that appears as a message heading, define the string used for the title prompt in task board notifications, and manage how the title message is presented or translated within the task management UI.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            title: "Task Name:"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.description `String` *(default: "Description:")*

Specifies text to be rendered for the "Description:" message.


<div class="meta-api-description">
How do I customize the label text for task descriptions in Kendo UI TaskBoard? Configure, customize, or translate the label text shown for descriptions within task management boards, enabling control over the wording displayed next to detailed task information, notes, or descriptions. Adjust the message output for description fields, modify or localize interface text prompts that indicate task details, or set alternative phrases for descriptive content labels, helping ensure that users see the appropriate wording or terminology when viewing or editing task descriptions across different languages, locales, or UI themes.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            description: "Task Details:"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.newColumn `String` *(default: "New column")*

Specifies text to be rendered for the "New column" message.


<div class="meta-api-description">
How do I change the "New column" label in a Kendo UI TaskBoard widget? Customize or translate the label for creating a new column by configuring or overriding the default "New column" text displayed in task boards, enabling localization, text replacement, or changing the UI prompt for adding columns to better match different languages, user preferences, or custom workflows.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            newColumn: "Add Status Column"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.deleteColumnConfirm `String` *(default: "Are you sure you want to delete this column?")*

Specifies text to be rendered for the "Are you sure you want to delete this column?" message.


<div class="meta-api-description">
How can I customize the confirmation message when deleting a column in Kendo UI TaskBoard? Customize or configure the confirmation prompt text shown when deleting a column, control the wording or message that asks users to confirm column removal, set or change the alert displayed to verify deletion actions, modify the confirmation dialog message for column deletion, enable tailored warnings before removing columns, adjust the prompt for confirming column deletion to suit your interface, specify or update the confirmation question users see when they attempt to delete a column, manage the text ensuring users confirm column removal to prevent accidental deletions, personalize the delete confirmation message for columns in task management boards, and control the exact wording of the alert asking if users want to delete a column.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            deleteColumnConfirm: "Do you really want to remove this column permanently?"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

### messages.deleteCardConfirm `String` *(default: "Are you sure you want to delete this card?")*

Specifies text to be rendered for the "Are you sure you want to delete this card?" message.


<div class="meta-api-description">
How do I customize the confirmation message when deleting a card from Kendo UI TaskBoard? Customize or configure the confirmation message prompt, alert text, or warning dialog that appears when removing, deleting, or erasing a card or task from a task board, Kanban board, or project management interface to ensure users receive clear deletion prompts, prevent accidental removal, and control modal or popup confirmation language for card deletion actions.
</div>

#### Example

    <div id="taskBoard"></div>
    <script>
    $("#taskBoard").kendoTaskBoard({
        messages: {
            deleteCardConfirm: "Do you really want to remove this task permanently?"
        },
        dataSource: [
            { id: 1, title: "Task 1", status: "todo" }
        ],
        columns: [
            { text: "To Do", status: "todo" }
        ]
    });
    </script>

## Methods

### addCard

Adds a card and opens edit pane with the data passed.


<div class="meta-api-description">
How do I dynamically add new cards to a Kendo UI TaskBoard with pre-filled data? Add a new card to a task management board dynamically by programmatically creating and inserting it, instantly opening the editing interface pre-filled with specified data to enable immediate customization, configuration, or update of task details; this supports automating card creation, setting default values, launching the edit mode on new entries, and integrating seamless task addition workflows with custom content or predefined attributes.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addCard({ status: "doing", category: "red" });
    </script>

#### Parameters

##### data `Object`

Predefine data object for the card.


### addColumn

Adds a column and toggles edit mode.


<div class="meta-api-description">
How to dynamically add a new column to a Kendo UI TaskBoard with jQuery? Create and insert a new column in the task board dynamically, instantly entering column edit mode for immediate adjustments; enable programmatic addition and real-time editing of columns right after initialization, supporting workflows that require adding, configuring, or updating columns on the fly, toggling between viewing and editing modes seamlessly, and controlling task board layout by setting new columns and switching to their edit state as part of automated or interactive board management.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addColumn({ text: "New column", status: "new" });
    </script>

#### Example - using index

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addColumn(1, { text: "New column", status: "new" });
      taskBoard.saveColumn();
    </script>

#### Parameters

##### index `Number`

Optional index parameter to define the index of the column.

##### data `Object`

Predefine data object for the column.

### columns

Returns all the column elements.


<div class="meta-api-description">
How do I access all columns in a Kendo UI TaskBoard? Access, retrieve, or iterate over all currently rendered column elements within a task board or kanban board setup to enable direct manipulation, measurement, styling, class toggling, event binding, or integration with custom scripts and DOM-based operations. Enable developers to grab the live collection of column nodes to perform dynamic updates, apply custom behaviors, attach event listeners, measure layout dimensions, or modify classes and CSS styles after initialization. Facilitate precise control over board layout columns for custom UI interactions, script integration, or runtime adjustments, fetching either native DOM elements or jQuery collections representing all visible columns at any point during application runtime or component lifecycle.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.columns().eq(0).css("border", "4px solid gray");
    </script>

#### Returns

`jQuery`

### columnByStatus

Returns the column element that is associated to the status.


<div class="meta-api-description">
How to access a specific column in Kendo UI TaskBoard based on its status? Find, access, or manipulate a TaskBoard column based on its status by retrieving the specific column element associated with a given workflow state, enabling developers to programmatically inspect, update, modify classes, apply styles, trigger animations, scroll to particular columns, or integrate custom behaviors tied to status values in task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.columnByStatus("doing").css("border", "4px solid gray");
    </script>

#### Parameters

##### status `String`

The status of the column.

#### Returns

`jQuery`


### deleteCard

Deletes a card.


<div class="meta-api-description">
How do I programmatically remove a card from a Kendo UI TaskBoard? Remove or delete a card from a task board, programmatically erase specific cards using methods or functions that eliminate card instances, clear cards in response to user input or application events, hide or remove cards so they no longer show on the board interface, and sync card removals with underlying data sources or bindings to ensure deleted cards are fully cleared from both the UI and the data model, enabling dynamic control over card presence, management of board content, and automated card deletion within task management workflows.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.deleteCard(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to delete.


### deleteColumn

Deletes a column.


<div class="meta-api-description">
How do I programmatically remove a column from a Kendo UI TaskBoard? Remove or delete a column programmatically from the task board, enabling developers to dynamically clear, erase, or drop existing columns in the board interface. This action updates the user interface and internal state of the task management component, supporting synchronization with external data sources by ensuring that deleted columns are reflected in connected databases or remote collections. Control column removal, manage layout changes, and synchronize backend data when columns are discarded or disabled from the task board view, allowing automated or user-driven column deletion to maintain consistency between visual task groupings and underlying data structures.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.deleteColumn(taskBoard.columns().eq(0));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to delete.


### editCard

Opens edit pane for card.


<div class="meta-api-description">
How can I programmatically open the card editing interface in Kendo UI TaskBoard using JavaScript? Programmatically open and activate the card editing interface to modify task details by invoking a method that triggers the edit pane for a specific card, enabling developers to set, configure, or show the card editor on demand. This functionality supports automating card edits, linking custom UI interactions like buttons or double-click events to open the editing view, focusing input fields for seamless user updates, and integrating card detail modifications within workflows or scripts. It is useful for controlling the display and state of the task editing interface dynamically, ensuring precise and efficient task management through code-driven UI manipulation.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      setTimeout(function(){
          taskBoard.editCard(taskBoard.items().eq(0));
      })
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to edit.

### editColumn

Toggles edit mode for column.


<div class="meta-api-description">
How do I enable inline editing for specific columns in a Kendo UI TaskBoard? Enable, disable, or toggle inline editing mode for individual columns within a task board or kanban-style interface, controlling whether users can modify column titles, settings, or content directly on the board. Configure the board to switch columns between editable and read-only states, activate or deactivate edit mode programmatically, manage column editing UI visibility, handle dynamic updates to columns, and support user interactions such as quick edit toggling, inline renaming, or locking down columns from changes during runtime or workflow adjustments.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.editColumn(taskBoard.columns().eq(0));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to edit.


### enable

Toggles the disabled state of a specific card.


<div class="meta-api-description">
How to dynamically disable user actions on specific task items in a Kendo UI TaskBoard? Control the interactivity of individual cards by toggling whether a card is enabled or disabled for user actions like selecting, dragging, editing, or clicking; dynamically set, enable, disable, or update the card’s interactive state programmatically at runtime to allow or prevent user interaction on specific task items, cards, or board elements, adjusting card behavior on demand to manage user access, interaction permissions, and UI responsiveness within task management applications.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.enable(taskBoard.items().eq(0), false);
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element.

##### state `Boolean`

If false the card will appear disabled.

### enableByColumn

Toggles the disabled state of all cards in the specified column.


<div class="meta-api-description">
How can I disable user interactions on all cards within a specific column in Kendo UI TaskBoard? Control the interactivity of all cards within a specific column by enabling or disabling user actions like clicks, selection, dragging, and dropping across every card in that column. Configure entire columns to be read-only or active by toggling their input and interaction states programmatically, setting cards to accept or block user engagement as needed. Manage batch enabling or disabling of column content to lock down or make editable all tasks at once, supporting use cases such as bulk activation, deactivation, or switching between interactive and non-interactive modes for specific columns within a task board or kanban-style layout.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.enableByColumn(taskBoard.columns().eq(0), false);
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element.

##### state `Boolean`

If false the card will appear disabled.

### executeCommand

Executes a command.


<div class="meta-api-description">
How can I programmatically move tasks in Kendo UI TaskBoard? Trigger or run built-in and custom actions programmatically on a task board by invoking command handlers to perform operations such as moving, editing, deleting tasks, or executing custom workflows; control command execution through scripting, automate task manipulation with keyboard shortcuts, integrate commands into toolbars, and enable automated or programmatic task management using method calls for flexible task board interactions and workflow automation.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.executeCommand({command: "OpenPaneCommand", options: { value: "Create" }});
    </script>

#### Parameters

##### options `Object`

The options required for the command.

### readOnly

Toggles the readonly state of a specific card.


<div class="meta-api-description">
How to toggle card edit mode in Kendo UI TaskBoard? Control whether a specific card on a task board or kanban board can be edited by enabling or disabling its edit mode dynamically, toggling the card's read-only status during runtime, locking a card to prevent changes, unlocking a card to allow modifications, switching a card’s editability state programmatically after initialization, disabling user edits on a single card, restoring the ability to edit a card, making a card non-editable temporarily or permanently, managing card interaction permissions individually, and updating card options to allow or restrict editing within task management interfaces.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.readOnly(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element.

##### state `Boolean`

If true the card will appear readonly.

### readOnlyByColumn

Toggles the readonly state of all cards in the specified column.


<div class="meta-api-description">
How to make certain columns in Kendo UI TaskBoard read-only for all cards? Control and toggle the editable status or set edit permissions for all cards within a specific column, enabling bulk locking or unlocking of card editing capabilities by column. Manage and configure column-level read-only states, enforce or lift restrictions on card modifications, and efficiently enable or disable editing access across multiple tasks in a column to support workflows requiring mass permission changes or temporary editing freezes. This functionality supports scenarios such as locking all tasks for review, disabling edits during audits, enabling modifications after approvals, and controlling card interaction on a per-column basis.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.readOnlyByColumn(taskBoard.columns().eq(0));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element.

##### state `Boolean`

If true the card will appear readonly.


### items

Returns the card elements in the TaskBoard.


<div class="meta-api-description">
How can I manipulate the cards or items displayed in a Kendo UI TaskBoard? Access, retrieve, list, or manipulate the visible cards or items currently displayed in a task board or kanban view, enabling operations such as reading card data, iterating through card elements, filtering specific cards, inspecting properties, modifying attributes or CSS classes, attaching event listeners, and integrating custom interactions or behaviors with active cards shown on the board.
</div>

#### Example

  <button id="btn">Get item</button>
    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard")
        .kendoTaskBoard({
          dataOrderField: "order",
          dataSource: [
            {
              id: 1,
              order: 1,
              title: "Task 1",
              description: "Description 1",
              status: "backlog",
              category: "red",
            },
            {
              id: 2,
              order: 2,
              title: "Task 11",
              description: "Description 11",
              status: "backlog",
              category: "red",
            },
            {
              id: 3,
              order: 3,
              title: "Task 2",
              description: "Description 2",
              status: "doing",
              category: "green",
            },
            {
              id: 4,
              order: 4,
              title: "Task 22",
              description: "Description 22",
              status: "doing",
              category: "green",
            },
            {
              id: 5,
              order: 5,
              title: "Task 3",
              description: "Description 3",
              status: "done",
              category: "blue",
            },
          ],
          columns: [
            { text: "Doing", status: "doing" },
            { text: "Backlog", status: "backlog" },
            { text: "Done", status: "done" },
          ],
        })
        .data("kendoTaskBoard");

      $("#btn").on("click", function () {
        var cardElm = taskBoard.items().eq(1);
        var dataItem = taskBoard.dataItem(cardElm);
        alert(dataItem.get("title"));
      });
    </script>
    

#### Returns

`jQuery`

### itemsByStatus

Returns the card elements in the TaskBoard filtered by column status.


<div class="meta-api-description">
How can I retrieve all task items currently in the "In Progress" status on my Kendo UI TaskBoard? Fetch or retrieve task or card elements filtered by their current workflow, stage, or column status within a task management board, enabling queries to get all items that match a specific status, state, or category for purposes such as dynamic filtering, batch processing, selective rendering, event handling, or automated test validations. Access or query cards grouped by their progress phase, task state, or board column to manipulate, inspect, update, or interact with only those tasks currently assigned to the given status, supporting use cases like programmatic updates, conditional logic, or UI enhancements based on task placement within a status column.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      setTimeout(function(){
        // Check the browser console to see the result

    	  var cardElm = taskBoard.itemsByStatus("backlog").eq(0);
        var dataItem = taskBoard.dataItem(cardElm);
        console.log(dataItem.get("title"));
      })

    </script>

#### Parameters

##### status `String`

The jQuery object with the card element to select.

#### Returns

`jQuery`

### itemsByColumn

Returns the card elements in the TaskBoard filtered by column elemennt.


<div class="meta-api-description">
How do I retrieve all cards in a specific column of my Kendo UI TaskBoard? Retrieve or access all card elements within a particular column on a board by specifying that column container, enabling filtering cards by column to list, read, or manipulate their content, update statuses, attach interactions or events, measure positions for layout calculations, and support operations like reordering or drag-and-drop; this method helps developers query column-specific cards for iteration, dynamic updates, event binding, state management, layout measurements, and interactive card rearrangement within a task or kanban board context.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      setTimeout(function(){
        	var cardElm = taskBoard.itemsByColumn(taskBoard.columns().eq(2)).eq(0);
          var dataItem = taskBoard.dataItem(cardElm);
          console.log(dataItem.get("title"));
      })
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to select.

#### Returns

`jQuery`

### load

Loads all DataSource instances (columns, dataSource and resources) configured in the correct order.


<div class="meta-api-description">
What is the best way to refresh all data sources in a Kendo UI TaskBoard after reconfiguring columns? invoke a method to initialize or refresh all data sources linked to a task management board ensuring columns, item data, and resource information are loaded sequentially so dependencies like column definitions precede item and resource data enabling consistent data display after updates changes or reconfiguration reload or rebind all data connections in correct order guarantee synchronized loading of columns, tasks, and resource datasets for accurate board rendering reinitialize or refresh entire data layers on the board to reflect latest configurations and maintain data integrity during dynamic updates
</div>

#### Example

    <button id="btn">Load</button>
    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
            autoBind: false,
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        $("#btn").kendoButton({
            click: function () {
              taskBoard.load();
            }
        });
    </script>

### previewCard

Opens the preview pane for the card element.


<div class="meta-api-description">
How do I display a quick inline preview of a card's details in Kendo UI TaskBoard? Open or display a quick inline preview of a card’s details within the task board interface by triggering a method to show a focused, expanded view of that card. Enable or configure a card quick-view pane that provides immediate access to card information without navigating away from the main board, supporting workflows for quickly inspecting, reviewing, or interacting with individual task cards. Use actions to reveal a detailed preview window inside the TaskBoard, supporting seamless toggling, inline detail display, and contextual card inspection for enhanced user interaction.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        setTimeout(function(){
          taskBoard.previewCard(taskBoard.items().eq(0));
        })
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

### registerShortcut

Registers a new shortcut for the TaskBoard.


<div class="meta-api-description">
How to add custom keyboard shortcuts to Kendo UI TaskBoard? Registering and configuring custom keyboard shortcuts, hotkeys, or key bindings in the TaskBoard enables developers to assign specific key combinations such as Ctrl+S, Shift+Enter, or other modifier keys to trigger built-in or user-defined actions dynamically at runtime; this includes setting up event handlers, callback functions, and managing keyboard input behavior to enhance workflow automation, control shortcut behavior after component initialization, and customize user interactions with flexible key mapping capabilities.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        // Focus the last card in TaskBoard
        taskBoard.registerShortcut("*", {
            keyCode: "q",
            ctrlKey: true
        }, {
            handler: function () {
                taskBoard.items().last().focus();
            }
        });

        // Create custom shortcut to open Preview pane on a card
        taskBoard.registerShortcut(".k-taskboard-card", {
            keyCode: "d",
            altKey: true
        }, {
            command: "OpenPaneCommand",
            options: { value: "Preview" },
            handler: function (ev) {
              ev.preventDefault();
            }
        });
    </script>

#### Parameters

##### selector `String`

The jQuery selector to match the element(s) on which the shortcut to be affected.

##### shortcut `Object`

The shortcut definition.

##### options `Object`

The options of the shortcut execution

##### options.command `String`

The command to be executed

##### options.options `String`

Command-specific options

##### options.handler `Function`

A function callback.

### dataItem

Returns the data item bound to the specific card element.


<div class="meta-api-description">
How do I access the underlying data object for a specific card in a Kendo UI TaskBoard? Retrieve or access the underlying data object, model, or bound item associated with a specific card or element in the task board interface to read, inspect, update, or synchronize data fields and UI state during event handling or user interactions; obtain the source data linked to a card for managing, modifying, or tracking task details, state changes, selection synchronization, or data binding within the task board component.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      setTimeout(function(){
        // Check the browser console to see the result

        var cardElm = taskBoard.items().eq(0);
        var dataItem = taskBoard.dataItem(cardElm);
        console.log(dataItem.get("title"));
      })
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

#### Returns

`kendo.data.ObservableObject`

### columnDataItem

Returns the data item bound to the specific column element.


<div class="meta-api-description">
How do I access the data object for a specific column in a Kendo UI TaskBoard? Access or extract the data object linked to a specific column element within a task board or kanban board interface, enabling retrieval of the bound data item for that column to inspect, update, or manipulate its properties, synchronize UI elements with their underlying data model, correlate DOM elements to column data, or implement logic and behavior driven by column-specific information and attributes.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      // Check the browser console to see the result

      var columnElm = taskBoard.columns().eq(0);
      var dataItem = taskBoard.columnDataItem(columnElm);
      console.log(dataItem.get("text"));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to select.

#### Returns

`kendo.data.ObservableObject`

### saveCard

Saves the edited card and closes editing.


<div class="meta-api-description">
How do I persist changes to a card in Kendo UI TaskBoard? Persist card changes, commit edits, save updated task or card data, programmatically finish editing, exit edit mode, close card editor, apply modifications to the current card, update task details, finalize user input on a card, ensure edits are stored and editing interface is dismissed.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addCard({order: 6, status: "backlog", title: "Add title", description: "Add description", category: "green"});
      taskBoard.saveCard();
    </script>


### saveColumn

Saves the edited column and closes editing.


<div class="meta-api-description">
How do I programmatically save column changes in Kendo UI TaskBoard? Save or commit changes made during column editing within a task board or kanban interface, applying updated configurations instantly and closing the inline editor to revert the board to its standard view; use this to programmatically finalize edits, persist modifications locally, update column settings, exit edit mode, confirm column adjustments, or complete in-place column customization within task management layouts.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addColumn({ text: "New column", status: "new" });
      taskBoard.saveColumn();
    </script>

### select

Returns the selected card or selects a card.


<div class="meta-api-description">
How do I programmatically select a card in Kendo UI TaskBoard? Control, retrieve, or assign the current selection within the task board interface, enabling programmatic access to the active card by getting the selected item or setting a specific card as active; this facilitates dynamic selection management, state control, card highlighting, and interaction automation through code by querying which card is chosen or by specifying a card element or data object to select, supporting use cases such as updating selections, reacting to user input, or initializing default card focus in workflows.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.select(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

#### Returns

`jQuery`

### setDataSource

Changes the DataSource of the TaskBoard


<div class="meta-api-description">
How do I dynamically update the data in my Kendo UI TaskBoard widget? Change or update the underlying data collection dynamically for a task management board by setting or swapping its data source at runtime, enabling binding to different datasets, arrays, or data configurations without recreating the board; this supports refreshing, reloading, or replacing task items instantly, switching task lists on the fly, updating collections from APIs or local data, and controlling which tasks or projects are displayed by connecting to new data inputs during active sessions.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.setDataSource([
          { id: 1, order: 1, title: "New Task 1", description: "New Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "New Task 2", description: "New Description 2", status: "doing", category: "green" },
      ]);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource|Array|Object`

The data source to which the widget should be bound.


### setColumnsDataSource

Changes the DataSource of the TaskBoard's columns.


<div class="meta-api-description">
How do I update the columns data source in a Kendo UI TaskBoard at runtime? Change or update the columns’ data source dynamically during runtime to rebind or switch the collection supplying the column information, enabling seamless refresh and immediate UI update of the task board layout without restarting or rebuilding the entire component; configure, set, or modify the underlying column dataset on the fly to reflect new data sets, adjust visible columns, or respond to user-driven or application-state changes in real-time column data.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.setColumnsDataSource([
          { text: "Todo", status: "backlog" },
          { text: "In progress", status: "doing" },
          { text: "Completed", status: "done" }
      ]);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource|Array|Object`

The data source to which the columns should be bound.

##### columnsDataSource `kendo.data.DataSource|Array|Object`

The data source to which the columns should be bound.

## Events

### columnsDataBinding

Fired before the TaskBoard binds the columns' data source.


<div class="meta-api-description">
How to customize columns data before it loads in Kendo UI TaskBoard? Intercept, customize, or modify the columns data source before it loads or renders by using an event triggered prior to data binding; control, inspect, or transform the incoming column data payload, adjust request parameters, dynamically manipulate or filter columns data, and implement custom logic that alters the structure or content of columns before they display in a task board or similar UI component.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnsDataBinding: function () {
          console.log("columnsDataBinding fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The widget will not bind its data and the `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

### columnsDataBound

Fired when the TaskBoard's columns are bound to their data source.


<div class="meta-api-description">
What is the columnsDataBound event in Kendo UI TaskBoard? React to the completion of column data loading or binding in a task board, enabling developers to trigger post-processing actions, customize or format column headers, update visual layouts, execute additional data fetches, or apply state and DOM changes once column rendering is finalized. Listen for the end of column binding operations to detect when data is fully loaded and accessible, allowing inspection of the dataset, dynamic adjustments, refreshes, or triggering further workflows related to task board column setup, display updates, or interactive enhancements after the data source connection completes.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnsDataBound: function () {
          // Check the browser console to see the result

          console.log("columnsDataBound fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

### select

Fired when the user selects a card in the TaskBoard.


<div class="meta-api-description">
How can I handle selection changes in a Kendo UI TaskBoard? Detect user card selection actions on a task or kanban board, capturing events triggered by mouse clicks, keyboard inputs, or other selection methods to enable custom handling of selected items, update interfaces dynamically, execute conditional logic based on what card is chosen, manage workflows linked to item selection, monitor selection changes, and retrieve detailed information about the selected card for interactive or reactive application behavior.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        select: function (ev) {
            var taskBoard = ev.sender;
            var cardElm = ev.card;
            var dataItem = taskBoard.dataItem(cardElm);

            alert(dataItem.get("title") + " selected!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `jQuery`

The selected card element wrapped in jQuery object.

##### e.preventDefault `Function`

If invoked prevents the selection.

### dataBinding

Fired before the TaskBoard binds to its data source.


<div class="meta-api-description">
How to intercept data before it's loaded in a Kendo UI TaskBoard? Configure event handlers that trigger before data loads or binds to the TaskBoard, enabling customization of data fetching workflows by inspecting, modifying, or transforming incoming data payloads and request parameters prior to rendering. Control pre-binding logic to adjust data queries, preprocess data sets, or alter request details before the component receives and displays data. Enable hooks for intercepting data source interactions, tailoring data formats, or implementing validation and filtering steps before the board renders, supporting dynamic data preparation and customized loading behavior before data binding occurs.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        dataBinding: function () {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("dataBinding fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The widget will not bind its data and the `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

### dataBound

Fired when the TaskBoard is bound to data from its data source.


<div class="meta-api-description">
What event is triggered when Kendo UI TaskBoard finishes loading its data source? Detect when the task board finishes loading or refreshing its data source to trigger post-load actions such as initializing user interface components, applying custom sorting or filtering of tasks or cards, executing follow-up API requests, or running any logic that depends on the updated task data. This event signals the completion of data binding and is useful for controlling dynamic updates, synchronizing UI elements with freshly loaded content, or reacting to changes in the underlying data after tasks have been rendered or updated.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        dataBound: function () {
          console.log("dataBound fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

### deleteCard

Fired when the user deletes a card.


<div class="meta-api-description">
How do I handle card deletion in Kendo UI TaskBoard? Detect when a card is removed or deleted from a task board component, triggering custom actions such as syncing with backend databases, updating the task list data, showing undo prompts or toast notifications, managing state changes, handling cleanup operations, coordinating server requests, and providing immediate user interface feedback related to card deletion events.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        deleteCard: function (ev) {
          alert(ev.card.get("title") + " deleted!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be deleted.

##### e.preventDefault `Function`

If invoked prevents the deletion.

### deleteColumn

Fired when the user deletes a column.


<div class="meta-api-description">
How to detect when a task board column is deleted in Kendo UI for jQuery? Listen for the event triggered when a task board column is removed or deleted, enabling detection of column removals to execute custom logic, synchronize or update data sources, persist changes to backend servers, update or refresh user interfaces, handle cleanup tasks, manage deletion workflows, respond to user-initiated column removals, hook into column delete actions, configure event handlers for column removal, or intercept and process column deletion events for application state management.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        deleteColumn: function (ev) {
          alert(ev.column.get("text") + " deleted!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be deleted.

##### e.preventDefault `Function`

If invoked prevents the deletion.

### editCard

Fired when the user edits or creates a card.


<div class="meta-api-description">
How do I intercept card data before saving in a Kendo UI TaskBoard? Capture and manage user actions related to creating or editing cards within the task board, including detecting when cards are added or modified, intercepting card data for validation, updating fields dynamically, triggering save operations, syncing changes with back-end systems, implementing custom logic on card updates, controlling data integrity during card edits, and integrating real-time updates or server communication workflows tied to card modifications and creations.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        editCard: function (ev) {
          alert(ev.card.get("title") + " editing!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be edited.

##### e.preventDefault `Function`

If invoked prevents the edit action.

### editColumn

Fired when the user edits or creates a column.


<div class="meta-api-description">
How do I handle column edits in a Kendo UI TaskBoard widget? Detect and handle user modifications to columns in a task management board by capturing events triggered when users create, update, or edit columns; enable interception of these changes to validate, modify, or enhance column data dynamically, support updating underlying data sources, trigger user interface updates like opening dialogs or saving edits, and apply custom business logic based on the column context and the type of action performed, ensuring seamless integration of column adjustments within workflows, data persistence, and UI responsiveness.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        editColumn: function (ev) {
          alert(ev.column.get("text") + " deleted!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be edited.

##### e.preventDefault `Function`

If invoked prevents the edit action.

### execute

Fires when a command is executed.


<div class="meta-api-description">
How to intercept task updates in Kendo UI TaskBoard? Intercept or respond to command executions within task management interfaces by capturing and handling events triggered when actions like updating, deleting, or moving tasks occur; customize behaviors by running your own logic upon commands, monitor command names and affected task items or columns, manage event context including user interactions, and enable cancellation or prevention of default operations during task board interactions or workflow processes.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        execute: function (ev) {
          // Prevent Select command
          if(ev.command === "SelectCardCommand") {
            ev.preventDefault();
          } else {
            // Notify all others
            alert(ev.command + " executed!");
          }
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.command `String`

The command name to be executed.

##### e.options `Object`

The options to be passed in the command. Possible fields included are card and column data items, card and column elements and string value passed to the command.

##### e.preventDefault `Function`

If invoked prevents the command execution.

### move

Fired when the user moves a card.


<div class="meta-api-description">
How to detect card movement within a Kendo UI taskboard? Detect changes when a card or item is dragged and repositioned within a task board or kanban-style interface, enabling updates to application state, synchronization with backend databases or APIs, triggering UI refreshes or animations, and capturing movement details like original and new locations for logging, analytics, or triggering workflows. Listen for drag-and-drop or move actions to track card rearrangements, handle user interactions involving item relocation, update data models based on position changes, and respond to events that indicate a task or note has been shifted across columns or swimlanes. This event is key for managing real-time updates, maintaining consistency between frontend and backend, and executing custom logic after users reorder cards on project management boards.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        move: function (ev) {
          console.log(ev.card.get("title") + " will move to " + ev.column.get("text"));
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved.

##### e.item `jQuery`

The element that is dragged.

##### e.target `jQuery`

The target element under cursor against which placeholder is positioned.

##### e.list `kendo.ui.Sortable`

The Sortable widget instance which the item belongs to (useful in case there are connected Sortable widgets).

##### e.draggableEvent `Object`

The original draggable's drag event data.

### moveEnd

Fired when the user dropped a card in a column.


<div class="meta-api-description">
How do I trigger actions after moving a card on a Kendo UI taskboard? trigger actions after moving a card on a task board, handle events when a card is dropped or relocated between columns, detect completion of drag-and-drop card moves, respond to post-move operations like updating data sources, persisting changes to backend servers, refreshing user interface states, logging move actions, running validations or notifications following card repositioning, react to card drag end or drop completion within task management boards, implement hooks for after-card-move events to maintain synchronization and trigger custom workflows or side effects after moving task cards.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        moveEnd: function (ev) {
          if(ev.action === "receive") {
            console.log(ev.card.get("title") + " moved to " + ev.column.get("text"));
          }
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved.

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.preventDefault `Function`

If invoked prevents the sort action. The element will be reverted at its original position. The hint and placeholder will be destroyed.

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position of the item in the Sortable collection. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item will be placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

### moveStart

Fired when the user started moving a card.


<div class="meta-api-description">
How to detect when a user starts moving a task item in Kendo UI TaskBoard? Detect when a card drag action initiates, enabling you to respond as soon as a user starts moving a task item by highlighting drop zones, preparing the interface, inspecting drag data, accessing the original element and source group details, managing state changes in real time, showing placeholders or visual cues, controlling drag behavior by enabling cancellation or prevention before the move proceeds, and handling user interactions at drag start for task boards or kanban-style workflows.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        moveStart: function (ev) {
          console.log(ev.card.get("title") + " moving from " + ev.column.get("text"));
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved.

##### e.draggableEvent `Object`

The original draggable's dragstart event data.

##### e.item `jQuery`

The element that will be dragged.

##### e.preventDefault `Function`

If invoked prevents the drag start action. The element will remain at its original position. The hint and placeholder will not be initialized.

### change

Fired when the user changed the card order or status by dragging.


<div class="meta-api-description">
How do I handle changes in task order when using a Kendo UI TaskBoard? Handle events triggered by dragging and dropping cards to reorder tasks or update their status in a task management board, enabling detection of changes in card position or state, capturing updates from user interactions, managing task movement, saving new task sequences or status changes, validating modifications, reverting unwanted adjustments, synchronizing front-end interfaces with backend databases, configuring listeners for drag-and-drop updates, and controlling dynamic updates when tasks shift order or transition between states.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        change: function (ev) {
          if(ev.action === "receive") {
            console.log(ev.card.get("title") + " changed to " + ev.column.get("text"));
          }
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved.

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position where the item was located at. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item is placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

### saveCard

Fired when the user saves a card.


<div class="meta-api-description">
How to handle saveCard event in Kendo UI TaskBoard? Detect and respond to when a card is saved within a task board or kanban interface, enabling custom actions such as validating input, persisting changes, synchronizing frontend and backend data, updating user interface elements, intercepting and canceling default save operations, handling asynchronous updates or server calls, and accessing detailed information about the saved card and save context to implement tailored logic during save events, trigger side effects, or manage save workflows in project management or task tracking applications.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        saveCard: function (ev) {
          alert(ev.card.get("title") + " saved!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be saved.

##### e.preventDefault `Function`

If invoked prevents the save action.

### saveColumn

Fired when the user saves a column.


<div class="meta-api-description">
How to respond when a column is saved in Kendo UI TaskBoard? Detect and respond to when a column is saved or updated in a kanban or task board interface, enabling developers to handle save actions, capture user changes to columns, trigger updates to the UI, persist modifications to storage or databases, or execute custom logic after a column edit is confirmed, supporting workflows involving column creation, editing, or saving events within task management components.
</div>

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        saveColumn: function (ev) {
          alert(ev.column.get("text") + " saved!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be saved.

##### e.preventDefault `Function`

If invoked prevents the save action.




