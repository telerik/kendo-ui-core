namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class TreeViewBuilderTests
    {
        private readonly TreeView treeView;
        private readonly TreeViewBuilder builder;

        public TreeViewBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            treeView = TreeViewTestHelper.CreateTreeView(writer.Object, null, new Mock<IClientSideObjectWriter>().Object);
            builder = new TreeViewBuilder(treeView);
        }

        [Fact]
        public void Items_call_TreeViewItemFactory_to_add_item()
        {
            treeView.Items.Clear();
            builder.Items(c => c.Add());

            Assert.Equal(1, treeView.Items.Count);
        }

        [Fact]
        public void Items_should_return_builder()
        {
            var returnedBuilder = builder.Items(c => c.Add());

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_get_SiteMap_and_create_items() 
        {
            const string viewDataKey = "sample";

            Action<TreeViewItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            builder.BindTo(viewDataKey, action);
            
            Assert.Equal(2, treeView.Items.Count);
        }

        [Fact]
        public void BintTo_for_SiteMap_should_return_builder()
        {
            const string viewDataKey = "sample";

            Action<TreeViewItem, SiteMapNode> action = (item, node) => { if (!string.IsNullOrEmpty(node.RouteName)) { item.RouteName = node.RouteName; } };
            var returnedBuilder = builder.BindTo(viewDataKey, action);

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_get_SiteMap_and_create_items() 
        {
            const string viewDataKey = "sample";

            builder.BindTo(viewDataKey);

            Assert.Equal(2, treeView.Items.Count);
        }

        [Fact]
        public void BindTo_with_viewDataKey_only_should_throw_exception_if_siteMap_is_loaded() 
        {
            const string viewDataKey = "unexistingSiteMap";

            Assert.Throws(typeof(NotSupportedException), () => { builder.BindTo(viewDataKey); });
        }

        [Fact]
        public void BindTo_for_viewDataKey_only_should_return_builder()
        {
            const string viewDataKey = "sample";

            var returnedBuilder = builder.BindTo(viewDataKey);

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void BindTo_for_IEnumerable_should_create_two_items()
        {
            List<TestObject> list = new List<TestObject>
                                    {
                                        new TestObject{Text="", Url=""},
                                        new TestObject{Text="", Url=""}
                                    };



            Action<TreeViewItem, TestObject> action = (item, obj) => { if (!string.IsNullOrEmpty(obj.Url)) { item.Url = obj.Url; } };
            builder.BindTo(list, action);

            Assert.Equal(2, treeView.Items.Count);
        }

        [Fact]
        public void BindTo_for_IEnumerable_should_return_builder()
        {
            var returnedBuilder = builder.BindTo(new List<TestObject>(), (item, obj) => { });

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void Bind_for_Heterogene_collection() 
        {
            Action<NavigationBindingFactory<TreeViewItem>> actionTestObject =
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

            Assert.Equal(20, treeView.Items.Count);
            Assert.Equal(10, treeView.Items[0].Items.Count);
        }

        [Fact]
        public void Bind_for_IEnumerable_of_TreeViewItemModel()
        {
            var model = new List<TreeViewItemModel> {
                new TreeViewItemModel() {
                    Text = "foo",
                    Value = "5",
                    Enabled = false,
                    Expanded = true,
                    Checkable = true,
                    Checked = true,
                    Encoded = true,
                    NavigateUrl = "http://telerik.com/",
                    ImageUrl = "pic.jpg",
                    Items = new List<TreeViewItemModel>() {
                        new TreeViewItemModel() { 
                            LoadOnDemand = true,
                            Text = "bar"
                        },
                        new TreeViewItemModel() { Text = "baz" }
                    }
                }
            };

            builder.BindTo(model);

            Assert.Equal(1, treeView.Items.Count);
            Assert.Equal(2, treeView.Items[0].Items.Count);
            Assert.Equal("foo", treeView.Items[0].Text);
            Assert.Equal(false, treeView.Items[0].Enabled);
            Assert.Equal(true, treeView.Items[0].Expanded);
            Assert.Equal(true, treeView.Items[0].Items[0].LoadOnDemand);
            Assert.Equal(true, treeView.Items[0].Checkable);
            Assert.Equal(true, treeView.Items[0].Checked);
            Assert.Equal(true, treeView.Items[0].Encoded);
            Assert.Equal("5", treeView.Items[0].Value);
            Assert.Equal("http://telerik.com/", treeView.Items[0].Url);
            Assert.Equal("pic.jpg", treeView.Items[0].ImageUrl);
        }

        [Fact]
        public void ItemAction_should_set_ItemAction_property_of_treeView()
        {
            Action<TreeViewItem> action = (item) => { };
            builder.ItemAction(action);

            Assert.Equal(action, treeView.ItemAction);
        }

        [Fact]
        public void ItemAction_should_return_builder()
        {
            Action<TreeViewItem> action = (item) => { };
            var returnedBuilder = builder.ItemAction(action);

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void HighlightPath_should_set_HighlightPath_property_of_TreeView()
        {
            const bool value = true;

            builder.HighlightPath(value);

            Assert.Equal(value, treeView.HighlightPath);
        }

        [Fact]
        public void HighlightPath_should_return_builder()
        {
            const bool value = true;
            var returnedBuilder = builder.HighlightPath(value);

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void ExpandAll_should_set_HighlightPath_property_of_TreeView()
        {
            const bool value = true;

            builder.ExpandAll(value);

            Assert.Equal(value, treeView.ExpandAll);
        }

        [Fact]
        public void ExpandAll_should_return_builder()
        {
            const bool value = true;
            var returnedBuilder = builder.ExpandAll(value);

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
        }

        [Fact]
        public void ClientEvents_should_set_events_of_the_treeview()
        {
            Action<TreeViewClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(treeView.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<TreeViewClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(TreeViewBuilder), returnedBuilder);
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