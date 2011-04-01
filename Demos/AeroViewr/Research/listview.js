(function($){
    function template(value) {
        return new Function('data', ("var p=[];" +
            "with(data){p.push('" + unescape(value).replace(/[\r\t\n]/g, " ")
                .replace(/'(?=[^#]*#>)/g, "\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(/<#=(.+?)#>/g, "',$1,'")
                .split("<#").join("');")
                .split("#>").join("p.push('")
                + "');}return p.join('');"));
    }

    var listview = function(options){
        var element = this.element = $(options.element).addClass("floatWrap thumbs");
        this.template = template(options.template);
        this.onItemBound = options.onItemBound;
    }

    listview.prototype = {
        bind: function(items){
            items = items || [];
            this.element.html("");
            for (var i = 0, length = items.length; i < length; i++){
                var liItem = $("<li>" + this.template(items[i]) + "</li>");
                if(this.onItemBound){
                    this.onItemBound({item: liItem});
                }
                liItem.appendTo(this.element);
            }
        }
    };
    window.listview = listview;
})(jQuery);
