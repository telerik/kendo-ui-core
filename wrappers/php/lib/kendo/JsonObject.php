<?php

namespace kendo;

abstract class JsonObject implements Serializable {
    private $properties = array();

    public function toJSON() {
        $serializer = new Serializer();

        return $serializer->serialize($this);
    }

    public function properties() {
        return $this->properties;
    }

    protected function setProperty($key, $value) {
        if ($value instanceof Serializable) {
            $value = $value->properties();
        }

        $this->properties[$key] = $value;
    }
}

?>
