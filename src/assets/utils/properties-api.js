import axios from 'axios';

const BASE_URL = 'http://103.16.170.117:8090'
const API_URL = 'http://103.16.170.117:8090/property';

export {baseUrl, getProperties, getProperty, getLocality};

function baseUrl(){
  return BASE_URL;
}


function getProperties(offerType, propertyType, location){

  const parameters = { status: 1  }

  if(offerType !=''){
    parameters['offer_type'] = offerType;
  }

  if(propertyType != ''){
    parameters['property_type'] = propertyType;
  }

  if(location !=''){
    parameters['locality'] = location;
  }

  return axios.get( API_URL, { params:parameters} ).then( response => response.data)

}

function getProperty(propertyNo){
  return axios.get(API_URL+'/'+propertyNo).then( response => response.data)
}

function getLocality(){
  return axios.get(BASE_URL+'/locality').then( response => response.data)
}
