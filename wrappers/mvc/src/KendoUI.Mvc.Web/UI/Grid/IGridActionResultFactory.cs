

namespace KendoUI.Mvc.UI
{
    using System.Web.Mvc;
    
    public interface IGridActionResultFactory
    {
        ActionResult Create(object model);
    }
}
