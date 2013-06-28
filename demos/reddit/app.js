var PAGE_SIZE = 25, firstRun = true,
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

// var ds = new kendo.data.DataSource({
//     transport: {
//         read: function(options) {
// 
//             var results = [], data = options.data;
//             for (var i = data.skip; i < data.skip + data.take; i ++) {
//                 results.push({ foo: i });
//             }
//             setTimeout(function(){
//                 options.success(results);
//             }, 4000);
//         }
//     },
//     pageSize: 36,
//     serverPaging: true,
//     schema: {
//         total: function() { return 100000; }
//     }
// });

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
        window.open(url, "_detail");
    }
}

function resetDetail(e) {
    var element = e.view.element;

    element.find(".detail-text").empty();
    element.find("img").attr("src", '');
    app.hideLoading();
}

function renderDetail(e) {
    var view = e.view,
        id = view.params.id,
        element = view.element,
        template = kendo.template("#=data.title#<br/><br/><span>by <a target='_blank' href='http://www.reddit.com/user/#=data.author#'>#=data.author#</a> | <a target='_blank' href='http://www.reddit.com#=data.permalink#'>#=data.num_comments# comments</a></span>");

    app.showLoading();
    $.ajax('http://reddit.com/api/info.json', {
        data: { id: id },
        dataType: 'jsonp',
        jsonp: 'jsonp',
        success: function(data) {
            data = data.data.children[0].data;

            var url = data.url,
                text = element.find(".detail-text"),
                img = element.find('img');

            if(!imgExtensionRegex.test(url)) {
                url += '.jpg';
            }

            text.html(template(data));
            kendo.fx(text).fadeIn().play();

            img.css('visibility', 'hidden').attr('src', url).one('load', function() {
                view.element.find(".detail-image").data("kendoMobileScroller").zoomOut();
                img.css({
                    'visibility': 'visible',
                    'display': 'none'
                }).width("100%");
                app.hideLoading();

                kendo.fx(img).fadeIn().play();
            });
        }
    });
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

function showApp() {
    if (firstRun) {
        setTimeout(function () { kendo.fx(".splash").fadeOut().duration(400).play() }, 1000);
        firstRun = false;
    }
}

function canvasInit(e) {
    canvasScrollView = $("#canvas-scrollview").kendoMobileVirtualScrollView({
        contentHeight: 500,
        dataSource: canvasDataSource,
        batchSize: 6,
        template: kendo.template($("#canvas-template").html()),
        emptyTemplate: kendo.template($("#empty-template").html()),
        changed: updateSrc
    }).data("kendoMobileVirtualScrollView");

    canvasScrollView.element.find(".virtual-page").kendoTouch({
        tap: function (e) {
            var tile = $(e.event.target).closest("div.tile"),
                offset = tile.data("offset");

            app.navigate("#canvas-detail?offset=" + offset);
        }
    });
}

function canvasShow(e) {
    var offset = parseInt(e.view.params.offset),
        canvasScrollView = $("#canvas-scrollview").data("kendoMobileVirtualScrollView");

    if(!isNaN(offset)) {
        canvasScrollView.scrollTo(offset);
    }
}

function goToCanvas(e) {
    var detailScrollView = $("#detail-scrollview").data("kendoMobileVirtualScrollView"),
        canvasScrollView = $("#canvas-scrollview").data("kendoMobileVirtualScrollView"),
        offset = detailScrollView.offset,
        canvasPage;

    canvasPage = Math.floor(offset / canvasScrollView.options.batchSize);
    app.navigate("#canvas?offset=" + canvasPage);
}

function canvasDetailInit(e) {
    $("#detail-scrollview").kendoMobileVirtualScrollView({
        dataSource: canvasDataSource,
        autoBind: false,
        template: kendo.template($("#canvas-detail-tmp").html())
    }).data("kendoMobileVirtualScrollView");
}

function canvasDetailShow(e) {
    var offset = parseInt(e.view.params.offset),
        detailScrollView = $("#detail-scrollview").data("kendoMobileVirtualScrollView");

    if(!isNaN(offset)) {
        detailScrollView.scrollTo(offset);
    }
}

function calculateOffset(dataItem) {
    var index = $("#canvas-scrollview").data("kendoMobileVirtualScrollView").buffer.buffer.indexOf(dataItem);
    //console.log("index ", index, " dataItem ", dataItem.foo);
    return index;
}

function updateSrc(e) {
    var element = e.element,
        images,
        image;

    element.find(".item-img").each(function(idx, item) {
        image = $("<img />");
        image.one("load", onImageLoad);
        image.attr("src", $(item).data("url"));

        //$(item).css("background-image", "url(" + $(item).data("url") + ")");
    });
}

function onImageLoad(e) {
    var element = $("[data-url='" + e.target.src + "']");
    element.css("background-image", "url(" + e.target.src + ")");
    element.addClass("loaded").removeClass("faded");
}

function createImage(data) {
    var domain = data.domain,
        subreddit = data.subreddit,
        thumbnail = data.thumbnail,
        url = data.url,
        imageTemplate = kendo.template('<div class="item-img faded" data-url="#= data #"></div>');

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

var app = new kendo.mobile.Application(document.body, { skin: 'flat' });
