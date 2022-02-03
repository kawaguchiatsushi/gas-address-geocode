function getAddressGeo() {
 const FACILITY_COL         = 1;
 const SECONDSEARCHTERM_COL = 2;
 const ADDRESS_COL          = 3;
 const LAT_COL              = 4;
 const LNG_COL              = 5;
 const URL                  = 6;

 let sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
 let lastrow = sheet.getLastRow();
  
 for(let i=2; i<=lastrow; i++){ 
   let facility = sheet.getRange(i,FACILITY_COL).getValue();
   let secondSearchTerm = sheet.getRange(i,SECONDSEARCHTERM_COL).getValue();
   facility = facility + " " + secondSearchTerm;

   let geocoder = Maps.newGeocoder();
   geocoder.setLanguage('ja');
  
   let response = geocoder.geocode(facility);
    
   if(response['results'].length > 0){
      for (let j = 0; j < response['results'].length; j++){
        let colpuls  = 4*j;
        let latvalue = response['results'][j]['geometry']['location']['lat'];
        let lngvalue = response['results'][j]['geometry']['location']['lng'];
        let url = getMapUrl(latvalue,lngvalue);
        sheet.getRange(i,ADDRESS_COL+colpuls).setValue(response['results'][j]['formatted_address']);
        sheet.getRange(i,LAT_COL+colpuls).setValue(latvalue);
        sheet.getRange(i,LNG_COL+colpuls).setValue(lngvalue);
        sheet.getRange(i,URL+colpuls).setValue('=HYPERLINK("'+url+'","'+facility+'")');
      }
   }
 }
}

function getMapUrl(latitude,longitude){
  const common        = 'https://www.google.com/maps/search/?api=1&query=';
  const googleMapsUrl = common + latitude + ',' + longitude;
  return googleMapsUrl
}
