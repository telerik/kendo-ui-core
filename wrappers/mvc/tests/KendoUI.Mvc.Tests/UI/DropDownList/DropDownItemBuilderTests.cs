namespace Telerik.Web.Mvc.UnitTest.Menu
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;

    using Xunit;

    public class DropDownItemBuilderTests
    {
        private readonly DropDownItem item;
        private readonly DropDownItemBuilder builder;

        public DropDownItemBuilderTests()
        {
            item = new DropDownItem();
            builder = new DropDownItemBuilder(item);
        }

        [Fact]
        public void Builder_should_set_Text_property()
        {
            const string text = "test";

            builder.Text(text);
            Assert.Equal(text, item.Text);
        }

        [Fact]
        public void Text_method_should_return_builder()
        {
            var sameBuilder = builder.Text("test");
            Assert.IsType(typeof(DropDownItemBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_Value_property()
        {
            const string value = "test";

            builder.Value(value);
            Assert.Equal(value, item.Value);
        }

        [Fact]
        public void Value_method_should_return_builder()
        {
            var sameBuilder = builder.Value("test");
            Assert.IsType(typeof(DropDownItemBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_Select_property()
        {
            const bool selected = true;

            builder.Selected(selected);
            Assert.Equal(selected, item.Selected);
        }

        [Fact]
        public void Select_method_should_return_builder()
        {
            var sameBuilder = builder.Selected(false);
            Assert.IsType(typeof(DropDownItemBuilder), sameBuilder);
        }
    }
}
