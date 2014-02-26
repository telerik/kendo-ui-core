using System.Collections.Generic;
using System;
using Kendo.Mvc.Examples.Models.Chart;

namespace Kendo.Mvc.Examples.Models
{
    public partial class DiagramDataRepository
    {
        public static List<CorporateData> OrgChart()
        {
            List<CorporateData> result = new List<CorporateData>();
            CorporateData antonio = new CorporateData("Antonio", "Moreno", "antonio.jpg", "Team Lead", "#1696d3");
            result.Add(antonio);

            CorporateData elizabeth = new CorporateData("Elizabeth", "Brown", "elizabeth.jpg", "Design Lead", "#ef6944");
            antonio.Items.Add(elizabeth);

            CorporateData ann = new CorporateData("Ann", "Devon", "ann.jpg", "UI Designer", "#ef6944");
            elizabeth.Items.Add(ann);

            CorporateData fran = new CorporateData("Fran", "Wilson", "fran.jpg", "Design Intern", "#ef6944");
            elizabeth.Items.Add(fran);

            CorporateData diego = new CorporateData("Diego", "Roel", "diego.jpg", "QA Engineer", "#ee587b");
            antonio.Items.Add(diego);

            CorporateData felipe = new CorporateData("Felipe", "Izquiedro", "felipe.jpg", "Senior Developer", "#75be16");
            antonio.Items.Add(felipe);

            CorporateData daniel = new CorporateData("Daniel", "Tonini", "daniel.jpg", "Developer", "#75be16");
            felipe.Items.Add(daniel);

            return result;
        }

        public static List<DiagramNode> DiagramNodes()
        {
            List<DiagramNode> result = new List<DiagramNode> {
                new DiagramNode {
                    Name = "0",
                    Items = new List<DiagramNode> {
                        new DiagramNode {
                            Name = "1.1",
                            Items = new List<DiagramNode> {
                                new DiagramNode {
                                    Name = "2.1",
                                    Items = new List<DiagramNode> {
                                        new DiagramNode {
                                            Name = "3.1",
                                            Items = null
                                        }
                                    }
                                }
                            }
                        },
                        new DiagramNode {
                            Name = "1.2",
                            Items = new List<DiagramNode> {
                                new DiagramNode {
                                    Name = "2.2",
                                    Items = null
                                }
                            }
                        },
                        new DiagramNode {
                            Name = "1.3",
                            Items = new List<DiagramNode> {
                                new DiagramNode {
                                    Name = "2.3",
                                    Items = new List<DiagramNode> {
                                        new DiagramNode {
                                            Name = "3.2",
                                            Items = null
                                        },
                                        new DiagramNode {
                                            Name = "3.3",
                                            Items = null
                                        }
                                    }
                                }
                            }
                        },
                        new DiagramNode {
                            Name = "1.4",
                            Items = new List<DiagramNode> {
                                new DiagramNode {
                                    Name = "2.5",
                                    Items = null
                                }
                            }
                        },
                        new DiagramNode {
                            Name = "1.5",
                            Items = new List<DiagramNode> {
                                new DiagramNode {
                                    Name = "2.6",
                                    Items = null
                                },
                                new DiagramNode {
                                    Name = "2.7",
                                    Items = new List<DiagramNode> {
                                        new DiagramNode {
                                            Name = "3.4",
                                            Items = null
                                        },
                                        new DiagramNode {
                                            Name = "3.5",
                                            Items = null
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            return result;
        }
    }
}