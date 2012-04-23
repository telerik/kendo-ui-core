// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Telerik.Web.Mvc;
    using Xunit;

    public class WebAssetGroupTests
    {
        private readonly WebAssetGroup group;

        public WebAssetGroupTests()
        {
            group = new WebAssetGroup("Dummy", false) { DefaultPath = WebAssetDefaultSettings.ScriptFilesPath };
        }

        [Fact]
        public void Name_should_be_same_which_is_passed_in_constructor()
        {
            Assert.Equal("Dummy", group.Name);
        }

        [Fact]
        public void DefaultPath_should_be_same_which_is_passed_in_constructor()
        {
            Assert.Equal(WebAssetDefaultSettings.ScriptFilesPath, group.DefaultPath);
        }

        [Fact]
        public void Version_should_be_same_as_default_asset_version_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetDefaultSettings.Version, group.Version);
        }

        [Fact]
        public void Compress_should_be_same_as_default_asset_compress_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetDefaultSettings.Compress, group.Compress);
        }

        [Fact]
        public void CacheDurationInDays_should_be_same_as_default_asset_cache_duration_in_days_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetDefaultSettings.CacheDurationInDays, group.CacheDurationInDays);
        }

        [Fact]
        public void Combine_should_be_same_as_default_asset_combine_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetDefaultSettings.Combined, group.Combined);
        }

        [Fact]
        public void Items_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(group.Items);
        }

        [Fact]
        public void Should_be_able_to_set_version()
        {
            group.Version = "1.0";

            Assert.Equal("1.0", group.Version);
        }

        [Fact]
        public void Should_be_able_to_set_cache_duation_in_days()
        {
            group.CacheDurationInDays = 7;

            Assert.Equal(7, group.CacheDurationInDays);
        }

        [Fact]
        public void Should_be_able_to_insert_item()
        {
            group.Items.Insert(0, new WebAsset("~/scripts/script.js"));

            Assert.NotEmpty(group.Items);
        }

        [Fact]
        public void Should_be_able_to_set_item()
        {
            group.Items.Add(new WebAsset("~/scripts/script.js"));
            group.Items[0] = new WebAsset("~/scripts/script1.js");

            Assert.Equal("~/scripts/script1.js", group.Items[0].Source);
        }

        [Fact]
        public void Should_not_be_able_to_add_duplicate_item()
        {
            group.Items.Add(new WebAsset("~/scripts/script.js"));
            group.Items.Add(new WebAsset("~/scripts/script.js"));

            Assert.Equal(1, group.Items.Count);
        }

        [Fact]
        public void Setting_duplicate_item_should_throw_exception()
        {
            group.Items.Add(new WebAsset("~/scripts/script.js"));
            group.Items.Add(new WebAsset("~/scripts/script2.js"));

            Assert.Throws<ArgumentException>(() => group.Items[1] = new WebAsset("~/scripts/script.js"));
        }

    }
}