window.kendoConfig = [
    // Framework --------------------------------------------------
    {
        id: "binder",
        name: "Binder",
        category: "Framework",
        source: "kendo.binder.min.js",
        depends: [ "core", "model" ],
        hidden: true
    }, {
        id: "core",
        name: "Core",
        category: "Framework",
        description: "The core of the Kendo framework.",
        source: "kendo.core.min.js"
    }, {
        id: "editable",
        name: "Editable",
        category: "Framework",
        source: "kendo.editable.min.js",
        depends: [ "datepicker", "numerictextbox", "validator", "binder" ],
        hidden: true
    }, {
        id: "fx",
        name: "Effects",
        category: "Framework",
        description: "Enables animation effects for Kendo widgets.",
        source: "kendo.fx.min.js",
        depends: [ "core" ]
    }, {
        id: "odata",
        name: "OData",
        category: "Framework",
        source: "kendo.data.odata.min.js",
        depends: [ "core" ],
        hidden: true
    }, {
        id: "xml",
        name: "XML",
        category: "Framework",
        source: "kendo.data.xml.min.js",
        depends: [ "core" ],
        hidden: true
    }, {
        id: "model",
        name: "Model",
        category: "Framework",
        source: "kendo.model.min.js",
        depends: [ "core" ],
        hidden: true
    }, {
        id: "data",
        name: "Data source",
        category: "Framework",
        description: "Powerful component for using local and remote data." +
                     "Fully supports CRUD, Sorting, Paging, Filtering, Grouping, and Aggregates.",
        source: "kendo.data.min.js",
        depends: [ "core", "model" ],
        features: [{
                id: "data-odata",
                name: "OData",
                description: "Support for accessing Open Data Protocol (OData) services.",
                depends: [ "odata" ]
            }, {
                id: "data-XML",
                name: "XML",
                description: "Support for binding to XML.",
                depends: [ "xml" ]
            }
        ]
    }, {
        id: "draganddrop",
        name: "Drag & drop",
        category: "Framework",
        source: "kendo.draganddrop.min.js",
        description: "Drag & drop functionality for any DOM element.",
        depends: [ "core" ]
    }, {
        id: "filteringmenu",
        name: "Filtering Menu",
        category: "Framework",
        source: "kendo.filteringmenu.min.js",
        depends: [ "datepicker", "numerictextbox", "dropdownlist" ],
        advanced: true
    }, {
        id: "groupable",
        name: "Groupable",
        category: "Framework",
        source: "kendo.groupable.min.js",
        depends: [ "core", "draganddrop" ],
        advanced: true
    }, {
        id: "resizable",
        name: "Resizable",
        category: "Framework",
        source: "kendo.resizable.min.js",
        depends: [ "core", "draganddrop" ],
        advanced: true
    }, {
        id: "sortable",
        name: "Sortable",
        category: "Framework",
        source: "kendo.sortable.min.js",
        depends: [ "data" ],
        advanced: true
    }, {
        id: "selectable",
        name: "Selectable",
        category: "Framework",
        source: "kendo.selectable.min.js",
        depends: [ "core" ],
        advanced: true
    }, {
        id: "scroller",
        name: "Scroller",
        category: "Framework",
        description: "Enables scrolling on mobile devices.",
        source: "kendo.scroller.min.js",
        depends: [ "core" ]
    }, {
        id: "pager",
        name: "Pager",
        category: "Framework",
        source: "kendo.pager.min.js",
        depends: [ "data" ],
        advanced: true
    }, {
        id: "popup",
        name: "Pop-up",
        category: "Framework",
        source: "kendo.popup.min.js",
        depends: [ "core" ],
        advanced: true
    }, {
        id: "list",
        name: "List",
        category: "Framework",
        source: "kendo.list.min.js",
        depends: [ "data", "popup" ],
        hidden: true
    },

    // Widgets ----------------------------------------------------
    {
        id: "autocomplete",
        name: "AutoComplete",
        category: "Widgets",
        description: "The AutoComplete widget provides suggestions depending on the typed text." +
                     "It also allows entry of multiple values.",
        source: "kendo.autocomplete.min.js",
        depends: [ "list" ]
    }, {
        id: "calendar",
        name: "Calendar",
        category: "Widgets",
        description: "The Calendar widget renders a graphical calendar that supports navigation and selection.",
        source: "kendo.calendar.min.js",
        depends: [ "core" ]
    }, {
        id: "chart",
        name: "Chart",
        category: "Widgets",
        description: "The Chart widget uses modern browser technologies to render high-quality data visualizations in the browser.",
        source: "kendo.chart.min.js",
        depends: [ "data" ]
    }, {
        id: "combobox",
        name: "ComboBox",
        category: "Widgets",
        description: "The ComboBox widget allows the selection from pre-defined values or entering a new value.",
        source: "kendo.combobox.min.js",
        depends: [ "list" ]
    }, {
        id: "datepicker",
        name: "DatePicker",
        category: "Widgets",
        description: "The DatePicker widget allows to the user to select a date from a calendar or by direct input.",
        source: "kendo.datepicker.min.js",
        depends: [ "calendar", "popup" ]
    }, {
        id: "dropdownlist",
        name: "DropDownList",
        category: "Widgets",
        description: "The DropDownList widget displays a list of values and allows the selection of a single value from the list.",
        source: "kendo.dropdownlist.min.js",
        depends: [ "list" ]
    }, {
        id: "grid",
        name: "Grid",
        category: "Widgets",
        description: "The Grid widget displays tabular data and offers rich support interacting with data," +
                     "including paging, sorting, grouping, and selection.",
        source: "kendo.grid.min.js",
        depends: [ "data" ],
        features: [{
                id: "grid-editing",
                name: "Editing",
                description: "Enables editing",
                depends: [ "editable" ]
            }, {
                id: "grid-filtering",
                name: "Filtering",
                description: "Enables filtering",
                depends: [ "filteringmenu" ]
            }, {
                id: "grid-grouping",
                name: "Grouping",
                description: "Enables grouping",
                depends: [ "groupable" ]
            }, {
                id: "grid-paging",
                name: "Paging",
                description: "Enables paging",
                depends: [ "pager" ]
            }, {
                id: "grid-selection",
                name: "Selection",
                description: "Enables row selection",
                depends: [ "selectable" ]
            }, {
                id: "grid-sorting",
                name: "Sorting",
                description: "Enables sorting",
                depends: [ "sortable" ]
            }]
    }, {
        id: "menu",
        name: "Menu",
        category: "Widgets",
        description: "The Menu widget displays hierarchical data as a multi-level menu.",
        source: "kendo.menu.min.js",
        depends: [ "popup" ]
    }, {
        id: "numerictextbox",
        name: "NumericTextBox",
        category: "Widgets",
        description: "The NumericTextBox widget can convert an input element into a numeric, percentage or currency textbox.",
        source: "kendo.numerictextbox.min.js",
        depends: [ "core" ]
    }, {
        id: "panelbar",
        name: "PanelBar",
        category: "Widgets",
        description: "The PanelBar widget displays hierarchical data as a multi-level expandable panel bar.",
        source: "kendo.panelbar.min.js",
        depends: [ "core" ]
    }, {
        id: "slider",
        name: "Slider",
        category: "Widgets",
        description: "The Slider widget provides a rich input for selecting values or ranges of values.",
        source: "kendo.slider.min.js",
        depends: [ "draganddrop" ]
    }, {
        id: "splitter",
        name: "Splitter",
        category: "Widgets",
        description: "The Splitter widget provides an easy way to create a dynamic layout of resizable and collapsible panes.",
        source: "kendo.splitter.min.js",
        depends: [ "resizable" ]
    }, {
        id: "tabstrip",
        name: "TabStrip",
        category: "Widgets",
        description: "The TabStrip widget displays a collection of tabs with associated tab content.",
        source: "kendo.tabstrip.min.js",
        depends: [ "core" ]
    }, {
        id: "timepicker",
        name: "TimePicker",
        category: "Widgets",
        description: "The TimePicker widget allows to the end user to select a value from a list of predefined values or to type a new value.",
        source: "kendo.timepicker.min.js",
        depends: [ "popup" ]
    }, {
        id: "treeview",
        name: "TreeView",
        category: "Widgets",
        description: "The TreeView widget displays hierarchical data in a traditional tree structure," +
                     "with support for interactive drag-and-drop operations.",
        source: "kendo.treeview.min.js",
        depends: [ "draganddrop" ]
    }, {
        id: "upload",
        name: "Upload",
        category: "Widgets",
        description: "The Upload widget uses progressive enhancement to deliver the best possible" +
                     "uploading experience to users.",
        source: "kendo.upload.min.js",
        depends: [ "core" ]
    }, {
        id: "validator",
        name: "Validator",
        category: "Widgets",
        description: "The Validator offers an easy way to do client-side form validation.",
        source: "kendo.validator.min.js",
        depends: [ "core" ]
    }, {
        id: "window",
        name: "Window",
        category: "Widgets",
        description: "The Window widget displays content in a modal or non-modal HTML window.",
        source: "kendo.window.min.js",
        depends: [ "draganddrop" ]
    }
];
