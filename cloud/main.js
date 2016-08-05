
Parse.Cloud.define("sendEmail", function(request, response) {
  var dict = [];
  dict.push({"name": "first_name", "content": request.params.first_name});
  dict.push({"name": "credit_card_total", "content": request.params.credit_card_total});
  dict.push({"name": "credit_card_num", "content": request.params.credit_card_num});
  dict.push({"name": "benefits_image", "content": request.params.benefits_image});
  dict.push({"name": "holidays_image", "content": request.params.holidays_image});
  dict.push({"name": "timesheet_image", "content": request.params.timesheet_image});
  if(request.params.loan) {
    dict.push({"name": "loan", "content": request.params.loan});
  }

  if(request.params.it_support) {
    dict.push({"name": "it_support", "content": request.params.it_support});
  }

  Parse.Cloud.httpRequest({
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			url: 'https://mandrillapp.com/api/1.0/messages/send-template.json',
			body:{
				"key": request.params.key,
				"template_name": "MagicSheet",
				"template_content": [],
				"message": {
					"to": [{"email": request.params.email}],
					"from_email": "team@ideo.london",
					"from_name": "IDEO London",
					"subject": "Your Magic Sheet",
					"merge": true,
					"merge_language": "handlebars",
					"global_merge_vars": dict,
					"merge_vars": []
				}
			},
			success: function(httpResponse) {
		    console.log("success: " + httpResponse);
				response.success(); },
			error: function(httpResponse) {
				console.log("error: " + httpResponse);
				response.success();
		  }
	});
});
