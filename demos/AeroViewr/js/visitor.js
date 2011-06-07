(function($, window) {

    window.application.call(this);

    var visitor,
        slideshow = window.slideshow,
        searching = false,
        sliderValue = 0,
        data = window.data,
        loading = $("<div id='searchLoading' class='loading'>Loading ...</div>"),
        noimages = $("<div id='noimages' class='loading'>No images found</div>"),
        dataSource = data.dataSource({
            pageSize: computePageSize(120, true),
            serverSorting: true,
            dialect: {
                read: function(data) {
                    var params = {
                        text: $("#searchBox").val(),
                        extras: EXTRAS,
                        per_page: PAGESIZE
                    };

                    if (!$.support.cors) {
                        params.jsoncallback = "searchPhotos";
                    }

                    return flickr.searchParams(params);
                }
            },
            deserializer: searchDeserializer,
            jsoncallback: "searchPhotos"
        }),
        mostPopularDataSource = data.dataSource({
            dialect: {
                read: function(data) {
                    var params = {
                        extras: EXTRAS,
                        per_page: 100
                    };

                    if (!$.support.cors) {
                        params.jsoncallback = "mostPopularPhotos";
                    }

                    return flickr.mostPopularParams(params);
                }
            },
            deserializer: searchDeserializer,
            jsoncallback: "mostPopularPhotos"
        });

    function showCallouts() {
        var hints = $(".callout");

        hints.eq(1).css({ right: window.innerWidth - ($("#searchBox").position().left + $("#searchBox").width() / 2) * zoomFactor, left: 'auto' });

        hints.fadeIn("slow");

        var removeHints = function(e) {
            hints.fadeOut();
            $(document).unbind('mousedown touchstart', removeHints);
        };

        $(".i-hints").bind(kendo.support.touch ? 'touchend' : 'mousedown', function(e) {
            e.preventDefault();
            hints.fadeIn("slow");
            $(document).bind('mousedown touchstart', removeHints);
        });

        setTimeout( removeHints, 5000 );
        $(document).bind('mousedown touchstart', removeHints);
    }

    function showSelectedPhoto(ui) {
       $("#flatSearchPhotos").show();

       ui.element.parent().hide();
       $("#overlay").stop(true, true).fadeOut();

       setBigPhoto(ui.selectable.value().find("img"));

       dataSource.query({page: 1, pageSize: PAGESIZE});
       $("#viewslideshow").stop(true, true).fadeIn();
       if (!kendo.support.touch)
           $("#uploadphotos").stop(true, true).fadeIn();

       $("#backButton").text("Back to search results").data("currentView", "flatMostPopularPhotos");
    }

    function updatePlayIcon(playing) {
        return $("#viewslideshow").find(".p-icon")
                .toggleClass("i-pause", playing)
                .toggleClass("i-slideshow", !playing)
                .end()
                .find("em")
                .html(playing ? 'Pause' : 'Play').end();
    }

    function updatePageSize() {
        var isGrid = $("#mainTemplate").find("#grid").hasClass("currentView");
            listPageSize = computePageSize(imageSize.size),
            gridPageSize = computePageSize(120, true),

        dataSource.query({page: 1, pageSize: isGrid ? gridPageSize : listPageSize});
    }

    window.visitor = {
        hideExif: function() {
            var exifWindow = $("#exifWindow");
            if (exifWindow.length) {
                exifWindow.data("kendoWindow").close();
            }
        },
        mostPopular: function() {
            this.thumbList.append( $("#flatMostPopularPhotos").kendoListView({
                dataSource: mostPopularDataSource,
                template: template(IMAGESIZES[0]),
                dataBound: function() {
                    var li = this.element.find("li").filter(":first");
                    this.selectable.value(li);
                    displayImages(this.element);
                },
                change: function() {
                    setBigPhoto(this.selected().find("img"));
                }
            }));
        },
        search: function(el) {
            if ($("#searchBox").val() && !searching) {

                searching = true;

                noimages.remove();
                $("#overlay").after(loading);
                $("#flatMostPopularPhotos").hide();
                $("#flatSearchPhotos").hide();
                $("#overlay").stop(true, true).fadeIn();
                $("#exifButton").stop(true, true).fadeOut();
                $(".bottomLink").text("").data("currentView", "");

                slideshow.init($("#flatSearchPhotos").data("kendoListView"));
                updatePlayIcon(slideshow._started).stop(true, true).fadeOut();
                if (!kendo.support.touch)
                    $("#uploadphotos").stop(true, true).fadeOut();

                updatePageSize();
            }
        },

        initMainPictures: function () {
            var that = this;

            that._isSliderInit = false;

            $(".paging").kendoPager({ dataSource: dataSource });

            $("#flatSearchPhotos").kendoListView({
                autoBind: false,
                dataSource: dataSource,
                template: template(IMAGESIZES[0]),
                dataBound: function() {
                    displayImages(this.element);
                    var id = $("#bigPhoto").attr("data-photoid");
                    var images = this.element.find("img[data-photoid*='" + id + "']");
                    if (images.length)
                        images.parent().addClass("t-state-selected");
                },
                change: function() {
                    setBigPhoto(this.selected().find("img"));
                }
            });
            $("#mainPhotoGrid").kendoGrid({
                autoBind: false,
                dataSource: dataSource,
                pageable: $(".paging").data("kendoPager"),
                selectable: true,
                columns: [
                    { template: '<img data-photoid="<%= id %>" alt="<%= kendo.htmlEncode(title) %>" src="http://farm<%=farm%>.static.flickr.com/<%=server%>/<%=id%>_<%=secret%>_s.jpg">', title: "PHOTO" },
                    { field: "ownername", title: "AUTHOR" },
                    { field: "title", title: "TITLE" },
                    { field: "tags", title: "TAGS"}
                ],
                change: function() {
                    showSelectedPhoto(this);
                },
                dataBound: function() {
                    displayImages(this.element);
                }
            }).hide();

            $("#mainPhotoStrip").kendoListView({
                autoBind: false,
                dataSource: dataSource,
                template: template(imageSize),
                dataBound: function() {
                    loading.remove();
                    if (searching){
                        searching = false;
                        if (!dataSource.view()[0]) {
                            $("#overlay").after(noimages);
                            $("#mainTemplate").hide();
                        } else {
                            noimages.remove();
                            $("#mainTemplate").show();
                        }
                    }

                    if (!that._isSliderInit) {
                        that._isSliderInit = true;
                        that.initSlider();
                    }

                    var backButton = $(".bottomLink");
                    if (backButton.data("currentView") != 'flatMostPopularPhotos') {
                        backButton.text("Back to most popular").data("currentView", "mainTemplate");
                    }

                    displayImages(this.element);
                },
                change: function() {
                    showSelectedPhoto(this);
                }
            });


            $(".i-gridview").click(function() {
                dataSource.query({page: 1, pageSize: computePageSize(120, true)});

                $(this).addClass("currentView");
                $(".i-tileview").removeClass("currentView");
                $("#mainPhotoStrip").hide();
                $("#slider").parent().hide();
                $("#mainPhotoGrid").show();
                $("#overlay").stop(true, true).fadeIn();
                $("#exifButton").stop(true, true).fadeOut();
            });

            $(".i-tileview").click(function() {
                dataSource.query({page: 1, pageSize: computePageSize(imageSize.size)});

                $(this).addClass("currentView");
                $(".i-gridview").removeClass("currentView");
                $("#mainPhotoGrid").hide();
                $("#mainPhotoStrip").show();
                $("#slider").parent().show();
                $("#overlay").stop(true, true).fadeIn();
                $("#exifButton").stop(true, true).fadeOut();
            });

            $(".bottomLink").bind("click", function(e){
                e.preventDefault();
                var element = $(this),
                    view = element.data("currentView");

                if (view === "flatMostPopularPhotos") {
                    if (!dataSource.view()[0]) {
                        $("#overlay").after(noimages);
                    } else {
                        $("#mainTemplate").show();
                    }

                    element.data("currentView", "mainTemplate");
                    $("#flatSearchPhotos").hide();
                    $("#flatMostPopularPhotos").hide();
                    $(".i-tileview").click();

                    $("#viewslideshow").stop(true, true).fadeOut();
                    if (!kendo.support.touch)
                        $("#uploadphotos").stop(true, true).fadeOut();

                    element.text("Back to most popular");
                    slideshow.init($("#flatSearchPhotos").data("kendoListView"));
                } else if (view === "mainTemplate"){
                    noimages.remove();
                    element.data("currentView", "flatMostPopularPhotos");
                    $("#flatSearchPhotos").hide();
                    $("#mainTemplate").hide();
                    $("#overlay").stop(true, true).fadeOut();
                    $("#exifButton").stop(true, true).fadeIn();
                    $("#flatMostPopularPhotos").show();

                    $("#viewslideshow").stop(true, true).fadeIn();
                    if (!kendo.support.touch)
                        $("#uploadphotos").stop(true, true).fadeIn();
                    
                    element.text("Back to search results");
                    slideshow.init($("#flatMostPopularPhotos").data("kendoListView"));
                }

               updatePlayIcon(slideshow._started);
            });

            that.thumbList.append($("#flatSearchPhotos"));
        },
        initSlider: function() {
            $("#slider").kendoSlider({
                orientation: "vertical",
                min: 0,
                max: 2,
                largeStep: 1,
                tickPlacement: "none",
                change: function() {
                    imageSize = IMAGESIZES[this.value()];

                    $("#mainPhotoStrip").data("kendoListView").template = kendo.template(template(imageSize));
                    dataSource.query({page: 1, pageSize: computePageSize(imageSize.size)});
                }
            });
        },
        initVisitor: function() {
            var that = this;

            $(".i-search").click(function(e) { e.preventDefault(); that.search(); });
            $("#searchBox").bind("keydown", function(e) {
                if (e.keyCode === kendo.keys.ENTER) {
                    this.blur();
                    $(".i-search").click();
                }
            });
            $(document.body).bind('orientationchange', function() {
                if ($(".bottomLink").data("currentView") == "mainTemplate") {
                    updatePageSize();
                }
            });

            var scroller = $('<div class="thumb-list">')
                                .appendTo("#footer")
                                .kendoScroller(scrollerOptions);

            that.thumbList = scroller.data('kendoScroller').scrollElement;

            that.mostPopular();
            that.initMainPictures();

            $("#backButton").text("");

            slideshow.init($("#flatMostPopularPhotos").data("kendoListView"));

            $("#viewslideshow").click(function(e) {
                e.preventDefault();
                if($(this).hasClass("i-state-disabled")) {
                    return;
                }
                var started = slideshow._started;
                if (!started && !$("#footer .thumbs:visible")[0]) {
                    return;
                }

                if (started){
                    setBigPhoto($(".thumbs:visible").find(".t-state-selected:last img"));
                } else {
                    $("#exifButton").fadeOut();
                    setTimeout(function(){
                        hideExif();
                    }, 300);
                }

                slideshow.toggle();
                updatePlayIcon(slideshow._started);
            });

            setTimeout(showCallouts, 1000);
        }
    };
})(jQuery, window);
