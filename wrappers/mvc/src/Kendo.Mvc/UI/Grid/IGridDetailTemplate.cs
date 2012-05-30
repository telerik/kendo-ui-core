namespace Kendo.Mvc.UI
{
    public interface IGridDetailTemplate<TModel> 
        where TModel : class
    {
        HtmlTemplate<TModel> Template
        {
            get;
        }
        
        string ClientTemplate
        {
            get;
            set;
        }
    }
}
