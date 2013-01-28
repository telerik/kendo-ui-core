<?php

namespace Kendo;

abstract class SerializableObject implements Serializable {
    private $properties = array();

    protected $ignore = array();

    public function toJSON() {
        $serializer = new Serializer();

        return $serializer->serialize($this);
    }

    public function properties() {
        $properties = array();

        foreach($this->properties as $key => $value) {
            if (!in_array($key, $this->ignore)) {
                $properties[$key] = $value;
            }
        }

        return $properties;
    }

    protected function add($key, $value) {
        $values = array();

        if (array_key_exists($key, $this->properties)) {
            $values = $this->properties[$key];
        }

        if ($value instanceof Serializable) {
            $value = $value->properties();
        }

        $values[] = $value;

        $this->properties[$key] = $values;

        return $this;
    }

    protected function getProperty($key) {
        return $this->properties[$key];
    }

    protected function setProperty($key, $value) {
        if ($value instanceof Serializable) {
            $value = $value->properties();
        }

        $this->properties[$key] = $value;

        return $this;
    }
}

?>
