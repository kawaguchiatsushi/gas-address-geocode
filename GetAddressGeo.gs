function getAddressGeo() {
 const common  = 
      'https://www.google.com/maps/search/?api=1&query=';
 let ws = 
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
 for(let i=2; i<=ws.getLastRow(); i++){ 
   let facilty = ws.getRange(i,1).getValue() 
                  + " " + ws.getRange(i,2).getValue();
   let geo = Maps.newGeocoder();
   geo.setLanguage('ja');
   let res = geo.geocode(facilty);
   if(res['results'].length > 0){
      for (let j = 0; j < res['results'].length; j++){
        let lat = res['results'][j]['geometry']['location']['lat'];
        let lng = res['results'][j]['geometry']['location']['lng'];
        let url = common + lat + ',' + lng;
        ws.getRange(i,3+ 4*j).setValue(
          res['results'][j]['formatted_address']
          );
        ws.getRange(i,4+ 4*j).setValue(lat);
        ws.getRange(i,5+ 4*j).setValue(lng);
        ws.getRange(i,6+ 4*j).setValue(
          '=HYPERLINK("'+url+'","'+facilty+'")'
          );
      }
   }
 }
}



