namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;

    public class GridGroupHeaderBuilder : IGridGroupHeaderBuilder
    {
        public IHtmlNode CreateGroupHeader(GridGroupingData groupingData)
        {
            var div = new HtmlElement("div").AddClass("k-grouping-header");

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
            div.Html(groupingData.Messages.Empty);
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

            indicator.Attribute("data-field", group.Member)
                .Attribute("data-dir", group.SortDirection == ListSortDirection.Ascending ? "asc" : "desc")
                .Attribute("data-title", groupingData.GetTitle(group.Member));

            indicator.AppendTo(div);

            AppendSortLink(indicator, group, groups, groupingData.UrlBuilder, groupingData.GetTitle);

            AppendUngroupButton(indicator, groupingData.UrlBuilder, groups);
        }
        
        private void AppendUngroupButton(IHtmlNode indicator, IGridUrlBuilder urlBuilder, List<GroupDescriptor> groups)
        {
            var button = new HtmlElement("a")
                            .Attribute("href", urlBuilder.SelectUrl(GridUrlParameters.Group,
                                    GridDescriptorSerializer.Serialize(groups)))
                            .AddClass(new[] { UIPrimitives.Button, UIPrimitives.ButtonIcon, UIPrimitives.ButtonBare })
                            .AppendTo(indicator);

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, UIPrimitives.Icons.GroupDelete)
                .AppendTo(button);
        }

        private void AppendSortLink(IHtmlNode indicator, GroupDescriptor group, List<GroupDescriptor> groups, IGridUrlBuilder urlBuilder, Func<string, string> title)
        {
            group.CycleSortDirection();

            var a = new HtmlElement("a")
                 .AddClass(UIPrimitives.Link)
                 .Attribute("href", urlBuilder.SelectUrl(GridUrlParameters.Group, GridDescriptorSerializer.Serialize(groups)))
                 .AppendTo(indicator);

            group.CycleSortDirection();

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon)
                .ToggleClass("k-arrow-up-small", group.SortDirection == ListSortDirection.Ascending)
                .ToggleClass("k-arrow-down-small", group.SortDirection == ListSortDirection.Descending)
                .AppendTo(a);

            groups.Remove(group);

            new TextNode(title(group.Member)).AppendTo(a);
        }
    }
}