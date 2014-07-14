<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the shape editable options.
    * @param boolean|\Kendo\Dataviz\UI\DiagramShapeDefaultsEditable|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function path($value) {
        return $this->setProperty('path', $value);
    }

    /**
    * Defines the stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaultsStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Specifies the type of the Shape using any of the built-in shape type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Defines the x-coordinate of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function x($value) {
        return $this->setProperty('x', $value);
    }

    /**
    * Defines the y-coordinate of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function y($value) {
        return $this->setProperty('y', $value);
    }

    /**
    * Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function minWidth($value) {
        return $this->setProperty('minWidth', $value);
    }

    /**
    * Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function minHeight($value) {
        return $this->setProperty('minHeight', $value);
    }

    /**
    * Defines the width of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Defines the height of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Defines the fill options of the shape.
    * @param string|\Kendo\Dataviz\UI\DiagramShapeDefaultsFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Defines the hover configuration.
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaultsHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * Adds DiagramShapeDefaultsConnector to the DiagramShapeDefaults.
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaultsConnector|array,... $value one or more DiagramShapeDefaultsConnector to add.
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function addConnector($value) {
        return $this->add('connectors', func_get_args());
    }

    /**
    * 
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaultsRotation|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

    /**
    * Defines the shapes content settings.
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaultsContent|array $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * The source of the shape image. Applicable when the type is set to "image".
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function source($value) {
        return $this->setProperty('source', $value);
    }

    /**
    * Sets the visual option of the DiagramShapeDefaults.
    * A function returning a visual element to render for a given shape. The following primitives can be used to construct a composite visual:
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaults
    */
    public function visual($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('visual', $value);
    }

//<< Properties
}

?>
