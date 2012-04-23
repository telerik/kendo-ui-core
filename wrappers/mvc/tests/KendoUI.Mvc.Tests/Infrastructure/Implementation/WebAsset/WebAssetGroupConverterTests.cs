namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Script.Serialization;
    using Xunit;

    public class WebAssetGroupConverterTests
    {
        private readonly WebAssetGroupConverter converter;
        
        public WebAssetGroupConverterTests()
        {
            converter = new WebAssetGroupConverter();
        }

        [Fact]
        public void Serialize_contains_entry_for_web_asset_item_directories()
        {
            var group = new WebAssetGroup("foo", false);
            group.Items.Add(new WebAsset("~/Scripts/foo.js"));

            var directories = converter.Serialize(group, new JavaScriptSerializer())["d"] as IEnumerable<IDictionary<string, object>>;

            Assert.True(directories.Any());
        }

        [Fact]
        public void Serialize_contains_entry_for_unique_web_asset_item_directories_and_ignores_case()
        {
            var group = new WebAssetGroup("foo", false);
            group.Items.Add(new WebAsset("~/Scripts/foo.js"));
            group.Items.Add(new WebAsset("~/scripts/bar.js"));

            var directories = converter.Serialize(group, new JavaScriptSerializer())["d"] as IEnumerable<IDictionary<string, object>>;

            Assert.Equal(1, directories.Count());
        }

        [Fact]
        public void Serialize_should_return_path_of_folders()
        {
            var group = new WebAssetGroup("foo", false);
            group.Items.Add(new WebAsset("~/Scripts/foo.js"));

            var directories = converter.Serialize(group, new JavaScriptSerializer())["d"] as IEnumerable<IDictionary<string, object>>;

            Assert.Equal("Scripts", directories.First()["p"]);
        }

        [Fact]
        public void Serialize_should_return_files_in_folders()
        {
            var group = new WebAssetGroup("foo", false);
            group.Items.Add(new WebAsset("~/Scripts/foo.js"));

            var directories = converter.Serialize(group, new JavaScriptSerializer())["d"] as IEnumerable<IDictionary<string, object>>;
            var files = directories.First()["f"] as IEnumerable<IDictionary<string, object>>;
            Assert.Equal("foo.js", files.First()["n"]);
        }

        [Fact]
        public void Serialize_should_return_order_of_files()
        {
            var group = new WebAssetGroup("foo", false);
            group.Items.Add(new WebAsset("~/Scripts1/foo.js"));
            group.Items.Add(new WebAsset("~/Scripts2/foo.js"));

            var directories = converter.Serialize(group, new JavaScriptSerializer())["d"] as IEnumerable<IDictionary<string, object>>;
            var firstDirectory = directories.First()["f"] as IEnumerable<IDictionary<string, object>>;
            var secondDirectory = directories.Last()["f"] as IEnumerable<IDictionary<string, object>>;
            Assert.Equal(0, firstDirectory.First()["o"]);
            Assert.Equal(1, secondDirectory.First()["o"]);
        }

        [Fact]
        public void Serialize_should_contain_group_content_type()
        {
            var group = new WebAssetGroup("foo", false);
            group.ContentType = "text/javascript";

            var result = converter.Serialize(group, new JavaScriptSerializer());
            Assert.Equal(group.ContentType, result["ct"]);
        }

        [Fact]
        public void Serialize_should_contain_group_version()
        {
            var group = new WebAssetGroup("foo", false);
            group.Version = "1";

            var result = converter.Serialize(group, new JavaScriptSerializer());
            Assert.Equal(group.Version, result["v"]);
        }

        [Fact]
        public void Serialize_should_contain_group_cache_duration()
        {
            var group = new WebAssetGroup("foo", false);
            group.CacheDurationInDays = 1;

            var result = converter.Serialize(group, new JavaScriptSerializer());
            Assert.Equal(group.CacheDurationInDays, result["cd"]);
        }

        [Fact]
        public void Serialize_should_contain_group_compression()
        {
            var group = new WebAssetGroup("foo", false);
            group.Compress = true;

            var result = converter.Serialize(group, new JavaScriptSerializer());
            Assert.Equal(group.Compress, result["c"]);
        }

        [Fact]
        public void Deserialize_initializes_compressed()
        {
            var dictionary = new Dictionary<string, object> { {"c", false }};

            var group = converter.Deserialize(dictionary, null, new JavaScriptSerializer()) as WebAssetGroup;

            Assert.False(group.Compress);
        }        
        
        [Fact]
        public void Deserialize_initializes_cacheduration()
        {
            var dictionary = new Dictionary<string, object> { {"cd", 42 }};

            var group = converter.Deserialize(dictionary, null, new JavaScriptSerializer()) as WebAssetGroup;

            Assert.Equal(42, group.CacheDurationInDays);
        }        
        
        [Fact]
        public void Deserialize_initializes_version()
        {
            var dictionary = new Dictionary<string, object> { {"v", "1" }};

            var group = converter.Deserialize(dictionary, null, new JavaScriptSerializer()) as WebAssetGroup;

            Assert.Equal("1", group.Version);
        }        
        
        [Fact]
        public void Deserialize_initializes_contenttype()
        {
            var dictionary = new Dictionary<string, object> { {"ct", "text/javascript" }};

            var group = converter.Deserialize(dictionary, null, new JavaScriptSerializer()) as WebAssetGroup;

            Assert.Equal("text/javascript", group.ContentType);
        }        
        
        [Fact]
        public void Deserialize_orders_files()
        {
            var firstSetOfFiles = new[] { new Dictionary<string, object> { { "n", "second.js" }, {"o", 1} } };
            var secondSetOfFiles = new[] { new Dictionary<string, object> { { "n", "first.js" }, {"o", 0} } };

            var directories = new[] { new Dictionary<string, object> { { "p", "Scripts1" }, { "f", firstSetOfFiles } }, new Dictionary<string, object> { { "p", "Scripts2" }, { "f", secondSetOfFiles } } };

            var dictionary = new Dictionary<string, object> { { "d", directories } };

            var group = converter.Deserialize(dictionary, null, new JavaScriptSerializer()) as WebAssetGroup;
            
            Assert.Equal(2, group.Items.Count);
            Assert.Equal("~/Scripts2/first.js", group.Items[0].Source);
            Assert.Equal("~/Scripts1/second.js", group.Items[1].Source);
        }
    }
}
