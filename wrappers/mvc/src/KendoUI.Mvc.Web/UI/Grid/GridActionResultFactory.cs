

namespace KendoUI.Mvc.UI
{
    using System.Web.Mvc;
    
    class GridActionResultFactory : IGridActionResultFactory
    {
        public ActionResult Create(object model)
        {
            return new JsonResult
            {
                Data = model
            };
        }
    }
}