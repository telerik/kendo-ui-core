<?php
    $php = file_get_contents($_SERVER['SCRIPT_FILENAME']);
    $php = trim(preg_replace('/(<php\?)?.*require_once.*?(header|footer).*\r?\n?\r?\n?/', '', $php));
    $knownFiles = array(
        'DataSourceResult.php' => '../../lib/DataSourceResult.php',
        'chart_data.php' => '../../include/chart_data.php'
    )
?>
            </div>
            <div class="source">
                Source:
                <a href="#" class="offline-button view selected">PHP</a>
<?php
    foreach ($knownFiles as $name => $path) {
        if(strpos($php, $name)) {
?>
                <a href="#" class="offline-button controller"><?= $name ?></a>
<?php
        }
    }
?>
                <div class="code">
                    <pre class="prettyprint view"><?= htmlentities($php) ?>
                    </pre>
<?php
    foreach ($knownFiles as $name => $path) {
        if(strpos($php, $name)) {
?>
                    <pre class="prettyprint controller"><?= htmlentities(file_get_contents($path)) ?>
                    </pre>
<?php
        }
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
