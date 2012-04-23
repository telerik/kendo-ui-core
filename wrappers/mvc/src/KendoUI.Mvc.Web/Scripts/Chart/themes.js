(function () {

    // Imports ================================================================
    var $t = $.telerik,
        Chart = $t.chart.Chart,
        deepExtend = Chart.deepExtend;

    // Constants ==============================================================
    var BLACK = "#000",
        WHITE = "#fff",
        SANS = "Arial,Helvetica,sans-serif",
        SANS11 = "11px " + SANS,
        SANS12 = "12px " + SANS,
        SANS16 = "16px " + SANS,
        NO_OVERLAY = {
            overlay: null
        };

    // Themes =================================================================
    var baseTheme = {
            title: {
                font: SANS16
            },
            legend: {
                labels: {
                    font: SANS12
                }
            },
            seriesDefaults: {
                labels: {
                    font: SANS11
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        size: 6,
                        visible: false
                    }
                },
                verticalArea: {
                    opacity: 0.4,
                    markers: {
                        size: 6,
                        visible: false
                    }
                }
            },
            axisDefaults: {
                labels: {
                    font: SANS12
                },
                title: {
                    font: SANS16,
                    margin: 5
                }
            },
            tooltip: {
                font: SANS12
            }
        };

    var themes = { };
    themes.black = deepExtend({}, baseTheme, {
        title: {
            color: WHITE
        },
        legend: {
            labels: {
                color: WHITE
            }
        },
        seriesDefaults: {
            labels: {
                color: WHITE
            },
            line: {
                markers: {
                    background: "#3d3d3d"
                }
            },
            verticalLine: {
                markers: {
                    background: "#3d3d3d"
                }
            },
            scatter: {
                markers: {
                    background: "#3d3d3d"
                }
            },
            scatterLine: {
                markers: {
                    background: "#3d3d3d"
                }
            }
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#f9a319", "#1edee2", "#9eda29", "#ffce00", "#dd007f"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#919191"
            },
            labels: {
                color: WHITE
            },
            majorGridLines: {
                color: "#636363"
            },
            minorGridLines: {
                color: "#464646"
            },
            title: {
                color: WHITE
            }
        }
    });

    themes["default"] = deepExtend({}, baseTheme, {
        chartArea: {
            background: ""
        },
        seriesColors: ["#f6921e", "#d6de23", "#8bc53f", "#26a9e0", "#9e1f63"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            majorGridLines: {
                color: "#aaaaaa"
            },
            minorGridLines: {
                color: "#cccccc"
            },
            line: {
                color: "#828282"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.forest = deepExtend({}, baseTheme, {
        title: {
            color: "#3c4c30"
        },
        legend: {
            labels: {
                color: "#3c4c30"
            }
        },
        seriesDefaults: {
            labels: {
                color: "#3c4c30"
            },
            verticalLine: {
                markers: {
                    background: "#d3e0c2"
                }
            },
            line: {
                markers: {
                    background: "#d3e0c2"
                }
            },
            scatter: {
                markers: {
                    background: "#d3e0c2"
                }
            },
            scatterLine: {
                markers: {
                    background: "#d3e0c2"
                }
            }
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#4d7924", "#6dba3a", "#efab22", "#f05a28", "#603813"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            majorGridLines: {
                color: "#a7bc75"
            },
            minorGridLines: {
                color: "#cad7ac"
            },
            line: {
                color: "#5a8533"
            },
            labels: {
                color: "#3c4c30"
            },
            title: {
                color: "#3c4c30"
            }
        },
        tooltip: {
            background: "#D3E0C2",
            color: BLACK
        }
    });

    themes.hay = deepExtend({}, baseTheme, {
        title: {
            color: "#3c4c30"
        },
        legend: {
            labels: {
                color: "#3c4c30"
            }
        },
        seriesDefaults: {
            labels: {
                color: "#3c4c30"
            }
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#205b02", "#61c407", "#9cd65f", "#bbbe94", "#323323"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            majorGridLines: {
                color: "#bfbdac"
            },
            minorGridLines: {
                color: "#d9d7cd"
            },
            line: {
                color: "#898772"
            },
            labels: {
                color: "#3c4c30"
            },
            title: {
                color: "#3c4c30"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.metro = deepExtend({}, baseTheme, {
        seriesDefaults: {
            bar: NO_OVERLAY,
            pie: NO_OVERLAY,
            column: NO_OVERLAY,
            pie: NO_OVERLAY
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#25a0da", "#309b46", "#d8e404", "#e61e26", "#313131"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            majorGridLines: {
                color: "#b4b4b4"
            },
            line: {
                color: "#b4b4b4"
            },
            minorGridLines: {
                color: "#d2d2d2"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.office2007 = deepExtend({}, baseTheme, {
        chartArea: {
            background: ""
        },
        seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            majorGridLines: {
                color: "#bdcce2"
            },
            minorGridLines: {
                color: "#d7e0ee"
            },
            line: {
                color: "#688CAF"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.office2010black = deepExtend({}, baseTheme, {
        title: {
            color: WHITE
        },
        legend: {
            labels: {
                color: WHITE
            }
        },
        seriesDefaults: {
            labels: {
                color: WHITE
            },
            verticalLine: {
                markers: {
                    background: "#6f6f6f"
                }
            },
            line: {
                markers: {
                    background: "#6f6f6f"
                }
            },
            scatter: {
                markers: {
                    background: "#6f6f6f"
                }
            },
            scatterLine: {
                markers: {
                    background: "#6f6f6f"
                }
            }
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#999999"
            },
            labels: {
                color: WHITE
            },
            majorGridLines: {
                color: "#888888"
            },
            minorGridLines: {
                color: "#7c7c7c"
            },
            title: {
                color: WHITE
            }
        },
        tooltip: {
            background: "#6F6F6F",
            color: WHITE
        }
    });

    themes.office2010blue = deepExtend({}, baseTheme, {
        title: {
            color: "#384E73"
        },
        legend: {
            labels: {
                color: "#384E73"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#384E73"
            }
        },
        seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#8ba0bc"
            },
            labels: {
                color: "#384e73"
            },
            majorGridLines: {
                color: "#d1dbe5"
            },
            minorGridLines: {
                color: "#e3e9ef"
            },
            title: {
                color: "#384e73"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.office2010silver = deepExtend({}, baseTheme, {
        title: {
            color: "#3b3b3b"
        },
        legend: {
            labels: {
                color: "#3b3b3b"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#3b3b3b"
            }
        },
        seriesColors: ["#99c62a", "#27adcc", "#2477c9", "#7042b2", "#d83636"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#a4abb2"
            },
            labels: {
                color: "#3b3b3b"
            },
            majorGridLines: {
                color: "#dbdfe4"
            },
            minorGridLines: {
                color: "#e9ecef"
            },
            title: {
                color: "#3b3b3b"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.outlook = deepExtend({}, baseTheme, {
        chartArea: {
            background: ""
        },
        seriesColors: ["#231f20", "#1b75bb", "#7da5e0", "#f9ec31", "#faaf40"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#5d8cc9"
            },
            majorGridLines: {
                color: "#aac3e8"
            },
            minorGridLines: {
                color: "#ccdbf1"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.simple = deepExtend({}, baseTheme, {
        title: {
            color: "#606060"
        },
        legend: {
            labels: {
                color: "#606060"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#606060"
            }
        },
        seriesColors: ["#231f20", "#404041", "#58595b", "#808184", "#929497"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#828282"
            },
            majorGridLines: {
                color: "#d1d1d1"
            },
            minorGridLines: {
                color: "#e3e3e3"
            },
            labels: {
                color: "#606060"
            },
            title: {
                color: "#606060"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.sitefinity = deepExtend({}, baseTheme, {
        chartArea: {
            background: ""
        },
        seriesColors: ["#a2d5e2", "#95b979", "#f9d67b", "#ea9d73", "#f19ca8", "#d06c6c"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#636363"
            },
            majorGridLines: {
                color: "#919191"
            },
            minorGridLines: {
                color: "#a1a1a1"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.sunset = deepExtend({}, baseTheme, {
        title: {
            color: "#854324"
        },
        legend: {
            labels: {
                color: "#854324"
            }
        },
        seriesDefaults: {
            labels: {
                color: "#854324"
            }
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#3f1c12", "#ba3b01", "#d95a1a", "#e7931e", "#f9bc12"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#b7836a"
            },
            labels: {
                color: "#854324"
            },
            majorGridLines: {
                color: "#cebab1"
            },
            minorGridLines: {
                color: "#e2d6d0"
            },
            title: {
                color: "#854324"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.telerik = deepExtend({}, baseTheme, {
        chartArea: {
            background: ""
        },
        seriesColors: ["#7e7e7e", "#cbcbcb", "#a2ea8b", "#63ac39", "#000000"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#828282"
            },
            majorGridLines: {
                color: "#c6c6c6"
            },
            minorGridLines: {
                color: "#b4b4b4"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.transparent = deepExtend({}, baseTheme, {
        seriesDefaults: {
            opacity: 0.6,
            verticalLine: {
                markers: {
                    background: ""
                }
            },
            line: {
                markers: {
                    background: ""
                }
            },
            scatter: {
                markers: {
                    background: ""
                }
            },
            scatterLine: {
                markers: {
                    background: ""
                }
            }
        },
        chartArea: {
            background: ""
        },
        seriesColors: ["#f2f2f2", "#4d4d4d", "#d4d4d4", "#0d0d0d", "#999999"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#828282"
            },
            majorGridLines: {
                color: "#828282"
            },
            minorGridLines: {
                color: "#b4b4b4"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK,
            opacity: 0.7
        }
    });

    themes.vista = deepExtend({}, baseTheme, {
        title: {
            color: "#333333"
        },
        legend: {
            labels: {
                color: "#333333"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#333333"
            }
        },
        seriesColors: ["#83abc0", "#64d6f4", "#3399ff", "#03597a", "#000000"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#a7bac5"
            },
            majorGridLines: {
                color: "#d3d3d3"
            },
            labels: {
                color: "#333333"
            },
            minorGridLines: {
                color: "#e5e5e5"
            },
            title: {
                color: "#333333"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.web20 = deepExtend({}, baseTheme, {
        title: {
            color: "#001454"
        },
        legend: {
            labels: {
                color: "#001454"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#001454"
            }
        },
        seriesColors: ["#0e4302", "#64ba36", "#a0beea", "#3460b9", "#2c4072"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#708dc3"
            },
            majorGridLines: {
                color: "#cfd9e7"
            },
            labels: {
                color: "#001454"
            },
            minorGridLines: {
                color: "#e2e8f1"
            },
            title: {
                color: "#001454"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.webblue = deepExtend({}, baseTheme, {
        title: {
            color: "#0d202b"
        },
        legend: {
            labels: {
                color: "#0d202b"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#0d202b"
            }
        },
        seriesColors: ["#a2b3c7", "#76c8e8", "#358db0", "#426682", "#2d3d4f"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#708dc3"
            },
            majorGridLines: {
                color: "#d0d8dd"
            },
            labels: {
                color: "#0d202b"
            },
            minorGridLines: {
                color: "#e2e8f1"
            },
            title: {
                color: "#0d202b"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    themes.windows7 = deepExtend({}, baseTheme, {
        title: {
            color: "#4c607a"
        },
        legend: {
            labels: {
                color: "#4c607a"
            }
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                color: "#4c607a"
            }
        },
        seriesColors: ["#a5b3c5", "#82afe5", "#358db0", "#03597a", "#152435"],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        axisDefaults: {
            line: {
                color: "#a5b3c5"
            },
            majorGridLines: {
                color: "#dae2e8"
            },
            labels: {
                color: "#4c607a"
            },
            minorGridLines: {
                color: "#e9eef1"
            },
            title: {
                color: "#4c607a"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        },
        tooltip: {
            background: WHITE,
            color: BLACK
        }
    });

    // Exports ================================================================
    Chart.themes = themes;
    Chart.prototype.options.theme = "default";

})(jQuery);