var AddressUrl = 'https://dkmh.hcmute.edu.vn';
function submitFrm(){
    ProgressShow();
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    //var xhr = new XMLHttpRequest(); 
    //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    var mypath = AddressUrl;
    var classID = $('#ClassID').val();
    var unit = $('#UnitID').val();
    var CurriculumID = $('#CurriculumID').val();
    var StudyUnitID =  unit + CurriculumID; 
    var credit = $('#NoCredit').val();
    var cookie = $('#UserCookie').val();
    document.cookie = cookie;
    var hideval = StudyUnitID + '_' + classID + '$' + credit + '$' + StudyUnitID + '$1$0|';
    console.log(hideval);
    var head = {
        'Accept' : 'text/html',
        'Content-Type' : 'text/html',
        'Connection' : 'keep-alive',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        'Upgrade-Insecure-Requests': '0',
        'Cookie' : cookie
        };
    console.log(head['Cookie']);
    $.ajax({
        type: 'GET',
        Headers: head,
        dataType: 'JSONP',
        url: mypath + '/DangKiHocPhan?StudyUnitID=' + StudyUnitID + '&CurriculumID=' + CurriculumID + '&Hide=' + hideval + '&t=' + Math.random(),
        async: true,
        crossDomain: true,
        xhrFields: { withCredentials: true },
        success: function (html) {
            ProgressHide();
            alert("Đăng kí thành công!");
        }
    })
    .fail(
    function (xhr) {
        err = xhr['error'];
        ProgressHide();
        alert("Lỗi kết nối " + err);
    });
}

function ProgressShow() {
    var win = $.messager.progress({
        title: 'Please waiting...',
        msg: 'Đang xử lý . vui lòng đợi ...',
        interval: 4000
    });
}
function ProgressHide() {
    $.messager.progress('close');
}