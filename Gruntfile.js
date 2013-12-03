module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    var tests = [
       'tests/model/**/*.js',
       'tests/data/**/*.js',
       'tests/autocomplete/*.js',
       'tests/grid/*.js',
       'tests/reorderable/*.js',
       'tests/core/**/*.js',
       'tests/fx/*.js',
       'tests/mobile/**/*.js',
       'tests/userevents/**/*.js',
       'tests/mvvm/*.js',
       'tests/menu/**/*.js',
       'tests/dragdrop/*.js',
       'tests/dropdownlist/*.js',
       'tests/view/*.js',
       'tests/router/**/*.js',
       'tests/panelbar/*.js',
       'tests/tabstrip/**/*.js',
       'tests/demos/*.js',
       'tests/breadcrumbs/*.js',
       'tests/button/*.js',
       'tests/colorpicker/*.js',
       'tests/columnmenu/*.js',
       'tests/filtermenu/*.js',
       'tests/groupable/*.js',
       'tests/imagebrowser/*.js',
       'tests/progressbar/*.js',
       'tests/popup/*.js',
       'tests/selectable/*.js',
       'tests/listview/*.js',
       // 'tests/download-builder/*.js',
       'tests/editable/*.js',
       'tests/treeview/*.js',
       'tests/pager/*.js',
       'tests/resizable/*.js',
       'tests/searchbox/*.js',
       'tests/sortable/*.js',
       'tests/tooltip/*.js',
       'tests/calendar/*.js',
       'tests/datepicker/*.js',
       'tests/diagram/*.js',
       'tests/splitter/*.js',
       'tests/validation/*.js',
       'tests/textbox/*.js',
       // 'tests/window/*.js'*/
    ],

    passedTests = grunt.option('tests');

    if (passedTests) {
        tests = [passedTests];
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                options: {
                    reportSlowerThan: 500,
                    basePath: '',
                    frameworks: ['qunit'],
                    files: [
                        { pattern: 'styles/**/*.*', watched: true, included: false },
                        { pattern: 'tests/**/*-fixture.html' },
                        'src/jquery.js',
                        'tests/jquery.mockjax.js',

                        'src/kendo.core.js',
                        'src/kendo.userevents.js',
                        'src/kendo.draganddrop.js',
                        'src/kendo.touch.js',
                        'src/kendo.timezones.js',
                        'src/cultures/kendo.culture.de-DE.js',
                        'src/cultures/kendo.culture.bg-BG.js',
                        'src/cultures/kendo.culture.en-ZA.js',
                        "src/kendo.fx.js",
                        'src/kendo.data.js',
                        'src/aspnetmvc/kendo.data.aspnetmvc.js',
                        "src/kendo.data.odata.js",
                        "src/kendo.data.xml.js",
                        'src/kendo.list.js',
                        'src/kendo.calendar.js',
                        'src/kendo.popup.js',
                        'src/kendo.autocomplete.js',
                        'src/kendo.datepicker.js',
                        'src/kendo.timepicker.js',

                        'src/kendo.mobile.loader.js',
                        'src/kendo.mobile.scroller.js',
                        'src/kendo.mobile.view.js',
                        'src/kendo.mobile.pane.js',
                        'src/kendo.mobile.shim.js',
                        "src/kendo.mobile.popover.js",
                        "src/kendo.mobile.splitview.js",
                        "src/kendo.mobile.application.js",
                        "src/kendo.mobile.actionsheet.js",
                        "src/kendo.mobile.button.js",
                        "src/kendo.mobile.listview.js",
                        "src/kendo.mobile.scrollview.js",
                        "src/kendo.mobile.navbar.js",
                        "src/kendo.mobile.buttongroup.js",
                        "src/kendo.mobile.switch.js",
                        "src/kendo.mobile.tabstrip.js",
                        "src/kendo.mobile.drawer.js",
                        "src/kendo.mobile.modalview.js",

                        "src/kendo.router.js",
                        "src/kendo.view.js",
                        "src/kendo.tooltip.js",

                        "src/kendo.button.js",
                        "src/kendo.colorpicker.js",

                        "src/kendo.combobox.js",
                        "src/kendo.dropdownlist.js",
                        "src/kendo.numerictextbox.js",
                        "src/kendo.binder.js",
                        "src/kendo.validator.js",
                        'src/aspnetmvc/kendo.validator.aspnetmvc.js',
                        "src/kendo.editable.js",
                        "src/kendo.filtermenu.js",
                        "src/kendo.groupable.js",
                        "src/kendo.pager.js",
                        "src/kendo.selectable.js",
                        "src/kendo.sortable.js",
                        "src/kendo.columnmenu.js",
                        "src/kendo.grid.js",
                        "src/kendo.listview.js",
                        "src/kendo.menu.js",
                        "src/kendo.panelbar.js",
                        "src/kendo.slider.js",
                        "src/kendo.reorderable.js",
                        "src/kendo.resizable.js",
                        "src/kendo.splitter.js",
                        "src/kendo.tabstrip.js",
                        "src/kendo.datetimepicker.js",
                        "src/kendo.treeview.js",
                        "src/kendo.upload.js",
                        "src/kendo.window.js",
                        "src/kendo.imagebrowser.js",
                        "src/kendo.multiselect.js",
                        "src/kendo.scheduler.view.js",
                        "src/kendo.scheduler.dayview.js",
                        "src/kendo.scheduler.monthview.js",
                        "src/kendo.scheduler.agendaview.js",
                        "src/kendo.scheduler.recurrence.js",
                        "src/kendo.scheduler.js",
                        "src/kendo.progressbar.js",
                        "src/editor/main.js",
                        "src/editor/dom.js",
                        "src/editor/serializer.js",
                        "src/editor/range.js",
                        "src/editor/system.js",
                        "src/editor/inlineformat.js",
                        "src/editor/formatblock.js",
                        "src/editor/linebreak.js",
                        "src/editor/lists.js",
                        "src/editor/link.js",
                        "src/editor/image.js",
                        "src/editor/components.js",
                        "src/editor/indent.js",
                        "src/editor/viewhtml.js",
                        "src/editor/formatting.js",
                        "src/editor/toolbar.js",
                        "src/editor/tables.js",

                        'tests/qunit/addons/close-enough/qunit-close-enough.js',
                        'tests/kendo-test-helpers.js',
                        'tests/**/test-helper.js',
                        'demos/mvc/content/shared/js/less.js',
                        { pattern: 'demos/mvc/App_Data/*json', included: false },
                        'demos/mvc/content/mobilethemebuilder/scripts/colorengine.js',
                        'demos/mvc/content/mobilethemebuilder/scripts/gradientengine.js',

                        'src/kendo.dataviz.core.js',
                        'src/kendo.diagram.utils.js',
                        'src/kendo.dataviz.canvas.js',
                        'src/kendo.dataviz.themes.js',
                        'src/kendo.dataviz.svg.js',
                        'src/kendo.dataviz.vml.js',
                        'src/kendo.diagram.math.js',
                        'tests/chart/util.js',
                        'src/kendo.dataviz.barcode.js',
                        'src/kendo.dataviz.qrcode.js',
                        'src/kendo.dataviz.gauge.js',
                        'src/kendo.diagram.svg.js',
                        'src/kendo.dataviz.chart.js',
                        'src/kendo.dataviz.sparkline.js',
                        'src/kendo.dataviz.chart.polar.js',
                        'src/kendo.dataviz.chart.funnel.js',
                        'src/kendo.dataviz.stock.js',
                        'src/kendo.diagram.services.js',
                        'src/kendo.diagram.extensions.js',
                        'src/kendo.diagram.dom.js',
                        'src/kendo.diagram.layout.js',
                        { pattern: 'src/kendo.editor.js', included: false }, // download builder needs this
                        { pattern: 'src/kendo.aspnetmvc.js', included: false }, // download builder needs this

                        'download-builder/scripts/script-resolver.js',
                        { pattern: 'download-builder/config/kendo-config.json', included: false },
                        'tests/diagram/common.js'
                    ].concat(tests),

                    exclude: [ 'src/kendo.icenium.js', 'src/kendo.web.js', 'src/kendo.all.js', 'src/kendo.mobile.js', 'src/kendo.dataviz.js', 'src/kendo.model.js', 'src/kendo.winjs.js', 'src/*min.js' ],

                    reporters: ['progress', 'osx' ],

                    port: 9876,

                    colors: true,

                    autoWatch: true,

                    browsers: ['Chrome'],

                    captureTimeout: 60000,

                    singleRun: false
                }
            }
        },
        jshint: {
            files: [
            'src/kendo*.js',
            'src/editor/*.js',
            'src/dataviz/**/*.js',
            'tests/map/layers/helpers.js',
            'tests/**/test-helper.js',
            'demos/mvc/content/shared/js/examples.js',
            'demos/mvc/content/shared/js/console.js',
            'themebuilder/bootstrap.js',
            'themebuilder/scripts/themebuilder.js',
            'themebuilder/scripts/colorengine.js',
            'themebuilder/scripts/constants.js'
            ],
            options: {
                ignores: ['**/*.min.js', 'src/kendo.web.js', 'src/kendo.aspnetmvc.js', 'src/kendo.all.js', 'src/kendo.mobile.js', 'src/kendo.dataviz.js', 'src/kendo.timezones.js', 'src/kendo.model.js', 'src/kendo.winjs.js', 'src/kendo.editor.js' ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask( "build", [ "concat:all", "uglify:all"] );
};
