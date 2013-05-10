namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Fluent;
    using Xunit;

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
        public void Title_sets_Title_property()
        {
            const string title = "title";

            builder.Title(title);

            component.Title.ShouldEqual(title);
        }

        [Fact]
        public void Title_returns_builder()
        {
            builder.Title("title").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_sets_Content_property()
        {
            Action content = () => { };

            builder.Content(content);

            component.Content.ShouldEqual(content);
        }

        [Fact]
        public void Content_returns_builder_object()
        {
            builder.Content(() => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Content_with_string_param_sets_Content_property()
        {
            builder.Content("<ul><li>something</li></ul>");

            component.Html.ShouldNotBeNull();
        }

        [Fact]
        public void Content_with_string_param_returns_builder_object()
        {
            builder.Content("<ul><li>something</li></ul>").ShouldBeSameAs(builder);
        }

        [Fact]
        public void LoadContentFrom_sets_contentUrl()
        {
            const string value = "test";

            builder.LoadContentFrom(value);

            component.ContentUrl.ShouldEqual(value);
        }

        [Fact]
        public void LoadContentFrom_returns_builder_object()
        {
            builder.LoadContentFrom("test").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Width_sets_Width_property()
        {
            const int width = 400;

            builder.Width(width);

            component.Width.ShouldEqual(width);
        }

        [Fact]
        public void Width_returns_builder()
        {
            builder.Width(400).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Height_sets_Height_property()
        {
            const int height = 200;

            builder.Height(height);

            component.Height.ShouldEqual(height);
        }

        [Fact]
        public void Height_returns_builder()
        {
            builder.Height(200).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Visible_sets_Visible_property()
        {
            const bool visible = true;

            builder.Visible(visible);

            component.Visible.ShouldEqual(visible);
        }

        [Fact]
        public void Visible_returns_builder()
        {
            builder.Visible(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Modal_sets_Modal_property()
        {
            const bool modal = true;

            builder.Modal(modal);

            component.Modal.ShouldEqual(modal);
        }

        [Fact]
        public void Modal_returns_builder()
        {
            builder.Modal(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Draggable_sets_Draggable_property()
        {
            const bool drag = true;

            builder.Draggable(drag);

            component.Draggable.ShouldEqual(drag);
        }

        [Fact]
        public void Draggable_returns_builder()
        {
            builder.Draggable(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Resizable_with_ResizingSettingsBuilder_sets_resizingSettings()
        {
            builder.Resizable(settingsBuilder => { settingsBuilder.Enabled(true); });

            component.ResizingSettings.Enabled.ShouldBeTrue();
        }

        [Fact]
        public void Resizable_with_no_params_sets_resizingSettings()
        {
            builder.Resizable();

            component.ResizingSettings.Enabled.ShouldBeTrue();
        }

        [Fact]
        public void Resizable_with_ResizingSettingsBuilder_returns_builder()
        {
            builder.Resizable(settingsBuilder => { settingsBuilder.Enabled(true); }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Resizable_without_params_returns_builder()
        {
            builder.Resizable().ShouldBeSameAs(builder);
        }


        [Fact]
        public void Buttons_should_define_buttons_collection()
        {
            builder.Actions(b => { b.Close(); });

            (component.Actions.Container.Count > 0).ShouldBeTrue();
        }

        [Fact]
        public void Buttons_should_initialy_clear_buttons_collection()
        {
            builder.Actions(b => { b.Maximize(); });

            (component.Actions.Container.Count == 1).ShouldBeTrue();
            component.Actions.Container[0].Name.ShouldEqual("Maximize");
        }

        [Fact]
        public void Buttons_returns_builder()
        {
            builder.Actions(b => { b.Close(); }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Pinned_sets_Pinned_property()
        {
            const bool pinned = true;

            builder.Pinned(pinned);

            component.Pinned.ShouldEqual(pinned);
        }

        [Fact]
        public void Pinned_returns_builder()
        {
            builder.Pinned(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AppendTo_sets_AppendTo_property()
        {
            const string appendTo = "#f00";

            builder.AppendTo(appendTo);

            component.AppendTo.ShouldEqual(appendTo);
        }

        [Fact]
        public void AppendTo_returns_builder()
        {
            builder.AppendTo("#foo").ShouldBeSameAs(builder);
        }

    }
}