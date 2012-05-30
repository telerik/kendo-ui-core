namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IGridColumnContainer<T> where T : class
    {
        IList<GridColumnBase<T>> Columns
        {
            get;
        }
    }
}