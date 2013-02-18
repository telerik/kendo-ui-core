using System;
using System.Data.Services;
using System.Data.Services.Common;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Description;
using System.ServiceModel.Dispatcher;
using System.Text;
using System.Xml;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService
{
    [JSONPSupportBehavior]
    public class Northwind : DataService<SampleEntities>
    {
        // This method is called only once to initialize service-wide policies.
        public static void InitializeService(DataServiceConfiguration config)
        {            
            config.SetEntitySetAccessRule("*", EntitySetRights.AllRead);
            config.SetServiceOperationAccessRule("*", ServiceOperationRights.AllRead);
            config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V2;
            config.UseVerboseErrors = true;
        }
    }

    class JSONPSupportInspector : IDispatchMessageInspector
    {
        // Assume utf-8, note that Data Services supports
        // charset negotation, so this needs to be more
        // sophisticated (and per-request) if clients will 
        // use multiple charsets
        private static readonly Encoding encoding = Encoding.UTF8;

        #region IDispatchMessageInspector Members

        public object AfterReceiveRequest(ref Message request, IClientChannel channel, InstanceContext instanceContext)
        {
            if (request.Properties.ContainsKey("UriTemplateMatchResults"))
            {
                HttpRequestMessageProperty httpmsg = (HttpRequestMessageProperty)request.Properties[HttpRequestMessageProperty.Name];
                UriTemplateMatch match = (UriTemplateMatch)request.Properties["UriTemplateMatchResults"];

                string format = match.QueryParameters["$format"];
                if ("json".Equals(format, StringComparison.InvariantCultureIgnoreCase))
                {
                    // strip out $format from the query options to avoid an error
                    // due to use of a reserved option (starts with "$")
                    match.QueryParameters.Remove("$format");

                    // replace the Accept header so that the Data Services runtime 
                    // assumes the client asked for a JSON representation
                    httpmsg.Headers["Accept"] = "application/json, text/plain;q=0.5";
                    httpmsg.Headers["Accept-Charset"] = "utf-8";

                    string callback = match.QueryParameters["$callback"];
                    if (!string.IsNullOrEmpty(callback))
                    {
                        match.QueryParameters.Remove("$callback");
                        return callback;
                    }
                }
            }

            return null;
        }

        public void BeforeSendReply(ref Message reply, object correlationState)
        {
            if (correlationState != null && correlationState is string)
            {
                // if we have a JSONP callback then buffer the response, wrap it with the
                // callback call and then re-create the response message
                string callback = (string)correlationState;

                bool bodyIsText = false;
                HttpResponseMessageProperty response = reply.Properties[HttpResponseMessageProperty.Name] as HttpResponseMessageProperty;
                if (response != null)
                {
                    string contentType = response.Headers["Content-Type"];
                    if (contentType != null)
                    {
                        // Check the response type and change it to text/javascript if we know how.
                        if (contentType.StartsWith("text/plain", StringComparison.InvariantCultureIgnoreCase))
                        {
                            bodyIsText = true;
                            response.Headers["Content-Type"] = "text/javascript;charset=utf-8";
                        }
                        else if (contentType.StartsWith("application/json", StringComparison.InvariantCultureIgnoreCase))
                        {
                            response.Headers["Content-Type"] = contentType.Replace("application/json", "text/javascript");
                        }
                    }
                }

                XmlDictionaryReader reader = reply.GetReaderAtBodyContents();
                reader.ReadStartElement();

                string content = JSONPSupportInspector.encoding.GetString(reader.ReadContentAsBase64());
                if (bodyIsText)
                {
                    // Escape the body as a string literal.
                    content = "\"" + QuoteJScriptString(content) + "\"";
                }

                content = callback + "(" + content + ")";

                Message newreply = Message.CreateMessage(MessageVersion.None, "", new Writer(content));
                newreply.Properties.CopyProperties(reply.Properties);

                reply = newreply;
            }
        }

        private static string QuoteJScriptString(string s)
        {
            if (string.IsNullOrEmpty(s))
            {
                return string.Empty;
            }

            StringBuilder builder = null;
            int startIndex = 0;
            int count = 0;
            for (int i = 0; i < s.Length; i++)
            {
                char ch = s[i];
                if (((((ch == '\r') || (ch == '\t')) || ((ch == '"') || (ch == '\\'))) || (((ch == '\n') || (ch < ' ')) || ((ch > '\x007f') || (ch == '\b')))) || (ch == '\f'))
                {
                    if (builder == null)
                    {
                        builder = new StringBuilder(s.Length + 6);
                    }

                    if (count > 0)
                    {
                        builder.Append(s, startIndex, count);
                    }

                    startIndex = i + 1;
                    count = 0;
                }

                switch (ch)
                {
                    case '\b':
                        builder.Append(@"\b");
                        break;
                    case '\t':
                        builder.Append(@"\t");
                        break;
                    case '\n':
                        builder.Append(@"\n");
                        break;
                    case '\f':
                        builder.Append(@"\f");
                        break;
                    case '\r':
                        builder.Append(@"\r");
                        break;
                    case '"':
                        builder.Append("\\\"");
                        break;
                    case '\\':
                        builder.Append(@"\\");
                        break;
                    default:
                        if ((ch < ' ') || (ch > '\x007f'))
                        {
                            builder.AppendFormat(System.Globalization.CultureInfo.InvariantCulture, @"\u{0:x4}", (int)ch);
                        }
                        else
                        {
                            count++;
                        }
                        break;
                }
            }

            string result;
            if (builder == null)
            {
                result = s;
            }
            else
            {
                if (count > 0)
                {
                    builder.Append(s, startIndex, count);
                }

                result = builder.ToString();
            }

            return result;
        }

        #endregion

        class Writer : BodyWriter
        {
            private string content;

            public Writer(string content)
                : base(false)
            {
                this.content = content;
            }

            protected override void OnWriteBodyContents(XmlDictionaryWriter writer)
            {
                writer.WriteStartElement("Binary");
                byte[] buffer = JSONPSupportInspector.encoding.GetBytes(this.content);
                writer.WriteBase64(buffer, 0, buffer.Length);
                writer.WriteEndElement();
            }
        }
    }

    // Simply apply this attribute to a DataService-derived class to get
    // JSONP support in that service
    [AttributeUsage(AttributeTargets.Class)]
    public class JSONPSupportBehaviorAttribute : Attribute, IServiceBehavior
    {
        #region IServiceBehavior Members

        void IServiceBehavior.AddBindingParameters(ServiceDescription serviceDescription, ServiceHostBase serviceHostBase, System.Collections.ObjectModel.Collection<ServiceEndpoint> endpoints, BindingParameterCollection bindingParameters)
        {
        }

        void IServiceBehavior.ApplyDispatchBehavior(ServiceDescription serviceDescription, ServiceHostBase serviceHostBase)
        {
            foreach (ChannelDispatcher cd in serviceHostBase.ChannelDispatchers)
            {
                foreach (EndpointDispatcher ed in cd.Endpoints)
                {
                    ed.DispatchRuntime.MessageInspectors.Add(new JSONPSupportInspector());
                }
            }
        }

        void IServiceBehavior.Validate(ServiceDescription serviceDescription, ServiceHostBase serviceHostBase)
        {
        }

        #endregion
    }
}
