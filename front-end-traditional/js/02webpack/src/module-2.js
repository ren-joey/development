import _ from 'lodash';

export default function(){
  var el = document.querySelector('#module-2');
  el.textContent = _.join(['This', 'is', '#module-2'], ' ');
}
