const listToTree = function (list, depth = 1) {
    let arr = []
    list.forEach(item => {
        let newItem = {
            id: item.dir_id,
            name: item.dir_name,
            depth: depth
        }

        if (item.children && item.children.length) {
            newItem.menu = [...listToTree(item.children, depth + 1)]
        }
        arr.push(newItem)
    });
    return arr
}

export {
    listToTree
}