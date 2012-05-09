namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Web.Script.Serialization;
    using Kendo.Mvc.Extensions;

    internal class WebAssetGroupSerializer : IWebAssetGroupSerializer
    {
        public string Serialize(WebAssetGroup group)
        {
            var serializer = CreateSerializer();

            var json = serializer.Serialize(group);

            return Encode(json.Compress());
        }

        public static string Encode(string target)
        {
            return target.Replace("/", "_").Replace("+", "-");
        }

        public static string Decode(string target)
        {
            return target.Replace("-", "+").Replace("_", "/");
        }

        public WebAssetGroup Deserialize(string source)
        {
            var serializer = CreateSerializer();

            var json = Decode(source).Decompress();

            return serializer.Deserialize<WebAssetGroup>(json);
        }

        private JavaScriptSerializer CreateSerializer()
        {
            var serializer = new JavaScriptSerializer();
            serializer.RegisterConverters(new[] { new WebAssetGroupConverter() });
            return serializer;
        }
    }
}
