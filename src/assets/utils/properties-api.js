import axios from 'axios';

const BASE_URL = 'http://103.16.170.117:8090/property';

export {getProperties, getSales, getRents, getProperty};


function getProperties(offerType, propertyType, location){

  const parameters = { status: 2  }

  if(offerType !=''){
    parameters['offer_type'] = offerType;
  }

  if(propertyType != ''){
    parameters['property_type'] = propertyType;
  }

  if(location !=''){
    parameters['locality'] = location;
  }

  return axios.get( BASE_URL, { params:parameters} ).then( response => response.data)

}

function getSales(property_type, location){
  const parameters = {offer_type: 1, status: 2}

  if(property_type){
    parameters['property_type'] = property_type;
  }

  if(location){
    parameters['locality'] = location;
  }

  return axios.get( BASE_URL, { params:parameters} ).then( response => response.data)
}

function getRents(){
  const parameters = {offer_type: 2, status: 2}
  return axios.get( BASE_URL, { params:parameters} ).then( response => response.data)
}

function getProperty(propertyNo){
  const parameters = {property_no:propertyNo}
  return axios.get( BASE_URL, { params:parameters} ).then( response => response.data)
}
