<?php

function startsWith($haystack, $needle)
{
    return !strncmp($haystack, $needle, strlen($needle));
}

function endsWith($haystack, $needle)
{
    $length = strlen($needle);

    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}

function rmdir_r($dir) {
    $files = array_diff(scandir($dir), array('.','..'));

    foreach ($files as $file) {
        if (is_dir("$dir/$file")) {
            rmdir_r("$dir/$file");
        } else {
            unlink("$dir/$file");
        }
    }
    return rmdir($dir);
}

class ImageBrowserEntry {
    public $name;
    public $type = 'f';
    public $size;

    function __construct($name = null) {
        $this->name = $name;
    }
}

function getImageType($filename) {
    $info = getimagesize($filename);
    $type = $info[2];

    if ($type == IMAGETYPE_JPEG) {
        $type = 'jpeg';
    } elseif ($type == IMAGETYPE_GIF) {
        $type = 'gif';
    } elseif ($type == IMAGETYPE_PNG) {
        $type = 'png';
    }

    return $type;
}

class Thumbnail {
    private $image;
    private $type;

    function __construct($filename) {
        $type = getImageType($filename);
        $image = null;

        if ($type == 'jpeg') {
            $image = imagecreatefromjpeg($filename);
        } elseif ($type == 'gif') {
            $image = imagecreatefromgif($filename);
        } elseif ($type == 'png') {
            $image = imagecreatefrompng($filename);
        }

        $this->type = $type;
        $this->image = $image;
    }

    private function width() {
        return imagesx($this->image);
    }

    private function height() {
        return imagesy($this->image);
    }

    public function getType() {
        return $this->type;
    }

    // down-scales the image to a given container size
    public function downscale($containerSize = 80) {
        $width = $this->width();
        $height = $this->height();

        if ($width > $containerSize || $height > $containerSize) {
            if ($width < $height) {
                $ratio = $containerSize / $height;
                $width *= $ratio;
                $height = $containerSize;
            } else {
                $ratio = $containerSize / $width;
                $height *= $ratio;
                $width = $containerSize;
            }
        }

        $this->resize($width, $height);
    }

    private function persistTransparency($image) {
        if ($this->type == 'gif' || $this->type == 'png'){
            imagecolortransparent($image, imagecolorallocatealpha($image, 0, 0, 0, 127));
            imagealphablending($image, false);
            imagesavealpha($image, true);
        }
    }

    public function resize($width, $height) {
        $image = imagecreatetruecolor($width, $height);

        $this->persistTransparency($image);

        imagecopyresampled($image, $this->image, 0, 0, 0, 0, $width, $height, $this->width(), $this->height());

        $this->image = $image;
    }

    public function render() {
        $type = $this->type;
        $image = $this->image;

        if ($type == 'jpeg') {
            imagejpeg($image);
        } elseif ($type == 'gif') {
            imagegif($image);
        } elseif ($type == 'png') {
            imagepng($image);
        }
    }
}

class ImageBrowser {
    // path to file upload directory
    private $contentPath = '/../resources/imagebrowser/';

    private function canAccess($path) {
        return startsWith(realpath($path), realpath($this->contentPath));
    }

    private function ensureAccess($path) {
        if (!$this->canAccess($path)) {
            header('HTTP/1.0 403 Forbidden');
            die();
        }
    }

    private function normalize($path) {
        if (!endsWith($path, '/')) {
            $path .= '/';
        }

        return $path;
    }

    public function basePath() {
        return $this->normalize(realpath(dirname(__FILE__) . $this->contentPath));
    }

    public function getList($path) {
        $this->ensureAccess($path);

        header('Content-Type: application/json');

        $dir = array_map(function ($scan_entry) use ($path) {
            if (startsWith($scan_entry, '.')) {
                return;
            }

            $entry = new ImageBrowserEntry();

            $fullpath = realpath($path . $scan_entry);

            $entry->name = $scan_entry;
            $entry->type = is_dir($fullpath) ? 'd' : 'f';
            $entry->size = filesize($fullpath);

            if ($entry->type == 'f' && preg_match('/\\.(png|gif|jpg|jpeg)$/i', $scan_entry) == 0) {
                return;
            }

            return $entry;
        }, scandir($path));

        $entries = array();

        foreach ($dir as $entry) {
            if ($entry) {
                $entries[] = $entry;
            }
        }

        echo json_encode($entries);
    }

    public function setImageHeaders($path, $type) {
        if (!$type) {
            $type = getImageType($path);
        }

        header("Content-type: image/" . $type);
        header("Expires: Mon, 1 Jan 2099 05:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");

        // get the size for content length
        $size = filesize($path);
        header("Content-Length: $size bytes");

        ob_clean();
        flush();
    }

    public function getThumbnail($path) {
        $this->ensureAccess($path);

        $image = new Thumbnail($path);

        $this->setImageHeaders($path, $image->getType());

        $image->downscale();
        $image->render();
    }

    public function getImage($path) {
        $this->ensureAccess($path);

        $this->setImageHeaders($path);

        readfile($path);
    }

    public function destroy($path, $entry) {
        $target = $this->normalize($path) . $entry;

        $this->ensureAccess($target);

        if (is_dir($target)) {
            rmdir_r($target);
        } else {
            unlink($target);
        }
    }

    public function create($path, $entry) {
        $this->ensureAccess($path);

        mkdir($path . $entry);
    }

    public function saveFile($file, $path) {
        $path = $this->normalize($path);

        $this->ensureAccess($path);

        $name = basename($file['name']);

        $target = $path . $name;

        move_uploaded_file($file['tmp_name'], $target);

        header('Content-Type: application/json');

        $result = new ImageBrowserEntry();
        $result->size = filesize($target);
        $result->name = $name;

        echo json_encode($result);
    }
}

// serve response
parse_str($_SERVER['QUERY_STRING'], $parameters);

$imageBrowser = new ImageBrowser();

$action = $parameters['action'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $path = $imageBrowser->basePath() . (isset($_POST['path']) ? $_POST['path'] : '');
    $name = (isset($_POST['name']) ? $_POST['name'] : '');

    if ($action == 'read') {
        $imageBrowser->getList($path);
    } elseif ($action == 'create') {
        $imageBrowser->create($path, $name);
    } elseif ($action == 'destroy') {
        $imageBrowser->destroy($path, $name);
    } elseif ($action == 'upload') {
        if (isset($_FILES['file'])) {
            $imageBrowser->saveFile($_FILES['file'], $path);
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $path = $imageBrowser->basePath() . $parameters['path'];

    if ($action == 'thumbnail') {
        $imageBrowser->getThumbnail($path);
    } elseif ($action == 'image') {
        $imageBrowser->getImage($path);
    }
}

?>
