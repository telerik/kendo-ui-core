---
title: Implementing Ctrl + Drag Auto-Increment Behavior in Kendo UI for jQuery Spreadsheet
description: Learn how to implement Excel-like Ctrl + drag auto-increment functionality in Kendo UI for jQuery Spreadsheet.
type: how-to
page_title: How to Override AutoFillCommand for Ctrl + Drag Increment in Kendo UI Spreadsheet
meta_title: How to Override AutoFillCommand for Ctrl + Drag Increment in Kendo UI Spreadsheet
slug: ctrl-drag-auto-increment-kendo-ui-spreadsheet
tags: spreadsheet, kendo ui for jquery, autofillcommand, custom autofill, ctrl drag behavior
res_type: kb
ticketid: 1713134
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Spreadsheet </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.1.415 </td>
</tr>
</tbody>
</table>

## Description

I want to replicate Excel's Ctrl + drag auto-increment functionality in the [Kendo UI for jQuery Spreadsheet](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview). When dragging the autofill handle, numbers should copy by default. When holding the Ctrl key during the drag operation, the numbers should increment instead.

This knowledge base article also answers the following questions:
- How can I configure Ctrl + drag to increment values in Kendo UI Spreadsheet?
- How to override the autofill behavior in Kendo UI for jQuery Spreadsheet?
- How to customize numeric autofill logic in Kendo UI Spreadsheet?

## Solution

To achieve Excel-like Ctrl + drag auto-increment behavior in the Kendo UI for jQuery Spreadsheet, override the `AutoFillCommand` and internal `_previewFillFrom` methods.

### Overriding AutoFillCommand

Override the `AutoFillCommand.exec` method to intercept autofill execution. Check if the Ctrl key is held during the drag operation, then apply custom logic to increment numeric values.

```javascript
const AutoFillCommand = kendo.spreadsheet.AutoFillCommand;
const originalExec = AutoFillCommand.prototype.exec;

function buildSeeds(srcValues) {
  const seeds = [];
  for (let c = 0; c < srcValues[0].length; c++) {
    const colVals = srcValues.map(r => r[c]).filter(v => typeof v === "number");
    if (colVals.length) {
      const step = colVals.length > 1
        ? colVals[colVals.length - 1] - colVals[colVals.length - 2]
        : 1;
      seeds.push({ last: colVals[colVals.length - 1], step: step });
    } else {
      seeds.push(null);
    }
  }
  return seeds;
}

AutoFillCommand.prototype.exec = function () {
  const result = originalExec.apply(this, arguments);
  if (!ctrlHeld) return result;

  try {
    const sheet = this.sheet;
    const srcValues = sheet.range(this._srcRange).values();
    const seeds = buildSeeds(srcValues);
    if (!seeds.some(s => s !== null)) return result;

    const dBox = this._destRange;
    const oBox = this._srcRange;
    let nTop, nBottom, nLeft, nRight;
    if (dBox.bottom > oBox.bottom) {
      nTop = oBox.bottom + 1; nBottom = dBox.bottom; nLeft = oBox.left; nRight = oBox.right;
    } else if (dBox.top < oBox.top) {
      nTop = dBox.top; nBottom = oBox.top - 1; nLeft = oBox.left; nRight = oBox.right;
    } else if (dBox.right > oBox.right) {
      nTop = oBox.top; nBottom = oBox.bottom; nLeft = oBox.right + 1; nRight = dBox.right;
    } else if (dBox.left < oBox.left) {
      nTop = oBox.top; nBottom = oBox.bottom; nLeft = dBox.left; nRight = oBox.left - 1;
    } else {
      return result;
    }

    const rows = nBottom - nTop + 1;
    const cols = nRight - nLeft + 1;
    const newValues = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const seed = seeds[c % seeds.length];
        row.push(seed ? seed.last + seed.step * (r + 1) : undefined);
      }
      newValues.push(row);
    }

    sheet.range(nTop, nLeft, nBottom, nRight).values(newValues);
  } catch (err) {
    console.warn("Ctrl auto-increment failed:", err);
  }

  return result;
};
```

### Updating Drag Preview Hint

Override `_previewFillFrom` to update the drag preview hint, showing the incremented result during the drag operation.

```javascript
const originalPreview = kendo.spreadsheet.Range.prototype._previewFillFrom;
kendo.spreadsheet.Range.prototype._previewFillFrom = function (srcRange, direction) {
  const preview = originalPreview.apply(this, arguments);
  if (!ctrlHeld || !preview) return preview;

  try {
    const sheet = this.sheet();
    const srcValues = sheet.range(srcRange).values();
    if (!srcValues || !srcValues.length) return preview;

    const seeds = buildSeeds(srcValues);
    if (!seeds.some(s => s !== null)) return preview;

    const lastSeed = seeds.filter(s => s).pop();
    if (lastSeed) {
      const newCells = preview.direction & 1 ? 
        (preview._ref.right - srcRange.right) : 
        (preview._ref.bottom - srcRange.bottom);
      preview.hint = lastSeed.last + lastSeed.step * newCells;
    }
  } catch (err) {
    // Fall back to default behavior
  }
  return preview;
};
```

### Demo

Refer to the example below for a demonstration of the implementation.

```dojo
 <div id="spreadsheet" style="width: 100%"></div>
    <script type="text/javascript" charset="utf-8">
      const spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          {
            rows: [
              {
                cells: [
                  { value: "serial number" },
                  { value: "quantity" },
                  { value: "Code" },
                ],
              },
              {
                cells: [{ value: 1 }, { value: 5 }, { value: "A101" }],
              },
            ],
          },
        ],
        render: function (e) {
        },
        changing: function (e) {
        },
      }).data("kendoSpreadsheet");

      // Ctrl-drag auto-increment for numeric cells
      (function () {
        let ctrlHeld = false;

        // Track Ctrl key state at capture phase so the spreadsheet can't swallow it
        window.addEventListener("keydown", function (e) {
          if (e.key === "Control" || e.ctrlKey) ctrlHeld = true;
        }, true);
        window.addEventListener("keyup", function (e) {
          if (e.key === "Control" || !e.ctrlKey) ctrlHeld = false;
        }, true);

        // Override AutoFillCommand.exec — this is the actual method invoked
        // when the user drags the fill handle.
        const AutoFillCommand = kendo.spreadsheet.AutoFillCommand;
        const originalExec = AutoFillCommand.prototype.exec;

        // Helper: build numeric seeds (last value + step) from a 2D array of source values
        function buildSeeds(srcValues) {
          const seeds = [];
          for (let c = 0; c < srcValues[0].length; c++) {
            const colVals = srcValues.map(r => r[c]).filter(v => typeof v === "number");
            if (colVals.length) {
              const step = colVals.length > 1
                ? colVals[colVals.length - 1] - colVals[colVals.length - 2]
                : 1;
              seeds.push({ last: colVals[colVals.length - 1], step: step });
            } else {
              seeds.push(null);
            }
          }
          return seeds;
        }

        // Override Range._previewFillFrom so the drag hint (tooltip) reflects
        // the incremented end value while Ctrl is held.
        const originalPreview = kendo.spreadsheet.Range.prototype._previewFillFrom;
        kendo.spreadsheet.Range.prototype._previewFillFrom = function (srcRange, direction) {
          const preview = originalPreview.apply(this, arguments);
          if (!ctrlHeld || !preview) return preview;

          try {
            const sheet = this.sheet();
            const srcRangeObj = sheet.range(srcRange);
            const srcValues = srcRangeObj.values();
            if (!srcValues || !srcValues.length) return preview;

            const seeds = buildSeeds(srcValues);
            if (!seeds.some(s => s !== null)) return preview;

            // Determine how many new cells extend in the fill direction
            // direction: 0=down, 1=right, 2=up, 3=left  (bit 0 = horizontal)
            const dir = preview.direction;
            const horizontal = (dir & 1) === 1;

            // Source / destination boxes
            function box(ref) {
              if (ref.topLeft && ref.bottomRight) {
                return { top: ref.topLeft.row, left: ref.topLeft.col,
                         bottom: ref.bottomRight.row, right: ref.bottomRight.col };
              }
              return { top: ref.row, left: ref.col, bottom: ref.row, right: ref.col };
            }
            const sBox = box(srcRangeObj._ref);
            const dBox = box(this._ref);

            let newCells;
            if (horizontal) {
              newCells = (dBox.right - dBox.left + 1) - (sBox.right - sBox.left + 1);
            } else {
              newCells = (dBox.bottom - dBox.top + 1) - (sBox.bottom - sBox.top + 1);
            }
            if (newCells <= 0) return preview;

            // Pick a representative seed (last numeric column) and compute the
            // value at the far end of the filled area.
            const lastSeed = seeds.filter(s => s).pop();
            if (lastSeed) {
              preview.hint = lastSeed.last + lastSeed.step * newCells;
            }
          } catch (err) {
            // Fall back to the original hint
          }
          return preview;
        };

        AutoFillCommand.prototype.exec = function () {
          // Run the default fill first so all defaults (selection, change events) work.
          const result = originalExec.apply(this, arguments);

          if (!ctrlHeld) return result;

          try {
            const destRange = this.range();          // expanded range (source + filled)
            const originRefRaw = this._origin;       // source range (RangeRef or string)
            const sheet = destRange.sheet();
            const srcRange = sheet.range(originRefRaw);
            const srcValues = srcRange.values();
            if (!srcValues || !srcValues.length) return result;

            // Normalize a CellRef or RangeRef into {top,left,bottom,right}
            function box(ref) {
              if (ref.topLeft && ref.bottomRight) {
                return {
                  top: ref.topLeft.row,    left: ref.topLeft.col,
                  bottom: ref.bottomRight.row, right: ref.bottomRight.col
                };
              }
              return { top: ref.row, left: ref.col, bottom: ref.row, right: ref.col };
            }
            const oBox = box(srcRange._ref);
            const dBox = box(destRange._ref);

            // Build a numeric seed (last value + step) per source column
            const seeds = buildSeeds(srcValues);
            if (!seeds.some(s => s !== null)) return result;

            // Find the newly filled area = destRange minus originRef
            const dTop = dBox.top, dLeft = dBox.left, dBottom = dBox.bottom, dRight = dBox.right;
            const oTop = oBox.top, oLeft = oBox.left, oBottom = oBox.bottom, oRight = oBox.right;

            let nTop, nBottom, nLeft, nRight;
            if (dBottom > oBottom) {            // filled down
              nTop = oBottom + 1; nBottom = dBottom; nLeft = oLeft; nRight = oRight;
            } else if (dTop < oTop) {           // filled up
              nTop = dTop; nBottom = oTop - 1; nLeft = oLeft; nRight = oRight;
            } else if (dRight > oRight) {       // filled right
              nTop = oTop; nBottom = oBottom; nLeft = oRight + 1; nRight = dRight;
            } else if (dLeft < oLeft) {         // filled left
              nTop = oTop; nBottom = oBottom; nLeft = dLeft; nRight = oLeft - 1;
            } else {
              return result;
            }

            const rows = nBottom - nTop + 1;
            const cols = nRight - nLeft + 1;
            const newValues = [];
            for (let r = 0; r < rows; r++) {
              const row = [];
              for (let c = 0; c < cols; c++) {
                const seed = seeds[c % seeds.length];
                if (seed) {
                  row.push(seed.last + seed.step * (r + 1));
                } else {
                  row.push(undefined); // leave non-numeric cells unchanged
                }
              }
              newValues.push(row);
            }

            sheet.range(nTop, nLeft, nBottom, nRight).values(newValues);
          } catch (err) {
            console.warn("Ctrl auto-increment failed:", err);
          }

          return result;
        };
      })();
    </script>
```

## See Also

- [Kendo UI for jQuery Spreadsheet Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview)
- [Spreadsheet API](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/spreadsheet)
- [Spreadsheet Range API](https://docs.telerik.com/kendo-ui/api/spreadsheet/range)

