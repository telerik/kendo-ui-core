function scrollNodeIntoView(li) {
    var container = $("#page-nav")[0];
    var top = li[0].offsetTop;
    var bottom = top + li.find(">div").outerHeight();

    var containerTop = container.scrollTop;
    var containerHeight = container.clientHeight;

    if (top < containerTop || bottom > containerHeight + containerTop) {
        container.scrollTop = top - containerHeight / 2;
    }
}


function selectNode(hash, scroll) {
    var li = $("#page-tree li:has(>div>span>a[href='" + hash + "'])");

    if (li.length) {
        var treeview = $("#page-tree").data("kendoTreeView");
        var topicNode = li.closest(".current-topic");

        treeview.select(li);

        topicNode.find("li").removeClass("path");

        li.parentsUntil(topicNode).addClass("path");

        if (scroll) {
            scrollNodeIntoView(li);
        }
    }
}

function expandNavigation(url) {
    return function expand(e) {
        if (e.node) {
            return;
        }

        var segments = url.split("/");
        var treeview = this;

        var dataSource = this.dataSource;
        var node;

        for (var idx = 0; idx < segments.length; idx++) {
            node = dataSource.get(segments[idx]);
            node.set("expanded", true);
            dataSource = node.children;
        }

        var li = this.element.find("li[data-uid='" + node.uid + "']");

        scrollNodeIntoView(li);

        this.select(li);


        if (location.pathname.indexOf("/api/") < 0) {
            li.addClass("current-topic");

            $("h2").each(function() {
                var hash = $(this).find("a").attr("href");

                $(".current-topic>ul>li:first-child>div>span.k-in").addClass("k-state-selected");

                var state = $(".k-state-selected");
                if (state.length > 1) {
                  $(".k-state-selected").first().removeClass("k-state-selected");
                }
                var h2Node = treeview.append({ path: hash, text: kendo.htmlEncode($(this).text()) }, li);

                if (location.hash.replace("#", "") === hash.replace("#", "")) {
                    selectNode(hash);
                }

                $(this).nextUntil("h2", "h3").each(function() {
                    var hash = $(this).find("a").attr("href");
                    treeview.append({ path: hash, text: kendo.htmlEncode($(this).text()) }, h2Node);

                    if (location.hash.replace("#", "") === hash.replace("#", "")) {
                        selectNode(hash);
                        $("h1").css("font-weight", "bold");
                    }
                });

            });
        }


        this.unbind("dataBound", expand);
    };
}

$(window).on("hashchange", function() {
    selectNode(location.hash, false);
});

if (location.pathname.indexOf("/api/") < 0) {
    $(function() {
        var headings = $("h2,h3");
        var fixedHeaderHeight = $("#page-header").height();

        $(document).on("scroll", function() {
            var scrollOffset = $(document).scrollTop() + fixedHeaderHeight;
            var current = headings.filter(function() {
                return $(this).offset().top + this.offsetHeight - scrollOffset > 0;
            }).first();

            if (current.length) {
                selectNode(current.find("a").attr("href"), true);
            }
        });
    });
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

        if (url.indexOf("#") < 0) {
            while (item = item.parentNode()) {
                url = item.path + "/" + url;
            }
            return '<a href="' + root + url + '">' + text + "</a>";
        } else {
            return '<a href="' + url + '">' + text + "</a>";
        }
    };
}

function preventParentSelection(e) {
    var node = this.dataItem(e.node);

    if (node.path.indexOf("#") < 0 && node.hasChildren) {
        e.preventDefault();
        this.toggle(e.node);
    }
}

$(function(){
    $("pre[data-lang^=tab-]").each(function() {
        if (this.parentNode.className.indexOf("k-content") >= 0) {
            return;
        }

        var langs = $(this).nextUntil(":not(pre)", "pre").add(this);

        var tabs = $.map(langs, function(item) {
            var title = $(item).attr("data-lang").replace("tab-", "");
            return $("<li>").text(title);
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

    $(document).on("click", ".current-topic > div a", false);

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

    // do not scroll main page when page-nav is scrolled
    $('#page-nav').on('DOMMouseScroll mousewheel', function(ev) {
        var element = $(this),
            scrollTop = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height = element.innerHeight(),
            delta = ev.originalEvent.wheelDelta,
            up = delta > 0;

        var prevent = function() {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        }

        if (!up && -delta > scrollHeight - height - scrollTop) {
            // Scrolling down, but this will take us past the bottom.
            element.scrollTop(scrollHeight);
            return prevent();
        } else if (up && delta > scrollTop) {
            // Scrolling up, but this will take us past the top.
            element.scrollTop(0);
            return prevent();
        }
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
            var angular = '    <script src="http://kendo.cdn.telerik.com/kendo-version/js/angular.min.js"></script>\n';
            var jszip = '    <script src="http://kendo.cdn.telerik.com/kendo-version/js/jszip.min.js"></script>\n';

            if (!(/ng-app/i).test(snippet)) {
                angular = '';
            }

            if (!(/ooxml|excel/i).test(snippet)) {
                jszip  = '';
            }

            var result = ('<!DOCTYPE html>\n'+
                '<html>\n'+
                '<head>\n'+
                '    <meta charset="utf-8"/>\n'+
                '    <title>Kendo UI Snippet</title>\n\n'+
                '    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/kendo-version/styles/kendo.common.min.css"/>\n'+
                '    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/kendo-version/styles/kendo.rtl.min.css"/>\n'+
                '    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/kendo-version/styles/kendo.silver.min.css"/>\n'+
                '    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/kendo-version/styles/kendo.mobile.all.min.css"/>\n\n'+
                '    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>\n'+
                angular + jszip +
                '    <script src="http://kendo.cdn.telerik.com/kendo-version/js/kendo.all.min.js"></script>\n'+
                '</head>\n'+
                '<body>\n  \n'+
                snippet+ '\n' +
                '</body>\n'+
            '</html>').replace(/kendo-version/g, dojoApi.configuration.currentKendoVersion);
        return result;
        },

        addButtons: function(element) {
            if (!$(element).parent().prev().is(".action-buttons")) {
                $('<div class="action-buttons">'+
                 '<button class="btn btn-edit" title="Edit example">Edit</button>'+
                 '<button class="btn btn-run" title="Run example">Preview</button>'+
                 '<a href="http://dojo.telerik.com" class="btn btn-dojo" title="Open example in Kendo UI Dojo">Open In Dojo</a>'+
                 '</div>').insertBefore(element);
            }
        },
        editSnippet: function(element) {
            reset();

            var pre = $(element).parent().nextAll("pre:first");

            if (isCodeMirrorCurrent(pre)) {
                showCodeMirror();
            } else {
                destroyCodeMirror();
                createCodeMirror(pre);
            }

            pre.hide();
            
            $(element).addClass("active-button");
            $(element).next().removeClass("active-button");
        },
        runSnippet: function(element) {
            reset();

            var pre = $(element).parent().nextAll("pre:first");

            var iframe = $('<iframe class="snippet-runner">').attr("src", 'javascript:""');


            var snippet = null;

            if (isCodeMirrorCurrent(pre)) {
                snippet = codemirror.getValue();
                hideCodeMirror();
                iframe.show().insertAfter(codemirror.display.wrapper);
            } else {
                snippet = pre.text();
                destroyCodeMirror();
                iframe.show().insertAfter(pre);
            }

            iframe.on("load", function() {
                iframe.height(iframe.contents().height());
            });

            pre.hide();

            snippet = snippet.replace(/<script>(.*?)<\/script>/, "<script>try { $1 } catch(e) { document.write(e.toString()); }</script>");

            var html = template({ version: kendo.version, snippet: snippet, html: /<html>/i.test(snippet) });

            var contents = iframe.contents();

            contents[0].open();
            contents[0].write(html);
            contents[0].close();
            
            $(element).addClass("active-button");
            $(element).prev().removeClass("active-button");
        },

        openSnippet: function(element) {
            var snippet = null;

            var pre = $(element).parent().nextAll("pre:first");

            if (isCodeMirrorCurrent(pre)) {
                snippet = codemirror.getValue();
            } else {
                snippet = pre.text();
            }

            dojoApi.post(snippet);
        }
    };

    var template = kendo.template(
        '# if (!html) { #<!doctype html>' +
            '<html>' +
            '<head>' +
            '<meta charset="utf-8"/>' +
            '<meta http-equiv="X-UA-Compatible" content="IE=edge"/>' +
            '<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"/>' +
            '<script src="http://code.jquery.com/jquery-1.10.2.js"></script>' +
            '<style>' +
            'body {' +
                'font-family: Helvetica, Arial, sans-serif;' +
            'font-size: 14px' +
            '}' +
            '</style>' +
            '<link rel="stylesheet" href="//kendo.cdn.telerik.com/${version}/styles/kendo.common.min.css"/>' +
            '<link rel="stylesheet" href="//kendo.cdn.telerik.com/${version}/styles/kendo.silver.min.css"/>' +
            '<link rel="stylesheet" href="//kendo.cdn.telerik.com/${version}/styles/kendo.mobile.all.min.css"/>' +
            '<link rel="stylesheet" href="//kendo.cdn.telerik.com/${version}/styles/kendo.rtl.min.css">' +
            '<script src="//kendo.cdn.telerik.com/${version}/js/jszip.min.js"></script>' +
            '# if ((/ng-app/i).test(snippet)) { # <script src="//kendo.cdn.telerik.com/${version}/js/angular.min.js"></script> # } #' +
            '<script src="//kendo.cdn.telerik.com/${version}/js/kendo.all.min.js"></script>' +
            '<script src="//kendo.cdn.telerik.com/${version}/js/kendo.timezones.min.js"></script>' +
            '# } #<script>' +
            'if (typeof kendo !== "undefined") kendo.mobile.Application.prototype.options.browserHistory = false;' +
            'window.onerror = function(message, url, line) {' +
                'document.write("<span style=\\"color:red;font-family:monospace\\">" + message + " at line " + line + "</span>");' +
            '};' +
            'window.onunload = function() {' +
                'kendo.destroy(document.body);' +
            '};' +
            '</script>' +
            '# if (!html) { #</head>' +
            '<body>' +
            '# } # #= snippet #' +
            '# if (!html) { #</body>' +
            '</html> # } #'
    );

    var codemirror = null;

    function destroyCodeMirror() {
        if (codemirror) {
            $(codemirror.display.wrapper).remove();
            codemirror = null;
        }
    }

    function hideCodeMirror() {
        if (codemirror) {
            $(codemirror.display.wrapper).hide();
        }
    }

    function showCodeMirror() {
        if (codemirror) {
            $(codemirror.display.wrapper).show();
        }
    }

    function createCodeMirror(pre) {
        codemirror = CodeMirror(function(element) {
            $(element).insertAfter(pre);
        }, {
            value: pre.text(),
            scrollbarStyle: "null",
            lineNumbers: true,
            mode: "htmlmixed"
        });
    }

    function isCodeMirrorCurrent(pre) {
        return codemirror && codemirror.display.wrapper.previousSibling === pre[0];
    }

    function reset() {
        $("pre.prettyprint").show();
        $(".snippet-runner").remove();
        $(".btn-edit").removeClass("active-button");
        $(".btn-run").removeClass("active-button");
    }

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

    $("body").find(".prettyprint[data-lang=html]").each(function() {
        if (this.parentNode.className.indexOf("k-content") < 0) {
            dojoApi.addButtons(this);
        }
    });

    $("body").on("click", ".btn-edit", function(e) {
        e.preventDefault();

        dojoApi.editSnippet(this);
    });

    $("body").on("click", ".btn-run", function(e) {
        e.preventDefault();

        dojoApi.runSnippet(this);
    });

    $("body").on("click", ".btn-dojo", function(e) {
        e.preventDefault();

        dojoApi.openSnippet(this);
    });
});
