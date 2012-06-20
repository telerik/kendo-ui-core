namespace Kendo.Mvc.UI.Tests.Upload
{
    using Moq;
    using System.Web.Routing;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class UploadMessagesBuilderTests
    {
        private readonly Mock<IUploadMessages> messagesMock;
        private readonly UploadMessagesBuilder builder;

        public UploadMessagesBuilderTests()
        {
            messagesMock = new Mock<IUploadMessages>();
            builder = new UploadMessagesBuilder(messagesMock.Object);
        }

        [Fact]
        public void Cancel_should_set_Cancel()
        {
            builder.Cancel("message");
            messagesMock.VerifySet(s => s.Cancel = "message");
        }

        [Fact]
        public void Cancel_should_return_builder()
        {
            builder.Cancel("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void DropFilesHere_should_set_DropFilesHere()
        {
            builder.DropFilesHere("message");
            messagesMock.VerifySet(s => s.DropFilesHere = "message");
        }

        [Fact]
        public void DropFilesHere_should_return_builder()
        {
            builder.DropFilesHere("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_should_set_Remove()
        {
            builder.Remove("message");
            messagesMock.VerifySet(s => s.Remove = "message");
        }

        [Fact]
        public void Remove_should_return_builder()
        {
            builder.Remove("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Retry_should_set_Retry()
        {
            builder.Retry("message");
            messagesMock.VerifySet(s => s.Retry = "message");
        }

        [Fact]
        public void Retry_should_return_builder()
        {
            builder.Retry("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Select_should_set_Select()
        {
            builder.Select("message");
            messagesMock.VerifySet(s => s.Select = "message");
        }

        [Fact]
        public void Select_should_return_builder()
        {
            builder.Select("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void StatusFailed_should_set_StatusFailed()
        {
            builder.StatusFailed("message");
            messagesMock.VerifySet(s => s.StatusFailed = "message");
        }

        [Fact]
        public void StatusFailed_should_return_builder()
        {
            builder.StatusFailed("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void StatusUploaded_should_set_StatusUploaded()
        {
            builder.StatusUploaded("message");
            messagesMock.VerifySet(s => s.StatusUploaded = "message");
        }

        [Fact]
        public void StatusUploaded_should_return_builder()
        {
            builder.StatusUploaded("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void StatusUploading_should_set_StatusUploading()
        {
            builder.StatusUploading("message");
            messagesMock.VerifySet(s => s.StatusUploading = "message");
        }

        [Fact]
        public void StatusUploading_should_return_builder()
        {
            builder.StatusUploading("message").ShouldBeSameAs(builder);
        }

        [Fact]
        public void UploadSelectedFiles_should_set_UploadSelectedFiles()
        {
            builder.UploadSelectedFiles("message");
            messagesMock.VerifySet(s => s.UploadSelectedFiles = "message");
        }

        [Fact]
        public void UploadSelectedFiles_should_return_builder()
        {
            builder.UploadSelectedFiles("message").ShouldBeSameAs(builder);
        }
    }
}
