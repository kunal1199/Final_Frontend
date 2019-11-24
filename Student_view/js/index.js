$("document").ready(function() {
    var token = "";
    var client_id="GSy7CGrwqj9TAv1t96qOBJq1LD8bSO4LRUvoH6O0";
    var client_secret="FzKqsNSojy80yNMTcurUgQgPC43XMz4sXM825pS3NX7iUHaEBL6OW4BBXLTVZYx4i8NCAGb5UjvqaYe6HmuwLIRrSCGZHzyImXdiWiLAI2f1OSNxvNZAgjNj60Z4FCOf";

    $("#btn-login").click(function() {
        let username = $("#login-username").val();
        let password = $("#login-password").val();
        var grant_type = "password"
        var data_urlencoded = "grant_type=password&username=" + username + "&password=" + password;
            $.ajax(
            {
                url: "http://127.0.0.1:8001/o/token/",
                method: "POST",
                dataType: "json",

                // Data should be in urlencoded format, specified in OAuth Specification.
                contentType: "application/x-www-form-urlencoded",		// Very Important
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret))
                },

                data: data_urlencoded,

                success: function(data){
                    window.location="./student.html"    
                    token = data['access_token'];
                    sessionStorage.setItem("token", token);
                },

                error: function(xhr, textStatus, errorThrown){
                    var error_data = JSON.parse(xhr.responseText)
                    //console.log(xhr.responseText);
                    $('#message').html(error_data['error_description']);
                }
            }
            )
        })
})
    