---
title: TileLayer
page_title: API reference for Kendo UI Map Layer
---

# kendo.dataviz.map.TileLayer : kendo.dataviz.map.Layer
A tile layer for displaying raster maps.

## Constructor Parameters

### map `kendo.dataviz.ui.Map`
The owner Map widget.

### options `Object`
The layer options.

## Fields

### map `kendo.dataviz.ui.Map`
The owner Map widget.

## Configuration

### urlTemplate `String`

The URL template for tile layer. Template variables:

* x - X coordinate of the tile
* y - Y coordinate of the tile
* zoom - zoom level
* subdomain - Subdomain for this tile

### subdomains `Array`

A list of sub-domains to use for loading tiles.
Alternating between different subdomains allows more requests to be executed in parallel.

### tileSize `Number` *(default: 256)*
The tile size in pixels.

## Methods

### show
Shows the layer, if not visible.

### hide
Hides the layer, if visible.

