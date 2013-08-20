kendo_module({
    id: "dataviz.themes",
    name: "Themes",
    description: "Built-in themes for the DataViz widgets",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    hidden: true
});

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
                visible: true,
                labels: {
                    font: SANS11
                },
                donut: {
                    margin: 1
                },
                line: {
                    width: 4
                },
                vericalLine: {
                    width: 4
                },
                stepLine: {
                    width: 4
                },
                vericalStepLine: {
                    width: 4
                },
                scatterLine: {
                    width: 1
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                verticalArea: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                stepArea: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                verticalStepArea: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    },
                    line: {
                        opacity: 1,
                        width: 0
                    }
                },
                radarLine: {
                    width: 4,
                    markers: {
                        visible: false
                    }
                },
                radarArea: {
                    opacity: 0.5,
                    markers: {
                        visible: false,
                        size: 6
                    },
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
                },
                bullet: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING,
                    target: {
                        color: "#ff0000"
                    }
                },
                verticalBullet: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING,
                    target: {
                        color: "#ff0000"
                    }
                },
                notes: {
                    icon: {
                        size: 7,
                        border: {
                            width: 1
                        }
                    },
                    label: {
                        padding: 3,
                        font: SANS12
                    },
                    line: {
                        length: 10,
                        width: 1
                    },
                    visible: true
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
                },
                crosshair: {
                    tooltip: {
                        font: SANS12
                    }
                },
                notes: {
                    icon: {
                        size: 7,
                        border: {
                            width: 1
                        }
                    },
                    label: {
                        padding: 3,
                        font: SANS12
                    },
                    line: {
                        length: 10,
                        width: 1
                    },
                    visible: true
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

            defaults.polarArea = deepExtend({}, defaults.radarArea);
            defaults.polarLine = deepExtend({}, defaults.radarLine);

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
                },
                inactiveItems: {
                    labels: {
                        color: "#919191"
                    },
                    markers: {
                        color: "#919191"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: WHITE
                },
                notes: {
                    icon: {
                        background: "#3b3b3b",
                        border: {
                            color: "#8e8e8e"
                        }
                    },
                    label: {
                        color: WHITE
                    },
                    line: {
                        color: "#8e8e8e"
                    }
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
                },
                crosshair: {
                    color: "#8e8e8e"
                },
                notes: {
                    icon: {
                        background: "#3b3b3b",
                        border: {
                            color: "#8e8e8e"
                        }
                    },
                    label: {
                        color: WHITE
                    },
                    line: {
                        color: "#8e8e8e"
                    }
                }
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
                },
                inactiveItems: {
                    labels: {
                        color: "#27A5BA"
                    },
                    markers: {
                        color: "#27A5BA"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK,
                    background: WHITE,
                    opacity: 0.5
                },
                candlestick: {
                    downColor: "#c4d0d5",
                    line: {
                        color: "#9aabb2"
                    }
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#9aabb2"
                        }
                    },
                    label: {
                        color: "#293135"
                    },
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
                },
                crosshair: {
                    color: "#9aabb2"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#9aabb2"
                        }
                    },
                    label: {
                        color: "#293135"
                    },
                    line: {
                        color: "#9aabb2"
                    }
                }
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
                },
                inactiveItems: {
                    labels: {
                        color: "#66465B"
                    },
                    markers: {
                        color: "#66465B"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#ffffff"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#ffffff"
                        }
                    },
                    label: {
                        color: "#ffffff"
                    },
                    line: {
                        color: "#ffffff"
                    }
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
                    opacity: 0.5
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
                            opacity: 1
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
                },
                crosshair: {
                    color: "#ffffff"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#ffffff"
                        }
                    },
                    label: {
                        color: "#ffffff"
                    },
                    line: {
                        color: "#ffffff"
                    }
                }
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
                },
                inactiveItems: {
                    labels: {
                        color: "#919191"
                    },
                    markers: {
                        color: "#919191"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK,
                    background: WHITE,
                    opacity: 0.5
                },
                candlestick: {
                    downColor: "#dedede",
                    line: {
                        color: "#8d8d8d"
                    }
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#8e8e8e"
                        }
                    },
                    label: {
                        color: "#232323"
                    },
                    line: {
                        color: "#8e8e8e"
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
                },
                crosshair: {
                    color: "#8e8e8e"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#8e8e8e"
                        }
                    },
                    label: {
                        color: "#232323"
                    },
                    line: {
                        color: "#8e8e8e"
                    }
                }
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
                },
                inactiveItems: {
                    labels: {
                        color: "#B1BCC8"
                    },
                    markers: {
                        color: "#B1BCC8"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#293135",
                    background: "#eaeaec",
                    opacity: 0.5
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#4e5968"
                        }
                    },
                    label: {
                        color: "#4e5968"
                    },
                    line: {
                        color: "#4e5968"
                    }
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
                },
                crosshair: {
                    color: "#a6b1c0"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#4e5968"
                        }
                    },
                    label: {
                        color: "#4e5968"
                    },
                    line: {
                        color: "#4e5968"
                    }
                }
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
                },
                inactiveItems: {
                    labels: {
                        color: "#CBCBCB"
                    },
                    markers: {
                        color: "#CBCBCB"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#777777"
                        }
                    },
                    label: {
                        color: "#777777"
                    },
                    line: {
                        color: "#777777"
                    }
                },
                candlestick: {
                    downColor: "#c7c7c7",
                    line: {
                        color: "#787878"
                    }
                },
                overlay: {
                    gradient: "none"
                },
                border: {
                    _brightness: 1
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
                },
                crosshair: {
                    color: "#c7c7c7"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#777777"
                        }
                    },
                    label: {
                        color: "#777777"
                    },
                    line: {
                        color: "#777777"
                    }
                }
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
                },
                inactiveItems: {
                    labels: {
                        color: "#797979"
                    },
                    markers: {
                        color: "#797979"
                    }
                }
            },
            seriesDefaults: {
                border: {
                    _brightness: 1
                },
                labels: {
                    color: "#ffffff"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#cecece"
                        }
                    },
                    label: {
                        color: "#ffffff"
                    },
                    line: {
                        color: "#cecece"
                    }
                },
                line: {
                    markers: {
                        background: "#0e0e0e"
                    }
                },
                bubble: {
                    opacity: 0.6
                },
                scatter: {
                    markers: {
                        background: "#0e0e0e"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#0e0e0e"
                    }
                },
                candlestick: {
                    downColor: "#828282",
                    line: {
                        color: "#ffffff"
                    }
                },
                overlay: {
                    gradient: "none"
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
                },
                crosshair: {
                    color: "#cecece"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#cecece"
                        }
                    },
                    label: {
                        color: "#ffffff"
                    },
                    line: {
                        color: "#cecece"
                    }
                }
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

    registerTheme("moonlight", {
        chart: {
            title: {
                color: "#ffffff"
            },
            legend: {
                labels: {
                    color: "#ffffff"
                },
                inactiveItems: {
                    labels: {
                        color: "#A1A7AB"
                    },
                    markers: {
                        color: "#A1A7AB"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#ffffff"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#8c909e"
                        }
                    },
                    label: {
                        color: "#ffffff"
                    },
                    line: {
                        color: "#8c909e"
                    }
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
                        background: "#212a33"
                    }
                },
                bubble: {
                    opacity: 0.6
                },
                scatter: {
                    markers: {
                        background: "#212a33"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#212a33"
                    }
                },
                area: {
                    opacity: 0.3
                },
                candlestick: {
                    downColor: "#757d87",
                    line: {
                        color: "#ea9d06"
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
                        color: "#ea9d06"
                    }
                }
            },
            chartArea: {
                background: "#212a33"
            },
            seriesColors: ["#ffca08", "#ff710f", "#ed2e24", "#ff9f03", "#e13c02", "#a00201"],
            axisDefaults: {
                line: {
                    color: "#8c909e"
                },
                minorTicks: {
                    color: "#8c909e"
                },
                majorTicks: {
                    color: "#8c909e"
                },
                labels: {
                    color: "#ffffff"
                },
                majorGridLines: {
                    color: "#3e424d"
                },
                minorGridLines: {
                    color: "#2f3640"
                },
                title: {
                    color: "#ffffff"
                },
                crosshair: {
                    color: "#8c909e"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#8c909e"
                        }
                    },
                    label: {
                        color: "#ffffff"
                    },
                    line: {
                        color: "#8c909e"
                    }
                }
            }
        },
        gauge: {
            pointer: {
                color: "#f4af03"
            },
            scale: {
                rangePlaceholderColor: "#2f3640",

                labels: {
                    color: WHITE
                },
                minorTicks: {
                    color: "#8c909e"
                },
                majorTicks: {
                    color: "#8c909e"
                },
                line: {
                    color: "#8c909e"
                }
            }
        }
    });
    registerTheme("uniform", {
        chart: {
            title: {
                color: "#686868"
            },
            legend: {
                labels: {
                    color: "#686868"
                },
                inactiveItems: {
                    labels: {
                        color: "#B6B6B6"
                    },
                    markers: {
                        color: "#B6B6B6"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#686868"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#9e9e9e"
                        }
                    },
                    label: {
                        color: "#686868"
                    },
                    line: {
                        color: "#9e9e9e"
                    }
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
                        background: "#ffffff"
                    }
                },
                bubble: {
                    opacity: 0.6
                },
                scatter: {
                    markers: {
                        background: "#ffffff"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#ffffff"
                    }
                },
                area: {
                    opacity: 0.3
                },
                candlestick: {
                    downColor: "#cccccc",
                    line: {
                        color: "#cccccc"
                    },
                    border: {
                        _brightness: 1.5,
                        opacity: 1
                    },
                    highlight: {
                        border: {
                            color: "#cccccc",
                            opacity: 0.2
                        }
                    }
                },
                ohlc: {
                    line: {
                        color: "#cccccc"
                    }
                }
            },
            chartArea: {
                background: "#ffffff"
            },
            seriesColors: ["#527aa3", "#6f91b3", "#8ca7c2", "#a8bdd1", "#c5d3e0", "#e2e9f0"],
            axisDefaults: {
                line: {
                    color: "#9e9e9e"
                },
                minorTicks: {
                    color: "#aaaaaa"
                },
                majorTicks: {
                    color: "#888888"
                },
                labels: {
                    color: "#686868"
                },
                majorGridLines: {
                    color: "#dadada"
                },
                minorGridLines: {
                    color: "#e7e7e7"
                },
                title: {
                    color: "#686868"
                },
                crosshair: {
                    color: "#9e9e9e"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#9e9e9e"
                        }
                    },
                    label: {
                        color: "#686868"
                    },
                    line: {
                        color: "#9e9e9e"
                    }
                }
            }
        },
        gauge: {
            pointer: {
                color: "#527aa3"
            },
            scale: {
                rangePlaceholderColor: "#e7e7e7",

                labels: {
                    color: "#686868"
                },
                minorTicks: {
                    color: "#aaaaaa"
                },
                majorTicks: {
                    color: "#888888"
                },
                line: {
                    color: "#9e9e9e"
                }
            }
        }
    });

    registerTheme("bootstrap", {
        chart: {
            title: {
                color: "#343434"
            },
            legend: {
                labels: {
                    color: "#343434"
                },
                inactiveItems: {
                    labels: {
                        color: "#9A9A9A"
                    },
                    markers: {
                        color: "#9A9A9A"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#343434"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#b8b8b8"
                        }
                    },
                    label: {
                        color: "#343434"
                    },
                    line: {
                        color: "#b8b8b8"
                    }
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
                        background: "#ffffff"
                    }
                },
                bubble: {
                    opacity: 0.6
                },
                scatter: {
                    markers: {
                        background: "#ffffff"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#ffffff"
                    }
                },
                area: {
                    opacity: 0.3
                },
                candlestick: {
                    downColor: "#d0d0d0",
                    line: {
                        color: "#d0d0d0"
                    },
                    border: {
                        _brightness: 1.5,
                        opacity: 1
                    },
                    highlight: {
                        border: {
                            color: "#b8b8b8",
                            opacity: 0.2
                        }
                    }
                },
                ohlc: {
                    line: {
                        color: "#d0d0d0"
                    }
                }
            },
            chartArea: {
                background: "#ffffff"
            },
            seriesColors: ["#006dcc", "#49AFCD", "#5BB75B", "#FAA732", "#DA4F49", "#363636"],
            axisDefaults: {
                line: {
                    color: "#b8b8b8"
                },
                minorTicks: {
                    color: "#dddddd"
                },
                majorTicks: {
                    color: "#b8b8b8"
                },
                labels: {
                    color: "#343434"
                },
                majorGridLines: {
                    color: "#b8b8b8"
                },
                minorGridLines: {
                    color: "#dddddd"
                },
                title: {
                    color: "#343434"
                },
                crosshair: {
                    color: "#b8b8b8"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#b8b8b8"
                        }
                    },
                    label: {
                        color: "#343434"
                    },
                    line: {
                        color: "#b8b8b8"
                    }
                }
            }
        },
        gauge: {
            pointer: {
                color: "#0044cc"
            },
            scale: {
                rangePlaceholderColor: "#b8b8b8",
                labels: {
                    color: "#343434"
                },
                minorTicks: {
                    color: "#dddddd"
                },
                majorTicks: {
                    color: "#b8b8b8"
                },
                line: {
                    color: "#b8b8b8"
                }
            }
        }
    });

    registerTheme("flat", {
		 chart: {
            title: {
                color: "#4c5356"
            },
            legend: {
                labels: {
                    color: "#4c5356"
                },
                inactiveItems: {
                    labels: {
                        color: "#CBCBCB"
                    },
                    markers: {
                        color: "#CBCBCB"
                    }
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#4c5356"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#cdcdcd"
                        }
                    },
                    label: {
                        color: "#4c5356"
                    },
                    line: {
                        color: "#cdcdcd"
                    }
                },
                candlestick: {
                    downColor: "#c7c7c7",
                    line: {
                        color: "#787878"
                    }
                },
                area: {
                    opacity: 0.9
                },
                overlay: {
                    gradient: "none"
                },
                border: {
                    _brightness: 1
                }
            },
            seriesColors: ["#10c4b2", "#ff7663", "#ffb74f", "#a2df53", "#1c9ec4", "#ff63a5", "#1cc47b"],
            axisDefaults: {
                line: {
                    color: "#cdcdcd"
                },
                labels: {
                    color: "#4c5356"
                },
                minorGridLines: {
                    color: "#cdcdcd"
                },
                majorGridLines: {
                    color: "#cdcdcd"
                },
                title: {
                    color: "#4c5356"
                },
                crosshair: {
                    color: "#cdcdcd"
                },
                notes: {
                    icon: {
                        background: "transparent",
                        border: {
                            color: "#cdcdcd"
                        }
                    },
                    label: {
                        color: "#4c5356"
                    },
                    line: {
                        color: "#cdcdcd"
                    }
                }
            }
        },
        gauge: {
            pointer: {
                color: "#10c4b2"
            },
            scale: {
                rangePlaceholderColor: "#cdcdcd",

                labels: {
                    color: "#4c5356"
                },
                minorTicks: {
                    color: "#4c5356"
                },
                majorTicks: {
                    color: "#4c5356"
                },
                line: {
                    color: "#4c5356"
                }
            }
        }
	});

})(window.kendo.jQuery);

