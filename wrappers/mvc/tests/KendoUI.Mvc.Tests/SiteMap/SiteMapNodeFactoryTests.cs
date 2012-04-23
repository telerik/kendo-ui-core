// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using Xunit;

    public class SiteMapNodeFactoryTests
    {
        private readonly SiteMapNode _parent;
        private readonly SiteMapNodeFactory _factory;

        public SiteMapNodeFactoryTests()
        {
            _parent = new SiteMapNode();
            _factory = new SiteMapNodeFactory(_parent);
        }

        [Fact]
        public void Add_should_return_new_site_map_node_builder()
        {
            Assert.NotNull(Add());
        }

        [Fact]
        public void Add_should_register_new_site_map_node_in_parent()
        {
            Add();

            Assert.Equal(1, _parent.ChildNodes.Count);
        }

        private SiteMapNodeBuilder Add()
        {
            return _factory.Add();
        }
    }
}