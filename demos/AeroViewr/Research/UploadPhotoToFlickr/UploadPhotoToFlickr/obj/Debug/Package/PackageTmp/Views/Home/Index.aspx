<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<input id="photo" name="attachments" type="file" />

<script type="text/javascript">
    $(document).ready(function () {    
        
        $.telerik.upload.prototype._getSupportsFormData = function () { return false; };
        jQuery('#photo').tUpload({
            showFileList: true,
            multiple: true,
            async: {
                "saveUrl": '<%= Url.Action("Save") %>',
                "autoUpload": false
            },
            onUpload: function (e) {
                e.data = {
                    "api_key": "ea73824c4e27a137b7597fc3ffb3ba98",
                    "auth_token": "72157626154487043-7dfd951a1ede12fa"
                };

                e.data["api_sig"] = getApiSig("2e767957c686dd30", e.data);
            },
            onError: function (e) {
                e.preventDefault();
            },
            onComplete: function (e) {
                //alert("Upload completed (or is it?)");
            }
        });

        function getApiSig(secret, params) {
            var concatString = "",
            keys = [];

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            keys.sort();
            concatString += secret;
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                concatString += key + params[key];
            }

            return hex_md5(concatString);
        }
    });
</script>

</asp:Content>
