namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Telerik.Web.Mvc.UI.Fluent;

    public class EditorDropDownItemsBuilderTests
    {
        private readonly EditorDropDownItemBuilder builder;
        private readonly IList<DropDownItem> container;

        public EditorDropDownItemsBuilderTests()
        {
            container = new List<DropDownItem>();
            
            builder = new EditorDropDownItemBuilder(container);
        }

        [Fact]
        public void Add_should_add_items_in_container()
        {
            builder.Add("text", "value");

            Assert.Equal(1, container.Count);
        }

        [Fact]
        public void Add_should_return_builder()
        {
            var returnedBuilder = builder.Add("text", "value");

            Assert.IsType(typeof(EditorDropDownItemBuilder), returnedBuilder);
        }
    }
}