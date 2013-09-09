kendo_module({
    id: "diagram.utils",
    name: "Utils",
    category: "diagram",
    depends: ["core"]
});

(function ($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.diagram = {},
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        EPSILON = 1e-06;

    /*-------------------Diverse utilities----------------------------*/
    var Utils = Class.extend({
    });

    deepExtend(Utils, {
        isNearZero: function (num) {
            return Math.abs(num) < EPSILON;
        },
        isDefined: function (obj) {
            return typeof obj !== 'undefined';
        },

        isUndefined: function (obj) {
            return (typeof obj === 'undefined') || obj === null;
        },
        /**
         * Returns whether the given object is an object or a value.
         */
        isObject: function (obj) {
            return obj === Object(obj);
        },
        /**
         * Returns whether the object has a property with the given name.
         */
        has: function (obj, key) {
            return Object.hasOwnProperty.call(obj, key);
        },
        /**
         * Returns whether the given object is a function.
         */
        isFunction: function (obj) {
            return typeof obj === 'function';
        },
        /**
         * Returns whether the given object is a string.
         */
        isString: function (obj) {
            return Object.prototype.toString.call(obj) == '[object String]';
        },
        isType: function (obj, type) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        },
        /**
         * Returns whether the given object is a number.
         */
        isNumber: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        /**
         * Return whether the given object (array or dictionary).
         */
        isEmpty: function (obj) {
            if (obj === null) {
                return true;
            }
            if (Utils.isArray(obj) || Utils.isString(obj)) {
                return obj.length === 0;
            }
            for (var key in obj) {
                if (Utils.has(obj, key)) {
                    return false;
                }
            }
            return true;
        },
        /**
         * Returns whether the object is an array.
         */
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) == '[object Array]';
        },
        /**
         * Returns an array of the specified size and with each entry set to the given value.
         * @param size
         * @param value
         * @returns {Array}
         */
        initArray: function createIdArray(size, value) {
            var array = [];
            for (var i = 0; i < size; ++i) {
                array[i] = value;
            }
            return array;
        },

        /**
         * Returns an integer within the given bounds.
         * @param lower The inclusive lower bound.
         * @param upper The exclusive upper bound.
         * @returns {number}
         */
        randomInteger: function (lower, upper) {
            return parseInt(Math.floor(Math.random() * upper) + lower, 10);
        }
    });

    /*-------------------Diverse math functions----------------------------*/

    Math.sign = function (number) {
        return number ? number < 0 ? -1 : 1 : 0;
    };
    Math.epsilon = 0.000001;

    Math.findRadian = function (start, end) {
        if (start == end) {
            return 0;
        }
        var sngXComp = end.x - start.x,
            sngYComp = start.y - end.y,
            atan = Math.atan(sngXComp / sngYComp);
        if (sngYComp >= 0) {
            return sngXComp < 0 ? atan + (2 * Math.PI) : atan;
        }
        return atan + Math.PI;
    };

    Math.findAngle = function (center, end) {
        return Math.findRadian(center, end) * 180 / Math.PI;
    };

    /*-------------------Array Extensions ----------------------------*/

    if (!Array.prototype.any) {
        Array.prototype.any = function (predicate, thisRef) {
            for (var i = 0; i < this.length; ++i) {
                if (predicate.call(thisRef, this[i])) {
                    return this[i];
                }
            }
            return null;
        };
    }

    if (!Array.prototype.remove) {
        Array.prototype.remove = function () {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };
    }

    if (!Array.prototype.flatten) {
        Array.prototype.flatten = function () {
            return Array.prototype.concat.apply([], this);
        };
    }

    if (!Array.prototype.distinct) {
        Array.prototype.distinct = function () {
            var a = this;
            var r = [];
            for (var i = 0; i < a.length; i++) {
                if (r.indexOf(a[i]) < 0) {
                    r.push(a[i]);
                }
            }
            return r;
        };
    }

    if (!Array.prototype.contains) {
        Array.prototype.contains = function (obj) {
            var i = this.length;
            while (i--) {
                if (this[i] == obj) {
                    return true;
                }
            }
            return false;
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (element) {
            for (var i = 0; i < this.length; ++i) {
                if (this[i] === element) {
                    return i;
                }
            }
            return -1;
        };
    }

    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (predicate, thisRef) {
            var result = [];
            for (var i = 0; i < this.length; ++i) {
                if (predicate.call(thisRef, this[i])) {
                    result.push(this[i]);
                }
            }
            return result;
        };
    }

    if (!Array.prototype.each) {
        Array.prototype.each = Array.prototype.forEach;
    }

    if (!Array.prototype.map) {
        /**
         Maps the given functional to each element of the array. See also the 'apply' method which accepts in addition some parameters.
         */
        Array.prototype.map = function (iterator, context) {
            var results = [];
            this.forEach(function (value, index, list) {
                results.push(iterator.call(context, value, index, list));
            });
            return results;
        };
    }

    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (iterator, acc, context) {
            var initial = arguments.length > 1;
            this.forEach(function (value, index, list) {
                if (!initial) {
                    acc = value;
                    initial = true;
                }
                else {
                    acc = iterator.call(context, acc, value, index, list);
                }
            });
            if (!initial) {
                throw 'Reduce of empty array with no initial value';
            }
            return acc;
        };
    }

    if (!Array.prototype.fold) {
        Array.prototype.fold = Array.prototype.reduce;
    }

    if (!Array.prototype.foldl) {
        Array.prototype.foldl = Array.prototype.reduce;
    } // aka fold left

    if (!Array.prototype.sameAs) {
        Array.prototype.sameAs = function (array) {
            if (!array) {
                return false;
            }
            if (this.length != array.length) {
                return false;
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].compare(array[i])) {
                        return false;
                    }
                }
                else if (this[i] != array[i]) {
                    // Warning - two different object instances will never be equal: {x:20} != {x:20}
                    return false;
                }
            }
            return true;
        };
    }

    if (!Array.prototype.find) {
        Array.prototype.find = function (iterator, context) {
            var result;
            this.any(function (value, index, list) {
                if (iterator.call(context, value, index, list)) {
                    result = value;
                    return true;
                }
                return false;
            });
            return result;
        };
    }

    if (!Array.prototype.first) {
        Array.prototype.first = function (constraint, context) {
            if (this.length === 0) {
                return null;
            }
            if (Utils.isUndefined(constraint)) {
                return this[0];
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    var item = this[i];
                    if (constraint.call(context, item, i, this)) {
                        return item;
                    }
                }
                return null;
            }
        };
    }

    if (!Array.prototype.insert) {
        /**
         * Inserts the given element at the specified position and returns the result.
         */
        Array.prototype.insert = function (element, position) {
            this.splice(position, 0, element);
            return this;
        };
    }

    if (!Array.prototype.prepend) {
        /**
         * Inserts the given item at begin of array.
         */
        Array.prototype.prepend = function () {
            this.unshift.apply(this, arguments); // tricky way to prepend any number of arguments. by Niko :)
            // this.splice(0, 0, x);
            return this;
        };
    }

    if (!Array.prototype.append) {
        Array.prototype.append = function (x) {
            this.splice(this.length, 0, x);
            return this;
        };
    }

    if (!Array.prototype.apply) {
        Array.prototype.apply = function (method) {
            var args = Array.prototype.slice.call(arguments, 1).prepend(0);  // dummy holder at first position to replace in apply below
            var isFunc = Utils.isFunction(method);
            return this.map(function (value) {
                args.splice(0, 1, value);
                return (isFunc ? method : value[method]).apply(method, args);
            });
        };
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (iterator, context) {
            var results = [];
            this.forEach(function (value, index, list) {
                if (iterator.call(context, value, index, list)) {
                    results.push(value);
                }
            });
            return results;
        };
    }

    if (!Array.prototype.select) {
        Array.prototype.select = Array.prototype.filter;
    }

    if (!Array.prototype.where) {
        Array.prototype.where = function (constraint, first) {
            if (Utils.isUndefined(constraint)) {
                return first ? void 0 : [];
            }
            return first ? this.first(constraint) : this.filter(constraint);
        };
    }

    if (!Array.prototype.add) {
        Array.prototype.add = Array.prototype.push;
    }

    if (!Array.prototype.isEmpty) {
        Array.prototype.isEmpty = function () {
            return this.length === 0;
        };
    }

    if (!Array.prototype.all) {
        Array.prototype.all = function (iterator, context) {
            var result = true;
            this.forEach(function (value, index, list) {
                if (!(result = result && iterator.call(context, value, index, list))) {
                    return {};
                }
            });
            return !!result;
        };
    }

    if (!Array.prototype.every) {
        Array.prototype.every = Array.prototype.all;
    }

    if (!Array.prototype.shuffle) {
        /**
         * Shuffles the elements of this array in a random order.
         */
        Array.prototype.shuffle = function () {
            this.sort(function () {
                return 0.5 - Math.random();
            });
        };
    }

    if (!Array.prototype.clear) {
        //why not just setting the variable to []? It causes problems if used as byref argument; it will be another object than the one passed.
        Array.prototype.clear = function () {
            while (this.length > 0) {
                this.pop();
            }
        };
    }

    if (!Array.prototype.bisort) {
        /**
         * Sort the arrays on the basis of the first one (considered as keys and the other array as values).
         * @param a
         * @param b
         * @param sortfunc (optiona) sorting function for the values in the first array
         */
        Array.prototype.bisort = function (a, b, sortfunc) {
            if (Utils.isUndefined(a)) {
                throw "First array is not specified.";
            }
            if (Utils.isUndefined(b)) {
                throw "Second array is not specified.";
            }
            if (a.length != b.length) {
                throw "The two arrays should have equal length";
            }

            var all = [], i;

            // Miro - not used.
//            var sort_by = function (field, reverse, primer) {
//
//                var key = function (x) {
//                    return primer ? primer(x[field]) : x[field];
//                };
//
//                return function (a, b) {
//                    var A = key(a), B = key(b);
//                    return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1, 1][+!!reverse];
//                };
//            };

            for (i = 0; i < a.length; i++) {
                all.push({ 'x': a[i], 'y': b[i] });
            }
            if (Utils.isUndefined(sortfunc)) {
                all.sort(function (m, n) {
                    return m.x - n.x;
                });
            }
            else {
                all.sort(function (m, n) {
                    return sortfunc(m.x, n.x);
                });
            }

            a.clear(); // do not set to [], the ref will be gone
            b.clear();

            for (i = 0; i < all.length; i++) {
                a.push(all[i].x);
                b.push(all[i].y);
            }
        };
    }

    if (!Array.prototype.addRange) {
        Array.prototype.addRange = function (range) {
            for (var i = 0; i < range.length; i++) {
                this.push(range[i]);
            }
        };
    }

    kendo.deepExtend(diagram, {
        init: function (element) {
            kendo.init(element, kendo.diagram.ui);
        },

        Utils: Utils
    });
})(window.kendo.jQuery);
