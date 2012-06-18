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
            //TODO: Implement command button html attributes
            //save.HtmlAttributes = HtmlAttributes;
            //save.ImageHtmlAttributes = ImageHtmlAttributes;
            save.Url = delegate { return "#"; };

            var cancel = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            cancel.CssClass += " " + UIPrimitives.Grid.CancelChanges;
            cancel.SpriteCssClass = "k-cancel";
            cancel.Text = CancelText;
            //TODO: Implement command button html attributes
            //cancel.HtmlAttributes = HtmlAttributes;
            //cancel.ImageHtmlAttributes = ImageHtmlAttributes;
            cancel.Url = delegate { return "#"; };

            return new[] { save, cancel };
        }
    }
}
