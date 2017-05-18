var api = {
  getlatlon(){
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAfjek5Fm-F09g8ELtDCGjGuQeTMlH9VJ4';
    return fetch(url).then((res) => res.json());
  }
};
