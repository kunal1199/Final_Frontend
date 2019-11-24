$("document").ready(function() {
    $(".logout").click(function() {
        window.location="./index.html";
    })
    var token=sessionStorage.getItem("token");
    $.ajax(
        {
            url: "http://127.0.0.1:8001/student_api/timetables",
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
                var timetable_list=data;
                for(var i=0;i<timetable_list.length;i++) {
                    var element = document.getElementById(timetable_list[i]["day"]);
                    var tr=document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    td1.innerHTML = timetable_list[i]["time"];
                    td2.innerHTML = timetable_list[i]["subject"];
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    element.append(tr);
                }
            }
        }
    )
   
})