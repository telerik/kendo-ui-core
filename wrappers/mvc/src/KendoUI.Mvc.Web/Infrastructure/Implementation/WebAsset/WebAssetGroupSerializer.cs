// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Web.Script.Serialization;
    using Telerik.Web.Mvc.Extensions;

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
