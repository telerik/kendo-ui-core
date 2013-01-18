<?php

namespace kendo\data;

class DataSourceTransport extends \kendo\SerializableObject {
//>> Properties

    public function setCreate($value) {
        $this->setProperty('create', $value);

        return $this;
    }

    public function setCreate(\kendo\data\DataSourceTransportCreate $value) {
        $this->setProperty('create', $value);

        return $this;
    }

    public function setDestroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function setDestroy(\kendo\data\DataSourceTransportDestroy $value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function setParameterMap($value) {
        $this->setProperty('parameterMap', $value);

        return $this;
    }

    public function setRead($value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function setRead(\kendo\data\DataSourceTransportRead $value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function setUpdate($value) {
        $this->setProperty('update', $value);

        return $this;
    }

    public function setUpdate(\kendo\data\DataSourceTransportUpdate $value) {
        $this->setProperty('update', $value);

        return $this;
    }

//<< Properties
}

?>
