<?php

namespace Kendo\UI;

class GridGroupableMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text displayed in the grouping drop area.
    * @param string $value
    * @return \Kendo\UI\GridGroupableMessages
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

//<< Properties
}

?>
