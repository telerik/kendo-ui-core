(function () {

    // Imports ================================================================
    var kendo = window.kendo,
        ui = kendo.dataviz.ui,
        deepExtend = kendo.deepExtend;

    // Constants ==============================================================
    var BAR_GAP = 1.5,
        BAR_SPACING = 0.4,
        BLACK = "#000",
        SANS = "Arial,Helvetica,sans-serif",
        SANS11 = "11px " + SANS,
        SANS12 = "12px " + SANS,
        SANS16 = "16px " + SANS,
        WHITE = "#fff";

    var chartBaseTheme = {
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
                donut: {
                    margin: 1
                },
                line: {
                    width: 4
                },
                area: {
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                candlestick: {
                    line: {
                        width: 1,
                        color: BLACK
                    },
                    border: {
                        width: 1,
                        _brightness: 0.8
                    },
                    gap: 1,
                    spacing: 0.3,
                    downColor: WHITE,
                    aggregate: {
                        "open": "max",
                        "high": "max",
                        "low": "min",
                        "close": "max"
                    },
                    highlight: {
                        line: {
                            width: 2
                        },
                        border: {
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                ohlc: {
                    line: {
                        width: 1
                    },
                    gap: 1,
                    spacing: 0.3,
                    aggregate: {
                        "open": "max",
                        "high": "max",
                        "low": "min",
                        "close": "max"
                    },
                    highlight: {
                        line: {
                            width: 3,
                            opacity: 1
                        }
                    }
                },
                bubble: {
                    opacity: 0.6,
                    border: {
                        width: 0
                    },
                    labels: {
                        background: "transparent"
                    }
                },
                bar: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                column: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                }
            },
            categoryAxis: {
                majorGridLines: {
                    visible: true
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
            },
            navigator: {
                pane: {
                    height: 90,
                    margin: {
                        top: 10
                    }
                }
            }
        };

    var gaugeBaseTheme = {
        scale: {
            labels: {
                font: SANS12
            }
        }
    };

    var themes = ui.themes,
        registerTheme = ui.registerTheme = function(themeName, options) {
            var result = {};
            // Apply base theme
            result.chart = deepExtend({}, chartBaseTheme, options.chart);
            result.gauge = deepExtend({}, gaugeBaseTheme, options.gauge);

            // Copy the line/area chart settings for their vertical counterparts
            var defaults = result.chart.seriesDefaults;
            defaults.verticalLine = deepExtend({}, defaults.line);
            defaults.verticalArea = deepExtend({}, defaults.area);

            themes[themeName] = result;
        };

    registerTheme("black", {
        chart: {
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
                pie: {
                    overlay: {
                        gradient: "sharpBevel"
                    }
                },
                donut: {
                    overlay: {
                        gradient: "sharpGlass"
                    }
                },
                line: {
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
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#555",
                    line: {
                        color: WHITE
                    },
                    border: {
                        _brightness: 1.5,
                        opacity: 1
                    },
                    highlight: {
                        border: {
                            color: WHITE,
                            opacity: 0.2
                        }
                    }
                },
                ohlc: {
                    line: {
                        color: WHITE
                    }
                }
            },
            chartArea: {
                background: "#3d3d3d"
            },
            seriesColors: ["#0081da", "#3aafff", "#99c900", "#ffeb3d", "#b20753", "#ff4195"],
            axisDefaults: {
                line: {
                    color: "#8e8e8e"
                },
                labels: {
                    color: WHITE
                },
                majorGridLines: {
                    color: "#545454"
                },
                minorGridLines: {
                    color: "#454545"
                },
                title: {
                    color: WHITE
                }
            },
            tooltip: {
                background: "#3d3d3d",
                color: WHITE,
                opacity: 0.8
            }
        },
        gauge: {
            pointer: {
                color: "#0070e4"
            },
            scale: {
                rangePlaceholderColor: "#1d1d1d",

                labels: {
                    color: WHITE
                },
                minorTicks: {
                    color: WHITE
                },
                majorTicks: {
                    color: WHITE
                },
                line: {
                    color: WHITE
                }
            }
        }
    });

    registerTheme("blueopal", {
        chart: {
            title: {
                color: "#293135"
            },
            legend: {
                labels: {
                    color: "#293135"
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK,
                    background: WHITE,
                    opacity: 0.5
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#c4d0d5",
                    line: {
                        color: "#9aabb2"
                    }
                }
            },
            seriesColors: ["#0069a5", "#0098ee", "#7bd2f6", "#ffb800", "#ff8517", "#e34a00"],
            axisDefaults: {
                line: {
                    color: "#9aabb2"
                },
                labels: {
                    color: "#293135"
                },
                majorGridLines: {
                    color: "#c4d0d5"
                },
                minorGridLines: {
                    color: "#edf1f2"
                },
                title: {
                    color: "#293135"
                }
            },
            tooltip: {
                background: WHITE,
                color: BLACK,
                opacity: 0.8
            }
        },
        gauge: {
            pointer: {
                color: "#005c83"
            },
            scale: {
                rangePlaceholderColor: "#daecf4",

                labels: {
                    color: "#293135"
                },
                minorTicks: {
                    color: "#293135"
                },
                majorTicks: {
                    color: "#293135"
                },
                line: {
                    color: "#293135"
                }
            }
        }
    });
    
    registerTheme("highcontrast", {
        chart: {
            title: {
                color: "#ffffff"
            },
            legend: {
                labels: {
                    color: "#ffffff"
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#ffffff"
                },
                pie: {
                    overlay: {
                        gradient: "sharpGlass"
                    }
                },
                donut: {
                    overlay: {
                        gradient: "sharpGlass"
                    }
                },
                line: {
                    markers: {
                        background: "#2c232b"
                    }
                },
                scatter: {
                    markers: {
                        background: "#2c232b"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#2c232b"
                    }
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#664e62",
                    line: {
                        color: "#ffffff"
                    },
                    border: {
                        _brightness: 1.5,
                        opacity: 1
                    },
                    highlight: {
                        border: {
                            color: "#ffffff",
                            opacity: 0.2
                        }
                    }
                },
                ohlc: {
                    line: {
                        color: "#ffffff"
                    }
                }
            },
            chartArea: {
                background: "#2c232b"
            },
            seriesColors: ["#a7008f", "#ffb800", "#3aafff", "#99c900", "#b20753", "#ff4195"],
            axisDefaults: {
                line: {
                    color: "#ffffff"
                },
                labels: {
                    color: "#ffffff"
                },
                majorGridLines: {
                    color: "#664e62"
                },
                minorGridLines: {
                    color: "#4f394b"
                },
                title: {
                    color: "#ffffff"
                }
            },
            tooltip: {
                background: "#1b141a",
                color: "#ffffff",
                opacity: 0.8
            }
        },
        gauge: {
            pointer: {
                color: "#a7008f"
            },
            scale: {
                rangePlaceholderColor: "#2c232b",

                labels: {
                    color: "#ffffff"
                },
                minorTicks: {
                    color: "#2c232b"
                },
                majorTicks: {
                    color: "#664e62"
                },
                line: {
                    color: "#ffffff"
                }
            }
        }
    });

    registerTheme("default", {
        chart: {
            title: {
                color: "#8e8e8e"
            },
            legend: {
                labels: {
                    color: "#232323"
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK,
                    background: WHITE,
                    opacity: 0.5
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#dedede",
                    line: {
                        color: "#8d8d8d"
                    }
                }
            },
            seriesColors: ["#ff6800", "#a0a700", "#ff8d00", "#678900", "#ffb53c", "#396000"],
            axisDefaults: {
                line: {
                    color: "#8e8e8e"
                },
                labels: {
                    color: "#232323"
                },
                minorGridLines: {
                    color: "#f0f0f0"
                },
                majorGridLines: {
                    color: "#dfdfdf"
                },
                title: {
                    color: "#232323"
                }
            },
            tooltip: {
                background: WHITE,
                color: BLACK,
                opacity: 0.8
            }
        },
        gauge: {
            pointer: {
                color: "#ea7001"
            },
            scale: {
                rangePlaceholderColor: "#dedede",

                labels: {
                    color: "#2e2e2e"
                },
                minorTicks: {
                    color: "#2e2e2e"
                },
                majorTicks: {
                    color: "#2e2e2e"
                },
                line: {
                    color: "#2e2e2e"
                }
            }
        }
    });

    registerTheme("silver", {
        chart: {
            title: {
                color: "#4e5968"
            },
            legend: {
                labels: {
                    color: "#4e5968"
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#293135",
                    background: "#eaeaec",
                    opacity: 0.5
                },
                line: {
                    markers: {
                        background: "#eaeaec"
                    }
                },
                scatter: {
                    markers: {
                        background: "#eaeaec"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#eaeaec"
                    }
                },
                pie: {
                    connectors: {
                        color: "#A6B1C0"
                    }
                },
                donut: {
                    connectors: {
                        color: "#A6B1C0"
                    }
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#a6afbe"
                }
            },
            chartArea: {
                background: "#eaeaec"
            },
            seriesColors: ["#007bc3", "#76b800", "#ffae00", "#ef4c00", "#a419b7", "#430B62"],
            axisDefaults: {
                line: {
                    color: "#a6b1c0"
                },
                labels: {
                    color: "#4e5968"
                },
                majorGridLines: {
                    color: "#dcdcdf"
                },
                minorGridLines: {
                    color: "#eeeeef"
                },
                title: {
                    color: "#4e5968"
                }
            },
            tooltip: {
                background: WHITE,
                color: "#4e5968",
                opacity: 0.8
            }
        },
        gauge: {
            pointer: {
                color: "#0879c0"
            },
            scale: {
                rangePlaceholderColor: "#f3f3f4",

                labels: {
                    color: "#515967"
                },
                minorTicks: {
                    color: "#515967"
                },
                majorTicks: {
                    color: "#515967"
                },
                line: {
                    color: "#515967"
                }
            }
        }
    });

    registerTheme("metro", {
        chart: {
            title: {
                color: "#777777"
            },
            legend: {
                labels: {
                    color: "#777777"
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#c7c7c7",
                    line: {
                        color: "#787878"
                    }
                }
            },
            seriesColors: ["#8ebc00", "#309b46", "#25a0da", "#ff6900", "#e61e26", "#d8e404", "#16aba9", "#7e51a1", "#313131", "#ed1691"],
            axisDefaults: {
                line: {
                    color: "#c7c7c7"
                },
                labels: {
                    color: "#777777"
                },
                minorGridLines: {
                    color: "#c7c7c7"
                },
                majorGridLines: {
                    color: "#c7c7c7"
                },
                title: {
                    color: "#777777"
                }
            },
            tooltip: {
                background: WHITE,
                color: BLACK
            }
        },
        gauge: {
            pointer: {
                color: "#8ebc00"
            },
            scale: {
                rangePlaceholderColor: "#e6e6e6",

                labels: {
                    color: "#777"
                },
                minorTicks: {
                    color: "#777"
                },
                majorTicks: {
                    color: "#777"
                },
                line: {
                    color: "#777"
                }
            }
        }
    });
    
    registerTheme("metroblack", {
        chart: {
            title: {
                color: "#ffffff"
            },
            legend: {
                labels: {
                    color: "#ffffff"
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#ffffff"
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                },
                candlestick: {
                    downColor: "#828282",
                    line: {
                        color: "#ffffff"
                    }
                }
            },
            chartArea: {
                background: "#0e0e0e"
            },
            seriesColors: ["#00aba9", "#309b46", "#8ebc00", "#ff6900", "#e61e26", "#d8e404", "#25a0da", "#7e51a1", "#313131", "#ed1691"],
            axisDefaults: {
                line: {
                    color: "#cecece"
                },
                labels: {
                    color: "#ffffff"
                },
                minorGridLines: {
                    color: "#2d2d2d"
                },
                majorGridLines: {
                    color: "#333333"
                },
                title: {
                    color: "#ffffff"
                }
            },
            tooltip: {
                background: "#0e0e0e",
                color: "#ffffff"
            }
        },
        gauge: {
            pointer: {
                color: "#00aba9"
            },
            scale: {
                rangePlaceholderColor: "#2d2d2d",

                labels: {
                    color: "#ffffff"
                },
                minorTicks: {
                    color: "#333333"
                },
                majorTicks: {
                    color: "#cecece"
                },
                line: {
                    color: "#cecece"
                }
            }
        }
    });

})(jQuery);

