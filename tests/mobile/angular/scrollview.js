(function () {
    ngTestModule("Mobile Scroll View", {
        teardown: function() {
        }
    });

    ngTest("is initialized with local pages", 1,
    function() {
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home'>" +
                "<div kendo-mobile-scroll-view id='scrollview'>" +
                    "<kendo-mobile-scroll-view-page>Page 1</kendo-mobile-scroll-view-page>" +
                    "<kendo-mobile-scroll-view-page>Page 2</kendo-mobile-scroll-view-page>" +
                    "<kendo-mobile-scroll-view-page>Page 3</kendo-mobile-scroll-view-page>" +
                "</div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var element = QUnit.fixture.find("#scrollview");
        ok(element.getKendoMobileScrollView());
    });

    ngTest("is initialized with remote data", 1,
    function() {
        angular.module('kendo.tests').controller('myController', function($scope) {
            $scope.scrollViewOptions = {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {

                            var results = [], data = options.data;
                            for (var i = 1; i < 101; i ++) {
                                results.push({ foo: i });
                            }

                            options.success(results);
                        }
                    },
                    pageSize: 36
                }),
                template: "<div class='foo'>#: foo #</div>"
            };
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home' ng-controller='myController'>" +
                "<div kendo-mobile-scroll-view id='scrollview' k-options='scrollViewOptions'></div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var element = QUnit.fixture.find("#scrollview");
        ok(element.getKendoMobileScrollView());
    });

    ngTest("receives options from attributes", 1,
    function() {
        angular.module('kendo.tests').controller('myController', function($scope) {
            $scope.scrollViewOptions = {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {

                            var results = [], data = options.data;
                            for (var i = 1; i < 101; i ++) {
                                results.push({ foo: i });
                            }

                            options.success(results);
                        }
                    },
                    pageSize: 36
                }),
                template: "<div class='foo'>#: foo #</div>"
            };
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home' ng-controller='myController'>" +
                "<div kendo-mobile-scroll-view id='scrollview' k-enable-pager='false' k-options='scrollViewOptions'></div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var scrollview = QUnit.fixture.find("#scrollview").getKendoMobileScrollView();
        equal(scrollview.options.enablePager, false);
    });

    ngTest("compiles templates in data source", 2,
    function(){
        angular.module('kendo.tests').controller('myController', function($scope) {
            $scope.data = [{id: 1, text: "Foo"}, {id: 2, text: "Bar"}];
            $scope.scrollViewOptions = {
                dataSource: $scope.data,
                template: "<div class='my-item'>{{ dataItem.id }}/{{ dataItem.text }}</div>"
            };
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home' ng-controller='myController'>" +
                "<div kendo-mobile-scroll-view id='scrollview' k-options='scrollViewOptions'></div>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        var items = $("#scrollview").find(".my-item");
        equal(items.eq(0).text(), "1/Foo");
        equal(items.eq(1).text(), "2/Bar");
    });

    ngTest("custom tag is replaced with a <div>", 1,
    function(){
        angular.module('kendo.tests').controller('myController', function($scope) {
            $scope.data = [{id: 1, text: "Foo"}, {id: 2, text: "Bar"}];
            $scope.scrollViewOptions = {
                dataSource: $scope.data,
                template: "<div class='my-item'>#= text #</div>"
            };
        });
        QUnit.fixture.html("<div kendo-mobile-application id='app'>" +
            "<kendo-mobile-view id='home' ng-controller='myController'>" +
                "<kendo-mobile-scroll-view id='scrollview' k-options='scrollViewOptions'></kendo-mobile-scroll-view>" +
            "</kendo-mobile-view>" + 
        "</div>");
    },
    function() {
        equal($("#scrollview").get(0).tagName, "DIV");
    });

}());
