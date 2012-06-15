namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;

    public interface IListView
    {
        IUrlGenerator UrlGenerator
        {
            get;
        }

        ViewContext ViewContext
        {
            get;
        }

        DataSource DataSource
        {
            get;
        }

        string TagName
        {
            get;
        }

        string ClientTemplateId
        {
            get;            
        }

        ListViewPagingSettings Paging
        {
            get;        
        }

        bool Navigatable
        {
            get;
        }

        ListViewSelectionSettings Selection
        {
            get;
        }

        string EditorHtml
        {
            get;
        }

        IListViewEditingSettings Editing
        {
            get;
        }
    }
}
