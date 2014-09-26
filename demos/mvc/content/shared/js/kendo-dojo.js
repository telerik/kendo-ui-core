 (function($, window) {
    var dojo = {
        postSnippet: function (snippet, baseUrl) {
            snippet = dojo.fixCDNReferences(snippet);
            snippet = dojo.addBaseRedirectTag(snippet, baseUrl);
            snippet = dojo.addConsoleScript(snippet);
            snippet = dojo.fixLineEndings(snippet);

            var form = $('<form method="post" action="' + dojo.configuration.url + '" target="_blank" />').hide().appendTo(document.body);
            $("<input name='snippet'>").val(window.btoa(snippet)).appendTo(form);

            form.submit();
        },
        addBaseRedirectTag: function (code, baseUrl) {
            return code.replace(
                '<head>',
                '<head>\n' +
                '    <base href="' + baseUrl + '">\n' +
                '    <style>html { font-size: 12px; font-family: Arial, Helvetica, sans-serif; }</style>'
            );
        },
        addConsoleScript: function (code) {
            if (code.indexOf("kendoConsole") !== -1) {
                var styleReference = '\t<link rel="stylesheet" href="../content/shared/styles/examples-offline.css">\n';
                var scriptReference = '\t<script src="../content/shared/js/console.js"></script>\n';
                code = code.replace("</head>", styleReference + scriptReference + "</head>");
            }

            return code;
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
