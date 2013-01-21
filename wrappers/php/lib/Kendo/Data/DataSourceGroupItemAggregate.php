<?php

namespace Kendo\Data;

class DataSourceGroupItemAggregate extends \kendo\SerializableObject {
//>> Properties

    public function field($value) {
        return $this->setProperty('field', $value);
    }

    public function aggregate($value) {
        return $this->setProperty('aggregate', $value);
    }

//<< Properties
}

?>
