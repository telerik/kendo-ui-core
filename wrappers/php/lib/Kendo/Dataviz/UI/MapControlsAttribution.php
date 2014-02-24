<?php

namespace Kendo\Dataviz\UI;

class MapControlsAttribution extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the attribution control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapControlsAttribution
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
