<?php

namespace Kendo\Dataviz\UI;

class MapControlsNavigator extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the navigator control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapControlsNavigator
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
