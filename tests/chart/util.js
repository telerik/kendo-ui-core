function ViewFactoryStub() {
    var factory = this,
        log = factory.log = { };

    log.rect = [];
    log.text = [];
    log.group = [];
    log.line = [];
}

ViewFactoryStub.prototype = {
    rect: function(box, style) {
        this.log.rect.push({
            x1: box.x1,
            y1: box.y1,
            x2: box.x2,
            y2: box.y2,
            style: style
        });
    },

    text: function(content, style) {
        this.log.text.push({
            content: content,
            style: style
        });
    },

    group: function(options) {
        this.log.group.push({options: options});
        return new kendo.ui.Chart.ViewElement();
    },

    line: function(x1, y1, x2, y2) {
        this.log.line.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
        return new kendo.ui.Chart.ViewElement();
    }
};

function sameBox(a, b, tolerance) {
    same([a.x1, a.y1, a.x2, a.y2], [b.x1, b.y1, b.x2, b.y2], tolerance);
}

function stubMethod(fn, methodName, stub, callback) {
    var oldMethod = fn.prototype[methodName];
    fn.prototype[methodName] = stub;
    try {
        callback();
    }
    finally {
        fn.prototype[methodName] = oldMethod;
    }
}

