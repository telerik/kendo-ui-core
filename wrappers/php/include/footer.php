<?php
    $php = file_get_contents($_SERVER['SCRIPT_FILENAME']);
    $php = trim(preg_replace('/<\?php.*include.*\?>/', '', $php));

?>
            </div>
            <div class="source">
                Source:
                <a href="#" class="offline-button view selected">PHP</a>
                <div class="code">
                    <pre class="prettyprint view"><?= htmlentities($php) ?>
                    </pre>
                </div>
            </div>
        </div>
        <script>
        $(function() {
            prettyPrint();
            $(".source a").click(false);
        });
        </script>
    </body>
</html>
