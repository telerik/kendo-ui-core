namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    
    class GridViewDataContainer<T> : IViewDataContainer
        where T : class
    {
        public GridViewDataContainer(T model, ViewDataDictionary viewData)
        {
            ViewData = viewData;
            ViewData.Model = model;
        }
        
        public ViewDataDictionary ViewData
        {
            get;
            set;
        }
    }

    class GridViewDataContainer : IViewDataContainer
    {
        public ViewDataDictionary ViewData
        {
            get;
            set;
        }
    }
}
