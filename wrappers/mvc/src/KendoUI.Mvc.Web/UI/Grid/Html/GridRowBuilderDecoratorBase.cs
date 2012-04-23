// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public abstract class GridRowBuilderDecoratorBase : IGridRowBuilderDecorator
    {
        protected IGridRowBuilder DecoratedRowBuilder
        {
            get; 
            private set;
        }

        protected GridItem CurrentGridItem
        {
            get; 
            private set;
        }

        public bool HasDetailView
        {
            get; 
            private set;
        }

        public void Decorate(IGridRowBuilder rowBuilder, GridItem gridItem, bool hasDetailView)
        {
            CurrentGridItem = gridItem;
            DecoratedRowBuilder = rowBuilder;
            HasDetailView = hasDetailView;
        }

        public abstract bool ShouldDecorate(GridItem gridItem);

        public IHtmlNode CreateRow()
        {
            var htmlNode = DecoratedRowBuilder.CreateRow();

            if (htmlNode == null)
            {
                return new HtmlFragment();
            }

            if (ShouldDecorate(CurrentGridItem))
            {
                ApplyDecoration(htmlNode);
            }
            return htmlNode;
        }

        protected abstract void ApplyDecoration(IHtmlNode htmlNode);
    }
}