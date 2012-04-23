// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using Moq;
    using Xunit;

    public class SiteMapBaseTests
    {
        private readonly Mock<SiteMapBase> _siteMap;

        public SiteMapBaseTests()
        {
            _siteMap = new Mock<SiteMapBase>();
        }

        [Fact]
        public void Should_Be_able_to_set_default_cache_duration()
        {
            SiteMapBase.DefaultCacheDurationInMinutes = 90;

            Assert.Equal(90, SiteMapBase.DefaultCacheDurationInMinutes);

            SiteMapBase.DefaultCacheDurationInMinutes = 60;
        }

        [Fact]
        public void Should_Be_able_to_set_default_compress()
        {
            SiteMapBase.DefaultCompress = false;

            Assert.False(SiteMapBase.DefaultCompress);

            SiteMapBase.DefaultCompress = true;
        }

        [Fact]
        public void Should_Be_able_to_set_default_generate_search_engine_map()
        {
            SiteMapBase.DefaultGenerateSearchEngineMap = false;

            Assert.False(SiteMapBase.DefaultGenerateSearchEngineMap);

            SiteMapBase.DefaultGenerateSearchEngineMap = true;
        }

        [Fact]
        public void RootNode_should_not_be_null_when_new_instance_is_created()
        {
            Assert.NotNull(_siteMap.Object.RootNode);
        }

        [Fact]
        public void CacheDurationInMinutes_should_be_default_cache_duration_In_minutes_when_new_instance_is_created()
        {
            Assert.Equal(SiteMapBase.DefaultCacheDurationInMinutes, _siteMap.Object.CacheDurationInMinutes);
        }

        [Fact]
        public void Compress_should_be_default_compress_when_new_instance_is_created()
        {
            Assert.Equal(SiteMapBase.DefaultCompress, _siteMap.Object.Compress);
        }

        [Fact]
        public void GenerateSearchEngineMap_should_be_default_generate_search_engine_map_when_new_instance_is_created()
        {
            Assert.Equal(SiteMapBase.DefaultGenerateSearchEngineMap, _siteMap.Object.GenerateSearchEngineMap);
        }

        [Fact]
        public void ToBuilder_should_return_new_builder()
        {
            SiteMapBuilder builder = _siteMap.Object;

            Assert.NotNull(builder);
        }

        [Fact]
        public void RadSiteMapBuilder_operator_should_return_correct_builder()
        {
            SiteMapBuilder builder = _siteMap.Object;

            Assert.NotNull(builder);
        }

        [Fact]
        public void Reset_should_revert_to_default_values()
        {
            SiteMapBase siteMap = new SiteMapBaseTestDouble
                                      {
                                          CacheDurationInMinutes = 120,
                                          Compress = false,
                                          GenerateSearchEngineMap = false
                                      };

            siteMap.Reset();

            Assert.Equal(SiteMapBase.DefaultCacheDurationInMinutes, siteMap.CacheDurationInMinutes);
            Assert.Equal(SiteMapBase.DefaultCompress, siteMap.Compress);
            Assert.Equal(SiteMapBase.DefaultGenerateSearchEngineMap, siteMap.GenerateSearchEngineMap);
            Assert.NotNull(siteMap.RootNode);
        }
    }

    public class SiteMapBaseTestDouble : SiteMapBase
    {
    }
}