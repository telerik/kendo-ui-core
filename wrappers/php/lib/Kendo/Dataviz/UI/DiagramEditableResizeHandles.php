<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandles extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the fill settings of the resizing handles. See the editable.resize configuration for an example.
    * @param string|\Kendo\Dataviz\UI\DiagramEditableResizeHandlesFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Specifies the height of the resizing handles. See the editable.resize configuration for an example.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Specifies the settings of the resizing handles on hovering over them. See the editable.resize configuration for an example.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * Specifies the stroke of the resizing handles. See the editable.resize configuration for an example.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Specifies the width of the resizing handles. See the editable.resize configuration for an example.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
