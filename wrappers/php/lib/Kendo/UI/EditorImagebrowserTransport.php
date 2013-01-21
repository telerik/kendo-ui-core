<?php

namespace Kendo\UI;

class EditorImagebrowserTransport extends \Kendo\SerializableObject {
//>> Properties

    public function read($value) {
        return $this->setProperty('read', $value);
    }

    public function thumbnailUrl($value) {
        return $this->setProperty('thumbnailUrl', $value);
    }

    public function uploadUrl($value) {
        return $this->setProperty('uploadUrl', $value);
    }

    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    public function create($value) {
        return $this->setProperty('create', $value);
    }

//<< Properties
}

?>
