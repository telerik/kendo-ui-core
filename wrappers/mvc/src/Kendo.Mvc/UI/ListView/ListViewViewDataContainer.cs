namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    class ListViewViewDataContainer<T> : IViewDataContainer where T : class
    {
        public ListViewViewDataContainer(T model, ViewDataDictionary viewData)
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
