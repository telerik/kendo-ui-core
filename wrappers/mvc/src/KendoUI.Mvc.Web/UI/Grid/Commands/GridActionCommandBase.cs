// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Routing;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI.Html;

    public abstract class GridActionCommandBase : IGridActionCommand
    {
        public virtual string Name
        {
            get;
            set;
        }

        public GridButtonType ButtonType
        {
            get;
            set;
        }

        public string Text
        {
            get;
            set;
        }

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }

        public IDictionary<string, object> ImageHtmlAttributes
        {
            get;
            set;
        }

        public GridActionCommandBase()
        {
            ButtonType = GridButtonType.Text;
            HtmlAttributes = new RouteValueDictionary();
            ImageHtmlAttributes = new RouteValueDictionary();
        }

        public virtual IDictionary<string, object> Serialize(IGridUrlBuilder urlBuilder)
        {
            var command = new Dictionary<string, object>();

            FluentDictionary.For(command)
                .Add("name", Name)
                .Add("attr", HtmlAttributes.ToAttributeString(), HtmlAttributes.Any)
                .Add("buttonType", ButtonType.ToString())
                .Add("text", Text, Text.HasValue)
                .Add("imageAttr", ImageHtmlAttributes.ToAttributeString(), ImageHtmlAttributes.Any);

            return command;
        }

        protected T CreateButton<T>(string text, string @class) where T : IGridButtonBuilder, new()
        {
            var factory = new GridButtonFactory();
            var button = factory.CreateButton<T>(ButtonType);

            button.Text = text;
            button.HtmlAttributes = HtmlAttributes;
            button.ImageHtmlAttributes = ImageHtmlAttributes;
            button.CssClass += " " + @class;

            return button;
        }

        public abstract IEnumerable<IGridButtonBuilder> CreateDisplayButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper);

        public virtual IEnumerable<IGridButtonBuilder> CreateEditButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            return new IGridButtonBuilder[0];
        }        
        
        public virtual IEnumerable<IGridButtonBuilder> CreateInsertButtons(IGridLocalization localization, IGridUrlBuilder urlBuilder, IGridHtmlHelper htmlHelper)
        {
            return new IGridButtonBuilder[0];
        }
    }
}