namespace Telerik.Web.Mvc.UI.Html
{
    using Infrastructure;

    class GridPagerNumericSectionBuilder : IGridPagerNumericSectionBuilder
    {
        private const int NumericLinkSize = 10;
        private readonly IGridPagerButtonFactory buttonFactory;

        public GridPagerNumericSectionBuilder(IGridPagerButtonFactory buttonFactory)
        {
            this.buttonFactory = buttonFactory;
        }

        public IHtmlNode Create(IGridUrlBuilder urlBuilder, int currentPage, int pageCount)
        {
            var numericDiv = new HtmlElement("div").AddClass("t-numeric");

            AppendContent(urlBuilder, numericDiv, pageCount, currentPage);

            return numericDiv;
        }

        private void AppendContent(IGridUrlBuilder urlBuilder, IHtmlNode numericDiv, int pageCount, int currentPage)
        {
            var numericStart = CalculateStartIndex(currentPage);
            var numericEnd = CalculateEndIndex(numericStart, pageCount);

            AppendPrevButtonsLink(numericStart, numericDiv, urlBuilder);

            AppendNumericButtons(urlBuilder, currentPage, numericStart, numericDiv, numericEnd);

            AppendNextButtonsLink(pageCount, numericDiv, numericEnd, urlBuilder);
        }

        private void AppendNumericButtons(IGridUrlBuilder urlBuilder, int currentPage, int numericStart, IHtmlNode numericDiv, int numericEnd)
        {
            for (var page = numericStart; page <= numericEnd; page++)
            {
                buttonFactory.CreateButton(GridPagerButtonType.NumericLink, page.ToString(), page != currentPage,
                                           GetUrl(urlBuilder, page)).AppendTo(numericDiv);
            }
        }

        private void AppendNextButtonsLink(int pageCount, IHtmlNode numericDiv, int numericEnd, IGridUrlBuilder urlBuilder)
        {
            if (numericEnd < pageCount)
            {
                buttonFactory.CreateButton(GridPagerButtonType.NumericLink, "...", true,
                                           GetUrl(urlBuilder, numericEnd + 1)).AppendTo(numericDiv);
            }
        }

        private void AppendPrevButtonsLink(int numericStart, IHtmlNode numericDiv, IGridUrlBuilder urlBuilder)
        {
            if (numericStart > 1)
            {
                buttonFactory.CreateButton(GridPagerButtonType.NumericLink, "...", true,
                                           GetUrl(urlBuilder, numericStart - 1)).AppendTo(numericDiv);
            }
        }

        private string GetUrl(IGridUrlBuilder urlBuilder, int pageIndex)
        {
            return urlBuilder.SelectUrl(GridUrlParameters.CurrentPage, pageIndex);
        }

        private int CalculateEndIndex(int numericStart, int pageCount)
        {
            var numericEnd = (numericStart + NumericLinkSize) - 1;

            if (numericEnd > pageCount)
            {
                numericEnd = pageCount;
            }
            return numericEnd;
        }

        private int CalculateStartIndex(int currentPage)
        {
            var numericStart = 1;

            if (currentPage > NumericLinkSize)
            {
                var reminder = (currentPage%NumericLinkSize);

                numericStart = (reminder == 0)
                                   ? (currentPage - NumericLinkSize) + 1
                                   : (currentPage - reminder) + 1;
            }
            return numericStart;
        }
    }
}