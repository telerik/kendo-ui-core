<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div id="example" class="k-content">
    <div class="demo-section">
        <h2>Profile Completeness</h2>
        <div class="completenessLevel">
            <h2>40%</h2>
            <?php 
            	$pb = new \Kendo\UI\ProgressBar('profileCompleteness');

            	$pb->type('chunk')
            	   ->chunkCount(5)
            	   ->min(0)
            	   ->max(5)
            	   ->value(2);

            	echo $pb->render();
            ?>
        </div>
    </div>

    <div class="demo-section">
        <h2>Please fill your details</h2>
        <div>
            <ul class="forms">
                <li>
                    <label>First Name</label>
                    <input type="text" name="firstName" value="" class="k-textbox" style="width: 265px;" />
                </li>
                <li>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value="" class="k-textbox" style="width: 265px;" />
                </li>
                <li>
                    <label>Birthday</label>
                    <input id="birthdayInput" type="date" name="birthday" value="" style="width: 265px;" />
                </li>
                <li>
                    <label>Gender</label>
                    <select id="genderInput" name="gender" style="width: 265px;">
                        <option value="male" selected>Male</option>
                        <option value="female">Female</option>
                        <option value="notsay">Rather not say</option>
                    </select>
                </li>
                <li>
                    <label>Occupation</label>
                    <input type="text" name="occupation" value="Software Developer" class="k-textbox" style="width: 265px;" />
                </li>
            </ul>
        </div>
    </div>

    <?php require_once '../../include/footer.php'; ?>

    <script>
        $(document).ready(function () {
            var pb = $("#profileCompleteness").data("kendoProgressBar");

            $("#genderInput").kendoDropDownList();

            $("#birthdayInput").kendoDatePicker();

            $("#birthdayInput").change(function (e) {
                var currentDate = kendo.parseDate(this.value);
                if (!currentDate) {
                    this.value = "";
                }
            });

            $(".forms input").change(function () {
                var completeness = 5;
                $(".forms input").each(function () {
                    if (this.value == "") {
                        completeness--;
                    }
                });

                pb.value(completeness);
                $(".completenessLevel h2").text((completeness * 20) + "%");
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
            margin: 0 0 20px 0;
        }
        
        .completenessLevel {
            margin: 10px 0 0 0;
        }
        
        .completenessLevel h2 {
            display: inline-block;
            vertical-align: middle;
            width: 50px;
            margin: 0;
        }
        
        #profileCompleteness {
            width: 340px;
        }
        
        .forms {
            list-style-type: none;
            padding: 0;
        }
        
        .forms label {
            display: inline-block;
            width: 115px;
            text-align: right;
            padding-right: 10px;
        }
        
        .forms li {
            margin: 0 0 10px 0;
        }
    </style>
</div>
