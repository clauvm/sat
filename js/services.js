angular.module('starter.services', [])

.factory('Users', function($resource) {
  // Might use a resource here that returns a JSON array
    return $resource('http://satdeslizamientos-cavm.rhcloud.com/users/:userID', {userID:'@_id'}, {update:{method:'PUT'}});

});
