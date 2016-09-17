angular.module('starter.controllers', ['starter.services', 'ngCordova'])
.controller('LobbyCtrl', function($scope,$state, $stateParams,localStorage,$http) {
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
})
.controller('StallsCtrl', function($scope,$state,$ionicLoading,$timeout, $stateParams,$http,STALLS) {
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    var tmpList;
    STALLS.getStallList()
        .success(function(res) {
            $scope.Stall_Set = res.layout_list;
            tmpList = res.layout_list;
            $scope.pic_model = tmpList[0].layout;
            $ionicLoading.hide();
        })
        .error(function(res){
            
        });
    
    $scope.setPic = function(picName) {
        var tmp = STALLS.searchStalls(picName , tmpList);
        $scope.pic_model = tmp.layout;
    }
})
.controller('SchoolSearchCtrl', function($scope,$state, $stateParams,$window, FavoriteList_Func, schoolFilter, studyGroup,localStorage) {

    var filterSunmary = {};
	$scope.school_fifter = schoolFilter;
	$scope.studyGroup = studyGroup;
	$scope.filterResultArea = [];
	$scope.filterResultGroup = [];
	localStorage.removeItem('filterSunmary');
    
	$scope.checkedOrNotAera = function (SchoolareaName, schoolArea, $index) {
		if (schoolArea) {
			$scope.filterResultArea.push(""+$index);
		} else {
        var _index = $scope.filterResultArea.indexOf(""+$index);
			$scope.filterResultArea.splice(_index, 1);
		}	
	};
	$scope.checkedOrNotGroup = function (Group, studyGroup_data, $index) {
		var _index;
		if (studyGroup_data) {
			$index = $index +1;
			if ($index < 10){
				$scope.filterResultGroup.push("0"+$index);
			}else{
				$scope.filterResultGroup.push(""+$index);
			}
		} else {
			$index = $index +1;
			if ($index < 10){
				_index = $scope.filterResultGroup.indexOf("0"+$index);
				$scope.filterResultGroup.splice(_index, 1);
				
			}else{
				_index = $scope.filterResultGroup.indexOf(""+$index);
				$scope.filterResultGroup.splice(_index, 1);
			}
		}
	};
    $scope.oneAtATime = true;
	$scope.Filtersubmit = function(){
		filterSunmary = {
			"DepartList" : $scope.filterResultGroup,
			"AreaList" : $scope.filterResultArea
		}
		localStorage.setObject('filterSunmary', filterSunmary);
        localStorage.set('filterType', '0');
        filterSunmary = {};
        $state.go('searchlist');
		
	};
    $scope.backtoLobby = function() {
        if(localStorage.getObject('filterSunmary') != null) {
            localStorage.removeItem('filterSunmary');
        }
        if(localStorage.get('filterType') != null) {
            localStorage.removeItem('filterType');
        }
        filterSunmary = {};
        $state.go('lobby');
    }
    $scope.filterResultArea.length = 0;
    $scope.filterResultGroup.length = 0;
})
.controller('ThemeEventsCtrl', function($scope,$state,$ionicLoading, $stateParams, ThemeEvents_serve,$http,$cordovaBarcodeScanner,$ionicPopup, $timeout,$window,localStorage) {
    //若無accessToken則導引至登入頁
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    //設定使用者id
    var fbtmp = localStorage.getObject('fbUserinfo');
    var UserId =fbtmp.id;
    
    var boxS;
    var alphabet_list;
    var i;
    var j;
    var picture = "";
    var alphabet_tmp = [];
    var Block = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA+s9J6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAKISURBVHhe7dMxAQAgDMCwgX/PwIGHPslTBV3nGSCzf4GICSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQUjMXJIEFvkOhX5EAAAAASUVORK5CYII=";
    //集章簿初始化
    
    ThemeEvents_serve.getalphabet(UserId)
        .success(function(response){
            
            boxS = response.box_status;
            $scope.CboxStatus = "不可兌換";
            if(response.status == "403") {
                for (i = 1;i <= 15;i++){
                    alphabet_tmp.push(Block);
                }
                $scope.StampNum = 0;
            }else{
                alphabet_list = response.collectionbox;
                if (alphabet_list.length == 15){
                    if(boxS == 0) {
                        $scope.CboxStatus = "可兌換";
                    } else {
                        $scope.CboxStatus = "已兌換";
                    }
                }
                for (i = 0;i <= alphabet_list.length-1;i++){
                    picture = alphabet_list[i].picture;
                    alphabet_tmp.push(picture);
                }
                $scope.StampNum = alphabet_list.length;
                for (j = 1;j <= (15 - alphabet_list.length);j++){
                    alphabet_tmp.push(Block);
                }
            }
            $scope.alphabet = alphabet_tmp;
            $ionicLoading.hide();
        })
        .error(function (response) {
            //無法正常取得集章簿
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
               title: '',
               template: '網路似乎出錯囉！請稍後再試'
            });
            alertPopup.then(function(res) {
               //導回lobby
               $state.go('lobby');
            });

        });
    $scope.scanBarcodeStamp = function () {
        //掃描學校QRcode，並回傳給後端資料庫
        $cordovaBarcodeScanner.scan().then(function (result) {
            var tmp = angular.fromJson(result.text);
            ThemeEvents_serve.collectStamp(UserId,tmp.schoolnum)
                .success(function(response){
                    //該頁面reload
                    var alertPopup = $ionicPopup.alert({
                        title: '',
                        template: response.message
                    });
                    alertPopup.then(function(res) {
                        //更新目前的集章簿
                        if(response.status == 201 || response.status ==200) {
                            ThemeEvents_serve.getalphabet(UserId)
                                .success(function(response){
                                    boxS = response.box_status;
                                    alphabet_list = response.collectionbox;
                                    for (i = 0;i <= alphabet_list.length-1;i++){
                                        picture = alphabet_list[i].picture;
                                        alphabet_tmp[i] = picture;
                                    }
                                    if (alphabet_list.length == 15){
                                        if(boxS == 0) {
                                            $scope.CboxStatus = "可兌換";
                                        } else {
                                            $scope.CboxStatus = "已兌換";
                                        }
                                    }
                                    $scope.StampNum = alphabet_list.length;
                                    $scope.alphabet = alphabet_tmp;
                                })
                                .error(function (response) {
                                });
                        }
                    });
                    
                })
                .error(function (response) {
                    //無法正常送出集章記錄並更新集章簿
                    var alertPopup = $ionicPopup.alert({
                       title: '',
                       template: '網路似乎出錯囉！請稍後再進行集章'
                    });
                });
        }, function (error) {
            //無法正常開啟掃瞄器
            var alertPopup = $ionicPopup.alert({
               title: '',
               template: '無法正常啟動掃描器'
            });
        });
    };
    $scope.scanBarcodeExchange = function() {
        //掃描兌換QRcode，並回傳給後端資料庫來判斷是否可兌換
        $cordovaBarcodeScanner.scan().then(function (result) {
            var tmpurl = result.text;
            if(tmpurl == "/collectionbox/exchange") {
                ThemeEvents_serve.exchangeCBox(UserId,tmpurl)
                    .success(function(response){
                        //該頁面reload
                        var alertPopup = $ionicPopup.alert({
                            title: '',
                            template: response.message
                        });
                        var status = response.status;
                        alertPopup.then(function(res) {
                            if(status == "200") {
                                $scope.CboxStatus = "已兌換";
                                boxS = "Y";
                            }
                            
                        });
                    })
                    .error(function (response) {
                        //無法正常送出兌換的request
                        var alertPopup = $ionicPopup.alert({
                           title: '',
                           template: '網路似乎出錯囉！請稍後再進行兌換'
                        });
                    });
            } else {
                var alertPopup = $ionicPopup.alert({
                   title: '',
                   template: '請掃描兌換專用的QRcode'
                });
            }
        }, function (error) {
            //無法正常開啟掃瞄器
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
               title: '',
               template: '無法正常啟動掃描器'
            });
        });
    };
})
.controller('TrafficCtrl', function($scope,$state,$ionicLoading,$timeout, $stateParams, $http,MAP) {
    var mapList;
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    MAP.getPosList()
		.success(function(res){
			$scope.Pos_Set = res.traffic_list;
			mapList = res.traffic_list;
			$scope.name = "地點；" + mapList[0].name;
			$scope.address = "地址：" + mapList[0].address;
			$scope.time = "時間：" + mapList[0].starttime + "~" + mapList[0].endtime;
			//預設地圖為參展資料之第一筆地區資料
			var posT = MAP.searchPos(mapList[0].name, mapList);
            $scope.position = posT.position;
            $ionicLoading.hide();
		})
		.error(function(res){
			
		});
    //偵測到地區按鈕被點擊，即reload該地區圖資
    $scope.setPos=function(posName) {
        var posT = MAP.searchPos(posName, mapList);
        $scope.position = posT.position;
		$scope.name = "地點；" + posT.name;
		$scope.address = "地址：" + posT.address;
		$scope.time = "時間：" + posT.starttime + "~" + posT.endtime;

    };
})
.controller('NewsCtrl', function($scope,$state,$ionicLoading,$timeout, $stateParams, $http, News, $ionicPopup, $timeout) {
    var tmpList;
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    News.getNewsList()
        .success(function(res) {
            $scope.News_Set = res.news_set;
            tmpList = res.news_set;
            $ionicLoading.hide();
        })
        .error(function(res){
        });
    $scope.getNews = function(newsTitle) {
        var tmp = News.searchNews(newsTitle , tmpList);
        $ionicPopup.alert({
            title: tmp.title,
            template: tmp.content,
            cssClass: 'news-alert'
        });
    }
})
.controller('QuestionnaireSelect', function($scope, $window,$ionicLoading,$timeout, $http, Questionnaire_serve,  $state, $ionicHistory, localStorage) {

    //若無accessToken則導引至登入頁
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    var qSet;
    var count = 0;
    var change = "";
    var ansSunmary={};
    
    var fbtmp = localStorage.getObject('fbUserinfo');
    var UserId =fbtmp.id;
    Questionnaire_serve.getQuestionnaire(UserId)
        .success(function (response) {
            if(response.status == '403') {
                $state.go('Q-end');
            } else {
                qSet = response.questionset; 
                $scope.selected = [];
                $scope.selected = [];
                $scope.isChecked = false;    
                $scope.q_Ans = [];
                var user = {    
                };
                 ansSunmary= {
                    "userid" : UserId,
                    "userAnsList" : $scope.q_Ans
                };  
                $scope.Questionnaire_List_question1 = qSet[0].description;
                if (qSet[0].type == "MultiSelect"){
                    $scope.q_option_type_Test = qSet[count].type;
                    $scope.Questionnaire_List_option_M = qSet[count].options;
                    $scope.checkedOrNot = function (asset, isChecked, index) {
                        if (isChecked) {
                            $scope.selected.push(asset);
                        } else {
                            var _index = $scope.selected.indexOf(asset);
                            $scope.selected.splice(_index, 1);
                        }
                    };
                }
                if (qSet[0].type == "SingleSelect"){
                    $scope.q_option_type_Test = qSet[count].type;
                    $scope.Questionnaire_List_option_S = qSet[count].options;
                    $scope.selectedOrNot=function(item){
                        $scope.selected = [];
                        $scope.selected.push(item);
                    }
                }
                $scope.q_option_type_Test = qSet[0].type;
                $scope.info = response.info;
                
                if (count == qSet.length)
                {
                    $scope.state = "問卷結束";
                    $scope.Questionnaire_List_question1 = "";
                    $scope.Questionnaire_List_option1 = "";
                }
                else
                {
                    count = count + 1;
                }
            }
            $ionicLoading.hide();
        })
        .error(function (response) {

        });
    $scope.state = "下一題";
    $scope.nextQ = function() {    //下一題的功能區塊
		var tmp = {
			"options" : $scope.selected
		};
        if (count == qSet.length+1){
            $window.location.href = '#lobby';
            $window.location.reload();
            count = 0;
        }
        else
        {
            if (count == qSet.length){
                
                $scope.q_Ans.push(tmp);
                $scope.selected = [];
                change = null;
                $scope.state = "回首頁";
                $scope.Questionnaire_List_question1 = "";
                $scope.Questionnaire_List_option_M = "";
                $scope.Questionnaire_List_option_S = "";
                $scope.q_option_type_Test = "";
                $scope.Questionnaire_List_count = count;
                count = count + 1;
                $scope.ansSunmary_test = ansSunmary;
                Questionnaire_serve.postQuestionnaire(ansSunmary)
                    .success(function (response){
                        $scope.end_content = "感謝頗冗填寫此活動問卷";
                        console.log(response.status);
                        console.log("YES");
                    })
                    .error(function (response) {
                        $scope.end_content = "感謝頗冗填寫此活動問卷";
                        console.log(response);
                        console.log("NO");
                    });
                
            }else{
                $scope.state = "下一題";
                $scope.Questionnaire_List_question1 = qSet[count].description;
                $scope.Questionnaire_List_count = count;
                $scope.q_option_type_Test = qSet[count].type;
                
                if (qSet[count].type == "MultiSelect"){
                    $scope.Questionnaire_List_option_M = "";
                    $scope.Questionnaire_List_option_S = "";
                    $scope.q_option_type_Test = qSet[count].type;
                    $scope.Questionnaire_List_option_M = qSet[count].options;
                    $scope.checkedOrNot = function (asset, isChecked, index) {
                        if (isChecked) {
                            $scope.selected.push(asset);
                        } else {
                            var _index = $scope.selected.indexOf(asset);
                            $scope.selected.splice(_index, 1);
                        }
                    }; 
                }
                if (qSet[count].type == "SingleSelect"){
                    $scope.Questionnaire_List_option_M = "";
                    $scope.Questionnaire_List_option_S = "";
                    $scope.q_option_type_Test = qSet[count].type;
                    $scope.Questionnaire_List_option_S = qSet[count].options;
                    $scope.selectedOrNot=function(item){
                        $scope.selected = [];
                        $scope.selected.push(item);
                    } 
                }
                tmp = {
                "options" : $scope.selected
                    };
                    $scope.q_Ans.push(tmp);
                    count = count + 1;
                    $scope.selected = [];
                    change = null;
            }
        }
    }
})
.controller('PhotosCtrl', function($scope,$state, $stateParams) {

})
.controller('LikeListCrtl', function($scope,$state,$ionicLoading,$timeout, $stateParams,FavoriteList_Func,$http,localStorage,$window) {
    //若無accessToken則導引至登入頁
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
    //設定使用者id
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    var fbtmp = localStorage.getObject('fbUserinfo');
    var UserId =fbtmp.id;
    
    FavoriteList_Func.getFavoriteList(UserId)
        .success(function(res) {
            $scope.fList = res.favoriteList;
            $ionicLoading.hide();
        })
        .error(function(res){
            
        });
    $scope.getSchoolinfo = function(schoolnum) {
        var tmp = schoolnum;
        localStorage.set('backFlag','Y');
        localStorage.removeItem('SchoolNum');
        localStorage.set('SchoolNum', tmp);
        $state.go('schoolinfoSunmary.schoolinfo');
    }
    $scope.backtoLobby = function() {
        localStorage.removeItem('backFlag');
        $state.go('lobby');
    }
})
.controller('LecturetimeCrtl', function($scope,$state, $ionicLoading,$timeout,$stateParams, $http, Lecture) {
    var tmpList;
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    Lecture.getLectureList()
        .success(function(res) {
            $scope.button_Set = res.area_set;
            $scope.Lecture_Set = res.area_set[0].lec_Set;
            tmpList = res.area_set;
            $ionicLoading.hide();
        })
        .error(function(res){
            
        });
    $scope.setLecture = function(areaName) {
        var tmp = Lecture.searchLecture(areaName , tmpList);
        $scope.Lecture_Set = tmp.lec_Set;
    }
})
.controller('SearchListCtrl', function($scope,$state,$ionicLoading,$timeout, $stateParams,localStorage,schoolSearchRes) {
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    var filterType = localStorage.get('filterType');
    var filterSunmary = localStorage.getObject('filterSunmary');
    if(filterType == '0') {
        schoolSearchRes.getResult(filterSunmary)
            .success(function (response) {      
                $scope.searchList = response.searchList;
                $scope.schoolNum = response.searchList.schoolNum;
                $ionicLoading.hide();
            })
            .error(function (response) {

            });
    } else {
        schoolSearchRes.getResult_schname(filterSunmary)
            .success(function (response) {      
                $scope.searchList = response.searchList;
                $scope.schoolNum = response.searchList.schoolNum;
                $ionicLoading.hide();
            })
            .error(function (response) {

            });
    }
	$scope.getSchoolNum = function(schoolNum){
        localStorage.removeItem('SchoolNum');
		localStorage.set('SchoolNum', schoolNum);
        if(localStorage.get('backFlag') != null){
            localStorage.removeItem('backFlag');
        }
        $state.go('schoolinfoSunmary.schoolinfo');
	}
    $scope.backtoLobby = function() {

        $state.go('schoolSunmary.school');
    }
})
.controller('SchoolinfoCtrl', function($scope,$state, $ionicLoading,$timeout,$stateParams,localStorage,schoolSearchRes,$ionicPopup,FavoriteList_Func) {
    //若無accessToken則導引至登入頁
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    //設定使用者id
    var fbtmp = localStorage.getObject('fbUserinfo');
    var UserId =fbtmp.id;
    
    var schoolNum = localStorage.get('SchoolNum');
	var schoolInformation= {};
	var res_status = "";
    var schName="";
    
    schoolSearchRes.getSchoolDetail(schoolNum)
		.success(function (response) {
		   res_status = response.status;
           schName = response.chineseName;
		   $scope.res_status = res_status;
		   if(res_status == "200-1"){
               $scope.schoolNum = schoolNum;
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-2"){
               $scope.schoolNum = schoolNum;
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   }
		   if(res_status == "200-3"){
               $scope.schoolNum = schoolNum;
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = ""; 
				   }
			   } 
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-4"){
               $scope.schoolNum = schoolNum;
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = "";
				   }
			   } 
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   }
           $ionicLoading.hide();
		})
		.error(function (response) {

		});
    
    $scope.setFavoriteList = function() {
        FavoriteList_Func.updateFavoriteList(UserId,schoolNum,schName)
            .success(function(res) {
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: res.message
                });
            })
            .error(function(res){

            });
    }
    $scope.backToindex = function() {
        if(localStorage.getObject('filterSunmary') != null) {
            localStorage.removeItem('filterSunmary');
        }
        if(localStorage.get('filterType') != null) {
            localStorage.removeItem('filterType');
        }
        if(localStorage.get('SchoolNum') != null) {
            localStorage.removeItem('SchoolNum');
        }
        $state.go('lobby');
    }
    $scope.backtoLobby = function() {
        if(localStorage.get('backFlag') != null){
            
            localStorage.removeItem('backFlag');
            $state.go('like_list');
        }else{
            $state.go('searchlist');
        }
    }
})
.controller('SchoolunitCtrl', function($scope,$state,$ionicLoading,$timeout, $stateParams,localStorage,schoolSearchRes,$ionicPopup,FavoriteList_Func) {
    //若無accessToken則導引至登入頁
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    //設定使用者id
    var fbtmp = localStorage.getObject('fbUserinfo');
    var UserId =fbtmp.id;
    
    var schoolNum = localStorage.get('SchoolNum');
	var schoolInformation= {};
	var res_status = "";
    var schName="";
    
    schoolSearchRes.getSchoolDetail(schoolNum)
		.success(function (response) {
		   res_status = response.status;
           schName = response.chineseName;
		   $scope.res_status = res_status;
		   if(res_status == "200-1"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-2"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   }
		   if(res_status == "200-3"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = ""; 
				   }
			   } 
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-4"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = "";
				   }
			   } 
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   } 
           $ionicLoading.hide();
		})
		.error(function (response) {

		});
    
    $scope.setFavoriteList = function() {
        FavoriteList_Func.updateFavoriteList(UserId,schoolNum,schName)
            .success(function(res) {
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: res.message
                });
            })
            .error(function(res){

            });
    }
    $scope.backToindex = function() {
        if(localStorage.getObject('filterSunmary') != null) {
            localStorage.removeItem('filterSunmary');
        }
        if(localStorage.get('filterType') != null) {
            localStorage.removeItem('filterType');
        }
        if(localStorage.get('SchoolNum') != null) {
            localStorage.removeItem('SchoolNum');
        }
        $state.go('lobby');
    }
    $scope.backtoLobby = function() {
        if(localStorage.get('backFlag') != null){
            localStorage.removeItem('backFlag');
            $state.go('like_list');
        }else{
            $state.go('searchlist');
        }
    }
})
.controller('SchoolpresentCtrl', function($scope,$state, $ionicLoading,$timeout,$stateParams,localStorage,schoolSearchRes,$ionicPopup,FavoriteList_Func) {
    //若無accessToken則導引至登入頁
    if(localStorage.get('accessToken') == null) {
        $state.go('login');
    }
    $ionicLoading.show({
      noBackdrop: true,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });
    //設定使用者id
    var fbtmp = localStorage.getObject('fbUserinfo');
    var UserId =fbtmp.id;
    
    var schoolNum = localStorage.get('SchoolNum');
	var schoolInformation= {};
	var res_status = "";
    var schName="";
    
    schoolSearchRes.getSchoolDetail(schoolNum)
		.success(function (response) {
		   res_status = response.status;
           schName = response.chineseName;
		   $scope.res_status = res_status;
		   if(res_status == "200-1"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-2"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   }
		   if(res_status == "200-3"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = ""; 
				   }
			   } 
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-4"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = "";
				   }
			   } 
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   } 
           $ionicLoading.hide();
		})
		.error(function (response) {

		});
    
    $scope.setFavoriteList = function() {
        FavoriteList_Func.updateFavoriteList(UserId,schoolNum,schName)
            .success(function(res) {
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: res.message
                });
            })
            .error(function(res){

            });
    }
    $scope.backToindex = function() {
        if(localStorage.getObject('filterSunmary') != null) {
            localStorage.removeItem('filterSunmary');
        }
        if(localStorage.get('filterType') != null) {
            localStorage.removeItem('filterType');
        }
        if(localStorage.get('SchoolNum') != null) {
            localStorage.removeItem('SchoolNum');
        }
        $state.go('lobby');
    }
    $scope.backtoLobby = function() {
        if(localStorage.get('backFlag') != null){
            localStorage.removeItem('backFlag');
            $state.go('like_list');
        }else{
            $state.go('searchlist');
        }
    }
})
.controller('SchnameSearchCtrl', function($scope,$state, $stateParams, $ionicPopup, schoolSearchRes,localStorage) {
    $scope.schname = "";//初始化輸入框
    $scope.Filtersubmit = function(schname) {
        var tmp = schname;
        if (tmp == "") {
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: '輸入欄不可空白'
            });
        } else {
            var data = {
                "schname": tmp
            };
            localStorage.setObject('filterSunmary', data);
            localStorage.set('filterType', '1');
            $scope.schname = "";
            $state.go('searchlist');
        }
    }
    $scope.backtoLobby = function() {
        if(localStorage.getObject('filterSunmary') != null) {
            localStorage.removeItem('filterSunmary');
        }
        if(localStorage.get('filterType') != null) {
            localStorage.removeItem('filterType');
        }
        $state.go('lobby');
    }
})
.controller('LoginCtrl', function($scope,$state, $stateParams,$cordovaOauth,$ionicPopup,localStorage,$http,Login_Func) {
    $scope.fbLogin = function () {
        $cordovaOauth.facebook('504278906430966',
                ["email", "user_friends", "public_profile"])
                .then(function (result) {
                    localStorage.set('accessToken',result.access_token);
                    $http.get("https://graph.facebook.com/v2.3/me", 
                        {
                            params: 
                                {
                                    access_token: localStorage.get('accessToken') , 
                                    fields: "id,name,age_range,email", 
                                    format: "json" 
                                }
                        }).then(function(result) {
                            //server與client端各儲存一份userinfo
                            localStorage.setObject('fbUserinfo', result.data);
                            Login_Func.updateUserInfo(result.data.id,result.data.name,
                                    result.data.age_range, result.data.email)
                                .success(function(res) {
                                    $state.go('lobby');
                                })
                                .error(function(res){
                                    $state.go('login');
                                });
                        
                        }, function(error) {
                            $state.go('login');
                        });
                }, function (error) {
                    $state.go('login');
                })
    }
})
.controller('OtherCtrl', function($scope,$state, $stateParams,localStorage) {

})
;