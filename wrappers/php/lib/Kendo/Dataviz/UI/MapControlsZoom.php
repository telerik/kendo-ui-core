<?php

namespace Kendo\Dataviz\UI;

class MapControlsZoom extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the zoom control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapControlsZoom
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
