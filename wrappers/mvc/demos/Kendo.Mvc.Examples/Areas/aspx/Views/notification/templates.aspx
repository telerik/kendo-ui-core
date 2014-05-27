<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<%= Html.Kendo().Notification()
    .Name("notification")
    .Position(p => p.Pinned(true).Top(30).Right(30))
    .Stacking(NotificationStackingSettings.Down)
    .AutoHideAfter(0)
    .Templates(t =>
    {
        t.Add().Type("info").ClientTemplateID("emailTemplate");
        t.Add().Type("error").ClientTemplateID("errorTemplate");
        t.Add().Type("upload-success").ClientTemplateID("successTemplate");
    })
%>

            <div class="demo-section">
                
                <h3>Show notification:</h3>
                <p>
                    <button id="showEmailNotification" class="k-button">Email Notification</button><br />
                    <button id="showErrorNotification" class="k-button">Error Notification</button><br />
                    <button id="showSuccessNotification" class="k-button">Upload Success Notification</button>
                </p>
                <h3>Hide notification:</h3>
                <p>
                    <button id="hideAllNotifications" class="k-button">Hide All Notifications</button>
                </p>
    
            </div>
            
            <script id="emailTemplate" type="text/x-kendo-template">        
                <div class="new-mail">
                    <img src="../../../content/web/notification/envelope.png" />
                    <h3>#= title #</h3>
                    <p>#= message #</p>
                </div>
            </script>
            
            <script id="errorTemplate" type="text/x-kendo-template">        
                <div class="wrong-pass">
                    <img src="../../../content/web/notification/error-icon.png" />
                    <h3>#= title #</h3>
                    <p>#= message #</p>
                </div>
            </script>
            
            <script id="successTemplate" type="text/x-kendo-template">        
                <div class="upload-success">
                    <img src="../../../content/web/notification/success-icon.png" />
                    <h3>#= message #</h3>
                </div>
            </script>

            <script>
                $(document).ready(function () {

                    var notification = $("#notification").data("kendoNotification");

                    $("#showEmailNotification").click(function () {
                        notification.show({
                            title: "New E-mail",
                            message: "You have 1 new mail message!"
                        }, "info");
                    });

                    $("#showErrorNotification").click(function () {
                        notification.show({
                            title: "Wrong Password",
                            message: "Please enter your password again."
                        }, "error");
                    });

                    $("#showSuccessNotification").click(function () {
                        notification.show({
                            message: "Upload Successful"
                        }, "upload-success");
                    });

                    $("#hideAllNotifications").click(function () {
                        notification.hide();
                    });

                });
            </script>
            
            <style>
                .demo-section {
                    width: 200px;
                    padding: 20px 30px;
                }
                .demo-section p {
                    margin: 3px 0 20px;
                    line-height: 40px;
                }
                .demo-section .k-button {
                    width: 200px;
                }
                
                .k-notification {
                    border: 0;
                }
                
                
                /* Info template */
                .k-notification-info.k-group {
                    background: rgba(0%,0%,0%,.7);
                    color: #fff;
                }
                .new-mail {
                    width: 300px;
                    height: 100px;
                }
                .new-mail h3 {
                    font-size: 1em;
                    padding: 32px 10px 5px;
                }
                .new-mail img {
                    float: left;
                    margin: 30px 15px 30px 30px;
                }
                
                /* Error template */
                .k-notification-error.k-group {
                    background: rgba(100%,0%,0%,.7);
                    color: #ffffff;
                }
                .wrong-pass {
                    width: 300px;
                    height: 100px;
                }
                .wrong-pass h3 {
                    font-size: 1em;
                    padding: 32px 10px 5px;
                }
                .wrong-pass img {
                    float: left;
                    margin: 30px 15px 30px 30px;
                }
                
                /* Success template */
                .k-notification-upload-success.k-group {
                    background: rgba(0%,60%,0%,.7);
                    color: #fff;
                }
                .upload-success {
                    width: 240px;
                    height: 100px;
                    padding: 0 30px;
                    line-height: 100px;
                }
                .upload-success h3 {
                    font-size: 1.7em;
                    font-weight: normal;
                    display: inline-block;
                    vertical-align: middle;
                }
                .upload-success img {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 10px;
                }
            </style>

</asp:Content>