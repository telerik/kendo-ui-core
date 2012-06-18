namespace Kendo.Mvc.UI.Html
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
            var container = new HtmlFragment();

            AppendFirstPrevButtons(container, section.UrlBuilder, section);
            AppendNumericSection(container, section.UrlBuilder, section);
            AppendPageInput(container, section);
            AppendNextLast(container, section.UrlBuilder, section);
            AppendPageSizeDropDown(container, section);

            return container;
        }

        private void AppendPageInput(IHtmlNode container, GridPagerData section)
        {
            if (section.Input)
            {
                inputSectionBuilder.Create(section).AppendTo(container);
            }
        }

        private void AppendPageSizeDropDown(IHtmlNode container, GridPagerData section)
        {
            if (section.PageSizes != null)
            {
                gridPagerPageSizeSection.Create(section).AppendTo(container);
            }
        }

        private void AppendNextLast(IHtmlNode container,
                                    IGridUrlBuilder urlBuilder, GridPagerData section)
        {
            if (section.PreviousNext)
            {
                buttonFactory.CreateButton(GridPagerButtonType.Icon, section.Page < section.TotalPages,
                                           GetUrl(urlBuilder, section.Page + 1),
                                           "next", section.Page + 1)
                             .Attribute("title", section.Messages.Next)
                             .AppendTo(container);

                buttonFactory.CreateButton(GridPagerButtonType.Icon, section.Page < section.TotalPages,
                                           GetUrl(urlBuilder, section.TotalPages), "last", section.TotalPages)
                             .Attribute("title", section.Messages.Last)
                             .AppendTo(container);
            }
        }

        private void AppendNumericSection(IHtmlNode container, IGridUrlBuilder urlBuilder, GridPagerData section)
        {
            if (section.Numeric)
            {
                numericSectionBuilder.Create(urlBuilder, section.Page, section.TotalPages)
                                     .AppendTo(container);
            }
        }

        private void AppendFirstPrevButtons(IHtmlNode container, IGridUrlBuilder urlBuilder, GridPagerData section)
        {
            if (section.PreviousNext)
            {
                buttonFactory.CreateButton(GridPagerButtonType.Icon, section.Page > 1,
                                           GetUrl(urlBuilder, 1), "first", 1)
                             .Attribute("title", section.Messages.First)
                             .AppendTo(container);

                buttonFactory.CreateButton(GridPagerButtonType.Icon, section.Page > 1,
                                           GetUrl(urlBuilder, section.Page - 1), "prev", section.Page - 1)
                             .Attribute("title", section.Messages.Previous)
                             .AppendTo(container);
            }
        }

        private string GetUrl(IGridUrlBuilder urlBuilder, int page)
        {
            return urlBuilder.SelectUrl(GridUrlParameters.Page, page);
        }
    }
}