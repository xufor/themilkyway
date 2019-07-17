import { store } from './index';
import { ACCEPTABLE_RESPONSE_MESSAGE } from './components/loginPage/loginPage';
import { RESET_ANOMALY } from './reducers/anomalyReducer';
import defaultImage from './assets/dPic.png';

export const throwOut = (history) => {
    if(store.getState().credentials.message !== ACCEPTABLE_RESPONSE_MESSAGE) {
        history.push('/');
        document.location.reload();
    }
};

export const resetAnomaly = () => {
    store.dispatch({type: RESET_ANOMALY});
};

// return a sample image or valid url based on the image field in response
export const retImg = (field, height, width) => {
    if(field === 'No Image available.')
        return defaultImage;
    else
        return `https://res.cloudinary.com/xufor/image/upload/c_fill,f_auto,g_faces,h_${height},q_auto,r_100,w_${width}/${field}`;
};

export const reloader = (delay) => {
    setTimeout(() => {
        window.location.reload();
    }, delay);
};

// export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const checkScreenSize = () => {

};