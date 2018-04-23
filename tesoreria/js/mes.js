$(document).ready(function(){
	getRecords();
	getMonth();
	getPromotores();

	/*
	 * @author: Cynthia Castillo
	 * @version: 0.1 2013-12-27
	 * 
	 * Acción de Borrar Perfil
	 */
	$(document).on('click','.borrar',function(e){
		e.preventDefault();
		var id = $(this).attr("data-id");
		var params = {};
		params.id = id;
		params.accion = 'deleteRecord';
		bootbox.dialog({
			message: "¿Está seguro de eliminar el gasto?",
			buttons: {
				aceptar: {
					label: "Aceptar",
					className: "btn-primary",
					callback: function() {
						$.ajax({
							type:'post',
							data:params,
							url:'include/Libs.php',
							dataType:'json',
							error:function(){
								bootbox.dialog({
									message: "Experimentamos Fallas Técnicas. Comuníquese con su proveedor.",
									buttons: {
										cerrar: {
											label: "Cerrar",
											callback: function() {
												bootbox.hideAll();
											}
										}
									}
								});
							},
							success:function(result){
								bootbox.dialog({
									message: result.msg,
									title: result.title,
									buttons: {
										cerrar: {
											label: "Cerrar",
											callback: function() {
												bootbox.hideAll();
												$("#table-usuario").dataTable().fnDestroy();
												getRecords();
											}
										}
									}
								});
							}
						});
					}
				},
				cancelar: {
					label: "Cancelar",
					className: "btn-danger",
					callback: function() {
						$('.modal-dialog').modal('hide');
					}
				}
			}
		});
	});

	$(document).on('change','#esg, #tipo, #concepto, #factura, #grupo, #promotor, #be',function(e) {
		e.preventDefault();
		getRecords();
	});


});

/*
 * @author: Cynthia Castillo <cynthia.castillo@metodika.mx>
 * @version: 0.1 2013­12-27
 * 
 * Imprime la tabla y le da la funcionalidad adecuada
 */
function getRecords(){
	$.ajax({
		type: 'POST',
		url: 'include/Libs.php?accion=printTableMonth2',
		dataType: 'json',
		data: $("#form").serialize(),
		error: function() {
			bootbox.dialog({
				message: "Experimentamos Fallas Técnicas. Comuníquese con su proveedor.",
				buttons: {
					cerrar: {
						label: "Cerrar",
						callback: function() {
							bootbox.hideAll();
						}
					}
				}
			});
		},
		success: function(result) {

			$('#table-month tbody').html(result.table);
		}
	});
}

function getMonth() {
	var mes = $("#mes").val();
	var params = {};
	params.mes = mes;
	params.accion = 'getMonth';
	$.ajax({
		type:'post',
		data:params,
		url:'include/Libs.php',
		dataType:'json',
		error:function(){
			bootbox.dialog({
				message: "Experimentamos Fallas Técnicas. Comuníquese con su proveedor.",
				buttons: {
					cerrar: {
						label: "Cerrar",
						callback: function() {
							bootbox.hideAll();
						}
					}
				}
			});
		},
		success:function(result){
			$(".mes_title").html(result.mes);
		}
	});
}

function getPromotores() {
	$.ajax({
		type: 'POST',
		url: 'include/Libs.php?accion=getPromotores2',
		dataType: 'json',
		error: function() {
			bootbox.dialog({
				message: "Experimentamos Fallas Técnicas. Comuníquese con su proveedor.",
				buttons: {
					cerrar: {
						label: "Cerrar",
						callback: function() {
							bootbox.hideAll();
							window.location = "index.php";
						}
					}
				}
			});
		},
		success: function(result) {
			$('.cont-promotor').html(result.select);
		}
	});
}

