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

        PageableSettings Pageable
        {
            get;        
        }

        bool Navigatable
        {
            get;
        }

        ListViewSelectionSettings Selectable
        {
            get;
        }

        string EditorHtml
        {
            get;
        }

        IListViewEditingSettings Editable
        {
            get;
        }
    }
}
