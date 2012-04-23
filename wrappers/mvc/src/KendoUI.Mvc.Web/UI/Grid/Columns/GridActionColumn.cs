// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Telerik.Web.Mvc.UI.Html;
    using Telerik.Web.Mvc.Extensions;

    public class GridActionColumn<T> : GridColumnBase<T>, IGridActionColumn where T : class
    {
        public GridActionColumn(Grid<T> grid)
            : base(grid)
        {
            Commands = new List<IGridActionCommand>();
        }

        public IList<IGridActionCommand> Commands
        {
            get;
            private set;
        }

        public override IGridColumnSerializer CreateSerializer()
        {
            return new GridActionColumnSerializer(this);
        }
        
        protected override IGridDataCellBuilder CreateDisplayBuilderCore(IGridHtmlHelper htmlHelper)
        {
            var urlBuilder = Grid.UrlBuilder;

            var buttons = Commands.SelectMany(command => command.CreateDisplayButtons(Grid.Localization, urlBuilder, htmlHelper));

            GridActionCellBuilder builder = new GridActionCellBuilder(buttons.Select(button => (Func<object, IHtmlNode>)button.Create));
            builder.HtmlAttributes.Merge(HtmlAttributes);

            return builder;
        }

        protected override IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper)
        {
            var urlBuilder = Grid.UrlBuilder;

            var buttons = Commands.SelectMany(command => command.CreateEditButtons(Grid.Localization, urlBuilder, htmlHelper));

            return new GridActionCellBuilder(buttons.Select(button => (Func<object, IHtmlNode>)button.Create));
        }

        protected override IGridDataCellBuilder CreateInsertBuilderCore(IGridHtmlHelper htmlHelper)
        {
            var urlBuilder = Grid.UrlBuilder;

            var buttons = Commands.SelectMany(command => command.CreateInsertButtons(Grid.Localization, urlBuilder, htmlHelper));

            return new GridActionCellBuilder(buttons.Select(button => (Func<object, IHtmlNode>)button.Create));
        }
    }
}