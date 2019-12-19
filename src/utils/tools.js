const listToTree = function (list, depth = 1) {
    let arr = []
    list.forEach(item => {
        let newItem = {
            id: item.dir_id,
            name: item.dir_name,
            dir_pid:item.dir_pid,
            can_delete:item.can_delete,
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