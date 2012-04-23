// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Text;

    internal class WebAssetGroupReader : IWebAssetGroupReader
    {
        private readonly IWebAssetLocator locator;
        private readonly IVirtualPathProvider provider;
        private readonly IWebAssetContentFilter filter;

        public WebAssetGroupReader(IWebAssetLocator locator, IVirtualPathProvider provider, IWebAssetContentFilter filter)
        {
            this.locator = locator;
            this.provider = provider;
            this.filter = filter;
        }

        public string Read(WebAssetGroup group)
        {
            var appliesTo = filter.AppliesTo(group.ContentType);

            var result = new StringBuilder();

            foreach (var asset in group.Items)
            {
                var path = locator.Locate(asset.Source, group.Version);

                var text = provider.ReadAllText(path);

                if (appliesTo)
                {
                    var basePath = provider.GetDirectory(path);

                    text = filter.Filter(basePath, text);
                }

                result.Append(text);
                result.AppendLine();
            }

            return result.ToString();
        }
    }
}
