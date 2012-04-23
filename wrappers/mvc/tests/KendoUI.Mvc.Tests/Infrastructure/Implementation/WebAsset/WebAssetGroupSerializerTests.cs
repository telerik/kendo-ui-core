namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Telerik.Web.Mvc.Extensions;
    using Xunit;
    
    public class WebAssetGroupSerializerTests
    {
        WebAssetGroupSerializer serializer;

        public WebAssetGroupSerializerTests()
        {
            serializer = new WebAssetGroupSerializer();
        }

        [Fact]
        public void Serialize_returns_base64_gzipped_string()
        {
            var group = new WebAssetGroup("foo", false);
            group.Version = "1";
            group.ContentType = "text/css";

            var result = serializer.Serialize(group);

            Assert.Equal("{\"d\":[],\"ct\":\"text/css\",\"v\":\"1\",\"cd\":365,\"c\":true}", WebAssetGroupSerializer.Decode(result).Decompress());
        }

        [Fact]
        public void Deserialize_returns_properly_initialized_web_asset_item_group()
        {
            var compressedJson = "{\"d\":[],\"ct\":\"text/css\",\"v\":\"1\",\"cd\":365,\"c\":true}".Compress();
            
            var result = serializer.Deserialize(WebAssetGroupSerializer.Encode(compressedJson));

            Assert.Equal("text/css", result.ContentType);
            Assert.Equal("1", result.Version);
            Assert.Equal(365, result.CacheDurationInDays);
        }
    }
}