var os = kendo.support.mobileOS ,
    PAGE_SIZE = os ? ( os.tablet ? 40 : 26) : 80,
    imgurAlbumRegex = /http:\/\/imgur.com\/a\//,
    imgurGalleryRegex = /http:\/\/imgur.com\/gallery\//,
    imgurSingleRegex = /http:\/\/imgur.com\/.[^\/]/,
    imgExtensionRegex = /\.(png|jpg|gif|jpeg)$/i,
    DEFAULTIMAGEURL = "images/foxie.png",
    canvasScrollView;

var awwDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: 'http://www.reddit.com/r/aww.json',
            dataType: 'jsonp',
            jsonp: 'jsonp',
            cache: true
        },

        parameterMap: function(data, type) {
            if (data.skip > 0) { // requesting next page - asking for skip=0 means pull to refresh.
                var items = awwDataSource.data();
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
        model: { id: "data.name" },
        total: function() { return 100000; }
    }
});

var canvasDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: 'http://www.reddit.com/r/aww.json',
            dataType: 'jsonp',
            jsonp: 'jsonp',
            cache: true
        },

        parameterMap: function(data, type) {
            if (data.skip > 0) { // requesting next page - asking for skip=0 means pull to refresh.
                var items = canvasDataSource.data();
                data.after = items[items.length - 1].data.name;
            }

            data.limit = 36;
            return data;
        }
    },

    serverPaging: true,
    pageSize: 36,
    schema: {
        data: "data.children",
        total: function() { return 100000; }
    }
});

function isImage(url) {
    return imgExtensionRegex.test(url) || (/http:\/\/(.+)?imgur.com\/.[^\/]+$/i).test(url);
}

function showDetail(e) {
    if (e.target.is("a")) {
        return; // comments link
    }

    if (e.dataItem) {
        navigateTo(e.dataItem);
    }
}

function navigateTo(dataItem) {
    var url = dataItem.data.url;
    if (isImage(url)) {
        app.navigate("#detail?id=" + dataItem.data.name);
    } else {
        $("<a/>").attr("href", url)[0].click();
    }
}

function resetDetail(e) {
    var element = e.view.element;

    element.find(".detail-text").empty();
    element.find("img").attr("src", '');
    app.hideLoading();
}

var DETAIL_TEMPLATE = kendo.template("<div><p>#=data.title#</p><span>by <a target='_blank' href='http://www.reddit.com/user/#=data.author#'>#=data.author#</a> | <a target='_blank' href='http://www.reddit.com#=data.permalink#'>#=data.num_comments# comments</a></span></div>");

function displayDetail(element, item) {
    var url = item.url,
        text = element.find(".detail-text"),
        img = element.find('img');

    if(!imgExtensionRegex.test(url)) {
        url += '.jpg';
    }

    text.html(DETAIL_TEMPLATE(item));
    kendo.fx(text).fadeIn().play();

    img.css('visibility', 'hidden').attr('src', url).one('load', function() {
        element.find(".detail-image").data("kendoMobileScroller").zoomOut();
        img.css({
            'visibility': 'visible',
            'display': 'none'
        }).width("100%");
        app.hideLoading();

        kendo.fx(img).fadeIn().play();
    });
}

function fetchItem(id, callback) {
    $.ajax('http://reddit.com/api/info.json', {
        data: { id: id },
        dataType: 'jsonp',
        jsonp: 'jsonp',

        success: function(data) {
            callback(data.data.children[0].data);
        }
    });
}

function renderDetail(e) {
    var view = e.view,
        id = view.params.id,
        item = awwDataSource.get(id),
        element = view.element;

    app.showLoading();

    if (item) {
        displayDetail(element, item.data);
    } else {
        fetchItem(id, function(item) {
            displayDetail(element, item);
        });
    }
}

function renderThumbs(element) {
    element.find(".loading-thumb").each(function() {
        var thumb = $(this).data("thumb");
        if (thumb === "default") {
            thumb = DEFAULTIMAGEURL;
        } else {
            $(this).removeClass("loading-thumb");
        }
        $(this).addClass("thumb").css("backgroundImage", "url(" + thumb + ")");
    });
}

function canvasInit(e) {
    canvasScrollView = $("#canvas-scrollview").kendoMobileScrollView({
        dataSource: canvasDataSource,
        enablePager: false,
        itemsPerPage: 6,
        contentHeight: "100%",
        template: kendo.template($("#canvas-template").html()),
        change: updateSrc
    }).data("kendoMobileScrollView");

    canvasScrollView.element.find(".km-virtual-page").kendoTouch({
        tap: function (e) {
            var tile = $(e.event.target).closest("div.tile"),
                offset = tile.data("offset");

            app.navigate("#canvas-detail?offset=" + offset);
        }
    });
}

function canvasShow(e) {
    var offset = parseInt(e.view.params.offset),
        canvasScrollView = $("#canvas-scrollview").data("kendoMobileScrollView");

    if(!isNaN(offset)) {
        canvasScrollView.scrollTo(offset);
    }
}

function goToCanvas(e) {
    var detailScrollView = $("#detail-scrollview").data("kendoMobileScrollView"),
        canvasScrollView = $("#canvas-scrollview").data("kendoMobileScrollView"),
        offset = detailScrollView.page,
        canvasPage;

    canvasPage = Math.floor(offset / canvasScrollView.options.itemsPerPage);
    app.navigate("#canvas?offset=" + canvasPage, "overlay:up reverse");
}

function canvasDetailInit(e) {
    $("#detail-scrollview").kendoMobileScrollView({
        enablePager: false,
        contentHeight: "100%",
        dataSource: canvasDataSource,
        autoBind: false,
        template: kendo.template($("#canvas-detail-tmp").html()),
        change: function(e) {
            var title = e.data[0].data.title;
            this.view().element.find(".title-bar > p > span").text(title);
        }
    }).data("kendoMobileScrollView");
}

function canvasDetailShow(e) {
    var offset = parseInt(e.view.params.offset),
        detailScrollView = $("#detail-scrollview").data("kendoMobileScrollView");

    if(!isNaN(offset)) {
        detailScrollView.scrollTo(offset);
    }
}

function calculateOffset(dataItem) {
    var index = $("#canvas-scrollview").data("kendoMobileScrollView")._content.buffer.buffer.indexOf(dataItem);
    return index;
}


function urlProxy(url) {
    return "http://demos.telerik.com/kendo-ui/service/RedditImages?url=" + escape(url) + "&width=160&height=160";
}

function updateSrc(e) {
    var element = e.element,
        image;

    element.find(".item-img").each(function(idx, item) {
        var url = $(item).data("url");
        image = $("<img />");

        image.one("load", function() {
            $(item).css("background-image", "url(" + url + ")");
            $(item).addClass("loaded").removeClass("faded");
        });

        image.attr("src", url);
    });
}

function createImage(data) {
    var domain = data.domain,
        subreddit = data.subreddit,
        thumbnail = data.thumbnail,
        url = data.url,
        imageTemplate = kendo.template('<div class="item-img faded" data-url="#= urlProxy(data) #"></div>');

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

function createTile(data) {
    var url = data.url,
        imageTemplate = kendo.template('<div class="item-img" style="background-image: url(#= data #);"></div>'),
        nonImageTemplate = kendo.template('<div class="content"><p>Unable to load image<span>#= data #</span></p><a data-role="button" data-rel="external" href="#= data #" target="_blank">Open URL</a></div>');

    if(url.match(imgExtensionRegex)) {
        return imageTemplate(url);
    }

    if(url.match(imgurAlbumRegex) || url.match(imgurGalleryRegex)) {
        return nonImageTemplate(url);
    }

    if(url.match(imgurSingleRegex)) {
        return imageTemplate(url.concat(".jpg"));
    }

    return nonImageTemplate(url);
}

var app = new kendo.mobile.Application(document.body, {
    skin: "flat",
    init: function() {
        setTimeout(function() {
            kendo.fx(".splash").fadeOut().duration(700).play();
        }, 1000)
    }
});

function showAbout(e) {
    if (e.item.text() == "About") {
        $("#drawer").data("kendoMobileDrawer").hide();
        setTimeout( function () {
            kendo.mobile.application.navigate('#about');
        }, 230);
    }
}

function goBack() {
    history.back();
}
