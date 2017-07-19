myApp.controller('ViewproductCtrl', function($scope,$rootScope,$route,$location,$cookies,$timeout,Page,baseURl,errorMessage,$http,sessionmaintain,sessionout,ContextPath) {

    var vm = $scope;

    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    Page.setTitle('View Product'); // To set Page Title using factory
    /*
     * factory Name  - sessionmaintain
     * Created By   - vaibhav godambe
     * Created On   - 20 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This factory is used to maintain session .
     */

    // check session
    $scope.session = sessionmaintain.checksession();
    if($scope.session == false)
    {
        $location.path('/home');
    }
    else
    {
        $scope.showlogin = false;
        $scope.showlogout = true;
    }

    // Retrieving a cookie
    var userid_Cookie = $cookies.get('UserId'); // get user id cookies
    // Retrieving a cookie
    vm.fullname = $cookies.get('UserFullName'); // get user full name cookies
    // Retrieving a cookie
    var Orgnid_Cookie = $cookies.get('OrgnId'); // get orgn id cookies
    //console.log("Orgnid_Cookie : " +Orgnid_Cookie);

    vm.Baseurl =  baseURl; // base url

    vm.BaseurlOrgId =  baseURl + "organizations/" + Orgnid_Cookie; // url orgid


    vm.verifyUsrId = userid_Cookie.replace(/-/g , "").toUpperCase();
    //console.log("Converted user id : " +vm.verifyUsrId);


    /*
     * Api Name  - check verify email
     * Created By   - vaibhav godambe
     * Created On   - 5 april 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to check verify email details.
     */

    var emailflagconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get( ContextPath +'/api/v1/emailflagverification/'+ vm.verifyUsrId, emailflagconfig)
        .success(function(data,status){
          //console.log("emailflag success data : " + JSON.stringify(data));
          //console.log("emailflag success sataus : " + status);

            vm.emailverified = data.verified;
            //console.log("emailverified : " + vm.emailverified);

            if(vm.emailverified == 1)
            {
                vm.veriEmail = true;
            }

        })
        .error(function(data,status){
            if(status == 400)
            {
                vm.veriEmail = false;
                vm.emailverified = 0;
            }
          //console.log("emailflag error data : " + data);
           //console.log("emailflag error status : " + status);

        });


    /*
     * Api Name  - check verify mobile
     * Created By   - vaibhav godambe
     * Created On   - 5 april 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to check verify mobile details.
     */

    var mobileflagconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get( ContextPath +'/api/v1/mobileflagverification/'+ vm.verifyUsrId, mobileflagconfig)
        .success(function(data,status){
          //console.log("mobileflag success data : " + JSON.stringify(data));
          //console.log("mobileflag success sataus : " + status);

            vm.mobileverified = data.verified;
            //console.log("mobileverified : " + vm.mobileverified);

            if(vm.mobileverified == 1)
            {
                vm.veriMobile = true;
            }

        })
        .error(function(data,status){
            if(status == 400)
            {
                vm.veriMobile = false;
                vm.mobileverified = 0;
            }
           //console.log("mobileflag error data : " + data);
          //console.log("mobileflag error status : " + status);
        });



    /*
     * Method Name  - getSuppliersProductDetails
     * Created By   - vaibhav godambe
     * Created On   - 6 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get product using orgnization id  .
     */

    //config parameter is need to send client data to server in ajax request
    var viewproductconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.getSuppliersProductDetails = function (id) {

        vm.Suppler_Product = ' ';

        if(id == 1)
        {
            vm.suppliersPage = 0;
            vm.suppliersPageLast = 0;
        }

        if(id == 1)
        {
            vm.loading = true; //show loader

           $http.get(ContextPath +'/api/v1/suppliers/search/findByOrganizationId?organizationId='+ Orgnid_Cookie +'&projection=detail', viewproductconfig)
            .success(function (data, status) {
                //console.log('Suppliers Product details  : ' + JSON.stringify(data));
                //console.log('Suppliers Product details status : ' + status);
                vm.loading = false; //hide loader
                if(data.page.totalElements != 0)
                {
                    vm.Suppler_Product = data._embedded.suppliers; // Product
                }
                else
                {
                    vm.Suppler_Product = [];
                }

                vm.suppliersProdlength = data.page.totalElements;
                //console.log("suppliersProdlength" + vm.suppliersProdlength);
                vm.suppliersPageLast = data.page.totalPages;
                //console.log("Last page" + vm.last);
            })
            .error(function (data, status) {
                vm.loading = false; //hide loader
                sessionout.checksessionout(status);
                //console.log("Suppliers Product details Error Data : " +data);
                //console.log("Suppliers Product details Error Status : " +status);
            });
        }
        else
        {
            vm.loading = true; //show loader

            $http.get(ContextPath +'/api/v1/suppliers/search/findByOrganizationId?organizationId='+ Orgnid_Cookie +'&projection=detail&page='+ vm.suppliersPage , viewproductconfig)
                .success(function (data, status) {
                    //console.log('Suppliers Product details page vice  : ' + JSON.stringify(data));
                    //console.log('Suppliers Product details status : ' + status);
                    vm.loading = false; //hide loader

                    if(data.page.totalElements != 0)
                    {
                        vm.Suppler_Product = data._embedded.suppliers; // Product
                    }
                    else
                    {
                        vm.Suppler_Product = [];
                    }

                    vm.suppliersProdlength = data.page.totalElements;
                    //console.log("suppliersProdlength" + vm.suppliersProdlength);
                    vm.suppliersPageLast = data.page.totalPages;
                    //console.log("Last page" + vm.last);
                })
                .error(function (data, status) {
                    vm.loading = false; //hide loader
                    sessionout.checksessionout(status);
                    //console.log("Suppliers Product details Error Data : " +data);
                    //console.log("Suppliers Product details Error Status : " +status);
                });
        }

    }



    /*
     * Method Name  - firsttpage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to firsttpage.
     */

    vm.firstpage = function () {
        if(vm.suppliersPage != 0)
        {
            vm.suppliersPage = 0;
            vm.getSuppliersProductDetails(2);
        }
    }

    /*
     * Method Name  - lasttpage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to lasttpage.
     */

    vm.lastpage = function () {
        //alert(typeof vm.last);

        var currentLast = vm.suppliersPageLast - 1;
        if(vm.suppliersPage != currentLast)
        {
            vm.suppliersPage = parseInt(vm.suppliersPageLast - 1);
            //alert("last page : " + vm.suppliersPage);
            vm.getSuppliersProductDetails(2);
        }
    }

    /*
     * Method Name  - previouspage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to previouspage.
     */
    vm.previouspage = function () {

        if(vm.suppliersPage != 0)
        {
            vm.suppliersPage = vm.suppliersPage - 1;
            //alert("previous page : " + vm.suppliersPage);
            vm.getSuppliersProductDetails(2);
        }

    }

    /*
     * Method Name  - nextpage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to nextpage.
     */
    vm.nextpage = function () {
        var currentLast = vm.suppliersPageLast - 1;
        if(vm.suppliersPage != currentLast)
        {
            vm.suppliersPage = vm.suppliersPage + 1;
            // alert("next page : " + vm.suppliersPage);
            vm.getSuppliersProductDetails(2);
        }

    }

    /*
     * Method Name  - getPurchasersProductDetails
     * Created By   - vaibhav godambe
     * Created On   - 6 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get product using orgnization id  .
     */


    vm.getPurchasersProductDetails = function (id) {
        vm.Purchasers_Product = ' ';

        if(id == 1)
        {
            vm.purchasersPage = 0;
            vm.purchasersPageLast = 0;
        }

        if(id == 1)
        {

            vm.loading = true; //show loader


            $http.get(ContextPath + '/api/v1/purchasers/search/findByOrganizationId?organizationId=' + Orgnid_Cookie + '&projection=detail', viewproductconfig)
                .success(function (data, status) {
                    //console.log('Purchasers Product details  : ' + JSON.stringify(data));
                    //console.log('Purchasers Product details status : ' + status);
                    vm.loading = false; //hide loader

                    if (data.page.totalElements != 0) {
                        vm.Purchasers_Product = data._embedded.purchasers; // Product
                    }
                    else {
                        vm.Purchasers_Product = [];
                    }

                    vm.purchasersProdlength = data.page.totalElements;
                    //console.log("purchasersProdlength :" + vm.purchasersProdlength);
                    vm.purchasersPageLast = data.page.totalPages;
                    //console.log("Last page" + vm.last);
                })
                .error(function (data, status) {
                    vm.loading = false; //hide loader
                    sessionout.checksessionout(status);
                    //console.log("Purchasers Product details Error Data : " + data);
                    //console.log("Purchasers Product details Error Status : " + status);
                });
        }
        else
        {

            vm.loading = true; //show loader
            $http.get(ContextPath + '/api/v1/purchasers/search/findByOrganizationId?organizationId=' + Orgnid_Cookie + '&projection=detail&page=' + vm.purchasersPage , viewproductconfig)
                .success(function (data, status) {
                    //console.log('Purchasers Product details  page vice: ' + JSON.stringify(data));
                    //console.log('Purchasers Product details status : ' + status);
                    vm.loading = false; //hide loader
                    if (data.page.totalElements != 0) {
                        vm.Purchasers_Product = data._embedded.purchasers; // Product
                    }
                    else {
                        vm.Purchasers_Product = [];
                    }

                    vm.purchasersProdlength = data.page.totalElements;
                    //console.log("purchasersProdlength :" + vm.purchasersProdlength);
                    vm.purchasersPageLast = data.page.totalPages;
                    //console.log("Last page" + vm.last);
                })
                .error(function (data, status) {
                    vm.loading = false; //hide loader
                    sessionout.checksessionout(status);
                    //console.log("Purchasers Product details Error Data : " + data);
                    //console.log("Purchasers Product details Error Status : " + status);
                });
        }
    }



    /*
     * Method Name  - firsttpage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to firsttpage.
     */

    vm.firstpages = function () {
        if(vm.purchasersPage != 0)
        {
            vm.purchasersPage = 0;
            vm.getPurchasersProductDetails(2);
        }
    }

    /*
     * Method Name  - lasttpage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to lasttpage.
     */

    vm.lastpages = function () {

        var currentLasts = vm.purchasersPageLast - 1;
        if(vm.purchasersPage != currentLasts)
        {
            vm.purchasersPage = parseInt(vm.purchasersPageLast - 1);
            //alert("last page : " + vm.purchasersPage);
            vm.getPurchasersProductDetails(2);
        }
    }

    /*
     * Method Name  - previouspage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to previouspage.
     */
    vm.previouspages = function () {

        if(vm.purchasersPage != 0)
        {
            vm.purchasersPage = vm.purchasersPage - 1;
            //alert("previous page : " + vm.purchasersPage);
            vm.getPurchasersProductDetails(2);
        }

    }

    /*
     * Method Name  - nextpage
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to move to nextpage.
     */
    vm.nextpages = function () {
        var currentLasts = vm.purchasersPageLast - 1;
        if(vm.purchasersPage != currentLasts)
        {
            vm.purchasersPage = vm.purchasersPage + 1;
            // alert("next page : " + vm.suppliersPage);
            vm.getSuppliersProductDetails(2);
        }

    }





    /*
     * Method Name  - editproduct
     * Created By   - vaibhav godambe
     * Created On   - 6 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to Move to edit product  .
     */

    // this method not used

     vm.editproduct = function (productId) {
         //console.log("productId : " +productId);

         $cookies.put("productId",productId); //set product Id
         $location.path('/editproduct'); // move to
     }



    /*
     * Method Name  - removeproductsales
     * Created By   - vaibhav godambe
     * Created On   - 9 march 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to open delete tax modal.
     */

    vm.removeproductsales = function (link) {
        //console.log(" Remove sales product link : " + link);
        vm.SalesProductlink = link; // set parameter

        angular.element('#removeSalesProductModal').modal('toggle'); // open modal window

    }


    /*
     * Method Name  - RemoveSalesProduct
     * Created By   - vaibhav godambe
     * Created On   - 9 march 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to remove  product sales  .
     */

    vm.RemoveSalesProduct = function () {

      //console.log(" Sales link : " + vm.SalesProductlink);
        vm.sendrequest = true; //  show loader
      $http.delete(vm.SalesProductlink, viewproductconfig)
            .success(function (data, status) {
                //console.log('Sales Product details  : ' + JSON.stringify(data));
                //console.log('Sales Product details status : ' + status);

                angular.element('.modal-backdrop').remove();
                angular.element('body').removeClass('modal-open');
                angular.element('body').removeAttr('style');
                angular.element('#removeSalesProductModal').css('display','none');
                vm.sendrequest = false; //  hide loader
                $route.reload();
            })
            .error(function (data, status) {
                vm.sendrequest = false; //  hide loader
                sessionout.checksessionout(status);
                if(status == 409)
                {
                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass('modal-open');
                    angular.element('body').removeAttr('style');
                    angular.element('#removeSalesProductModal').css('display','none');
                    vm.initiatedEnquiryError = true;

                    var hideError = function() {
                        vm.initiatedEnquiryError = false;
                    }

                    $timeout(hideError, 5000); // timeout

                }
                //console.log("Sales Product details Error Data : " +data);
                //console.log("Sales Product details Error Status : " +status);
            });
    }



    /*
     * Method Name  - removeproductpurchase
     * Created By   - vaibhav godambe
     * Created On   - 9 march 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to open delete tax modal.
     */


    vm.removeproductpurchase = function (link) {
        //console.log(" Remove purchase product link : " + link);
        vm.PurchaseProductlink = link; // set parameter

        angular.element('#removePurchaseProductModal').modal('toggle'); // open modal window

    }


    /*
     * Method Name  - RemovePurchaseProduct
     * Created By   - vaibhav godambe
     * Created On   - 9 march 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to remove  product purchase  .
     */

    vm.RemovePurchaseProduct = function () {
        //console.log(" Purchase link : " +  vm.PurchaseProductlink);
        vm.sendrequest = true; //  show loader
        $http.delete(vm.PurchaseProductlink, viewproductconfig)
            .success(function (data, status) {
                //console.log('Purchasers Product details  : ' + JSON.stringify(data));
                //console.log('Purchasers Product details status : ' + status);

                angular.element('.modal-backdrop').remove();
                angular.element('body').removeClass('modal-open');
                angular.element('body').removeAttr('style');
                angular.element('#removePurchaseProductModal').css('display','none');
                vm.sendrequest = false; //  hide loader
                $route.reload();
            })
            .error(function (data, status) {
                vm.sendrequest = false; //  hide loader
                sessionout.checksessionout(status);
                if(status == 409)
                {
                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass('modal-open');
                    angular.element('body').removeAttr('style');
                    angular.element('#removePurchaseProductModal').css('display','none');
                    vm.initiatedEnquiryError = true;

                    var hideError = function() {
                        vm.initiatedEnquiryError = false;
                    }

                    $timeout(hideError, 5000); // timeout

                }

                //console.log("Purchasers Product details Error Data : " +data);
                //console.log("Purchasers Product details Error Status : " +status);
            });
    }



    /*
     * Method Name  - addtosales
     * Created By   - vaibhav godambe
     * Created On   - 6 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to add to sales.
     */

    vm.addtosales = function (orgnId,prodId) {

        //console.log("Add to Sales  : " + orgnId + " , " + prodId);

       vm.producturl =  vm.Baseurl + 'products/' + prodId;
        //console.log("producturl  : " + vm.producturl);

        var data = {
            product : vm.producturl,
            organization : vm.BaseurlOrgId ,
        };

        //console.log("Data : " + JSON.stringify(data));

        $http.post(ContextPath +'/api/v1/suppliers', data, viewproductconfig)
            .success(function (data, status, viewproductconfig) {
                console.log("Product Added in sales  : " +JSON.stringify(data));
               //console.log("Sales Add product Status : " +status);
                vm.SalesSuccess = true;

                var hideError = function() {
                    vm.SalesSuccess = false;
                    $route.reload();
                }

                $timeout(hideError, 3000); // timeout


            }).error(function (data, status) {
            sessionout.checksessionout(status);
                if(status == 409)
                {
                    vm.SalesError = true;

                    var hideError = function() {
                        vm.SalesError = false;
                    }

                    $timeout(hideError, 5000); // timeout
                }
            //console.log("Sales Add product Error Data : " +data);
            //console.log("Sales Add product Error Status : " +status);
        });


    }


    /*
     * Method Name  - addtopurchase
     * Created By   - vaibhav godambe
     * Created On   - 6 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to add to purchase  .
     */

    vm.addtopurchase = function (orgnId,prodId) {
        //console.log("Add to Purchase : " + orgnId + " , " +prodId);

        vm.producturl =  vm.Baseurl + 'products/' + prodId;
        //console.log("producturl  : " + vm.producturl);

        var data = {
            product : vm.producturl,
            organization : vm.BaseurlOrgId ,
        };

        console.log("Data : " + JSON.stringify(data));

        $http.post(ContextPath +'/api/v1/purchasers', data, viewproductconfig)
            .success(function (data, status, viewproductconfig) {
                //console.log("Purchase Add product Data : " +JSON.stringify(data));
                //console.log("Purchase Add product Status : " +status);

                vm.PurchaseSuccess = true;

                var hideError = function() {
                    vm.PurchaseSuccess = false;
                    $route.reload();
                }

                $timeout(hideError, 3000); // timeout



            }).error(function (data, status) {
            sessionout.checksessionout(status);
            if(status == 409)
            {
                vm.PurchaseError = true;

                var hideError = function() {
                    vm.PurchaseError = false;
                }

                $timeout(hideError, 5000); // timeout
            }
            //console.log("Purchase Add product Error Data : " +data);
            //console.log("Purchase Add product Error Status : " +status);
        });
    }

    /*
     * Method Name  - countrycodedata
     * Created By   - Vaibhav Godambe
     * Created On   - 22 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to get country code
     */

    //config parameter is need to send client data to server in ajaxrequest
    var getcountrycodeconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get(ContextPath +'/api/v1/countries?size=233', getcountrycodeconfig)
        .success(function (data, status) {

            //console.log('Countries vice currency details  : ' + JSON.stringify(data));
            //console.log('Countries vice currency status : ' + status);

            vm.countrydata = data._embedded.countries;

        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("Countries vice currency Error Data : " +data);
            //console.log("Countries vice currency Error Status : " +status);
        });

    /*
     * Api Name  - To get edit profile data
     * Created By   - vaibhav godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This Api is used to get edit profile data.
     */

    //config parameter is need to send client data to server in ajax request
    var getuserdetailsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.getUsrDetails = function () {
        $http.get(ContextPath +'/api/v1/users/'+userid_Cookie, getuserdetailsconfig)
            .success(function (data, status) {
                //console.log('User details  : ' + JSON.stringify(data));
                //console.log('User details status : ' + status);

                vm.fName = data.firstName;
                vm.lName = data.lastName;
              vm.adminName = vm.fName + ' ' + vm.lName;
                vm.mName = data.middleName;
                vm.radioG = data.gender;
                vm.cNumber = data.mobile;
                vm.emailId = data.email;
                vm.uName = data.username;
               // vm.password = data.password;
               // vm.cpassword = data.password;


                vm.TempCNumber = data.mobile; // temp variable
                vm.TempemailId = data.email; // temp variable
                vm.TempuName = data.username; // temp variable

            })
            .error(function (data, status) {
                sessionout.checksessionout(status);
                //console.log("User details Error Data : " +data);
                //console.log("User details Error Status : " +status);
            });
    }




    /*
     * Api Name  - To get edit profile data
     * Created By   - vaibhav godambe
     * Created On   - 10 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This Api is used to get edit profile data.
     */

    //config parameter is need to send client data to server in ajax request
    var getuserdetailsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.getOrgDetails = function () {

        $http.get(ContextPath +'/api/v1/users/'+ userid_Cookie +'/organization',getuserdetailsconfig)
            .success(function(data,status){
                //console.log('Organization details  : ' + JSON.stringify(data));
                //console.log('Organization details status : ' + status);

                vm.coName = data.organization;
            })
            .error(function(data,status){
                sessionout.checksessionout(status);
                //console.log("Organization details Error Data : " +data);
                //console.log("Organization details Error Status : " +status);
            });
    }



    /*
     * Medthod Name  - showeditprofile
     * Created By   - vaibhav godambe
     * Created On   - 10 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to open editprofile modal.
     */

    vm.showeditprofile = function () {
        angular.element('#EditProfileModal').modal('show');
        // call the function
        vm.getUsrDetails();
        vm.getOrgDetails();

    }



    /*
     * Method Name  - hideShowPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to hideShowPassword in signup form
     */

    // Set the default value of inputType
    vm.inputType = 'password';

    // Hide & show password function
    vm.hideShowPassword = function(){
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };

    /*
     * Method Name  - resetEditprofile
     * Created By   - Vaibhav Godambe
     * Created On   - 20 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to reset all field data
     */

    vm.resetEditprofile = function () {
        vm.editPro = false;
        vm.checkmobilenumber = false;
        vm.checkemailaddress = false;
        vm.checkusername = false;
        vm.showerror = false ;

        vm.showmobileSuccess = false;
        vm.showemailSuccess = false;
        vm.showusrnameSuccess = false;
        vm.showmobileerror = false;
        vm.showemailerror = false;
        vm.showusrnameerror = false;

    }

    /*
     * Method Name  - EditprofileForm
     * Created By   - Vaibhav Godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to Edit Profile Form
     */

    //config parameter is need to send client data to server in ajaxrequest
    var signupconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.EditprofileForm = function(editprofile){

        vm.editPro=true;
        vm.checkmobilenumber = true;
        vm.checkemailaddress = true;
        vm.checkusername = true;

        if(vm.focasedMobile != true)
        {
            vm.showmobileSuccess = true;
        }
        if(vm.focasedEmail != true)
        {
            vm.showemailSuccess = true;
        }
        if(vm.focasedUserName != true)
        {
            vm.showusrnameSuccess = true;
        }

        if(vm.password == null && vm.cpassword == null)
        {
            vm.showerror = false;
        }


        if(editprofile.$valid && vm.showerror == false && vm.showmobileSuccess == true && vm.showemailSuccess == true && vm.showusrnameSuccess == true)
        {

            vm.showmobileSuccess = false;
            vm.showemailSuccess = false;
            vm.showusrnameSuccess = false;

            vm.sendrequestupdateprofile = true;

            // To Verify data
            vm.getstausPlusSign = vm.cNumber.indexOf("+");

            if(vm.getstausPlusSign == 0)
            {
                vm.cNumber =  vm.cNumber;
            }
            else if(vm.getstausPlusSign == -1)
            {
                vm.cNumber = "+" + vm.cNumber;
            }


            var data = {
                firstName : vm.fName,
                lastName: vm.lName,
                middleName: vm.mName,
                gender: vm.radioG,
                mobile: vm.cNumber,
                email: vm.emailId,
                username: vm.uName,
                password: vm.password,
            };

            //console.log(" data  : " + JSON.stringify(data));

            $http.patch(ContextPath +'/api/v1/users/'+userid_Cookie, data, signupconfig)
                .success(function (data, status , headers, signupconfig) {

                    //console.log('Edit Profile  : ' + JSON.stringify(data));
                    //console.log('Edit Profile status : ' + status);

                    //console.log('Edit Profile : ' + JSON.stringify(data._links.self.href));

                    var userlink = data._links.self.href; // user link
                    //console.log('userlink : ' + userlink);


                    vm.updateOrgnizationIdCookie =  $cookies.get('OrgnId'); // get Cookie for Orgn Id
                    //console.log('Update OrgnizationId Cookie : ' + vm.updateOrgnizationIdCookie);


                    // organization  data
                    var orgdata = {
                        organization : vm.coName,
                    };
                    //console.log('Update orgn data   : ' + JSON.stringify(orgdata));

                    // organization patch call
                    $http.patch(ContextPath +'/api/v1/organizations/'+vm.updateOrgnizationIdCookie, orgdata, signupconfig)
                        .success(function (data, status , headers, signupconfig) {
                            //console.log('Org data : ' + JSON.stringify(data));
                            //console.log('Org status : ' + status);
                        })
                        .error(function (data, status, headers, signupconfig) {
                            sessionout.checksessionout(status);
                            //console.log("Org Error Data : " +data);
                            //console.log("Org Error Status : " +status);
                        });

                    // To Verify data

                    var UserVerifyData = {
                        id: userid_Cookie,
                        mobile: vm.cNumber,
                        email: vm.emailId,
                    };

                    //console.log('UserVerifyData   : ' + JSON.stringify(UserVerifyData));

                    // UserVerifyData  call
                    $http.post(ContextPath +'/api/v1/edituser', UserVerifyData, signupconfig)
                        .success(function (data, status , headers, signupconfig) {
                            //console.log('Org data : ' + JSON.stringify(data));
                            //console.log('Org status : ' + status);
                        })
                        .error(function (data, status, headers, signupconfig) {
                            sessionout.checksessionout(status);
                            //console.log("Org Error Data : " +data);
                            //console.log("Org Error Status : " +status);
                        });

                    vm.sendrequestupdateprofile = false;

                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass('modal-open');
                    angular.element('body').removeAttr('style');
                    angular.element('#EditProfileModal').css('display','none');
                    $route.reload();

                })
                .error(function (data, status, headers, signupconfig) {
                    vm.sendrequestupdateprofile = false;
                    sessionout.checksessionout(status);
                    //console.log("Edit Profile Error Data : " +data);
                    //console.log("Edit Profile Error Status : " +status);
                });
        }
    }


    /*
     * Method Name  - chkMobileNumAvail
     * Created By   - vaibhav godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability mobile number.
     */

    //config parameter is need to send client data to server in ajaxrequest
    var chkavailconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    vm.chkMobileNumAvail = function (editprofile) {
        vm.showmobileerror = false;
        vm.showmobileSuccess = false;
        vm.showcheckingmobile = false;
        vm.focasedMobile = true;

        //if(vm.cNumber != '' || vm.cNumber != undefined)
        if(editprofile.contactnumber.$valid)
        {
            vm.showcheckingmobile = true;
            vm.checkmobilenumber = false;

            //console.log('cNumber : ' + vm.cNumber );
            vm.cNumbers = vm.cNumber;
            vm.cNumbers = '+' + vm.cNumber;
            vm.regContactNumber = vm.cNumbers.split("+").join("%2B");
            //console.log('cNumber : ' + vm.regContactNumber );

            if(vm.cNumbers != vm.TempCNumber)
            {
                $http.get(ContextPath +'/api/v1/users/search/findByMobile?mobile='+ vm.regContactNumber, chkavailconfig)
                    .success(function (data, status) {
                        //console.log('Mobile No Availability  : ' + JSON.stringify(data));
                        //console.log('Mobile No Availability status : ' + status);
                        vm.showmobileerror = true;
                        vm.showcheckingmobile = false;
                    })
                    .error(function (data, status) {
                        vm.showmobileSuccess = true;
                        vm.showcheckingmobile = false;
                        sessionout.checksessionout(status);
                        //console.log("Mobile No Availability Error Data : " +data);
                        //console.log("Mobile No Availability Error Status : " +status);
                    });
            }
            else
            {
                vm.showcheckingmobile = false;
                vm.showmobileSuccess = true;
            }

        }
        else{
            vm.checkmobilenumber = true;
            vm.showcheckingmobile = false;
        }

    }

    /*
     * factory Name  - chkEmailIdAvail
     * Created By   - vaibhav godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability email id.
     */
    vm.chkEmailIdAvail = function (editprofile) {
        vm.showemailerror = false;
        vm.showemailSuccess = false;
        vm.showcheckingemail = false;
        vm.focasedEmail = true;

        if(editprofile.emailid.$valid)
        {
            vm.showcheckingemail = true;
            vm.checkemailaddress = false;

            if(vm.emailId != vm.TempemailId)
            {
                $http.get(ContextPath + '/api/v1/users/search/findByEmail?email=' + vm.emailId, chkavailconfig)
                    .success(function (data, status) {

                        //console.log('Email Id Availability  : ' + JSON.stringify(data));
                        //console.log('Email Id Availability status : ' + status);
                        vm.showemailerror = true;
                        vm.showcheckingemail = false;

                    })
                    .error(function (data, status) {
                        vm.showemailSuccess = true;
                        vm.showcheckingemail = false;
                        sessionout.checksessionout(status);
                        //console.log("Email Id Availability Error Data : " +data);
                        //console.log("Email Id Availability Error Status : " +status);
                    });
            }
            else
            {
                vm.showemailSuccess = true;
                vm.showcheckingemail = false;
            }
        }
        else{
            vm.checkemailaddress = true;
            vm.showcheckingemail = false;
        }


    }

    /*
     * factory Name  - chkUsrnameAvail
     * Created By   - vaibhav godambe
     * Created On   - 21 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to check availability user name.
     */
    vm.chkUsrnameAvail = function (editprofile) {

        vm.showusrnameerror = false;
        vm.showusrnameSuccess = false;
        vm.showcheckingusrname = false;
        vm.focasedUserName = true;

        if(editprofile.username.$valid)
        {
            vm.showcheckingusrname = true;
            vm.checkusername = false;

            if(vm.uName != vm.TempuName)
            {
                $http.get(ContextPath + '/api/v1/users/search/findByUsername?username=' + vm.uName, chkavailconfig)
                    .success(function (data, status) {

                        //console.log('Username Availability  : ' + JSON.stringify(data));
                        //console.log('Username Availability status : ' + status);
                        vm.showusrnameerror = true;
                        vm.showcheckingusrname = false;
                    })
                    .error(function (data, status) {
                        vm.showusrnameSuccess = true;
                        vm.showcheckingusrname = false;
                        sessionout.checksessionout(status);
                        //console.log("Username Availability Error Data : " +data);
                        //console.log("Username Availability Error Status : " +status);
                    });
            }
            else
            {
                vm.showusrnameSuccess = true;
                vm.showcheckingusrname = false;

            }
        }
        else {
            vm.checkusername = true;
            vm.showcheckingusrname = false;
        }

    }

    /*
     * Method Name  - matchPassword
     * Created By   - Vaibhav Godambe
     * Created On   - 13 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is use to match password from password filed
     */


    vm.matchPassword = function(){
        if(vm.password == vm.cpassword)
        {
            vm.showerror = false;
        }
        else
        {
            vm.showerror = true;
        }
    }//close matchPassword


});