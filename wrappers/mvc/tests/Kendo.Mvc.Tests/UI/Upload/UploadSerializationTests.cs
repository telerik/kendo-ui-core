namespace Kendo.Mvc.UI.Tests.Upload
{
    using Moq;
    using System.IO;
    using System.Web.Routing;
    using Kendo.Mvc;
    using Kendo.Mvc.UI;
    using Xunit;

    public class UploadSerializationTests
    {
        private readonly Upload upload;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public UploadSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            var urlGeneratorMock = new Mock<IUrlGenerator>();
            urlGeneratorMock.Setup(g => g.Generate(It.IsAny<RequestContext>(), It.IsAny<INavigatable>()))
                .Returns<RequestContext, INavigatable>(
                    (context, navigatable) => navigatable.ControllerName + "/" + navigatable.ActionName
                );

            upload = UploadTestHelper.CreateUpload(urlGeneratorMock.Object);
            upload.Name = "Upload";
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoUpload_init()
        {
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Upload\").kendoUpload({});");
        }

        [Fact]
        public void Enabled_state_serialized_when_false()
        {
            upload.Enabled = false;
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"enabled\":false}");
        }

        [Fact]
        public void Multiple_state_serialized_when_false()
        {
            upload.Multiple = false;
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"multiple\":false}");
        }

        [Fact]
        public void ShowFileList_should_be_serialized_when_false()
        {
            upload.ShowFileList = false;
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"showFileList\":false}");
        }

        [Fact]
        public void Async_settings_should_be_serialized_if_Save_action_is_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"async\":{\"saveUrl\":\"Home/Index\"}}");
        }

        [Fact]
        public void Async_SaveField_should_be_serialized_when_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.Async.SaveField = "attachments";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"async\":{\"saveUrl\":\"Home/Index\",\"saveField\":\"attachments\"}}");
        }

        [Fact]
        public void Messages_should_be_serialized_if_set()
        {
            upload.Messages.Select = "select";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"localization\":{\"select\":\"select\"}}");
        }

        [Fact]
        public void Remove_action_should_be_serialized()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.Async.Remove.ActionName = "Remove";
            upload.Async.Remove.ControllerName = "Home";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"async\":{\"saveUrl\":\"Home/Index\",\"removeUrl\":\"Home/Remove\"}}");
        }

        [Fact]
        public void Remove_action_should_not_be_serialized_when_Save_is_not_set()
        {
            upload.Async.Remove.ActionName = "Remove";
            upload.Async.Remove.ControllerName = "Home";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("");
        }

        [Fact]
        public void Async_RemoveField_should_be_serialized_when_set()
        {
            upload.Async.Save.ActionName = "Save";
            upload.Async.Save.ControllerName = "Async";
            upload.Async.Remove.ActionName = "Remove";
            upload.Async.Remove.ControllerName = "Async";
            upload.Async.RemoveField = "attachments";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("\"removeField\":\"attachments\"");
        }

        [Fact]
        public void AutoUpload_should_be_serialized_when_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.Async.AutoUpload = false;
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"async\":{\"saveUrl\":\"Home/Index\",\"autoUpload\":false}}");
        }

        [Fact]
        public void AutoUpload_should_not_be_serialized_when_not_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Upload\").kendoUpload({\"async\":{\"saveUrl\":\"Home/Index\"}});");
        }

        [Fact]
        public void Batch_should_be_serialized_when_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.Async.Batch = true;
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"async\":{\"saveUrl\":\"Home/Index\",\"batch\":true}}");
        }

        [Fact]
        public void Batch_should_not_be_serialized_when_not_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Upload\").kendoUpload({\"async\":{\"saveUrl\":\"Home/Index\"}});");
        }

        [Fact]
        public void WithCredentials_should_be_serialized_when_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.Async.WithCredentials = true;
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"async\":{\"saveUrl\":\"Home/Index\",\"withCredentials\":true}}");
        }

        [Fact]
        public void WithCredentials_should_not_be_serialized_when_not_set()
        {
            upload.Async.Save.ActionName = "Index";
            upload.Async.Save.ControllerName = "Home";
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Upload\").kendoUpload({\"async\":{\"saveUrl\":\"Home/Index\"}});");
        }

        [Fact]
        public void Select_client_side_event_serialized()
        {
            upload.Events["select"] = new ClientHandlerDescriptor() { HandlerName = "selectHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"select\":selectHandler}");
        }

        [Fact]
        public void Upload_client_side_event_serialized()
        {
            upload.Events["upload"] = new ClientHandlerDescriptor() { HandlerName = "uploadHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"upload\":uploadHandler}");
        }

        [Fact]
        public void Success_client_side_event_serialized()
        {
            upload.Events["success"] = new ClientHandlerDescriptor() { HandlerName = "successHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"success\":successHandler}");
        }

        [Fact]
        public void Error_client_side_event_serialized()
        {
            upload.Events["error"] = new ClientHandlerDescriptor() { HandlerName = "errorHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"error\":errorHandler}");
        }

        [Fact]
        public void Complete_client_side_event_serialized()
        {
            upload.Events["complete"] = new ClientHandlerDescriptor() { HandlerName = "completeHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"complete\":completeHandler}");
        }

        [Fact]
        public void Cancel_client_side_event_serialized()
        {
            upload.Events["cancel"] = new ClientHandlerDescriptor() { HandlerName = "cancelHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"cancel\":cancelHandler}");
        }

        [Fact]
        public void Remove_client_side_event_serialized()
        {
            upload.Events["remove"] = new ClientHandlerDescriptor() { HandlerName = "removeHandler" };
            upload.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"remove\":removeHandler}");
        }
    }
}