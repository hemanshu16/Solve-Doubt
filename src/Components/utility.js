function getAction(str, role)
{
    let arr = str.split('$')
    if(role == 'vc')
        return arr[0]
    else if(role == 'mm')
        return arr[1]
    else 
        return arr[2]
}

function setAction(str,role,change)
{
    let arr = str.split('$')
    if(role == 'vc')
        arr[0] = change
    else if(role == 'mm')
         arr[1] = change
    else
        arr[2] = change
    return arr.join('$') 
}
export {getAction,setAction}