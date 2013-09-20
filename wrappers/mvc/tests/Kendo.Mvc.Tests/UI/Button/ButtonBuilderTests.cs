namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Fluent;
    using Xunit;

    public class ButtonBuilderTests
    {
        private ButtonBuilder builder;
        private Button component;

        public ButtonBuilderTests()
        {
            component = ButtonTestHelper.CreateButton(null);
            builder = new ButtonBuilder(component);
        }

        [Fact]
        public void Content_sets_Content_property()
        {
            Action content = () => { };

            builder.Content(content);

            component.Template.Content.ShouldEqual(content);
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

            component.Template.Html.ShouldNotBeNull();
        }

        [Fact]
        public void Content_with_string_param_returns_builder_object()
        {
            builder.Content("<ul><li>something</li></ul>").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Enable_sets_Enable_property()
        {
            const bool enabled = false;

            builder.Enable(enabled);

            component.Enable.ShouldEqual(enabled);
        }

        [Fact]
        public void Enable_returns_builder()
        {
            builder.Enable(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void ImageUrl_sets_ImageUrl_property()
        {
            const string url = "foo";

            builder.ImageUrl(url);

            component.ImageUrl.ShouldEqual(url);
        }

        [Fact]
        public void ImageUrl_returns_builder()
        {
            builder.ImageUrl("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void SpriteCssClass_sets_SpriteCssClass_property()
        {
            const string cssClass = "foo";

            builder.SpriteCssClass(cssClass);

            component.SpriteCssClass.ShouldEqual(cssClass);
        }

        [Fact]
        public void SpriteCssClass_returns_builder()
        {
            builder.SpriteCssClass("foo").ShouldBeSameAs(builder);
        }
    }
}