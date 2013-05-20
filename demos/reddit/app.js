var PAGE_SIZE = 40;

var awwDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: "http://www.reddit.com/r/aww.json",
            dataType: "jsonp",
            jsonp: "jsonp",
            cache: true,
        },

        parameterMap: function(data, type) {
            var items = awwDataSource.data();
            if (items.length) {
                data.after = items[items.length - 1].data.name;
            }

            data.limit = PAGE_SIZE;
            return data;
        }
    },

    serverPaging: true,
    pageSize: PAGE_SIZE,
    schema: {
        data: "data.children",
        total: function() { return 100000; }
    }
});

function renderThumbs(element) {
    element.find(".loading-thumb").each(function() {
        var thumb = $(this).data("thumb");
        if (thumb === "default") {
            thumb = "missing-thumb.png";
        }
        $(this).removeClass("loading-thumb").addClass("thumb").css("backgroundImage", "url(" + thumb + ")");
    });
}

function isImage(url) {
    return (/http:\/\/(.+)?imgur.com\/.[^\/]+$/i).test(url);
}

function showDetail(e) {
    var dataItem = e.dataItem;

    if (dataItem) {
        navigateTo(dataItem);
    }
}

function navigateTo(dataItem) {
    var url = dataItem.data.url;
    if (isImage(url)) {
        app.navigate("#detail?id=" + dataItem.uid);
    } else {
        window.open(url, "_detail");
    }
}

function resetDetail(e) {
    e.view.element.find("img").attr("src", '');
    e.view.scroller.reset();
}

function renderDetail(e) {
    var view = e.view,
        element = view.element,
        dataItem = awwDataSource.getByUid(view.params.id),
        url = dataItem.data.url;

        if(!/\.(png|jpg|gif|jpeg)$/.test(url)) {
            url += '.jpg';
        };

    element.find('img').attr('src', url);
    view.scroller.zoomOut();
}

function showThumbsOnScrollComplete(e) {
    var view = e.view;
    var renderThumbsForView = function() {
        renderThumbs(view.element);
    };

    view.scroller.bind('scrollEnd', renderThumbsForView);
    kendo.onResize(renderThumbsForView)
    awwDataSource.bind('change', renderThumbsForView);
}

var app = new kendo.mobile.Application(document.body, { skin: 'flat' });
