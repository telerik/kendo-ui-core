
namespace KendoUI.Mvc.Infrastructure
{
    using System.Collections.Generic;
    
    public interface IWebAssetExtensions
    {
        IEnumerable<string> JavaScript
        {
            get;
        }
        
        IEnumerable<string> Css
        {
            get;
        }
    }
}
