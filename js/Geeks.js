var Geeks = {
     LocalStorage:{}
     ,IndexDb:{}
     ,ExternalSQL: {}
     ,Objeto: {}
 }


 Geeks.ExternalSQL.Sql = function (xSql){
	var url = "https://api.b15.com.br/sql/srv8/ExecuteSQL";
	//var url = "http://srv8.b15.com.br:81/15a/Core/ExecuteSQL";
	//var url = "http://sql.facilis.com.br/15A/Core/ExecuteSQL";
    var requestDatabase = "GeeksPlat15a";
    var result = null;
    var data = xSql;
	
	if (!$.isArray(xSql)) {
		data = xSql.replace(/'/g, "$--$").replace(/"/g, "-#-#-");
	} else {
		var sentence = [];

		for (var sql in xSql) {
			xSql[sql] = xSql[sql].replace(/'/g, "$--$").replace(/"/g, "-#-#-");

			sentence.push(xSql[sql]);
		}

		url = "https://api.b15.com.br/sql/srv8/ExecuteAllSQL";
		//url = "http://sql.facilis.com.br/15A/Core/ExecuteSQL";
		data = JSON.stringify(sentence);
	}
    
    $.ajax({
        type: "POST",
        url: url,
        data: {
            database: requestDatabase,
            sentence: data,
			user: Usuario ? Usuario.CodigoUsuario : null,
			caller: "App"
        },
        dataType: "json",
        async: false,
        success: function(response) {
			if (!$.isArray(xSql)) {
				if (response.HasError) {
					ShowError(response);
					return;
				}
		   	} else {
		   		var errors = $.grep(response, function(value) {
					return value.HasError == true;
				});
			
				if (errors.length > 0) {
					console.log(errors[0])
					ShowError(errors[0]);
					return;
				}
			}

            result = response;
        },
        error: function(e) {
            console.log(e.responseText)
            ShowError(e.responseText);
            return;
        }
    });
    return result;
};

Geeks.ExternalSQL.AsyncSql = function (xSql, functionToCallBack, functionToError, dontShowLoading){
	if (!dontShowLoading)
		kendo.mobile.application.showLoading();
	
	var url = "https://api.b15.com.br/sql/srv8/ExecuteSQL";
    var requestDatabase = "GeeksPlat15a";
    var data = xSql;
	
	if (!$.isArray(xSql)) {
		data = xSql.replace(/'/g, "$--$").replace(/"/g, "-#-#-");
	} else {
		var sentence = [];

		for (var sql in xSql) {
			xSql[sql] = xSql[sql].replace(/'/g, "$--$").replace(/"/g, "-#-#-");

			sentence.push(xSql[sql]);
		}

		url = "https://api.b15.com.br/sql/srv8/ExecuteAllSQL";
		data = JSON.stringify(sentence);
	}
    
    $.ajax({
        type: "POST",
        url: url,
        data: {
            database: requestDatabase,
            sentence: data,
			user: Usuario ? Usuario.CodigoUsuario : null,
			caller: "App"
        },
        dataType: "json",
        async: true,
        success: function(response) {			
			if (!dontShowLoading)
				kendo.mobile.application.hideLoading();
			
			if (!$.isArray(xSql)) {
				if (response.HasError) {
					ShowError(response);
					
					if (functionToError)
						functionToError(response);
				}
		   	} else {
		   		var errors = $.grep(response, function(value) {
					return value.HasError == true;
				});
			
				if (errors.length > 0) {
					console.log(errors[0])
					ShowError(errors[0]);
					
					if (functionToError)
						functionToError(response);
				}
			}

			functionToCallBack(response);
        },
        error: function(e) {
			if (!dontShowLoading)
				kendo.mobile.application.hideLoading();
			
            console.log(e.responseText)
            ShowError(e.responseText);
            
			if (functionToError)
				functionToError(e);
        }
    });
};