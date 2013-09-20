namespace Kendo.Mvc.UI.Tests
{
    using Extensions;
    using Kendo.Mvc.UI.Html;
    using Xunit;

    public class ButtonHtmlBuilderTests
    {
        private ButtonHtmlBuilder renderer;
        private Button Button;

        public ButtonHtmlBuilderTests()
        {
            Button = ButtonTestHelper.CreateButton(null);
            renderer = new ButtonHtmlBuilder(Button);
            Button.Name = "Button";
        }

        [Fact]
        public void ButtonTag_should_render_button_tag()
        {
            renderer.ButtonTag().TagName.ShouldEqual("button");
        }

        [Fact]
        public void ButtonTag_should_render_id()
        {
            Button.Name = "TestName";

            renderer.ButtonTag().Attribute("id").ShouldEqual("TestName");
        }

    }
}