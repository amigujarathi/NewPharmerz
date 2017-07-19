
/*-----------------------------------
 Menu bar routing
 -----------------------------------*/


myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.caseInsensitiveMatch = true; // case sensitive remove
    $routeProvider.
      when('/home', {
        templateUrl : "views/home.html",
        controller: "HomeCtrl"
      }).
	  when('/product', {
        templateUrl : "views/product.html",
        controller: "ProductCtrl"
      }).
	  when('/aboutus', {
         templateUrl : "views/aboutus.html",
         controller: "AboutusCtrl"
      }).
      when('/contactus', {
         templateUrl : "views/contactus.html",
         controller: "ContactusCtrl"
      }).
      when('/categories', {
         templateUrl : "views/categories.html",
		 controller: "CategoriesCtrl"
      }).
      when('/privacypolicy', {
         templateUrl : "views/privacypolicy.html",
         controller: "PrivacypolicyCtrl"
      }).
      when('/termsofsales', {
         templateUrl : "views/termsofsales.html",
         controller: "TermsofsalesCtrl"
      }).
      when('/reportabout', {
         templateUrl : "views/reportabout.html",
         controller: "ReportaboutCtrl"
      }).
      when('/login', {
        templateUrl : "views/login.html",
        controller: "loginCtrl"
      }).
      when('/register', {
        templateUrl : "views/register.html",
        controller: "registerCtrl"
      }).
      when('/logout', {
        templateUrl : "views/home.html",
        controller: "LogoutCtrl"
      }).
      when('/enquiry', {
        templateUrl : "views/enquries.html",
        controller: "EnquriesCtrl"
      }).
      when('/quotation', {
        templateUrl : "views/quotation.html",
        controller: "QuotationCtrl"
     }).
     when('/purchaseorder', {
        templateUrl : "views/purchaseorder.html",
        controller: "PurchaseorderCtrl"
     }).
      when('/admindashbord', {
          templateUrl : "views/admin-home.html",
          controller: "AdminhomeCtrl"
      }).
      when('/organisationprofile', {
        templateUrl : "views/organisation-profile.html",
        controller: "OrgprofileCtrl"
      }).
      when('/location', {
        templateUrl : "views/location.html",
        controller: "LocationCtrl"
      }).
      when('/taxes', {
        templateUrl : "views/taxes.html",
        controller: "TaxCtrl"
      }).
      when('/sendenquiry', {
        templateUrl : "views/sendenquiry.html",
        controller: "SendEnqCtrl"
      }).
      when('/showsendenquiry', {
        templateUrl : "views/showsendenquiry.html",
        controller: "ShowSendEnqCtrl"
      }).
      when('/receivedenquiry', {
        templateUrl : "views/receivedenquiry.html",
        controller: "ReceivedEnqCtrl"
      }).
      when('/sentquotation', {
        templateUrl : "views/sentquotation.html",
        controller: "SentQuoCtrl"
       }).
      when('/receviedquotation', {
        templateUrl : "views/receivedquotation.html",
        controller: "ReceivedQuoCtrl"
      }).
      // when('/sentpo', {
      //   templateUrl : "views/sentpo.html",
      //   controller: "SentPooCtrl"
      // }).
      // when('/receivedpo', {
      //   templateUrl : "views/receivedpo.html",
      //   controller: "ReceivedPooCtrl"
      // }).
      when('/generatequotation', {
        templateUrl : "views/generatequotation.html",
        controller: "GenerateQuotationCtrl"
      }).
      // when('/generatepo', {
      //   templateUrl : "views/generatepo.html",
      //   controller: "GeneratePoCtrl"
      //  }).
      when('/addproduct', {
        templateUrl : "views/addproduct.html",
        controller: "AddproductCtrl"
      }).
      when('/editproduct', {
        templateUrl : "views/editproduct.html",
        controller: "EditproductCtrl"
       }).
      when('/viewproduct', {
        templateUrl : "views/viewproduct.html",
        controller: "ViewproductCtrl"
       }).
      when('/verifymobile', {
        templateUrl : "views/verifymobile.html",
        controller: "VerifymobileCtrl"
       }).
       when('/verifyemail', {
        templateUrl : "views/verifyemail.html",
        controller: "VerifyemailCtrl"
       }).
       otherwise({
        redirectTo: '/home'
      });

  }]);