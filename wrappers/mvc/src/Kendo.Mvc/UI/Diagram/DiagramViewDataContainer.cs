namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    class DiagramViewDataContainer<T> : IViewDataContainer where T : class
    {
        public DiagramViewDataContainer(T model, ViewDataDictionary viewData)
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
}
