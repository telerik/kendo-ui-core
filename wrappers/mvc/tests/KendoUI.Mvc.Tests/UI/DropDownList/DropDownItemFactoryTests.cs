namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;
    using System.Collections.Generic;

    public class DropDownItemFactoryTests
    {
        private readonly DropDownItemFactory factory;
        private IList<DropDownItem> collection;

        public DropDownItemFactoryTests()
        {
            collection = new List<DropDownItem>();
            factory = new DropDownItemFactory(collection);
        }

        [Fact]
        public void Add_should_add_enabled_item_before_action() 
        {
            factory.Add();
            Assert.False(collection[0].Selected);
        }

        [Fact]
        public void Add_should_return_new_builder_with_new_item()
        {
            var builder = factory.Add();
            Assert.NotNull(builder);
        }
    }
}
