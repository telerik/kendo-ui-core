<?php

function startsWith($haystack, $needle)
{
    return !strncmp($haystack, $needle, strlen($needle));
}

class ImageBrowserEntry {
    public $name;
    public $type = 'f';
    public $size;

    function __construct($name = null) {
        $this->name = $name;
    }
}

class ImageBrowser {
    private $contentPath = '/home/gyoshev/github/kendo/wrappers/php/content/shared/';

    private function canAccess($path) {
        return startsWith(realpath($path), realpath($this->contentPath));
    }

    private function ensureAccess($path) {
        if (!$this->canAccess($path)) {
            header('HTTP/1.0 403 Forbidden');
            die();
        }
    }

    public function basePath() {
        return $this->contentPath;
    }

    public function getList($path) {
        $this->ensureAccess($path);

        header('Content-Type: application/json');

        $dir = array_map(function ($scan_entry) use ($path) {
            if (startsWith($scan_entry, '.')) {
                return;
            }

            $entry = new ImageBrowserEntry();

            $entry->name = $scan_entry;
            $entry->type = is_dir(realpath($path . $scan_entry)) ? 'd' : 'f';
            //$entty->size = filesize($entry);

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

    public function getThumbnail($path) {
        $this->ensureAccess($path);
        //header('Content-type: image/jpeg');
        echo "path is " . $path;

        //readfile("/media/arch-dropbox/sofa-3a4c8b.jpg");
    }

    public function destroy($path, $entry) {
        $this->ensureAccess($path);
    }

    public function create($path, $entry) {
        $this->ensureAccess($path);
    }

    public function saveFile($file, $path) {
        $this->ensureAccess($path);
    }
}

// serve response
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    parse_str($_SERVER['QUERY_STRING'], $parameters);

    $imageBrowser = new ImageBrowser();

    $action = $parameters['action'];

    $path = $imageBrowser->basePath() . (isset($_POST['path']) ? $_POST['path'] : '');

    if ($parameters['action'] == 'read') {
        $imageBrowser->getList($path);
    } else if ($parameters['action'] == 'thumbnail') {
        $imageBrowser->getThumbnail($path);
    }
}

?>
