(function ($) {
    var $t = $.telerik;

    $t.scripts.push("telerik.grid.reordering.js");

    $t.reordering = {};

    $t.reordering.initialize = function (grid) {

        grid.$reorderDropCue = $('<div class="t-reorder-cue"><div class="t-icon t-arrow-down"></div><div class="t-icon t-arrow-up"></div></div>');

        var lastColumnIndex = grid.$header.children("th").length - 1;

        var reorderColumn = function (destIndex, column) {
            var sourceIndex = $.inArray(column, grid.columns),
                visibleColumns = $.grep(grid.columns, function(column) { return !column.hidden; }),
                colSourceIndex = $.inArray(column, visibleColumns),
                colDestIndex = $.inArray(grid.columns[destIndex], visibleColumns);
            
            grid.columns.splice(sourceIndex, 1);
            
            grid.columns.splice(destIndex, 0, column);

            reorder(grid.$columns(), sourceIndex, destIndex);

            reorder(grid.$tbody.parent().find('> colgroup > col:not(.t-group-col,.t-hierarchy-col)'), colSourceIndex, colDestIndex);
            
            reorder(grid.$headerWrap.find('table').find('> colgroup > col:not(.t-group-col,.t-hierarchy-col)'), colSourceIndex, colDestIndex);

            var footerWrap = grid.$footer.find('table');
            reorder(footerWrap.find('> colgroup > col:not(.t-group-col,.t-hierarchy-col)'), colSourceIndex, colDestIndex);            
            reorder(footerWrap.find('> tbody > tr.t-footer-template > td:not(.t-group-cell,.t-hierarchy-cell)')
                .add(grid.$footer.find('tr.t-footer-template > td:not(.t-group-cell,.t-hierarchy-cell)')), sourceIndex, destIndex);

            $.each(grid.$tbody.children(), function () {
                reorder($(this).find(' > td:not(.t-group-cell, .t-hierarchy-cell, .t-detail-cell)'), sourceIndex, destIndex);
            });
        };

        grid.reorderColumn = reorderColumn;

        function reorder(selector, sourceIndex, destIndex) {
            var $source = selector.eq(sourceIndex);
            var $dest = selector.eq(destIndex);

            $source[sourceIndex > destIndex ? 'insertBefore' : 'insertAfter']($dest);
        }

        new $t.draggable({
            owner: grid.$header[0],
            selector: '.t-header:not(.t-group-cell,.t-hierarchy-cell)',
            scope: grid.element.id + '-reodering',
            cue: function(e) {           
                var column = grid.columnFromTitle(e.$draggable.text());
                return $t.dragCue(column ? column.title : "");                    
            },
            destroy: function(e) {
                e.$cue.remove();
            }
        });

        new $t.droppable({
            owner: grid.$header[0],
            scope: grid.element.id + '-reodering',
            selector: '.t-header:not(.t-group-cell,.t-hierarchy-cell)',
            over: function(e) {
                var same = $.trim(e.$draggable.text()) == $.trim(e.$droppable.text());
                $t.dragCueStatus(e.$cue, same? 't-denied' : 't-add');

                var top = 0;

                $('> .t-grid-top, > .t-grouping-header', grid.element).each(function() {
                    top += $(this).outerHeight();
                });

                if (!same)
                    grid.$reorderDropCue.css({
                         height: e.$droppable.outerHeight(),
                         top: top,
                         left: function() {
                                return e.$droppable.position().left + ((e.$droppable.index() > e.$draggable.index()) ? e.$droppable.outerWidth() : 0)
                            }
                         })
                         .appendTo(grid.element);
            },
            out: function(e) {
                grid.$reorderDropCue.remove();
                $t.dragCueStatus(e.$cue, 't-denied');
            },
            drop: function(e) {
                grid.$reorderDropCue.remove();
                if (e.$cue.find('.t-drag-status').is('.t-add')) {
                    var column = grid.columnFromTitle($.trim(e.$draggable.text()));
                    var position = grid.$columns().index(e.$droppable.closest(".t-header"));
                    $t.trigger(grid.element, 'columnReorder', {
                        column: column,
                        oldIndex: $.inArray(column, grid.columns),
                        newIndex: position
                    });
                    reorderColumn(position, column);
                    $t.trigger(grid.element, 'repaint');
                }
            }
        });
    }
})(jQuery);
