
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        
        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
   
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        //-------------notificacion
            // Add to index.js or the first page that loads with your app.
        // For Intel XDK and please add this to your app.js.
/*
        document.addEventListener('deviceready', function () {
          // Enable to debug issues.
          // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
          
          var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          };

          window.plugins.OneSignal
            .startInit("a2c2f69e-5685-4fca-91b8-324b19970274")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
          
          // Call syncHashedEmail anywhere in your app if you have the user's email.
          // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
          // window.plugins.OneSignal.syncHashedEmail(userEmail);
        }, false);
        //
*/
       //document.getElementById("ver").addEventListener("click", ver); 

//notificaciones---sacar el id del dispositivo
  var idActual="";
    var push = PushNotification.init({
            android: {
                senderID: "582303144798"//ninth-victor-163006

                //api --AIzaSyC29mBl4muR4ur8v40P4wBh2ZPbMcPe_gU
                //582303144798
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            }
        });
                                                 
        push.on('registration', function(data) {//tengo el id
            //document.getElementById("idDispositivo").innerText= data.registrationId;
            $("#id").val(data.registrationId);
            idActual=data.registrationId;
        });
    

        push.on('notification', function(data) {
            //var ul = document.getElementById("notificacionesPush");
            //var li = document.createElement("li");
             //li.appendChild(document.createTextNode(data.title+": "+data.message));
             //ul.appendChild(li);
        });

        push.on('error', function(e) {
             e.message
        });
        //notificaciones
             /* cordova.plugins.notification.local.schedule({
                id         : 1,
                title      : 'Notificación Martin',
                text       : 'Texto',
                sound      : null,
                every      : 'minute',
                autoClear  : false,
                at         : new Date(new Date().getTime() + 10*1000)
              });*/

//window.localStorage.removeItem("key");
// window.localStorage.clear();
//boton login------
 $("#boton1").click(function(e){
    e.preventDefault();
    $.getJSON("http://factucode.com/pruebacinde/ComprobarUsuarios.php",
          {usuario:$("#usuario").val(),contrasena:$("#contrasena").val(),boton:"login",idEquipo:$("#id").val()},
        function(data){
          if (data=="FORMATO INCORRECTO"){
          alert("Problemas con el servidor");
        }else{
                                   // console.log("nombre: "+data.nombre);//es un json
                                   // console.log("usu: "+data.usu);
                                   // console.log("respuesta: "+data.respuesta);
                                    //console.log(data);
                      //---------------------si existe abro la app----------------------------------------------              
                                    if(data.respuesta=="Si existe"){
                                        alert('Usuario Correcto: '+data.nombre);
                                         //alert('Usuario perfil: '+data.perfil);
                                         window.localStorage.setItem("perfil", data.perfil);
                                         window.location="app.html";
                                       /* if(data.perfil=="Admin"){
                                          alert("Admin");

                                         }else{
                                              $("#registrar").attr("disabled", true);
                                         }*/
                                         
                                    }else{
                                        alert('Usuario Incorrecto');
                                    }  
        }
        });
    });


///-------aplicacion
  //crear el select


/////obtener el perfil controlar perfiles
//crear un codigo php que devuelva el tipo de perfil de un usuario que le paso guardado en localstorage
/*var value = window.localStorage.getItem("perfil");
if(value=="Admin"){
  // alert("Admin");
}else{
  //no admin
    $("#registrar").attr("disabled", true);
}
     */                                 


$.ajax({
    type:"POST",
    url:"http://factucode.com/pruebacinde/ComprobarUsuarios.php",
    data: { desplegable:"mostrar"}
    }).done(function(info){//trae la informacion del servidor
        var select=$("#id_usuario");
        select.append(info);
        //console.log(info);
        //console.log($("#id_usuario option:selected").val());
 })



//boton notificacion


setInterval(function notificar()  {
             $.ajax({
                            type:"POST",
                            url:'http://192.168.0.127:80/pruebaCordova2/notificacionesMiasWeb.php',//localhost/pruebaCordova2
                            data: {submit:"submit",usuarioToken:$("#id_usuario option:selected").val()}//enviar a este usuario
                        }).done(function(info){//trae la informacion del servidor

                            //idDispositivo                
                            console.log("info"+info);
                            console.log("option"+$("#id_usuario option:selected").val())
                            if($("#id_usuario option:selected").val()==info){
                              //solo navegador
                                // Pedir el permiso
                                  Notification.requestPermission();

                                  // Utilidad para lanzar la notificación
                                  function spawnNotification(theBody,theIcon,theTitle) {
                                    var options = {
                                        body: theBody,
                                        icon: theIcon
                                    }
                                    var n = new Notification(theTitle,options);
                                    setTimeout(n.close.bind(n), 5000); 
                                  }

                                  // Lanzar la notificación
                                  spawnNotification("Notificacion para este usuario", undefined, "Admin dice");

                              //alert("notificacion para este Dispositivo Id");

                               cordova.plugins.notification.local.schedule({
                                      id         : 1,
                                      title      : 'Para este usuario',
                                      text       : 'Admin dice',
                                      sound      : null,
                                      /*every      : 'minute',*/
                                      autoClear  : false,
                                      at         : new Date(new Date().getTime() + 2000)//milisegundos
                                    });
                            }

                        })
        },5000);

/*
 setInterval(function notificar()  {
             $.ajax({
                            type:"POST",
                            url:'http://factucode.com/pruebacinde/notificacionesMias.php',//localhost/pruebaCordova2
                            data: {submit:"submit",usuarioToken:$("#id_usuario option:selected").text()}//enviar a este usuario
                        }).done(function(info){//trae la informacion del servidor

                            //idDispositivo                
                            //console.log(info);
                            //console.log($("#id_usuario option:selected").text())
                            if(idActual==info){
                              //solo navegador
                                // Pedir el permiso
                                  /*Notification.requestPermission();

                                  // Utilidad para lanzar la notificación
                                  function spawnNotification(theBody,theIcon,theTitle) {
                                    var options = {
                                        body: theBody,
                                        icon: theIcon
                                    }
                                    var n = new Notification(theTitle,options);
                                    setTimeout(n.close.bind(n), 5000); 
                                  }

                                  // Lanzar la notificación
                                  spawnNotification("Esto es el cuerpo", undefined, "Título");*/

                              //alert("notificacion para este Dispositivo Id");

                         /*   cordova.plugins.notification.local.schedule({
                                      id         : 1,
                                      title      : 'Para este usuario',
                                      text       : 'Texto',
                                      sound      : null,
                                      /*every      : 'minute',*/
                                   /*   autoClear  : false,
                                      at         : new Date(new Date().getTime() + 2000)//milisegundos
                                    });
                            }

                        })
        },5000);*/




/*
$("#noti").click(function(e){
         //alert("alertaaaaa");
         
                        $.ajax({
                            type:"POST",
                            url:'http://192.168.0.127:80/pruebaCordova2/notificacionesMias.php',//localhost/pruebaCordova2
                            data: {submit:"submit",us}
                        }).done(function(info){//trae la informacion del servidor
                            //idDispositivo
                            //$("#result").append(info);                
                           // console.log(info);
                            if(idActual==info){
                              /*solo navegador
                                // Pedir el permiso
                                  Notification.requestPermission();

                                  // Utilidad para lanzar la notificación
                                  function spawnNotification(theBody,theIcon,theTitle) {
                                    var options = {
                                        body: theBody,
                                        icon: theIcon
                                    }
                                    var n = new Notification(theTitle,options);
                                    setTimeout(n.close.bind(n), 5000); 
                                  }

                                  // Lanzar la notificación
                                  spawnNotification("Esto es el cuerpo", undefined, "Título");*/

                              //alert("notificacion para este Dispositivo Id");

                             /* cordova.plugins.notification.local.schedule({
                                      id         : 1,
                                      title      : 'Notificación Martin',
                                      text       : 'Texto',
                                      sound      : null,
                                      /*every      : 'minute',*/
                                   /*   autoClear  : false,
                                      at         : new Date(new Date().getTime() + 2000)//milisegundos
                                    });
                            }

                        })

        });
*/

        //

       $("#registrar").click(function(e){
         //alert("alertaaaaa");
         //console.log($("#id_usuario option").val()); 
            /////obtener el perfil
            var value = window.localStorage.getItem("perfil");

            if(value=="Admin"){
              // alert("Admin");
                //si admin
                     $.ajax({
                        type:"POST",
                        url:'http://factucode.com/pruebacinde/insertar.php',//localhost/pruebaCordova2
                        data: {entra:"entra", idUsuario:$("#id_usuario option:selected").val(),mensaje:$("#mensaje").val()/*,id:$("#id").val()*/   }
                      }).done(function(info){//trae la informacion del servidor
                         // console.log(info);
                         // nombre:$("#nombre").val("");
                         //mensaje:$("#mensaje").val("");
                      })

            }else{
              //no admin
                $("#registrar").attr("disabled", true);
            }    

        });

    //ver avisos       
        setInterval(function ver()  {
             $.ajax({
                 type:"POST",//http://factucode.com/pruebacinde/leeravisos.php//185.42.104.198
                 url:"http://factucode.com/pruebacinde/leeravisos.php"//192.168.0.127:80  /////'http://urldetuservidor/reply.php'
              }).done(function(info){//trae la informacion del servidor
                  //console.log(info);
                    $("#notificacion").val(info);
              });
        },500);
        

        //cerrar sesion
        $("#cerrarSesion").click(function(e){
          window.location="index.html";  
           window.localStorage.clear();//borro el local storage 
        });



        //camara
        $("#camara").click(function(e){
            e.preventDefault();
            //alert("Hola cámara");

           var options = {
              limit: 1
           };

            navigator.device.capture.captureImage(onSuccess, onError, options);

           function onSuccess(mediaFiles) {
              var i, path, len;
                
              for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                 path = mediaFiles[i].fullPath;
                 console.log(mediaFiles);
              }
           }

           function onError(error) {
              navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
           }
        });


        
        //ubicacion
        $("#ubicacion").click(function(e){
            e.preventDefault();
            //alert("Hola contactos")

                   var options = {
                      enableHighAccuracy: true,
                      maximumAge: 3600000
                   }
                    
                   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                   function onSuccess(position) {

                      alert('Latitude: '          + position.coords.latitude          + '\n' +
                         'Longitude: '         + position.coords.longitude         + '\n' +
                         'Altitude: '          + position.coords.altitude          + '\n' +
                         'Accuracy: '          + position.coords.accuracy          + '\n' +
                         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                         'Heading: '           + position.coords.heading           + '\n' +
                         'Speed: '             + position.coords.speed             + '\n' +
                         'Timestamp: '         + position.timestamp                + '\n');
                   };

                   function onError(error) {
                      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
                   }
         });   

        //bateria
         /*   window.addEventListener("batterystatus", onBatteryStatus, false);
            function onBatteryStatus(info) {
                    alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
                }
            $("#bateria").click(function(e){
                e.preventDefault();
                alert("hola bateria");
                
            });*/
        //contactos
        $("#contactos").click(function(e){
            e.preventDefault();
            //alert("Hola contactos")
               var options = new ContactFindOptions();
               options.filter = "";
               options.multiple = true;

               fields = ["displayName"];
               navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
                
               function contactfindSuccess(contacts) {
                  for (var i = 0; i < contacts.length; i++) {
                     alert("Display Name = " + contacts[i].displayName);
                  }
               }
                
               function contactfindError(message) {
                  alert('Failed because: ' + message);
               }
                
        });

        //cargar otra vista
        $("#otraVista").click(function(e){
            e.preventDefault();
            alert("otra vista");
           
            window.location="carga.html";
         });

        //------------

document.addEventListener("pause", onResume, false);//pause cuando se cierra //resume cuando se reanuda sin cerrar
        //console.log('Received Event: ' + id);
    }
};

// System events
      function onResume() {
       
              cordova.plugins.notification.local.schedule({
                                      id         : 1,
                                      title      : 'Notificación Martin',
                                      text       : 'Segundo Plano',
                                      sound      : null,
                                      /*every      : 'minute',*/
                                      autoClear  : false,
                                      at         : new Date(new Date().getTime() + 2000)//milisegundos
                                    });

}


app.initialize();