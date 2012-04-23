namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;
    using System;
    using Telerik.Web.Mvc.UI.Fluent;

    public class WindowBuilderTests
    {
        private WindowBuilder builder;
        private Window component;

        public WindowBuilderTests()
        {
            component = WindowTestHelper.CreateWindow(null);
            builder = new WindowBuilder(component);
        }

        [Fact]
        public void Icon_should_set_IconUrl_property() 
        {
            const string iconPath = "fakePath";

            builder.Icon(iconPath);

            Assert.Equal(iconPath, component.IconUrl);
        }

        [Fact]
        public void Icon_should_set_IconUrl_and_AltrnativeText_property()
        {
            const string iconPath = "fakePath";
            const string alternativeText = "icon";

            builder.Icon(iconPath, alternativeText);

            Assert.Equal(iconPath, component.IconUrl);
            Assert.Equal(alternativeText, component.IconAlternativeText);
        }

        [Fact]
        public void Icon_method_with_one_parameter_should_return_builder()
        {
            var returnedBuilder = builder.Icon("fakePath");

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Icon_method_with_two_parameter_should_return_builder()
        {
            var returnedBuilder = builder.Icon("fakePath", "icon");

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Title_should_set_Title_property()
        {
            const string title = "title";

            builder.Title(title);

            Assert.Equal(title, component.Title);
        }

        [Fact]
        public void Title_should_return_builder()
        {
            var returnedBuilder = builder.Title("title");

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Content_should_set_Content_property()
        {
            Action content = () => { };

            builder.Content(content);

            Assert.Equal(content, component.Content);
        }

        [Fact]
        public void Content_should_return_builder_object()
        {
            Action content = () => { };

            var returnedBuilder = builder.Content(content);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }


        [Fact]
        public void Content_with_string_param_should_set_Content_property()
        {
            builder.Content("<ul><li>something</li></ul>");

            Assert.NotNull(component.Html);
        }

        [Fact]
        public void Content_with_string_param_should_return_builder_object()
        {
            var returnedBuilder = builder.Content("<ul><li>something</li></ul>");

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void ContentHtmlAttributes_should_merge_passed_object_to_ContentHtmlAttributes_property()
        {
            const string value = "test";
            var attr = new { attr = value };

            builder.ContentHtmlAttributes(attr);

            Assert.Equal(value, component.ContentHtmlAttributes["attr"]);
        }

        [Fact]
        public void ContentHtmlAttributes_should_return_builder_object()
        {
            const string value = "test";
            var attr = new { attr = value };

            var returnedBuilder = builder.ContentHtmlAttributes(attr);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }
        
        [Fact]
        public void LoadContentFrom_should_set_contentUrl()
        {
            const string value = "test";

            builder.LoadContentFrom(value);

            Assert.Equal(value, component.ContentUrl);
        }

        [Fact]
        public void LoadContentFrom_should_return_builder_object()
        {
            const string value = "test";

            var returnedBuilder = builder.LoadContentFrom(value);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Width_should_set_Width_property()
        {
            const int width = 400;

            builder.Width(width);

            Assert.Equal(width, component.Width);
        }


        [Fact]
        public void Width_should_throw_exception_when_param_is_negative()
        {
            const int width = -100;

            Assert.Throws(typeof(ArgumentOutOfRangeException), () => builder.Width(width));
        }

        [Fact]
        public void Width_should_return_builder()
        {
            var returnedBuilder = builder.Width(400);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Height_should_set_Height_property()
        {
            const int height = 200;

            builder.Height(height);

            Assert.Equal(height, component.Height);
        }


        [Fact]
        public void Height_should_throw_exception_when_param_is_negative()
        {
            const int height = -100;

            Assert.Throws(typeof(ArgumentOutOfRangeException), () => builder.Height(height));
        }

        [Fact]
        public void Height_should_return_builder()
        {
            var returnedBuilder = builder.Height(200);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Visible_should_set_Visible_property()
        {
            const bool visible = true;

            builder.Visible(visible);

            Assert.Equal(visible, component.Visible);
        }

        [Fact]
        public void Visible_should_return_builder()
        {
            var returnedBuilder = builder.Visible(true);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Effects_creates_fx_factory()
        {
            var fxFacCreated = false;

            builder.Effects(fx =>
            {
                fxFacCreated = fx != null;
            });

            Assert.True(fxFacCreated);
        }

        [Fact]
        public void Modal_should_set_Modal_property()
        {
            const bool modal = true;

            builder.Modal(modal);

            Assert.Equal(modal, component.Modal);
        }

        [Fact]
        public void Modal_should_return_builder()
        {
            var returnedBuilder = builder.Modal(true);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Draggable_should_set_Draggable_property()
        {
            const bool drag = true;

            builder.Draggable(drag);

            Assert.Equal(drag, component.Draggable);
        }

        [Fact]
        public void Draggable_should_return_builder()
        {
            var returnedBuilder = builder.Draggable(true);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void ClientEvents_should_set_events()
        {
            Action<WindowClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(component.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<WindowClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Resizable_with_ResizingSettingsBuilder_should_set_resizingSettings()
        {
            Action<WindowResizingSettingsBuilder> settings = settingsBuilder => { settingsBuilder.Enabled(true); };

            builder.Resizable(settings);

            Assert.True(component.ResizingSettings.Enabled);
        }

        [Fact]
        public void Resizable_with_no_params_should_set_resizingSettings()
        {
            builder.Resizable();

            Assert.True(component.ResizingSettings.Enabled);
        }

        [Fact]
        public void Resizable_with_ResizingSettingsBuilder_should_return_builder()
        {
            Action<WindowResizingSettingsBuilder> settings = settingsBuilder => { settingsBuilder.Enabled(true); };

            var returnedBuilder = builder.Resizable(settings);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }

        [Fact]
        public void Resizable_without_params_should_return_builder()
        {
            var returnedBuilder = builder.Resizable();

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }


        [Fact]
        public void Buttons_should_define_buttons_collection()
        {
            Action<WindowButtonsBuilder> buttonsBuilder = b => { b.Close(); };

            builder.Buttons(buttonsBuilder);

            Assert.True(component.Buttons.Container.Count > 0);
        }

        [Fact]
        public void Buttons_should_initialy_clear_buttons_collection()
        {
            Action<WindowButtonsBuilder> buttonsBuilder = b => { b.Maximize(); };

            builder.Buttons(buttonsBuilder);

            Assert.True(component.Buttons.Container.Count == 1);
            Assert.Equal("Maximize", component.Buttons.Container[0].Name);
        }

        [Fact]
        public void Buttons_should_return_builder()
        {
            Action<WindowButtonsBuilder> buttonsBuilder = b => { b.Close(); };

            var returnedBuilder = builder.Buttons(buttonsBuilder);

            Assert.IsType(typeof(WindowBuilder), returnedBuilder);
        }
    }
}