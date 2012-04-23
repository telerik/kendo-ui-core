// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;
    
    internal class DebugWebAssetExtensions : IWebAssetExtensions
    {
        public IEnumerable<string> JavaScript
        {
            get
            {
                return WebAssetDefaultSettings.DebugJavaScriptExtensions;
            }
        }
        
        public IEnumerable<string> Css
        {
            get
            {
                return WebAssetDefaultSettings.DebugCssExtensions;
            }
        }
    }
}
