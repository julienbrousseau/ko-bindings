/**
 * Creates a custom knockout binding for highcharts
 * usage: data-bind="charting: <chartoptions>, data: <datapoints>"
 */
ko.bindingHandlers.charting = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        const $e = $(element);

        if ($e.highcharts == undefined) {
            $e.text("highcharts function not recognized.");
            return;
        }

        const options = ko.unwrap(valueAccessor());

        $e.highcharts(options);
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var chart = $(element).highcharts();

        // Grab some more data from another binding property
        const data = ko.unwrap(allBindingsAccessor.get("data")) || [];

        while (chart.series.length > 0) {
            chart.series[0].remove(false);
        }

        chart.colorCounter = 0; // So we don't get fancy new colors on every update

        $.each(data, function (i, serie) {
            chart.addSeries(serie, false);
        });

        const categories = ko.unwrap(allBindingsAccessor.get("categories"));

        if (categories && categories.length) {
            chart.xAxis[0].update({ categories: categories }, false);
        }

        chart.redraw();
    }
};