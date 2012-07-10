namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Extensions;

    public class TreeViewHtmlBuilder : NavigationHtmlBuilderBase<TreeView, TreeViewItem>
    {
        public TreeViewHtmlBuilder(TreeView treeView)
            : base(treeView)
        {
        }

        public IHtmlNode TreeViewTag()
        {
            IHtmlNode div = ComponentTag("div")
                .PrependClass(UIPrimitives.Widget, "k-treeview", UIPrimitives.ResetStyle);

            if (Component.Items.Count > 0)
            {
                ListTag().AppendTo(div);
            }

            return div;
        }

        public IHtmlNode ChildrenTag(TreeViewItem item)
        {
            return ListTag()
                .ToggleAttribute("style", "display:none", !item.Expanded);
        }

        public IHtmlNode ItemTag(TreeViewItem item, bool hasAccessibleChildren)
        {
            IHtmlNode li = new HtmlElement("li")
                .Attributes(item.HtmlAttributes);

            if (item.Id.HasValue())
            {
                li.Attribute("data-id", item.Id);
            }

            if (item.HasChildren)
            {
                li.Attribute("data-hasChildren", "true");
            }

            if (item.NextSibling == null)
            {
                li.PrependClass(UIPrimitives.Last);
            }

            if (item.Parent == null && item.PreviousSibling == null)
            {
                li.PrependClass(UIPrimitives.First);
            }

            li.PrependClass(UIPrimitives.Item);

            IHtmlNode div = new HtmlElement("div")
                .ToggleClass(UIPrimitives.Top, item.PreviousSibling == null)
                .ToggleClass(UIPrimitives.Bottom, item.NextSibling == null)
                .ToggleClass(UIPrimitives.Middle, item.PreviousSibling != null && item.NextSibling != null)
                .AppendTo(li);

            if (item.HasChildren || hasAccessibleChildren || item.Template.HasValue())
            {
                new HtmlElement("span")
                        .AddClass(UIPrimitives.Icon)
                        .ToggleClass("k-plus", item.Enabled && !item.Expanded)
                        .ToggleClass("k-minus", item.Enabled && item.Expanded)
                        .ToggleClass("k-plus-disabled", !item.Enabled && !item.Expanded)
                        .ToggleClass("k-minus-disabled", !item.Enabled && item.Expanded)
                        .AppendTo(div);
            }
            
            return li;
        }

        public IHtmlNode ItemInnerContent(TreeViewItem item)
        {
            string url = Component.GetItemUrl(item, string.Empty);
            bool isNavigatable = url.HasValue();

            IHtmlNode tag = new HtmlElement(isNavigatable ? "a" : "span");

            if (isNavigatable)
            {
                if (item.Enabled)
                {
                    tag.Attribute("href", url);
                }
            }

            tag.Attributes(item.LinkHtmlAttributes)
               .PrependClass("k-in")
               .ToggleClass(UIPrimitives.DisabledState, !item.Enabled)
               .ToggleClass(UIPrimitives.SelectedState, item.Enabled && item.Selected);

            if (isNavigatable)
            {
                tag.PrependClass(UIPrimitives.Link);
            }

            if (item.ImageUrl.HasValue())
            {
                ImageTag(item).AppendTo(tag);
            }

            if (item.SpriteCssClasses.HasValue())
            {
                SpriteTag(item).AppendTo(tag);
            }

            Text(item).AppendTo(tag);

            return tag;
        }

        public IHtmlNode ItemHiddenInputValue(TreeViewItem item)
        {
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                 .AddClass(UIPrimitives.Input)
                 .Attributes(new { type = "hidden", value = item.Id, name = "itemValue" });
        }

        public IHtmlNode ItemContentTag(TreeViewItem item)
        {
            IHtmlNode div = ContentTag(item);

            if (!item.Expanded || !item.Enabled)
            {
                div.Attribute("style", "display:none");
            }

            return div;
        }
    }
}