function expandNavigation(url) {
    return function() {
        var segments = url.split("/");
        var page = segments[segments.length - 1];
        var treeview = this;

        var dataSource = this.dataSource;
        var node;

        for (var idx = 0; idx < segments.length; idx++) {
            node = dataSource.get(segments[idx]);
            node.set("expanded", true);
            dataSource = node.children;
        }

        node.set("selected", true);

        var li = this.element.find("li[data-uid='" + node.uid + "']");

        $("#page-nav").scrollTop(li.offset().top - this.element.offset().top - $("#page-nav").outerHeight() / 2);

        this.unbind("dataBound", arguments.callee);
    }
}


function navigationTemplate(root) {
    return function(data) {
        var item = data.item;
        var text = item.text;

        if (item.hasChildren) {
            return text;
        }

        var url = item.path;

        if (location.pathname.indexOf(".html") < 0) {
            url = url.replace(".html", "");
        }

        while (item = item.parentNode()) {
            url = item.path + "/" + url;
        }

        return '<a href="' + root + url + '">' + text + "</a>";
    }
}

function preventParentSelection(e) {
    if (this.dataItem(e.node).hasChildren) {
        e.preventDefault();
        this.toggle(e.node);
    }
}

$(function(){
    $("pre[lang]").each(function() {
       if (this.parentNode.className.indexOf("k-content") >= 0) {
           return;
       }

       var langs = $(this).nextUntil(":not(pre)", "pre").add(this);

       var tabs = $.map(langs, function(item) {
          return $("<li>").text($(item).attr("lang"));
       });

       if (tabs.length < 2) {
           return;
       }

       tabs[0].addClass("k-state-active");

       var tabstrip = $("<div>")
                       .insertBefore(this)
                       .append($("<ul>").append(tabs))
                       .append(langs);

       langs.wrap("<div>");

       tabstrip.kendoTabStrip({ animation: false });
    });

    $("pre").addClass("prettyprint");

    prettyPrint();

    $("#markdown-toc")
        .on("click", "a", function() {
            $(".section > ul").hide();
        })
    .each(function() {
        var ul = $("<ul>");

        $("#page-article h2").each(function() {
            var h2 = $(this);

            if (!/fields|configuration|properties|events|methods/i.test(h2.text())) {
                return;
            }

            $("<li>")
                .addClass("section")
                .append(h2.children().clone())
                .appendTo(ul)
                .mouseenter(function() {
                    var children = $(this).children("ul");

                    if (!children.length) {
                        children = $("<ul>");

                        h2.nextUntil("h2").filter("h3").each(function(){
                            $("<li>").append($(this).children().clone()).appendTo(children);
                        });

                        if (children.children().length) {
                            children.appendTo(this);
                        }
                    }

                    children.show();
                })
                .mouseleave(function() {
                    $(this).children("ul").hide();
                });
        });

        ul.appendTo(this);
    });
});

var dojoApi = (function($) {

    var dojoApi = {
        configuration: {
            url: "http://dojo.telerik.com/",
            currentKendoVersion: kendo.version
        },
        post: function (snippet) {
            if (!snippet.match(/<html>/i)) {
                snippet = dojoApi.wrapInHtml(snippet);
            }
            snippet = dojoApi.fixLineEndings(snippet);
            var form = $('<form method="post" target="_blank" action="' + dojoApi.configuration.url + '" />').appendTo(document.body);
            $("<input name='snippet'>").val(window.btoa(encodeURIComponent(snippet))).appendTo(form);

            form.submit();
        },
        fixLineEndings: function (code) {
            return code.replace(/\n/g, "&#10;");
        },
        showHintButton: function (element, text) {
            element = $(element);

            $("<button type='button'>")
                .text(text)
                .addClass("btn btn-action dojo-submit-button")
                .insertBefore(element);
        },
        wrapInHtml: function(snippet) {
            var angular = '    <script src="http://cdn.kendostatic.com/kendo-version/js/angular.min.js"></script>\n';
            var jszip = '    <script src="http://cdn.kendostatic.com/kendo-version/js/jszip.min.js"></script>\n';

            if (!(/ng-app/i).test(snippet)) {
                angular = '';
            }

            if (!(/ooxml|excel/i).test(snippet)) {
                jszip  = '';
            }

            var result = ('<!DOCTYPE html>\n'+
            '<html>\n'+
            '<head>\n'+
            '    <meta charset="utf-8">\n'+
            '    <title>Kendo UI Snippet</title>\n\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.common.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.rtl.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.default.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.dataviz.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.dataviz.default.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.mobile.all.min.css">\n\n'+
            '    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>\n'+
            angular + jszip +
            '    <script src="http://cdn.kendostatic.com/kendo-version/js/kendo.all.min.js"></script>\n'+
            '</head>\n'+
            '<body>\n  \n'+
            snippet+ '\n' +
            '</body>\n'+
            '</html>').replace(/kendo-version/g, dojoApi.configuration.currentKendoVersion);
            return result;
        }
    };

    return dojoApi;
})(jQuery);

$(function(){
    $(".toggle-nav").click(function() {
        $("#page-search").removeClass("search-visibility");
        $("#page-inner-content").removeClass("move-inner-content");
        $("#page-nav").toggleClass("nav-visibility");
    });

    $(".show-search").click(function() {
        $("#page-nav").removeClass("nav-visibility");
        $("#page-search").toggleClass("search-visibility");
        $("#page-inner-content").toggleClass("move-inner-content");
    });

    $(".prettyprint[lang=html]").each(function() {
        dojoApi.showHintButton(this, "Edit this example");
    });

    $("body").on("click", ".dojo-submit-button", function(e) {
        e.preventDefault();
        var snippet = $(this).next().text();
        dojoApi.post(snippet);
    });
});


