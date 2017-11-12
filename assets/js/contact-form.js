jQuery(function($) {
/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){
    $("form input[type=submit").click(function(){
        
        //get input field values
        var insurance = $('select[name=insurance]').val();
        var tenderid = $('input[name=tenderid]').val();
        var contractprice = $('input[name=contractprice]').val();
        var garant = $('input[name=garant]').val();
        var date = $('input[name=date]').val();
        // var agree = $("input[type='checkbox']").is(':checked');
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (insurance == "") {
            $('select[name="insurance"]').css('border-color', '#e41919');
            proceed = false;
        }
        if (!($.isNumeric(tenderid))) {
            $('input[name=tenderid]').css('border-color', '#e41919');
            proceed = false;
        }
        
        if (!($.isNumeric(contractprice)) || (contractprice > 100000000000)) {
            $('input[name=contractprice]').css('border-color', '#e41919');
            proceed = false;
        }

        if (garant != "") {
            if (!($.isNumeric(garant)) || (garant > 20000)) {
                $('input[name=garant]').css('border-color', '#e41919');
                proceed = false;
            }
        }        

        if (date == "") {
            $('select[name="date"]').css('border-color', '#e41919');
            proceed = false;
        }

        
        // everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            var post_data = {
                'insurance': insurance,
                'tenderid': tenderid,
                'contractprice': contractprice,
                'garant': garant,
                'date': date
            };


            $.ajax({
                    url: '/phpprj/assets/php/send.php',
                    // url: "./theme/derzhava/php/send_snmp.php",
                    type: "POST",
                    data: post_data,
                    success: function(e) {
                       //load json data from server and output message
                                var output = '';
                                var json = $.parseJSON(e);    
                                if (json.type == 'error') {
                                    var output = '<div class="error">' + json.text + '</div>';
                                }
                                else {           
                                    var output = '<div class="success">' + json.text + '</div>';
                                    //reset values in all input fields
                                    $('form input').not('form input[type=submit]').val('');
                                    $('form textarea').val('');
                                    $('form select').val('');
                                    $("form input[type='checkbox']").prop( "checked", false );
                                }
                                
                                $("#result").hide().html(output).slideDown();
                    },
                });        
        }
        
        return false;
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("form input, form select").change(function(){
        $("form input, form select").css('border-color', '');
        $('div.checkbox label').removeClass('error');
        $("#result").slideUp();
    });
    
});

})