'use strict';

$(document).ready(function () {
    var tmpl = '<li><a class="selectedCtry" href="javascript:" data-east="_east" data-west="_west" data-south="_south" data-north="_north"><p>countryName</p></a></li>';
    var html = '';
    $.get('http://api.geonames.org/countryInfo?username=arvindr21&type=json', function (data) {
        $(data.geonames).each(function (k, v) {
            html += tmpl.replace('countryName', v.countryName).replace('_east', v.east).replace('_west', v.west).replace('_south', v.south).replace('_north', v.north);
        });
        $('.countries').html(html);
        $('.selectedCtry').on('click', function () {
            var $this = $(this);
            var n = $this.data('north'),
                e = $this.data('east'),
                s = $this.data('south'),
                w = $this.data('west');

            $.get('http://api.geonames.org/weatherJSON?username=arvindr21&type=json&south=' + s + '&north=' + n + '&east=' + e + '&west=' + w, function (data) {
                if (data.weatherObservations && data.weatherObservations.length > 0) {
                    var _data = data.weatherObservations[0];
                    $('#temp').text(_data.temperature + ' Celsius');
                    $('#wind').text(_data.windSpeed + ' Knots');
                    $('#clouds').text(_data.clouds);
                    $('#humidity').text(_data.humidity);
                    $('#source').text(_data.stationName);

                    $('#details').show();
                    $('#main').hide();

                } else {
                    alert('No data available');
                }
                $('#back').on('click', function () {
                    $('#details').hide();
                    $('#main').show();
                });

            });
        });
    });
});
