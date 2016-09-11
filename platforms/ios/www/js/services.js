var services = angular.module('starter.services', []);
var urlBase = 'http://api.overseas.ncnu.edu.tw:8080/V1';
var root_country = 'hk';//控制取得資訊地區
services.factory('localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    removeItem: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}]);
services.factory('STALLS',function ($filter, $http) {
    var self = this;
    self.searchStalls = function(stallName , tmpList) {
        var stalls_tmp = null;
        
        var found = $filter('filter')(tmpList,{"name": stallName}, true)
        if (found.length) {
            stalls_tmp = angular.fromJson(found[0]);
        }
        return stalls_tmp;
    }
    self.getStallList = function() {
        var Stalls_List;
        var link = urlBase + '/exhibitions/layout/'+root_country;
        Stalls_List = $http.get(link);
        return Stalls_List;
    }
    return self;
});
services.factory('Questionnaire_serve', function($http){
    var Questionnaire_List;
    var self = this;
    self.getQuestionnaire = function(userid){
        var link = urlBase + '/questionnaire/'+root_country+'?userid='+userid;
        Questionnaire_List = $http.get(link);
        return Questionnaire_List;
    }
    self.postQuestionnaire = function(ansList){
        var link = urlBase + '/questionnaire/'+root_country;
        var data = ansList;
        return $http.post(link,data);
    }
    return self;
});
services.factory('ThemeEvents_serve', function($http){
    var alphabet_list;
    var self = this;
    self.getalphabet = function(id){
        var link = urlBase +'/exhibitions/activity/'+id+'/'+root_country+'/collectionbox';
        alphabet_list = $http.get(link);
        return alphabet_list;
    }
    self.collectStamp = function(id,schoolnum){
        var link = urlBase + '/exhibitions/activity/collectionbox';
        var data = {
            "userid": id,
            "country": root_country,
            "schoolnum": schoolnum
        };
        var response = $http.put(link, data);
        return response;
    }
    self.exchangeCBox = function(id,url){
        var link = urlBase + '/exhibitions/activity/'+id+'/'+root_country+url;
        var response = $http.get(link);
        return response;
    }
    return self;
});
services.factory('News',function ($filter, $http) {
    var self = this;
    self.searchNews = function(newsTitle , tmpList) {
        var news_tmp = null;
        
        var found = $filter('filter')(tmpList,{"title": newsTitle}, true)
        if (found.length) {
            news_tmp = angular.fromJson(found[0]);
        }
        return news_tmp;
    }
    self.getNewsList = function() {
        var News_List;
        var link = urlBase + '/news/'+ root_country;
        News_List = $http.get(link);
        return News_List;
    }
    return self;
});
services.factory('Lecture',function ($filter, $http) {
    var self = this;
    self.searchLecture = function(areaName , tmpList) {
        var lec_tmp = null;
        var found = $filter('filter')(tmpList,{"area": areaName}, true)
        if (found.length) {
            lec_tmp = angular.fromJson(found[0]);
        }
        return lec_tmp;
    }
    self.getLectureList = function() {
        var Lecture_List;
        var link = urlBase + '/exhibitions/lectures/'+ root_country;
        Lecture_List = $http.get(link);
        return Lecture_List;
    }
    return self;
});
services.factory('MAP', function ($filter, $http) {
    var self = this;
    self.getPosList = function(){
        var Pos_List;
        var link = urlBase + '/exhibitions/traffic/'+ root_country;
        Pos_List = $http.get(link);
        return Pos_List;
    }
    self.searchPos = function(posName, temList) {
        var pos_tmp = null;
        //利用posName來找出陣列中符合的gps資訊
        var found = $filter('filter')(temList, {"name": posName}, true);
        if (found.length) {
            pos_tmp = angular.fromJson(found[0]);
        }
        return pos_tmp;
    }
    return self
});
services.factory('schoolSearchRes', function($http){
	var self = this;
	self.getResult = function(data){
		var result;
		var link = urlBase + '/school/search';
		result = $http.put(link,data);
		return result;
	}
	self.getResult_schname = function(data) {
        var result;
		var link = urlBase + '/school/schname/search';
		result = $http.put(link,data);
		return result;
    }
	self.getSchoolDetail = function(schoolNum){
		var SchoolDetail;
		var link = urlBase + '/school/'+schoolNum+'?country='+ root_country;
		SchoolDetail = $http.get(link);
		return SchoolDetail;
	}
	return self;
});
services.value('schoolFilter',[
	"北部","中部","南部","東部","外島"
]);
services.value('studyGroup',[
	"資訊學群",
	"工程學群",
	"數理化學群",
	"醫藥衛生學群",
	"生命科學學群",
	"生物資源學群",
	"地球與環境學群",
	"外語學群",
	"文史哲學群",
	"教育學群",
	"法政學群",
	"管理學群",
	"財經學群",
	"社會與心理學群",
	"大眾傳播學群",
	"建築與設計學群",
	"藝術學群",
	"體育休閒學群"
]);
services.factory('FavoriteList_Func', function ($http) {
    var self = this;
    self.getFavoriteList = function(uid) {
        var FavoriteList = null;
		var link = urlBase + '/users/' + uid + '/favoritelist?country=' + root_country;
		FavoriteList = $http.get(link);
        return FavoriteList;
    }
    self.updateFavoriteList = function(uid,schid,schName) {
        var output = null;
        var data = {
            "schoolnum": schid,
            "schoolname": schName
        }
        var link = urlBase + '/users/' + uid + '/favoritelist';
        output = $http.put(link, data);
        return output;
    }
    return self
});
services.factory('Login_Func', function ($http) {
    var self = this;
    self.updateUserInfo = function(uid,name,agerange,email) {
        var output = null;
        var data = {
            "uid": uid,
            "name": name,
            "agerange": agerange,
            "email": email
        }
        var link = urlBase + '/users';
        output = $http.put(link, data);
        return output;
    }
    return self
});