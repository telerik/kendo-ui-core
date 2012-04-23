// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;

    using Xunit;

    public class SiteMapNodeBuilderTests
    {
        private readonly SiteMapNode _node;
        private readonly SiteMapNodeBuilder _builder;

        public SiteMapNodeBuilderTests()
        {
            _node = new SiteMapNode();
            _builder = new SiteMapNodeBuilder(_node);
        }

        [Fact]
        public void ToNode_should_return_correct_site_map_node()
        {
            SiteMapNode node = _builder.ToNode();

            Assert.Same(_node, node);
        }

        [Fact]
        public void SiteMapNode_operator_should_return_correct_site_map_node()
        {
            SiteMapNode node = _builder;

            Assert.Same(_node, node);
        }

        [Fact]
        public void Should_be_able_to_set_title()
        {
            _builder.Title("Home");

            Assert.Equal("Home", _node.Title);
        }

        [Fact]
        public void Should_be_able_to_set_visible()
        {
            _builder.Visible(false);

            Assert.False(_node.Visible);
        }

        [Fact]
        public void Should_be_able_to_set_last_modified_at()
        {
            DateTime modifiedAt = new DateTime(2010, 1, 1);

            _builder.LastModifiedAt(modifiedAt);

            Assert.Equal(modifiedAt, _node.LastModifiedAt);
        }

        [Fact]
        public void Should_be_able_to_set_route_with_route_value_dictionary()
        {
            RouteValueDictionary values = new RouteValueDictionary
                                              {
                                                  { "foo", "bar" }
                                              };

            _builder.Route("dummy", values);

            Assert.Equal(_node.RouteName, "dummy");
            Assert.Equal("bar", _node.RouteValues["foo"]);
        }

        [Fact]
        public void Should_be_able_to_set_route_with_object()
        {
            _builder.Route("dummy", new { foo = "bar" });

            Assert.Equal(_node.RouteName, "dummy");
            Assert.Equal("bar", _node.RouteValues["foo"]);
        }

        [Fact]
        public void Should_be_able_to_set_route()
        {
            _builder.Route("dummy");

            Assert.Equal(_node.RouteName, "dummy");
        }

        [Fact]
        public void Action_method_with_RouteValueDinctionary_populated_from_MVCT4_templates_should_set_controller_action_and_routevalues()
        {
            const string actionName = "Index";
            const string controllerName = "Home";

            RouteValueDictionary values = new RouteValueDictionary();
            values.Add("action", actionName);
            values.Add("controller", controllerName);
            values.Add("id", 1);

            _builder.Action(values);

            Assert.Equal(actionName, _node.ActionName);
            Assert.Equal(controllerName, _node.ControllerName);
            Assert.True(_node.RouteValues.ContainsKey("id"));
            Assert.Equal(1, _node.RouteValues["id"]);
        }

        [Fact]
        public void Action_method_with_RouteValueDinctionary_should_populate_action_and_controller_name_if_no_routeValues_is_presented_in_the_argument_dictionary()
        {
            const string actionName = "Index";
            const string controllerName = "Home";

            RouteValueDictionary values = new RouteValueDictionary();
            values.Add("action", actionName);
            values.Add("controller", controllerName);

            _builder.Action(values);

            Assert.Equal(actionName, _node.ActionName);
            Assert.Equal(controllerName, _node.ControllerName);
            Assert.Equal(0, _node.RouteValues.Count);
        }

        [Fact]
        public void Should_be_able_to_set_action_with_route_value_dictionary()
        {
            RouteValueDictionary values = new RouteValueDictionary
                                              {
                                                  { "foo", "bar" }
                                              };

            _builder.Action("action", "dummy", values);

            Assert.Equal(_node.ControllerName, "dummy");
            Assert.Equal(_node.ActionName, "action");
            Assert.Equal("bar", _node.RouteValues["foo"]);
        }

        [Fact]
        public void Should_be_able_to_set_action_with_object()
        {
            _builder.Action("action", "dummy", new { foo = "bar" });

            Assert.Equal(_node.ControllerName, "dummy");
            Assert.Equal(_node.ActionName, "action");

            Assert.Equal("bar", _node.RouteValues["foo"]);
        }

        [Fact]
        public void Should_be_able_to_set_action()
        {
            _builder.Action("action", "dummy");

            Assert.Equal(_node.ControllerName, "dummy");
            Assert.Equal(_node.ActionName, "action");
        }

        [Fact]
        public void Should_be_able_to_set_url()
        {
            _builder.Url("~/faq");

            Assert.Equal(_node.Url, "~/faq");
        }

        [Fact]
        public void Should_be_able_to_set_change_frequency()
        {
            _builder.ChangeFrequency(SiteMapChangeFrequency.Weekly);

            Assert.Equal(SiteMapChangeFrequency.Weekly, _node.ChangeFrequency);
        }

        [Fact]
        public void Should_be_able_to_set_update_priority()
        {
            _builder.UpdatePriority(SiteMapUpdatePriority.High);

            Assert.Equal(SiteMapUpdatePriority.High, _node.UpdatePriority);
        }

        [Fact]
        public void Should_be_able_to_set_include_in_search_engine_index()
        {
            _builder.IncludeInSearchEngineIndex(false);

            Assert.False(_node.IncludeInSearchEngineIndex);
        }

        [Fact]
        public void Should_be_able_to_set_extra_attributes_with_dictionary()
        {
            IDictionary<string, object> values = new Dictionary<string, object>
                                                     {
                                                         { "foo", "bar" }
                                                     };

            _builder.Attributes(values);

            Assert.Equal("bar", _node.Attributes["foo"]);
        }

        [Fact]
        public void Should_be_able_to_set_extra_attributes_with_object()
        {
            _builder.Attributes(new { foo = "bar" });

            Assert.Equal("bar", _node.Attributes["foo"]);
        }

        [Fact]
        public void Should_be_able_to_child_nodes()
        {
            _builder.ChildNodes(factory =>
                                            {
                                                factory.Add();
                                                factory.Add();
                                            }
                               );

            Assert.Equal(2, _node.ChildNodes.Count);
        }
    }
}