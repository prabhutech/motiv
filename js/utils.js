App.service('Utils', ['$http', '$location',
function($http, $location) {
    return {
        millisecondsToStr : function(t) {
            var cd = 24 * 60 * 60 * 1000, ch = 60 * 60 * 1000, d = Math.floor(t / cd), h = '0' + Math.floor((t - d * cd) / ch), m = '0' + Math.round((t - d * cd - h * ch) / 60000);
            return [(d + ' ' + I8n.days), (h.substr(-2) + ' ' + I8n.hours), (m.substr(-2) + ' ' + I8n.minutes)].join(', ');
        },
        millisecondsToDate : function(t) {
            if (t != null) {
                var date = new Date(t);
                return date.toString();
            }
        },
        plotChart : function(resp, chartParam, timestamp) {
            usersResp = resp;
            var usersCol = [];
            usersCol.push({
                "id" : "timestamp",
                "label" : "Timestamp",
                "type" : "string"
            });

            $.each(usersResp, function(key, value) {
                usersCol.push({
                    id : value.name,
                    label : value.name,
                    type : "number"
                });
            });

            var rowsData = [];
            $.each(timestamp, function(key, tVal) {
                var cArray = [];
                cArray.push({
                    "v" : tVal
                });

                $.each(usersResp, function(key, uVal) {
                    $.each(uVal.Readings, function(key, rVal) {
                        if (rVal.timestamp == tVal) {
                            cArray.push({
                                "v" : rVal[chartParam]
                            });
                        }
                    });
                });

                var cObj = {
                    "c" : cArray
                };
                rowsData.push(cObj);
            });

            // for (var i = 0; i < $scope.users.length; i++) {
            // usersCol.push({
            // id : $scope.users[i].name,
            // label : $scope.users[i].name,
            // type : "string"
            // });
            // }
            var chart = {};
            chart.type = "LineChart";
            chart.displayed = false;
            chart.cssStyle = "height:600px; width:100%;";
            chart.data = {
                "cols" : usersCol,
                "rows" : rowsData
            };

            chart.options = {
                "title" : chartParam + " per workout",
                "isStacked" : "true",
                "fill" : 20,
                "displayExactValues" : true,
                "vAxis" : {
                    "title" : chartParam,
                    "gridlines" : {
                        "count" : 10
                    }
                },
                "hAxis" : {
                    "title" : "Timestamp"
                }
            };

            var formatCollection = [{
                name : "color",
                format : [{
                    columnNum : 4,
                    formats : [{
                        from : 0,
                        to : 3,
                        color : "white",
                        bgcolor : "red"
                    }, {
                        from : 3,
                        to : 5,
                        color : "white",
                        fromBgColor : "red",
                        toBgColor : "blue"
                    }, {
                        from : 6,
                        to : null,
                        color : "black",
                        bgcolor : "#33ff33"
                    }]
                }]
            }, {
                name : "arrow",
                checked : false,
                format : [{
                    columnNum : 1,
                    base : 19
                }]
            }, {
                name : "date",
                format : [{
                    columnNum : 5,
                    formatType : 'long'
                }]
            }, {
                name : "number",
                format : [{
                    columnNum : 4,
                    prefix : '$'
                }]
            }, {
                name : "bar",
                format : [{
                    columnNum : 1,
                    width : 100
                }]
            }];

            chart.formatters = {};

            return chart;
        }
    };
}]);
