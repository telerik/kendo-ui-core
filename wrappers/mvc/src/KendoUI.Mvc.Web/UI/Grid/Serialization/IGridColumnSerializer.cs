
namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    
    public interface IGridColumnSerializer
    {
        IDictionary<string, object> Serialize();
    }
}
