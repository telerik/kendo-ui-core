(function() {
    describe("ListView", function() {
        afterEach(function() {
             kendo.destroy(Mocha.fixture);
        });

        ngTest("re-renders when a single item is changed",
            function() {
                angular.module('kendo.tests')
                    .controller('MyListCtrl', ['$scope', function($scope) {

                        $scope.listWidget = null;
                        $scope.listItemTemplate = '<p class="list-item">{{dataItem.number}}.{{dataItem.title}}</p>';

                        $scope.dataSource = [
                            { number: 1, title: 'first title' },
                            { number: 2, title: 'second title' }
                        ];

                        $scope.clickToChangeSingleItem = function() {
                            $scope.listWidget.dataSource.data()[0].set('title', 'first title changed');
                        };
                    }]);

                var markup = '<div ng-controller="MyListCtrl"><div kendo-listview="listWidget" k-data-source="dataSource" k-template="listItemTemplate"></div></div>';
                Mocha.fixture.html(markup);
            },
            function() {
                Mocha.fixture.find('[data-role=listview]').scope().clickToChangeSingleItem();
                assert.equal(Mocha.fixture.find(".list-item:eq(0)").html(), "1.first title changed");
            });

        ngTest("re-renders when cancel editing",
            function() {
                angular.module('kendo.tests')
                    .controller('MyListCtrl', ['$scope', function($scope) {

                        $scope.listWidget = null;
                        $scope.listItemTemplate = '<p class="list-item">{{dataItem.number}}.{{dataItem.title}}</p>';
                        $scope.listEditTemplate = '<p class="list-item">dummy edit template</p>';

                        $scope.dataSource = new kendo.data.DataSource({
                            data: [
                                { number: 1, title: 'first title' },
                                { number: 2, title: 'second title' }
                            ],
                            schema: {
                                model: {
                                    id: "number"
                                }
                            }
                        });
                    }]);

                var markup = '<div ng-controller="MyListCtrl"><div kendo-listview="listWidget" k-data-source="dataSource" k-template="listItemTemplate" k-edit-template="listEditTemplate"></div></div>';
                Mocha.fixture.html(markup);
            },
            function() {
                var widget = Mocha.fixture.find('[data-role=listview]').data("kendoListView");
                widget.edit(widget.element.children().first());
                widget.cancel();
                assert.equal(Mocha.fixture.find(".list-item:eq(0)").html(), "1.first title");
            });

        /*
        ngTest("updates when the underlying data is replaced", 1,
        function() {
            angular.module('kendo.tests')
            .controller('MyListCtrl', ['$scope', function ($scope) {
    
                $scope.listWidget = null;
                $scope.listItemTemplate = '<p class="list-item">{{dataItem.number}}.{{dataItem.title}}</p>';
    
                $scope.dataSource = [
                    {number: 1, title: 'first title'},
                ];
    
                $scope.change = function() {
                    $scope.$apply(function() {
                        $scope.dataSource = [
                            {number: 2, title: 'second title'}
                        ];
                    })
                };
            }]);
    
            var markup = '<div ng-controller="MyListCtrl"><div kendo-listview="listWidget" k-data-source="dataSource" k-template="listItemTemplate"></div></div>';
            Mocha.fixture.html(markup);
        },
        function() {
            Mocha.fixture.find('[data-role=listview]').scope().change();
            assert.equal(Mocha.fixture.find(".list-item:eq(0)").html(), "2.second title");
        });
    
        ngTest("updates when the underlying data is changed", 1,
        function() {
            angular.module('kendo.tests')
            .controller('MyListCtrl', ['$scope', function ($scope) {
    
                $scope.listWidget = null;
                $scope.listItemTemplate = '<p class="list-item">{{dataItem.number}}.{{dataItem.title}}</p>';
    
                $scope.dataSource = [
                    {number: 1, title: 'first title'},
                    {number: 2, title: 'second title'}
                ];
    
                $scope.clickToChangeSingleItem = function() {
                    $scope.$apply(function() {
                        $scope.dataSource[0].title = 'first title changed';
                        $scope.dataSource[0].title = 'first title changed';
                    })
                };
            }]);
    
            var markup = '<div ng-controller="MyListCtrl"><div kendo-listview="listWidget" k-data-source="dataSource" k-template="listItemTemplate"></div></div>';
            Mocha.fixture.html(markup);
        },
        function() {
            Mocha.fixture.find('[data-role=listview]').scope().clickToChangeSingleItem();
            assert.equal(Mocha.fixture.find(".list-item:eq(0)").html(), "1.first title changed");
        });
    
        ngTest("updates when the underlying data is pushed in", 1,
        function() {
            angular.module('kendo.tests')
            .controller('MyListCtrl', ['$scope', function ($scope) {
    
                $scope.listWidget = null;
                $scope.listItemTemplate = '<p class="list-item">{{dataItem.number}}.{{dataItem.title}}</p>';
    
                $scope.dataSource = [
                    {number: 1, title: 'first title'},
                    {number: 2, title: 'second title'}
                ];
    
                $scope.addItem = function() {
                    $scope.$apply(function() {
                        $scope.dataSource.push({number: 3, title: 'third title'});
                    })
                };
            }]);
    
            var markup = '<div ng-controller="MyListCtrl"><div kendo-listview="listWidget" k-data-source="dataSource" k-template="listItemTemplate"></div></div>';
            Mocha.fixture.html(markup);
        },
        function() {
            Mocha.fixture.find('[data-role=listview]').scope().addItem();
            assert.equal(Mocha.fixture.find(".list-item:eq(2)").html(), "3.third title");
        });
        */
    });
}());
