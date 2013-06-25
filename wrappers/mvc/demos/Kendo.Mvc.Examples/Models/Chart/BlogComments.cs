using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class BlogComments
    {

        public BlogComments()
        {
        }

        public BlogComments(string blog, int day, int value)
        {
            Blog = blog;
            Day = day;
            Value = value;
        }

        public string Blog { get; set; }
        public int Day { get; set; }
        public int Value  { get; set; }
    }
}