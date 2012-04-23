// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridButtonBuilder : GridButtonBuilderBase
    {
        public bool ShouldAppendDataKeys 
        { 
            get; 
            set; 
        }

        public override IHtmlNode Create(object dataItem)
        {
            var fragment = new HtmlFragment();

            if (ShouldAppendDataKeys)
            {
                AppendDataKeys(fragment, dataItem);
            }

            var button = base.Create(dataItem);

            button.AppendTo(fragment);

            return fragment;
        }

        protected override void ApplyButtonAttributes(IHtmlNode button, object dataItem)
        {
            button.Attribute("type", "submit");
        }

        protected override string ButtonTagName
        {
            get
            {
                return "button";
            }
        }

        public IGridHtmlHelper HtmlHelper
        {
            get;
            set;
    
        }

        protected void AppendDataKeys(IHtmlNode container, object dataItem)
        {
            var hidden = HtmlHelper.HiddenForDataKey(dataItem);
            hidden.AppendTo(container);
        }
    }
}