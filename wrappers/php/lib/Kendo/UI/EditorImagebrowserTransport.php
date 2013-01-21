<?php

namespace Kendo\UI;

class EditorImagebrowserTransport extends \Kendo\SerializableObject {
//>> Properties

    public function read($value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function thumbnailUrl($value) {
        $this->setProperty('thumbnailUrl', $value);

        return $this;
    }

    public function uploadUrl($value) {
        $this->setProperty('uploadUrl', $value);

        return $this;
    }

    public function imageUrl($value) {
        $this->setProperty('imageUrl', $value);

        return $this;
    }

    public function destroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function create($value) {
        $this->setProperty('create', $value);

        return $this;
    }

//<< Properties
}

?>
