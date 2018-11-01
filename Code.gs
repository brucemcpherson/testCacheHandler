function getCacheHandler() {
  return new cCacheHandler.CacheHandler();
}
function getPropertyHandler() {
  return new cCacheHandler.CacheHandler(20, undefined, undefined, undefined, PropertiesService.getScriptProperties());
}

function cleanup() {
  // clean up any expired cache items in my property store
  getPropertyHandler().propertyHousekeeping();
}
function myFunction() {
  
  // get a cache handler using my own property service, 20 seconds lifetime
  var propCache = getPropertyHandler();

  // do the same thing using regular cache
  var cache = getCacheHandler();
  
  // get a cache handler using my own property service, use a silo
  var propCacheSilo = new cCacheHandler.CacheHandler(20, 'some silo', undefined, undefined, PropertiesService.getScriptProperties());

  // do the same thing using regular cache
  var cacheSilo = new cCacheHandler.CacheHandler(20,'some silo');
  
  // get a cache handler using my own property service, use a silo and a cache community
  var propCacheSiloCommunity = new cCacheHandler.CacheHandler(20, 'some silo', undefined, undefined, PropertiesService.getScriptProperties(),'some community');

  // do the same thing using regular cache
  var cacheSiloCommunity = new cCacheHandler.CacheHandler(20,'some silo',undefined, undefined, undefined, 'some community');

  tests (cache);
  tests (propCache);
  tests (cacheSilo);
  tests (propCacheSilo);
  tests (cacheSiloCommunity);
  tests (propCacheSiloCommunity);
  
  
  // clean up any expired cache items in my property store
  propCache.propertyHousekeeping();
  
}
function tests(cache) {
  
  Logger.log('using ' + (cache.isProperties() ? 'properties' : 'cache' ) );
  
  var tob = "something"+new Date().getTime();
  // write something - no key
  cache.putCache(tob);
  // read it back
  var fromb = cache.getCache();
  Logger.log('  no key-' + (tob === fromb ? 'success': (fromb ? 'stale' :'failed')));

  
  // write something - use a key
  var tob = "something with keys"+new Date().getTime();
  cache.putCache(tob,'some keys','more keys');
  // read it back
  fromb = cache.getCache('some keys','more keys');
  Logger.log('  keys-' + (tob === fromb ? 'success': (fromb ? 'stale' :'failed')));

  
  // write something large - use a key
  tob = Array(210).join('x')+new Date().getTime();
  cache.putCache(tob,'some keys','more keys','big stuff');
  // read it back
  fromb = cache.getCache('some keys','more keys','big stuff');
  Logger.log('  big stuff-' + (tob === fromb ? 'success': (fromb ? 'stale' :'failed')));

}
