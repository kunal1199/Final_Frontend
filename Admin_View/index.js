$("document").ready(function() {
    $("#dept_form").hide();
    $("#mainsection_form").hide();
    $("#subsection_form").hide();
    $("#students_form").hide();
    $("#departments_page").hide();
    $("#mainsection_page").hide();
    $("#subsection_page").hide();
    $("#students_page").hide();
    $("#subjects_page").hide();
    $("#timetable_page").hide();
    $("#teachers_page").hide();
    $("#after_login").hide();
    $("#teachers_form").hide();
    $("#timetable_form").hide();
    $("#subject_form").hide();
    $(".back_button").addClass("btn btn-success");
    $(".logout").addClass("btn btn-danger");
    $("#section_mainpage").hide();
    $("#subjects_form").hide();
    $(".logout").click( function() {
        window.location="./index.html";
    });
    var token = "";
    var client_id="GSy7CGrwqj9TAv1t96qOBJq1LD8bSO4LRUvoH6O0";
    var client_secret="FzKqsNSojy80yNMTcurUgQgPC43XMz4sXM825pS3NX7iUHaEBL6OW4BBXLTVZYx4i8NCAGb5UjvqaYe6HmuwLIRrSCGZHzyImXdiWiLAI2f1OSNxvNZAgjNj60Z4FCOf";
$("#btn-login").click( function(){
    
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
                window.location="#loginsuccess";
                token = data['access_token'];
                var expires_in = data['expires_in'];

                var expires = new Date();
                expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * (parseInt(data['expires_in']) ) ) );
                console.log(expires.toUTCString());

                var cookie_string =  'token=' + data['access_token'] + "; expires=" + expires.toUTCString() + "; path='/";
                console.log(cookie_string);

                document.cookie = cookie_string;

                login_success()
            },
            error: function(xhr, textStatus, errorThrown){
                    var error_data = JSON.parse(xhr.responseText)
                    //console.log(xhr.responseText);
                    $('#message').html(error_data['error_description']);
            }
        })

    function login_success(){
        $("#loginbox").hide(function() {
            $("#after_login_heading").text(`Welcome back, ${username}!`);
            $("#after_login").show();
            // to be written in the following ajax success field.
            $("#teachers_redirect").click(function() {
                $("#subsection_page").hide();
                $("#after_login").hide(function() {
                    $("#alfromteachers").click(function() {
                        $("#teachers_page").hide(function() {
                            $("#after_login").show();
                        })
                    })
                    $.ajax(
                        {
                            url: "http://127.0.0.1:8001/teachers/",
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json",
                            // data: JSON.stringify(data_obj),
                            beforeSend: function (xhr) {
                                /* Authorization header */
                                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                            },
                            success: function(data){
                                $("#subsection_page").hide();
                                $(".teachers").remove();
                                for(i=0;i<data.length;i++) {
                                    $("#teachers_list").append(`<div class="card bg-primary text-white mt-2 mb-3 teachers">
                                    <div class="card-body students-name">${data[i]["user"]["username"]}</div>
                                    </div>`);
                                }
                                $("#teachers_list").append(`<div class="card bg-primary text-white mt-2 mb-3 new_teacher teachers">
                                    <div class="card-body student-name">Add a teacher</div>
                                </div>`);
                                $(".new_teacher").click(function() {
                                    $("#teachers_page").hide(function() {
                                        $("#teachers_form").show();
                                        $("#new_teacher").click(function() {
                                            let username = $("#teacher_username").val();
                                            let password = $("#teacher_password").val();
                                            let first_name = $("#teacher_firstname").val();
                                            let last_name = $("#teacher_lastname").val();
                                            let new_teacher= {"user":{"username":username, "password":password, "first_name":first_name, "last_name":last_name}};
                                            console.log(new_teacher);
                                            $.ajax(
                                                {
                                                    url: "http://127.0.0.1:8001/teachers/",
                                                    method: "POST",
                                                    dataType: "json",
                                                    data: JSON.stringify(new_teacher),
                                                    contentType: "application/json",
                                                    // data: JSON.stringify(data_obj),
                                                    beforeSend: function (xhr) {
                                                        /* Authorization header */
                                                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                    },
                                                    success: function(data){
                                                        // if(data.has("id"))
                                                        // {
                                                        //     $("#new_dept_msg").text(data[name]);
                                                        // }
                                                        // else {
                                                            $("#new_teacher_msg").text("New teacher added successfully!");
                                                        //}
                                                    }
                                                }
                                                )
                                        });
                                    })
                                })                                        
                                ;
                                $("#tpfromform").click(function() {
                                    $("#teachers_form").hide(function() {
                                        document.getElementById("teachers_redirect").dispatchEvent(new Event("click"));
                                        $("#teachers_page").show();
                                    })
                                });
                            }
                        }
                    )
                    
                    $("#teachers_page").show();
                });
            });
            $("#depts_redirect").click(function() {
                $("#after_login").hide(function() {
                    $("#subsection_page").hide();
            
            let depts;
            //ajax request for the departments list here
            $.ajax(
                {
                    url: "http://127.0.0.1:8001/departments/",
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    // data: JSON.stringify(data_obj),
                    beforeSend: function (xhr) {
                        /* Authorization header */
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                    },
                    success: function(data){
                        $("#subsection_page").hide();
                        depts=data;
                        $(".department").remove();
                        for(i=0;i<depts.length;i++) {
                            console.log(depts[i]["name"]);
                            $("#departments_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 department">
                            <div class="box-part dept">
                                <span class="title dept-name text-center">${depts[i]["name"]}</span>
                            </div></div>`); 
                        }
                        $("#departments_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 department">
                        <div class="box-part new_dept">
                            <div class="card-body dept-name text-center" style="font-size:25px;">Add a department</div>
                        </div>
                        </div>`);
                        $(".new_dept").click(function() {
                            $("#departments_page").hide(function() {
                                //form for adding a department                              
                                $("#dept_form").show();
                                $("#new_dept").click(function() {
                                    $("#new_dept_msg").text("");
                                    let d= $("#new_dept_name").val();
                                    $("#new_dept_name").val("");
                                    let new_dept= {"name":d};
                                    console.log(d);
                                    console.log(new_dept);
                                    if(d!="")
                                    {
                                        $.ajax(
                                        {
                                            url: "http://127.0.0.1:8001/departments/",
                                            method: "POST",
                                            dataType: "json",
                                            data: JSON.stringify(new_dept),
                                            contentType: "application/json",
                                            // data: JSON.stringify(data_obj),
                                            beforeSend: function (xhr) {
                                                /* Authorization header */
                                                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                            },
                                            success: function(data){
                                                // if(data.has("id"))
                                                // {
                                                //     $("#new_dept_msg").text(data[name]);
                                                // }
                                                // else {
                                                    $("#new_dept_msg").text("New department added successfully!");
                                                //}
                                            },
                                            statusCode: {
                                                400: function(data) {
                                                    alert("Same name dept. already exists.");
                                                }
                                            }
                                        }
                                        )
                                    }
                                }
                                )
                                $("#deptfromform").click(function() {
                                    $("#new_dept_name").val("");
                                    $("#new_dept_msg").text("");
                                    $("#dept_form").hide(function() {
                                        $("#after_login").show();
                                    })
                                })
                            })
                        });
                        $("#alfromdept").click(function() {
                            $("#departments_page").hide(function() {
                                $("#after_login").show();
                            })
                        })
                        $('#departments_page').show();
                        $(".dept").click(function(){
                            //code for the main section page
                            let sections_list = [];
                            let dept = $(this).children(".dept-name").text();
                            let dept_id;
                            for(i=0;i<depts.length;i++) {
                                if(depts[i]["name"]==dept)
                                    dept_id=depts[i]["id"];
                            }
                            //an ajax request for the sections list here
                            $.ajax(
                                {
                                    url: "http://127.0.0.1:8001/main_sections",
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
                                        console.log(dept);
                                        for(i=0;i<data.length;i++)
                                        {
                                            if(data[i]["department"]==dept)
                                                sections_list.push(data[i]);
                                        }
                                        console.log(sections_list);
                                        $(".ms").remove();
                                        $("#departments_page").hide(function() {
                                            $("#mainsection_heading").text(`Department : ${dept}`);
                                            for(i=0;i<sections_list.length;i++) {
                                                $("#mainsection_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ms">
                                                <div class="box-part section">
                                                    <span class="title section-name text-center">${sections_list[i]["name"]}</span>
                                                </div></div>`);
                                                
                                            }
                                            $("#mainsection_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ms">
                                            <div class="box-part new_section">
                                                <div class="card-body section-name text-center">Add a section</div>
                                            </div>
                                            </div>`);
                                            $("#mainsection_page").show();
                                            $("#deptfromms").click(function() {
                                                $("#mainsection_page").hide(function() {
                                                    $("#departments_page").show();
                                                })
                                            })
                                            $(".new_section").click(function() {
                                                $("#mainsection_page").hide(function() {
                                                    //form for adding a seection                             
                                                    $("#mainsection_form").show();
                                                    $("#new_section").click(function() {
                                                        $("#new_section_msg").text("");
                                                        let d= $("#new_section_name").val();
                                                        $("#new_section_name").val("");
                                                        let new_section= {"name":d, "department":dept_id};
                                                        console.log(d);
                                                        console.log(new_section);
                                                        if(d!="")
                                                        {
                                                            $.ajax(
                                                            {
                                                                url: "http://127.0.0.1:8001/main_sections/",
                                                                method: "POST",
                                                                dataType: "json",
                                                                data: JSON.stringify(new_section),
                                                                contentType: "application/json",
                                                                // data: JSON.stringify(data_obj),
                                                                beforeSend: function (xhr) {
                                                                    /* Authorization header */
                                                                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                },
                                                                success: function(data){
                                                                    // if(data.has("id"))
                                                                    // {
                                                                    //     $("#new_dept_msg").text(data[name]);
                                                                    // }
                                                                    // else {
                                                                        $("#new_section_msg").text("New section added successfully!");
                                                                    //}
                                                                }
                                                            }
                                                            )
                                                        }
                                                    }
                                                    )
                                                    $("#msfromform").click(function() {
                                                        $("#new_section_msg").text("");
                                                        $("#new_section_name").val("");
                                                        $("#mainsection_form").hide(function() {
                                                            $("#departments_page").show();
                                                        })
                                                    })
                                                })
                                            });                                               
                                            $(".section").click(function(){
                                                $(".ss").remove();
                                                let section = $(this).children(".section-name").text();
                                        
                                                $("#mainsection_page").hide(function() {
                                                    $("#subsection_heading").text(`Section : ${section}`);
                                                    //ajax request for subsections here
                                                    $.ajax(
                                                        {
                                                            url: "http://127.0.0.1:8001/sections",
                                                            method: "GET",
                                                            dataType: "json",
                                                            contentType: "application/json",
                                                            // data: JSON.stringify(data_obj),
                                                            beforeSend: function (xhr) {
                                                                /* Authorization header */
                                                                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                            },
                                                            success: function(data){
                                                                let subsections_list = [];
                                                                for(i=0;i<data.length;i++) {
                                                                    if(data[i]["main_section"]==section)
                                                                        subsections_list.push(data[i]);
                                                                }
                                                                for(i=0;i<subsections_list.length;i++) {
                                                                    $("#subsection_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ss">
                                                                    <div class="box-part subsection" id="${subsections_list[i]["id"]}">
                                                                        <span class="title subsection-name text-center">${subsections_list[i]["name"]}</span>
                                                                    </div></div>`);
                                                                }
                                                                $("#subsection_list").append(`<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 ss">
                                                                <div class="box-part new_subsection">
                                                                    <div class="card-body subsection-name text-center">Add a subsection.</div>
                                                                </div>
                                                                </div>`);
                                                                $("#subsection_page").show();
                                                                $("#msfromss").click(function() {
                                                                    $("#subsection_page").hide(function() {
                                                                        $("#mainsection_page").show();
                                                                    })
                                                                });
                                                                $(".new_subsection").click(function() {
                                                                    $("#subsection_page").hide(function() {
                                                                        //form for adding a seection                             
                                                                        $("#subsection_form").show();
                                                                        $("#new_subsection").click(function() {
                                                                            $("#new_subsection_msg").text("");
                                                                            let d= $("#new_subsection_name").val();
                                                                            let new_subsection= {"name":d, "main_section":section};
                                                                            console.log(new_subsection);
                                                                            if(d!="")
                                                                            {
                                                                                $.ajax(
                                                                                {
                                                                                    url: "http://127.0.0.1:8001/sections/",
                                                                                    method: "POST",
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify(new_subsection),
                                                                                    contentType: "application/json",
                                                                                    // data: JSON.stringify(data_obj),
                                                                                    beforeSend: function (xhr) {
                                                                                        /* Authorization header */
                                                                                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                                    },
                                                                                    success: function(data){
                                                                                        // if(data.has("id"))
                                                                                        // {
                                                                                        //     $("#new_dept_msg").text(data[name]);
                                                                                        // }
                                                                                        // else {
                                                                                            $("#new_subsection_msg").text("New section added successfully!");
                                                                                        //}
                                                                                    }
                                                                                }
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        $("#ssfromform").click(function() {
                                                                            $("#new_subsection_msg").text("");
                                                                            $("#new_subsection_name").val("");
                                                                            $("#subsection_form").hide(function() {
                                                                                document.getElementById("depts_redirect").dispatchEvent(new Event("click"));
                                                                                $("#subsection_page").show();
                                                                            })
                                                                        })
                                                                    })
                                                                });       
                                                                $(".subsection").click(function(){
                                                                    let subsection = $(this).children(".subsection-name").text();
                                                                    let section_id = this.getAttribute("id");
                                                                    $(".students").remove();
                                                                    $(".sbs").remove();
                                                                    $(".tt").remove();
                                                                    $("#subsection_page").hide(function() {
                                                                        $("#section_mainpage").show();
                                                                        $("#smp_heading").text(`Section : ${subsection}`);
                                                                        $("#ssfromsmp").click(function() {
                                                                            $("#section_mainpage").hide(function() {
                                                                                $("#subsection_page").show()
                                                                            })
                                                                        })
                                                                        $("#students_redirect").click(function() {
                                    
                                                                            $("#section_mainpage").hide(function() {
                                                                                
                                                                    $.ajax(
                                                                        {
                                                                            url: "http://127.0.0.1:8001/students/",
                                                                            method: "GET",
                                                                            dataType: "json",
                                                                            contentType: "application/json",
                                                                            // data: JSON.stringify(data_obj),
                                                                            beforeSend: function (xhr) {
                                                                                /* Authorization header */
                                                                                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                            },
                                                                            success: function(data){
                                                                                let students_list = [];
                                                                                console.log(data);
                                                                                for(i=0;i<data.length;i++) {
                                                                                    if(data[i]["section"]["name"]==subsection)
                                                                                        students_list.push(data[i]);
                                                                                }
                                                                                console.log(students_list);
                                                                                $("#section_mainpage").hide(function() {
                                                                                    $(".students").remove();
                                                                                    $("#students_heading").text(`Section : ${subsection}`);
                                                                                    for(i=0;i<students_list.length;i++) {
                                                                                        $("#students_list").append(`<div class="card bg-primary text-white mt-2 mb-3 students">
                                                                                        <div class="card-body students-name">${students_list[i]["user"]["username"]}, ${students_list[i]["user"]["first_name"]}</div>
                                                                                        </div>`);
                                                                                    }
                                                                                    $("#students_list").append(`<div class="card bg-primary text-white mt-2 mb-3 new_student students">
                                                                                        <div class="card-body student-name">Add a student</div>
                                                                                    </div>`);
                                                                                    $("#smfromsp").click(function() {
                                                                                        $("#students_page").hide(function() {
                                                                                            $("#section_mainpage").show();
                                                                                        })
                                                                                    })
                                                                                    $("#students_page").show();
                                                                                    $(".new_student").click(function() {
                                                                                        $("#students_page").hide(function() {
                                                                                            $("#spfromform").click(function() {
                                                                                                $("#students_form").hide(function() {
                                                                                                    $("#section_mainpage").show();
                                                                                                })
                                                                                            })
                                                                                            $("#students_form").show();
                                                                                            $("#new_student").click(function() {
                                                                                                let username = $("#student_username").val();
                                                                                                let password = $("#student_password").val();
                                                                                                let first_name = $("#student_firstname").val();
                                                                                                let last_name = $("#student_lastname").val();
                                                                                                let email = $("#student_email").val();
                                                                                                let new_student= {"user":{"username":username, "password":password, "email":email, "first_name":first_name, "last_name":last_name}, "section":subsection};
                                                                                                
                                                                                                $.ajax(
                                                                                                    {
                                                                                                        url: "http://127.0.0.1:8000/createStudentDataset/",
                                                                                                        method: "POST",
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify(new_student),
                                                                                                        contentType: "application/json",
                                                                                                        // data: JSON.stringify(data_obj),
                                                                                                        beforeSend: function (xhr) {
                                                                                                            /* Authorization header */
                                                                                                            xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                                                        },
                                                                                                        success: function(data){
                                                                                                            
                                                                                                            // if(data.has("id"))
                                                                                                            // {
                                                                                                            //     $("#new_dept_msg").text(data[name]);
                                                                                                            // }
                                                                                                            // else {
                                                                                                                $("#new_student_msg").text("New student added successfully!");
                                                                                                            //}
                                                                                                        },
                                                                                                        statusCode: {
                                                                                                            400: function() {
                                                                                                                $("#new_student_msg").text(data["name"]);
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    )
                                                                                            });
                                        
                                                                                        })
                                                                                    });
                                                                                });   
                                                                            }
                                                                        })
                                                                            })
                                                                    })
                                                                    $("#subjects_redirect").click(function() {
                                                                $.ajax(
                                                                    {
                                                                        url: "http://127.0.0.1:8001/subjects/",
                                                                        method: "GET",
                                                                        dataType: "json",
                                                                        contentType: "application/json",
                                                                        // data: JSON.stringify(data_obj),
                                                                        beforeSend: function (xhr) {
                                                                            /* Authorization header */
                                                                            xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                        },
                                                                        success: function(data){
                                                                            let subjects_list = [];
                                                                            console.log(data);
                                                                            for(i=0;i<data.length;i++) {
                                                                                if(data[i]["section"]==subsection)
                                                                                    subjects_list.push(data[i]);
                                                                            }
                                                                            console.log(subjects_list);
                                                                            $("#section_mainpage").hide(function() {
                                                                                $(".sbs").remove();
                                                                                $("#subjects_heading").text(`Section : ${subsection}`);
                                                                                for(i=0;i<subjects_list.length;i++) {
                                                                                    $("#subjects_list").append(`<div class="card bg-primary text-white mt-2 mb-3 sbs subjects" id="${subjects_list[i]["id"]}">
                                                                                    <div class="card-body subjects-name">${subjects_list[i]["title"]}</div>
                                                                                    </div>`);
                                                                                }
                                                                                $("#subjects_list").append(`<div class="card bg-primary text-white mt-2 mb-3 new_subject sbs">
                                                                                    <div class="card-body subjects-name">Add a subject</div>
                                                                                </div>`);
                                                                                $("#smfromsbp").click(function() {
                                                                                    $("#subjects_page").hide(function() {
                                                                                        $("#section_mainpage").show();
                                                                                    })
                                                                                })
                                                                                $("#subjects_page").show();
                                                                                $(".new_subject").click(function() {
                                                                                    $("#subjects_page").hide(function() {
                                                                                        //form for adding a department
                                                                                        $("#sbpfromform").click(function() {
                                                                                            $("#subjects_form").hide(500, function() {
                                                                                                $("#section_mainpage").show();
                                                                                            })
                                                                                        })
                                                                                        $("#subjects_form").show();
                                                                                        $("#new_subject_msg").text("");
                                                                                        
                                                                                        $("#new_subject").click(function() {
                                                                                            let title = $("#new_subject_name").val();
                                                                                            let new_subject= {"title":title, "section":subsection};
                                                                                            $("#new_subject_name").val("");
                                                                                            $.ajax(
                                                                                                {
                                                                                                    url: "http://127.0.0.1:8001/subjects/",
                                                                                                    method: "POST",
                                                                                                    dataType: "json",
                                                                                                    data: JSON.stringify(new_subject),
                                                                                                    crossDomain: true,
                                                                                                    contentType: "application/json",
                                                                                                    // data: JSON.stringify(data_obj),
                                                                                                    beforeSend: function (xhr) {
                                                                                                        /* Authorization header */
                                                                                                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                                                    },
                                                                                                    success: function(data){
                                                                                                        
                                                                                                        // if(data.has("id"))
                                                                                                        // {
                                                                                                        //     $("#new_dept_msg").text(data[name]);
                                                                                                        // }
                                                                                                        // else {
                                                                                                            $("#new_subject_msg").text("New subject added successfully!");
                                                                                                        //}
                                                                                                    },
                                                                                                    statusCode: {
                                                                                                        400: function() {
                                                                                                            $("#new_subject_msg").text(data["name"]);
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                )
                                                                                        });
                                    
                                                                                    })
                                                                                });
                                                                                $(".subjects").click(function() {
                                                                                    let timetable_list = [];
                                                                                    let subject = $(this).children(".subjects-name").text();
                                                                                    let subject_id = this.getAttribute("id");
                                                                                    $(".tt").remove();
                                                                                    $("#timetable_heading").text(`Subject : ${subject}`);
                                                                                    $("#subjects_page").hide(function() {
                                                                                        $.ajax(
                                                                                            {
                                                                                                url: "http://127.0.0.1:8001/timetable_periods",
                                                                                                method: "GET",
                                                                                                dataType: "json",
                                                                                                contentType: "application/json",
                                                                                                // data: JSON.stringify(data_obj),
                                                                                                beforeSend: function (xhr) {
                                                                                                    /* Authorization header */
                                                                                                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                                                },
                                                                                                success: function(data){
                                                                        
                                                                                                    for(i=0;i<data.length;i++)
                                                                                                    {
                                                                                                        if(data[i]["subject"]["title"]==subject && data[i]["subject"]["section"]==section_id)
                                                                                                            timetable_list.push(data[i]);
                                                                                                    }
                                                                                                    console.log(timetable_list);
                                                                                                    $(".tt").remove();
                                                                                                    for(i=0;i<timetable_list.length;i++) {
                                                                                                        $("#timetable_list").append(`<div class="card bg-primary text-white mt-2 mb-3 tt">
                                                                                                        <div class="card-body timetable-name">${timetable_list[i]["subject"]["title"]}, ${timetable_list[i]["teacher"]}, ${timetable_list[i]["time"]}</div>
                                                                                                        </div>`);
                                                                                                    }
                                                                                                    $("#timetable_list").append(`<div class="card bg-primary text-white mt-2 mb-3 new_timetable tt">
                                                                                                        <div class="card-body timetable-name">Add a timetable period</div>
                                                                                                    </div>`);
                                                                                                    $("#timetable_page").show();
                                                                                                    $("#spfromtp").click(function() {
                                                                                                        $("#timetable_page").hide(function() {
                                                                                                            $("#section_mainpage").show();
                                                                                                            $("#new_timetable_msg").text("");
                                                                                                        })
                                                                                                    })
                                                                                                    $(".new_timetable").click(function() {
                                                                                                        $("#timetable_page").hide(function() {
                                                                                                            //form for adding a department
                                                                                                            $("#ttpfromform").click(function() {
                                                                                                                $("#timetable_form").hide(function() {
                                                                                                                    $("#subjects_page").show();
                                                                                                                })
                                                                                                            })
                                                                                                            $("#timetable_form").show();
                                                                                                            $("#new_timetable").click(function() {
                                                                                                                let teacher_id = $("#tt_teacher").val();
                                                                                                                let day = $("#tt_day").val();
                                                                                                                let time = $("#tt_time").val();
                                                                                                                let new_timetable= {"subject":subject_id, "teacher":teacher_id, "day":day, "time":time};
                                                                                                                console.log(new_timetable);
                                                                                                                $.ajax(
                                                                                                                    {
                                                                                                                        url: "http://127.0.0.1:8001/timetable_periods/",
                                                                                                                        method: "POST",
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify(new_timetable),
                                                                                                                        crossDomain: true,
                                                                                                                        contentType: "application/json",
                                                                                                                        // data: JSON.stringify(data_obj),
                                                                                                                        beforeSend: function (xhr) {
                                                                                                                            /* Authorization header */
                                                                                                                            xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                                                                                                                        },
                                                                                                                        success: function(data){
                                                                                                                            
                                                                                                                            // if(data.has("id"))
                                                                                                                            // {
                                                                                                                            //     $("#new_dept_msg").text(data[name]);
                                                                                                                            // }
                                                                                                                            // else {
                                                                                                                                $("#new_timetable_msg").text("New timetable added successfully!");
                                                                                                                            //}
                                                                                                                        },
                                                                                                                        statusCode: {
                                                                                                                            400: function() {
                                                                                                                                $("#new_timetable_msg").text(data["name"]);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                    )
                                                                                                            });
                                                        
                                                                                                        })
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        )
                                                                                    })
                                                                                    
                                                                                    
                                                                                })
                                                                            });   
                                                                        }
                                                                    })
                                                                        
                                                                    })
                                                                    
                                                                    })
                                                                    
                                                                    
                                                                });
                                                            }
                                                        })
                                                    
                                                    
                                                    
                                                });
                                            });
                                        })
                                    }
                                }
                            )
                            
                            
                        })
                    }
                })
           
                });
            });
            });
        }
});
});


