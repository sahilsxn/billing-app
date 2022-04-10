function a(){
    let c = 10
    function d(){
        console.log(c)
    }
    d()
}

function b(){
    a()
}

b()