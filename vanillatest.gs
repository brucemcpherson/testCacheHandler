function testcache() {
  var cache = CacheService.getScriptCache();
  
  var start = new Date().getTime();
  var key = "some key";
  
  for (var tries = 0 , attempts = 0, stale =0 ; tries < 20 ; tries ++ ) {
    // something to write
    var text = "some text and add date to make sure we pick up the current one " + new Date().getTime();
    
    // write it out and keep trying till we get a match back

    cache.put(key,text)
    
    for (var result = "" ; text !== result ; Utilities.sleep(500)) {
      result = cache.get(key);
      if (result && result !== text) stale++;
      attempts ++;
    }
  }
  Logger.log('average seconds to register:' + Math.round((new Date().getTime() - start)/tries/1000));
  Logger.log('average number of attempts:' + attempts/tries);
  Logger.log('average number of stale values:' + stale/attempts);
  
}
