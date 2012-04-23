// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    
    public class TextNode : IHtmlNode
    {
        public TextNode(string value)
        {
            InnerHtml = value;
        }

        public string TagName
        {
            get { throw new NotSupportedException(); }
        }

        public TagRenderMode RenderMode
        {
            get { throw new NotSupportedException(); }
        }

        public IList<IHtmlNode> Children
        {
            get { throw new NotSupportedException(); }
        }

        public IDictionary<string, string> Attributes()
        {
            throw new NotSupportedException();
        }

        public string Attribute(string key)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Attribute(string key, string value)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Attribute(string key, string value, bool replaceExisting)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Attributes(object attributes)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes, bool replaceExisting)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode AddClass(params string[] classes)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode ToggleClass(string @class, bool condition)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode ToggleCss(string key, string value, bool condition)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Html(string value)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode Text(string value)
        {
            InnerHtml = value;

            return this;
        }

        public IHtmlNode Template(Action<TextWriter> value)
        {
            throw new NotSupportedException();
        }

        public IHtmlNode PrependClass(string[] classes)
        {
            throw new NotSupportedException();
        }

        private string innerHtml;

        public string InnerHtml
        {
            get
            {
                return innerHtml;
            }
            set
            {
                innerHtml = HttpUtility.HtmlEncode(value);
            }
        }

        public Action<TextWriter> Template()
        {
            throw new NotSupportedException();
        }

        public IHtmlNode ToggleAttribute(string key, string value, bool condition)
        {
            throw new NotSupportedException();
        }

        public override string ToString()
        {
            using (StringWriter output = new StringWriter())
            {
                WriteTo(output);

                return output.GetStringBuilder().ToString();
            }
        }

        public IHtmlNode Css(string key, string value)
        {
            throw new NotSupportedException();
        }

        public void WriteTo(TextWriter output)
        {
            output.Write(InnerHtml);
        }

        public IHtmlNode AppendTo(IHtmlNode parent)
        {
            parent.Children.Add(this);

            return this;
        }
    }
}
