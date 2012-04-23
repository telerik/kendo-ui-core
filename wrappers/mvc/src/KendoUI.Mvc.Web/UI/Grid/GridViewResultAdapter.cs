

namespace KendoUI.Mvc.UI
{
    using System.Collections;
    using System.Web.Mvc;
    
    class GridViewResultAdapter : IGridActionResultAdapter
    {
        private readonly ModelStateDictionary modelState;
        private readonly IGridModel model;

        public GridViewResultAdapter(ViewResultBase viewResult)
        {
            var viewData = viewResult.ViewData;
            modelState = viewData.ModelState;
            model = viewData.Model as IGridModel ?? new GridModel();
        }

        public IEnumerable GetDataSource()
        {
            return model.Data;
        }
        
        public int GetTotal()
        {
            return model.Total;
        }

        public object GetAggregates()
        {
            return model.Aggregates;
        }

        public ModelStateDictionary GetModelState()
        {
            return modelState;
        }
    }
}
