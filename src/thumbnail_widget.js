
function ThumbnailWidget(container, experiment_id, on_ready) {
    this.container = container;
    this.experiment_id = experiment_id;
    this.on_ready = on_ready;

    this.h_dims = [528,320];
    this.v_dims = [697,557];
    
    var _self = this;

    var _img_h = null;

    var _inside = null;
    var _outside = null;

    var _slider_h = null;
    var _slider_v = null;
    
    var _image_h = null;
    var _image_v = null;

    function h_index_change() {
        var xoff = (_self.v_dims[0] - _self.h_dims[0]) / 2;
        var yoff = (_self.v_dims[1] - _self.h_dims[1]) / 2;

        _inside.width(_self.h_dims[0])
            .height(_self.h_dims[1])
            .css('left', xoff)
            .css('top', yoff)

        _img_h.css("left", -_self.h_dims[0] * _slider_h.val())
        _img_h.show();
        _img_v.hide();
    }

    function v_index_change() {
        var xoff = (_self.v_dims[0] - _self.h_dims[0]) / 2;
        var yoff = (_self.v_dims[1] - _self.h_dims[1]) / 2;

        _inside.width(_self.v_dims[0])
            .height(_self.v_dims[1])
            .css('left', 0)
            .css('top', 0)

        _img_v.css("left", -_self.v_dims[0] * _slider_v.val())
        _img_v.show();
        _img_h.hide();
    }

    function init() {
        download(init_widget);
    }

    function download(on_success) {
        download_h_thumbnail(_self.experiment_id, function(image) {
            _image_h = image;
            
            download_v_thumbnail(_self.experiment_id, function(image) {
                _image_v = image;

                on_success();
            });
        });
    }

    function init_widget() {
        _outside = $("<div>")
            .width(_self.v_dims[0])
            .height(_self.v_dims[1])
            .css('position','relative')
            .css('background-color','black');

        var xoff = (_self.v_dims[0] - _self.h_dims[0]) / 2;
        var yoff = (_self.v_dims[1] - _self.h_dims[1]) / 2;

        _img_h = $("<img>")
            .css('max-width', _image_h.width)
            .attr("src", _image_h.src)
            .css('position', 'absolute');

        _img_v = $("<img>")
            .css('max-width', _image_v.width)
            .attr("src", _image_v.src)
            .css('position', 'absolute');

        _inside = $("<div>")
            .width(_self.v_dims[0])
            .height(_self.v_dims[1])
            .css('position', 'relative')
            .css('overflow','hidden')
            .css('background-color', 'black');

        _inside.append(_img_h);
        _inside.append(_img_v);
        
        _slider_h = $('<input type="range" id="h_angle" min="0" value="0" max="35" step="1">')
            .width(_self.v_dims[0]-50)
            .css('position', 'absolute')
            .css('left', 25)
            .css('top', 5);

        _slider_v = $('<input type="range" id="v_angle" min="0" value="0" max="35" step="1">')
            .width(_self.v_dims[1]-50)
            .css('position', 'absolute')
            .css("transform", "rotate(90deg)")
            .css("transform-origin", "0 0")
            .css('position', 'absolute')
            .css('left', 20)
            .css('top', 25);

        _outside.append(_inside);
        _outside.append(_slider_v);
        _outside.append(_slider_h);

        _self.container.append(_outside);

        _slider_h.on("input", h_index_change);
        _slider_v.on("input", v_index_change);

        _self.on_ready && _self.on_ready();
    }
    
    init();
}

function download_h_thumbnail(experiment_id, on_success) {
    var url = "http://api.brain-map.org/grid_data/blended_thumbnail/" + experiment_id;
    
    var image = new Image();
    image.onload = function() {
        on_success(image);
    }
    image.src = url;
}

function download_v_thumbnail(experiment_id, on_success) {
   var url = "http://api.brain-map.org/grid_data/blended_vertical_thumbnail/" + experiment_id;
    
    var image = new Image();
    image.onload = function() {
        on_success(image);
    }
    image.src = url;
}

module.exports.ThumbnailWidget = ThumbnailWidget;
