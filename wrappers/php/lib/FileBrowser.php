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

class FileBrowserEntry {
    public $name;
    public $type = 'f';
    public $size;

    function __construct($name = null) {
        $this->name = $name;
    }
}

class FileBrowser {
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

            $entry = new FileBrowserEntry();

            $fullpath = realpath($path . $scan_entry);

            $entry->name = $scan_entry;
            $entry->type = is_dir($fullpath) ? 'd' : 'f';
            $entry->size = filesize($fullpath);

            if ($entry->type == 'f' && preg_match('/\\.(txt|doc|docx|xls|xlsx|ppt|pptx|zip|rar|jpg|jpeg|gif|png)$/i', $scan_entry) == 0) {
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

    public function setFileHeaders($path, $name) {
        header("Content-type: application/octet-stream");
	header("Content-Disposition: attachment; filename=\"" . $name . "\"");
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

    public function getFile($path, $name) {
        $this->ensureAccess($path);

        $this->setFileHeaders($path, $name);

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

        $result = new FileBrowserEntry();
        $result->size = filesize($target);
        $result->name = $name;

        echo json_encode($result);
    }
}

// serve response
parse_str($_SERVER['QUERY_STRING'], $parameters);

$fileBrowser = new FileBrowser();

$action = $parameters['action'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $path = $fileBrowser->basePath() . (isset($_POST['path']) ? $_POST['path'] : '');
    $name = (isset($_POST['name']) ? $_POST['name'] : '');

    if ($action == 'read') {
        $fileBrowser->getList($path);
    } elseif ($action == 'create') {
        $fileBrowser->create($path, $name);
    } elseif ($action == 'destroy') {
        $fileBrowser->destroy($path, $name);
    } elseif ($action == 'upload') {
        if (isset($_FILES['file'])) {
            $fileBrowser->saveFile($_FILES['file'], $path);
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $path = $fileBrowser->basePath() . $parameters['path'];

    if ($action == 'file') {
        $fileBrowser->getFile($path, substr($path, strrpos($path, '/') + 1));
    }
}

?>
