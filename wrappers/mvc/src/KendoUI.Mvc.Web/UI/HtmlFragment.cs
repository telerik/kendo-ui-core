// (c) Copyright 2002-2009 Telerik 
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
    using Telerik.Web.Mvc.Extensions;

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
                // TODO: Implement this property getter
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
                // TODO: Implement this property getter
                throw new NotImplementedException();
            }
        }

        public IDictionary<string, string> Attributes()
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }

        public string Attribute(string key)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }

        public IHtmlNode Attribute(string key, string value)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }

        public IHtmlNode Attribute(string key, string value, bool replaceExisting)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
        public IHtmlNode Attributes(object attributes)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes, bool replaceExisting)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
        
        public IHtmlNode AddClass(string[] classes)
        {
            return this;
        }

        public IHtmlNode PrependClass(string[] classes)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
        public IHtmlNode ToggleClass(string @class, bool condition)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
        public IHtmlNode ToggleAttribute(string key, string value, bool condition)
        {
            // TODO: Implement this method
            throw new NotImplementedException();
        }
        public IHtmlNode ToggleCss(string key, string value, bool condition)
        {
            // TODO: Implement this method
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
            // TODO: Implement this method
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
            // TODO: Implement this method
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
