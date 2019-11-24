$("document").ready(function() {
    $(".logout").click(function() {
        window.location="./index.html";
    })
    var token=sessionStorage.getItem("token");
    $.ajax(
        {
            url: "http://127.0.0.1:8001/student_api/subjects",
            method: "GET",
            dataType: "json",
            contentType: "application/json",
            // data: JSON.stringify(data_obj),
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
            },
            success: function(data){
                console.log(data);
                var subjects = data;
                for(i=0;i<subjects.length;i++) {
                    console.log(subjects[i]["title"]);
                    $("#subjects_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 subject">
                    <div class="box-part subj" id="${subjects[i]["id"]}">
                        <span class="title subject-name text-center">${subjects[i]["title"]}</span>
                    </div></div>`); 
                }
                $(".subj").click(function() {
                    var id=this.getAttribute("id");
                    window.location = "./attendance.html?subject_id=" + id;
                    sessionStorage.setItem("subject", $(this).children(".subject-name").text());
                })
            }
        }
    )
})