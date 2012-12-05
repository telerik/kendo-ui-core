namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    
    public class GridToolBarSaveCommand<T> : GridToolBarCommandBase<T> where T : class
    {
        public GridToolBarSaveCommand()
        {
            CancelText = Messages.Grid_CancelChanges;
            SaveText = Messages.Grid_SaveChanges;
        }

        public string SaveText
        {
            get;
            set;
        }

        public string CancelText
        {
            get;
            set;
        }

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            
            var save = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            save.CssClass += " " + UIPrimitives.Grid.SaveChanges;
            save.SpriteCssClass = "k-update";
            save.Text = SaveText;           
            save.HtmlAttributes = HtmlAttributes;

            //TODO: Implement command button image html attributes
            //save.ImageHtmlAttributes = ImageHtmlAttributes;           
            save.Url = delegate { return "javascript:void(0)"; };

            var cancel = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            cancel.CssClass += " " + UIPrimitives.Grid.CancelChanges;
            cancel.SpriteCssClass = "k-cancel";
            cancel.Text = CancelText;            
            cancel.HtmlAttributes = HtmlAttributes;

            //TODO: Implement command button image html attributes
            //cancel.ImageHtmlAttributes = ImageHtmlAttributes;
            cancel.Url = delegate { return "javascript:void(0)"; };

            return new[] { save, cancel };
        }
    }
}
