<?php

namespace Kendo\Dataviz\UI;

class DiagramShape extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Adds DiagramShapeConnector to the DiagramShape.
    * @param \Kendo\Dataviz\UI\DiagramShapeConnector|array,... $value one or more DiagramShapeConnector to add.
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function addConnector($value) {
        return $this->add('connectors', func_get_args());
    }

    /**
    * Defines the shapes content settings.
    * @param \Kendo\Dataviz\UI\DiagramShapeContent|array $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Defines the shape editable options.
    * @param boolean|\Kendo\Dataviz\UI\DiagramShapeEditable|array $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * Defines the fill options of the shape.
    * @param string|\Kendo\Dataviz\UI\DiagramShapeFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Defines the height of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Defines the hover configuration.
    * @param \Kendo\Dataviz\UI\DiagramShapeHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * The unique identifier for a Shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    /**
    * Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function minHeight($value) {
        return $this->setProperty('minHeight', $value);
    }

    /**
    * Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function minWidth($value) {
        return $this->setProperty('minWidth', $value);
    }

    /**
    * The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function path($value) {
        return $this->setProperty('path', $value);
    }

    /**
    * The function that positions the connector.
    * @param \Kendo\Dataviz\UI\DiagramShapeRotation|array $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

    /**
    * The source of the shape image. Applicable when the type is set to "image".
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function source($value) {
        return $this->setProperty('source', $value);
    }

    /**
    * Defines the stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramShapeStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Specifies the type of the Shape using any of the built-in shape type.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Sets the visual option of the DiagramShape.
    * A function returning a visual element to render for this shape.
See visual.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function visual($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('visual', $value);
    }

    /**
    * Defines the width of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Defines the x-coordinate of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function x($value) {
        return $this->setProperty('x', $value);
    }

    /**
    * Defines the y-coordinate of the shape when added to the diagram.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShape
    */
    public function y($value) {
        return $this->setProperty('y', $value);
    }

//<< Properties
}

?>
