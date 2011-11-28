(function() {
    var categories = {
        framework: {
            name: "Framework",
            description: "Shared components providing behaviors, data access and other services"
        },
        widgets: {
            name: "Widgets",
            description: "Building blocks of the Kendo UI Framework"
        }
    };

    var components = [
        // Framework --------------------------------------------------
        {
            id: "binder",
            name: "Binder",
            category: categories.framework,
            source: "kendo.binder.min.js",
            depends: [ "core", "model" ],
            hidden: true
        }, {
            id: "core",
            name: "Core",
            category: categories.framework,
            description: "The core of the Kendo framework.",
            source: "kendo.core.min.js"
        }, {
            id: "editable",
            name: "Editable",
            category: categories.framework,
            source: "kendo.editable.min.js",
            depends: [ "datepicker", "numerictextbox", "validator", "binder" ],
            hidden: true
        }, {
            id: "fx",
            name: "Effects",
            category: categories.framework,
            description: "Required for animation effects in all Kendo UI widgets.",
            source: "kendo.fx.min.js",
            depends: [ "core" ]
        }, {
            id: "odata",
            name: "OData",
            category: categories.framework,
            source: "kendo.data.odata.min.js",
            depends: [ "core" ],
            hidden: true
        }, {
            id: "xml",
            name: "XML",
            category: categories.framework,
            source: "kendo.data.xml.min.js",
            depends: [ "core" ],
            hidden: true
        }, {
            id: "model",
            name: "Model",
            category: categories.framework,
            source: "kendo.model.min.js",
            depends: [ "core" ],
            hidden: true
        }, {
            id: "data",
            name: "Data source",
            category: categories.framework,
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
            category: categories.framework,
            source: "kendo.draganddrop.min.js",
            description: "Drag & drop functionality for any DOM element.",
            depends: [ "core" ]
        }, {
            id: "filtermenu",
            name: "Filtering Menu",
            category: categories.framework,
            source: "kendo.filtermenu.min.js",
            depends: [ "datepicker", "numerictextbox", "dropdownlist" ],
            advanced: true
        }, {
            id: "groupable",
            name: "Groupable",
            category: categories.framework,
            source: "kendo.groupable.min.js",
            depends: [ "core", "draganddrop" ],
            advanced: true
        }, {
            id: "resizable",
            name: "Resizable",
            category: categories.framework,
            source: "kendo.resizable.min.js",
            depends: [ "core", "draganddrop" ],
            advanced: true
        }, {
            id: "sortable",
            name: "Sortable",
            category: categories.framework,
            source: "kendo.sortable.min.js",
            depends: [ "data" ],
            advanced: true
        }, {
            id: "selectable",
            name: "Selectable",
            category: categories.framework,
            source: "kendo.selectable.min.js",
            depends: [ "core" ],
            advanced: true
        }, {
            id: "pager",
            name: "Pager",
            category: categories.framework,
            source: "kendo.pager.min.js",
            depends: [ "data" ],
            advanced: true
        }, {
            id: "popup",
            name: "Pop-up",
            category: categories.framework,
            source: "kendo.popup.min.js",
            depends: [ "core" ],
            advanced: true
        }, {
            id: "list",
            name: "List",
            category: categories.framework,
            source: "kendo.list.min.js",
            depends: [ "data", "popup" ],
            hidden: true
        },

        // Widgets ----------------------------------------------------
        {
            id: "autocomplete",
            name: "AutoComplete",
            category: categories.widgets,
            description: "The AutoComplete widget provides suggestions depending on the typed text." +
                         "It also allows multiple value entries.",
            source: "kendo.autocomplete.min.js",
            depends: [ "list" ]
        }, {
            id: "calendar",
            name: "Calendar",
            category: categories.widgets,
            description: "The Calendar widget renders a graphical calendar that supports navigation and selection.",
            source: "kendo.calendar.min.js",
            depends: [ "core" ]
        }, {
            id: "chart",
            name: "Chart",
            category: categories.widgets,
            description: "The Chart widget uses modern browser technologies to render high-quality data visualizations in the browser.",
            source: "kendo.chart.min.js",
            depends: [ "data" ]
        }, {
            id: "combobox",
            name: "ComboBox",
            category: categories.widgets,
            description: "The ComboBox widget allows the selection from pre-defined values or entering a new value.",
            source: "kendo.combobox.min.js",
            depends: [ "list" ]
        }, {
            id: "datepicker",
            name: "DatePicker",
            category: categories.widgets,
            description: "The DatePicker widget allows the user to select a date from a calendar or by direct input.",
            source: "kendo.datepicker.min.js",
            depends: [ "calendar", "popup" ]
        }, {
            id: "dropdownlist",
            name: "DropDownList",
            category: categories.widgets,
            description: "The DropDownList widget displays a list of values and allows the selection of a single value from the list.",
            source: "kendo.dropdownlist.min.js",
            depends: [ "list" ]
        }, {
            id: "grid",
            name: "Grid",
            category: categories.widgets,
            description: "The Grid widget displays tabular data and offers rich support for interacting with data," +
                         "including paging, sorting, grouping, and selection.",
            source: "kendo.grid.min.js",
            depends: [ "data" ],
            features: [{
                    id: "grid-editing",
                    name: "Editing",
                    description: "Support for record editing",
                    depends: [ "editable" ]
                }, {
                    id: "grid-filtering",
                    name: "Filtering",
                    description: "Support for record filtering",
                    depends: [ "filtermenu" ]
                }, {
                    id: "grid-grouping",
                    name: "Grouping",
                    description: "Support for grid grouping",
                    depends: [ "groupable" ]
                }, {
                    id: "grid-paging",
                    name: "Paging",
                    description: "Suppot for grid paging",
                    depends: [ "pager" ]
                }, {
                    id: "grid-selection",
                    name: "Selection",
                    description: "Support for row selection",
                    depends: [ "selectable" ]
                }, {
                    id: "grid-sorting",
                    name: "Sorting",
                    description: "Support for grid sorting",
                    depends: [ "sortable" ]
                }]
        }, {
            id: "menu",
            name: "Menu",
            category: categories.widgets,
            description: "The Menu widget displays hierarchical data as a multi-level menu.",
            source: "kendo.menu.min.js",
            depends: [ "popup" ]
        }, {
            id: "numerictextbox",
            name: "NumericTextBox",
            category: categories.widgets,
            description: "The NumericTextBox widget can format and display numeric, percentage or currency textbox.",
            source: "kendo.numerictextbox.min.js",
            depends: [ "core" ]
        }, {
            id: "panelbar",
            name: "PanelBar",
            category: categories.widgets,
            description: "The PanelBar widget displays hierarchical data as a multi-level expandable panel bar.",
            source: "kendo.panelbar.min.js",
            depends: [ "core" ]
        }, {
            id: "slider",
            name: "Slider",
            category: categories.widgets,
            description: "The Slider widget provides a rich input for selecting values or ranges of values.",
            source: "kendo.slider.min.js",
            depends: [ "draganddrop" ]
        }, {
            id: "splitter",
            name: "Splitter",
            category: categories.widgets,
            description: "The Splitter widget provides an easy way to create a dynamic layout of resizable and collapsible panes.",
            source: "kendo.splitter.min.js",
            depends: [ "resizable" ]
        }, {
            id: "tabstrip",
            name: "TabStrip",
            category: categories.widgets,
            description: "The TabStrip widget displays a collection of tabs with associated tab content.",
            source: "kendo.tabstrip.min.js",
            depends: [ "core" ]
        }, {
            id: "timepicker",
            name: "TimePicker",
            category: categories.widgets,
            description: "The TimePicker widget allows the end user to select a value from a list of predefined values or to type a new value.",
            source: "kendo.timepicker.min.js",
            depends: [ "popup" ]
        }, {
            id: "treeview",
            name: "TreeView",
            category: categories.widgets,
            description: "The TreeView widget displays hierarchical data in a traditional tree structure," +
                         "with support for interactive drag-and-drop operations.",
            source: "kendo.treeview.min.js",
            depends: [ "draganddrop" ]
        }, {
            id: "upload",
            name: "Upload",
            category: categories.widgets,
            description: "The Upload widget uses progressive enhancement to deliver the best possible " +
                         "uploading experience to users.",
            source: "kendo.upload.min.js",
            depends: [ "core" ]
        }, {
            id: "validator",
            name: "Validator",
            category: categories.widgets,
            description: "The Validator offers an easy way to do a client-side form validation.",
            source: "kendo.validator.min.js",
            depends: [ "core" ]
        }, {
            id: "window",
            name: "Window",
            category: categories.widgets,
            description: "The Window widget displays content in a modal or non-modal HTML window.",
            source: "kendo.window.min.js",
            depends: [ "draganddrop" ]
        }
    ];

    // Exports -----------------------------------------------------------------
    window.kendoConfig = components;
    window.kendoCategories = categories;
})();

