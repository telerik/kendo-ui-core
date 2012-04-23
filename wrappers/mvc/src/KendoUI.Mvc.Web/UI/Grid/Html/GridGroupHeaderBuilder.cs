// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure;

    public class GridGroupHeaderBuilder : IGridGroupHeaderBuilder
    {
        public IHtmlNode CreateGroupHeader(GridGroupingData groupingData)
        {
            var div = new HtmlElement("div").AddClass("t-grouping-header");

            if (groupingData.GroupDescriptors.Any())
            {
                AppendGroupIndicators(div, groupingData);
            }
            else
            {
                AppendHint(div, groupingData);
            }
            
            return div;
        }

        private void AppendHint(IHtmlNode div, GridGroupingData groupingData)
        {
            div.Html(groupingData.Hint);
        }

        private void AppendGroupIndicators(IHtmlNode div, GridGroupingData groupingData)
        {
            var groupDescriptors = groupingData.GroupDescriptors;
            
            foreach (var group in groupDescriptors)
            {
                AppendGroupIndicator(div, group, groupingData);
            }
        }
        
        private void AppendGroupIndicator(IHtmlNode div, GroupDescriptor group, GridGroupingData groupingData)
        {
            var groups = new List<GroupDescriptor>(groupingData.GroupDescriptors);

            var indicator = new HtmlElement("div").AddClass(UIPrimitives.Grid.GroupIndicator);

            indicator.AppendTo(div);

            AppendSortLink(indicator, group, groups, groupingData.UrlBuilder, groupingData.GetTitle, groupingData.SortedAscText, groupingData.SortedDescText);

            AppendUngroupButton(indicator, groupingData.UrlBuilder, groups, groupingData.UnGroupText);
        }
        
        private void AppendUngroupButton(IHtmlNode indicator, IGridUrlBuilder urlBuilder, List<GroupDescriptor> groups, string ungroupText)
        {
            var button = new HtmlElement("a")
                            .Attribute("href", urlBuilder.SelectUrl(GridUrlParameters.GroupBy,
                                    GridDescriptorSerializer.Serialize(groups)))
                            .AddClass(UIPrimitives.Button)
                            .AppendTo(indicator);

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, UIPrimitives.Icons.GroupDelete)
                .Text(ungroupText)
                .AppendTo(button);
        }

        private void AppendSortLink(IHtmlNode indicator, GroupDescriptor group, List<GroupDescriptor> groups, IGridUrlBuilder urlBuilder, Func<string, string> title, string sortedAscText, string sortedDescText)
        {
            group.CycleSortDirection();

            var a = new HtmlElement("a")
                 .AddClass(UIPrimitives.Link)
                 .Attribute("href", urlBuilder.SelectUrl(GridUrlParameters.GroupBy, GridDescriptorSerializer.Serialize(groups)))
                 .AppendTo(indicator);

            group.CycleSortDirection();

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon)
                .ToggleClass("t-arrow-up-small", group.SortDirection == ListSortDirection.Ascending)
                .ToggleClass("t-arrow-down-small", group.SortDirection == ListSortDirection.Descending)
                .Text(String.Format("({0})", group.SortDirection == ListSortDirection.Ascending ? sortedAscText : sortedDescText))
                .AppendTo(a);

            groups.Remove(group);

            new TextNode(title(group.Member)).AppendTo(a);
        }
    }
}