/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true, mocha: true, expr: true */

;(function (window, $, undefined) {

    'use strict';

    var expect = window.chai.expect,
        sinon = window.sinon,
        kendo = window.kendo,
        ui = kendo.ui,
        Rating = ui.Rating,
        FIXTURES = '#fixtures',
        RATING1 = '<input>',
        RATING2 = '<input data-role="rating" data-bind="value: current" data-max="10">';

    describe('kidoju.widgets.rating', function () {

        before(function () {
            if (window.__karma__ && $(FIXTURES).length === 0) {
                $('body').append('<div id="fixtures"></div>');
            }
        });

        describe('Availability', function () {

            it('requirements', function () {
                expect($).not.to.be.undefined;
                expect(kendo).not.to.be.undefined;
                expect(kendo.version).to.be.a('string');
                expect($.fn.kendoRating).to.be.an.instanceof(Function);
            });

        });

        describe('Initialization', function () {

            it('from code with all options', function () {
                var value = 4, min = 0, max = 10, step = 2;
                var element = $(RATING1).appendTo(FIXTURES);
                expect(element).to.match('input');
                var rating = element.kendoRating({
                    value: value,
                    min: min,
                    max: max,
                    step: step
                }).data('kendoRating');
                expect(rating).to.be.an.instanceof(Rating);
                var wrapper = rating.wrapper;
                expect(wrapper).to.be.an.instanceof($);
                expect(wrapper).to.have.class('k-widget');
                expect(wrapper).to.have.class('k-rating');
                expect(wrapper.find('input')).to.be.an.instanceof($).with.property('length', 1);
                expect(wrapper.find('span.k-rating-star')).to.be.an.instanceof($).with.property('length', Math.round((max - min)/step));
                expect(wrapper.find('span.k-rating-star.k-state-selected')).to.be.an.instanceof($).with.property('length', Math.round(value/step));
            });

            it('from code with minimal options', function () {
                var value = 2;
                var element = $(RATING1).appendTo(FIXTURES);
                expect(element).to.match('input');
                var rating = element.kendoRating({
                    value: value
                }).data('kendoRating');
                var min = rating.options.min, max = rating.options.max, step = rating.options.step;
                expect(min).to.equal(0);
                expect(max).to.equal(5);
                expect(step).to.equal(1);
                expect(rating).to.be.an.instanceof(Rating);
                var wrapper = rating.wrapper;
                expect(wrapper).to.have.class('k-widget');
                expect(wrapper).to.have.class('k-rating');
                expect(wrapper.find('input')).to.be.an.instanceof($).with.property('length', 1);
                expect(wrapper.find('span.k-rating-star')).to.be.an.instanceof($).with.property('length', Math.round((max - min)/step));
                expect(wrapper.find('span.k-rating-star.k-state-selected')).to.be.an.instanceof($).with.property('length', Math.round(value/step));
            });

            it('from markup', function () {
                var viewModel = kendo.observable({
                        rating: undefined
                    });
                var element =  $(RATING2).appendTo(FIXTURES);
                expect(element).to.match('input');
                kendo.bind(FIXTURES, viewModel);
                var rating = element.data('kendoRating');
                expect(rating).to.be.an.instanceof(Rating);
                var min = rating.options.min, max = rating.options.max, step = rating.options.step, value=rating.value();
                expect(min).to.equal(0);
                expect(max).to.equal(10);
                expect(step).to.equal(1);
                expect(value).to.equal(0);
                var wrapper = rating.wrapper;
                expect(wrapper).to.have.class('k-widget');
                expect(wrapper).to.have.class('k-rating');
                expect(wrapper.find('input')).to.be.an.instanceof($).with.property('length', 1);
                expect(wrapper.find('span.k-rating-star')).to.be.an.instanceof($).with.property('length', Math.round((max - min)/step));
                expect(wrapper.find('span.k-rating-star.k-state-selected')).to.be.an.instanceof($).with.property('length', Math.round(value/step));
            });
        });

        describe('Methods', function () {

            var element, rating, value1 = 1, value2 = 2;

            beforeEach(function () {
                element = $(RATING1).appendTo(FIXTURES);
                rating = element.kendoRating({
                    value: value1
                }).data('kendoRating');
            });

            it('value (get)', function () {
                expect(rating).to.be.an.instanceof(Rating);
                expect(rating.value()).to.equal(value1);
                expect(parseFloat(rating.element.val())).to.equal(value1);
            });

            it('value (set)', function () {
                expect(rating).to.be.an.instanceof(Rating);
                rating.value(value2);
                expect(rating.value()).to.equal(value2);
                expect(parseFloat(rating.element.val())).to.equal(value2);
            });

            it('value (range error)', function () {
                var fn = function () {
                    rating.value(100);
                };
                expect(rating).to.be.an.instanceof(Rating);
                expect(fn).to.throw(RangeError);
            });

            it('enable/readonly', function () {
                expect(rating).to.be.an.instanceof(Rating);
                expect(rating.wrapper).to.be.an.instanceof($).with.property('length', 1);
                rating.enable(false);
                expect(rating.wrapper).to.have.class('k-state-disabled');
                rating.enable(true);
                expect(rating.wrapper).not.to.have.class('k-state-disabled');
            });

            //it('visible', function () {
                //expect(rating).to.be.an.instanceof(Rating);
                //expect(rating.wrapper).to.be.an.instanceof($).with.property('length', 1);
                //TODO
            //});

            //it('destroy', function () {
                // TODO
            //});

        });

        describe('MVVM', function () {

            var element, rating, viewModel;

            /*
             // For obscure reasons, setting the viewModel here does not work
             viewModel = kendo.observable({
                rating: undefined
             });
             */

            beforeEach(function () {
                element = $(RATING2).appendTo(FIXTURES);
                viewModel = kendo.observable({
                    current: undefined
                });
                kendo.bind(FIXTURES, viewModel);
                rating = element.data('kendoRating');
            });

            it('Changing the value in the viewModel changes the number of plain/selected stars', function () {
                expect(rating).to.be.an.instanceof(Rating);
                var min = rating.options.min, max = rating.options.max, step = rating.options.step;
                var count = Math.round((max-min)/step);
                var input = rating.wrapper.find('input');
                expect(input).to.be.an.instanceof($).with.property('length', 1);
                var stars = rating.wrapper.find('span.k-rating-star');
                expect(stars).to.be.an.instanceof($).with.property('length', count);
                for (var value = min; value <= max; value+= step) {
                    viewModel.set('current', value);
                    expect(parseFloat(input.val())).to.equal(value);
                    var pos = Math.round((value-min)/step)-1;
                    for (var i = 0; i < count; i++) {
                        if (i <= pos) {
                            expect($(stars.get(i))).to.have.class('k-state-selected');
                        } else {
                            expect($(stars.get(i))).to.not.have.class('k-state-selected');
                        }
                    }
                }
            });

            it('Clicking a star updates the value in the viewModel', function () {
                expect(rating).to.be.an.instanceof(Rating);
                var min = rating.options.min, max = rating.options.max, step = rating.options.step;
                var count = Math.round((max-min)/step);
                var input = rating.wrapper.find('input');
                expect(input).to.be.an.instanceof($).with.property('length', 1);
                var stars = rating.wrapper.find('span.k-rating-star');
                expect(stars).to.be.an.instanceof($).with.property('length', count);
                for (var pos = 0; pos < count; pos++) {
                    $(stars.get(pos)).simulate('click');
                    expect(parseFloat(input.val())).to.equal(min+(pos+1)*step);
                    for(var i = 0; i < count; i++) {
                        if (i <= pos) {
                            expect($(stars.get(i))).to.have.class('k-state-selected');
                        } else {
                            expect($(stars.get(i))).to.not.have.class('k-state-selected');
                        }
                    }
                }
            });

        });

        describe('UI Interactions', function () {

            var element, rating;

            beforeEach(function () {
                element = $(RATING1).appendTo(FIXTURES);
                rating = element.kendoRating().data('kendoRating');
            });

            it('mouseover', function() {
                expect(rating).to.be.an.instanceof(Rating);
                var min = rating.options.min, max = rating.options.max, step = rating.options.step;
                var count = Math.round((max-min)/step);
                var stars = rating.wrapper.find('span.k-rating-star');
                expect(stars).to.be.an.instanceof($).with.property('length', count);
                for (var pos = 0; pos < count; pos++) {
                    $(stars.get(pos)).simulate('mouseover');
                    for(var i = 0; i < count; i++) {
                        if (i <= pos) {
                            expect($(stars.get(i))).to.have.class('k-state-hover');
                        } else {
                            expect($(stars.get(i))).to.not.have.class('k-state-hover');
                        }
                    }
                }
            });

        });

        describe('Events', function () {

            var element, rating;

            beforeEach(function () {
                element = $(RATING1).appendTo(FIXTURES);
            });

            it('change', function () {
                var change = sinon.spy();
                rating = element.kendoRating({
                    change: function (e) {
                        change(e.value);
                    }
                }).data('kendoRating');
                expect(rating).to.be.an.instanceof(Rating);
                var min = rating.options.min, max = rating.options.max, step = rating.options.step, value = rating.value();
                expect(min).to.equal(0);
                expect(max).to.equal(5);
                expect(step).to.equal(1);
                for (var i = min; i <= max; i += step) {
                    rating.value(i);
                    expect(change).to.have.callCount(i+1);
                    expect(change).to.have.been.calledWith(i);
                }
            });
        });

        afterEach(function () {
            var fixtures = $(FIXTURES);
            kendo.unbind(fixtures);
            kendo.destroy(fixtures);
            fixtures.find('*').off();
            fixtures.empty();
        });

    });

}(this, jQuery));
