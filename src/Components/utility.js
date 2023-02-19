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

export {getAction}