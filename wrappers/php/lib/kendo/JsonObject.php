<?php

namespace kendo;

abstract class JsonObject {
    protected $json = array();

    public function toJSON() {
        return json_encode($this->json, JSON_FORCE_OBJECT);
    }

    protected function setProperty($key, $value) {
        $this->json[$key] = $value;
    }
}

?>
