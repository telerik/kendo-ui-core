(function ($) {
    var $t = $.telerik;

    var dropCueOffsetTop = 3;
    var dropCueOffsetLeft = 0;

    $t.scripts.push("telerik.grid.grouping.js");

    $t.grouping = {};

    function groupItem(container, title)
    {
        return container
            .find("div")
            .filter(function() {
                var div = $(this);
                if(div.children(".t-link").contents()
                    .filter(function() { 
                        if($(this).text() === title) {
                            return $(this);
                        } 
                }).length) {
                    return $(this);
                }
            });
    }

    $t.grouping.initialize = function (grid) {
        $.extend(grid, $t.grouping.implementation);

        grid.$groupDropCue = $('<div class="t-grouping-dropclue"/>');
        grid.$groupHeader = $('> .t-grouping-header', grid.element);
        
        function groups() {
            var all = $.map(grid.$groupHeader.find('.t-group-indicator'), function (group) {
                var $group = $(group);
                var left = $group.offset().left;
                var width = $group.outerWidth();
                return { left: left, right: left + width, width: width, $group: $group };
            });

            return {
                first: all[0],
                all: all,
                last: all[all.length - 1]
            };
        }

        function drag(e) {
            var title = e.$cue.text(),
                target = $t.eventTarget(e),
                location = $t.touchLocation(e);
            
            if (!$.contains(grid.element, target)
                || !$(target).closest('.t-grouping-header').length
                || (grid.groupFromTitle(title) && e.$draggable.closest('.t-header').length)) {
                grid.$groupDropCue.remove();
                return;
            }

            var $grid = $(grid.element),
                $toolbar = $grid.find('> .t-grid-toolbar'),
                top = $toolbar.outerHeight() + dropCueOffsetTop,
                state = groups(),
                isRtl = $grid.closest('.t-rtl').length;
                
            if (!state.all.length) {
                var left = isRtl ? $toolbar.width() - dropCueOffsetLeft : dropCueOffsetLeft;

                grid.$groupDropCue.css({ top: top, left: left }).appendTo(grid.$groupHeader);

                return;
            }

            var firstGroupIndicator = state.first;
            var lastGroupIndicator = state.last;
            var leftMargin = parseInt(firstGroupIndicator.$group.css('marginLeft'));
            var rightMargin = parseInt(firstGroupIndicator.$group.css('marginRight'));

            var currentGroupIndicator = $.grep(state.all, function (g) {
                return location.x >= g.left - leftMargin - rightMargin && location.x <= g.right;
            })[0];

            if (!currentGroupIndicator && firstGroupIndicator) {
                if (!isRtl && location.x < firstGroupIndicator.left) {
                    currentGroupIndicator = firstGroupIndicator;
                } else if (isRtl && location.x < lastGroupIndicator.left) {
                    currentGroupIndicator = lastGroupIndicator;
                }
            }

            if (isRtl) {
                if (currentGroupIndicator) {
                    grid.$groupDropCue.css({ top: top, left: currentGroupIndicator.$group.position().left - leftMargin + dropCueOffsetLeft })
                        .insertAfter(currentGroupIndicator.$group);
                } else {
                    grid.$groupDropCue.css({ top: top, left: $toolbar.width() - dropCueOffsetLeft })
                        .prependTo(grid.$groupHeader);
                }
            } else {
                if (currentGroupIndicator) {
                    grid.$groupDropCue.css({ top: top, left: currentGroupIndicator.$group.position().left - leftMargin + dropCueOffsetLeft })
                        .insertBefore(currentGroupIndicator.$group);
                } else {
                    grid.$groupDropCue.css({ top: top, left: lastGroupIndicator.$group.position().left + lastGroupIndicator.$group.outerWidth() + rightMargin + dropCueOffsetLeft })
                        .appendTo(grid.$groupHeader);
                }
            }
        }

        function cue(e) {
            if (e.$draggable.hasClass('t-header')) {
                var column = grid.columnFromTitle(e.$draggable.text());
                return $t.dragCue(column ? column.title : "");
            } else {
                // remove icons' hidden accessibility content first
                var groupButtonLink = $('.t-link', e.$draggable);
                var columnTitle = groupButtonLink.text().substr($('.t-icon', groupButtonLink).text().length);
                var column = grid.columnFromTitle(columnTitle);
                return $t.dragCue(column ? column.title : columnTitle);
            }
        }
        
        function stop(e) {
            var title = e.$cue.text();
            
            grid.$groupDropCue.remove();

            if (e.$draggable.is('.t-group-indicator') && e.keyCode != 27) {
                grid.unGroup(title);
                return false;
            }
        }

        function destroy(e) {
            e.$cue.remove();
        }
        if (grid.$groupHeader.length) {
        new $t.draggable({
            owner: grid.$header,
            selector: '.t-header:not(.t-group-cell,.t-hierarchy-cell)',
            scope: grid.element.id + '-grouping',
            cue: cue,
            start: function(e) {
                var column = grid.columnFromTitle(e.$draggable.text());
                return !!column.member && column.groupable !== false;
            },
            stop: stop,
            drag: drag,
            destroy: destroy
        });
        
        new $t.draggable({
            owner: grid.$groupHeader,
            selector: '.t-group-indicator',
            scope: grid.element.id + '-grouping',
            cue: cue,
            stop: stop,
            drag: drag,
            destroy: destroy
        });        
        
        new $t.droppable({
            owner: grid.element,
            selector: '.t-grouping-header',
            scope: grid.element.id + '-grouping',
            over: function(e) {
                $t.dragCueStatus(e.$cue, 't-add');
            },
            out: function(e) {
                $t.dragCueStatus(e.$cue, 't-denied');
            },
            drop: function(e) {
                var title = e.$cue.text();
                var group = grid.groupFromTitle(title);

                var groupIndex = $.inArray(group, grid.groups);
                
                var position = grid.$groupHeader.find('div').index(grid.$groupDropCue);
                var delta = groupIndex - position;

                if (!group || (grid.$groupDropCue.is(':visible') && delta != 0 && delta != -1))
                    grid.group(title, position);
                 
                grid.$groupDropCue.remove();
            }
        });
        }
        if (grid.isAjax()) {
            grid.$groupHeader
                .delegate('.t-button', $t.isTouch ? 'touchend' : 'click', function (e) {
                    e.preventDefault();
                    var groupButtonLink = $(this).parent().find('.t-link');
                    var columnTitle = groupButtonLink.text().substr($('.t-icon', groupButtonLink).text().length);
                    grid.unGroup(columnTitle);
                })
                .delegate('.t-link', $t.isTouch ? 'touchend' : 'click', function (e) {
                    e.preventDefault();
                    var groupButtonLink = $(this);
                    var columnTitle = groupButtonLink.text().substr($('.t-icon', groupButtonLink).text().length);
                    var group = grid.groupFromTitle(columnTitle);
                    group.order = group.order == 'asc' ? 'desc' : 'asc';
                    grid.group(group.title);
                });
        }

        grid.$groupHeader.delegate('.t-group-indicator', 'mouseenter', function () {
                grid.$currentGroupItem = $(this);
            })
            .delegate('.t-group-indicator', 'mouseleave', function () {
                grid.$currentGroupItem = null;
            });

        grid.$tbody.delegate('.t-grouping-row .t-collapse, .t-grouping-row .t-expand', 'click', $t.stop(function (e) {
            e.preventDefault();
            var $this = $(this), $tr = $this.closest('tr');
            if ($this.hasClass('t-collapse'))
                grid.collapseGroup($tr);
            else
                grid.expandGroup($tr);
        }));

        grid.groupFromTitle = function (title) {
            return $.grep(grid.groups, function (g) { return g.title == title; })[0];
        };

        grid.expandGroup = function (group) {
            var $group = $(group);
            var depth = $group.find('.t-group-cell').length;
            
            $group.nextAll('tr').each(function (i, tr) {
                var $tr = $(tr);
                var offset = $tr.find('.t-group-cell').length;
                if (offset <= depth)
                    return false;

                if (offset == depth + 1 && !$tr.hasClass('t-detail-row')) {
                    $tr.show();

                    if ($tr.hasClass('t-grouping-row') && $tr.find('.t-icon').hasClass('t-collapse'))
                        grid.expandGroup($tr);
                    if ($tr.hasClass('t-master-row') && $tr.find('.t-icon').hasClass('t-minus'))
                        $tr.next().show();
                }
            });

            $group.find('.t-icon').addClass('t-collapse').removeClass('t-expand');
        };

        grid.collapseGroup = function (group) {
            var $group = $(group),
                depth = $group.find('.t-group-cell').length,
                footerCount = 1;

            $group.nextAll('tr').each(function () {
                var $tr = $(this),
                    offset = $tr.find('.t-group-cell').length;

                if ($tr.hasClass("t-grouping-row")) {
                    footerCount++;
                } else if ($tr.hasClass("t-group-footer")) {
                    footerCount--;
                }
                        
                if (offset <= depth || ($tr.hasClass("t-group-footer") && footerCount < 0)) {
                    return false;
                }

                $tr.hide();
            });
            $group.find('.t-icon').addClass('t-expand').removeClass('t-collapse');
        };

        grid.group = function (title, position) {
            if (this.groups.length == 0 && this.isAjax())
                grid.$groupHeader.empty();

            var group = $.grep(grid.groups, function (group) {
                return group.title == title;
            })[0];

            if (!group) {
                var column = grid.columnFromTitle(title);
                group = { order: 'asc', member: column.member, title: title };
                grid.groups.push(group);
            }

            if (position >= 0) {
                grid.groups.splice($.inArray(group, grid.groups), 1);
                grid.groups.splice(position, 0, group);
            }

            grid.groupBy = $.map(grid.groups, function (g) { return g.member + '-' + g.order; }).join('~');

            if (this.isAjax()) {
                var $groupItem = groupItem(this.$groupHeader, title);
                if ($groupItem.length == 0) {
                    var html = new $.telerik.stringBuilder()
                        .cat('<div class="t-group-indicator">')
                            .cat('<a href="#" class="t-link"><span class="t-icon" />').cat(title).cat('</a>')
                            .cat('<a class="t-button t-button-icon t-button-bare"><span class="t-icon t-group-delete">').cat(grid.localization.ungroup).cat('</span></a>')
                        .cat('</div>')
                    .string();
                    $groupItem = $(html).appendTo(this.$groupHeader);
                }

                if (this.$groupDropCue.is(':visible'))
                    $groupItem.insertBefore(this.$groupDropCue);

                $groupItem.find('.t-link .t-icon')
                          .toggleClass('t-arrow-up-small', group.order == 'asc')
                          .toggleClass('t-arrow-down-small', group.order == 'desc')
                          .html('(' + (group.order == 'asc' ? grid.localization.sortedAsc : grid.localization.sortedDesc) + ')');

                this.ajaxRequest();
            } else {
                this.serverRequest();
            }
        };

        grid.unGroup = function (title) {
            var group = grid.groupFromTitle(title);
            grid.groups.splice($.inArray(group, grid.groups), 1);

            if (grid.groups.length == 0)
                grid.$groupHeader.html(grid.localization.groupHint);

            grid.groupBy = $.map(grid.groups, function (g) { return g.member + '-' + g.order; }).join('~');

            if (grid.isAjax()) {
                groupItem(grid.$groupHeader, title).remove();
                grid.ajaxRequest();
            } else {
                grid.serverRequest();
            }
        };

        grid.clearHeader = function() {
            grid.$groupHeader.html(grid.localization.groupHint);
        };

        grid.normalizeColumns = function(colspan) {
            var groups = grid.groups.length;
            var diff = colspan - grid.$tbody.parent().find(' > colgroup > col').length;
            if (diff == 0) return;
            
            var $tables = grid.$tbody.parent().add(grid.$headerWrap.find('table')).add(grid.$footer.find("table"));
            if ($.browser.msie) {
                // ie8 goes into compatibility mode if the columns get removed
                if (diff > 0) {
                    $(new $t.stringBuilder().rep('<col class="t-group-col" />', diff).string())
                        .prependTo($tables.find('colgroup'));
                    $(new $t.stringBuilder().rep('<th class="t-group-cell t-header">&nbsp;</th>', diff).string())
                        .insertBefore($tables.find('th.t-header:first'));
                    $(new $t.stringBuilder().rep('<td class="t-group-cell">&nbsp;</td>', diff).string())
                        .insertBefore($tables.find('tr.t-footer-template > td:first'));

                } else {
                    $tables.find('th:lt(' + Math.abs(diff) + '), tr.t-footer-template > td:lt(' + Math.abs(diff) + ')')
                           .remove()
                           .end()
                           .find('col:lt(' + Math.abs(diff) + ')')
                           .remove();
                }
                
                // take the tables out for a walk. ie8 does not recalculate table layout properly.
                var containers = [];
                var i = 0;
                
                $('table, .t-grid-bottom', grid.element)
                    .each(function() { containers.push(this.parentNode); })
                    .appendTo($('<div />'))
                    .each(function() { containers[i++].appendChild(this); });
            } else {
                $tables.find('col.t-group-col').remove();

                $(new $t.stringBuilder().rep('<col class="t-group-col" />', groups).string())
                        .prependTo($tables.find('colgroup'));

                $tables.find('th.t-group-cell').remove();
                $tables.find('tr.t-footer-template > td.t-group-cell').remove();

                $(new $t.stringBuilder().rep('<th class="t-group-cell t-header">&nbsp;</th>', groups).string())
                        .insertBefore($tables.find('th.t-header:first'));
                
                $(new $t.stringBuilder().rep('<td class="t-group-cell">&nbsp;</td>', groups).string())
                        .insertBefore($tables.find('tr.t-footer-template > td:first'));
            }            
        };

        function getForeignKeyText(records, key) {
            var value = key,
                idx,
                length;

            for (idx = 0, length = records.length; idx < length; idx++) {
                if (key == records[idx].Value) {
                    return records[idx].Text;
                }
            }
            return key;
        }

        grid.bindGroup = function (dataItem, colspan, html, level) {
            var group = grid.groups[level];
            var key = dataItem.value;
            var column = $.grep(grid.columns, function (column) { return group.member == column.member })[0],
            date;

            if (column && (column.format || column.type == 'Date')) {
                date = /^\/Date\((.*?)\)\/$/.exec(key);
                if(date) {
                    key = new Date(parseInt(date[1]));
                }
                key = $t.formatString(column.format || '{0:G}', key);
            }

            html.cat('<tr class="t-grouping-row">')
                .rep('<td class="t-group-cell"></td>', level)
                .cat('<td colspan="')
                .cat(colspan - level)
                .cat('"><p class="t-reset"><a class="t-icon t-collapse" href="#"></a>');
            
            if (column) {                
                var value = !column.data ? key : getForeignKeyText(column.data, key);
                html.cat(column.groupHeader($.extend( { Title: group.title, Key: value }, grid._mapAggregates(dataItem.aggregates[column.member]) )));
            }
            else {
                html.cat(group.title + ': ' + key);
            }
            
            html.cat('</p></td></tr>');

            if (dataItem.hasSubgroups) {
                for (var i = 0, l = dataItem.items.length; i < l; i++)
                    grid.bindGroup(dataItem.items[i], colspan, html, level + 1);
            } else {
                grid.bindData(dataItem.items, html, level + 1);
            }
            
            if (grid.showGroupFooter) {
                html.cat('<tr class="t-group-footer">')
                    .rep('<td class="t-group-cell"></td>', grid.groups.length)
                    .rep('<td class="t-hierarchy-cell"></td>', grid.detail ? 1 : 0);
            
                $.each(grid.columns, function() {
                    html.cat('<td');
                    html.catIf(' style="display:none;"', this.hidden);
                    html.cat('>');
                    if (this.groupFooter)
                        html.cat(this.groupFooter(grid._mapAggregates(dataItem.aggregates[this.member])));
                    html.cat('</td>');
                });

                html.cat('</tr>');
            }
        }
    }    
})(jQuery);
