// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using Xunit;

    public class SiteMapNodeTests
    {
        private readonly SiteMapNode _node;

        public SiteMapNodeTests()
        {
            _node = new SiteMapNode();
        }

        [Fact]
        public void Visible_should_be_true_when_new_instance_is_created()
        {
            Assert.True(_node.Visible);
        }

        [Fact]
        public void RouteValues_should_empty_when_new_instance_is_created()
        {
            Assert.Empty(_node.RouteValues);
        }

        [Fact]
        public void IncludeInSearchEngineIndex_should_be_true_when_new_instance_is_created()
        {
            Assert.True(_node.Visible);
        }

        [Fact]
        public void Attributes_should_empty_when_new_instance_is_created()
        {
            Assert.Empty(_node.Attributes);
        }

        [Fact]
        public void ChildNodes_should_empty_when_new_instance_is_created()
        {
            Assert.Empty(_node.ChildNodes);
        }

        [Fact]
        public void Should_be_able_to_set_title()
        {
            _node.Title = "Home";

            Assert.Equal("Home", _node.Title);
        }

        [Fact]
        public void Should_be_able_to_set_route_name()
        {
            _node.RouteName = "Default";

            Assert.Equal("Default", _node.RouteName);
        }

        [Fact]
        public void RouteName_should_reset_controller_name_action_name_and_url_to_null()
        {
            _node.ControllerName = "Home";
            _node.ActionName = "Index";

            _node.RouteName = "Default";

            Assert.Null(_node.ControllerName);
            Assert.Null(_node.ActionName);
            Assert.Null(_node.Url);
        }

        [Fact]
        public void Should_be_able_to_set_controller_name()
        {
            _node.ControllerName = "Home";

            Assert.Equal("Home", _node.ControllerName);
        }

        [Fact]
        public void ControllerName_should_reset_route_name_and_url_to_null()
        {
            _node.RouteName = "Default";

            _node.ControllerName = "Home";

            Assert.Null(_node.RouteName);
            Assert.Null(_node.Url);
        }

        [Fact]
        public void Should_be_able_to_set_action_name()
        {
            _node.ActionName = "Index";

            Assert.Equal("Index", _node.ActionName);
        }

        [Fact]
        public void ActionName_should_reset_route_name_and_url_to_null()
        {
            _node.RouteName = "Default";

            _node.ActionName = "Index";

            Assert.Null(_node.RouteName);
            Assert.Null(_node.Url);
        }

        [Fact]
        public void Should_be_able_to_set_url()
        {
            _node.Url = "~/Faq";

            Assert.Equal("~/Faq", _node.Url);
        }

        [Fact]
        public void Url_should_reset_route_name_controller_name_and_action_name_to_null()
        {
            _node.RouteName = "Default";

            _node.Url = "~/Faq";

            Assert.Null(_node.RouteName);
            Assert.Null(_node.ControllerName);
            Assert.Null(_node.ActionName);
        }

        [Fact]
        public void ToBuilder_should_return_correct_builder()
        {
            SiteMapNodeBuilder builder = _node;

            Assert.NotNull(builder);
        }

        [Fact]
        public void SiteMapNodeBuilder_operator_should_return_correct_builder()
        {
            SiteMapNodeBuilder builder = _node.ToBuilder();

            Assert.NotNull(builder);
        }
    }
}