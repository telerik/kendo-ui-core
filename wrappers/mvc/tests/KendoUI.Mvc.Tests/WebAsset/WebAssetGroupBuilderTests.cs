// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class WebAssetGroupBuilderTests
    {
        private readonly WebAssetGroup group;
        private readonly WebAssetGroupBuilder builder;

        public WebAssetGroupBuilderTests()
        {
            group = new WebAssetGroup("foo", false) { DefaultPath = WebAssetDefaultSettings.ScriptFilesPath };
            builder = new WebAssetGroupBuilder(group);
        }

        [Fact]
        public void ToGroup_should_return_internal_asset_item_group()
        {
            Assert.Same(group, builder.ToGroup());
        }

        [Fact]
        public void WebAssetItemGroup_operator_should_return_internal_asset_item_group()
        {
            WebAssetGroup assetItem = builder;

            Assert.Same(group, assetItem);
        }

        [Fact]
        public void Should_be_able_to_set_content_delivery_network_url()
        {
            builder.ContentDeliveryNetworkUrl("http://cdn.com");

            Assert.Equal("http://cdn.com", group.ContentDeliveryNetworkUrl);
        }

        [Fact]
        public void Should_be_able_to_set_disabled()
        {
            builder.Enabled(false);

            Assert.False(group.Enabled);
        }

        [Fact]
        public void Should_be_able_to_set_version()
        {
            builder.Version("2.0");

            Assert.Equal("2.0", group.Version);
        }

        [Fact]
        public void Should_be_able_to_set_compress()
        {
            builder.Compress(false);

            Assert.False(group.Compress);
        }

        [Fact]
        public void should_be_able_to_set_cache_duration_in_days()
        {
            builder.CacheDurationInDays(7);

            Assert.Equal(7, group.CacheDurationInDays);
        }

        [Fact]
        public void Should_be_able_to_set_combined()
        {
            builder.Combined(true);

            Assert.True(group.Combined);
        }

        [Fact]
        public void Should_be_able_to_set_default_path()
        {
            builder.DefaultPath("~/assets/scripts");

            Assert.Equal("~/assets/scripts", group.DefaultPath);
        }

        [Fact]
        public void Should_add_item_with_full_url()
        {
            builder.Add("http://www.example.com");
            Assert.Equal("http://www.example.com", group.Items[0].Source);
        }

        [Fact]
        public void Should_add_item_with_protocol_less_url()
        {
            builder.Add("//www.example.com");
            Assert.Equal("//www.example.com", group.Items[0].Source);
        }

        [Fact]
        public void Should_append_default_path()
        {
            builder.Add("script2.js");
            
            Assert.Equal("~/Scripts/script2.js", group.Items[0].Source);
        }

        [Fact]
        public void Should_not_append_path_if_starting_with_tilde()
        {
            builder.Add("~/location/script1.js");
            Assert.Equal("~/location/script1.js", group.Items[0].Source);
        }
    }
}