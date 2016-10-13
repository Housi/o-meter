'use strict'

// @ngInject
function oMeterService($filter, $injector) {

  this.getAngle = getAngle;
  this.getArcEnd = getArcEnd;
  this.format = format;
  this.validate = validate;

  /**
  *  calculate angle of oMeter needle
  * @param min [min=100]
  * @param max [max=500]
  * @param value [value=100]
  * @returns {Number} - angle of oMeter needle in degrees
  */
  function getAngle(min, max, value){
    var range = max - min;
    var percentage = (value - min)/range;
    return percentage*180;
  }

  /**
  *  calculate x, y of arc end
  * @param x [x=100] - arc center x
  * @param y [y=100] - arc center y
  * @param r [r=10] - radius
  * @param angle [angle=45] - angle in degrees
  * @returns { x: Number, y: Number} - x, y of arc end
  */
  function getArcEnd(x, y, r, angle){
    var angleRad = (angle-180)*Math.PI/180; // -180 because arc start point is located at 180* polar
    var xEnd = x + r*Math.cos(angleRad);
    var yEnd = y + r*Math.sin(angleRad);
    return { x: xEnd, y: yEnd };
  }

  /**
  *  validate values provided to oMeter
  * @param data [data = { min:100, max: 500, value: 200 }]
  * @returns { bool } - valid or not
  */
  function validate(data){
    return data.min && data.max && data.value && data.min < data.max && data.value > data.min && data.value < data.max;
  }

  /**
  * ideally this should be in separate module, like formatService or utils...
  * checks if filter for given format is defined
  * @param value [value=100] - base value for filter
  * @param format [format='currency'] - filter name
  * @param options ['usd'] - extra options passed to filter
  * @returns value - formatted string
  */
  function format(value, format, options){
    if(format && $injector.has(format + 'Filter')){
      return $filter(format)(value, options);
    }
    return value;
  }

}

module.exports = oMeterService;
