// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using Moq;
    using Xunit;

    public class SiteMapBuilderTests
    {
        private readonly Mock<SiteMapBase> _siteMap;
        private readonly SiteMapBuilder _builder;

        public SiteMapBuilderTests()
        {
            _siteMap = new Mock<SiteMapBase>();
            _builder = new SiteMapBuilder(_siteMap.Object);
        }

        [Fact]
        public void RooteNode_should_not_be_null()
        {
            Assert.NotNull(_builder.RootNode);
        }

        [Fact]
        public void ToSiteMap_should_return_correct_site_map()
        {
            SiteMapBase siteMap = _builder.ToSiteMap();

            Assert.Same(_siteMap.Object, siteMap);
        }

        [Fact]
        public void SiteMapBase_operator_should_return_correct_site_map()
        {
            SiteMapBase siteMap = _builder;

            Assert.Same(_siteMap.Object, siteMap);
        }

        [Fact]
        public void Should_be_able_to_set_cache_duration_in_minutes()
        {
            _builder.CacheDurationInMinutes(10);

            Assert.Equal(10, _siteMap.Object.CacheDurationInMinutes);
        }

        [Fact]
        public void Should_be_able_to_set_compress()
        {
            _builder.Compress(false);

            Assert.False(_siteMap.Object.Compress);
        }

        [Fact]
        public void Should_be_able_to_set_generate_search_engine_map()
        {
            _builder.GenerateSearchEngineMap(false);

            Assert.False(_siteMap.Object.GenerateSearchEngineMap);
        }
    }
}