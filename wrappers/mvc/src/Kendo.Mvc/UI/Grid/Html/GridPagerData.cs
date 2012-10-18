namespace Kendo.Mvc.UI.Html
{
    using System;

    public class GridPagerData
    {
        public PageableMessages Messages { get; set; }

        public int Page { get; set; }

        public int TotalPages { get; set; }

        public int Total { get; set; }

        public IGridUrlBuilder UrlBuilder { get; set; }

        public int Colspan { get; set; }

        public int PageSize { get; set; }

        public bool Numeric { get; set; }

        public bool Info { get; set; }

        public bool Input { get; set; }

        public bool Refresh { get; set; }

        public bool PreviousNext { get; set; }

        public int[] PageSizes { get; set; }

        public bool IsInClientTemplate { get; set; }

        public int ButtonCount { get; set; }
    }
}