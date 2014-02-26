<?php

namespace Kendo\Dataviz\UI;

class Diagram extends \Kendo\UI\Widget {
    public function name() {
        return 'Diagram';
    }
//>> Properties

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The scaling factor or the zoom when using the mouse-wheel to zoom in or out. If zoomRate is less than 1, zooming will be reverted. If zoomRate=1, then zooming will appear disabled.
    * @param float $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function zoomRate($value) {
        return $this->setProperty('zoomRate', $value);
    }

    /**
    * Sets the data source of the Diagram.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Defines whether items can be dropped on the diagram.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function draggable($value) {
        return $this->setProperty('draggable', $value);
    }

    /**
    * The layout of a diagram consists in arranging the shapes (sometimes also the connections) in some fashion in order to achieve an aesthetically pleasing experience to the user. It aims at giving a more direct insight in the information contained within the diagram and its relational structure.On a technical level, layout consists of a multitude of algorithms and optimizations:and various ad-hoc calculations which depend on the type of layout. The criteria on which an algorithm is based vary but the common denominator is:Kendo diagram includes three of the most used layout algorithms which should cover most of your layout needs - tree layout, force-directed layout and layered layout. Please, check the type property for more details regarding each type.The generic way to apply a layout is by calling the layout() method on the diagram. The method has a single parameter options. It is an object, which can contain parameters which are specific to the layout as well as parameters customizing the global grid layout. Parameters which apply to other layout algorithms can be included but are overlooked if not applicable to the chose layout type. This means that you can define a set of parameters which cover all possible layout types and simply pass it in the method whatever the layout define in the first parameter.
    * @param \Kendo\Dataviz\UI\DiagramLayout|array $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function layout($value) {
        return $this->setProperty('layout', $value);
    }

    /**
    * Sets the template option of the Diagram.
    * The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the Diagram.
    * The template which renders the content of the shape when bound to a dataSource. The names you can use in the template correspond to the properties used in the dataSource. See the dataSource topic below for a concrete example.
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * This defines whether the shapes can be resized. If set to false the adorner will not show the resizing thumbs, as can be seen below;
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function resizable($value) {
        return $this->setProperty('resizable', $value);
    }

    /**
    * This defines whether the shapes can be rotated. If set to false the adorner will not show the rotating thumb, as can be seen below;
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function rotatable($value) {
        return $this->setProperty('rotatable', $value);
    }

    /**
    * Sets the visualTemplate option of the Diagram.
    * A function returning a visual element to render for a given dataSource item. The following primitives can be used to construct a composite visual: Should redirect here to a more comprehensive overview of how to use the primitives.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function visualTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('visualTemplate', $value);
    }

    /**
    * Sets the visualTemplate option of the Diagram.
    * A function returning a visual element to render for a given dataSource item. The following primitives can be used to construct a composite visual: Should redirect here to a more comprehensive overview of how to use the primitives.
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function visualTemplate($value) {
        return $this->setProperty('visualTemplate', $value);
    }

    /**
    * Defines the connections configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaults|array $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function connectionDefaults($value) {
        return $this->setProperty('connectionDefaults', $value);
    }

    /**
    * Defines the shape options.
    * @param \Kendo\Dataviz\UI\DiagramShapeDefaults|array $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function shapeDefaults($value) {
        return $this->setProperty('shapeDefaults', $value);
    }

    /**
    * Collection of predefined connections to be added to the diagram
    * @param array $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function connections($value) {
        return $this->setProperty('connections', $value);
    }

    /**
    * Collection of predefined shapes to be added to the diagram
    * @param array $value
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function shapes($value) {
        return $this->setProperty('shapes', $value);
    }

    /**
    * Sets the change event of the Diagram.
    * Fired when an item is added or removed to/from the diagram.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the itemBoundsChange event of the Diagram.
    * Fired when the bounds of an item are changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function itemBoundsChange($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('itemBoundsChange', $value);
    }

    /**
    * Sets the itemRotate event of the Diagram.
    * Fired when an item is rotated.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function itemRotate($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('itemRotate', $value);
    }

    /**
    * Sets the pan event of the Diagram.
    * Fired when the user pans the diagram.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function pan($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('pan', $value);
    }

    /**
    * Sets the select event of the Diagram.
    * Fired when the user selects one or more items.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function select($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('select', $value);
    }

    /**
    * Sets the zoom event of the Diagram.
    * Fired when the user changes the diagram zoom level.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\Dataviz\UI\Diagram
    */
    public function zoom($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('zoom', $value);
    }


//<< Properties
}

?>
