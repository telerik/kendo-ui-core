// models / data
var items = new kendo.data.DataSource({
    schema: { model: {} },
    transport: { read: { url: "menu.json", dataType: "json" } }
});

var cart = kendo.observable({
    contents: [],
    cleared: false,

    contentsCount: function() {
        return this.get("contents").length;
    },

    add: function(item) {
        var found = false;

        this.set("cleared", false);

        for (var i = 0; i < this.contents.length; i ++) {
            var current = this.contents[i];
            if (current.item === item) {
                current.set("quantity", current.get("quantity") + 1);
                found = true;
                break;
            }
        }

        if (!found) {
            this.contents.push({ item: item, quantity: 1 });
        }
    },

    remove: function(item) {
        for (var i = 0; i < this.contents.length; i ++) {
            var current = this.contents[i];
            if (current === item) {
                this.contents.splice(i, 1);
                break;
            }
        }
    },

    empty: function() {
        var contents = this.get("contents");
        contents.splice(0, contents.length);
    },

    clear: function() {
        var contents = this.get("contents");
        contents.splice(0, contents.length);
        this.set("cleared", true);
    }
});

var layoutModel = kendo.observable({
    cart: cart,

    cartContentsClass: function() {
        return this.cart.contentsCount() > 0 ? "active" : "empty";
    },

    removeFromCart: function(e) {
        this.get("cart").remove(e.data);
    },

    emptyCart: function() {
        cart.empty();
    },

    itemPrice: function(cartItem) {
        return kendo.format("{0:c}", cartItem.item.price);
    },

    totalPrice: function() {
        var price = 0,
            contents = this.get("cart").get("contents"),
            length = contents.length,
            i = 0;

        for (; i < length; i ++) {
            price += parseInt(contents[i].item.price) * contents[i].quantity;
        }

        return kendo.format("{0:c}", price);
    }
});

var indexModel = kendo.observable({
    items: items,
    cart: cart,

    addToCart: function(e) {
        cart.add(e.data);
    },

    proceed: function(e) {
        this.get("cart").clear();
        sushi.navigate("/");
    }
});

var detailModel = kendo.observable({
    current: {},
    imgUrl: function() {
        return "http://demos.kendoui.com/sushi/content/images/200/" + this.get("current").image
    },

    setCurrent: function(itemID) {
        var item = items.get(itemID),
            current = this.get("current");

        current.set("name", item.name);
        current.set("description", item.description);
        current.set("image", item.image);
        current.set("id", item.id);
    }
});

// Views and layouts
var layout = new kendo.Layout("layout-template", { model: layoutModel });
var index = new kendo.View("index-template", { model: indexModel });
var checkout = new kendo.View("checkout-template");
var detail = new kendo.View("detail-template", { model: detailModel });

var sushi = new kendo.Router({
    init: function() {
        layout.render("#application");
    }
});

// Routing
sushi.route("/", function() {
    layout.showIn("#content", index);
});

sushi.route("/checkout", function() {
    layout.showIn("#content", checkout);
});

sushi.route("/menu/:id", function(itemID) {
    items.fetch(function(e) {
        detailModel.setCurrent(itemID);
        layout.showIn("#content", detail);
    });
});

$(function() {
    sushi.start();
});
