function getQueryParam(param){
  const searchStr = location.search.substr(1);

  if (!searchStr.length)
    return undefined;

  const queryObj = {};
  const queryArr = searchStr.split(/&/).map(v => v.split(/=/));

  queryArr.forEach(function(data){
    queryObj[data[0]] = data[1]
  });

  return queryObj[param] || undefined;
}
