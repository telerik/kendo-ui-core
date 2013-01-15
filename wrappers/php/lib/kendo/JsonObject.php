<?php

namespace kendo;

interface Json {
    public function json();
}

abstract class JsonObject implements Json {
    private $json = array();

    public function toJSON() {
        return json_encode($this->json, JSON_FORCE_OBJECT);
    }

    public function json() {
        return $this->json;
    }

    protected function setProperty($key, $value) {
        if ($value instanceof Json) {
            $value = $value->json();
        }

        $this->json[$key] = $value;
    }
}

?>
