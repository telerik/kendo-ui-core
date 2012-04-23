namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Xunit;

    public class PanelBarBuilderTests
    {
        private readonly PanelBar panelBar;
        private readonly PanelBarBuilder builder;

        public PanelBarBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            panelBar = PanelBarTestHelper.CreatePanelbar(writer.Object, null);
            builder = new PanelBarBuilder(panelBar);
        }

        [Fact]
        public void Items_call_PanelBarItemFactory_to_add_item()
        {
            panelBar.Items.Clear();
            builder.Items(c => c.Add());

            Assert.Equal(1, panelBar.Items.Count);
        }

        [Fact]
        public void Items_should_return_builder()
        {
            var returnedBuilder = builder.Items(c => c.Add());

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_get_SiteMap_and_create_items() 
        {
            const string viewDataKey = "sample";

            Action<PanelBarItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            builder.BindTo(viewDataKey, action);
            
            Assert.Equal(2, panelBar.Items.Count);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_return_builder()
        {
            const string viewDataKey = "sample";

            Action<PanelBarItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            var returnedBuilder = builder.BindTo(viewDataKey, action);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_get_SiteMap_and_create_items() 
        {
            const string viewDataKey = "sample";

            builder.BindTo(viewDataKey);

            Assert.Equal(2, panelBar.Items.Count);
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

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }


        [Fact]
        public void BintTo_for_IEnumerable_should_create_two_items()
        {
            List<TestObject> list = new List<TestObject>
                                    {
                                        new TestObject{Text="", Url=""},
                                        new TestObject{Text="", Url=""}
                                    };



            Action<PanelBarItem, TestObject> action = (item, obj) => { if (!string.IsNullOrEmpty(obj.Url)) { item.Url = obj.Url; } };
            builder.BindTo(list, action);

            Assert.Equal(2, panelBar.Items.Count);
        }

        [Fact]
        public void BintTo_for_IEnumerable_should_return_builder()
        {
            var returnedBuilder = builder.BindTo(new List<TestObject>(), (item, obj) => { });

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void Bind_for_Heterogene_collection() 
        {
            Action<NavigationBindingFactory<PanelBarItem>> actionTestObject =
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

            Assert.Equal(20, panelBar.Items.Count);
            Assert.Equal(10, panelBar.Items[0].Items.Count);
        }

        [Fact]
        public void ItemAction_should_set_ItemAction_property_of_panelBar()
        {
            Action<PanelBarItem> action = (item) => { };
            builder.ItemAction(action);

            Assert.Equal(action, panelBar.ItemAction);
        }

        [Fact]
        public void ItemAction_should_return_builder()
        {
            Action<PanelBarItem> action = (item) => { };
            var returnedBuilder = builder.ItemAction(action);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightPath_should_set_HighlightPath_property_of_PanelBar()
        {
            const bool value = true;

            builder.HighlightPath(value);

            Assert.Equal(value, panelBar.HighlightPath);
        }

        [Fact]
        public void HighlightPath_should_return_builder()
        {
            const bool value = true;
            var returnedBuilder = builder.HighlightPath(value);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void ExpandMode_should_set_ExpandMode_property_of_PanelBar()
        {
            builder.ExpandMode(PanelBarExpandMode.Single);

            Assert.Equal(PanelBarExpandMode.Single, panelBar.ExpandMode);
        }

        [Fact]
        public void ExpandMode_should_return_builder()
        {
            var returnedBuilder = builder.ExpandMode(PanelBarExpandMode.Multiple);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void ExpandAll_should_set_HighlightPath_property_of_PanelBar()
        {
            const bool value = true;

            builder.ExpandAll(value);

            Assert.Equal(value, panelBar.ExpandAll);
        }

        [Fact]
        public void ExpandAll_should_return_builder()
        {
            const bool value = true;
            var returnedBuilder = builder.ExpandAll(value);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }

        [Fact]
        public void SelectedIndex_should_set_SelectedIndex_property_of_PanelBar()
        {
            const int value = 0;

            builder.SelectedIndex(value);

            Assert.Equal(value, panelBar.SelectedIndex);
        }

        [Fact]
        public void SelectedIndex_should_return_builder()
        {
            const int value = 0;
            var returnedBuilder = builder.SelectedIndex(value);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
        }


        [Fact]
        public void ClientEvents_should_set_events_of_the_menu()
        {
            Action<PanelBarClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(panelBar.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<PanelBarClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(PanelBarBuilder), returnedBuilder);
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
    }
}