(function () {
    ngTestModule("ListView", {
        setup: function() { }
    });

    ngTest("re-renders when a single item is changed", 1,
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
                $scope.listWidget.dataSource.data()[0].set('title', 'first title changed');
            };
        }]);

        var markup = '<div ng-controller="MyListCtrl"><div kendo-listview="listWidget" k-data-source="dataSource" k-template="listItemTemplate"></div></div>';
        QUnit.fixture.html(markup);
    },
    function() {
        QUnit.fixture.find('[data-role=listview]').scope().clickToChangeSingleItem();
        equal(QUnit.fixture.find(".list-item:eq(0)").html(), "1.first title changed");
    });
})();
