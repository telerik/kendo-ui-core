namespace Telerik.Web.Mvc.Tests.Menu
{
    using Telerik.Web.Mvc.UI;
    using Xunit;
    using System.Collections.Generic;

    public class MenuItemBuilderTests
    {
        private readonly MenuItem item;
        private readonly MenuItemBuilder builder;

		public MenuItemBuilderTests()
        {
            var viewContext = TestHelper.CreateViewContext();
			item = new MenuItem();
            builder = new MenuItemBuilder(item, viewContext);
        }

        [Fact]
        public void Builder_should_set_expanded_property()
        {
			bool factoryIsMenuItemFactory = false;

			builder.Items(factory => { factoryIsMenuItemFactory = factory is MenuItemFactory; });

			Assert.True(factoryIsMenuItemFactory);
        }

        [Fact]
        public void Items_with_IEnumerable_adds_items()
        {
            IEnumerable<MenuItem> items = new List<MenuItem>
            {
                new MenuItem { Text = "Item 1" },
                new MenuItem { Text = "Item 2" }
            };

            builder.Items(items);

            Assert.Equal(2, item.Items.Count);
        }

        [Fact]
        public void Items_with_IEnumerable_clears_items_before_adding_new_ones()
        {
            IEnumerable<MenuItem> items = new List<MenuItem>
            {
                new MenuItem { Text = "Item 1" },
                new MenuItem { Text = "Item 2" }
            };

            builder.Items(items);
            builder.Items(items);

            Assert.Equal(2, item.Items.Count);
        }
    }
}
