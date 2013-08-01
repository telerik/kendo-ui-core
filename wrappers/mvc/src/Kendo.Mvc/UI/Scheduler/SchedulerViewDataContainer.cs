namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    class SchedulerViewDataContainer<T> : IViewDataContainer where T : class
    {
        public SchedulerViewDataContainer(T model, ViewDataDictionary viewData)
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
