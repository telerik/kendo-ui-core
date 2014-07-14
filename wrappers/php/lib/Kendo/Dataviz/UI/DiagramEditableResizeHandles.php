<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandles extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the handles fill options.
    * @param string|\Kendo\Dataviz\UI\DiagramEditableResizeHandlesFill|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function fill($value) {
        return $this->setProperty('fill', $value);
    }

    /**
    * Specifies the handles stroke styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Set the handles hover styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * The hangles width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The hangles height.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

//<< Properties
}

?>
