document.write("<script src='../../src/jquery.js'></script>");

function htmlescape(text) {
    return (text
            .replace(/</g, "&lt;")
            .replace(/</g, "&gt;"));
}

window.onload = function() {
    var current_file = null;
    $(".content a[data-file]").click(function(ev){
        ev.preventDefault();
        var file = $(this).attr("data-file");
        var line = $(this).attr("data-line");

        if (file === current_file) {
            gotoLine();
            return;
        }

        function gotoLine() {
            if (line) {
                var el = $("#L" + line);
                el[0].scrollIntoView();
                $(".highlight").removeClass("highlight");
                el.addClass("highlight");
            }
        }

        var xhr = new XMLHttpRequest();
        var url = "../../src/" + file + "?killCache=" + Date.now();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var code = xhr.responseText;
                code = code.split(/\r?\n/);
                var output = $(".code").html(code.map(function(line, i){
                    return "<div class='line' id='L" + (i + 1) + "'>"
                        + htmlescape(line) + "<br />"
                        + "</div>";
                }).join(""));
                output.scrollTop(0);
                $("<div class='filename'>" + htmlescape(file) + "</div>").appendTo(output);
                current_file = file;
                gotoLine();
            }
        };
        xhr.send(null);

    });
};
