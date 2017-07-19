myApp.controller('LogoutCtrl', function($scope,$route,$location,$http,$cookieStore,ContextPath) {

    $http.post(ContextPath +'/logout')
        .success(function (data, status) {

          //  console.log('Logout success   :   ' + JSON.stringify(data));
          //  console.log('Logout success status : ' + status);

            localStorage.removeItem('user');// remove item from session
            // Removing a cookie
            $cookieStore.remove('UserId');
            // Removing a cookie
            $cookieStore.remove('UserFullName');
            // Removing a cookie
            $cookieStore.remove('UserFirstname');
            // Removing a cookie
            $cookieStore.remove('OrgnId');
            // Removing a cookie
            $cookieStore.remove('OrgnLinks');
            // Removing a cookie
            $cookieStore.remove('productid_sendenq');
            // Removing a cookie
            $cookieStore.remove('UserEmailId');
            // Removing a cookie
            $cookieStore.remove('UserMobile');
            // Removing a cookie
            $cookieStore.remove('ReceivedEnqId');
            // Removing a cookie
            $cookieStore.remove('ReceivedQuoId');
            // Removing a cookie
            $cookieStore.remove('SentEnqId');




            //localStorage.removeItem('UserId');// remove item from session
            //localStorage.removeItem('UserFullName');// remove item from session
            //localStorage.removeItem('UserFirstname');// remove item from session
            //localStorage.removeItem('OrgnId');// remove item from session

            $location.path('/home');
            $route.reload();
           // window.location.reload(true);

        })
        .error(function (data, status) {
          //  console.log("Logout success Error Data : " +data);
          //  console.log("Logout success Error Status : " +status);
        });


});