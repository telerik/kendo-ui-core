namespace Kendo.Mvc.UI.Tests.Upload
{
    using Moq;
    using System.Web.Routing;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class UploadAsyncSettingsBuilderTests
    {
        private readonly Mock<IUploadAsyncSettings> settingsMock;
        private readonly Mock<INavigatable> saveSettingsMock;
        private readonly Mock<INavigatable> removeSettingsMock;
        private readonly RouteValueDictionary saveSettingsRouteValues;
        private readonly RouteValueDictionary removeSettingsRouteValues;
        private readonly UploadAsyncSettingsBuilder builder;

        public UploadAsyncSettingsBuilderTests()
        {
            saveSettingsRouteValues = new RouteValueDictionary();
            saveSettingsMock = new Mock<INavigatable>();
            saveSettingsMock.SetupGet(s => s.RouteValues).Returns(saveSettingsRouteValues);

            removeSettingsRouteValues = new RouteValueDictionary();
            removeSettingsMock = new Mock<INavigatable>();
            removeSettingsMock.SetupGet(s => s.RouteValues).Returns(removeSettingsRouteValues);

            settingsMock = new Mock<IUploadAsyncSettings>();
            settingsMock.Setup(s => s.Save).Returns(saveSettingsMock.Object);
            settingsMock.Setup(s => s.Remove).Returns(removeSettingsMock.Object);

            builder = new UploadAsyncSettingsBuilder(settingsMock.Object);
        }

        [Fact]
        public void AutoUpload_should_set_AutoUpload()
        {
            builder.AutoUpload(false);
            settingsMock.VerifySet(s => s.AutoUpload = false);
        }

        [Fact]
        public void AutoUpload_should_return_builder()
        {
            builder.AutoUpload(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Batch_should_set_Batch()
        {
            builder.Batch(false);
            settingsMock.VerifySet(s => s.Batch = false);
        }

        [Fact]
        public void Batch_should_return_builder()
        {
            builder.Batch(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_action_controller_and_routeValues_should_set_saveRequestSettings()
        {
            builder.Save("action", "controller", new RouteValueDictionary { { "id", 1 } });
            saveSettingsMock.VerifySet(s => s.ActionName = "action");
            saveSettingsMock.VerifySet(s => s.ControllerName = "controller");
            saveSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Save_with_action_controller_and_routeValues_should_return_builder()
        {
            builder.Save("action", "controller", new RouteValueDictionary()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_action_controller_and_routeValues_object_should_set_saveRequestSettings()
        {
            builder.Save("action", "controller", new { id = 1 });
            saveSettingsMock.VerifySet(s => s.ActionName = "action");
            saveSettingsMock.VerifySet(s => s.ControllerName = "controller");
            saveSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Save_with_action_controller_and_routeValues_object_should_return_builder()
        {
            builder.Save("action", "controller", new { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void SaveField_should_set_field()
        {
            builder.SaveField("field");
            settingsMock.VerifySet(s => s.SaveField = "field");
        }

        [Fact]
        public void SaveField_should_return_builder()
        {
            builder.SaveField("field").ShouldBeSameAs(builder);
        }

        [Fact]
        public void SaveUrl_should_set_Url()
        {
            builder.SaveUrl("/save");
            saveSettingsMock.VerifySet(s => s.Url = "/save");
        }

        [Fact]
        public void SaveUrl_should_return_builder()
        {
            builder.SaveUrl("/save").ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Save_with_action_controller_and_object_should_set_saveRequestSettings()
        {
            builder.Save("action", "controller", new { id = 1 });
            saveSettingsMock.VerifySet(s => s.ActionName = "action");
            saveSettingsMock.VerifySet(s => s.ControllerName = "controller");
        }

        [Fact]
        public void Save_with_action_controller_and_object_should_return_builder()
        {
            builder.Save("action", "controller", new { id = 1 }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_routeName_should_set_saveRequestSettings()
        {
            builder.Save("routeName");
            saveSettingsMock.VerifySet(s => s.RouteName = "routeName");
        }

        [Fact]
        public void Save_with_routeName_should_return_builder()
        {
            builder.Save("routeName").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_routeValues_should_set_saveRequestSettings()
        {
            builder.Save(new RouteValueDictionary { { "id", 1 } });
            saveSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Save_with_routeValues_should_return_builder()
        {
            builder.Save(new RouteValueDictionary()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_routeName_and_routeValues_should_set_saveRequestSettings()
        {
            builder.Save("routeName", new RouteValueDictionary { { "id", 1 } });
            saveSettingsMock.VerifySet(s => s.RouteName = "routeName");
            saveSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Save_with_routeName_and_routeValues_should_return_builder()
        {
            builder.Save("routeName", new RouteValueDictionary()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_routeName_and_routeValues_object_should_set_saveRequestSettings()
        {
            builder.Save("routeName", new { id = 1 });
            saveSettingsMock.VerifySet(s => s.RouteName = "routeName");
            saveSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Save_with_routeName_and_routeValues_object_should_return_builder()
        {
            builder.Save("routeName", new { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Save_with_action_should_set_saveRequestSettings()
        {
            builder.Save<UploadStubController>(c => c.Index());
            saveSettingsMock.VerifySet(s => s.ControllerName = "UploadStub");
            saveSettingsMock.VerifySet(s => s.ActionName = "Index");
        }

        [Fact]
        public void Save_with_action_should_return_builder()
        {
            builder.Save<UploadStubController>(c => c.Index()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void RemoveField_should_set_field()
        {
            builder.RemoveField("field");
            settingsMock.VerifySet(s => s.RemoveField = "field");
        }

        [Fact]
        public void RemoveField_should_return_builder()
        {
            builder.RemoveField("field").ShouldBeSameAs(builder);
        }

        [Fact]
        public void RemoveUrl_should_set_Url()
        {
            builder.RemoveUrl("/remove");
            removeSettingsMock.VerifySet(s => s.Url = "/remove");
        }

        [Fact]
        public void RemoveUrl_should_return_builder()
        {
            builder.RemoveUrl("/remove").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_action_controller_and_routeValues_should_set_removeRequestSettings()
        {
            builder.Remove("action", "controller", new RouteValueDictionary { { "id", 1 } });
            removeSettingsMock.VerifySet(s => s.ActionName = "action");
            removeSettingsMock.VerifySet(s => s.ControllerName = "controller");
            removeSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Remove_with_action_controller_and_routeValues_should_return_builder()
        {
            builder.Remove("action", "controller", new RouteValueDictionary()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_action_controller_and_routeValues_object_should_set_removeRequestSettings()
        {
            builder.Remove("action", "controller", new { id = 1 });
            removeSettingsMock.VerifySet(s => s.ActionName = "action");
            removeSettingsMock.VerifySet(s => s.ControllerName = "controller");
            removeSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Remove_with_action_controller_and_routeValues_object_should_return_builder()
        {
            builder.Remove("action", "controller", new { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_action_and_controller_object_should_set_removeRequestSettings()
        {
            builder.Remove("action", "controller");
            removeSettingsMock.VerifySet(s => s.ActionName = "action");
            removeSettingsMock.VerifySet(s => s.ControllerName = "controller");
        }

        [Fact]
        public void Remove_with_action_and_controller_object_should_return_builder()
        {
            builder.Remove("action", "controller").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_routeName_should_set_removeRequestSettings()
        {
            builder.Remove("routeName");
            removeSettingsMock.VerifySet(s => s.RouteName = "routeName");
        }

        [Fact]
        public void Remove_with_routeName_should_return_builder()
        {
            builder.Remove("routeName").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_routeValues_should_set_removeRequestSettings()
        {
            builder.Remove(new RouteValueDictionary { { "id", 1 } });
            removeSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Remove_with_routeValues_should_return_builder()
        {
            builder.Remove(new RouteValueDictionary()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_routeName_and_routeValues_should_set_removeRequestSettings()
        {
            builder.Remove("routeName", new RouteValueDictionary { { "id", 1 } });
            removeSettingsMock.VerifySet(s => s.RouteName = "routeName");
            removeSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Remove_with_routeName_and_routeValues_should_return_builder()
        {
            builder.Remove("routeName", new RouteValueDictionary()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_routeName_and_routeValues_object_should_set_removeRequestSettings()
        {
            builder.Remove("routeName", new { id = 1 });
            removeSettingsMock.VerifySet(s => s.RouteName = "routeName");
            removeSettingsRouteValues["id"].ShouldEqual(1);
        }

        [Fact]
        public void Remove_with_routeName_and_routeValues_object_should_return_builder()
        {
            builder.Remove("routeName", new { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Remove_with_action_should_set_removeRequestSettings()
        {
            builder.Remove<UploadStubController>(c => c.Index());
            removeSettingsMock.VerifySet(s => s.ControllerName = "UploadStub");
            removeSettingsMock.VerifySet(s => s.ActionName = "Index");
        }

        [Fact]
        public void Remove_with_action_should_return_builder()
        {
            builder.Remove<UploadStubController>(c => c.Index()).ShouldBeSameAs(builder);
        }

        [Fact]
        public void WithCredentials_should_set_WithCredentials()
        {
            builder.WithCredentials(false);
            settingsMock.VerifySet(s => s.WithCredentials = false);
        }

        [Fact]
        public void WithCredentials_should_return_builder()
        {
            builder.WithCredentials(false).ShouldBeSameAs(builder);
        }
    }
}
