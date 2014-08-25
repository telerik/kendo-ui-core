<?php

namespace Kendo\Dataviz\UI;

class Map extends \Kendo\UI\Widget {
    public function name() {
        return 'Map';
    }
//>> Properties

    /**
    * The map center. Coordinates are listed as [Latitude, Longitude].
    * @param array| $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function center($value) {
        return $this->setProperty('center', $value);
    }

    /**
    * The configuration of built-in map controls.
    * @param \Kendo\Dataviz\UI\MapControls|array $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function controls($value) {
        return $this->setProperty('controls', $value);
    }

    /**
    * The default configuration for map layers by type.
    * @param \Kendo\Dataviz\UI\MapLayerDefaults|array $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function layerDefaults($value) {
        return $this->setProperty('layerDefaults', $value);
    }

    /**
    * Adds MapLayer to the Map.
    * @param \Kendo\Dataviz\UI\MapLayer|array,... $value one or more MapLayer to add.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function addLayer($value) {
        return $this->add('layers', func_get_args());
    }

    /**
    * The default options for all markers.
    * @param \Kendo\Dataviz\UI\MapMarkerDefaults|array $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function markerDefaults($value) {
        return $this->setProperty('markerDefaults', $value);
    }

    /**
    * Adds MapMarker to the Map.
    * @param \Kendo\Dataviz\UI\MapMarker|array,... $value one or more MapMarker to add.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function addMarker($value) {
        return $this->add('markers', func_get_args());
    }

    /**
    * The minimum zoom level.
Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).
    * @param float $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function minZoom($value) {
        return $this->setProperty('minZoom', $value);
    }

    /**
    * The maximum zoom level.
Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).
    * @param float $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function maxZoom($value) {
        return $this->setProperty('maxZoom', $value);
    }

    /**
    * The size of the map in pixels at zoom level 0.
    * @param float $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function minSize($value) {
        return $this->setProperty('minSize', $value);
    }

    /**
    * Controls whether the user can pan the map.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function pannable($value) {
        return $this->setProperty('pannable', $value);
    }

    /**
    * Specifies whether the map should wrap around the east-west edges.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function wraparound($value) {
        return $this->setProperty('wraparound', $value);
    }

    /**
    * The initial zoom level.Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).The map size is derived from the zoom level and minScale options: size = (2 ^ zoom) * minSize
    * @param float $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function zoom($value) {
        return $this->setProperty('zoom', $value);
    }

    /**
    * Controls whether the map zoom level can be changed by the user.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Map
    */
    public function zoomable($value) {
        return $this->setProperty('zoomable', $value);
    }

    /**
    * Sets the beforeReset event of the Map.
    * Fired immediately before the map is reset.
This event is typically used for cleanup by layer implementers.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function beforeReset($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('beforeReset', $value);
    }

    /**
    * Sets the click event of the Map.
    * Fired when the user clicks on the map.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function click($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('click', $value);
    }

    /**
    * Sets the markerActivate event of the Map.
    * Fired when a marker has been displayed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function markerActivate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('markerActivate', $value);
    }

    /**
    * Sets the markerCreated event of the Map.
    * Fired when a marker has been created and is about to be displayed.
Cancelling the event will prevent the marker from being shown.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function markerCreated($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('markerCreated', $value);
    }

    /**
    * Sets the markerClick event of the Map.
    * Fired when a marker has been clicked or tapped.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function markerClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('markerClick', $value);
    }

    /**
    * Sets the pan event of the Map.
    * Fired while the map viewport is being moved.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function pan($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('pan', $value);
    }

    /**
    * Sets the panEnd event of the Map.
    * Fires after the map viewport has been moved.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function panEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('panEnd', $value);
    }

    /**
    * Sets the reset event of the Map.
    * Fired when the map is reset.
This typically occurs on initial load and after a zoom/center change.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function reset($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('reset', $value);
    }

    /**
    * Sets the shapeClick event of the Map.
    * Fired when a shape is clicked or tapped.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function shapeClick($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('shapeClick', $value);
    }

    /**
    * Sets the shapeCreated event of the Map.
    * Fired when a shape is created, but is not rendered yet.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function shapeCreated($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('shapeCreated', $value);
    }

    /**
    * Sets the shapeMouseEnter event of the Map.
    * Fired when the mouse enters a shape.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function shapeMouseEnter($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('shapeMouseEnter', $value);
    }

    /**
    * Sets the shapeMouseLeave event of the Map.
    * Fired when the mouse leaves a shape.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function shapeMouseLeave($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('shapeMouseLeave', $value);
    }

    /**
    * Sets the zoomStart event of the Map.
    * Fired when the map zoom level is about to change.
Cancelling the event will prevent the user action.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function zoomStart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomStart', $value);
    }

    /**
    * Sets the zoomEnd event of the Map.
    * Fired when the map zoom level has changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Map
    */
    public function zoomEnd($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoomEnd', $value);
    }


//<< Properties
}

?>
