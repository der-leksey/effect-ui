import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
window.noUiSlider = noUiSlider;

import EFPlugin from './js/plugin.js';
if (window.Vue) Vue.use(EFPlugin);