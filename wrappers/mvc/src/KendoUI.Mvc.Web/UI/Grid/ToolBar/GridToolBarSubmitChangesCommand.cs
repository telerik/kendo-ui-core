namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.UI.Html;
    
    public class GridToolBarSubmitChangesCommand<T> : GridToolBarCommandBase<T> where T : class
    {
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

        public override IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            var factory = new GridButtonFactory();
            
            var save = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            save.CssClass += " " + UIPrimitives.Grid.SaveChanges;
            save.SpriteCssClass = "t-update";
            save.Text = SaveText ?? localization.SaveChanges;
            save.HtmlAttributes = HtmlAttributes;
            save.ImageHtmlAttributes = ImageHtmlAttributes;
            save.Url = delegate { return "#"; };

            var cancel = factory.CreateButton<GridLinkButtonBuilder>(ButtonType);

            cancel.CssClass += " " + UIPrimitives.Grid.CancelChanges;
            cancel.SpriteCssClass = "t-cancel";
            cancel.Text = CancelText ?? localization.CancelChanges;
            cancel.HtmlAttributes = HtmlAttributes;
            cancel.ImageHtmlAttributes = ImageHtmlAttributes;
            cancel.Url = delegate { return "#"; };

            return new[] { save, cancel };
        }
    }
}
