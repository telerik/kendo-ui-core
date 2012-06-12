(function() {
    var decode = window.atob,
        kendo = window.kendo,
        markdown = window.markdown,
        sectionRegExp = /^##\s/m;

    if (!atob) {
        decode = function base64Decode(text){
            text = text.replace(/\s/g,"");

            if(!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text)) || text.length % 4 > 0){
                throw new Error("Not a base64-encoded string.");
            }

            //local variables
            var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                cur, prev, digitNum,
                i=0,
                result = [];

            text = text.replace(/=/g, "");

            while (i < text.length) {
                cur = digits.indexOf(text.charAt(i));
                digitNum = i % 4;

                switch(digitNum){
                    //case 0: first digit - do nothing, not enough info to work with

                    case 1: //second digit
                        result.push(String.fromCharCode(prev << 2 | cur >> 4));
                        break;

                    case 2: //third digit
                        result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                        break;

                    case 3: //fourth digit
                        result.push(String.fromCharCode((prev & 3) << 6 | cur));
                        break;
                }

                prev = cur;
                i++;
            }

            return result.join("");
        }
    }

    var docs = {
        load: function (suite, widget, success) {
            $.ajax({
                url: this.getURL(suite, widget),
                dataType: "jsonp",
                success: function(data) {
                    var result = "",
                        index = 2;

                    if (data.data.content) {
                        result = decode(data.data.content);
                    }

                    result = result.split(sectionRegExp);
                    var contents = {
                        "Getting started": markdown.toHTML("## " + result[1]),
                    };

                    if (result[index].charAt(0) === "C") {
                        contents.Configuration = markdown.toHTML("## " + result[index])
                        index += 1;
                    }

                    if (result[index].charAt(0) === "M") {
                        contents.Methods = markdown.toHTML("## " + result[index])
                        index += 1;
                    }

                    if (result[index].charAt(0) === "E") {
                        contents.Events = markdown.toHTML("## " + result[index])
                    }

                    success(contents);
                }
            });
        },

        getURL: function(suite, widget) {
            var appName = location.pathname.split("/")[1] || "kendo-demos";

            return kendo.format("/{0}/docs/{1}/{2}", appName, suite, widget);
        }
    }

    window.docs = docs;
}())
