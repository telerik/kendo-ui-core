<?php

namespace Kendo\UI;

class TooltipContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies a URL or request options that the tooltip should load its content from.Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the iframe configuration option.
    * @param string $value
    * @return \Kendo\UI\TooltipContent
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

//<< Properties
}

?>
