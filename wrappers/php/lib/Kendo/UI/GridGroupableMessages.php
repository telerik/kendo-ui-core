<?php

namespace Kendo\UI;

class GridGroupableMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the text of the empty grouping area message
    * @param string $value
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

//<< Properties
}

?>
