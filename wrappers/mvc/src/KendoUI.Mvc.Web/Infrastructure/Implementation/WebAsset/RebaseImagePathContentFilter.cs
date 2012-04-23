// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Text.RegularExpressions;
    using Telerik.Web.Mvc.Extensions;

    internal class RebaseImagePathContentFilter : IWebAssetContentFilter
    {
        private readonly IVirtualPathProvider provider;
        private readonly IUrlResolver resolver;

        private static readonly Regex urlRegex = new Regex(@"url\s*\((\""|\')?(?<url>[^)]+)?(\""|\')?\)",
            RegexOptions.Compiled | RegexOptions.Singleline | RegexOptions.CultureInvariant);

        public RebaseImagePathContentFilter(IVirtualPathProvider provider, IUrlResolver resolver)
        {
            this.provider = provider;
            this.resolver = resolver;
        }

        public bool AppliesTo(string contentType)
        {
            return contentType == "text/css";
        }

        public string Filter(string basePath, string content)
        {
            content = urlRegex.Replace(content, match =>
            {
                string url = match.Groups["url"].Value.Trim("'\"".ToCharArray());

                if (url.HasValue()
                    && !url.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
                    && !url.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
                    && !url.StartsWith("data:", StringComparison.OrdinalIgnoreCase))
                {
                    url = provider.CombinePaths(basePath, url);

                    return "url('{0}')".FormatWith(resolver.Resolve(url));
                }

                return "url('{0}')".FormatWith(url);
            });

            return content;
        }
    }
}
