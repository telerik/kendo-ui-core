// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Telerik.Web.Mvc.UI;

    internal class WebAssetChecker : IWebAssetChecker
    {
        private static readonly IEnumerable<Func<string, bool>> Predicates = new Func<string, bool>[]
        {
            source => source.Equals(ScriptRegistrar.jQuery, StringComparison.OrdinalIgnoreCase),
            source => source.Equals(ScriptRegistrar.jQueryValidation, StringComparison.OrdinalIgnoreCase),
            source => source.StartsWith("telerik.", StringComparison.OrdinalIgnoreCase)
        };

        public bool IsNative(WebAsset asset)
        {
            var fileName = Path.GetFileName(asset.Source);

            foreach (var predicate in Predicates)
            {
                if (predicate(fileName))
                {
                    return true;
                }
            }

            return false;
        }

        public bool IsAbsolute(WebAsset asset)
        {
            return asset.Source.Contains("//");
        }
    }
}
