export class Queue {

    constructor() {
      this.queue = [];
      this.size = 0;
    }

    empty() {
        if(this.size === 0) return true;
        else return false;
    }

    push(request) {
      this.queue.push(request);
      this.size++;
    }

    pop() {
      if (!this.empty()) {
        this.queue.shift();
        this.size--;
      }
    }

    top() {
      if (!this.empty()) {
        return this.queue[0];
      }
      return null;
    }
  }
  