<?php

namespace Kendo;

class Serializer {
    public function serialize($value) {
        $out = array();

        $this->serializeValue($out, $value);

        return implode($out);
    }

    private function serializeDate(array &$out, $value) {
        $out[] = 'new Date(';
        $out[] =  $value->getTimestamp() * 1000;
        $out[] = ')';
    }

    private function serializeAssociativeArray(array &$out, array $array) {
        $out[] = '{';

        foreach ($array as $key => $value) {
            $out[] = '"';
            $out[] = $key;
            $out[] = '":';

            $this->serializeValue($out, $value);

            $out[] = ',';
        }

        if (end($out) == ',') {
            array_pop($out);
        }

        $out[] = '}';
    }

    private function serializeArray(array &$out, array $array) {
        $out[] = '[';

        $length = count($array);

        for ($index = 0; $index < $length; $index++) {
            $this->serializeValue($out, $array[$index]);

            if ($index < $length - 1) {
                $out[] = ',';
            }
        }

        $out[] = ']';
    }

    private function associativeArray(array $array) {
        return (bool)count(array_filter(array_keys($array), 'is_string'));
    }

    private function serializeValue(array &$out, $value) {
        if ($value instanceof \DateTime) {
            $this->serializeDate($out, $value);
        } else if ($value instanceof Serializable) {
            $this->serializeAssociativeArray($out, $value->properties());
        } else if ($value instanceof JavaScriptFunction) {
            $out[] = $value->value();
        } else if (is_array($value)) {
            if ($this->associativeArray($value) || empty($value)) {
                $this->serializeAssociativeArray($out, $value);
            } else {
                $this->serializeArray($out, $value);
            }
        } else {
            $out[] = json_encode($value, JSON_NUMERIC_CHECK);
        }
    }
}

?>
