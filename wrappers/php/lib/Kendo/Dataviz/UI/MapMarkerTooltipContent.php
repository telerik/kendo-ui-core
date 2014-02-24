<?php

namespace Kendo\Dataviz\UI;

class MapMarkerTooltipContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies a URL or request options that the tooltip should load its content from.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapMarkerTooltipContent
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

//<< Properties
}

?>
