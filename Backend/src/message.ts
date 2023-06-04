class Message {
    data: any;
    errors: [];

    constructor(data, errors) {
        this.data = data;
        this.errors = errors;
    }
}

export default Message;