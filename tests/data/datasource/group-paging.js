(function () {

    var data = [];
    var DataSource = kendo.data.DataSource;
    var timeout;
    var sampleRemoteResponse = {
        "Data": [{
            "Id": 1,
            "Name": "John Smith",
            "Salary": {
                "Amount": 2000
            }
        }, {
            "Id": 2,
            "Name": "Jane Rottencrotch",
            "Salary": {
                "Amount": 3000
            }
        }],
        "Total": 2
    };

    var sampleLocalData = [{
            "Id": 1,
            "Name": "John Smith",
            "Position" : "Forward",
            "Level": 5
        }, {
            "Id": 2,
            "Name": "Mbape",
            "Position" : "Forward",
            "Level": 7
        },{
            "Id": 3,
            "Name": "Messi",
            "Position" : "Forward",
            "Level": 10
        },{
            "Id": 4,
            "Name": "Xavi",
            "Position" : "Midfielder",
            "Level": 10
        },{
            "Id": 5,
            "Name": "Iniesta",
            "Position" : "Midfielder",
            "Level": 9
        },{
            "Id": 6,
            "Name": "Rio",
            "Position" : "Defender",
            "Level": 5
        },{
            "Id": 7,
            "Name": "Maldini",
            "Position" : "Defender",
            "Level": 10
        },
        {
            "Id": 8,
            "Name": "Bonuci",
            "Position" : "Defender",
            "Level": 9.5
        },
        {
            "Id": 9,
            "Name": "Neuer",
            "Position" : "Goalkeeper",
            "Level": 10
        },
        {
            "Id": 10,
            "Name": "Courtois",
            "Position" : "Goalkeeper",
            "Level": 9
        }
    ];
    var sampleGroupedRemoteResponse = {
        "Data": [{
                "Key": "67, avenue de l-Europe",
                "ItemCount": 4,
                "HasSubgroups": true,
                "Member": "ShipAddress",
                "SubgroupCount": 1,
                "Aggregates": {

                },
                "Items": null
            },
            {
                "Key": "67, rue des Cinquante Otages",
                "ItemCount": 4,
                "HasSubgroups": true,
                "Member": "ShipAddress",
                "SubgroupCount": 1,
                "Aggregates": {

                },
                "Items": null
            },
            {
                "Key": "722 DaVinci Blvd.",
                "ItemCount": 3,
                "HasSubgroups": true,
                "Member": "ShipAddress",
                "SubgroupCount": 1,
                "Aggregates": {

                },
                "Items": null
            }
        ],
        "Total": 89,
        "AggregateResults": null,
        "Errors": null
    };

    describe("data source group paging", function () {
        beforeEach(function () {
            jasmine.clock().install();
            timeout = window.setTimeout;
            window.setTimeout = function (callback) {
                callback();
            };
        });
        afterEach(function () {
            window.setTimeout = timeout;
            jasmine.clock().uninstall();
        });

        function generateData(startIndex, endIndex) {
            var data = [];

            for (var i = startIndex; i < endIndex; i++) {
                data.push({
                    OrderID: i,
                    ContactName: "Contact " + i,
                    ShipAddress: "Ship Address " + i % 20
                });
            }

            return data;
        }

        function remoteDataSource(callback, options) {
            callback = callback || $.noop;
            var total = (options || {}).total || 10000,
                dataSource = new kendo.data.DataSource($.extend(true, {}, {
                    serverPaging: options.serverPaging,
                    serverGrouping: options.serverGrouping,
                    groupPaging: options.groupPaging,
                    transport: {
                        read: function (readOptions) {
                            var take = options.serverPaging ? readOptions.data.take : total;
                            var skip = options.serverPaging ? readOptions.data.skip : 0;
                            var data = generateData(skip, Math.min(skip + take, total));

                            callback();
                            readOptions.success(data);
                        }
                    },
                    schema: {
                        total: function () {
                            return total;
                        },
                        model: {
                            fields: {
                                OrderID: {
                                    type: "number"
                                },
                                ContactName: {
                                    type: "string"
                                },
                                ShipAddress: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    pageSize: options.pageSize || 16,
                    group: options.group || []
                }, options || {}));

            dataSource._total = total;
            return dataSource;
        }

        it("the count of the returned groups equals the page size", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource.read();

            assert.equal(dataSource.view().length, 16);
        });

        it("when group paging is enabled, groups should have uids", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource.read();

            assert.isOk(typeof dataSource.view()[0].uid !== 'undefined');
        });

        it("groupAllData is called to group the data when groupPaging is enabled and serverPaging is disabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            var groupAllDataStub = stub(kendo.data.Query.prototype, {
                groupAllData: kendo.data.Query.prototype.groupAllData
            });
            dataSource.read();

            assert.equal(groupAllDataStub.calls("groupAllData"), 1);
        });

        it("_isGroupPaged method returns true when dataSource is grouped and groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource.read();

            assert.isOk(dataSource._isGroupPaged());
        });

        it("_isGroupPaged method returns false when dataSource is not grouped and groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                groupPaging: true
            });

            dataSource.read();

            assert.isNotOk(dataSource._isGroupPaged());
        });

        it("_isServerGroupPaged method returns true when dataSource is server grouped and groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: true,
                serverGrouping: true,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource.read();

            assert.isOk(dataSource._isServerGroupPaged());
        });

        it("_isServerGroupPaged method returns false when dataSource is not grouped and groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: true,
                serverGrouping: true,
                groupPaging: true
            });

            dataSource.read();

            assert.isNotOk(dataSource._isServerGroupPaged());
        });

        it("_addRange does not call _flatData when groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            var flatDataStub = stub(dataSource, {
                _flatData: dataSource._flatData
            });
            dataSource._addRange(dataSource._observe(generateData(0, 10)));

            assert.equal(flatDataStub.calls("_flatData"), 0);
        });

        it("ranges have outerStart and outerEnd fields when groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource._addRange(dataSource._observe(generateData(0, 10)));

            assert.isOk(typeof dataSource._ranges[0].outerStart != "undefined");
            assert.isOk(typeof dataSource._ranges[0].outerEnd != "undefined");
        });

        it("_addRange calls _updateOuterRangesLength when groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            var updateOuterRangesLengthStub = stub(dataSource, {
                _updateOuterRangesLength: dataSource._updateOuterRangesLength
            });
            dataSource._addRange(dataSource._observe(generateData(0, 10)));

            assert.equal(updateOuterRangesLengthStub.calls("_updateOuterRangesLength"), 1);
        });

        it("_params includes a groupPaging parameter if groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            var params = dataSource._params();

            assert.isOk(typeof params.groupPaging != "undefined");
        });

        it("_params does not include a groupPaging parameter if groupPaging is not enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                }
            });

            var params = dataSource._params();

            assert.isNotOk(typeof params.groupPaging != "undefined");
        });

        it("_process calls _setView method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            var setViewStub = stub(dataSource, {
                _setView: $.noop
            });
            dataSource._process(dataSource._observe(generateData(0, 10)));

            assert.equal(setViewStub.calls("_setView"), 1);
        });

        it("_setView calls _isGroupPaged method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            var groupPagedStub = stub(dataSource, {
                _isGroupPaged: $.noop
            });
            dataSource._setView(dataSource._queryProcess(dataSource._observe(generateData(0, 10))), {});

            assert.equal(groupPagedStub.calls("_isGroupPaged"), 1);
        });

        it("_setView calls _isServerGroup method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var serverGroupedStub = stub(dataSource, {
                _isServerGrouped: $.noop,
                view: $.noop,
                _addRange: $.noop,
                _observe: $.noop
            });
            var result = dataSource._queryProcess(dataSource._observe(generateData(0, 10)));
            dataSource._setView(result, {});

            assert.equal(serverGroupedStub.calls("_isServerGrouped"), 1);
        });

        it("_setView calls view method once", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var viewStub = stub(dataSource, {
                _isServerGrouped: $.noop,
                view: $.noop,
                _addRange: $.noop,
                _observe: $.noop
            });
            var result = dataSource._queryProcess(dataSource._observe(generateData(0, 10)));
            dataSource._setView(result, {});

            assert.equal(viewStub.calls("view"), 1);
        });

        it("_setView calls _updateOuterRangesLength method once when action is either page, expandGroup or collapseGroup", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var updateOuterRangesLengthStub = stub(dataSource, {
                _isServerGrouped: $.noop,
                _updateOuterRangesLength: $.noop,
                view: $.noop,
                _addRange: $.noop,
                _observe: $.noop
            });
            var result = dataSource._queryProcess(dataSource._observe(generateData(0, 10)));
            dataSource._setView(result, {}, {
                action: 'page'
            });

            assert.equal(updateOuterRangesLengthStub.calls("_updateOuterRangesLength"), 1);
        });

        it("_setView calls _addRange method once when action is neither page, expandGroup or collapseGroup", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var setViewStub = stub(dataSource, {
                _isServerGrouped: $.noop,
                _updateOuterRangesLength: $.noop,
                view: $.noop,
                _addRange: $.noop,
                _observe: $.noop
            });
            var result = dataSource._queryProcess(dataSource._observe(generateData(0, 10)));
            dataSource._setView(result, {});

            assert.equal(setViewStub.calls("_addRange"), 1);
        });

        it("query calls _setView method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var setViewStub = stub(dataSource, {
                _setView: $.noop
            });
            dataSource.query({});

            assert.equal(setViewStub.calls("_setView"), 1);
        });

        it("_findRange calls _findGroupedRange method when groupPaging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var dataSourceStub = stub(dataSource, {
                _findGroupedRange: $.noop
            });
            dataSource.read();
            dataSource._findRange(1, 10);

            assert.equal(dataSourceStub.calls("_findGroupedRange"), 1);
        });

        it("_findRange does not call _findGroupedRange method when groupPaging is not enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                }
            });
            var dataSourceStub = stub(dataSource, {
                _findGroupedRange: $.noop
            });
            dataSource.read();
            dataSource._findRange(1, 10);

            assert.equal(dataSourceStub.calls("_findGroupedRange"), 0);
        });

        it("page calls range when group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var dataSourceStub = stub(dataSource, {
                range: $.noop
            });
            dataSource.read();
            dataSource.page(2);

            assert.equal(dataSourceStub.calls("range"), 1);
        });

        it("page does not call range when group paging is not enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                }
            });
            var dataSourceStub = stub(dataSource, {
                range: $.noop
            });
            dataSource.read();
            dataSource.page(2);

            assert.equal(dataSourceStub.calls("range"), 0);
        });

        it("totalPages calls groupsTotal when group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var dataSourceStub = stub(dataSource, {
                groupsTotal: $.noop
            });
            dataSource.read();
            dataSource.totalPages();

            assert.equal(dataSourceStub.calls("groupsTotal"), 1);
        });

        it("totalPages does not call groupsTotal when group paging is not enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                }
            });
            var dataSourceStub = stub(dataSource, {
                groupsTotal: $.noop
            });
            dataSource.read();
            dataSource.totalPages();

            assert.equal(dataSourceStub.calls("groupsTotal"), 0);
        });

        it("_findGroupedRange returns if taken items exceeds or equals take", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];
            dataSource._findGroupedRange([{}], result, {
                taken: 10,
                take: 10
            });

            assert.isOk(result.length === 0);
        });

        it("_findGroupedRange should populate the result parameter with items which count equals the take value", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];
            dataSource.read();

            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10
            });
            assert.isOk(result.length === 10);
        });

        it("_findGroupedRange should skip items when necessary", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];

            dataSource.read();
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 10,
                skipped: 0,
                taken: 0,
                take: 10
            });
            assert.isOk(result[0].value === 'Ship Address 18');
        });

        it("_findGroupedRange should shift the items when there is an expanded group", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10
            });
            assert.equal(result.length, 6);
        });

        it("_findGroupedRange calls _isServerGroupPaged when there is an expanded group", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];
            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: $.noop
            });

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10
            });
            assert.isTrue(dataSourceStub.calls('_isServerGroupPaged') > 0);
        });

        it("_findGroupedRange should set the excludeHeader field of groups which have their first item skipped", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            dataSource._groupsState[dataSource._ranges[0].data[4].uid] = true;
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 10,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            });
            assert.equal(result[0].excludeHeader, true);
        });

        it("_findGroupedRange should recursively execute itself in case a group with subgroups is expanded", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });
            var result = [];
            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                _findGroupedRange: dataSource._findGroupedRange
            });

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;

            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            });
            assert.equal(dataSourceStub.calls("_findGroupedRange"), 2);
        });

        it("_findGroupedRange inserts the group items which belong to the current view in the currentItems property of the group", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10
            });
            assert.equal(result[0].currentItems.length, 5);
        });

        it("_findGroupedRange should call getGroupItems when dataSource is server grouped and group items are not available", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var result = [];
            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                _findGroupedRange: dataSource._findGroupedRange,
                getGroupItems: $.noop
            });

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            dataSource._ranges[0].data[0].items = [];
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            });
            assert.equal(dataSourceStub.calls("getGroupItems"), 1);
        });

        it("_findGroupedRange should set the _fetchingGroupItems flag to true when requesting group items", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var result = [];
            stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                _findGroupedRange: dataSource._findGroupedRange,
                getGroupItems: $.noop
            });

            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            dataSource._ranges[0].data[0].items = [];
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            });
            assert.isTrue(dataSource._fetchingGroupItems);
        });

        it("getGroupItems should call _composeItemsFilter method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };
            var dataSourceStub = stub(dataSource, {
                _composeItemsFilter: $.noop
            });
            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            dataSource.getGroupItems(group, options);
            assert.equal(dataSourceStub.calls("_composeItemsFilter"), 1);
        });

        it("getGroupItems should call findSubgroups method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };
            var dataSourceStub = stub(dataSource, {
                findSubgroups: $.noop
            });
            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            dataSource.getGroupItems(group, options);
            assert.equal(dataSourceStub.calls("findSubgroups"), 1);
        });

        it("getGroupItems should call _queueRequest method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _queueRequest: dataSource._queueRequest
            });

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            dataSource.getGroupItems(group, options);
            assert.equal(dataSourceStub.calls("_queueRequest"), 1);
        });


        it("getGroupItems should call _groupItemsSuccessHandler method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _groupItemsSuccessHandler: dataSource._groupItemsSuccessHandler
            });

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            dataSource.getGroupItems(group, options);
            assert.equal(dataSourceStub.calls("_groupItemsSuccessHandler"), 1);
        });

        it("getGroupItems should call _dequeueRequest method when requestStart is prevented", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _dequeueRequest: dataSource._dequeueRequest
            });

            dataSource.bind('requestStart', function (e) {
                e.preventDefault();
            });

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            dataSource.getGroupItems(group, options);
            assert.equal(dataSourceStub.calls("_dequeueRequest"), 1);
        });

        it("getGroupItems should trigger requestStart event", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var triggered = false;
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };

            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            group.items = [];
            dataSource.bind('requestStart', function () {
                triggered = true;
            });

            dataSource.getGroupItems(group, options);
            assert.isOk(triggered);
        });

        it("getGroupItems calculates correct page with single level of grouping", function () {
            var dataSource = remoteDataSource(null, {
                total: 1000,
                pageSize: 25,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var result = [];
            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                }
            });

            dataSource.read();
            var group = dataSource._ranges[0].data[0];
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;
            for (var index = 25; index < 50; index++) {
                group.items[index].notFetched = true;;
            }

            dataSource._queueRequest = function (data) {
                assert.equal(data.page, 2);
            }
            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 20,
                skipped: 0,
                taken: 0,
                take: 25,
                includeParents: true
            });
        });

        it("getGroupItems should trigger requestEnd event", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var triggered = false;
            var options = {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10,
                includeParents: true
            };

            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            group.items = [];
            dataSource.bind('requestEnd', function () {
                triggered = true;
            });

            dataSource.getGroupItems(group, options);
            assert.isOk(triggered);
        });

        it("_groupItemsSuccessHandler should call _timeStamp method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _timeStamp: dataSource._timeStamp
            });

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            dataSource._groupItemsSuccessHandler(group, 0, 10);
            assert.equal(dataSourceStub.calls("_timeStamp"), 1);
        });

        it("_groupItemsSuccessHandler should return a function", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            assert.equal(typeof dataSource._groupItemsSuccessHandler(group, 0, 10), 'function');
        });

        it("_groupItemsSuccessHandler returned function should call _dequeueRequest method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _dequeueRequest: dataSource._dequeueRequest
            });

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleRemoteResponse);
            assert.equal(dataSourceStub.calls("_dequeueRequest"), 1);
        });

        it("_groupItemsSuccessHandler returned function should call the parse method of the reader", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var readerStub = stub(dataSource.reader, {
                parse: dataSource.reader.parse
            });

            var group = dataSource._ranges[0].data[0];
            group.items = [];

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleRemoteResponse);
            assert.equal(readerStub.calls("parse"), 1);
        });

        it("_groupItemsSuccessHandler returned function should call the groups method of the reader when the response is grouped", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var readerStub = stub(dataSource.reader, {
                groups: dataSource.reader.groups
            });

            var group = dataSource._ranges[0].data[0];
            group.hasSubgroups = true;

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleGroupedRemoteResponse);
            assert.equal(readerStub.calls("groups"), 1);
        });

        it("_groupItemsSuccessHandler returned function should call the data method of the reader when the response is not grouped", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var readerStub = stub(dataSource.reader, {
                data: dataSource.reader.data
            });

            var group = dataSource._ranges[0].data[0];

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleRemoteResponse);
            assert.equal(readerStub.calls("data"), 1);
        });

        it("_groupItemsSuccessHandler returned function should call the _updateRangePristineData method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _updateRangePristineData: dataSource._updateRangePristineData
            });

            var group = dataSource._ranges[0].data[0];

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleRemoteResponse);
            assert.equal(dataSourceStub.calls("_updateRangePristineData"), 1);
        });

        it("_groupItemsSuccessHandler returned function should update the _fetchingGroupItems field", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            group.hasSubgroups = true;

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);

            dataSource._fetchingGroupItems = true;

            handler(sampleGroupedRemoteResponse.Data);
            assert.isFalse(dataSource._fetchingGroupItems);
        });

        it("_groupItemsSuccessHandler returned function should call the _updateOuterRangesLength method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _updateOuterRangesLength: dataSource._updateOuterRangesLength,
                _setView: $.noop
            });

            var group = dataSource._ranges[0].data[0];

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleRemoteResponse);
            assert.equal(dataSourceStub.calls("_updateOuterRangesLength"), 1);
        });

        it("_groupItemsSuccessHandler returned function should call the range method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                range: dataSource.range,
                _setView: $.noop
            });

            var group = dataSource._ranges[0].data[0];

            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);
            handler(sampleRemoteResponse);
            assert.equal(dataSourceStub.calls("range"), 1);
        });

        it("_groupItemsSuccessHandler returned function should trigger the change event", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });
            var triggered = false;

            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            var handler = dataSource._groupItemsSuccessHandler(group, 0, 10);

            dataSource.bind('change', function(){
                triggered = true;
            });
            handler(sampleRemoteResponse);
            assert.isTrue(triggered);
        });

        it("findSubgroups should return the subgroups of a group", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            var subgroups = dataSource.findSubgroups({field: 'ShipAddress'});
            assert.equal(subgroups[0].field, 'ContactName');
        });

        it("_composeItemsFilter should return a filter object", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            var result = dataSource._composeItemsFilter({field: 'ShipAddress'});
            assert.isTrue(typeof result.logic !== 'undefined');
            assert.isTrue(typeof result.filters !== 'undefined');
        });

        it("_composeItemsFilter should return a filter with 'and' logic", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                filter: { filters: [{ value:"ContactName", operator:"eq", field:"test"}], logic: "or" },
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            var result = dataSource._composeItemsFilter({field: 'ShipAddress', value:'test'});
            assert.equal(result.logic, "and");
        });

        it("_composeItemsFilter should create a filter object which contains the values of the parent groups", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            var result = dataSource._composeItemsFilter({field: 'ShipAddress', value:'test'}, [{field: 'ContactName', value: 'test'}]);
            assert.isTrue(result.filters.length === 2);
        });

        it("_updateRangePristineData should call the _containsSubGroup method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _containsSubGroup: dataSource._containsSubGroup
            });

            var group = dataSource._ranges[0].data[0];
            var subgroup = group.items[0];

            var newItem = $.extend(true, {},subgroup.items[0]);

            newItem.OrderID = 99999;
            newItem.ShipAddress = "Ship Address 99999";
            newItem.ContactName = "Contact Name 99999";
            subgroup.items.push(newItem);

            dataSource._updateRangePristineData(subgroup);

            assert.equal(dataSourceStub.calls("_containsSubGroup"), 1);
        });

        it("_updateRangePristineData should call the _cloneGroup method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _cloneGroup: dataSource._cloneGroup
            });

            var group = dataSource._ranges[0].data[0];
            var subgroup = group.items[0];
 
            var newItem = $.extend(true, {},subgroup.items[0]);

            newItem.OrderID = 99999;
            newItem.ShipAddress = "Ship Address 99999";
            newItem.ContactName = "Contact Name 99999";
            subgroup.items.push(newItem);

            dataSource._updateRangePristineData(subgroup);

            assert.isTrue(dataSourceStub.calls("_cloneGroup") > 0);
        });

        it("_updateRangePristineData should corectly update the pristine model", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }, {
                    field: 'ContactName'
                }],
                groupPaging: true
            });

            dataSource.read();

            var group = dataSource._ranges[0].data[0];
            var subgroup = group.items[0];
 
            var newItem = $.extend(true, {},subgroup.items[0]);

            newItem.OrderID = 99999;
            newItem.ShipAddress = "Ship Address 99999";
            newItem.ContactName = "Contact Name 99999";
            subgroup.items.push(newItem);

            dataSource._updateRangePristineData(subgroup);

            assert.isTrue(dataSource._ranges[0].pristineData[0].items[0].items[1].ShipAddress === newItem.ShipAddress);
        });

        it("page should call _isGroupPaged method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _isGroupPaged: $.noop,
                _query: $.noop,
                totalPages: function(){
                    return 2;
                }
            });

            dataSource.page(2);
            assert.equal(dataSourceStub.calls("_isGroupPaged"), 1);
        });

        it("page should call range method when group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                range: $.noop,
                totalPages: function(){
                    return 2;
                }
            });

            dataSource.page(2);
            assert.equal(dataSourceStub.calls("range"), 1);
        });

        it("groupsTotal should call _isServerGrouped method ", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _isServerGrouped: $.noop
            });

            dataSource.groupsTotal();
            assert.equal(dataSourceStub.calls("_isServerGrouped"), 1);
        });

        it("groupsTotal should call total method when server group paging is enabled and _serverGroupsTotal is not defined", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _isServerGrouped: function(){
                    return true;
                },
                total: $.noop
            });

            dataSource.groupsTotal();
            assert.equal(dataSourceStub.calls("total"), 1);
        });

        it("groupsTotal should return _serverGroupsTotal when it has a value and server group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();
            dataSource._serverGroupsTotal = 10;

            stub(dataSource, {
                _isServerGrouped: function(){
                    return true;
                }
            });
            assert.equal(dataSource.groupsTotal(), 10);
        });

        it("groupsTotal should call _calculateGroupsTotal method when client group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _calculateGroupsTotal: $.noop
            });

            dataSource.groupsTotal();
            assert.equal(dataSourceStub.calls("_calculateGroupsTotal"), 1);
        });

        it("_calculateGroupsTotal should call groupCount method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                groupCount: $.noop
            });

            dataSource._calculateGroupsTotal(dataSource._ranges[0].data);
            assert.equal(dataSourceStub.calls("groupCount"), dataSource._ranges[0].data.length);
        });

        it("totalPages should call _isGroupPaged method", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _isGroupPaged: $.noop
            });

            dataSource.totalPages();
            assert.equal(dataSourceStub.calls("_isGroupPaged"), 1);
        });

        it("totalPages should call groupsTotal method when group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _isGroupPaged: function(){
                    return true;
                },
                groupsTotal: $.noop
            });

            dataSource.totalPages();
            assert.equal(dataSourceStub.calls("_isGroupPaged"), 1);
        });

        it("_findRange should call _isGroupPaged method ", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _isGroupPaged: $.noop
            });

            dataSource._findRange(0,10);
            assert.equal(dataSourceStub.calls("_isGroupPaged"), 1);
        });

        it("_findRange should call _findGroupedRange method when group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _findGroupedRange: dataSource._findGroupedRange
            });

            dataSource._findRange(0,10);
            assert.equal(dataSourceStub.calls("_findGroupedRange"), 1);
        });

        it("_findRange should call _calculateGroupsTotal method when group paging is enabled", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: [{
                    field: 'ShipAddress'
                }],
                groupPaging: true
            });

            dataSource.read();

            var dataSourceStub = stub(dataSource, {
                _calculateGroupsTotal: dataSource._calculateGroupsTotal
            });

            dataSource._findRange(0,10);
            assert.equal(dataSourceStub.calls("_calculateGroupsTotal"), 1);
        });


        it("_updateOuterRangesLength should ignore whether group hedear is shown or not", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var firstGroup;

            dataSource.read();
            firstGroup = dataSource._ranges[0].data[0];
            firstGroup.excludeHeader = true;
            dataSource._groupsState[firstGroup.uid] = true;
            dataSource._updateOuterRangesLength();

            assert.equal(dataSource._ranges[0].outerEnd, 25);
        });


        it("range should work correctly when ranges are missing", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: true,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource._addRange(dataSource._observe(sampleGroupedRemoteResponse.Data), 0);
            dataSource._addRange(dataSource._observe(sampleGroupedRemoteResponse.Data), 10);
            dataSource.groupsTotal = function(){
                return 13;
            };
            dataSource.range(10, 2, function(){
                assert.equal(dataSource.view().length, 2);
            }, "page");
        });

        it("range should work correctly when requested range is the only available and it is not the first one", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: true,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource._addRange(dataSource._observe(sampleGroupedRemoteResponse.Data), 10);
            dataSource.groupsTotal = function(){
                return 13;
            };
            dataSource.range(10, 2, function(){
                assert.equal(dataSource.view().length, 2);
            }, "page");
        });

        it("range should work correctly when requested data is from two ranges", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: true,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });

            dataSource._addRange(dataSource._observe(sampleGroupedRemoteResponse.Data), 0);
            dataSource._addRange(dataSource._observe(sampleGroupedRemoteResponse.Data), 3);
            dataSource.groupsTotal = function(){
                return 6;
            };
            dataSource.range(2, 3, function(){
                assert.equal(dataSource.view().length, 3);
            }, "page");
        });

        it("group method should reset the page when new group is added/removed and group paging is enabled", function() {
            var data = [{ age: 1 }, { age: 3 }, { age: 1 }];

            var dataSource = new DataSource({
                data: data,
                page: 1,
                pageSize: 2,
                groupPaging: true
            });
            dataSource.read();
            dataSource.page(2);
            dataSource.group({ field: "age" });

            assert.equal(dataSource.page(), 1);
        });

        it("_findGroupedRange should call _fetchGroupItems when proccessing a group with enabled server operations", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var result = [];
            dataSource.read();
            dataSource._groupsState[dataSource._ranges[0].data[0].uid] = true;

            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                _fetchGroupItems: function(){return true},
                getGroupItems: $.noop
            });

            dataSource._findGroupedRange(dataSource._ranges[0].data, result, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10
            });

            assert.equal(dataSourceStub.calls("_fetchGroupItems"), 1);
        });

        it("_fetchGroupItems should call getGroupItems when group items are not fetched", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            dataSource.read();
            var group = dataSource._ranges[0].data[0];
            group.items = null;

            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                getGroupItems: $.noop
            });
            dataSource._fetchGroupItems(group, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 10
            });

            assert.equal(dataSourceStub.calls("getGroupItems"), 1);
        });

        it("_fetchGroupItems should call getGroupItems when a group item is not yet fetched", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            dataSource.read();
            var group = dataSource._ranges[0].data[0];
            group.items[0].notFetched = true;

            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                getGroupItems: $.noop
            });
            dataSource._fetchGroupItems(group, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 3
            });

            assert.equal(dataSourceStub.calls("getGroupItems"), 1);
        });

        it("_fetchGroupItems should call _expandedSubGroupItemsCount", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            dataSource.read();
            var group = dataSource._ranges[0].data[0];
            group.items[0].notFetched = true;

            var dataSourceStub = stub(dataSource, {
                _isServerGroupPaged: function () {
                    return true;
                },
                getGroupItems: $.noop,
                _expandedSubGroupItemsCount: function () {
                    return 0;
                }
            });
            dataSource._fetchGroupItems(group, {
                skip: 0,
                skipped: 0,
                taken: 0,
                take: 3
            });

            assert.equal(dataSourceStub.calls("_expandedSubGroupItemsCount"), 1);
        });

        it("_expandedSubGroupItemsCount returns the correct count of expanded subgroups", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var data = new kendo.data.ObservableArray([
                { 
                    field: "foo", 
                    value: "boo", 
                    hasSubgroups: true,
                    subgroupCount: 1,
                    items: [
                        { 
                            field: "boo", 
                            value: "foo", 
                            hasSubgroups: true,
                            subgroupCount:1,
                            items: [
                                { 
                                    field: "moo", 
                                    value: "voo", 
                                    hasSubgroups: false,
                                    items: [
                                        {name: 'foo'}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]);

            dataSource._groupsState[data[0].uid] = true;
            dataSource._groupsState[data[0].items[0].uid] = true;
            dataSource._groupsState[data[0].items[0].items[0].uid] = true;

            var result = dataSource._expandedSubGroupItemsCount(data[0], 1);

            assert.equal(result, 2);
        });

        it("_expandedSubGroupItemsCount returns the correct count of expanded subgroups when there are expanded subgroups which are not part of the current sub range", function () {
            var dataSource = remoteDataSource(null, {
                total: 100,
                serverPaging: false,
                group: {
                    field: 'ShipAddress'
                },
                groupPaging: true
            });
            var data = new kendo.data.ObservableArray([
                { 
                    field: "foo", 
                    value: "boo", 
                    hasSubgroups: true,
                    subgroupCount: 1,
                    items: [
                        { 
                            field: "boo", 
                            value: "foo", 
                            hasSubgroups: true,
                            subgroupCount:1,
                            items: [
                                { 
                                    field: "moo", 
                                    value: "voo", 
                                    hasSubgroups: false,
                                    items: [
                                        {name: 'foo'}
                                    ]
                                }
                            ]
                        },
                        { 
                            field: "boo", 
                            value: "foo", 
                            hasSubgroups: true,
                            subgroupCount:1,
                            items: [
                                { 
                                    field: "moo", 
                                    value: "voo", 
                                    hasSubgroups: false,
                                    items: [
                                        {name: 'foo'}
                                    ]
                                }
                            ]
                        },
                        { 
                            field: "boo", 
                            value: "foo", 
                            hasSubgroups: true,
                            subgroupCount:1,
                            items: [
                                { 
                                    field: "moo", 
                                    value: "voo", 
                                    hasSubgroups: false,
                                    items: [
                                        {name: 'foo'}
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]);

            dataSource._groupsState[data[0].uid] = true;
            dataSource._groupsState[data[0].items[0].uid] = true;
            dataSource._groupsState[data[0].items[0].items[0].uid] = true;
            dataSource._groupsState[data[0].items[1].uid] = true;
            dataSource._groupsState[data[0].items[1].items[0].uid] = true;
            dataSource._groupsState[data[0].items[2].uid] = true;
            dataSource._groupsState[data[0].items[2].items[0].uid] = true;

            var result = dataSource._expandedSubGroupItemsCount(data[0], 4);

            assert.equal(result, 4);
        });

        it("ungrouping items removes groups from view and ranges", function () {
            var dataSource = new kendo.data.DataSource({
                pageSize: 5,
                groupPaging: true,
                group: [{
                    field: 'Position'
                }],
                data: sampleLocalData,
                schema: {
                    id: "ID"
                }
            });
            dataSource.read();
            var view = dataSource.view();

            assert.isOk(view[0].aggregates);
            assert.isOk(dataSource._ranges[0].data[0]);

            dataSource.group([]);

            view = dataSource.view();

            assert.isNotOk(view[0].aggregates);
            assert.isNotOk(dataSource._ranges.length);

        });
    });
}());