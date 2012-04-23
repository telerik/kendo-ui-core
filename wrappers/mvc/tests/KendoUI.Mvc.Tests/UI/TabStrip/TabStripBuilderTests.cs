namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class TabStripBuilderTests
    {
        private readonly TabStrip _tabStrip;
        private readonly TabStripBuilder _builder;

        public TabStripBuilderTests()
        {
            Mock<TextWriter> textWriter = new Mock<TextWriter>();
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(textWriter.Object);

            _tabStrip = TabStripTestHelper.CreateTabStrip(writer.Object, null);
            _builder = new TabStripBuilder(_tabStrip);
        }

        [Fact]
        public void Should_be_able_to_set_items()
        {
            _builder.Items(item =>
                                   {
                                       item.Add();
                                       item.Add();
                                   }
                          );

            Assert.Equal(2, _tabStrip.Items.Count);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_get_SiteMap_and_create_items()
        {
            const string viewDataKey = "sample";

            Action<TabStripItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            _builder.BindTo(viewDataKey, action);

            Assert.Equal(2, _tabStrip.Items.Count);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_return_builder()
        {
            const string viewDataKey = "sample";

            Action<TabStripItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            var returnedBuilder = _builder.BindTo(viewDataKey, action);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_get_SiteMap_and_create_items()
        {
            const string viewDataKey = "sample";

            _builder.BindTo(viewDataKey);

            Assert.Equal(2, _tabStrip.Items.Count);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_throw_exception_if_siteMap_is_loaded()
        {
            const string viewDataKey = "unexistingSiteMap";

            Assert.Throws(typeof(NotSupportedException), () => { _builder.BindTo(viewDataKey); });
        }

        [Fact]
        public void BintTo_for_viewDataKey_only_should_return_builder()
        {
            const string viewDataKey = "sample";

            var returnedBuilder = _builder.BindTo(viewDataKey);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_create_two_items()
        {
            List<TestObject> list = new List<TestObject>
                                    {
                                        new TestObject{Text="", Url=""},
                                        new TestObject{Text="", Url=""}
                                    };



            Action<TabStripItem, TestObject> action = (item, obj) => { if (!string.IsNullOrEmpty(obj.Url)) { item.Url = obj.Url; } };
            _builder.BindTo(list, action);

            Assert.Equal(2, _tabStrip.Items.Count);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_return_builder()
        {
            var returnedBuilder = _builder.BindTo(new List<TestObject>(), (item, obj) => { });

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void ItemAction_should_set_ItemAction_property_of_panelBar()
        {
            Action<TabStripItem> action = (item) => { };
            _builder.ItemAction(action);

            Assert.Equal(action, _tabStrip.ItemAction);
        }

        [Fact]
        public void ItemAction_should_return_builder()
        {
            Action<TabStripItem> action = (item) => { };
            var returnedBuilder = _builder.ItemAction(action);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedIndex_should_set_SelectedIndex_property_of_PanelBar()
        {
            const int value = 0;

            _builder.SelectedIndex(value);

            Assert.Equal(value, _tabStrip.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_return_builder()
        {
            const int value = 0;
            var returnedBuilder = _builder.SelectedIndex(value);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightPath_should_set_HighlightPath_property_of_PanelBar()
        {
            const bool value = true;

            _builder.HighlightPath(value);

            Assert.Equal(value, _tabStrip.HighlightPath);
        }

        [Fact]
        public void HighlightPath_should_return_builder()
        {
            const bool value = true;
            var returnedBuilder = _builder.HighlightPath(value);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }

        [Fact]
        public void Effects_creates_fx_factory()
        {
            var fxFacCreated = false;

            _builder.Effects(fx =>
            {
                fxFacCreated = fx != null;
            });

            Assert.True(fxFacCreated);
        }


        [Fact]
        public void ClientEvents_should_set_events_of_the_tabstrip()
        {
            Action<TabStripClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            _builder.ClientEvents(clientEventsAction);

            Assert.NotNull(_tabStrip.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<TabStripClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = _builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(TabStripBuilder), returnedBuilder);
        }
    }
}