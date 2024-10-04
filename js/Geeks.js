var Geeks = {
     LocalStorage:{}
     ,IndexDb:{}
     ,ExternalSQL: {}
     ,Objeto: {}
	 ,Plat: {}
}


Geeks.ExternalSQL.Sql = function (xSql){
	var url = `https://${localStorage.getItem("objLogin_itnApi")}/sql/srv114`
    var requestDatabase = "armo"
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

		//url = "https://${localStorage.getItem("objLogin_itnApi")}/sql/srv114/All"
		data = JSON.stringify(sentence)
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
}

Geeks.Plat.Sql = function (xSql){
	var url = `https://${localStorage.getItem("objLogin_itnApi")}/sql/srv5/ExecuteSQL`
    var requestDatabase = "GeeksPlat15a"
	
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

		//url = "https://${localStorage.getItem("objLogin_itnApi")}/sql/srv114/All"
		data = JSON.stringify(sentence)
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
}
