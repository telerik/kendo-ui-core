import '@progress/kendo-ui/src/kendo.spreadsheet.js';

let spreadsheet = kendo.spreadsheet;
let Ref = spreadsheet.Ref;
let calc = spreadsheet.calc;
let runtime = calc.runtime;

let Sheet1 = "Sheet1";

export const TEST_SpreadsheetData = kendo.Class.extend({
    init: function() {
        this.data = {};
        this.maxrow = 0;
        this.maxcol = 0;
    },
    onFormula: function(f) {
        let sheet = f.sheet, row = f.row, col = f.col, value = f.value;
        this.maxrow = Math.max(row, this.maxrow);
        this.maxcol = Math.max(col, this.maxcol);
        let cell = this.data[this.id(row, col)];
        if (!cell) {
            this.data[this.id(row, col)] = cell = {};
        }
        if (value instanceof Ref) {
            value = this.getData(value);
            if (Array.isArray(value)) {
                value = value[0];
            }
        }
        cell.value = value;
        return true;
    },
    getRefCells: function(ref) {
        if (ref instanceof spreadsheet.CellRef) {
            let cell = this.get(ref.row, ref.col);
            if (cell) {
                cell.sheet = Sheet1;
                cell.row = ref.row;
                cell.col = ref.col;
            }
            return cell ? [cell] : [];
        }
        if (ref instanceof spreadsheet.RangeRef) {
            ref = ref.intersect(this.bounds());
            if (!(ref instanceof spreadsheet.RangeRef)) {
                return this.getRefCells(ref);
            }
            let a = [];
            for (let row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                for (let col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    let cell = this.get(row, col);
                    if (cell) {
                        cell.sheet = Sheet1;
                        cell.row = row;
                        cell.col = col;
                        a.push(cell);
                    }
                }
            }
            return a;
        }
        if (ref instanceof spreadsheet.UnionRef) {
            let a = [];
            for (let i = 0; i < ref.refs.length; ++i) {
                a = a.concat(this.getRefCells(ref.refs[i]));
            }
            return a;
        }
        if (ref instanceof spreadsheet.NameRef) {
            return [{
                value: new kendo.spreadsheet.calc.runtime.CalcError("NAME")
            }];
        }
        return [];
    },
    nameValue: function(name) {
    },
    getData: function(ref) {
        if (!(ref instanceof spreadsheet.Ref)) {
            return ref;
        }
        let a = this.getRefCells(ref).filter(function(cell) {
            return cell.value != null;
        }).map(function(cell) {
            return cell.value;
        });
        return ref instanceof spreadsheet.CellRef ? a[0] : a;
    },
    makeRef: function(ref) {
        if (ref instanceof spreadsheet.Ref) {
            return ref;
        }
        return calc.parseReference(ref);
    },
    set: function(row, col, val) {
        let isArray = false, m;
        val += "";
        if ((m = /^{(=.*)}$/.exec(val))) {
            val = m[1];
            isArray = true;
        }
        val = calc.parse(Sheet1, row, col, val);
        if (val.type == "exp") {
            val = { formula: calc.compile(val), exp: val };
            if (isArray) {
                val.formula.arrayFormulaRange = true;
            }
        }
        this.maxrow = Math.max(row, this.maxrow);
        this.maxcol = Math.max(col, this.maxcol);
        this.data[this.id(row, col)] = val;
    },
    bounds: function() {
        return new spreadsheet.RangeRef(
            new spreadsheet.CellRef(0, 0, 0),
            new spreadsheet.CellRef(this.maxrow, this.maxcol, 0)
        ).setSheet(Sheet1);
    },
    get: function(row, col) {
        return this.data[this.id(row, col)];
    },
    id: function(row, col) {
        return row + ":" + col;
    },
    fill: function(data) {
        let self = this;
        if (typeof data == "string") {
            // alternate syntax.
            let ref = this.makeRef(data).toRangeRef();
            data = arguments[1];
            let i = 0;
            for (let row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                for (let col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    if (data instanceof runtime.Matrix) {
                        self.set(row, col, data.get(row, col));
                    } else {
                        self.set(row, col, data[i++]);
                    }
                }
            }
            if (arguments.length > 2) {
                this.fill.apply(this, Array.prototype.slice.call(arguments, 2));
            }
        } else {
            Object.keys(data).forEach(function(key) {
                let ref = self.makeRef(key);
                self.set(ref.row, ref.col, data[key]);
            });
            if (arguments.length > 1) {
                this.fill.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    },
    recalculate: function(callback) {
        let self = this;
        let cells = self.getRefCells(self.bounds()).filter(function(cell) {
            if (cell.formula) {
                cell.formula.reset();
                return true;
            }
        });
        let count = cells.length;
        if (callback && !count) {
            callback();
        }
        cells.forEach(function(cell) {
            cell.formula.exec(self, function() {
                if (!--count && callback) {
                    callback();
                }
            });
        });
    },
    $: function(x) {
        return this.getData(this.makeRef(x));
    },
    expectEqual: function(hash) {
        let self = this;
        Object.keys(hash).forEach(function(cell) {
            let val = self.$(cell);
            let expected = hash[cell];
            EQ(val, expected);
        });
    }
});

export function EQ(val, expected) {
    if (typeof val == "number" && typeof expected == "number") {
        val = runtime.limitPrecision(val);
        expected = runtime.limitPrecision(expected);
    }
    let orig = val;
    if (expected instanceof runtime.Matrix) {
        expected = expected.data;
    }
    if (val instanceof runtime.Matrix) {
        val = val.data;
    }
    if (Array.isArray(val) && Array.isArray(expected)) {
        assert.equal(val.length, expected.length);
        val.forEach(function(val, i) {
            EQ(val, expected[i]);
        });
        return;
    }
    if (expected instanceof APPROX) {
        if (typeof val != "number") {
            val = parseFloat(val);
        }
        assert.isOk(Math.abs(val - expected.val) < expected.eps, "Expected: " + expected.val + ", got: " + orig);
        if (!(Math.abs(val - expected.val) < expected.eps)) {
            // eslint-disable-next-line no-console
            console.log(val, expected.val);
        }
    } else {
        assert.equal(val, expected);
    }
}

export function APPROX(val, eps) {
    if (!(this instanceof APPROX)) {
        return new APPROX(val, eps);
    }
    if (!eps) {
        if (/\./.test(val)) {
            let tmp = (val + "").replace(/^.*\./, "");
            eps = Math.pow(10, -tmp.length);
        } else {
            eps = 0.9999999999;
        }
    }
    this.val = val;
    this.eps = eps;
}