var PAGE_SIZE = 36,
    imgurAlbumRegex = /http:\/\/imgur.com\/a\//,
    imgurGalleryRegex = /http:\/\/imgur.com\/gallery\//,
    imgurSingleRegex = /http:\/\/imgur.com\/.[^\/]/,
    imgExtensionRegex = /\.(png|jpg|gif|jpeg)$/i,
    DEFAULTIMAGEURL = "reddit-default.png";

var awwDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: 'http://www.reddit.com/r/aww.json',
            dataType: 'jsonp',
            jsonp: 'jsonp',
            cache: true
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
    return imgExtensionRegex.test(url) || (/http:\/\/(.+)?imgur.com\/.[^\/]+$/i).test(url);
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
}

function renderDetail(e) {
    var view = e.view,
        element = view.element,
        dataItem = awwDataSource.getByUid(view.params.id),
        url = dataItem.data.url;

        if(!imgExtensionRegex.test(url)) {
            url += '.jpg';
        };

    var img = element.find('img');
    img.css('visibility', 'hidden').attr('src', url).one('load', function() {
        img.css('visibility', 'visible');
        view.scroller.zoomOut();
    });
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

function canvasInit(e) {
    virtualScrollView = $("#canvas-scrollview").kendoMobileVirtualScrollView({
        contentHeight: 500,
        dataSource: awwDataSource,
        batchSize: 6,
        template: kendo.template($("#canvas-template").html()),
        emptyTemplate: kendo.template($("#empty-template").html()),
        changed: updateSrc
    }).data("kendoMobileVirtualScrollView");

    virtualScrollView.batchBuffer.one("reset", function (e) {
        virtualScrollView.trigger("changed", { element: virtualScrollView.pages[1].element });
    });

    virtualScrollView.element.find(".virtual-page").kendoTouch({
        tap: function (e) {
            var tile = $(e.event.target).closest("div.tile"),
                uid = tile.data("uid"),
                dataItem = awwDataSource.getByUid(uid);

            app.navigate("#canvas-detail");
        }
    });
}

function canvasDetailInit(e) {
    $("#detail-scrollview").kendoMobileVirtualScrollView({
        dataSource: awwDataSource,
        template: "<div data-uid='#:uid#' class='detailed-img'>#= createImage(data) #</div>",
        changed: updateSrc
    });
}

function updateSrc(e) {
    var element = e.element;

    element.find(".item-img").each(function(idx, item) {
        $(item).css("background-image", "url(" + $(item).data("url") + ")");
    });
}

function createImage(data) {
    var domain = data.domain,
        subreddit = data.subreddit,
        thumbnail = data.thumbnail,
        url = data.url,
        imageTemplate = kendo.template('<div class="item-img" style="background-image: url(' + DEFAULTIMAGEURL + ');" data-url="#= data #"></div>');

    if(url.match(imgExtensionRegex)) {
        return imageTemplate(url);
    }

    if(url.match(imgurAlbumRegex) || url.match(imgurGalleryRegex)) {
        return imageTemplate(DEFAULTIMAGEURL);
    }

    if(url.match(imgurSingleRegex)) {
        return imageTemplate(url.concat(".jpg"));
    }

    return imageTemplate(DEFAULTIMAGEURL);
}

var app = new kendo.mobile.Application(document.body, { skin: 'flat' });
