using System.Collections.Generic;
namespace Telerik.Web.Mvc.Tests.Menu
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class MenuBuilderTests
	{
		private readonly Menu menu;
		private readonly MenuBuilder builder;

		public MenuBuilderTests()
		{
			Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
			menu = MenuTestHelper.CreateMenu(writer.Object, null);
			builder = new MenuBuilder(menu);
		}

        [Fact]
        public void OpenOnClick_sets_the_open_on_click_property()
        {
            builder.OpenOnClick(true);

            Assert.True(menu.OpenOnClick);
        }

		[Fact]
		public void Setting_items_sets_menu_items()
		{
			builder.Items(root => root.Add().Text("Menu Item"));

			Assert.NotEmpty(menu.Items);
		}

		[Fact]
		public void Setting_orientation_sets_menu_orientation()
		{
			builder.Orientation(MenuOrientation.Vertical);

			Assert.Equal(MenuOrientation.Vertical, menu.Orientation);
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
        public void BintTo_for_SiteMap_should_get_SiteMap_and_create_items()
        {
            const string viewDataKey = "sample";

            Action<MenuItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            builder.BindTo(viewDataKey, action);

            Assert.Equal(2, menu.Items.Count);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_return_builder()
        {
            const string viewDataKey = "sample";

            Action<MenuItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            var returnedBuilder = builder.BindTo(viewDataKey, action);

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_get_SiteMap_and_create_items()
        {
            const string viewDataKey = "sample";

            builder.BindTo(viewDataKey);

            Assert.Equal(2, menu.Items.Count);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_throw_exception_if_siteMap_is_loaded()
        {
            const string viewDataKey = "unexistingSiteMap";

            Assert.Throws(typeof(NotSupportedException), () => { builder.BindTo(viewDataKey); });
        }

        [Fact]
        public void BintTo_for_viewDataKey_only_should_return_builder()
        {
            const string viewDataKey = "sample";

            var returnedBuilder = builder.BindTo(viewDataKey);

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_create_two_items()
        {
            List<TestObject> list = new List<TestObject>
                                    {
                                        new TestObject{Text="", Url=""},
                                        new TestObject{Text="", Url=""}
                                    };



            Action<MenuItem, TestObject> action = (item, obj) => { if (!string.IsNullOrEmpty(obj.Url)) { item.Url = obj.Url; } };
            builder.BindTo(list, action);

            Assert.Equal(2, menu.Items.Count);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_return_builder()
        {
            var returnedBuilder = builder.BindTo(new List<TestObject>(), (item, obj) => { });

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void Bind_for_Heterogene_collection()
        {
            Action<NavigationBindingFactory<MenuItem>> actionTestObject =
            mapper =>
            {
                mapper.For<TestObject>(binding =>
                    binding
                    .Children(o => o.childObjects)
                    .ItemDataBound((item, o) => item.Text = o.Text));
                mapper.For<ChildObject>(binding =>
                    binding
                    .Children(o => null)
                    .ItemDataBound((item, o) => item.Text = o.Text));
            };

            builder.BindTo(Repository.repository.GetTestObjectsList(),
                            actionTestObject);

            Assert.Equal(20, menu.Items.Count);
            Assert.Equal(10, menu.Items[0].Items.Count);
        }

        [Fact]
        public void Effects_should_return_builder()
        {
            var returnedBuilder = builder.Effects((effects) => { });

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void ItemAction_should_set_ItemAction_property_of_panelBar()
        {
            Action<MenuItem> action = (item) => { };
            builder.ItemAction(action);

            Assert.Equal(action, menu.ItemAction);
        }

        [Fact]
        public void ItemAction_should_return_builder()
        {
            Action<MenuItem> action = (item) => { };
            var returnedBuilder = builder.ItemAction(action);

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedIndex_should_set_SelectedIndex_property_of_PanelBar()
        {
            const int value = 0;

            builder.SelectedIndex(value);

            Assert.Equal(value, menu.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_return_builder()
        {
            const int value = 0;
            var returnedBuilder = builder.SelectedIndex(value);

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightPath_should_set_HighlightPath_property_of_Menu()
        {
            const bool value = true;

            builder.HighlightPath(value);

            Assert.Equal(value, menu.HighlightPath);
        }

        [Fact]
        public void HighlightPath_should_return_builder()
        {
            const bool value = true;
            var returnedBuilder = builder.HighlightPath(value);

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void ClientEvents_should_set_events_of_the_menu()
        {
            Action<MenuClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(menu.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<MenuClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(MenuBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_with_IEnumerable()
        {
            IEnumerable<MenuItem> items = new List<MenuItem>
            {
                new MenuItem { Text = "Item 1" },
                new MenuItem { Text = "Item 2" }
            };

            builder.BindTo(items);
            Assert.Equal(2, menu.Items.Count);
        }

        [Fact]
        public void BindTo_with_IEnumerable_clears_previously_added_items()
        {
            IEnumerable<MenuItem> items = new List<MenuItem>
            {
                new MenuItem { Text = "Item 1" },
                new MenuItem { Text = "Item 2" }
            };

            builder.BindTo(items);
            builder.BindTo(items);
            Assert.Equal(2, menu.Items.Count);
        }
	}
}
public class TestObject 
{
    public int ID { get; set; }
    public string Text { get; set; }
    public string Url { get; set; }
    public IEnumerable<ChildObject> childObjects { get; set; }
}

public class ChildObject 
{
    public int ID { get; set; }
    public string Text { get; set; }
}

public class Repository 
{
    public static Repository repository = new Repository();

    public IEnumerable<TestObject> GetTestObjectsList()
    {
        for (int i = 0; i < 20; i++)
        {
            yield return new TestObject { ID = i, Text = "Customer" + i, childObjects = GetChildObjectsList() };
        }
    }

    private IEnumerable<ChildObject> GetChildObjectsList()
    {
        for (int i = 0; i < 10; i++)
        {
            yield return new ChildObject { ID = i, Text = "Order" + i };
        }
    }
}