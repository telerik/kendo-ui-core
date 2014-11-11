namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    class TreeListViewDataContainer<T> : IViewDataContainer where T : class
    {
        public TreeListViewDataContainer(T model, ViewDataDictionary viewData)
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
