myApp.controller('SendEnqCtrl', function($scope,$rootScope,$route,baseURl,$location,$cookies,Page,$http,errorMessage,DTOptionsBuilder, DTColumnBuilder,sessionmaintain,sessionout,ContextPath,$timeout) {
    var vm = $scope;

   // alert("Product id : " + $rootScope.productid_sendenq);

    vm.land = true; // radio btn default value

    //error messages from custom factory method.
    vm.errorMessage=errorMessage;

    Page.setTitle('Send Enquiry'); // To set Page Title using factory
    /*
     * factory Name  - sessionmaintain
     * Created By   - vaibhav godambe
     * Created On   - 16 dec 2016
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
    //console.log('User Id 37 '+userid_Cookie);
    // Retrieving a cookie
    vm.fullname = $cookies.get('UserFullName'); // get user full name cookies

    var productid_sendenqCookie = $cookies.get('productid_sendenq'); // get product id cookies
    //console.log("productid_sendenqCookie 41 : " +productid_sendenqCookie);


    vm.verifyUsrId = userid_Cookie.replace(/-/g , "").toUpperCase();
    //console.log("Converted user id : " +vm.verifyUsrId);




    /*
     * Api Name  - getcurrencydetails
     * Created By   - vaibhav godambe
     * Created On   - 5 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get currency details on to the page .
     */

    //config parameter is need to send client data to server in ajaxrequest
    var getcurrencyconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get(ContextPath +'/api/v1/countries?size=233', getcurrencyconfig)
        .success(function (data, status) {

            //console.log('Countries vice currency details  : ' + JSON.stringify(data));
            //console.log('Countries vice currency status : ' + status);
            vm.currencydata = data._embedded.countries;

            vm.countryinfo = []; // array country

            for( var i = 0 ; i < vm.currencydata.length; i++ )
            {
                vm.countryinfo.push({
                    id : i,
                    countryId : vm.currencydata[i].id,
                    label : vm.currencydata[i].country,
                    href : vm.currencydata[i]._links.country.href
                });
            }
            //console.log('country array : ' + JSON.stringify(vm.countryinfo));


            if(ContextPath.indexOf("localhost") == -1)
            {
                vm.sendenqCurrancy = ContextPath + '/PharmerzWeb/api/v1/countries/e4e87c71-1906-428f-a805-21556da94809'; // set default
                //vm.sendenqCurrancy = 'http://demo.pharmerz.org/PharmerzWeb/api/v1/countries/e4e87c71-1906-428f-a805-21556da94809';
                //console.log("Server side currency set : " + vm.sendenqCurrancy );

            }
            else
            {
                vm.sendenqCurrancy = ContextPath + '/api/v1/countries/e4e87c71-1906-428f-a805-21556da94809'; // set default
                //console.log("local side currency set : " + vm.sendenqCurrancy );
            }

        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("Countries vice currency Error Data : " +data);
            //console.log("Countries vice currency Error Status : " +status);
        });




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
                $location.path('/product');
                $cookies.put('NotVerified',true); // Set Cookie for not verified user
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
                $location.path('/product');
                $cookies.put('NotVerified',true); // Set Cookie for not verified user
            }
         //console.log("mobileflag error data : " + data);
         //console.log("mobileflag error status : " + status);
        });




    /*
     * Api Name  - getorgdetails
     * Created By   - vaibhav godambe
     * Created On   - 5 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get organization details.
     */

    //config parameter is need to send client data to server in ajax request
    var orgndtlsconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get(ContextPath +'/api/v1/users/'+ userid_Cookie +'/organization', orgndtlsconfig)
        .success(function (data, status) {
            //console.log('Org details  : ' + JSON.stringify(data));
           //console.log('Org details status : ' + status);

            vm.OrgId = data.id; // orgnization id
            vm.OrgLinks = data._links.self.href; // organization link
            //console.log('Org Id : ' + vm.OrgId);
            //console.log('Org Links : ' + vm.OrgLinks);

            $cookies.put('OrgnId', vm.OrgId); // Set Cookie for Orgn Id
            //console.log('Organization Id 160 '+vm.OrgId);
            $cookies.put('OrgnLinks', vm.OrgLinks); // Set Cookie for Orgn Links


            // Retrieving a cookie
            var Orgnid_Cookie = $cookies.get('OrgnId'); // get orgn id cookies
            //console.log("Orgnid_Cookie 166 : " +Orgnid_Cookie);

            vm.OrgBaseurl = baseURl + 'organizations/' + Orgnid_Cookie;
            //console.log("OrgBaseurl : " +vm.OrgBaseurl);


            /*
             * Api Name  - getlocationdetails
             * Created By   - vaibhav godambe
             * Created On   - 5 jan 2017
             * Modified By  -
             * Modified On  -
             * Purpose      - This api is used to get location details as per organization id .
             */

            //config parameter is need to send client data to server in ajaxrequest
            var getlocationconfig = {
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                }
            }


            $http.get(ContextPath +'/api/v1/locations/search/findByOrganizationId?organizationId='+vm.OrgId , getlocationconfig)
                .success(function (data, status) {

                    //console.log('Location details  : ' + JSON.stringify(data));
                  //console.log('Location status : ' + status);

                    vm.locationdata = data._embedded.locations;
                })
                .error(function (data, status) {
                    sessionout.checksessionout(status);
                    //console.log("Location Error Data : " +data);
                    //console.log("Location Error Status : " +status);
                });

        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("Org details Error Data : " +data);
            //console.log("Org details Error Status : " +status);
        });





    /*
     * Api Name  - getequirydetails
     * Created By   - vaibhav godambe
     * Created On   - 29 dec 2016
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get equiry details on to the page .
     */

    //config parameter is need to send client data to server in ajaxrequest
    var getenqdtlconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.getequirydetails = function () {
        vm.loading = true; //show loader
        // Retrieving a cookie

        $http.get(ContextPath +'/api/v1/products/'+ productid_sendenqCookie +'?projection=detail', getenqdtlconfig)
            .success(function (data, status) {
                //alert("Details Data : " + JSON.stringify(data));
                //console.log('Product details  : ' + JSON.stringify(data));
                //console.log('Product details status : ' + status);

                vm.productname = data.product;
                vm.composition = data.composition;
                //vm.message = data.note;
                vm.loading = false; //hide loader
            })
            .error(function (data, status) {
                vm.loading = false; //hide loader
                sessionout.checksessionout(status);
                //console.log("Product details Error Data : " +data);
                //console.log("Product details Error Status : " +status);
            });
    }



    /*
     * Api Name  - getsupplierdetails
     * Created By   - vaibhav godambe
     * Created On   - 5 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get supplier details on to the page using product id .
     */

     /* multiple select box Setting*/

    /*
       $scope.example13data = [
        { id: 1, label: "David" },
        { id: 2, label: "Jhon" },
        { id: 3, label: "Lisa" },
        { id: 4, label: "Nicole" },
        { id: 5, label: "Danny"}];
    */
    $scope.supplierinfomodel = [];

    // Dropdown button setting
    $scope.supplierinfosettings = {
        smartButtonMaxItems: 1,
        enableSearch: true,
        selectionLimit: 10
    };

    //config parameter is need to send client data to server in ajaxrequest
    var getsupplierconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

     vm.Organization_Cookie = $cookies.get('OrgnId'); // Get Cookie for Orgn Id
     if(vm.Organization_Cookie=='undefined' || vm.Organization_Cookie==''){
         vm.Organization_Cookie=vm.OrgId;
     }
    // console.log("Organization_Cookie 293 " + vm.Organization_Cookie);

    $timeout( function(){




    $http.get(ContextPath +'/api/v1/suppliers/search/findByProductId?productId='+ productid_sendenqCookie +'&projection=detail', getsupplierconfig)
        .success(function (data, status) {
            //console.log('suppliers details  : ' + JSON.stringify(data));
            //console.log('suppliers status : ' + status);
            vm.supplierdata = data._embedded.suppliers;
            //console.log(' suppliers details  : ' + JSON.stringify(vm.supplierdata));
            vm.supplierinfo = []; // supplier array
            vm.supplierinfos = []; // supplier array

            for( var i = 0 ; i < vm.supplierdata.length; i++ )
            {
                //console.log("Organization cookie Id:" + vm.Organization_Cookie + " Supplier organization Id : " + vm.supplierdata[i].organization.id);
                // Condition Check For Same Organization id not add enquiry using thier product
                if(vm.OrgId !=  vm.supplierdata[i].organization.id)
                {
                    vm.supplierinfo.push({
                        id : i,
                        label : vm.supplierdata[i].organization.organization,
                        Linkhref : vm.supplierdata[i]._links.self.href,
                        orgid : vm.supplierdata[i].organization.id
                    });
                }else{

               //  console.log(' Match Found '+vm.supplierdata[i]);

                }

            }

            //console.log('suppliers skipped organization array  : ' + JSON.stringify(vm.supplierinfo));
            vm.supplierinfolength = vm.supplierinfo.length;
            //console.log('suppliers array length  : ' + vm.supplierinfolength);

            for( var i = 0 ; i < vm.supplierinfo.length; i++ )
            {
                vm.supplierinfos.push({
                    id : i,
                    label : vm.supplierinfo[i].label,
                    Linkhref : vm.supplierinfo[i].Linkhref,
                    orgId : vm.supplierinfo[i].orgid
                });
            }

           // console.log('New suppliers arrays 334 : ' + JSON.stringify(vm.supplierinfos));
            // Check Supplier Length
            if(vm.supplierinfolength == 0)
            {
                $location.path('/product');
                $cookies.put('Nosupplier',true); // Set Cookie for Orgn Id
            }


        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("suppliers Error Data : " +data);
            //console.log("suppliers Error Status : " +status);
        });

    }, 500 );








    /*
     * Method Name  - addlocations
     * Created By   - vaibhav godambe
     * Created On   - 7 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to add locations.
     */

    //config parameter is need to send client data to server in ajaxrequest
    var locationconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.addlocations = function (addlocationform) {
        vm.addlocation = true;

        if(addlocationform.$valid)
        {
            vm.countryurl =  vm.countryinfo[vm.addcountry].href;
            //console.log("Country url  : " +vm.countryurl);

            vm.sendrequestlocation = true; //  show loader
            var data =  {
                location : vm.addlocationname,
                addressLine1 : vm.addlane1,
                addressLine2 : vm.addlane2,
                postalCode : vm.addpostalcode,
                city : vm.addcity,
                region : vm.addregion,
                country : vm.countryurl,
                organization : vm.OrgBaseurl,
            };


            //console.log('Data : '  + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/locations',data,locationconfig)
                .success(function(data, status, locationconfig){
                    //console.log("Add Location Data : " +JSON.stringify(data));
                    //console.log("Add Location Status : " +status);

                    angular.element('.modal-backdrop').remove();
                    angular.element('body').removeClass('modal-open');
                    angular.element('body').removeAttr('style');
                    angular.element('#SendEnqAddlocationModal').css('display','none');
                    vm.sendrequestlocation = false; //  show loader
                    $route.reload();

                }).error(function (data, status) {
                vm.sendrequestlocation = false; //  show loader
                sessionout.checksessionout(status);
                //console.log("Add Location Error Data : " +data);
                //console.log("Add Location Error Status : " +status);
            });

        }

    }

    /*
     * Method Name  - resetLocationFormData
     * Created By   - vaibhav godambe
     * Created On   - 9 March 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to reset form data.
     */

    vm.resetLocationFormData = function () {
        vm.addlocation = false; // To hide the error

        // field name  to reset

        vm.addlocationname = '';
        vm.addlane1 = '';
        vm.addlane2 = '';
        vm.addpostalcode = '';
        vm.addcity = '';
        vm.addregion = '';
        vm.addcountry = '';

    }

    /*
     * Api Name  - getunitOfMeasurements
     * Created By   - vaibhav godambe
     * Created On   - 13 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This api is used to get UOM details on to the page .
     */

    //config parameter is need to send client data to server in ajaxrequest
    var getuomconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    $http.get(ContextPath +'/api/v1/unitOfMeasurements', getuomconfig)
        .success(function (data, status) {

            //console.log('UOM  details  : ' + JSON.stringify(data));
            //console.log('UOM status : ' + status);
            vm.uomdata = data._embedded.unitOfMeasurements;
        })
        .error(function (data, status) {
            sessionout.checksessionout(status);
            //console.log("UOM Error Data : " +data);
            //console.log("UOM Error Status : " +status);
        });



    /*
     * Method Name  - submitenuiryForm
     * Created By   - vaibhav godambe
     * Created On   - 17 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This Method is used to send enquiry  .
    */

    // This event is used for the multiselect drop down validation purpouse
    vm.dropdownevnt = {
        onItemSelect: function(item) {
            //console.log('onItemSelect');
            vm.checkselect = false;
           // alert('select');
        },
        onItemDeselect: function(item) {
            //console.log('onItemDeselect');
            if (vm.supplierinfomodel.length === 0)
            {
                vm.checkselect = true;
                //alert('deselect');
            }
        },
        onSelectAll : function(item){
            //console.log('onSelectAll');
            vm.checkselect = false;
        },
        onDeselectAll : function(item){
           //console.log('onDeselectAll');
                vm.checkselect = true;
        },
        onInitDone: function(item) {
            //console.log('onInitDone');
            vm.checkselect = true;
           // alert('pageload');
        }
    };


    /*
     * Method Name  - cancleEnquiry
     * Created By   - vaibhav godambe
     * Created On   - 17 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This Method is used to send enquiry  .
     */

    vm.cancleEnquiry = function () {
        vm.sentenq = false; // set default value
        vm.supplierinfomodel = [];
        vm.sendenqEnqQty ='';
        vm.sendenqEnqUom ='';
        vm.sendenqLocation ='';
        vm.sendenqCurrancy ='';
        vm.sendenqIncorterms ='';
        vm.sendenqShipBy = '';
        vm.message ='';

    }


    //config parameter is need to send client data to server in ajaxrequest
    var sentenqconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }




    vm.submitEnquiryForm = function (sendenuiry) {

        vm.sentenq = true; // set default value


        if(vm.mobileverified==0 || vm.emailverified==0){
            $location.path('/product');
            $cookies.put('NotVerified',true); // Set Cookie for not verified user
        }



        if(sendenuiry.$valid && vm.checkselect == false)
        {
            vm.sendrequestSendEnq = true; // show loader
            //alert('valid');
            vm.supplierArrdata=[]; // array for supplier data
            vm.receiverOrgArrdata=[]; // array for organization link  data
            vm.receiverOrgIdArrdata=[]; // array for organization id data
            vm.recevierorgstr = baseURl + 'organizations/';

            JSON.stringify(vm.supplierinfos); //country data converted json

            //console.log("selected supplierinfomodel array : " + vm.supplierinfomodel.length);

            for(var i=0;i<vm.supplierinfomodel.length;i++)
            {
                    var index = vm.supplierinfomodel[i].id;
                    //console.log("supplier data : " + index);
                    //console.log("Linkhref : " + vm.supplierinfos[index].Linkhref);


                      vm.supplierArrdata.push(vm.supplierinfos[index].Linkhref);
                      vm.receiverOrgArrdata.push(vm.recevierorgstr + vm.supplierinfos[index].orgId);
                      vm.receiverOrgIdArrdata.push(vm.supplierinfos[index].orgId);

            }
            //console.log("supplierArrdata : " + JSON.stringify(vm.supplierArrdata));
            //console.log("receiverOrgArrdata : " + JSON.stringify(vm.receiverOrgArrdata));


            vm.cookiesOrgLink = $cookies.get('OrgnLinks'); // Get Cookies

            //console.log("incoterms :"+  vm.sendenqIncorterms);


           /* if(vm.sendenqIncorterms == ' ' || vm.sendenqIncorterms == null || vm.sendenqIncorterms == 'undefined' || vm.sendenqIncorterms == undefined)
            {
                vm.sendenqIncorterms = 'null';
            }*/


            var data = {
                quantity: vm.sendenqEnqQty,
                shipmentBy: vm.sendenqShipBy,
                message: vm.message,
                country: vm.sendenqCurrancy,
                unitOfMeasurement: vm.sendenqEnqUom,
                receiverOrganizations: vm.receiverOrgArrdata,
                senderOrganization: vm.cookiesOrgLink,
                suppliers: vm.supplierArrdata,
                location: vm.sendenqLocation,
                incoterm: vm.sendenqIncorterms,
            };
            //console.log("Enquiry Batches data : " +JSON.stringify(data));

            //console.log("Enquiry Batches url : " + ContextPath +'/enquiryBatches');

            $http.post(ContextPath +'/enquiryBatches', data, sentenqconfig)
                .success(function (data, status,sentenqconfig) {
                    //console.log('Sent Enquiry   : ' + JSON.stringify(data));
                    //console.log('Sent Enquiry status : ' + status);

                      // Email Sent to supplier organization
                       var data = {
                           organisationIds : vm.receiverOrgIdArrdata,
                           productname : vm.productname,
                       };

                       //console.log("Enquiry Email data : " + JSON.stringify(data));

                       $http.post(ContextPath +'/api/v1/enquiryemail', data, sentenqconfig)
                        .success(function (data, status,sentenqconfig) {
                            //console.log("Sent Enquiry Email Data : " +data);
                            //console.log("Sent Enquiry Email Status : " +status);
                        })
                        .error(function (data, status,sentenqconfig) {
                            sessionout.checksessionout(status);
                            //console.log("Sent Enquiry Email Error Data : " +data);
                            //console.log("Sent Enquiry Email Error Status : " +status);
                        });

                    vm.sendrequestSendEnq = false; // show loader
                    vm.EnquirySendSuccess = true;

                    var reloadRoute = function() {
                        vm.EnquirySendSuccess = false;
                        $cookies.put('sendEnq','true');
                        $location.path('/admindashbord'); // move to admin dashbord
                    }

                    $timeout(reloadRoute, 3000); // timeout

                })
                .error(function (data, status,sentenqconfig) {
                    vm.sendrequest = false; // show loader
                    vm.invalidusrpass = true;
                    sessionout.checksessionout(status);
                   // console.log("Sent Enquiry Error Data : " +data);
                    //console.log("Sent Enquiry Error Status : " +status);
                });

        }

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
                //vm.password = data.password;
                //vm.cpassword = data.password;


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