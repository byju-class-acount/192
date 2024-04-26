AFRAME.registerComponent("drive",{
  schema:{},
  init:function(){
    var gameStateValue = this.el.getAttribute("game")
    if(gameStateValue == "play"){
        this.driveCar()
    }
  },
  driveCar:function(){
    var multiply = 10
    var wheelRotation = 0


    window.addEventListener("keydown",function(e){
    var controlWheel = document.querySelector("#control-wheel")
    if(e.code == "ArrowRight" && wheelRotation > -40){
        wheelRotation -= 5
        controlWheel.setAttribute("rotation",{x:0,y:0,z:wheelRotation})
    }
    if(e.code == "ArrowLeft" && wheelRotation < 40){
        wheelRotation += 5
        controlWheel.setAttribute("rotation",{x:0,y:0,z:wheelRotation})
    }

    var cameraRig = this.document.querySelector("#camera-rig")
    var cameraRotation = cameraRig.getAttribute("rotation")
    var cameraPosition = cameraRig.getAttribute("position") 
    var cameraMoveControl = cameraRig.getAttribute("movement-controls")
    
    cameraRig.setAttribute("movement-controls",{speed:cameraMoveControl.speed + 0.005})
   

    var cameraDirection = new THREE.Vector3()
    cameraRig.object3D.getWorldDirection(cameraDirection)
    if(e.code == "ArrowRight"){
        cameraRotation.y -= 5
        cameraRig.setAttribute("rotation",{x:0,y:cameraRotation.y,z:0})
        cameraRig.setAttribute("movement-controls",{"speed":cameraMoveControl.speed + 0.005})
    }

    if(e.code == "ArrowLeft"){
        cameraRotation.y += 5
        cameraRig.setAttribute("rotation",{x:0,y:cameraRotation.y,z:0})
        cameraRig.setAttribute("movement-controls",{"speed":cameraMoveControl.speed + 0.005})
    }

    if(e.code == "ArrowUp"){
        multiply += 0.5
        if(multiply <= 100 && cameraPosition.z > -500){
            cameraRig.setAttribute("movement-controls",{"speed":cameraMoveControl.speed + 0.005})
            var acce = document.querySelector("#control-acce")
            acce.setAttribute("material",{color:"green"})
            var carSpeed = this.document.querySelector("#speed")
            carSpeed.setAttribute("text",{value:multiply})
        }
    }

    if(e.code == "Space"){
        cameraRig.setAttribute("movement-controls",{"speed":0})
        var space = document.querySelector("#control-break")
        space.setAttribute("material",{color:"red"})
    }   

    })


  },
})