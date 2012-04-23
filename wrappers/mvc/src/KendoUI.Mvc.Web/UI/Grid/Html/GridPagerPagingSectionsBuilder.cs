// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    internal class GridPagerPagingSectionsBuilder : IGridPagerPagingSectionsBuilder
    {
        private readonly IGridPagerButtonFactory buttonFactory;
        private readonly IGridPagerNumericSectionBuilder numericSectionBuilder;
        private readonly IGridPagerInputBuilder inputSectionBuilder;
        private readonly IGridPagerPageSizeSection gridPagerPageSizeSection;

        public GridPagerPagingSectionsBuilder(IGridPagerButtonFactory buttonFactory,
            IGridPagerNumericSectionBuilder numericSectionBuilder,
            IGridPagerInputBuilder inputSectionBuilder, IGridPagerPageSizeSection pagerPageSizeSection)
        {
            this.buttonFactory = buttonFactory;
            this.numericSectionBuilder = numericSectionBuilder;
            this.inputSectionBuilder = inputSectionBuilder;
            gridPagerPageSizeSection = pagerPageSizeSection;
        }

        public IHtmlNode CreateSections(GridPagerData section)
        {
            var currentPage = section.CurrentPage;
            var pageCount = section.PageCount;

            var container = new HtmlFragment();
            var style = section.Style;

            AppendFirstPrevButtons(container, style, section.UrlBuilder, currentPage);
            AppendNumericSection(container, style, section.UrlBuilder, section.CurrentPage, section.PageCount);
            AppendPageSizeDropDown(container, style, section);
            AppendPageInput(container, style, section);
            AppendNextLast(container, style, section.UrlBuilder, currentPage, pageCount);
            return container;
        }

        private void AppendPageInput(IHtmlNode container, GridPagerStyles style, GridPagerData section)
        {
            if ((style & GridPagerStyles.PageInput) != GridPagerStyles.PageInput)
                return;

            inputSectionBuilder.Create(section).AppendTo(container);
        }

        private void AppendPageSizeDropDown(IHtmlNode container, GridPagerStyles style, GridPagerData section)
        {
            if ((style & GridPagerStyles.PageSizeDropDown) != GridPagerStyles.PageSizeDropDown)
                return;

            gridPagerPageSizeSection.Create(section).AppendTo(container);
        }

        private void AppendNextLast(IHtmlNode container, GridPagerStyles style, 
            IGridUrlBuilder urlBuilder, int currentPage, int pageCount)
        {
            if ((style & GridPagerStyles.NextPrevious) != GridPagerStyles.NextPrevious) 
                return;

            buttonFactory.CreateButton(GridPagerButtonType.Icon, "next", currentPage < pageCount,
                                       GetUrl(urlBuilder, currentPage + 1)).AppendTo(container);

            buttonFactory.CreateButton(GridPagerButtonType.Icon, "last", currentPage < pageCount,
                                       GetUrl(urlBuilder, pageCount)).AppendTo(container);
        }

        private void AppendNumericSection(IHtmlNode container, GridPagerStyles style, IGridUrlBuilder urlBuilder, int currentPage, int pageCount)
        {
            if ((style & GridPagerStyles.Numeric) == GridPagerStyles.Numeric)
            {
                numericSectionBuilder.Create(urlBuilder, currentPage, pageCount).AppendTo(container);    
            }
        }

        private void AppendFirstPrevButtons(IHtmlNode container, GridPagerStyles style, IGridUrlBuilder urlBuilder, int currentPage)
        {
            if ((style & GridPagerStyles.NextPrevious) != GridPagerStyles.NextPrevious) 
                return;

            buttonFactory.CreateButton(GridPagerButtonType.Icon, "first", currentPage > 1,
                                       GetUrl(urlBuilder, 1)).AppendTo(container);

            buttonFactory.CreateButton(GridPagerButtonType.Icon, "prev", currentPage > 1,
                                       GetUrl(urlBuilder, currentPage - 1)).AppendTo(container);
        }

        private string GetUrl(IGridUrlBuilder urlBuilder, int page)
        {
            return urlBuilder.SelectUrl(GridUrlParameters.CurrentPage, page);
        }
    }
}