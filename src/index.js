'use strict';

var LightningVisualization = require('lightning-visualization');
var _ = require('lodash');
var TW = require('./thumbnail_widget.js');

/* 
 * Uncomment this code to require an optional stylesheet
 */
// var fs = require('fs');
// var styles = fs.readFileSync(__dirname + '/styles/style.css');


/*
 * Extend the base visualization object
 */

var Visualization = LightningVisualization.extend({

    init: function() {
        /*
         * FILL IN Add any logic for initializing the visualization
         */ 
        this.render();
    },

    /*
     * optionally pass a string of CSS styles 
     */
    // styles: styles,

    render: function() {
        /*
         * FILL IN Render the visualization
         */

        /*
         * FILL IN Get data / selector from this.data and this.selector
         */
        var container = $(this.selector);
        container.html("");
        new TW.ThumbnailWidget(container, this.data.experiment_id);
    },

    formatData: function(data) {
        /*
         * Format your data from a raw JSON blob
         */
        return data;
    },

    updateData: function(formattedData) {
        this.data = formattedData;
        /*
         * FILL IN Re-render your visualization
         */
    },

    appendData: function(formattedData) {    
        /*
         * FILL IN Update this.data to include the newly formatted data
         */

        /*
         * FILL IN Re-render the visualization
         */    
    }

});


module.exports = Visualization;
