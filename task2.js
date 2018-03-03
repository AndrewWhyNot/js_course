
function MyListNode(val) {
    this.val = val;
    this.nextNode = null;
    
    // prints list
    this.print = function() {
        process.stdout.write(val.toString());
        if (this.nextNode != null) {
            process.stdout.write(" -> ");
            this.nextNode.print();
        } else
            process.stdout.write("\n");
    }
    
    // appends list with new node
    this.appendWithNode = function(newElem) {
        let elem = this;
        while (elem.nextNode != null) {
            elem = elem.nextNode;
        }
        elem.nextNode = newElem;
    }
    
    // returns node with val=digit
    this.findNode = function(digit) {
        if (this.val == digit)
            return this;
        if (this.nextNode != null)
            return this.nextNode.findElement(digit);
        return null; // if not found
    }
    
    // makes copy of node
    this.copy = function() {
        let c = new MyListNode(this.val);
        c.nextNode = this.nextNode != null ? this.nextNode.copy() : null;
        return c;
    }
    
    // returns new list without node with val=digit
    this.removeNode = function(digit) {
        
        if (this.val == digit) {
            return this.nextNode == null ? null : this.nextNode.copy();
        }
        else {
            let c = this.copy();
            c = c.nextNode.removeNode(digit);
            return c;
        }
    }
}

function numberToList(num) {
    if (typeof(num) != "number") {
        console.log("Not a number passed!");
    }
    if (num == 0)
        return new MyListNode(0);
    list = new MyListNode(num % 10);
    num = Math.floor(num / 10);
    while (num != 0) {
        list.appendWithNode(new MyListNode(num % 10));
        num = Math.floor(num / 10);
    }
    return list;
}

function add(list1, list2) {
    let newVal = (list1.val + list2.val) % 10;
    let rest = Math.floor((list1.val + list2.val)/10);
    
    let result = new MyListNode(newVal);
    list1 = list1.nextNode;
    list2 = list2.nextNode;
    while (1) {
        if (list1 == null || list2 == null) {
            break;
        }
        newVal = (list1.val + list2.val + rest) % 10;
        rest = Math.floor((list1.val + list2.val + rest)/10);
        result.appendWithNode(new MyListNode(newVal));
        
        list1 = list1.nextNode;
        list2 = list2.nextNode;
    }
    if (list1 != null || list2 != null) {
        if (list2 != null)
            list1 = list2;
    }
    while (list1 != null) {
        newVal = (list1.val + rest) % 10;
        rest = Math.floor((list1.val + rest)/10);
        result.appendWithNode(new MyListNode(newVal));
        list1 = list1.nextNode;
    }
    if (rest != 0)
        result.appendWithNode(new MyListNode(rest));
    
    return result;
}

num1 = numberToList(465);
num2 = numberToList(243);

add(num1, num2).print();

