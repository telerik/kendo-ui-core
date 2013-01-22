<?php
    $php = file_get_contents($_SERVER['SCRIPT_FILENAME']);
    $php = trim(preg_replace('/<\?php.*include.*\?>/', '', $php));

    if (strpos($php, 'DataSourceResult.php')) {
        $dataSourceResult = file_get_contents('../../lib/DataSourceResult.php');
    }
?>
            </div>
            <div class="source">
                Source:
                <a href="#" class="offline-button view selected">PHP</a>
<?php
    if ($dataSourceResult) {
?>
                <a href="#" class="offline-button controller">DataSourceResult.php</a>
<?php
    }
?>
                <div class="code">
                    <pre class="prettyprint view"><?= htmlentities($php) ?>
                    </pre>
<?php
    if ($dataSourceResult) {
?>
                    <pre class="prettyprint controller"><?= htmlentities($dataSourceResult) ?>
                    </pre>
<?php
    }
?>
                </div>
            </div>
        </div>
        <script>
        $(function() {
            prettyPrint();

            $(".source a").click(function(e) {
                var showView = $(this).is(".view");

                $(".source .code")
                    .find(".view").toggle(showView).end()
                    .find(".controller").toggle(!showView);

                $(".source a").toggleClass("selected");

                e.preventDefault();
            });
        });
        </script>
    </body>
</html>
