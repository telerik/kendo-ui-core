(function($, undefined) {
    kendo.data.binders.srcPath = kendo.data.Binder.extend( {
        refresh: function() {
            var value = this.bindings["srcPath"].get();

            if (value) {
                $(this.element).attr("src", window.contentPath + "/images/200/" + value);
            }
        }
    });

    kendo.data.binders.format = kendo.data.Binder.extend( {
        refresh: function() {
            var value = this.bindings["format"].get();

            if (value) {
                $(this.element).text(kendo.toString(value, "c"));
            }
        }
    });

    kendo.data.binders.innerText = kendo.data.Binder.extend( {
        refresh: function() {
            var value = this.bindings["innerText"].get();

            if (value) {
                $(this.element).text("Item added to cart " + value + " times.");
            }
        }
    });

    //viewModel
    var viewModel = kendo.observable({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: window.contentPath + "/menu.json",
                    dataType: "json"
                }
            }
        }),
        added: [],
        currentItem: null,
        addToCart: addToCart,
        removeItem: removeItem,
        checkout: checkout,
        showCheckout: showCheckout,
        showLabel: showLabel,
        showTotal: showTotal
    });

    function showHomeView(e) {
        viewModel.dataSource.group([]);
        viewModel.dataSource.filter({ field: "featured", operator: "eq", value: true});
    }

    function showMenuView() {
        viewModel.dataSource.filter([]);
        viewModel.dataSource.group({field: "category"});
    }

    function showCartView() {
        viewModel.showCheckout();
    }

    function addToCart(e) {
        var item,
            ordered;

        if(e.data.id) {
            item = e.data;
        } else {
            item = this.get("currentItem");
        }

        ordered = item.get("ordered") || 0;
        ordered += 1;

        item.set("ordered", ordered);

        if (ordered === 1) {
            item.set("visibleMessage", true);
            this.added.push(item);
        }

        e.preventDefault();
    }

    function removeItem(e) {
        var item = e.data,
            index = viewModel.added.indexOf(item),
            currentView = app.view();

        item.set("ordered", 0);
        viewModel.added.splice(index, 1);

        currentView.scroller.reset();
        e.preventDefault();
    }

    function checkout(e) {
        var that = this,
            dataSourceData = this.dataSource.data(),
            length = dataSourceData.length;

        setTimeout(function () {
            for (idx = 0; idx < length; idx++) {
                dataSourceData[idx].set("ordered", 0);
            }

            that.set("added", []);
        }, 400);
    }

    function showCheckout(e) {
        var button = $("#checkout");

        if (this.added.length) {
            button.show();
        } else {
            button.hide();
        }
    }

    function showLabel() {
        return this.get("currentItem") && this.get("currentItem").get("ordered") > 0;
    }

    function showDetailsView(e) {
        var id = parseInt(e.view.params.id),
            item = viewModel.dataSource.get(id);

        viewModel.set("currentItem", item);
    }

    function showTotal() {
        var cartItems = this.get("added"),
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
            total += cartItems[idx].ordered * cartItems[idx].price;
        }
        return kendo.toString(total, "c");
    }

    $.extend(window, {
        showHomeView: showHomeView,
        showMenuView: showMenuView,
        showCartView: showCartView,
        showDetailsView: showDetailsView,
        viewModel: viewModel
    });
})(jQuery);
