<?php

namespace Kendo\Data;

class DataSourceTransport extends \Kendo\SerializableObject {
//>> Properties

    public function create($value) {
        return $this->setProperty('create', $value);
    }

    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    public function parameterMap($value) {
        return $this->setProperty('parameterMap', new \Kendo\JavaScriptFunction($value));
    }

    public function read($value) {
        return $this->setProperty('read', $value);
    }

    public function update($value) {
        return $this->setProperty('update', $value);
    }

//<< Properties
}

?>
