<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$sortableSidebar = new \Kendo\UI\Sortable('#sidebar'); // select the container for the Sortable
$sortableSidebar->filter('>div')
    ->connectWith('#main-content')
    ->cursor('move')
    ->hint(new \Kendo\JavaScriptFunction('hint'))
    ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));

echo $sortableSidebar->render();

$sortableMain = new \Kendo\UI\Sortable('#main-content'); // select the container for the Sortable
$sortableMain->connectWith('#sidebar')
    ->cursor('move')
    ->hint(new \Kendo\JavaScriptFunction('hint'))
    ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));

echo $sortableMain->render();
?>

    <div class="dash-head"></div>
    <div class="panel-wrap">
        <div id="sidebar">
            <div id="profile" class="widget">
                <h3>Profile <span class="collapse k-icon k-i-arrowhead-n"></span></h3>
                <div>
                    <div class="profile-photo"></div>
                    <h4>Lynda Schleifer</h4>
                    <p>Sales Associate</p>
                </div>
            </div>
            <div id="teammates" class="widget">
                <h3>Teammates <span class="collapse k-icon k-i-arrowhead-n"></h3>
                <div>
                    <div class="team-mate">
                        <img src="../content/web/panelbar/andrew.jpg" alt="Andrew Fuller">
                        <h4>Andrew Fuller</h4>
                        <p>Team Lead</p>
                    </div>
                    <div class="team-mate">
                        <img src="../content/web/panelbar/nancy.jpg" alt="Nancy Leverling">
                        <h4>Nancy Leverling</h4>
                        <p>Sales Associate</p>
                    </div>
                    <div class="team-mate">
                        <img src="../content/web/panelbar/robert.jpg" alt="Robert King">
                        <h4>Robert King</h4>
                        <p>Business System Analyst</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="main-content">
            <div id="news" class="widget">
                <h3>News <span class="collapse k-icon k-i-arrowhead-n"></h3>
                <div>

                    <h4><span>Jan 22, 2014</span> Stanford Speaker Series Looks at the Rising Tide of Eastern European High Tech Firms with Telerik CEO Vassil Terziev</h4>

                    <h4><span>Dec 10, 2013</span> Telerik Test Studio Now Offers Cross-Browser Test Recording and Subscription-Based Pricing for 1M-Strong Developer Community</h4>

                    <h4><span>Nov 22, 2013</span> Telerik AD is Named "Best Employer in Bulgaria" for Sixth Consecutive Year</h4>

                    <h4><span>Nov 20, 2013</span> Telerik Embraces the Responsive Web with Latest Kendo UI Improvements</h4>
                </div>
            </div>
            <div id="blogs" class="widget">
                <h3>Blogs <span class="collapse k-icon k-i-arrowhead-n"></h3>
                <div>
                    <h4>Upgrading OpenAccess ORM to Telerik Data Access</h4>
                    <p class="blog-info">Friday, February 14, 2014 by Data Access Team</p>
                    <p>OpenAccess ORM was recently renamed to Telerik Data Access and re-branded. Find out what are the changes you can expect when upgrading to the latest official release.</p>

                    <h4>Design, then Develop Experiences</h4>
                    <p class="blog-info">Friday, February 14, 2014 by Telerik Services</p>
                    <p>Here at Telerik, our goal is to help you develop experiences. We've got a long history of providing tools to help developers deliver great value for their customers. But maybe sometimes you need a little help figuring out just how to make your customers happy. That's where the user experience (UX) designers at Telerik Services come in.</p>

                    <h4>What Carl Sagan Taught Me About Software</h4>
                    <p class="blog-info">Thursday, February 13, 2014 by Kendo UI</p>
                    <p>Software ecosystems are vital to a developer's success. It's hard to place a value on the benefit derived from being able to lean on other's experience, as well as easily find and digest content that's relevant to your project. Ecosystems don't just sprout up overnight though. It takes the right timing, the perfect conditions and lots of love and cultivation. Trying to actively create a new ecosystem around a product or platform is a lot like terraforming. Carl Sagan knows a thing or two about that.</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            //exapand
            $(".panel-wrap").on("click", "span.k-i-arrowhead-s", function(e) {
                var contentElement = $(e.target).closest(".widget").find(">div");
                $(e.target)
                    .removeClass("k-i-arrowhead-s")
                    .addClass("k-i-arrowhead-n");

                kendo.fx(contentElement).expand("vertical").stop().play();
            });

            //collapse
            $(".panel-wrap").on("click", "span.k-i-arrowhead-n", function(e) {
                var contentElement = $(e.target).closest(".widget").find(">div");
                $(e.target)
                    .removeClass("k-i-arrowhead-n")
                    .addClass("k-i-arrowhead-s");

                kendo.fx(contentElement).expand("vertical").stop().reverse();
            });
        });

        function placeholder(element) {
            return element.clone().addClass("placeholder");
        }

        function hint(element) {
            return element.clone().addClass("hint")
                        .height(element.height())
                        .width(element.width());
        }
    </script>

    <style>
        #example {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .dash-head {
            width: 902px;
            height: 80px;
            background: url('../content/web/sortable/dashboard-head.png') no-repeat 50% 50% #222222;  
        }
        .panel-wrap {
            display: table;
            margin: 0 0 20px;
            width: 900px;
            background-color: #f5f5f5;
            border: 1px solid #e5e5e5;
        }
        #sidebar {
            display: table-cell;
            margin: 0;
            padding: 20px 0 20px 20px;
            width: 220px;
            vertical-align: top;
        }
        #main-content {
            display: table-cell;
            margin: 0;
            padding: 20px;
            width: 600px;
            vertical-align: top;
        }
        .widget.placeholder {
            opacity: 0.4;
            border: 1px dashed #a6a6a6;
        }

        /* WIDGETS */
        .widget {
            margin: 0 0 20px;
            padding: 0;
            background-color: #ffffff;
            border: 1px solid #e7e7e7;
            border-radius: 3px;
            cursor: move;
        }
        .widget:hover {
            background-color: #fcfcfc;
            border-color: #cccccc;
        }
        .widget div {
            padding: 10px;
            min-height: 50px;
        }
        .widget h3 {
            font-size: 12px;
            padding: 8px 10px;
            text-transform: uppercase;
            border-bottom: 1px solid #e7e7e7;
        }
        .widget h3 span {
            float: right;
        }
        .widget h3 span:hover {
            cursor: pointer;
            background-color: #e7e7e7;
            border-radius: 20px;
        }

        /* PROFILE */
        .profile-photo {
            width: 80px;
            height: 80px;
            margin: 10px auto;
            border-radius: 100px;
            border: 1px solid #e7e7e7;
            background: url('../content/web/Customers/ISLAT.jpg') no-repeat 50% 50%;
        }
        #profile div {
            text-align: center;
        }
        #profile h4 {
            width: auto;
            margin: 0 0 5px;
            font-size: 1.2em;
            color: #1f97f7;
        }
        #profile p {
            margin: 0 0 10px;
        }

        /* BLOGS & NEWS */
        #blogs div,
        #news div {
            padding: 0 20px 20px;
        }
        #teammates h4,
        #blogs h4,
        #news h4 {
            width: auto;
            margin: 20px 0 2px;
            font-size: 1.4em;
            color: #1f97f7;
            font-weight: normal;
        }
        .blog-info {
            margin: 0 0 10px;
            font-size: .9em;
            color: #787878;
        }
        #sidebar #blogs h4 {
            font-size: 1em;
        }
        #sidebar #blogs p {
            display: none;
        }
        #sidebar #blogs .blog-info {
            display: block;
        }
        #main-content #news h4 {
            font-size: 1.2em;
            line-height: 1.4em;
            height: 40px;
        }
        #main-content #news h4 span {
            display: block;
            float: left;
            width: 100px;
            height: 40px;
            color: #000;
        }
        #sidebar #news h4 {
            font-size: 1em;
        }
        #sidebar #news h4 span {
            display: block;
            margin-bottom: 3px;
            color: #000;
        }

        /* TEAMMATES */
        .team-mate:after {
            content: ".";
            display: block;
            height: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
        #teammates .team-mate h4 {
            font-size: 1.4em;
            font-weight: normal;
            margin-top: 12px;
        }
        .team-mate p {
            margin: 0;
        }
        .team-mate img {
            float: left;
            margin: 0 15px 0 0;
            border: 1px solid #e7e7e7;
            border-radius: 60px;
        }
        .hint {
            width: 250px;
            height: 100px;
            overflow: hidden;
        }
        .hint > h3 {
            padding-left: 20px;
        }
    </style>
        
<?php require_once '../include/footer.php'; ?>
