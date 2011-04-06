(function($) {

    $.fn.draggable = function(options) {
        options = {
            drops: typeof options === 'string' ? options : ('selector' in options ? options.selector : options.dropTargets),
            handle: options.handle || null,
            onDragStart: options.onDragStart || null,
            onDragOver: options.onDragOver || null,
            onDrop: options.onDrop || null,
            onCancel: options.onCancel || null
        };

        this.data('dragOpt', options);
    };

})(Zepto);
