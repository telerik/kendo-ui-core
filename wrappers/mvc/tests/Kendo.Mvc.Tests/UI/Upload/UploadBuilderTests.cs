namespace Kendo.Mvc.UI.Tests.Upload
{
    using Moq;
    using System;
    using System.Globalization;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Infrastructure.Implementation;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class UploadBuilderTests
    {
        private readonly Upload upload;
        private readonly UploadBuilder builder;

        public UploadBuilderTests()
        {
            upload = UploadTestHelper.CreateUpload();
            builder = new UploadBuilder(upload);
        }

        [Fact]
        public void ClientEvents_should_set_events()
        {
            Action<UploadClientEventsBuilder> clientEventsAction = eventBuilder => eventBuilder.OnUpload("upload");
            builder.ClientEvents(clientEventsAction);
            upload.ClientEvents.OnUpload.HandlerName.ShouldEqual("upload");
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            builder.ClientEvents(eventBuilder => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Enable_should_set_Enabled()
        {
            builder.Enable(false);
            upload.Enabled.ShouldBeFalse();
        }

        [Fact]
        public void Multiple_should_set_Multiple()
        {
            builder.Multiple(false);
            upload.Multiple.ShouldBeFalse();
        }

        [Fact]
        public void ShowFileList_should_set_ShowFileList()
        {
            builder.ShowFileList(false);
            upload.ShowFileList.ShouldBeFalse();
        }

        [Fact]
        public void ShowFileList_should_return_builder()
        {
            builder.ShowFileList(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Async_should_set_async_settings()
        {
            builder.Async(async => async.Save("Default"));
            upload.Async.Save.RouteName.ShouldEqual("Default");
        }

        [Fact]
        public void Async_should_return_builder()
        {
            builder.Async(async => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Localizable_should_set_localization()
        {
            var setCulture = CultureInfo.InvariantCulture;

            var localizationServiceFactoryMock = new Mock<ILocalizationServiceFactory>();
            localizationServiceFactoryMock
                .Setup(f => f.Create(It.IsAny<string>(), It.IsAny<CultureInfo>()))
                .Callback<string, CultureInfo>((string resourceName, CultureInfo culture) => setCulture = culture);

            DI.Current.Register<ILocalizationServiceFactory>(() => localizationServiceFactoryMock.Object);

            builder.Localizable("de-DE");
            setCulture.Name.ShouldEqual("de-DE");

            DI.Current.Register<ILocalizationServiceFactory>(() => new LocalizationServiceFactory());
        }
    }
}
