<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>


<div id="example" class="k-content">
    <div class="k-rtl demo-section">
        <h3 class="title">ProgressBar</h3>
        <?php 
            $pb = new \Kendo\UI\ProgressBar('progressBar');

            $animation = new \Kendo\UI\ProgressBarAnimation();
            $animation->duration(600);

            $pb->type('percent')
               ->animation($animation)
               ->complete('onComplete');

            echo $pb->render();
        ?>
        <button id="startProgress" class="k-button">Start progress</button>
    </div>

    <?php require_once '../../include/footer.php'; ?>

    <script>
        $("#startProgress").click(function () {
            if (!$(this).hasClass("k-state-disabled")) {
                $(this).addClass("k-state-disabled");

                progress();
            }
        });

        function onComplete() {
            $("#startProgress").removeClass("k-state-disabled").text("Restart Progress");
        }

        function progress() {
            var pb = $("#progressBar").data("kendoProgressBar");
            pb.value(0);

            var interval = setInterval(function () {
                if (pb.value() < 100) {
                    pb.value(pb.value() + 10);
                } else {
                    clearInterval(interval);
                }
            }, 100);
        }
    </script>

    <style scoped>
        #progressBar {
            width: 440px;
            margin-bottom: 10px;
        }
        .demo-section {
            width: 500px;
            text-align: right;
        }
    </style> 
</div>
