angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('UsersCtrl', function($scope, Users, $stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.find = function () {
     $scope.usuarios = Users.query(); //para que saque todos los usuarios
  };

  $scope.findOne = function () {
     $scope.usuario = Users.get({
        userID : $stateParams.userID
     }); 
  };


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
   var client = new Messaging.Client("test.mosquitto.org", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));
 console.log("en lista");
//Connect Options
 var options = {
     timeout: 3,
     //Gets Called if the connection has sucessfully been established
     onSuccess: function () {
         //alert("Connected");
          //$('#estado').text('Conectado');
         client.subscribe('/prueba/server', {qos: 2});
         console.log("conectado!")
     },
     //Gets Called if the connection could not be established
     onFailure: function (message) {
        //$('#estado').text('Error de conexion:');
        console.log('Error de conexion')
        //conectar();
        // alert("Connection failed: " + message.errorMessage);
     }
 };
 $scope.connect = function () {
    client.connect(options);
 }
 
// function conectar () {
//      client.connect(options);
// }
// function erase(){
//     $('#messages').empty();

// }

 //Gets  called if the websocket/mqtt connection gets disconnected for any reason
 // client.onConnectionLost = function (responseObject) {
 //     //Depending on your scenario you could implement a reconnect logic here
 //      $('#messages').empty();
 //      $('#estado').text('Desconectado');
 //     //alert("connection lost: " + responseObject.errorMessage)

 // };

 //Gets called whenever you receive a message for your subscriptions
 client.onMessageArrived = function (message) {
     //Do something with the push message you received
     $('#messages').append('<span>' + message.payloadString + '</span><br/>');
 }; 
});
