// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Extensions;

    public class HtmlElement : IHtmlNode
    {
        private readonly TagBuilder tagBuilder;

        public HtmlElement(string tagName)
            : this(tagName, TagRenderMode.Normal)
        {
        }

        public HtmlElement(string tagName, TagRenderMode renderMode)
        {
            tagBuilder = new TagBuilder(tagName);
            Children = new List<IHtmlNode>();
            RenderMode = renderMode;
        }

        private Action<TextWriter> TemplateCallback
        {
            get;
            set;
        }

        public TagRenderMode RenderMode
        {
            get;
            private set;
        }

        public string TagName
        {
            get
            {
                return tagBuilder.TagName;
            }
        }

        public IDictionary<string, string> Attributes()
        {
            return tagBuilder.Attributes;
        }

        public string Attribute(string key)
        {
            return Attributes()[key];
        }

        public IList<IHtmlNode> Children
        {
            get;
            private set;
        }

        public override string ToString()
        {
            using (StringWriter output = new StringWriter(CultureInfo.CurrentCulture))
            {
                WriteTo(output);

                return output.GetStringBuilder().ToString();
            }
        }

        public IHtmlNode Attributes(object attributes)
        {
            Attributes<string, object>(attributes.ToDictionary());

            return this;
        }

        public IHtmlNode AddClass(params string[] classes)
        {
            //Not using tagBuilder.AddCssClass as it prepends the value
            foreach (string @class in classes)
            {
                string value;
                if (Attributes().TryGetValue("class", out value))
                {
                    Attributes()["class"] = value + " " + @class;
                }
                else
                {
                    Attributes()["class"] = @class;
                }
            }

            return this;
        }
        
        public IHtmlNode Css(string key, string value)
        {
            string style;

            if (Attributes().TryGetValue("style", out style))
            {
                if (!style.Contains("display:none"))
                {
                    Attributes()["style"] = style + ";" + key + ":" + value;
                }
            }
            else
            {
                Attributes()["style"] = key + ":" + value;
            }

            return this;
        }

        public IHtmlNode ToggleCss(string key, string value, bool condition)
        {
            if (condition)
            {
                Css(key, value);
            }

            return this;
        }

        public IHtmlNode PrependClass(string[] classes)
        {
            foreach (string @class in classes.Reverse())
            {
                tagBuilder.AddCssClass(@class);
            }

            return this;
        }

        public IHtmlNode ToggleClass(string @class, bool condition)
        {
            if (condition)
            {
                AddClass(@class);
            }

            return this;
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> values)
        {
            return Attributes(values, true);
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> values, bool replaceExisting)
        {
            tagBuilder.MergeAttributes(values, replaceExisting);

            return this;
        }
        
        public IHtmlNode AppendTo(IHtmlNode parent)
        {
            parent.Children.Add(this);

            return this;
        }
        
        public IHtmlNode Attribute(string key, string value)
        {
            return Attribute(key, value, true);
        }

        public IHtmlNode Attribute(string key, string value, bool replaceExisting)
        {
            tagBuilder.MergeAttribute(key, value, replaceExisting);
            
            return this;
        }

        public IHtmlNode Html(string value)
        {
            Children.Clear();

            Children.Add(new LiteralNode(value));
            
            return this;
        }

        public IHtmlNode Template(Action<TextWriter> value)
        {
            TemplateCallback = value;

            return this;
        }

        public Action<TextWriter> Template()
        {
            return TemplateCallback;
        }

        public string InnerHtml
        {
            get
            {
                if (Children.Any())
                {
                    StringBuilder innerHtml = new StringBuilder();

                    Children.Each(child => innerHtml.Append((string) child.ToString()));

                    return innerHtml.ToString();
                }

                return tagBuilder.InnerHtml;
            }
        }
        
        public IHtmlNode ToggleAttribute(string key, string value, bool condition)
        {
            if (condition)
            {
                Attribute(key, value);
            }

            return this;
        }
       
        public IHtmlNode Text(string value)
        {
            tagBuilder.SetInnerText(value);

            Children.Clear();

            return this;
        }

        public void WriteTo(TextWriter output)
        {
            if (RenderMode != TagRenderMode.SelfClosing)
            {
                output.Write(tagBuilder.ToString(TagRenderMode.StartTag));
                
                if (TemplateCallback != null)
                {
                    TemplateCallback(output);
                }
                else if (Children.Any())
                {
                    Children.Each(child => child.WriteTo(output));
                }
                else
                {
                    output.Write(tagBuilder.InnerHtml);
                }
                
                output.Write(tagBuilder.ToString(TagRenderMode.EndTag));
            }
            else
            {
                output.Write(tagBuilder.ToString(TagRenderMode.SelfClosing));
            }
        }
    }
}
