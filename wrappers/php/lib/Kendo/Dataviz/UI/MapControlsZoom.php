<?php

namespace Kendo\Dataviz\UI;

class MapControlsZoom extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the zoom control. Possible values include:
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapControlsZoom
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
