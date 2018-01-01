import axios from 'axios';
import { getIdToken } from './auth.js';

export {baseUrl, getProperties, getProperty, getLocality, updateProperty, getWishList};

function getProperties(offerType, propertyType, location){

  const parameters = { status: 1 }

  if(offerType !=''){
    parameters['offer_type'] = offerType;
  }

  if(propertyType != ''){
    parameters['property_type'] = propertyType;
  }

  if(location !=''){
    parameters['locality'] = location;
  }
  axios.defaults.headers.common['token'] = null;
  return axios.get(process.env.API_URL+'/property/', { params:parameters} ).then( response => response.data)

}

function getProperty(propertyNo){
  return axios.get(process.env.API_URL+'/property/'+propertyNo).then( response => response.data)
}

function getLocality(){
  return axios.get(process.env.API_URL+'/locality').then( response => response.data)
}

function updateProperty(basic){
  axios.defaults.headers.common['token'] = getIdToken();
  return axios.post(process.env.API_URL+'/broker/property/update', { id: basic.id, edit:'details', title: basic.title, description: basic.description}).then( response => response );
}

function getWishList(){
  axios.defaults.headers.common['token'] = getIdToken();
  return axios.get(process.env.API_URL+'/client/wishlist').then( response => response.data)
}
