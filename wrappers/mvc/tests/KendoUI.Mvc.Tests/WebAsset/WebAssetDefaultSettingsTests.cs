// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using Xunit;

    public class WebAssetDefaultSettingsTests
    {
        [Fact]
        public void Should_be_able_to_set_stylesheet_files_path()
        {
            WebAssetDefaultSettings.StyleSheetFilesPath = "~/assets/stylesheets";

            Assert.Equal("~/assets/stylesheets", WebAssetDefaultSettings.StyleSheetFilesPath);

            WebAssetDefaultSettings.StyleSheetFilesPath = "~/Content";
        }

        [Fact]
        public void Should_be_able_to_set_script_files_path()
        {
            WebAssetDefaultSettings.ScriptFilesPath = "~/assets/scripts";

            Assert.Equal("~/assets/scripts", WebAssetDefaultSettings.ScriptFilesPath);

            WebAssetDefaultSettings.ScriptFilesPath = "~/Scripts";
        }

        [Fact]
        public void Should_be_able_to_set_version()
        {
            WebAssetDefaultSettings.Version = "1.0";

            Assert.Equal("1.0", WebAssetDefaultSettings.Version);

            WebAssetDefaultSettings.Version = typeof(WebAssetDefaultSettings).Assembly.GetName().Version.ToString();
        }

        [Fact]
        public void Should_be_able_to_set_compress()
        {
            WebAssetDefaultSettings.Compress = false;

            Assert.False(WebAssetDefaultSettings.Compress);

            WebAssetDefaultSettings.Compress = true;
        }

        [Fact]
        public void Should_be_able_to_set_cache_duration_in_days()
        {
            WebAssetDefaultSettings.CacheDurationInDays = 7;

            Assert.Equal(7, WebAssetDefaultSettings.CacheDurationInDays);

            WebAssetDefaultSettings.CacheDurationInDays = 365;
        }
    }
}