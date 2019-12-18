const listToTree = function (list, isShare, depth = 1) {
    let arr = []
    list.forEach(item => {
        let newItem = {
            id: item.dir_id,
            name: item.dir_name,
            depth: depth
        }
        if (isShare) newItem.isShare = true

        if (item.children && item.children.length) {
            newItem.menu = [...listToTree(item.children, isShare, depth + 1)]
        }
        arr.push(newItem)
    });
    return arr
}

export {
    listToTree
}