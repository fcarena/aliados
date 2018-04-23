$(document).ready(function () {
	params = {};
	params.id = $("#id").val();
	$.ajax({
		type: 'POST',
		url: 'include/Libs.php?accion=getPendientePersona',
		dataType:'json',
		data: params,
		error: function(){
			bootbox.dialog({
				message: "Experimentamos Fallas Técnicas. Comuníquese con su proveedor.",
				buttons: {
					cerrar: {
						label: "Cerrar",
						callback: function() {
							bootbox.hideAll();
							//window.location = "../";
						}
					}
				}
			});
		},
		success: function(result){
			if(result.error) {
				window.location = "index.php";
			} else {
				$(".table-persona").html(result.table);
				$(".persona").html(result.persona);
			}
			
		}
	}); 
});