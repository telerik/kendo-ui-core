---
title: StrokeOptions
page_title: API reference for Kendo UI Drawing API Stroke options
---

# kendo.drawing.StrokeOptions
Shape stroke configuration options.

## Fields

### color `String`
The stroke color in any of the following formats.

| Value          | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the stroke.

### dashType `String` *(default: "solid")*
The stroke dash type.

| Value            |                                              | Description
| ---              | :---:                                        | ---
| `dash`           | ![dash](images/stroke-dash.png)              | a line consisting of dashes
| `dashDot`        | ![dash](images/stroke-dash-dot.png)          | a line consisting of a repeating pattern of dash-dot
| `dot`            | ![dash](images/stroke-dot.png)               | a line consisting of dots
| `longDash`       | ![dash](images/stroke-long-dash.png)         | a line consisting of a repeating pattern of long-dash
| `longDashDot`    | ![dash](images/stroke-long-dash-dot.png)     | a line consisting of a repeating pattern of long-dash dot
| `longDashDotDot` | ![dash](images/stroke-long-dash-dot-dot.png) | a line consisting of a repeating pattern of long-dash dot-dot
| `solid`          | ![dash](images/stroke-solid.png)             | a solid line

### lineCap `String` *(default: "butt")*
The stroke line cap style.

| Value    |                                     | Description
| ---      | :---:                               | ---
| `butt`   | ![dash](images/line-cap-butt.png)   | a flat edge with no cap
| `round`  | ![dash](images/line-cap-round.png)  | a rounded cap
| `square` | ![dash](images/line-cap-square.png) | a square cap

### lineJoin `String` *(default: "miter")*
The stroke line join style.

| Value   |                                     | Description
| ---     | :---:                               | ---
| `bevel` | ![dash](images/line-join-bevel.png) | a beveled join
| `miter` | ![dash](images/line-join-miter.png) | a square join
| `round` | ![dash](images/line-join-round.png) | a rounded join

### opacity `Number`
The stroke opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

### width `Number`
The stroke width in pixels.
