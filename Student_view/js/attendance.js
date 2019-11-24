$("document").ready(function() {
    $(".logout").click(function() {
        window.location="./index.html";
    })
    let searchParams = new URLSearchParams(window.location.search);
    let param = searchParams.get('subject_id');
    var subject = sessionStorage.getItem("subject");
    $("#subject_name").text(subject);
    console.log(param);
    console.log(subject);
    var token = sessionStorage.getItem("token");
    $.ajax(
        {
            url: `http://127.0.0.1:8001/student_api/attendances/subject/${param}`,
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
                let classes_list = data;
                var total=parseInt(classes_list.length);
                var attended= parseInt(0);
                for(var i=0;i<classes_list.length;i++) {
                    var tr=document.createElement("tr");
                    tr.classList.add("class_row");
                    var th=document.createElement("th");
                    th.innerHTML = (i+1);
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    td1.innerHTML = classes_list[i]["date"];
                    td2.innerHTML = classes_list[i]["day"];
                    td3.innerHTML = classes_list[i]["time"];
                    td4.innerHTML = classes_list[i]["attended"];
                    tr.appendChild(th);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    $(".classes").append(tr);
                    attended+=parseInt(classes_list[i]["attended"]);
                }
                $("#perc").text(`${(parseInt(attended)/parseInt(total))*100}%`);
            }
        }
    )
})