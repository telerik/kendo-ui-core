(function($, window) {
    var dojo = {
        postSnippet: function (snippet, baseUrl) {
            snippet = dojo.fixCDNReferences(snippet);
            snippet = dojo.addBaseRedirectTag(snippet, baseUrl);
            snippet = dojo.fixLineEndings(snippet);
            var form = $('<form method="post" action="' + dojo.configuration.url + '" />');
            $("<input name='snippet'>").val(snippet).appendTo(form);

            form.submit();
        },
        addBaseRedirectTag: function (code, baseUrl) {
            return code.replace(
                '<head>',
                '<head>\n' +
                '    <base href="' + baseUrl + '">\n' +
                '    <style>body { font-size: 12px; font-family: Arial, Helvetica, sans-serif; }</style>'
            );
        },
        fixLineEndings: function (code) {
            return code.replace(/\n/g, "&#10;");
        },
        fixCDNReferences: function (code) {
            return code.replace(/<head>[\s\S]*<\/head>/, function (match) {
                return match
                    .replace(/src="\/?/g, "src=\"" + dojo.configuration.cdnRoot + "/")
                    .replace(/href="\/?/g, "href=\"" + dojo.configuration.cdnRoot + "/");
            });
        }
    };

    $.extend(window, {
        dojo: dojo
    });
})(jQuery, window);
