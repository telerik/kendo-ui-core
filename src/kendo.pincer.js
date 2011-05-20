(function($, window, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        Component = kendo.ui.Component,
        touchLocation = kendo.touchLocation;

    function Pincer (element, options) {
        this.element = $(element);

        this._gesture = false;
        
        Component.apply(this, arguments);

        this._gestureStartProxy = $.proxy(this._onGestureStart, this),
        this._gestureChangeProxy = $.proxy(this._onGestureChange, this),
        this._gestureEndProxy = $.proxy(this._onGestureEnd, this),
        this._touchStartProxy = $.proxy(this._onTouchStart, this),
        this._touchMoveProxy = $.proxy(this._onTouchMove, this),
        this._touchEndProxy = $.proxy(this._onTouchEnd, this);

        this._transformProperty = kendo.support.transitions.css + 'transform';

        this._create();
    }

    Pincer.prototype = {
        _create: function () {
            if (kendo.support.touch) {
                this.element
                    .bind('gesturestart', this._gestureStartProxy )
                    .bind('gesturechange', this._gestureChangeProxy )
                    .bind('gestureend', this._gestureEndProxy )
                    .bind('touchstart', this._touchStartProxy )
                    .bind('touchmove', this._touchMoveProxy )
                    .bind('touchend', this._touchEndProxy );

            }
        },

        _getScaleRotation: function () {
            var matrix = (this.element.css(this._transformProperty).match(/(matrix\((-?[\d\.]+)[\w\s]*,\s*(-?[\d\.]+)[\w\s]*,\s*(-?[\d\.]+)[\w\s]*,\s*(-?[\d\.]+)[\w\s]*,\s*(-?[\d\.]+))/i) || [1, 1, 1, 0, 0, 0, 0]);

            if (kendo.support.transitions)
                return {
                    scale: +matrix[2],
                    rotation: -Math.asin(+matrix[4]) * 180/Math.PI || 0
                };
        },

        _onGestureStart: function (e) {
            this._gesture = true;
            e.preventDefault();

            var scaling = this._getScaleRotation();
            this._gestureStartProps = {
                scale: scaling.scale,
                angle: scaling.rotation - e.originalEvent.rotation
            };
        },

        _onGestureEnd: function (e) {
            var that = this;

            setTimeout( function () {
                that._gesture = false;
            }, 100 );
        },
        
        _onGestureChange: function (e) {
            this.element.css( kendo.support.transitions.css + 'transform', 'scale(' + Math.min( 5, Math.max( .4, this._gestureStartProps.scale + e.originalEvent.scale - 1 )) +
                                                                           ') rotate(' + ( this._gestureStartProps.angle + e.originalEvent.rotation ) + 'deg)');
        },

        _onTouchStart: function (e) {
            this._touchStartProps = touchLocation(e);

            extend(this._touchStartProps, {
                left: parseInt( this.element.css('marginLeft'), 10 ) || 0,
                top: parseInt( this.element.css('marginTop'), 10 ) || 0
            });

            if (this._gesture) {
                e.preventDefault();
            }
        },

        _onTouchMove: function (e) {
            if (this._gesture) {
                e.preventDefault();
                var loc = touchLocation(e, this._touchStartProps.idx);

                if (loc) {
                    this.element.css({
                        marginLeft: this._touchStartProps.left + (loc.x - this._touchStartProps.x)*2,
                        marginTop: this._touchStartProps.top + (loc.y - this._touchStartProps.y)*2
                    });
                }
            }
        },

        _onTouchEnd: function (e) {
            if (this._gesture) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

    kendo.ui.plugin("Pincer", Pincer, Component);

})(jQuery, window);
