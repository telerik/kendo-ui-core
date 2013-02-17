using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.UI;
using Kendo.Mvc.Examples.Models;
namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : Controller
    {
        public ActionResult Local_Data()
        {
            ViewBag.inlineDefault = GetDefaultInlineData();
            ViewBag.inline = GetInlineData();
            return View();
        }

        private IEnumerable<TreeViewItemModel> GetDefaultInlineData()
        {
            List<TreeViewItemModel> inlineDefault = new List<TreeViewItemModel>
                {
                    new TreeViewItemModel
                    {
                        Text = "Furniture",
                        Items = new List<TreeViewItemModel>
                        {
                            new TreeViewItemModel()
                            {
                                Text = "Tables & Chairs"                                
                            },
                            new TreeViewItemModel
                            {
                                 Text = "Sofas"
                            },
                            new TreeViewItemModel
                            {
                                 Text = "Occasional Furniture"
                            }
                        }
                    },
                    new TreeViewItemModel
                    {
                        Text = "Decor",
                        Items = new List<TreeViewItemModel>
                        {
                            new TreeViewItemModel()
                            {
                                Text = "Bed Linen"                                
                            },
                            new TreeViewItemModel
                            {
                                 Text = "Curtains & Blinds"
                            },
                            new TreeViewItemModel
                            {
                                 Text = "Carpets"
                            }
                        }
                    }
                };

            return inlineDefault;
        }

        private IEnumerable<CategoryItem> GetInlineData()
        {
            List<CategoryItem> inline = new List<CategoryItem>
                {
                    new CategoryItem
                    {
                        CategoryName = "Storage",
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Wall Shelving"                                
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Floor Shelving"
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Kids Storag"
                            }
                        }
                    },
                    new CategoryItem
                    {
                        CategoryName = "Lights",
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Ceiling"                                
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Table"
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Floor"
                            }
                        }
                    }
                };

            return inline;
        }
    }
}
