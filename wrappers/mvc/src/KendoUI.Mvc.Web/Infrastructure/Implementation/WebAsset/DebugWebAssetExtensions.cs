

namespace KendoUI.Mvc.Infrastructure.Implementation
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
