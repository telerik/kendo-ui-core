window.kendoConfig = [
    // Framework --------------------------------------------------
    {
        id: "core",
        name: "Core",
        category: "Framework",
        source: "kendo.core.min.js"
    }, {
        id: "fx",
        name: "Effects",
        category: "Framework",
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
        source: "kendo.data.min.js",
        depends: [ "core", "model" ],
        features: [{
                id: "data-odata",
                name: "OData",
                depends: [ "odata" ]
            }, {
                id: "data-XML",
                name: "XML",
                depends: [ "xml" ]
            }
        ]
    }, {
        id: "draganddrop",
        name: "Drag & drop",
        category: "Framework",
        source: "kendo.draganddrop.min.js",
        depends: [ "core" ]
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
        source: "kendo.scroller.min.js",
        depends: [ "core" ]
    }, {
        id: "pageable",
        name: "Pageable",
        category: "Framework",
        source: "kendo.pageable.min.js",
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
        source: "kendo.autocomplete.min.js",
        depends: [ "list" ]
    }, {
        id: "calendar",
        name: "Calendar",
        category: "Widgets",
        source: "kendo.calendar.min.js",
        depends: [ "core" ]
    }, {
        id: "chart",
        name: "Chart",
        category: "Widgets",
        source: "kendo.chart.min.js",
        depends: [ "data" ]
    }, {
        id: "combobox",
        name: "ComboBox",
        category: "Widgets",
        source: "kendo.combobox.min.js",
        depends: [ "list" ]
    }, {
        id: "datepicker",
        name: "DatePicker",
        category: "Widgets",
        source: "kendo.datepicker.min.js",
        depends: [ "calendar", "popup" ]
    }, {
        id: "dropdownlist",
        name: "DropDownList",
        category: "Widgets",
        source: "kendo.dropdownlist.min.js",
        depends: [ "list" ]
    }, {
        id: "grid",
        name: "Grid",
        category: "Widgets",
        source: "kendo.grid.min.js",
        depends: [ "data" ],
        features: [{
                id: "grid-grouping",
                name: "Grouping",
                depends: [ "groupable" ]
            }, {
                id: "grid-paging",
                name: "Paging",
                depends: [ "pageable" ]
            }, {
                id: "grid-selection",
                name: "Selection",
                depends: [ "selectable" ]
            }, {
                id: "grid-sorting",
                name: "Sorting",
                depends: [ "sortable" ]
        }]
    }, {
        id: "menu",
        name: "Menu",
        category: "Widgets",
        source: "kendo.menu.min.js",
        depends: [ "popup" ]
    }, {
        id: "panelbar",
        name: "PanelBar",
        category: "Widgets",
        source: "kendo.panelbar.min.js",
        depends: [ "core" ]
    }, {
        id: "slider",
        name: "Slider",
        category: "Widgets",
        source: "kendo.slider.min.js",
        depends: [ "draganddrop" ]
    }, {
        id: "splitter",
        name: "Splitter",
        category: "Widgets",
        source: "kendo.splitter.min.js",
        depends: [ "resizable" ]
    }, {
        id: "tabstrip",
        name: "TabStrip",
        category: "Widgets",
        source: "kendo.tabstrip.min.js",
        depends: [ "core" ]
    }, {
        id: "treeview",
        name: "TreeView",
        category: "Widgets",
        source: "kendo.treeview.min.js",
        depends: [ "draganddrop" ]
    }, {
        id: "upload",
        name: "Upload",
        category: "Widgets",
        source: "kendo.upload.min.js",
        depends: [ "core" ]
    }, {
        id: "window",
        name: "Window",
        category: "Widgets",
        source: "kendo.window.min.js",
        depends: [ "draganddrop" ]
    }
];
