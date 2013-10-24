<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

function progressBar($name){
    $pb = new \Kendo\UI\ProgressBar($name);

    $animation = new \Kendo\UI\ProgressBarAnimation();
    $animation->duration(600);

    $pb->type('percent')
       ->animation($animation);

    return $pb;
}

?>

<div id="example" class="k-content">
    <div class="demo-section">
        <h2>What are your favourite recent movies?</h2>
        <ul class="forms">
            <li>
                <label>First favourite</label><select id="favouriteMovie1" style="width: 260px;">
                    <option value="fastAndFurious">Fast and Furious 6</option>
                    <option value="nowYouSeeMe">Now you see me</option>
                    <option value="theHelp">The Help</option>
                    <option value="theInternship" selected>The Internship</option>
                    <option value="thePerks">The Perks of Being a Wallflower</option>
                </select>
            </li>
            <li>
                <label>Second favourite</label><select id="favouriteMovie2" style="width: 260px;">
                        <option value="fastAndFurious" selected>Fast and Furious 6</option>
                        <option value="nowYouSeeMe">Now you see me</option>
                        <option value="theHelp">The Help</option>
                        <option value="theInternship">The Internship</option>
                        <option value="thePerks">The Perks of Being a Wallflower</option>
                    </select>
            </li>
            <li>
                <label>Third favourite</label><select id="favouriteMovie3" style="width: 260px;">
                    <option value="fastAndFurious">Fast and Furious 6</option>
                    <option value="nowYouSeeMe" selected>Now you see me</option>
                    <option value="theHelp">The Help</option>
                    <option value="theInternship">The Internship</option>
                    <option value="thePerks">The Perks of Being a Wallflower</option>
                </select>
            </li>
            <li>
                <button id ="voteButton" class="k-button">Vote</button>
            </li>
        </ul>
    </div>
    <div class="demo-section">
        <h2>Poll results</h2>
        <ul class="poll-results">
            <li>
                <h4>Fast and Furious 6</h4>
                <?= progressBar('fastAndFurious')->render() ?>
            </li>
            <li>
                <h4>Now you see me</h4>
                <?= progressBar('nowYouSeeMe')->render() ?>
            </li>
            <li>
                <h4>The Help</h4>
                <?= progressBar('theHelp')->render() ?>
            </li>
            <li>
                <h4>The Internship</h4>
                <?= progressBar('theInternship')->render() ?>
            </li>
            <li>
                <h4>The Perks of Being a Wallflower</h4>
                <?= progressBar('thePerks')->render() ?>
            </li>
        </ul>
    </div>

<?php require_once '../../include/footer.php'; ?>

    <script>
        $(document).ready(function () {
            var progressbars = [];
            $(".poll-results div").each(function () {
                progressbars.push($(this).data("kendoProgressBar"));
            });

            $("#example select").each(function (i) {
                $(this).kendoDropDownList();
            });

            $("#voteButton").click(function () {
                var first = $("#favouriteMovie1").val();
                var second = $("#favouriteMovie2").val();
                var third = $("#favouriteMovie3").val();

                if (first !== "" && second !== "" && third !== "" &&
                    first !== second && second !== third && first !== third) {

                    $.each(progressbars, function (i, pb) {
                        pb.value(0);
                    });

                    $("#" + first).data("kendoProgressBar").value(50);
                    $("#" + second).data("kendoProgressBar").value(30);
                    $("#" + third).data("kendoProgressBar").value(10);

                    $.each(progressbars, function (i, pb) {
                        if (pb.value() === 0) {
                            pb.value(5);
                        }
                    });
                } else {
                    alert("Please select three different movies");
                }
            });
        });
    </script>

    <style scoped>      
        .demo-section {
            width: 400px;
            padding: 30px;
        }
        
        .demo-section h2 {
            font-weight: normal;
            margin-bottom: 15px;
        }
        
        .forms {
            list-style-type: none;
            padding: 0;
            margin-bottom: -10px;
        }
        
        .forms label {
            display: inline-block;
            width: 120px;
            text-align: right;
            padding-right: 18px;
        }
        
        .forms li {
            margin-bottom: 10px;
        }
        
        #voteButton {
            width: 260px;
            margin: 10px 0 0 138px;
        }
        
        .poll-results {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
        .poll-results li:after {
            content: "";
            display: block;
            clear: both;
            height: 3px;
            line-height: 0;
        }
        #example .poll-results h4, .poll-results .k-progressbar {
            margin: 0 0 5px 0;
            width: 400px;
        }
    </style>
</div>
