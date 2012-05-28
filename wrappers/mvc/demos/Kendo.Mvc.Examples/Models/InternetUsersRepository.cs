using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public static class InternetUsersRepository
    {
        public static IEnumerable<InternetUsers> GetData()
        {
            return new InternetUsers[] {
                new InternetUsers(2005, "United States", 67.96),
                new InternetUsers(2006, "United States", 68.93),
                new InternetUsers(2007, "United States", 75),
                new InternetUsers(2008, "United States", 74),
                new InternetUsers(2009, "United States", 78)
            };
        }
    }
}