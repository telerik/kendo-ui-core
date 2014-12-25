<?php

namespace Kendo\Dataviz\UI;

class DiagramLayoutGrid extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the horizontal spacing between each component. The default is 50.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramLayoutGrid
    */
    public function componentSpacingX($value) {
        return $this->setProperty('componentSpacingX', $value);
    }

    /**
    * Defines the vertical spacing between each component. The default is 50.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramLayoutGrid
    */
    public function componentSpacingY($value) {
        return $this->setProperty('componentSpacingY', $value);
    }

    /**
    * Defines the left offset of the grid layout. The default is 50.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramLayoutGrid
    */
    public function offsetX($value) {
        return $this->setProperty('offsetX', $value);
    }

    /**
    * Defines the top offset of the grid layout. The default is 50.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramLayoutGrid
    */
    public function offsetY($value) {
        return $this->setProperty('offsetY', $value);
    }

    /**
    * Defines the width of the grid. The bigger this parameter the more components will be organized in an horizontal row. How many components really depends on your diagram and they type of layout applied to each component. The default is set to 800.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramLayoutGrid
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
