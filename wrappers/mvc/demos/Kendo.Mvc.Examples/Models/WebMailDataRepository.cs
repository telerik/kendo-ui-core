using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public partial class WebMailDataRepository
    {
        public static IEnumerable<WebMail> WebMailData()
        {
            return new List<WebMail>
            {
                new WebMail {
                    MailID = 1,
                    FromID = 1,
                    From = "Ivo Nedkov",
                    Date = "2/22/2009",
                    Title = "RE: New version of Telerik Trainer"
                },
                
                new WebMail {
                    MailID = 2,
                    FromID = 2,
                    From = "Jytte Petersen",
                    Date = "2/22/2009",
                    Title = "RE: New version of Telerik Trainer"
                }, 
                
                new WebMail {
                    MailID = 3,
                    FromID = 3,
                    From = "Renate Messner",
                    Date = "2/22/2009",
                    Title = "RE: Conferences?"
                }, 
                
                new WebMail {
                    MailID = 4,
                    FromID = 4,
                    From = "Kevin Babcock",
                    Date = "2/21/2009",
                    Title = "RE: Conferences?"
                }, 
                
                new WebMail {
                    MailID = 5,
                    FromID = 5,
                    From = "Hari Kumar",
                    Date = "2/21/2009",
                    Title = "RE: New 'Your Links' menu on telerik.com"
                }
                
            };
        }

    }
}