App.service('DataService', ['$http', '$rootScope', function($http, $rootScope){

    var DataService = {};

    DataService.updateFtpSettings = function(ftpSettings){
        $http({
            method: 'POST',
            url: 'api/jsonrpc/backupRestore',
            data: {
                "method": "updateFtpSettings",
                "id": "updateFtpSettings",
                "params": [ftpSettings]
            }
        }).success(function(resp){
            if(_.isUndefined(resp.error) == false) {
                error = resp.error;
                $rootScope.$broadcast('updateFtpSettings-onerror', DataService.getErrorsArray(error));
            } else if(_.isUndefined(resp.result) == false) {
                var result = resp.result;
                $rootScope.$broadcast('updateFtpSettings-onsuccess', result);
            }
            $rootScope.$broadcast('updateFtpSettings-onresult');
        });
    };

    return DataService;
}
]);


