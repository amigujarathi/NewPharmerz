myApp.controller('AddproductCtrl', function($scope,$rootScope,$route,$location,$cookies,Page,baseURl,errorMessage,$http,$timeout,sessionmaintain,sessionout,getcategorydetails,ContextPath) {

    var vm = $scope;

    //error messages from custom factory method.
    vm.errorMessage = errorMessage;


    Page.setTitle('Add Product'); // To set Page Title using factory
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
   //console.log("Orgnid_Cookie : " + Orgnid_Cookie);


    vm.Baseurl =  baseURl; // base url

    vm.BaseurlOrgId =  baseURl  +"organizations/" + Orgnid_Cookie; // url orgid


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
     * factory Name  - getcategorydetails
     * Created By   - vaibhav godambe
     * Created On   - 20 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This factory is used to get user details.
     */

    // To get category from  getcategorydetails factory

    getcategorydetails.then(function(response){
       //console.log("Category details : " + JSON.stringify(response.data));
        vm.categoriesDrop = response.data._embedded.categories;

        //Here  vm.categoriesdata use for add product form on add product page
        vm.categoriesdata= vm.categoriesDrop;

        //Here vm.categoriesdataSearch use for search product on add product page
        vm.categoriesdataSearch = [];

        vm.categoriesData1 = [{"ids": "ALLCat","category" : 'All Category'}];
        for( var i = 0 ; i < vm.categoriesData1.length ; i++ )
        {
            vm.categoriesdataSearch.push({
                ids : vm.categoriesData1[i].ids,
                category : vm.categoriesData1[i].category
            });
        }


        for( var j = 0 ; j < vm.categoriesDrop.length ; j++ )
        {
            vm.categoriesdataSearch.push({
                ids : vm.categoriesDrop[j].id,
                category : vm.categoriesDrop[j].category
            });
        }


        //console.log("Category data for Search: " +  JSON.stringify(vm.categoriesdataSearch));
        //console.log("Category data for Add product: " +  JSON.stringify(vm.categoriesdata));
        vm.productcategory = 'ALLCat';

    });



    /*
     * Method Name  - showcategoryproduct
     * Created By   - vaibhav godambe
     * Created On   - 20 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to show category vice product.
     */

    //config parameter is need to send client data to server in ajax request
    var showcategoryproductconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }





    vm.showcategoryproduct = function (id) {
        vm.product = '';


        if(id == 1)
        {
            //alert('id is 1');

            vm.page = 0;
            vm.last = 0;
        }
       //console.log("in showcategoryproduct : " + vm.productcategory );
        if(vm.productcategory != null)
        {
             if(id == 1)
             {
                 vm.SearchByCategoryProductName = false;// hide the previous pagination bar
                 vm.SearchByCategory = true;

                //alert('id is 1');
                 if(vm.productcategory!='ALLCat') {

                  $http.get(ContextPath + '/api/v1/products/search/findByCategoryId?categoryId=' + vm.productcategory + '&projection=detail', showcategoryproductconfig)
                      .success(function (data, status) {
                          //console.log('Product details  : ' + JSON.stringify(data));
                          //console.log('Product details status : ' + status);
                          if (data.page.totalElements != 0) {
                              vm.product = data._embedded.products; // Product
                          }
                          else {
                              vm.product = [];
                          }


                          vm.prodlength = data.page.totalElements;
                          vm.last = data.page.totalPages;
                          //console.log("Last page" + vm.last);
                      })
                      .error(function (data, status) {
                          sessionout.checksessionout(status);
                          //console.log("Product details Error Data : " + data);
                          //console.log("Product details Error Status : " + status);
                      });

                    }else{

                     $http.get(ContextPath +'/api/v1/products/search/findAllByOrderByProductAsc?projection=detail', showcategoryproductconfig)
                         .success(function (data, status) {
                             console.log('Product details  (All Category) : ' + JSON.stringify(data));
                             //console.log('Product details status (All Category) : ' + status)

                             if(data.page.totalElements != 0)
                             {
                                 vm.product = data._embedded.products; // Product
                             }
                             else
                             {
                                 vm.product = [];
                             }


                             vm.prodlength = data.page.totalElements;
                             vm.last = data.page.totalPages;
                             ////console.log("Last page" + vm.last);
                         })
                         .error(function (data, status) {
                             //vm.loading = false;
                             //console.log("Product details Error Data (All Category) : " +data);
                            // console.log("Product details Error Status (All Category) : " +status);
                         });



                  }



             }
             else
             {
                 //alert('id is 2');

                 if(vm.productcategory!='ALLCat') {

                 $http.get(ContextPath +'/api/v1/products/search/findByCategoryId?categoryId=' + vm.productcategory + '&projection=detail&page='+ vm.page, showcategoryproductconfig)
                     .success(function (data, status) {
                        console.log('Product details other category : ' + JSON.stringify(data));
                        console.log('Product details status other category : ' + status);

                         if(data.page.totalElements != 0)
                         {
                             vm.product = data._embedded.products; // Product
                         }
                         else
                         {
                             vm.product = [];
                         }


                         vm.prodlength = data.page.totalElements;
                         vm.last = data.page.totalPages;

                        //console.log("Last page" + vm.last);
                     })
                     .error(function (data, status) {
                         sessionout.checksessionout(status);
                         //console.log("Product details Error Data : " +data);
                         //console.log("Product details Error Status : " +status);
                     });
                 }else{

                     $http.get(ContextPath +'/api/v1/products/search/findAllByOrderByProductAsc?projection=detail&page='+ vm.page, showcategoryproductconfig)
                         .success(function (data, status) {
                             console.log('Product details  (All Category) : ' + JSON.stringify(data));
                             console.log('Product details status (All Category) : ' + status)

                             if(data.page.totalElements != 0)
                             {
                                 vm.product = data._embedded.products; // Product
                             }
                             else
                             {
                                 vm.product = [];
                             }


                             vm.prodlength = data.page.totalElements;
                             vm.last = data.page.totalPages;
                             ////console.log("Last page" + vm.last);
                         })
                         .error(function (data, status) {
                             //vm.loading = false;
                             //console.log("Product details Error Data (All Category) : " +data);
                             //console.log("Product details Error Status (All Category) : " +status);
                         });



                 }
             }

        }


    }


    /*
     * Method Name  - vm.manageSearchproduct
     * Created By   - Sagar Thombare
     * Created On   - 12 June 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to manage product search box and products
     */

    vm.productCount=0;
    vm.manageSearchproduct = function(){
        vm.productCount++;
        if(vm.searchproduct.length==1 &&  vm.productCount>1){
             vm.productCount=0;
             vm.prodcategory = false;
             vm.showcategoryproduct(1);
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
        if(vm.page != 0)
        {
            vm.page = 0;
            vm.showcategoryproduct(2);
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

        var currentLast = vm.last - 1;
        if(vm.page != currentLast)
        {
            vm.page = parseInt(vm.last - 1);
            //alert("last page : " + vm.page);
            vm.showcategoryproduct(2);
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

        if(vm.page != 0)
        {
            vm.page = vm.page - 1;
            //alert("previous page : " + vm.page);
            vm.showcategoryproduct(2);
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
        var currentLast = vm.last - 1;
        if(vm.page != currentLast)
        {
            vm.page = vm.page + 1;
           // alert("next page : " + vm.page);
            vm.showcategoryproduct(2);
        }

    }


    /*
     * Method Name  - resetproductsdata
     * Created By   - vaibhav godambe
     * Created On   - 22 Feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to resetproductsdata.
     */

    vm.resetproductsdata = function () {

        vm.addproduct = false;

        // reset data
        vm.productname = '';
        vm.composition = '';
        vm.categoryurl = '';
        vm.upc = '';
        vm.notes = '';
    }


    /*
     * Method Name  - addproducts
     * Created By   - vaibhav godambe
     * Created On   - 20 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to addproducts.
     */

    //config parameter is need to send client data to server in ajax request
    var addproductconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.addproducts = function(addproductform) {

        vm.addproduct = true;

        if(addproductform.$valid)
        {
            vm.categoryurl = vm.Baseurl +"categories/"+ vm.pcategory;

          //console.log("category url : " +  vm.categoryurl);


            vm.sendrequestAddProduct = true; //show loader
            vm.productname =  vm.productname.toLowerCase(); // Product Name Convert to Lowercase

            var data = {
                product :vm.productname ,
                composition : vm.composition,
                category : vm.categoryurl,
                upc : vm.upc,
                url : 'null',
                note : vm.notes,
            };

            //console.log("Data : " + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/products', data, addproductconfig)
             .success(function (data, status, addproductconfig) {
                 //console.log("Add product Data : " +JSON.stringify(data));
               //console.log("Add product Status : " +status);
                 vm.sendrequestAddProduct = false; //show loader
                 vm.AddProductSuccess = true;


                 //config parameter is need to send client data to server in ajax request
                 var addprodcatconfig = {
                     headers : {
                         'Accept' : 'application/json',
                         'Content-Type': 'application/json',
                     }
                 }


                 if(vm.categories == 'Sales')
                 {

                    //console.log("Sales block");

                     var data = {
                         organization : vm.BaseurlOrgId,
                         product : data._links.self.href,
                     };

                     //console.log("Data : " + JSON.stringify(data));

                     $http.post(ContextPath +'/api/v1/suppliers', data, addprodcatconfig)
                         .success(function (data, status, addprodcatconfig) {
                            //console.log("Sales Data : " +JSON.stringify(data));
                            //console.log("Sales Status : " +status);

                         }).error(function (data, status) {
                         sessionout.checksessionout(status);
                         //console.log("Error Data : " +data);
                         //console.log("Error Status : " +status);
                     });

                 }
                 else if(vm.categories == 'Purchase')
                 {

                    //console.log("Purchase block");
                     var data = {
                         product : data._links.self.href,
                         organization : vm.BaseurlOrgId,
                     };

                     //console.log("Data : " + JSON.stringify(data));

                     $http.post(ContextPath +'/api/v1/purchasers', data, addprodcatconfig)
                         .success(function (data, status, addprodcatconfig) {
                            //console.log("Purchasers Data : " +JSON.stringify(data));
                            //console.log("Purchasers Status : " +status);

                         }).error(function (data, status) {
                         sessionout.checksessionout(status);
                         //console.log("Error Data : " +data);
                         //console.log("Error Status : " +status);

                     });

                 }
                 else if(vm.categories == 'Both')
                 {

                    //console.log("Both block");

                     var salesdata = {
                         organization : vm.BaseurlOrgId,
                         product : data._links.self.href,
                     };

                     //console.log("Data : " + JSON.stringify(data));

                     $http.post(ContextPath +'/api/v1/suppliers', salesdata, addprodcatconfig)
                         .success(function (data, status, addprodcatconfig) {
                            //console.log("Sales Data : " +JSON.stringify(data));
                            //console.log("Sales Status : " +status);

                         }).error(function (data, status) {
                         sessionout.checksessionout(status);
                         //console.log("Error Data : " +data);
                         //console.log("Error Status : " +status);
                     });

                     var purchasedata = {
                         product : data._links.self.href,
                         organization : vm.BaseurlOrgId,
                     };

                     //console.log("Data : " + JSON.stringify(data));

                     $http.post(ContextPath +'/api/v1/purchasers', purchasedata, addprodcatconfig)
                         .success(function (data, status, addprodcatconfig) {
                            //console.log("Purchasers Data : " +JSON.stringify(data));
                           //console.log("Purchasers Status : " +status);


                         }).error(function (data, status) {
                         sessionout.checksessionout(status);
                         //console.log("Error Data : " +data);
                         //console.log("Error Status : " +status);

                     });

                 }


                 var reloadRoute = function() {
                     vm.AddProductSuccess = false;
                     $route.reload();
                 }

                 $timeout(reloadRoute, 3000); // timeout



             }).error(function (data, status) {
                vm.AddProductSuccess = false;
                vm.sendrequestAddProduct = false; //show loader
                sessionout.checksessionout(status);
             //console.log("Add product Error Data : " +data);
             //console.log("Add product Error Status : " +status);
             });



        }

    }

    /*
     * Method Name  - addtodo
     * Created By   - vaibhav godambe
     * Created On   - 20 jan 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to set flag Sales , Purchase , Both .
     */

    //config parameter is need to send client data to server in ajax request
    var addtodoconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }


    vm.addtodo = function (item) {

       //console.log("ProductId : " + item._links.self.href);
       //console.log("Product RadioButton value : "  + item.productTodo);
      //console.log("organization url  : " + vm.BaseurlOrgId);

       //console.log("item :" + item.productTodo);

        if(item.productTodo == 'undefined' || item.productTodo == undefined)
        {
            vm.ProductModeError = true;

            var hideError = function() {
                vm.ProductModeError = false;
            }

            $timeout(hideError, 5000); // timeout
        }
        else if(item.productTodo == 'Sales')
        {
            vm.ProductModeError = false;
          //console.log("Sales block");
            var data = {
                organization : vm.BaseurlOrgId,
                product : item._links.self.href,
            };

            //console.log("Data : " + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/suppliers', data, addtodoconfig)
                .success(function (data, status, addtodoconfig) {
                   //console.log("Sales Data : " +JSON.stringify(data));
                   //console.log("Sales Status : " +status);

                    if(status == 201)
                    {
                        vm.SalesError = false;

                        vm.SalesSuccess = true;

                        var hideSuccessMsg = function() {
                            vm.SalesSuccess = false;
                        }

                        $timeout(hideSuccessMsg, 5000); // timeout

                    }

                }).error(function (data, status) {
                //console.log("Error Data : " +data);
                //console.log("Error Status : " +status);
                sessionout.checksessionout(status);
                if(status == 409)
                {
                    vm.PurchaseError = false;
                    vm.BothError = false;

                    vm.SalesError = true;

                    var hideError = function() {
                        vm.SalesError = false;
                    }

                    $timeout(hideError, 5000); // timeout

                }

            });

        }
        else if(item.productTodo == 'Purchase')
        {
            vm.ProductModeError = false;
           //console.log("Purchase block");
            var data = {
                product : item._links.self.href,
                organization : vm.BaseurlOrgId,
            };

            //console.log("Data : " + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/purchasers', data, addtodoconfig)
                .success(function (data, status, addtodoconfig) {
                   //console.log("Purchasers Data : " +JSON.stringify(data));
                   //console.log("Purchasers Status : " +status);

                    if(status == 201)
                    {
                        vm.PurchaseError = false;

                        vm.PurchaseSuccess = true;

                        var hideSuccessMsg = function() {
                            vm.PurchaseSuccess = false;
                        }

                        $timeout(hideSuccessMsg, 5000); // timeout
                    }

                }).error(function (data, status) {
                //console.log("Error Data : " +data);
                //console.log("Error Status : " +status);
                sessionout.checksessionout(status);
                if(status == 409)
                {
                    vm.SalesError = false;
                    vm.BothError = false;

                    vm.PurchaseError = true;

                    var hideError = function() {
                        vm.PurchaseError = false;
                    }

                    $timeout(hideError, 5000); // timeout
                }
            });

        }
        else if(item.productTodo == 'Both')
        {
            vm.ProductModeError = false;
          //console.log("Both block");

            var data = {
                organization : vm.BaseurlOrgId,
                product : item._links.self.href,
            };

            //console.log("Data : " + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/suppliers', data, addtodoconfig)
                .success(function (data, status, addtodoconfig) {
                   //console.log("Sales Data : " +JSON.stringify(data));
                   //console.log("Sales Status : " +status);

                    if(status == 201)
                    {
                        vm.BothError = false;
                        vm.SalesError = false;
                        vm.PurchaseError = false;

                        vm.BothSuccess = true;

                        var hideSuccessMsg = function() {
                            vm.BothSuccess = false;
                        }

                        $timeout(hideSuccessMsg, 5000); // timeout
                    }

                }).error(function (data, status) {
                //console.log("Error Data : " +data);
                //console.log("Error Status : " +status);
                sessionout.checksessionout(status);
                if(status == 409)
                {

                    vm.SalesError = false;
                    vm.PurchaseError = false;
                    vm.BothError = true;

                    var hideError = function() {
                        vm.BothError = false;
                    }

                    $timeout(hideError, 5000); // timeout
                }
            });

            var data = {
                product : item._links.self.href,
                organization : vm.BaseurlOrgId,
            };

            //console.log("Data : " + JSON.stringify(data));

            $http.post(ContextPath +'/api/v1/purchasers', data, addtodoconfig)
                .success(function (data, status, addtodoconfig) {
                    //console.log("Purchasers Data : " +JSON.stringify(data));
                    //console.log("Purchasers Status : " +status);

                    if(status == 201)
                    {
                        vm.BothError = false;
                        vm.SalesError = false;
                        vm.PurchaseError = false;

                        vm.BothSuccess = true;

                        var hideSuccessMsg = function() {
                            vm.BothSuccess = false;
                        }

                        $timeout(hideSuccessMsg, 5000); // timeout
                    }

                }).error(function (data, status) {
                //console.log("Error Data : " +data);
                //console.log("Error Status : " +status);
                sessionout.checksessionout(status);
                if(status == 409)
                {
                    vm.SalesError = false;
                    vm.PurchaseError = false;
                    vm.BothError = true;

                    var hideError = function() {
                        vm.BothError = false;
                    }

                    $timeout(hideError, 5000); // timeout
                }
            });


        }

    }



    /*
     * Method Name  - getsearchproduct
     * Created By   - vaibhav godambe
     * Created On   - 14 feb 2017
     * Modified By  -
     * Modified On  -
     * Purpose      - This method is used to get product data.
     */

    //config parameter is need to send client data to server in ajax request
    var searchproductconfig = {
        headers : {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }



    vm.getsearchproduct = function(productcategoryform,ids){

        vm.prodcategory = true;

        vm.product = '';

        if(ids == 3)
        {
            vm.getsearchpage = 0;
            vm.getsearchlast = 0;



        }

        //alert('ids is 4 :' + ids );

        if(productcategoryform.$valid || ids == 4)
        {
            vm.SearchByCategory = false; // to hide the previous pagination
            vm.SearchByCategoryProductName = true;

           //console.log("show category product : " + vm.productcategory );
           //console.log("search box string : " + vm.searchproduct );

            if(ids == 3)
            {
               //alert('ids is 3');

               // $http.get(ContextPath + '/api/v1/products/search/findByCategoryIdAndProductContaining?categoryId=' + vm.productcategory + '&product=' + vm.searchproduct + '&projection=detail', searchproductconfig)
            if(vm.productcategory!='ALLCat') {
                $http.get(ContextPath + '/api/v1/products/search/findByCategoryIdAndProductContainingIgnoreCase?categoryId=' + vm.productcategory + '&product=' + vm.searchproduct + '&projection=detail', searchproductconfig)
                    .success(function (data, status) {
                        //console.log("Get product Data : " +JSON.stringify(data));
                        //console.log("Get product Status : " +status);

                        if (data.page.totalElements != 0) {
                            vm.product = data._embedded.products; // Product
                        }
                        else {
                            vm.product = [];
                        }

                        //console.log("Get product Data using other categries : " +JSON.stringify(vm.product));

                        vm.getsearchprodlength = data.page.totalElements;
                        vm.getsearchlast = data.page.totalPages;

                    }).error(function (data, status) {
                    sessionout.checksessionout(status);
                    //console.log("Get product Error Data : " + data);
                    //console.log("Get product Error Status : " + status);
                });

            }else{

                $http.get(ContextPath + '/api/v1/products/search/findByProductContainingIgnoreCase?productId='+  vm.searchproduct +'&projection=detail', searchproductconfig)
                    .success(function (data, status) {
                        //console.log("Get product Data : " +JSON.stringify(data));
                        //console.log("Get product Status : " +status);

                        if (data.page.totalElements != 0) {
                            vm.product = data._embedded.products; // Product
                            vm.prodlength=vm.product.length;
                        }
                        else {
                            vm.product = [];
                        }

                       // console.log("Get product Data using ALL categries : " +JSON.stringify(vm.product));

                        vm.getsearchprodlength = data.page.totalElements;
                        vm.getsearchlast = data.page.totalPages;

                    }).error(function (data, status) {
                    sessionout.checksessionout(status);
                    //console.log("Get product Error Data : " + data);
                    //console.log("Get product Error Status : " + status);
                });


            }


            }
            else
            {
                //alert('ids is 4');

               // $http.get(ContextPath + '/api/v1/products/search/findByCategoryIdAndProductContaining?categoryId=' + vm.productcategory + '&product=' + vm.searchproduct + '&projection=detail&page='+ vm.getsearchpage , searchproductconfig)

                $http.get(ContextPath + '/api/v1/products/search/findByCategoryIdAndProductContainingIgnoreCase?categoryId=' + vm.productcategory + '&product=' + vm.searchproduct + '&projection=detail&page='+ vm.getsearchpage , searchproductconfig)
                    .success(function (data, status) {
                       //console.log('Product details page vice : ' + JSON.stringify(data));
                       //console.log('Product details status : ' + status);

                        if(data.page.totalElements != 0)
                        {
                            vm.product = data._embedded.products; // Product
                        }
                        else
                        {
                            vm.product = [];
                        }


                        vm.getsearchprodlength = data.page.totalElements;
                        vm.getsearchlast = data.page.totalPages;

                       //console.log("Last page" + vm.last);
                    })
                    .error(function (data, status) {
                        sessionout.checksessionout(status);
                        //console.log("Product details Error Data : " +data);
                        //console.log("Product details Error Status : " +status);
                    });
            }
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
        if(vm.getsearchpage != 0)
        {
            vm.getsearchpage = 0;
            vm.getsearchproduct(productcategoryform,4);
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
        //alert(typeof vm.last);

        var currentLasts = vm.getsearchlast - 1;
        if(vm.getsearchpage != currentLasts)
        {
            vm.getsearchpage = parseInt(vm.getsearchlast - 1);
            //alert("productcategoryform last page : " + vm.getsearchpage);
            vm.getsearchproduct(productcategoryform,4);
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

        if(vm.getsearchpage != 0)
        {
            vm.getsearchpage = vm.getsearchpage - 1;
            //alert(" productcategoryform previous page : " + vm.getsearchpage);
            vm.getsearchproduct(productcategoryform,4);
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
        var currentLasts = vm.getsearchlast - 1;
        if(vm.page != currentLasts)
        {
            vm.getsearchpage = vm.getsearchpage + 1;
            //alert("productcategoryform next page : " + vm.getsearchpage);
            vm.getsearchproduct(productcategoryform,4);
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

    }/*
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

            //   alert("firstname : " + vm.fName + " middlename : " + vm.mName + " lastname : " + vm.lName + " Gender : " + vm.radioG  + " Company Name : " + vm.coName + " mobile number : " + vm.cNumber + " emailid : " + vm.emailId + " vm.username : " + vm.uName + " password : " + vm.password + " con pass : " + vm.cpassword);

            vm.sendrequestupdateprofile = true;

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

                    //angular.element("#EditProfileModal").modal('hide'); // hide signup modal
                    //$location.path('/admindashbord');

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

    }/*
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

            //   alert("firstname : " + vm.fName + " middlename : " + vm.mName + " lastname : " + vm.lName + " Gender : " + vm.radioG  + " Company Name : " + vm.coName + " mobile number : " + vm.cNumber + " emailid : " + vm.emailId + " vm.username : " + vm.uName + " password : " + vm.password + " con pass : " + vm.cpassword);

            vm.sendrequestupdateprofile = true;

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

                    //angular.element("#EditProfileModal").modal('hide'); // hide signup modal
                    //$location.path('/admindashbord');

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



     /*---------------------------------
     * Multiple product upload
     *
     *
     ---------------------------------- */
    var files = null; // default

    vm.ExcelUpload = function (event) {

        files = event.target.files; //FileList objects

        var FileName =  files[0].name;
        vm.ExactFileName = FileName.split('.');
        vm.ExactFileName = vm.ExactFileName[0];
        vm.MyFileExtension = FileName.split('.').pop();
        //console.log("File Extension : " + vm.MyFileExtension);
        //console.log("File name : " + vm.ExactFileName);

        var MYFormData = new FormData();
        MYFormData.append("file", files[0]);
        MYFormData.append("organization",Orgnid_Cookie);

      //console.log("Data : " + MYFormData);

        // if(vm.ExactFileName == 'sample_format')
        // {
           // vm.DocNameErrorData = false; // hide error
           //  $('#vali_error1').text('');

            if (vm.MyFileExtension == 'xlsx')
            {

               // vm.DocTypeErrorData = false; //hide error
                $('#vali_error2').text('');

                vm.sendrequestMultipleAddProduct = true; // start loader

                $http.post(ContextPath + '/api/v1/excel', MYFormData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (data, status) {
                        //console.log('Excel Upload : ' + JSON.stringify(data));
                        //console.log('Excel Upload status : ' + status);
                        vm.sendrequestMultipleAddProduct = false; // stop loader

                        vm.ExcelSuccessData = true; // show msg

                        var hideMsg = function () {
                            vm.ExcelSuccessData = false; // hide msg
                            $route.reload();
                        }

                        $timeout(hideMsg, 5000); // timeout

                    })
                .error(function (data, status) {
                        sessionout.checksessionout(status);
                        vm.sendrequestMultipleAddProduct = false; // stop loader
                        vm.ExcelErrorData = true; // show msg

                        var hideMsg = function () {
                            vm.ExcelErrorData = false; // hide msg
                        }
                        $timeout(hideMsg, 5000); // timeout

                        //console.log("Excel Upload Error Data : " + data);
                        //console.log("Excel Upload Error Status : " + status);
                    });
            }
            else
            {

                // $('#vali_error1').text('');
                $('#vali_error2').text('Invalid file type. Please select .xlsx format to upload');
               // vm.DocNameErrorData = false; // hide error
               // vm.DocTypeErrorData = true; //show error

                vm.sendrequestMultipleAddProduct = false; // stop loader

            }
        // }
        // else
        // {
        //
        //     $('#vali_error1').text('Invalid file name. Please select sample_format.xlsx file to upload');
        //     $('#vali_error2').text('');
        //    // vm.DocTypeErrorData = false; // hide error
        //     //vm.DocNameErrorData = true; // show error
        //
        //     vm.sendrequestMultipleAddProduct = false; // stop loader
        // }

    }


});