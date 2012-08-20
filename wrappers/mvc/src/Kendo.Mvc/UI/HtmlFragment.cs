namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    public class HtmlFragment : IHtmlNode
    {
        public HtmlFragment()
        {
            Children = new List<IHtmlNode>();
        }

        public string TagName
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public string InnerHtml
        {
            get
            {
                StringBuilder innerHtml = new StringBuilder();

                Children.Each(child => innerHtml.Append(child.ToString()));

                return innerHtml.ToString();
            }
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

        public TagRenderMode RenderMode
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public IDictionary<string, string> Attributes()
        {
            throw new NotImplementedException();
        }

        public string Attribute(string key)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode Attribute(string key, string value)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode Attribute(string key, string value, bool replaceExisting)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode Attributes(object attributes)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes, bool replaceExisting)
        {
            throw new NotImplementedException();
        }
        
        public IHtmlNode AddClass(string[] classes)
        {
            return this;
        }

        public IHtmlNode PrependClass(string[] classes)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode RemoveAttribute(string key)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode ToggleClass(string @class, bool condition)
        {
            throw new NotImplementedException();
        }

        public IHtmlNode ToggleAttribute(string key, string value, bool condition)
        {
            throw new NotImplementedException();
        }
        public IHtmlNode ToggleCss(string key, string value, bool condition)
        {
            throw new NotImplementedException();
        }
        public IHtmlNode Template(Action<TextWriter> value)
        {
            template = value;
            
            return this;
        }

        private Action<TextWriter> template;

        public IHtmlNode Css(string key, string value)
        {
            throw new NotImplementedException();
        }

        public Action<TextWriter> Template()
        {
            return template;
        }

        public IHtmlNode Html(string value)
        {
            html = value;
            return this;
        }

        private string html;

        public IHtmlNode Text(string value)
        {
            throw new NotImplementedException();
        }

        public void WriteTo(TextWriter output)
        {
            if (template != null)
            {
                template(output);
            }
            else if (Children.Any())
            {
                Children.Each(child => child.WriteTo(output));
            }
            else if (html.HasValue())
            {
                output.Write(html);
            }
        }

        public IHtmlNode AppendTo(IHtmlNode parent)
        {
            parent.Children.Add(this);

            return this;
        }
    }
}
