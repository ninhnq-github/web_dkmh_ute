//**************************************************Cau hinh *************************************//
var AddressUrl = document.location.protocol +'//'+ document.location.host; //Lay ten domain 
//*********************************************** End cau hinh **************************************//
//***************************************************Xoa hoc phan***********************//
function DeleteHocPhanDangKi(MaHocPhan, intLoai) {
    ProgressShow();
    var mypath =AddressUrl ;
    try{
        var kt = confirm('Xác nhận xóa học phần vừa chọn ?')
        if (kt) {
            $.ajax({
                type: 'GET',
                url: mypath + '/Home/DeleteHocPhanDangKi/' + MaHocPhan + "?t=" + Math.random(),
                async: true,
                dataType: 'html',
                success: function (html) {
                    DanhSachHocPhanDaDangKi(intLoai);
                    ProgressHide();
                    DialogAlert("Thông báo", html, "info");
                },
            })
            .fail(
            function (jqXHR, textStatus, err) {
                ProgressHide();
                DialogAlert("Lỗi kết nối","Vui lòng đăng nhập lại !","error");
            });
        }
        else {
            ProgressHide();
        }
    }
    catch (err_) {
        ProgressHide();
    }

}

function  XoaHocPhan(MaHocPhan) {
    ProgressShow();
    var mypath = AddressUrl;
    try {
            $.ajax({
                type: 'GET',
                url: mypath + '/DangKiThanhCong/DeleteHocPhan/' + MaHocPhan + "?t=" + Math.random(),
                async: true,
                dataType: 'html',
                success: function (html) {
                    DanhSachHocPhanDaDangKi();
                    ProgressHide();
                    DialogAlert("Thông báo", html, "info");
                },
            })
            .fail(
            function (jqXHR, textStatus, err) {
                ProgressHide();
                DialogAlert("Lỗi kết nối", "Kết nối không thành công :"+ err, "error");
            });
        }
    catch (err_) {
        ProgressHide();
    }

}
//**********************************************     Danh sach hoc phan da dang ki ********************************//
function DanhSachHocPhanDaDangKi() {
    var mypath = AddressUrl;
    $("#DanhSachHocPhanDaDangKi").html('Đang tải dử liệu ....');
    var url_ = '/dangkithanhcong'; //KiemTraLoaiDangKi(loai);
    try{
        $.ajax({
            type: 'GET',
            url: mypath + url_ + "?t=" + Math.random(),
            async: true,
            dataType: 'html',
            success: function (html) {
                jQuery("#DanhSachHocPhanDaDangKi").html(html);
            },
        })
    .fail(
        function (jqXHR, textStatus, err) {
            $('#DanhSachHocPhanDaDangKi').text('Thời gian chờ quá lâu vui lòng đăng nhập lại ! ');
            DialogAlert("Thông báo", "Thời gian chờ quá lâu vui lòng đăng nhập lại ! ", "error");
        });
    }
    catch (err_) {
        $('#DanhSachHocPhanDaDangKi').text('Lỗi xảy ra : ' + err_);
    }
}

//************************************************** AjaxChonMonHocNhanVien.cshtml **********************************************************//
function GetdanhsachmonNhanVien(StudyUnitID) {
    ProgressShow();
    $('#DanhSachChon').show('1000');
    var mypath = AddressUrl;
    jQuery("#DanhSachChon").html("Đang tải dử liệu .....");
    $.ajax({
        type: 'GET',
        url: mypath + '/NhanVien/AjaxChonMonHocNhanVien?StudyUnitID=' + StudyUnitID + '&StudentID=' + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#DanhSachChon").html(html);
            $("#DanhSachLop").hide("1000")
            ProgressHide();
        }
    })
.fail(
    function (jqXHR, textStatus, err) {
        $('#DanhSachChon').text('Error: ' + err);
        ProgressHide();
        DialogAlert("Lỗi kết nối","Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}
function ShowHide_NV() {
    $('#DanhSachLop').show('1000');
    $('#DanhSachChon').hide('1000');
}
function GetdanhsachhocphanNhanVien() {
    ProgressShow(); jQuery("#DanhSachLop").html("Đang tải dử liệu....");
    var Loai = $('input[name=radioDK]:checked').val();
    var StudyProgramID = $("#dllStudyProgrameID").val();
    var mypath = AddressUrl;
    $.ajax({
        type: 'GET',
        url: mypath + '/NhanVien/AjaxDanhSachHocPhan/' + StudyProgramID + '?LoaiDK='+Loai+'&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#DanhSachLop").html(html);
            ShowHide_NV();
            ProgressHide();
        }
    })
.fail(
    function (jqXHR, textStatus, err) {
        $('#DanhSachLop').text('Error: ' + err);
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}
//************************************************** AjaxChonMonHocNhanVien.cshtml **********************************************************//

//************************************************** AjaxChonMonHoc.cshtml **********************************************************//
function AjaxDangKiHocPhan() {
    ProgressShow();
    var mypath = AddressUrl;
    var hideval = $('#chk_hidden').val();
    var StudyUnitID = $('#StudyUnitID').val();
    var CurriculumID = $('#CurriculumID').val();
    $.ajax({
        type: 'GET',
        url: mypath + '/DangKiHocPhan?StudyUnitID=' + StudyUnitID + '&CurriculumID=' + CurriculumID + '&Hide=' + hideval + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            DanhSachHocPhanDaDangKi();
            ProgressHide();
            DialogAlert("Thông báo", html, "info");

        }
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Vui lòng đăng nhập lại !"+ err, "error");

    });
}

function doSubmit() {
    document.forms.Frm.hdID.value = "";
    for (var i = 0; i < document.forms.Frm.elements.length; i++) {
        if (document.forms.Frm.elements[i].type == "radio") {
            if (document.forms.Frm.elements[i].checked == true) {
                document.forms.Frm.hdID.value += document.forms.Frm.elements[i].id + "|";
            }
        }
    }
}
function doSubmit_2() {
    document.forms.frmform.hdID.value = "";
    for (var i = 0; i < document.forms.frmform.elements.length; i++) {
        if (document.forms.frmform.elements[i].type == "radio") {
            if (document.forms.frmform.elements[i].checked == true) {
                document.forms.frmform.hdID.value += document.forms.frmform.elements[i].id + "|";
            }
        }
    }
}
function doSubmit_check() {
    document.forms.Frm.chk_hidden.value = "";
    for (var i = 0; i < document.forms.Frm.elements.length; i++) {
        if (document.forms.Frm.elements[i].type == "checkbox") {
            if (document.forms.Frm.elements[i].checked == true) {
                document.forms.Frm.chk_hidden.value += document.forms.Frm.elements[i].id + "|";
            }
        }
    }
}

function Close() {
    window.close();
}
//Submit ajax
function ShowHide() {
    $('#DanhSachLop').show('200');
    $('#DanhSachChon').hide('200');
    $('#lblthongbao').hide();
}

//************************************************** END AjaxChonMonHoc.cshtml **********************************************************//
//************************************************** AjaxChonMonHocCaiThien.cshtml **********************************************************//
function AjaxDangKiHocPhanCaiThien_() {
    ProgressShow();
    var mypath = AddressUrl;
    var hideval = $('#hdID').val();
    var StudyUnitID = $('#StudyUnitID').val();
    $.ajax({
        type: 'GET',
        url: mypath + '/Home/AjaxDangKiHocPhanCaiThien?StudyUnitID=' + StudyUnitID + '&Hide=' + hideval + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            DanhSachHocPhanDaDangKi(3);
            ProgressHide();
            DialogAlert("Thông báo", html, "info");
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối ", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}

//************************************************** END AjaxChonMonHocCaiThien.cshtml **********************************************************//
//************************************************** AjaxChonMonHocHocLai.cshtml **********************************************************//
function AjaxDangKiHocPhanHocLai() {
    ProgressShow();
    var mypath = AddressUrl;
    var hideval = $('#hdID').val();
    var StudyUnitID = $('#StudyUnitID').val();
    $.ajax({
        type: 'GET',
        url: mypath + '/Home/AjaxDangKiHocPhanHocLai?StudyUnitID=' + StudyUnitID + '&Hide=' + hideval + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            DanhSachHocPhanDaDangKi('');
            ProgressHide();
            DialogAlert("Thông báo", html, "info");
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        DialogAlert("Lỗi kết nối ", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
        document.getElementById('id_div_loading_admin').style.display = 'none';
    });
}
//************************************************** ENd AjaxChonMonHocHocLai.cshtml **********************************************************//

//************************************************** Begin DangKiHocCaiThien.cshtml **********************************************************//
function GetdanhsachmonCaiThien(StudyUnitID) {
    ProgressShow();
    $('#DanhSachChon').show('1000');
    var mypath = AddressUrl;
    jQuery("#DanhSachChon").html("Đang tải dử liệu .....");
    $.ajax({
        type: 'GET',
        url: mypath + '/Home/AjaxChonMonHocCaiThien?StudyUnitID=' + StudyUnitID + '&StudentID=' + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#DanhSachChon").html(html);
            $("#DanhSachLop").hide("1000")
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}
//************************************************** End DangKiHocCaiThien.cshtml **********************************************************//
//************************************************** Begin DangKiHocLai.cshtml **********************************************************//
function Getdanhsachmonhoclai(StudyUnitID) {
    ProgressShow();
    $('#DanhSachChon').show('1000');
    var mypath = AddressUrl;
    jQuery("#DanhSachChon").html("Đang tải dử liệu .....");
    $.ajax({
        type: 'GET',
        url: mypath + '/Home/AjaxChonMonHocHocLai?StudyUnitID=' + StudyUnitID + '&StudentID=' + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#DanhSachChon").html(html);
            $("#DanhSachLop").hide("1000")
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kêt nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}
//************************************************** End DangKiHocLai.cshtml **********************************************************//
//************************************************** End DangKiTheoKeHoach.cshtml**********************************************************//
function Getdanhsachmon(StudyUnitID) {
    ProgressShow();
    $('#DanhSachChon').show('1000');
    var mypath = AddressUrl;
    jQuery("#DanhSachChon").html("Đang tải dử liệu .....");
    $.ajax({
        type: 'GET',
        url: mypath + '/Home/AjaxChonMonHoc?StudyUnitID=' + StudyUnitID + '&StudentID=' + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#DanhSachChon").html(html);
            $("#DanhSachLop").hide("1000")
            ProgressHide();
        }
    })
.fail(
    function (jqXHR, textStatus, err) {
        $('#DanhSachChon').text("Thời gian chờ quá lâu .Vui lòng refesh lại website");
        ProgressHide();
        DialogAlert("Lỗi kết nối","Thời gian chờ quá lâu .Vui lòng đăng nhập lại !","error");
    });
}
//************************************************** End DangKiTheoKeHoach.cshtml **********************************************************//
//************************************************** AjaxDanhSachHocPhanDangKiLai.cshtml **********************************************************//
function AjaxChonHocPhanDangKiLai(StudyUnitID,ScheduleStudyUnit) {
    ProgressShow();
    $('#DanhSachChon').show('1000');
    var mypath = AddressUrl;
    $.ajax({
        type: 'GET',
        url: mypath + '/Home/AjaxDanhSachHocPhanDangKiLai?StudyUnitID=' + StudyUnitID +'&ScheduleStudyUnit=' + ScheduleStudyUnit + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#DanhSachChon").html(html);
            $("#DanhSachLop").hide("1000")
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối ", err, "error");
    });
}
function AjaxDangKiHocPhanTre() {
    ProgressShow();
    var mypath = AddressUrl;
    var hideval = $('#chk_hidden').val();
    var StudyUnitID = $('#StudyUnitID').val();
    var OldScheduleStudyUnit = $('#ScheduleStudyUnitOld').val();
    $.ajax({
        type: 'GET',
        url: mypath + '/DangKiTre/AjaxLuuHocPhanDangKiTre?StudyUnitID=' + StudyUnitID + '&Hide=' + hideval + '&OldScheduleStudyUnit=' + OldScheduleStudyUnit + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            DanhSachHocPhanDaDangKi(1);
            ProgressHide();
            DialogAlert("Thông báo", html, "info");

        }
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", err, "error");

    });
}
//************************************************** END AjaxDanhSachHocPhanDangKiLai.cshtml **********************************************************//

//************************************************** Dialog Jquery ui ***********************************************//
function DialogAlert(Title, Messages, type) { //type : '',error,info,question,warning
    $.messager.alert(Title, Messages,type);
}
//confirm delete dialog :
function ConfirmDelete(MaHocPhan) {
    $.messager.confirm("Lưu ý ", "Bạn có muốn xóa học phần '"+MaHocPhan+"' không ?", function (r) {
        if (r) {
            XoaHocPhan(MaHocPhan);
        }
        else {
            //false
        }
    });
}
function ConfirmAlert(thongbao) {
    $.messager.confirm("Lưu ý ", thongbao, function (r) {
        if (r) {
            return true;
        }
        else {
            return false
        }
    });
}
//Show progresss , show screen right-botton

function Slide(Title_,Messages,time) {//Hien thị goc phai bên duoi man minh trong time giay .
    $.messager.show({
        title: Title_,
        msg: Messages,
        timeout: time,
        showType: 'slide'
    });
}
function Fade(Title_, Messages) { //Hien thi như slide nhưng ko tự động close
    $.messager.show({
        title: Title_,
        msg:Messages,
        timeout: 0,
        showType: 'fade'
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
//************************************************** End Dialog Jquery ui ***********************************************//
//************************************************** Ajax load hoc ky ***********************************************//

function GetThongTinCTDT() {
    var mypath = AddressUrl;
    ProgressShow();
    $("#content_CTDT").html('');
    var MaHK = $("#ddlHocKy").val();
    var TenHK = $("#ddlHocKy :selected").text();
    var url_ = '/ChuongTrinhDaoTao/AjaxIndex'; //KiemTraLoaiDangKi(loai);
    try {
        $.ajax({
            type: 'GET',
            url: mypath + url_ +'?MaHK='+MaHK+'&TenHK='+TenHK +'&t=' + Math.random(),
            async: true,
            dataType: 'html',
            success: function (html) {
                jQuery("#content_CTDT").html(html);
                ProgressHide();
            },
        })
    .fail(
        function (jqXHR, textStatus, err) {
            $('#content_CTDT').text("Thời gian chờ quá lâu vui lòng đăng nhập lại !");
            ProgressHide();
        });
    }
    catch (err_) {
        $('#content_CTDT').text('Lỗi xảy ra : ' + err_);
        ProgressHide();
    }
}
//************************************************** END Ajax load hoc ky ***********************************************//
/*************************************************** PHẦN NÀY CHO UTE ****************************************************/
function PopupDanhSachLop(StudyUnitID, CurriculumID) {
    window.open(AddressUrl + '/' + 'DangKiNgoaiKeHoach/DanhSachLopHocPhan/' + StudyUnitID + "?CurriculumID=" + CurriculumID + "&t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=800,height=600,');
}
function PopupDanhSachLopTheoNhom(StudyUnitID, CurriculumID) {
    window.open(AddressUrl + '/' + 'DangKiNgoaiKeHoachPhanNhom/DanhSachLopHocPhanTheoNhom/' + StudyUnitID + "?CurriculumID=" + CurriculumID + "&t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=800,height=600,');
}
function PopupDanhSachLopDKT(StudyUnitID , ScheduleStudyUnit) {//Đang ký trể
    window.open(AddressUrl + '/' + 'DangKiTre/index/?StudyUnitID=' + StudyUnitID + "&ScheduleStudyUnit=" + ScheduleStudyUnit + "&t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=900,height=600,');
}
function PopupThongbaoKhan() {
    window.open(AddressUrl + '/' + 'Home/Thongbao?t=' + Math.random(), '_blank', 'scrollbars=1,status=1,width=900,height=600,');
}
function PupupWindow() {
}
/*************************************************** Lấy kết quả học tập *****************************************************/
function Getketquahoctap() {
    ProgressShow();
    var StudyProgram = $('#StudyProgram').val();
    var YearStudy = $('#YearStudy').val();
    var TermID = $('#TermID').val();
    var Mark = $('#Mark').val();
    var mypath = AddressUrl;
    jQuery("#divHienthiKQHT").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: mypath + '/KetQuaHocTap/HienThiKetQua?StudyProgram=' + StudyProgram + '&YearStudy=' + YearStudy + '&TermID=' + TermID + '&Mark=' + Mark + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienthiKQHT").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Vui lòng đăng nhập lại !", "error");
    });
}

function KiemtrachontatcaNamHoc() {
    var YearStudy = $('#YearStudy').val();
    if (YearStudy == "0") {
        document.getElementById("TermID").value = "0";
        document.getElementById("TermID").disabled = true;
    }
    else {
        document.getElementById("TermID").disabled = false;
    }
}

function PopupChiTietDiem(StudyUnitID) {//Đang ký trể
    window.open(AddressUrl + '/' + 'KetQuaHocTap/DiemChiTiet/' + StudyUnitID +  "?t=" + Math.random(), '_blank', 'scrollbars=1,status=1,width=700,height=500,');
}
/*************************************************** End Lấy kết quả học tập *****************************************************/
/*************************************************** Lay Thoi Khoa Bieu *****************************************************/
function GetThoiKhoaBieu() {
    ProgressShow();
    var mypath = AddressUrl;
    var YearStudy = $('#YearStudy').val();
    var TermID = $('#TermID').val();
    var Week = $('#Week').val();
    var typeID = $('#TypeID').val();
    var adr = mypath + '/ThoiKhoaBieu/HienthiTKB?YearStudy=' + YearStudy + '&TermID=' + TermID + '&Week=' + Week + '&t=' + Math.random();
    if (typeID == "1")
        adr = mypath + '/ThoiKhoaBieu/HienthiTKBTheoMon?YearStudy=' + YearStudy + '&TermID=' + TermID + '&Week=' + Week + '&t=' + Math.random();
    jQuery("#divThoiKhoiBieu").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: adr,
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divThoiKhoiBieu").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Vui lòng refesh lại website !", "error");
    });
}
/*************************************************** End Lay Thoi Khoa Bieu *****************************************************/
/*************************************************** Lay Lich thi *****************************************************/
function GetLichThi() {
    ProgressShow();
    var mypath = AddressUrl;
    var YearStudy = $('#ddlYearStudy').val();
    var TermID = $('#dllTermID').val();
    var adr = mypath + '/LichThi/HienThiKetQua?YearStudy=' + YearStudy + '&TermID=' + TermID + '&t=' + Math.random();
    jQuery("#divHienthilichthi").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: adr,
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienthilichthi").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Vui lòng refesh lại website !", "error");
    });
}
/*************************************************** End Lay Lich Thi *****************************************************/
/*************************************************** Lay tai khoan sinh vien *****************************************************/
function GetTaiKhoanSinhVien() {
    ProgressShow();
    var mypath = AddressUrl;
    var YearStudy = $('#ddlYearStudy').val();
    var TermID = $('#dllTermID').val();
    var adr = mypath + '/TaiKhoanSinhVien/HienThiTaiKhoan?YearStudy=' + YearStudy + '&TermID=' + TermID + '&t=' + Math.random();
    jQuery("#divHienThiTK").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: adr,
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienThiTK").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Vui lòng refesh lại website !", "error");
    });
}
/*************************************************** End tai khoan sinh vien *****************************************************/


/*************************************************** END PHẦN NÀY CHO UTE ****************************************************/
/**********************************/
function AnhiendsChon(machon) {
    if (machon == 0 || machon == 1) {
        $('#ddldsChon').hide();
        $('#txtFilter').show();
    }
    else {
        $('#ddldsChon').show();
        $('#txtFilter').hide();
        Getketselectoption(machon);
    }
}
/*********************************/
function Getketselectoption(id) {
    ProgressShow();
    //var id = $('#dsLoai').val();
    var mypath = AddressUrl;
    $.ajax({
        type: 'GET',
        url: mypath + '/DangKiTheokeHoach/AjaxDschon?id=' + id + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#ddldsChon").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}

function Checklichmacdinh() {
    var Ischeck = $('#chkcheck').attr('checked') ? "True" : "False";
    if (Ischeck == "True") {
        $('#btnFilter').hide();
    }
    else {
        $('#btnFilter').show();
    }
}

function AjaxDanhSachLopTheoKeHoach() {
    ProgressShow();
    var Type = $('#dsLoai').val();
    var ddldsChon = $('#ddldsChon').val();
    var txtFilter = $('#txtFilter').val();
    var mypath = AddressUrl;
    jQuery("#divHienthiKQHT").html("<b style='color:red'>Đang tải dử liệu .....</b>");
    $.ajax({
        type: 'GET',
        url: mypath + '/DangKiTheoKeHoach/AjaxDanhSachLop?type=' + Type + '&class=' + ddldsChon + '&search=' + txtFilter + '&t=' + Math.random(),
        async: true,
        dataType: 'html',
        success: function (html) {
            jQuery("#divHienthiKQHT").html(html);
            ProgressHide();
        },
    })
.fail(
    function (jqXHR, textStatus, err) {
        ProgressHide();
        DialogAlert("Lỗi kết nối", "Thời gian chờ quá lâu .Vui lòng đăng nhập lại !", "error");
    });
}

function GetIDButton_Click(val) {
    document.getElementById("buttonID").value = val;
}

/************************************************** API **********************************************************/
var apiUrl = AddressUrl+'/ThoiKhoaBieu/GetTuanTheoNamHocHocKy';

function LoadWeek() {
    var NamHoc = $('#YearStudy').val();
    var HocKy = $('#TermID').val();
    var i = 0;
    // Send an AJAX request
    $.getJSON(apiUrl + "/" + NamHoc + "$" + HocKy)
        .done(function (data) {
            $("#Week").empty();
            // On success, 'data' contains a list of products.
            $.each(data, function (key, item) {
                // Add a list item for the product.
                $("<option value=" + item.Week + ">" + item.DisPlayWeek + " </option>").appendTo($('#Week'));
            });
            GetThoiKhoaBieu();
        });
}


