namespace Kendo.Mvc.UI.Html
{
    using Infrastructure;
    using Kendo.Mvc.UI;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    
    public class GridRenderingData : IGridItemCreatorData
    {
        public IHtmlNode PopUpContainer
        {
            get;
            set;
        }

        public GridEditMode EditMode
        {
            get;
            set;
        }

        public GridInsertRowPosition InsertRowPosition
        {
            get;
            set;
        }

        public IGridLocalization Localization 
        { 
            get; 
            set; 
        }

        public IGridDataKeyStore DataKeyStore
        {
            get;
            set;
        }

        public IGridUrlBuilder UrlBuilder 
        { 
            get; 
            set; 
        }

        public IGridHtmlHelper HtmlHelper
        {
            get;
            set;
        }
        
        public IEnumerable DataSource
        {
            get;
            set;
        }

        public IEnumerable<IGridColumn> Columns
        {
            get;
            set;
        }

        public IEnumerable<string> GroupMembers
        {
            get;
            set;
        }

        public Action<object, IHtmlNode> DetailTemplate
        {
            get;
            set;
        }

        public Action<object, IHtmlNode> RowTemplate
        {
            get;
            set;
        }

        public Action<GridItem> Callback
        {
            get;
            set;
        }

        public int Colspan
        {
            get; 
            set;
        }

        public bool HasDetailTemplate
        {
            get;
            set;
        }

        public GridItemMode Mode
        {
            get;
            set;
        }

        public HtmlTemplate NoRecordsTemplate
        {
            get;
            set;
        }

        public string ScrollingHeight
        {
            get;
            set;
        }

        public bool ShowFooter
        {
            get;
            set;
        }

        public Func<object> CreateNewDataItem
        {
            get;
            set;
        }

        public bool ShowGroupFooter
        {
            get; 
            set;
        }

        public string FormId 
        { 
            get; 
            set; 
        }

        //TODO: Implement Edit form Html attributes
        //public IDictionary<string, object> EditFormHtmlAttributes
        //{
        //    get;
        //    set;
        //}

        public string EditTemplateName
        {
            get;
            set;
        }

        public object AdditionalViewData
        {
            get;
            set;
        }

        public IEnumerable<AggregateResult> AggregateResults
        {
            get;
            set;
        }

        public IEnumerable<AggregateFunction> Aggregates
        {
            get;
            set;
        }

        public int GroupsCount
        {
            get; 
            set;
        }

        public IDictionary<string, object> TableHtmlAttributes
        {
            get;
            set;
        }
    }
}