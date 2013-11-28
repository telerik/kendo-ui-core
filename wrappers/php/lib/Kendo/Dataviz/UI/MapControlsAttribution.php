<?php

namespace Kendo\Dataviz\UI;

class MapControlsAttribution extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the attribution control. Possible values include:
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapControlsAttribution
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
